"use client";

import * as React from "react";
import { DatePicker } from "@heroui/react";
import { CalendarDate } from "@internationalized/date";

interface Props {
  date: CalendarDate | null;
  onDateChange: (date: CalendarDate | null) => void;
}

export default function ExpirationDatePicker({ date, onDateChange }: Props) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Data di scadenza"
        isRequired
        className="max-w-[284px]"
        value={date ?? undefined}
        onChange={onDateChange} 
        classNames={{
          popoverContent: "bg-white dark:bg-zinc-900 shadow-lg",
          calendar: "bg-white dark:bg-zinc-900",
          calendarContent: "bg-white dark:bg-zinc-900",
        }}
      />
    </div>
  );
}
