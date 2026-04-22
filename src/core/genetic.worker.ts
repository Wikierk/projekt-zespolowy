import { runGeneticAlgorithm } from './genetic';
import type { AlgorithmParams, Item } from './types';

self.onmessage = (event: MessageEvent) => {
    const { params, items }: { params: AlgorithmParams, items: Item[] } = event.data;

    const result = runGeneticAlgorithm(params, items);

    self.postMessage(result);
};