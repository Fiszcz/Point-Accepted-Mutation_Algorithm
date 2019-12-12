type Matrix = number[][];

type Edge = [number, number, number];
export type Graph = Edge[];

/*
  create adjacency matrix for use in prims algorithm
  note: we could improve the running time of prims algorithm by
  implementing a priority queue data structure instead of a matrix
*/
function createAdjMatrix(numberOfVertex: number, graph: Graph) {

    const adjMatrix: Matrix = [];

    // create N x N matrix filled with 0 edge weights between all vertices
    for (let i = 0; i < numberOfVertex; i++) {
        adjMatrix.push([]);
        for (let j = 0; j < numberOfVertex; j++) { adjMatrix[i].push(0); }
    }

    // populate adjacency matrix with correct edge weights
    for (let i = 0; i < graph.length; i++) {
        adjMatrix[graph[i][0]][graph[i][1]] = graph[i][2];
        adjMatrix[graph[i][1]][graph[i][0]] = graph[i][2];
    }

    return adjMatrix;

}

export function primAlgorithm(numberOfVertex: number, graph: Graph): Graph {

    // create adj matrix from graph
    const adjMatrix = createAdjMatrix(numberOfVertex, graph);

    // arbitrarily choose initial vertex from graph
    let vertex = 0;

    // initialize empty edges array and empty minimumSpanningTree
    const minimumSpanningTree: Graph = [];
    const edges: Edge[] = [];
    const visited = [];
    const degreesOfVisited = [];
    for (let i = 0; i < numberOfVertex; i++)
        degreesOfVisited.push(0);
    let minEdge: Edge = [-1,-1,Infinity];

    // run prim's algorithm until we create an minimumSpanningTree
    // that contains every vertex from the graph
    while (minimumSpanningTree.length !== numberOfVertex-1) {

        // mark this vertex as visited
        visited.push(vertex);

        // add each edge to list of potential edges
        for (let r = 0; r < numberOfVertex; r++) {
            edges.push([vertex,r,adjMatrix[vertex][r]]);
        }

        // find edge with the smallest weight to a vertex
        // that has not yet been visited
        for (let e = 0; e < edges.length; e++) {
            if (edges[e][2] < minEdge[2] && visited.indexOf(edges[e][1]) === -1 && checkLeafRuleOfPhylogeneticTree(degreesOfVisited, edges, edges[e])) {
                minEdge = edges[e];
            }
        }

        // remove min weight edge from list of edges
        edges.splice(edges.indexOf(minEdge), 1);

        // push min edge to minimumSpanningTree
        minimumSpanningTree.push(minEdge);

        degreesOfVisited[minEdge[0]]++;
        degreesOfVisited[minEdge[1]]++;

        // start at new vertex and reset min edge
        vertex = minEdge[1];
        minEdge = [-1,-1,Infinity];

    }

    return minimumSpanningTree;

}

const checkLeafRuleOfPhylogeneticTree = (degreesOfVisited: number[], edges: Edge[], currentEdge: Edge) => {
    if (degreesOfVisited[currentEdge[0]] === 3 || degreesOfVisited[currentEdge[1]] === 3) {
        return false;
    }
    return true;
    // const visitedVertex = degreesOfVisited[currentEdge[0]] ? currentEdge[0] : currentEdge[1];
};
