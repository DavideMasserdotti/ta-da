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
} from "@heroui/react";
import { OpenTask } from "./openTask";
import { CalendarDate, parseDate } from "@internationalized/date";



function fromItToIso(d: string): string {
  const [day, month, year] = d.split("/"); // "18","12","2025"
  return `${year}-${month}-${day}`;        // "2025-12-18"
}

type Task = {
  id: number;
  name: string;
  description?: string | "";
  priority: number;
  expirationDate: string;
  creationDate: string;
  checked: boolean;
  lat?: number | null;
  lon?: number | null;
};

type BodyTask = {
  id: number;
  name: string;
  description?: string | "";
  priority: number;
  expirationDate: CalendarDate | null;
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
  lon,
  onReload
}: {
  id: number;
  name: string;
  description?: string | "";
  priority: number;
  expirationDate: string;
  creationDate: string;
  checked: boolean;
  lat?: number | null;
  lon?: number | null;
  onReload: (shouldReload: boolean) => void
}) => {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [task, setTask] = useState({
    id: id,
    name: name,
    description: description,
    priority: priority,
    expirationDate: expirationDate
      ? parseDate(fromItToIso(expirationDate))
      : null,
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
      onReload(true);

    } catch (error) {
      console.error('Errore toggle:', error);
    }
  };

  const deleteTask = async (id: number) => {
    if (confirm("Sei sicuro di voler eliminare questo task?")) {
      try {
        const response = await fetch(`http://localhost:8080/tasks/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del task");
        }

        console.log("Task eliminato con successo");
        onReload(true);
      } catch (error) {
        console.error("Errore:", error);
      }
    }
  };


  



  const updateTask = async (task: BodyTask) => {
    const body: Task = {
      id: task.id,
      name: task.name,
      description: task.description ?? "",
      priority: task.priority,
      expirationDate: task.expirationDate
        ? (task.expirationDate as CalendarDate).toString()
        : "",
      creationDate: formatDateToISO(task.creationDate),
      checked: task.checked,
      lat: task.lat ?? null,
      lon: task.lon ?? null,
    };

    try {
      const response = await fetch(`http://localhost:8080/tasks/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Modifica fallita: ${errorText}`);
      }

      const updatedTask = await response.json();
      console.log('Task toggled:', updatedTask);
      onReload(true);
      alert("✅ Task modificata con successo!");

    } catch (error) {
      console.error('Errore modifica:', error);
      alert("Errore");
      throw error;
    }
  };

  function formatDateToISO(dateStr: string): string {
    const [datePart, timePart] = dateStr.split(", ");
    const [day, month, year] = datePart.split("/");
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${timePart}:00`;
  }


  const [currentTask, setCurrentTask] = useState<BodyTask>(task);

  const handleTaskUpdate = (updatedTask: BodyTask) => {
    setCurrentTask(updatedTask);
    console.log("Task aggiornato:", updatedTask);
  };

  





  return (
    <div>
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
                <p className="text-xs sm:text-sm text-gray-700 dark:text-white/70 line-clamp-2">
                  {checked ? "✅ Completato" : "🕒 In corso"}
                </p>
              </div>
            </div>


            <p className="text-xs sm:text-sm text-gray-700 dark:text-white/70 line-clamp-2">
              {description}
            </p>


            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-gray-100">
              <div className="flex items-center">
                {
                  task.checked ? (
                    <Button
                      variant="light"
                      className="flex-1 bg-yellow-500 hover:bg-yellow-700  sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl"
                      onPress={() => toggleTask(task.id)}
                    >
                      Ripristina
                    </Button>
                  ) :
                    (
                      <Button
                        variant="light"
                        className="flex-1 bg-green-500 hover:bg-green-700  sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl"
                        onPress={() => toggleTask(task.id)}
                      >
                        Archivia
                      </Button>
                    )
                }
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
                  {isDisable ? (
                    <Button size="sm" onPress={() => setIsDisable(false)}>
                      Abilita modifica
                    </Button>
                  ) : (
                    <></>
                  )}

                </ModalHeader>

                <ModalBody className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-4 sm:space-y-6">
                  <OpenTask task={currentTask} isDisable={isDisable} onTaskChange={handleTaskUpdate} />
                </ModalBody>

                <ModalFooter className="flex-shrink-0 p-5 sm:p-7 bg-gray-50/50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-700 gap-2 sm:gap-3">
                  <Button
                    variant="light"
                    className="flex-1 bg-gray-300 hover:bg-gray-500  sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl"
                    onPress={() => { onClose(); setIsDisable(true) }}
                  >
                    Esci
                  </Button>
                  {!isDisable ? (<Button
                    variant="light"
                    className="flex-1 bg-yellow-500 hover:bg-yellow-700  sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl"
                    onPress={() => { onClose(); updateTask(currentTask); setIsDisable(true) }}
                  >
                    Salva modifiche
                  </Button>)
                    :
                    (
                      <></>
                    )}
                  <Button
                    variant="light"
                    className="flex-1 bg-red-500 hover:bg-red-700 sm:w-auto px-6 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-xl"
                    onPress={() => { onClose(); deleteTask(currentTask.id) }}
                  >
                    Elimina
                  </Button>

                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}


interface TaskListProps {
  loading: boolean;
  tasks: Task[];
  onReload: (shouldReload: boolean) => void
}

export default function TaskList({ loading, tasks, onReload }: TaskListProps) {
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
            onReload={onReload}
          />
        ))}
      </AnimatedList>
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t" />
    </div>
  );
}

