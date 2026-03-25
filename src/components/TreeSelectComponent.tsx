import { TreeSelect } from 'antd';
import type { TreeNode } from '../types/types.ts';

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

type TreeSelectComponentProps = {
    value: number[];
    onChange: (values: number[]) => void;
};

export default function TreeSelectComponent({ value, onChange }: TreeSelectComponentProps) {
    return (
        <TreeSelect<number[]>
            treeData={treeData}
            value={value}
            onChange={(newValue) => onChange(newValue)}
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            placeholder="Select your sectors"
            style={{ width: '100%' }}
            treeCheckStrictly={false}
        />
    );
}
