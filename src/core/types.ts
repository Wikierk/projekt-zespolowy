export type OptimizationMode = "wartość" | "kursy";

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

export interface AlgorithmResult {
    bestChromosome: Chromosome;
    history: { generation: number; fitness: number }[];
}

export interface DeliveryTrip {
  id: number;
  items: string[];
  mass: number;
  maxMass: number;
  surface: number;
  maxSurface: number;
}

export interface KnapsackResult {
  type: "knapsack";
  calcTimeMs: number;
  fitness: number;
  totalValue: number;
  usedMass: number;
  usedSurface: number;
  packedItems: number;
  packedList: Item[];
  history: Array<{ generation: number; fitness: number }>;
}

export interface DeliveriesResult {
  type: "deliveries";
  calcTimeMs: number;
  fitness: number;
  deliveries: DeliveryTrip[];
  history: Array<{ generation: number; fitness: number }>;
}

export type ProblemResult = KnapsackResult | DeliveriesResult;