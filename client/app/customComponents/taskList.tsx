"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/ui/animated-list";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure 
} from "@heroui/react";
import { OpenTask } from "./openTask";
import { number } from "framer-motion";

type Task = {
  id: number;
  name: string;
  description?: string;
  priority: number;
  expirationDate: string;
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
  checked,
  lat,
  lon
}: {
   id: number;
  name: string;
  description?: string;
  priority: number;
  expirationDate: string;
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
      checked: checked,
      lat: lat,
      lon: lon
    });

     const [isSubmitting, setIsSubmitting] = useState(false);
     const [isDisable, setIsDisable] = useState<boolean>(true);
   
  
  return (
     <>
          <figure
              className={cn(
                "relative mx-auto min-h-fit w-full cursor-pointer overflow-hidden rounded-2xl p-4",
                "transition-all duration-200 ease-in-out hover:scale-[103%]",
                "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
                "transform-gpu dark:bg-transparent dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)]"
              )}
              onClick={onOpen}
            >
              <div className="flex flex-row items-center gap-3s">
                <div
                  className="flex size-10 items-center justify-center rounded-2xl"
                >
                  <span className="text-lg">{priority === 1 ? "🔴" : priority === 2 ? "🟡" : "🟢"}</span>
                </div>
                <div className="flex flex-col overflow-hidden px-6 py-4">
                  <figcaption className="flex flex-row items-center text-lg font-medium whitespace-pre dark:text-white">
                    <span className="text-sm sm:text-lg">{name}</span>
                    <span className="mx-1">·</span>
                    <span className="text-xs text-gray-500">{expirationDate}</span>
                  </figcaption>
                  <p className="text-sm font-normal dark:text-white/60">
                    {description}
                  </p>
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
                  <ModalHeader className="flex-shrink-0 p-6 sm:p-8 border-b border-gray-100 dark:border-zinc-800">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                      {name}
                    </h2>
                    <Button onPress={() => setIsDisable(false)}>
                      Modifica
                    </Button>
                  </ModalHeader>
    
                  <ModalBody className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                    <OpenTask
                      task={task}
                      isDisable={isDisable}
                    />
                  </ModalBody>
    
                  <ModalFooter className="flex-shrink-0 p-6 sm:p-8 bg-gray-50/50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-700 gap-3">
                    <Button
                      variant="light"
                      color="danger"
                      className="flex-1 sm:w-auto px-8 py-3 text-sm sm:text-base font-medium rounded-xl"
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
};

interface TaskListProps {
  loading: boolean;
  tasks: Task[];
}

export default function TaskList({ loading, tasks }: TaskListProps) {
  if (loading) {
    return <p className="p-6 text-center text-gray-500">Loading tasks...</p>;
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

