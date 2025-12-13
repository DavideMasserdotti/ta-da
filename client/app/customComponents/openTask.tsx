"use client";


import {Input} from "@heroui/input";


import ExpirationDatePicker from "./expirationDatePicker";
import MapComponent from "./mapWrapper";
import type { CalendarDate } from "@internationalized/date";
import { useState } from "react";
import {RadioGroup, Radio} from "@heroui/radio";



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

// Tipo props
type OpenTaskProps = {
  task: Task;
  isDisable: boolean;
};






export function OpenTask({ task, isDisable }: OpenTaskProps) {
return (
<form>
<div className="grid gap-4">
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
/>
</div>


<div className="space-y-1">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Descrizione
    </label>
<Input
id="description"
type="text"
placeholder="Inserisci una descrizione"
value={task.description}
isDisabled={isDisable}
/>
</div>

<div className="space-y-1">
<RadioGroup  
  label="Livello di priorità *"
  color="primary"
  orientation="horizontal"
  value={task.priority.toString()}
  onChange={(e) => {
    const value = (e.target as HTMLInputElement).value;
    console.log(e.target.value);
  }}
>
  <Radio value="1">Alta</Radio>
  <Radio value="2">Media</Radio>
  <Radio value="3">Bassa</Radio>
</RadioGroup>
</div>


<div className="grid gap-2">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Data di scadenza *
        </label>
</div>


<div className="max-h-64 overflow-hidden rounded-lg border">
</div>
</div>
</form>
);
}