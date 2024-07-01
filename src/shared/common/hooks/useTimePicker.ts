import { useState } from 'react';

import type { Time, TimePickerState } from '@shared/common/types';

export const useTimePicker = () => {
  const [timePicker, setTimePicker] = useState<TimePickerState>({
    time: {
      periodOfDay: undefined,
      hour: '',
      minute: ''
    },
    isOpen: false
  });

  const setTime = ({ periodOfDay, hour, minute }: Time) => {
    setTimePicker((prev) => ({ ...prev, time: { periodOfDay, hour, minute } }));
  };

  const openTimePicker = () => {
    setTimePicker((prev) => ({ ...prev, isOpen: true }));
  };

  const closeTimePicker = () => {
    setTimePicker((prev) => ({ ...prev, isOpen: false }));
  };

  return { timePicker, setTime, openTimePicker, closeTimePicker };
};
