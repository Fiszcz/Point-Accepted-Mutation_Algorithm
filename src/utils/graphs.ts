import { countSubstitutionsBetweenSequences } from './sequences';
import { Graph } from './primAlgorithm';

export const createCompleteGraphFromSequences = (sequences: string[]): Graph => {
    const numberOfSequences = sequences.length;

    const graph: Graph = [];
    for (let i = 0; i < numberOfSequences - 1; i++) {
        for (let j = i + 1; j < numberOfSequences; j++) {
            graph.push([i, j, countSubstitutionsBetweenSequences(sequences[i], sequences[j])]);
        }
    }

    return graph;
};

export interface TreeData {
    name: string;
    children?: TreeData[];
}

export const buildTreeDataFromGraph = (graph: Graph, sequences: string[]): TreeData => {
    const treeData: TreeData = {
        name: String(graph[0][0]),
        children: [
            {
                name: String(graph[0][1]),
            },
        ],
    };

    for (let i = 1; i < graph.length; i++) {
        const firstVertex = String(graph[i][0]);
        const secondVertex = String(graph[i][1]);

        let fromVertexNode = searchInTree(treeData, firstVertex);
        if (fromVertexNode) {
            if (fromVertexNode!.children) {
                fromVertexNode!.children.push({ name: secondVertex });
            } else fromVertexNode!.children = [{ name: secondVertex }];
        } else {
            fromVertexNode = searchInTree(treeData, secondVertex);
            if (fromVertexNode) {
                if (fromVertexNode!.children) {
                    fromVertexNode!.children.push({ name: firstVertex });
                } else fromVertexNode!.children = [{ name: firstVertex }];
            }
        }
    }

    return translateToSequences(treeData, sequences);
};

const searchInTree = function(node: TreeData | undefined, key: string): TreeData | undefined {
    if (node === undefined) return undefined;
    else if (node.name === key) return node;
    else {
        if (node.children === undefined) return undefined;
        const firstBranch = searchInTree(node.children[0], key);
        if (firstBranch) return firstBranch;
        const secondBranch = searchInTree(node.children[1], key);
        if (secondBranch) return secondBranch;
        const thirdBranch = searchInTree(node.children[2], key);
        if (thirdBranch) return thirdBranch;
    }
};

const translateToSequences = (treeData: TreeData, sequences: string[]): TreeData => {
    const newTree = { name: sequences[Number(treeData.name)], parent: '', children: treeData.children };
    if (treeData.children) {
        if (treeData.children[0]) {
            newTree.children = [translateToSequences(treeData.children[0], sequences)];
            if (treeData.children[1]) {
                newTree.children.push(translateToSequences(treeData.children[1], sequences));
                if (treeData.children[2]) {
                    newTree.children.push(translateToSequences(treeData.children[2], sequences));
                }
            }
        }
    }
    return newTree;
};

const swap = (array: any[], indexOfFirst: number, indexOfSecond: number) => {
    const valueOfFirst = array[indexOfFirst];
    array[indexOfFirst] = array[indexOfSecond];
    array[indexOfSecond] = valueOfFirst;
};

export const reorganizeTreeForRoot = (graph: Graph, numberOfSequences: number) => {
    const numberOfBranchesForVertexes: number[] = [];
    for (let i = 0; i < numberOfSequences; i++) {
        const numberOfBranchesForSequence = graph.filter(edge => edge[0] === i || edge[1] === i).length;
        numberOfBranchesForVertexes.push(numberOfBranchesForSequence);
    }
    for (let i = 0; i < numberOfSequences; i++) {
        if (numberOfBranchesForVertexes[i] === 2) {
            const indexOfRootEdge = graph.findIndex(element => element[0] === i || element[1] === i);
            swap(graph, 0, indexOfRootEdge);
            if (graph[0][0] !== i) swap(graph[0], 0, 1);
            return;
        }
    }
};
