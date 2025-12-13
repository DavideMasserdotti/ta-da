"use client"
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  Button, 
  useDisclosure 
} from "@heroui/react";
import { NewTask } from "./newTask";
import type { CalendarDate } from "@internationalized/date";

interface FormData {
  name: string;
  description: string;
  priority: number;
  date: CalendarDate | null;
  lat: number | null;
  lon: number | null;
}

interface Props {
  onTaskCreated: () => void;
}

export default function PopElement({ onTaskCreated }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    priority: 3,
    date: null,
    lat: null,
    lon: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!formData.name || !formData.date || !formData.lat || !formData.lon) {
      alert("⚠️ Compila tutti i campi inclusa la posizione sulla mappa!");
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        name: formData.name,
        description: formData.description || "",
        priority: formData.priority,
        expirationDate: formData.date.toString(),
        checked: false,
        lat: formData.lat,
        lon: formData.lon
      };

      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("✅ Task creata con successo!");
        onTaskCreated();
        onOpenChange();
        setFormData({ name: "", description: "", priority: 3, date: null, lat: null, lon: null });
      } else {
        alert("❌ Errore creazione task");
      }
    } catch (error) {
      console.error("Errore:", error);
      alert("❌ Errore di connessione");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onTaskCreated, onOpenChange]);

  return (
    <>
      <Button 
        onPress={onOpen}
        className="bg-gray-600 hover:bg-blue-700 text-white font-medium px-3 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
      >
        ➕ Aggiungi task
      </Button>
      
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
              <ModalHeader className="flex-shrink-0 p-6 sm:p-6 border-b border-gray-100 dark:border-zinc-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Nuova Task
                </h2>
              </ModalHeader>

              <ModalBody className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
                <NewTask 
                  formData={formData}
                  onFormChange={setFormData}
                />
              </ModalBody>

              <ModalFooter className="flex-shrink-0 p-6 sm:p-8 bg-gray-50/50 dark:bg-zinc-800/50 border-t border-gray-100 dark:border-zinc-700 gap-3">
                <Button
                  variant="light"
                  color="danger"
                  className="flex-1 sm:w-auto px-8 py-3 text-sm sm:text-base font-medium rounded-xl"
                  onPress={onClose}
                  disabled={isSubmitting}
                >
                  Annulla
                </Button>
                <Button
                  color="primary"
                  className="flex-1 sm:w-auto px-8 py-3 text-sm sm:text-base font-semibold shadow-lg rounded-xl"
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  disabled={!formData.name || !formData.date || !formData.lat || !formData.lon}
                >
                  Crea Task
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
