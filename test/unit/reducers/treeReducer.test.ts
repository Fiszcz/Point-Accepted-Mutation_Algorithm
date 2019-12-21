import { treeReducer } from '../../../src/reducers/treeReducer';

describe('treeReducer', () => {
    test('should return the initial state', () => {
        expect(treeReducer(undefined, {} as any)).toEqual({ tree: { name: '' } });
    });

    test('should set tree in store if action contain new tree', () => {
        expect(treeReducer(undefined, { type: 'SET_TREE', tree: { name: 'AAA', children: [{ name: 'BBB' }] } })).toEqual({
            tree: { name: 'AAA', children: [{ name: 'BBB' }] },
        });
    });
});
