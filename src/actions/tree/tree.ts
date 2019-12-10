import {TreeData} from "../../utils/graphs";

export interface SetTree {
    type: 'SET_TREE',
    tree: TreeData,
}

export function setTree(tree: TreeData): SetTree {
    return {
        type: 'SET_TREE',
        tree,
    }
}
