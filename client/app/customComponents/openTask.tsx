"use client";

import { Input } from "@heroui/input";
import ExpirationDatePicker from "./expirationDatePicker";
import MapComponent from "./mapWrapper";
import type { CalendarDate } from "@internationalized/date";
import { RadioGroup, Radio } from "@heroui/radio";

interface Task {
  id: number;
  name: string;
  description?: string;
  priority: number;
  expirationDate: CalendarDate | null;
  creationDate: string;
  checked: boolean;
  lat?: number | null;
  lon?: number | null;
}

interface OpenTaskProps {
  task: Task;
  isDisable: boolean;
  onTaskChange: (updatedTask: Task) => void;
}

export function OpenTask({ task, isDisable, onTaskChange }: OpenTaskProps) {
  // ← NO useState qui! Usa solo props.task

  return (
    <form>
      <div className="grid gap-4">
        {/* Nome */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Nome *
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Inserisci un nome"
            value={task.name}
            isDisabled={isDisable}
            onChange={(e) => 
              onTaskChange({ ...task, name: e.target.value })
            }
          />
        </div>

        {/* Descrizione */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrizione
          </label>
          <Input
            id="description"
            type="text"
            placeholder="Inserisci una descrizione"
            value={task.description ?? ""}
            isDisabled={isDisable}
            onChange={(e) => 
              onTaskChange({ ...task, description: e.target.value })
            }
          />
        </div>

        {/* Priority */}
        <div className="space-y-1">
          <RadioGroup
            label="Livello di priorità *"
            color="primary"
            orientation="horizontal"
            value={task.priority.toString()}
            isDisabled={isDisable}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              onTaskChange({ ...task, priority: parseInt(value) });
            }}
          >
            <Radio value="1">Alta</Radio>
            <Radio value="2">Media</Radio>
            <Radio value="3">Bassa</Radio>
          </RadioGroup>
        </div>

        {/* Data scadenza */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Data di scadenza *
          </label>
          <ExpirationDatePicker
            isDisable={isDisable}
            date={task.expirationDate}
            onDateChange={(newDate) => onTaskChange({ ...task, expirationDate: newDate })}
          />
        </div>

        {/* Map */}
        <div className="grid gap-2">
          <MapComponent
            editMode={!isDisable}
            onSelect={(lat, lon) => onTaskChange({ ...task, lat, lon })}
            pos={task.lat && task.lon ? [task.lat, task.lon] : null}
          />
        </div>

        <div className="max-h-64 overflow-hidden rounded-lg border" />
      </div>
    </form>
  );
}
