"use client";

import TaskList from "./taskList";
import Logo from "./logo";
import PopElement from "./popElement";
import { SetStateAction, useEffect, useState } from "react";
import SearchBar from "./searchBar";
import SortComponent from "./sortComponent";
import { set } from "date-fns";

type Task = {
    id: number;
    name: string;
    description?: string;
    priority: number;
    expirationDate: string;
    checked: boolean;
    lat?: number;
    lon?: number;
};


export default function HomePage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayTasks, setDisplayTasks] = useState<Task[]>([]);


    const onFilter = (filteredTasks: Task[]) => {
        setDisplayTasks(filteredTasks);
    }



    const handleSort = (sortedTasks: Task[]) => {
        setTasks(sortedTasks);
        const intersection = sortedTasks.filter(task1 =>
            displayTasks.some(task2 => task1.id === task2.id)
        );
        setDisplayTasks(intersection);
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

    const fetchTasks = async () => {
        try {
            const res = await fetch(`http://localhost:8080/tasks`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();
            setTasks(data);
            setDisplayTasks(data);
            console.log(data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchTasks();
    }, []);

    return (
        <div className="flex h-screen w-full flex-col bg-gray-50 bg-gray-300">
            <div className="px-4 pt-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">

                    <Logo />
                    <PopElement onTaskCreated={() => fetchTasks()} />
                    <SortComponent tasks={tasks} setTasks={handleSort}></SortComponent>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 lg:px-8">

                <TaskList loading={loading} tasks={displayTasks} />
            </div>
            <div className="">
                <SearchBar onChange={handleSearch} />
            </div>
        </div>
    );
}
