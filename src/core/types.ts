export type OptimizationMode = "wartość" | "masa" | "kursy";

export interface Item {
  id: number;
  name: string;
  mass: number;
  surface: number;
  value: number;
}

export interface AlgorithmParams {
  mode: OptimizationMode;
  maxMass: number;
  maxSurface: number;
  populationSize: number;
  generations: number;
  mutationRate: number;
}

export interface Chromosome {
  genes: number[]; 
  
  fitness: number; 
}