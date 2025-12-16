"use client";

import TaskList from "./taskList";
import Logo from "./logo";
import PopElement from "./popElement";
import { SetStateAction, useEffect, useState } from "react";
import SearchBar from "./searchBar";
import SortComponent from "./sortComponent";
import { Checkbox } from "@heroui/checkbox";

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
};


export default function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayTasks, setDisplayTasks] = useState<Task[]>([]);
    const [showArchived, setShowArchived] = useState(false);



    const onFilter = (filteredTasks: Task[]) => {
        setDisplayTasks(filteredTasks);
    }



    const handleReload = (shouldReload: boolean) => {
        if (shouldReload) {
            fetchTasks(showArchived);        
        }
    };

    const handleSort = (sortedTasks: Task[]) => {
        setTasks(sortedTasks);
        const intersection = sortedTasks.filter(task1 =>
            displayTasks.some(task2 => task1.id === task2.id)
        );
        setDisplayTasks(intersection);
    };




    const handleArchive = (tasks: Task[], toggle: boolean) => {
         setShowArchived(toggle);
        console.log(tasks)
        if (toggle) {
            const activeTasks = tasks.filter(task => task.checked);
            setDisplayTasks(activeTasks);
        } else {
            const activeTasks = tasks.filter(task => !task.checked);
            setDisplayTasks(activeTasks);
        }
    };






    const handleSearch = (term: string) => {
        if (term === "") {
            setDisplayTasks(tasks);
            return;
        }
        const filtered = tasks.filter(task =>
            task.name.toLowerCase().includes(term.toLowerCase())
        );

        onFilter(filtered);
    };

    const fetchTasks = async (toggle: boolean) => {
        try {
            const res = await fetch(`http://localhost:8080/tasks`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();
            setTasks(data);
            handleArchive(data, toggle);
            console.log(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchTasks(false);
    }, []);

    return (
        <div className="flex h-screen w-full flex-col bg-gray-50 bg-gray-300">
            <div className="px-2 pt-2 sm:px-3 lg:px-4">
                <div className="flex items-center justify-between py-2">

                    <div className="flex-1">
                        <Logo />
                    </div>

                    <div className="flex-1 flex justify-center">
                        <PopElement onTaskCreated={() => fetchTasks(false)} />
                    </div>


                    <div className="flex-1 flex justify-end">
                        <Checkbox
                            isSelected={showArchived}
                            onValueChange={(checked) => handleArchive(tasks, checked)}
                        >
                            Archiviati
                        </Checkbox>
                    </div>
                </div>
            </div>


            <div className="p-4 sm:px-6 lg:px-8">
                <SortComponent tasks={tasks} onSortChange={handleSort}></SortComponent>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 lg:px-8">
                <TaskList loading={loading} tasks={displayTasks} onReload={handleReload} />
            </div>
            <div className="">
                <SearchBar onChange={handleSearch} />
            </div>
        </div>
    );
}
