"use client"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { NewTask } from "./newTask";
import { useState } from "react";
import type { CalendarDate } from "@internationalized/date";

export default function PopElement() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: null as  CalendarDate | null,
    lat: null as number | null,
    lon: null as number | null
  });

  const handleSubmit = async () => {
  if (!formData.name || !formData.date || !formData.lat || !formData.lon) {
    alert("Compila tutti i campi!");
    return;
  }

  
  const expirationDate = formData.date.toString();

  const payload = {
    name: formData.name,
    description: formData.description || "",  
    priority: 1,  
    expirationDate: expirationDate,
    checked: false,
    lat: formData.lat,    
    lon: formData.lon   
  };

  try {
    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Task creata!");
      // reset form
      setFormData({
        name: "",
        description: "",
        date: null,
        lat: null,
        lon: null
      });
    } else {
      console.error("Errore:", await response.text());
    }
  } catch (error) {
    console.error("Errore network:", error);
  }
};


  return (
    <>
      <Button onPress={onOpen}>Aggiungi task</Button>
      <Modal
  backdrop="blur"
  isOpen={isOpen}
  onOpenChange={onOpenChange}
  size="lg"
  classNames={{
    backdrop: "bg-black/60 backdrop-blur-sm",
    base:
      // dimensioni responsive
      "bg-white dark:bg-zinc-900 text-foreground " +
      "w-full max-w-full sm:max-w-lg md:max-w-xl " +
      "max-h-[90vh] sm:max-h-[80vh] " + // la modal non supera il 90% dell'altezza
      "mx-2 sm:mx-4 " +
      // layout interno scrollabile
      "flex flex-col" +" rounded-2xl shadow-lg",
  }}
>
  <ModalContent className="flex-1 flex flex-col overflow-hidden">
    {(onClose) => (
      <>
        <ModalHeader className="flex-shrink-0 flex flex-col gap-1">
          Nuova task
        </ModalHeader>

       
        <ModalBody className="flex-1 overflow-y-auto space-y-4">
          <NewTask 
                formData={formData}
                onFormChange={setFormData}  
              />
        </ModalBody>

        <ModalFooter className="flex-shrink-0 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            fullWidth
            className="sm:w-auto"
            color="danger"
            variant="light"
            onPress={onClose}
          >
            Chiudi
          </Button>
          <Button
            fullWidth
            className="sm:w-auto"
            color="primary"
            onPress={() => {
                  handleSubmit();
                  onClose();
                }}
          >
            Crea task
          </Button>
        </ModalFooter>
      </>
    )}
  </ModalContent>
</Modal>

    </>
  );
}
