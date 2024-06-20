import { useState } from 'react';

import { getToday } from '@shared/common/utils';
import type { Date, DatePickerState } from '@shared/common/types';

export const useDatePicker = () => {
  const [datePicker, setDatePicker] = useState<DatePickerState>({
    date: {
      year: getToday().year,
      month: getToday().month,
      date: getToday().date
    },
    isOpen: false
  });

  const setDate = ({ year, month, date }: Date) => {
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
