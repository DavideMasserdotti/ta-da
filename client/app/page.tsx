"use client";

import TaskList from "./customComponents/taskList";
import Logo from "./customComponents/logo";
import PopElement from "./customComponents/popElement";

export default function Home() {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-50 dark:bg-gray-900">
      
      <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center py-2">
          <Logo />
          <PopElement />
        </div>
      </div>

    
      <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 lg:px-8">
        <TaskList />
      </div>
    </div>
  );
}
