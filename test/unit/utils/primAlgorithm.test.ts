import { Graph, primAlgorithm } from '../../../src/utils/primAlgorithm';

describe('primAlgorithm', () => {
    test('should create minimal spanning tree for given graph', () => {
        const numberOfVertex = 6;
        const completeGraph: Graph = [
            [0, 1, 1],
            [0, 2, 2],
            [0, 3, 3],
            [0, 4, 1],
            [0, 5, 1],
            [1, 2, 1],
            [1, 3, 4],
            [1, 4, 2],
            [1, 5, 2],
            [2, 3, 3],
            [2, 4, 1],
            [2, 5, 1],
            [3, 4, 2],
            [3, 5, 2],
            [4, 5, 0],
        ];
        const minimalSpanningTree: Graph = [
            [0, 1, 1],
            [0, 4, 1],
            [4, 5, 0],
            [1, 2, 1],
            [4, 3, 2],
        ];

        expect(primAlgorithm(numberOfVertex, completeGraph)).toMatchObject(minimalSpanningTree);
    });

    test('created minimal spanning tree should not have four degree and more vertexes', () => {
        const numberOfVertex = 5;
        const graph: Graph = [
            [1, 0, 1],
            [2, 0, 1],
            [4, 0, 1],
            [3, 0, 1],
            [3, 4, 100],
        ];
        const minimalSpanningTree: Graph = [
            [0, 1, 1],
            [0, 2, 1],
            [0, 3, 1],
            [3, 4, 100],
        ];

        expect(primAlgorithm(numberOfVertex, graph)).toMatchObject(minimalSpanningTree);
    });
});
