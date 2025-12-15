"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox
} from "@heroui/react";
import { OpenTask } from "./openTask";

type Task = {
  id: number;
  name: string;
  description?: string;
  priority: number;
  expirationDate: string;
  creationDate: string;
  checked: boolean;
  lat?: number | null;
  lon?: number | null;
};

const Element = ({
  id,
  name,
  description,
  priority,
  expirationDate,
  creationDate,
  checked,
  lat,
  lon
}: {
  id: number;
  name: string;
  description?: string;
  priority: number;
  expirationDate: string;
  creationDate: string;
  checked: boolean;
  lat?: number | null;
  lon?: number | null;
}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [task, setTask] = useState({
    id: id,
    name: name,
    description: description,
    priority: priority,
    expirationDate: expirationDate,
    creationDate: creationDate,
    checked: checked,
    lat: lat,
    lon: lon
  });

  const [isDisable, setIsDisable] = useState<boolean>(true);


  const toggleTask = async (taskId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskId}/toggle`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Toggle fallito');

      const updatedTask = await response.json();
      console.log('Task toggled:', updatedTask);


    } catch (error) {
      console.error('Errore toggle:', error);
    }
  };




  return (
  <>
    <figure
      className={cn(
        "relative w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md",
        "transition-all duration-200 ease-in-out hover:scale-[1.01]"
      )}
      onClick={onOpen}
    >
      <div className="flex flex-col gap-2 p-3 sm:p-4">
       
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gray-100 flex items-center justify-center">
            <span className="text-base sm:text-lg">
              {priority === 1 ? "🔴" : priority === 2 ? "🟡" : "🟢"}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-1 dark:text-white">
              {name}
            </h3>
          </div>
        </div>

       
        <p className="text-xs sm:text-sm text-gray-700 dark:text-white/70 line-clamp-2">
          {description}
        </p>

      
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <Checkbox
              size="sm"
              isSelected={task.checked}
              onValueChange={() => toggleTask(task.id)}
            >
              <span className="text-xs sm:text-sm">
                {checked ? "✅ Completato" : "🕒 In corso"}
              </span>
            </Checkbox>
          </div>

          <div className="text-right text-[10px] sm:text-xs text-gray-500 space-y-0.5">
            <div>Scadenza: {expirationDate}</div>
            <div>Creato: {creationDate}</div>
          </div>
        </div>
      </div>
    </figure>

    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      classNames={{
        backdrop: "bg-black/60 backdrop-blur-sm",
        base: cn(
          "bg-white dark:bg-zinc-900 text-foreground",
          "w-[95vw] max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl",
          "max-h-[90vh] sm:max-h-[85vh]",
          "mx-2 sm:mx-4",
          "flex flex-col rounded-3xl shadow-2xl"
        ),
      }}
    >
      <ModalContent className="flex-1 flex flex-col overflow-hidden p-0">
        {(onClose) => (
          <>
            <ModalHeader className="flex-shrink-0 p-5 sm:p-7 border-b border-gray-100 dark:border-zinc-800">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {name}
              </h2>
              <Button size="sm" onPress={() => setIsDisable(false)}>
                Modifica
              </Button>
            </ModalHeader>

            <ModalBody className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-6">
              <OpenTask task={task} isDisable={isDisable} />
            </ModalBody>

            <ModalFooter className="flex-shrink-0 p-5 sm:p-7 bg-gray-50/50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-700 gap-2 sm:gap-3">
              <Button
                variant="light"
                color="danger"
                className="flex-1 sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl"
                onPress={onClose}
              >
                Esci
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  </>
);
}


interface TaskListProps {
  loading: boolean;
  tasks: Task[];
}

export default function TaskList({ loading, tasks }: TaskListProps) {
  if (loading) {
    return <p className="p-6 text-center text-gray-500">Caricamento tasks...</p>;
  }

  if (!tasks.length) {
    return <p className="p-6 text-center text-gray-500">Nessun task trovato</p>;
  }


  return (
    <div className="space-y-4">
      <AnimatedList className="space-y-4">
        {tasks.map((task) => (
          <Element
            key={task.id}
            id={task.id}
            name={task.name}
            description={task.description || "Nessuna descrizione"}
            priority={task.priority}
            expirationDate={new Date(task.expirationDate).toLocaleDateString('it-IT')}
            creationDate={new Date(task.creationDate).toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            checked={task.checked}
            lat={task.lat}
            lon={task.lon}
          />
        ))}
      </AnimatedList>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t" />
    </div>
  );
}

