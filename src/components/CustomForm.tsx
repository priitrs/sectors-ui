import {useEffect, useState} from 'react';
import * as React from 'react'
import {apiFetch} from '../services/api.ts'
import DropdownTreeSelectCJS from "react-dropdown-tree-select";
import "react-dropdown-tree-select/dist/styles.css";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const DropdownTreeSelect = DropdownTreeSelectCJS.default;

interface FormData {
    name: string;
    selectedSectors: string[];
    acceptTerms: boolean;
}

interface SectorNodeDto {
    id: number;
    name: string;
    children: SectorNodeDto[];
}

interface SectorNode {
    value: string;
    label: string;
    children: SectorNode[];
    checked?: boolean;
}

const mapSectors = (nodes: SectorNodeDto[]): SectorNode[] => {
    return nodes.map(node => ({
        label: node.name,
        value: node.id.toString(),
        children: node.children ? mapSectors(node.children) : []
    }));
};

const updateChecked = (nodes: SectorNode[], selectedValues: Set<string>, parentChecked = false): SectorNode[] => {
    return nodes.map(node => {
        const checked = parentChecked || selectedValues.has(node.value);
        return {
            ...node,
            checked,
            children: node.children ? updateChecked(node.children, selectedValues, checked) : []
        };
    });
};

const collectChecked = (nodes: SectorNode[]): string[] => {
    return nodes.flatMap(node => [
        ...(node.checked ? [node.value] : []),
        ...collectChecked(node.children ?? [])
    ]);
};

const CustomForm: React.FC = () => {
    const [sectors, setSectors] = useState<SectorNode[]>([]);

    const [formData, setFormData] = useState<FormData>({
        name: '',
        selectedSectors: [],
        acceptTerms: false,
    });

    useEffect(() => {
        const fetchSectors = async () => {
            try {
                const response = await apiFetch("/sectors");
                if (!response.ok) throw new Error("Network error");
                const data: SectorNodeDto[] = await response.json();
                setSectors(mapSectors(data));
            } catch (err) {
                console.error(err);
            }
        };

        fetchSectors().catch(err => console.error(err));
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                    setFormData({...formData, name: e.target.value})
                }
            />
            <div style={{width: 400, margin: "50px auto"}}>
                <DropdownTreeSelect
                    data={sectors}
                    onChange={(_currentNode: SectorNode, selectedNodes: SectorNode[]) => {
                        const selectedValues = new Set(selectedNodes.map(n => n.value));
                        setSectors(prev => {
                            const updated = updateChecked(prev, selectedValues);
                            setFormData(fd => ({...fd, selectedSectors: collectChecked(updated)}));
                            return updated;
                        });
                    }}
                />
            </div>
            <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) =>
                    setFormData({...formData, acceptTerms: e.target.checked})
                }
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomForm;