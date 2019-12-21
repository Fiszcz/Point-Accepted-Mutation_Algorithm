type Matrix = number[][];

type Edge = [number, number, number];
export type Graph = Edge[];

/*
  create adjacency matrix for use in prims algorithm
*/
function createAdjMatrix(numberOfVertex: number, graph: Graph) {
    const adjMatrix: Matrix = [];

    // create N x N matrix filled with 0 edge weights between all vertices
    for (let i = 0; i < numberOfVertex; i++) {
        adjMatrix.push([]);
        for (let j = 0; j < numberOfVertex; j++) {
            adjMatrix[i].push(Infinity);
        }
    }

    for (let i = 0; i < graph.length; i++) {
        adjMatrix[graph[i][0]][graph[i][1]] = graph[i][2];
        adjMatrix[graph[i][1]][graph[i][0]] = graph[i][2];
    }

    return adjMatrix;
}

export function primAlgorithm(numberOfVertex: number, graph: Graph): Graph {
    const adjMatrix = createAdjMatrix(numberOfVertex, graph);

    let vertex = 0;

    const minimumSpanningTree: Graph = [];
    const edges: Edge[] = [];
    const visited = [];
    const degreesOfVisited = [];
    for (let i = 0; i < numberOfVertex; i++) degreesOfVisited.push(0);
    let minEdge: Edge = [-1, -1, Infinity];

    // run prim's algorithm until we create an minimumSpanningTree
    // that contains every vertex from the graph
    while (minimumSpanningTree.length !== numberOfVertex - 1) {
        visited.push(vertex);

        // add each edge to list of potential edges
        for (let r = 0; r < numberOfVertex; r++) {
            edges.push([vertex, r, adjMatrix[vertex][r]]);
        }

        // find edge with the smallest weight to a vertex
        // that has not yet been visited
        for (let e = 0; e < edges.length; e++) {
            if (
                edges[e][2] < minEdge[2] &&
                visited.indexOf(edges[e][1]) === -1 &&
                checkLeafRuleOfPhylogeneticTree(degreesOfVisited, edges, edges[e])
            ) {
                minEdge = edges[e];
            }
        }

        // remove min weight edge from list of edges
        edges.splice(edges.indexOf(minEdge), 1);

        minimumSpanningTree.push(minEdge);

        degreesOfVisited[minEdge[0]]++;
        degreesOfVisited[minEdge[1]]++;

        vertex = minEdge[1];
        minEdge = [-1, -1, Infinity];
    }

    return minimumSpanningTree;
}

const checkLeafRuleOfPhylogeneticTree = (degreesOfVisited: number[], edges: Edge[], currentEdge: Edge) => {
    if (degreesOfVisited[currentEdge[0]] === 3 || degreesOfVisited[currentEdge[1]] === 3) {
        return false;
    }
    return true;
};
