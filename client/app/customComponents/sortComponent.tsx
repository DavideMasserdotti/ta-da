"use client";

import {Checkbox} from "@heroui/checkbox";
import { useState } from "react";

interface Task {
  id: number;
  name: string;
  description?: string;
  priority: number;
  expirationDate: string;
  checked: boolean;
  lat?: number;
  lon?: number;
}


export default function SortComponent({tasks, setTasks}: {tasks: Task[], setTasks: (tasks: Task[]) => void }) {


 const handleSort = (criteria: 'priority' | 'date' | 'name') => {
        const sorted = [...tasks].sort((a, b) => {
            switch (criteria) {
                case 'priority': return b.priority - a.priority;
                case 'date': return new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime();
                case 'name': return b.name.localeCompare(a.name);
            }
        });
        setTasks([...tasks].sort((a, b) => {
            switch (criteria) {
                case 'priority': return b.priority - a.priority;
                case 'date': return new Date(b.expirationDate).getTime() - new Date(a.expirationDate).getTime();
                case 'name': return b.name.localeCompare(a.name);
            }
        }))
        setTasks(sorted);
    };

    return (

        <div className="flex gap-2 mb-4 p-2 bg-gray-100 rounded">
            <button onClick={() => handleSort('priority')} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                Priorità
            </button>
            <button onClick={() => handleSort('date')} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600">
                Scadenza
            </button>
            <button onClick={() => handleSort('name')} className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600">
                Nome
            </button>
        </div>

    );
}
