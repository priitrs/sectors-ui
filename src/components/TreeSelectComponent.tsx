import { useState } from 'react';
import { TreeSelect } from 'antd';
import type {TreeNode} from '../types/types.ts'

const treeData: TreeNode[] = [
    {
        value: 1,
        title: 'Manufacturing',
        children: [
            { value: 2, title: 'Construction materials', children: [] },
            { value: 3, title: 'Electronics and Optics', children: [] },
        ],
    },
];

export default function TreeSelectComponent() {
    const [selectedValues, setSelectedValues] = useState<number[]>([2]);

    return (
        <TreeSelect<number[]>
            treeData={treeData}
            value={selectedValues}
            onChange={(newValue) => setSelectedValues(newValue)}
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            placeholder="Select your sectors"
            style={{ width: '100%' }}
            treeCheckStrictly={false}
        />
    );
}
