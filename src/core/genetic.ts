import type { Chromosome, AlgorithmParams, Item, OptimizationMode, AlgorithmResult } from "./types";


export function generateInitialPopulation(
  populationSize: number, 
  chromosomeLength: number,
  mode: OptimizationMode
): Chromosome[] {
  const population: Chromosome[] = [];

  for (let i = 0; i < populationSize; i++) {
    const genes: number[] = [];

    for (let j = 0; j < chromosomeLength; j++) {
      if (mode === "wartość" || mode === "masa") {
        genes.push(Math.round(Math.random()));
      } else if (mode === "kursy") {
        const randomTripId = Math.floor(Math.random() * chromosomeLength) + 1;
        genes.push(randomTripId);
      }
    }
    population.push({
      genes: genes,
      fitness: 0 
    });
  }

  return population;
}

export function calculateFitness(chromosome: Chromosome, params: AlgorithmParams, items: Item[]): number {
  
  if (params.mode === "wartość" || params.mode === "masa") {
    let totalValue = 0;
    let totalMass = 0;
    let totalSurface = 0;
    
    for (let i = 0; i < chromosome.genes.length; i++) {
        if (chromosome.genes[i] === 1) {
            totalValue += items[i].value;
            totalMass += items[i].mass;
            totalSurface += items[i].surface;
        }
    }
    
    if (totalMass > params.maxMass || totalSurface > params.maxSurface) {
        return 0; 
    }
    
    return totalValue;

  } else if (params.mode === "kursy") {
    
    const trips: Record<number, { mass: number; surface: number }> = {};

    for (let i = 0; i < chromosome.genes.length; i++) {
      const tripId = chromosome.genes[i];
      
      if (!trips[tripId]) {
        trips[tripId] = { mass: 0, surface: 0 };
      }
      
      trips[tripId].mass += items[i].mass;
      trips[tripId].surface += items[i].surface;
    }

    const uniqueTripsCount = Object.keys(trips).length;

    for (const tripId in trips) {
      if (trips[tripId].mass > params.maxMass || trips[tripId].surface > params.maxSurface) {
        return 0;
      }
    }

    return 100 / uniqueTripsCount;
  }

  return 0;
}

export function selectParents(population: Chromosome[]): Chromosome[] {
    const parents: Chromosome[] = [];
    const tournamentSize = 3;

    for (let i = 0; i < 2; i++) {
        let bestCandidate = population[Math.floor(Math.random() * population.length)];
        for (let j = 1; j < tournamentSize; j++) {
            const randomCandidate = population[Math.floor(Math.random() * population.length)];
            if (randomCandidate.fitness > bestCandidate.fitness) {
                bestCandidate = randomCandidate;
            }
        }
        parents.push(bestCandidate);
    }
    return parents;
}

export function crossover(parent1: Chromosome, parent2: Chromosome): Chromosome {
    const crossoverPoint = Math.floor(Math.random() * parent1.genes.length);
    const childGenes = parent1.genes.slice(0, crossoverPoint).concat(parent2.genes.slice(crossoverPoint));
    return { genes: childGenes, fitness: 0 };
}

export function mutate(chromosome: Chromosome, mutationRate: number, mode: OptimizationMode): void {
    for (let i = 0; i < chromosome.genes.length; i++) {
        if (Math.random() < mutationRate) {
            if (mode === "wartość" || mode === "masa") {
                chromosome.genes[i] = chromosome.genes[i] === 0 ? 1 : 0;
            } else if (mode === "kursy") {
                const randomTripId = Math.floor(Math.random() * chromosome.genes.length) + 1;
                chromosome.genes[i] = randomTripId;
            }
        }
    }
}

export function runGeneticAlgorithm(params: AlgorithmParams, items: Item[]): AlgorithmResult {
    let population = generateInitialPopulation(params.populationSize, items.length, params.mode);
    let bestOverall: Chromosome | null = null;
    
    const history: { generation: number; fitness: number }[] = [];

    for (let generation = 0; generation < params.generations; generation++) {
        for (const chromosome of population) {
            chromosome.fitness = calculateFitness(chromosome, params, items);
            if (!bestOverall || chromosome.fitness > bestOverall.fitness) {
                bestOverall = { genes: [...chromosome.genes], fitness: chromosome.fitness };
            }
        }

        const newPopulation: Chromosome[] = [];

        if (bestOverall) {
            newPopulation.push({ genes: [...bestOverall.genes], fitness: bestOverall.fitness });
            history.push({ generation: generation + 1, fitness: bestOverall.fitness });
        }

        for (let i = 1; i < population.length; i++) {
            const [parent1, parent2] = selectParents(population);
            const child = crossover(parent1, parent2);
            mutate(child, params.mutationRate, params.mode);
            newPopulation.push(child);
        }
        
        population = newPopulation;
    }

    return {
        bestChromosome: bestOverall!,
        history: history
    };
}