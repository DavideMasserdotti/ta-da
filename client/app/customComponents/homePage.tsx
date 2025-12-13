"use client";

import TaskList from "./taskList";
import Logo from "./logo";
import PopElement from "./popElement";
import { useEffect, useState } from "react";
import SearchBar from "./searchBar";

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

    const fetchTasks = async () => {
        try {
          const res = await fetch(`http://localhost:8080/tasks`, {
            cache: "no-store",
          });
          if (!res.ok) throw new Error("Failed to fetch tasks");
          const data = await res.json();
          setTasks(data);
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
    <div className="flex h-screen w-full flex-col bg-gray-50 dark:bg-gray-900">
      
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-2">
          <Logo />
         <PopElement onTaskCreated={() => fetchTasks()}/>
        </div>
      </div>
    
      <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 lg:px-8">
        <TaskList loading={loading} tasks={tasks} />
      </div>
       <div >
        <SearchBar/>
      </div>
    </div>
  );
}
