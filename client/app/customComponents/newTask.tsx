"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ExpirationDatePicker from "./expirationDatePicker";
import MapComponent from "./mapWrapper";
import type { CalendarDate } from "@internationalized/date";

interface FormData {
  name: string;
  description: string;
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
        <div className="grid gap-2">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            type="text"
            placeholder="Inserisci un nome"
            value={formData.name}
            onChange={(e) => onFormChange({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="description">Descrizione</Label>
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

        <div className="grid gap-2">
          <ExpirationDatePicker
            date={formData.date}
            onDateChange={(newDate) =>
              onFormChange({ ...formData, date: newDate } as FormData)
            }
          />
        </div>

        <div className="max-h-64 overflow-hidden rounded-lg border">
          <MapComponent
            onSelect={(la, lo) =>
              onFormChange({ ...formData, lat: la, lon: lo } as FormData) 
            }
          />
        </div>
      </div>
    </form>
  );
}
