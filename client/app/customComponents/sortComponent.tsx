"use client";

import { RadioGroup, Radio } from "@heroui/react";
import { useState } from "react";

interface Task {
    id: number;
    name: string;
    description?: string | "";
    priority: number;
    expirationDate: string;
    creationDate: string;
    checked: boolean;
    lat?: number;
    lon?: number;
}

export default function SortComponent({
    tasks,
    onSortChange,
}: {
    tasks: Task[];
    onSortChange: (sortedTasks: Task[]) => void;
}) {
    const [selectedSort, setSelectedSort] = useState<string>("age");

    const handleRadioChange = (value: string) => {
        setSelectedSort(value);

        if (!value) {
            onSortChange(tasks);
            return;
        }

        const criteria = value as "age" | "priority" | "date" | "name";

        const sorted = [...tasks].sort((a, b) => {
            switch (criteria) {
                case "age":
                    return a.id - b.id;
                case "priority":
                    return b.priority - a.priority;
                case "date":
                    return (
                        new Date(b.expirationDate).getTime() -
                        new Date(a.expirationDate).getTime()
                    );
                case "name":
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        onSortChange(sorted);
    };

    return (
        <RadioGroup
            color="primary"
            value={selectedSort}
            onValueChange={handleRadioChange}
            label="Ordina per:"
            orientation="horizontal"
            className="flex gap-2 p-2 bg-gray-100 rounded-lg dark:bg-zinc-800"
        >
            <Radio value="age">Recente</Radio>
            <Radio value="priority">Priorità</Radio>
            <Radio value="date">Scadenza</Radio>
            <Radio value="name">Nome</Radio>
        </RadioGroup>
    );
}
