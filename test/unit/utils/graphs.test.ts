import {
    buildTreeDataFromGraph,
    createCompleteGraphFromSequences,
    reorganizeTreeForRoot,
    searchInTree,
    TreeData,
} from '../../../src/utils/graphs';
import { Graph } from '../../../src/utils/primAlgorithm';

describe('graphs methods', () => {
    describe('searchInTree', () => {
        const testTree: TreeData = {
            name: 'A',
            children: [
                {
                    name: 'A.A',
                },
                {
                    name: 'A.B',
                    children: [
                        {
                            name: 'A.B.A',
                        },
                        {
                            name: 'A.B.B',
                        },
                    ],
                },
                {
                    name: 'A.C',
                },
            ],
        };

        test.each([
            ['A', testTree],
            ['A.A', testTree.children![0]],
            ['A.B', testTree.children![1]],
            ['A.C', testTree.children![2]],
            ['A.B.A', testTree.children![1].children![0]],
            ['A.B.B', testTree.children![1].children![1]],
        ] as Array<[string, TreeData]>)(
            'should find element in tree and return proper node with specific name',
            (nameOfNode, foundNode) => {
                expect(searchInTree(testTree, nameOfNode)).toEqual(foundNode);
            },
        );

        test.each(['A.B.D', 'A.B.C', 'A.A.A', 'B', ''])('should not find not-exist node with name', nameOfNode => {
            expect(searchInTree(testTree, nameOfNode)).toBeUndefined();
        });

        test('should return undefined value if we pass undefined as tree', () => {
            expect(searchInTree(undefined, 'A.A')).toBeUndefined();
        });
    });

    describe('createCompleteGraphFromSequences', () => {
        test('should create complete complete graph for list of sequences, where vertexes are representatives of sequences', () => {
            const listOfSequences = ['A', 'A', 'B', 'C'];
            const expectedGraph = [
                [0, 1, 0],
                [0, 2, 1],
                [0, 3, 1],
                [1, 2, 1],
                [1, 3, 1],
                [2, 3, 1],
            ];
            expect(createCompleteGraphFromSequences(listOfSequences)).toEqual(expectedGraph);
        });
    });

    describe('buildTreeDataFromGraph', () => {
        test('should convert graph representation to tree', () => {
            const listOfSequences = ['A', 'A', 'B', 'C'];
            const graph: Graph = [
                [0, 1, 0],
                [0, 2, 1],
                [0, 3, 1],
                [1, 2, 1],
                [1, 3, 1],
                [2, 3, 1],
            ];
            const expectedTree = {
                name: 'A',
                children: [
                    {
                        name: 'A',
                        children: [
                            {
                                name: 'B',
                                children: [
                                    {
                                        name: 'C',
                                    },
                                ],
                            },
                            {
                                name: 'C',
                            },
                        ],
                    },
                    {
                        name: 'B',
                    },
                    {
                        name: 'C',
                    },
                ],
            };
            expect(buildTreeDataFromGraph(graph, listOfSequences)).toMatchObject(expectedTree);
        });
    });

    describe('recognizeTreeForRoot', () => {
        test('should move to the beginning a node which should be a root for whole tree', () => {
            let graph: Graph = [
                [0, 4, 1],
                [1, 2, 1],
                [0, 1, 1],
                [0, 3, 1],
            ];
            const expectedGraph = [
                [1, 2, 1],
                [0, 4, 1],
                [0, 1, 1],
                [0, 3, 1],
            ];

            reorganizeTreeForRoot(graph, 5);

            expect(graph).toMatchObject(expectedGraph);
        });

        test('should swap element in edge object representation if found root element is not first element of edge', () => {
            let graph: Graph = [
                [0, 4, 1],
                [0, 1, 1],
                [1, 2, 1],
                [0, 3, 1],
            ];
            const expectedGraph = [
                [1, 0, 1],
                [0, 4, 1],
                [1, 2, 1],
                [0, 3, 1],
            ];

            reorganizeTreeForRoot(graph, 5);

            expect(graph).toMatchObject(expectedGraph);
        });
    });
});
