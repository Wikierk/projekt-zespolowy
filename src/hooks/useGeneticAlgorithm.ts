import { useState, useCallback } from "react";
import {
  runGeneticAlgorithm,
} from "../core/genetic";
import type { AlgorithmParams, Item } from "../core/types";

const initialItems: Item[] = [
  { id: 1, name: "Lodówka", mass: 50, surface: 1.5, value: 2000 },
  { id: 2, name: "Telewizor", mass: 15, surface: 0.8, value: 3500 },
  { id: 3, name: "Karton książek", mass: 25, surface: 0.3, value: 500 },
  { id: 4, name: "Sofa", mass: 70, surface: 2.5, value: 1200 },
  { id: 5, name: "Lampa", mass: 3, surface: 0.2, value: 150 },
];

const initialParams: AlgorithmParams = {
  mode: "wartość",
  maxMass: 100,
  maxSurface: 3.0,
  populationSize: 150,
  generations: 100,
  mutationRate: 0.1,
};

export function useGeneticAlgorithm() {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [params, setParams] = useState<AlgorithmParams>(initialParams);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const [results, setResults] = useState<any>(null);


  const addItem = (item: Omit<Item, "id">) => {
    const newId = items.length > 0 ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    setItems([...items, { ...item, id: newId }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateParams = (newParams: Partial<AlgorithmParams>) => {
    setParams({ ...params, ...newParams });
    setResults(null);
  };

  const startAlgorithm = useCallback(() => {
    if (items.length === 0) {
        alert("Brak przedmiotów do spakowania!");
        return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const startTime = performance.now();
      
      const bestChromosome = runGeneticAlgorithm(params, items);
      
      const endTime = performance.now();
      const calcTime = Math.round(endTime - startTime);

      if (params.mode === "wartość" || params.mode === "masa") {
        let totalVal = 0;
        let totalM = 0;
        let totalS = 0;
        const packedItemsList: Item[] = [];

        for (let i = 0; i < bestChromosome.genes.length; i++) {
          if (bestChromosome.genes[i] === 1) {
            totalVal += items[i].value;
            totalM += items[i].mass;
            totalS += items[i].surface;
            packedItemsList.push(items[i]);
          }
        }

        setResults({
          type: "knapsack",
          calcTimeMs: calcTime,
          fitness: bestChromosome.fitness,
          totalValue: totalVal,
          usedMass: totalM,
          usedSurface: Number(totalS.toFixed(2)),
          packedItems: packedItemsList.length,
          packedList: packedItemsList,
        });

      } else if (params.mode === "kursy") {
        const tripsMap: Record<number, { items: string[]; mass: number; surface: number }> = {};

        for (let i = 0; i < bestChromosome.genes.length; i++) {
          const tripId = bestChromosome.genes[i];
          if (!tripsMap[tripId]) {
            tripsMap[tripId] = { items: [], mass: 0, surface: 0 };
          }
          tripsMap[tripId].items.push(items[i].name);
          tripsMap[tripId].mass += items[i].mass;
          tripsMap[tripId].surface += items[i].surface;
        }

        const deliveries = Object.keys(tripsMap).map((key, index) => ({
          id: index + 1,
          items: tripsMap[Number(key)].items,
          mass: tripsMap[Number(key)].mass,
          maxMass: params.maxMass,
          surface: Number(tripsMap[Number(key)].surface.toFixed(2)),
          maxSurface: params.maxSurface,
        }));

        setResults({
          type: "deliveries",
          calcTimeMs: calcTime,
          fitness: bestChromosome.fitness,
          deliveries: deliveries,
        });
      }

      setIsCalculating(false);
    }, 50); 
  }, [params, items]);

  return {
    items,
    params,
    isCalculating,
    results,
    addItem,
    removeItem,
    updateParams,
    startAlgorithm,
  };
}