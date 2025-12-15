"use client";


import { Input } from "@heroui/input";
import ExpirationDatePicker from "./expirationDatePicker";
import MapComponent from "./mapWrapper";
import { RadioGroup, Radio } from "@heroui/radio";
import { CalendarDate } from "@internationalized/date";

interface FormData {
  name: string;
  description?: string | "";
  priority: number;
  date: CalendarDate | null;
  lat: number | null;
  lon: number | null;
}

interface Props {
  formData: FormData;
  onFormChange: (data: FormData) => void;
}


export function NewTask({ formData, onFormChange }: Props) {

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
            value={formData.name}
            onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
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
            value={formData.description}
            onChange={(e) =>
              onFormChange({ ...formData, description: e.target.value })
            }
          />
        </div>
        <div className="space-y-1">
          <RadioGroup
            label="Livello di priorità *"
            color="primary"
            orientation="horizontal"
            value={formData.priority.toString()}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              console.log(e.target.value);
              onFormChange({
                ...formData,
                priority: parseInt(value)
              });
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
          <ExpirationDatePicker
            isDisable={false}
            date={formData.date}
            onDateChange={(newDate) =>
              onFormChange({ ...formData, date: newDate } as FormData)
            }
          />
        </div>


        <div className="max-h-64 overflow-hidden rounded-lg border">
          <MapComponent
            editMode={true}
            onSelect={(la, lo) =>
              onFormChange({ ...formData, lat: la, lon: lo } as FormData)
            }
          />
        </div>
      </div>
    </form>
  );
}