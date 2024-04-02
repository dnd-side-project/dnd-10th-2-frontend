import { useState } from 'react';

export type TimeType = {
  periodOfDay: string | undefined;
  hour: string;
  minute: string;
};

interface TimePickerType {
  time: TimeType;
  isOpen: boolean;
}

export const useTimePicker = () => {
  const [timePicker, setTimePicker] = useState<TimePickerType>({
    time: {
      periodOfDay: undefined,
      hour: '',
      minute: ''
    },
    isOpen: false
  });

  const setTime = ({ periodOfDay, hour, minute }: TimeType) => {
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
