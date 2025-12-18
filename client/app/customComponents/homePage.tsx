"use client";

import TaskList from "./taskList";
import Logo from "./logo";
import PopElement from "./popElement";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";
import SortComponent from "./sortComponent";
import { Checkbox } from "@heroui/checkbox";
import { filter } from "framer-motion/client";
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
    const [activeTasks, setActiveTasks] = useState<Task[]>([]);
    const [searchedTasks, setSearchedTasks] = useState<Task[]>([]);
    const [sortType, setSortType] = useState("age");
    const [searchText, setSearchText] = useState("");





    const onFilter = (filteredTasks: Task[]) => {
        setSearchedTasks(filteredTasks);
        const intersection = activeTasks.filter(item => filteredTasks.includes(item));
        setDisplayTasks(intersection);
    }



    const handleReload = (shouldReload: boolean) => {
        if (shouldReload) {
            fetchTasks(showArchived, false, false);
        }
    };





    const handleSort = (sortedTasks: Task[], type: string) => {
        setSortType(type);
        setTasks(sortedTasks);
        const intersection = sortedTasks.filter(item => displayTasks.includes(item));
        // const intersection = sortedTasks.filter(task1 =>
        //     displayTasks.some(task2 => task1.id === task2.id)
        //);
        setDisplayTasks(intersection);
        setActiveTasks(intersection);
    };



    

    const handleArchive = (tasksArchive: Task[], tasksSearchedArchive: Task[], toggle: boolean) => {
        //console.log(tasksArchive)
        //console.log(tasksSearchedArchive)
        setShowArchived(toggle);
        let filteredTasks: Task[];
        let activeFiltered: Task[];

        if (toggle) {
            filteredTasks = tasksSearchedArchive.filter(searchedTasks => searchedTasks.checked);
             activeFiltered = tasksArchive.filter(task => task.checked);
        } else {
            filteredTasks = tasksSearchedArchive.filter(searchedTasks => !searchedTasks.checked);
            activeFiltered = tasksArchive.filter(task => !task.checked);
        }

        const orderedFiltered = tasksArchive.filter(task => filteredTasks.some(filteredTask => filteredTask.id === task.id));
       

        setDisplayTasks(orderedFiltered);
        setActiveTasks(activeFiltered);
    };







    const handleSearch = (term: string) => {
        setSearchText(term);
        if (term === "") {
            //  const intersectionSorted = tasks.filter(item => activeTasks.includes(item));
            //   setActiveTasks(intersectionSorted);
            console.log(activeTasks)
            setDisplayTasks(activeTasks)
            setSearchedTasks(tasks)
            return;
        }
        const filtered = tasks.filter(task =>
            task.name.toLowerCase().includes(term.toLowerCase())
        );
        onFilter(filtered);
    };

    const fetchTasks = async (toggle: boolean, firstRun: boolean, taskCreated: boolean) => {
        try {
            const res = await fetch(`http://localhost:8080/tasks`, {
                cache: "no-store",
            });
            if (!res.ok) throw new Error("Failed to fetch tasks");
            const data = await res.json();

            const sorted = [...data].sort((a, b) => {
                switch (sortType) {
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
            setTasks(sorted);
            if (firstRun) {
                setSearchedTasks(sorted)
                handleArchive(sorted, sorted, toggle);
            } else if (taskCreated) {
                handleSearch("");
                //console.log("Sono dentro")
                setSearchedTasks(sorted)
                handleArchive(sorted, sorted, toggle);
                //window.location.reload();
            } else {
                const intersection = sorted.filter(task1 =>
                    searchedTasks.some(task2 => task1.id === task2.id)
                );
                setSearchedTasks(intersection);
                handleArchive(sorted, intersection, toggle);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        fetchTasks(false, true, false);
    }, []);

    return (

        <div className="flex h-screen w-full flex-col bg-gray-50 bg-gray-300">
            <div className="px-2 pt-2 sm:px-3 lg:px-4">
                <div className="flex items-center justify-between py-2">

                    <div className="flex-1">
                        <Logo />
                    </div>

                    <div className="flex-1 flex justify-center">
                        <PopElement onTaskCreated={() => fetchTasks(false, false, true)} />
                    </div>


                    <div className="flex-1 flex justify-end">
                        <Checkbox
                            isSelected={showArchived}
                            onValueChange={(checked) => handleArchive(tasks, searchedTasks, checked)}
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
                <SearchBar searchText={searchText} onChange={handleSearch} />
            </div>
        </div>


    );
}
