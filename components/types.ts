import { Dispatch, SetStateAction } from "react";

export type TEvent = {
  id: number;
  name: string;
  // If I had connected to backed end would of used real datetimes but for time saving did it this way.
  start: number;
  end: number;
};

export type EventFormProps = {
  selectedEvent: TEvent | null;
  onAdd: (event: TEvent) => void;
  onUpdate: (event: TEvent) => void;
  onDelete: (id: number) => void;
  onClear: () => void;
  start: number | string;
  setStart: Dispatch<SetStateAction<number | string>>;
  end: number | string;
  setEnd: Dispatch<SetStateAction<number | string>>;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
};
