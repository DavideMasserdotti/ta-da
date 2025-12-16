"use client";

import * as React from "react";
import { DatePicker } from "@heroui/react";
import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";

interface Props {
  isDisable: boolean;
  date: CalendarDate | null;
  onDateChange: (date: CalendarDate | null) => void;
}

export default function ExpirationDatePicker({ isDisable, date, onDateChange }: Props) {
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <DatePicker
        label="Data di scadenza"
        isDisabled={isDisable}
        isRequired
        className="max-w-[284px]"
        value={date ?? undefined}
        onChange={onDateChange} 
         minValue={today(getLocalTimeZone())}
        classNames={{
          popoverContent: "bg-white dark:bg-zinc-900 shadow-lg",
          calendar: "bg-white dark:bg-zinc-900",
          calendarContent: "bg-white dark:bg-zinc-900",
        }}
      />
    </div>
  );
}
