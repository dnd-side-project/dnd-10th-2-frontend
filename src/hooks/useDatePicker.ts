import { useState } from 'react';
import { today } from '@/utils';

export type DateType = {
  year: number;
  month: number;
  date: number;
};

interface DatePickerType {
  date: DateType;
  isOpen: boolean;
}

export const useDatePicker = () => {
  const [datePicker, setDatePicker] = useState<DatePickerType>({
    date: {
      year: today.year,
      month: today.month,
      date: today.date
    },
    isOpen: false
  });

  const setDate = ({ year, month, date }: DateType) => {
    setDatePicker((prev) => ({ ...prev, date: { year, month, date } }));
  };

  const openDatePicker = () => {
    setDatePicker((prev) => ({ ...prev, isOpen: true }));
  };

  const closeDatePicker = () => {
    setDatePicker((prev) => ({ ...prev, isOpen: false }));
  };

  return { datePicker, setDate, openDatePicker, closeDatePicker };
};
