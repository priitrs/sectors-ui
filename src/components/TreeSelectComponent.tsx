import { TreeSelect } from 'antd';
import type { TreeNode } from '../types/types.ts';

type TreeSelectComponentProps = {
    allValues: TreeNode[];
    selectedValues: number[];
    onChange: (values: number[]) => void;
};

export default function TreeSelectComponent({ allValues, selectedValues, onChange }: TreeSelectComponentProps) {
    return (
        <TreeSelect<number[]>
            treeData={allValues}
            value={selectedValues}
            onChange={(newValue) => onChange(newValue)}
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_CHILD}
            placeholder="Select your sectors"
            style={{ width: '100%' }}
            treeCheckStrictly={false}
        />
    );
}
