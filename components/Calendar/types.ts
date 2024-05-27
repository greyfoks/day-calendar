import { Moment } from "moment-timezone";
import { Dispatch, SetStateAction } from "react";

export type TEvent = {
  id: number;
  name: string;
  // If I had connected to backed end would of used real datetimes but for time saving did it this way.
  start: string;
  end: string;
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
  currentDate: Moment;
};

export type EventProps = {
  event: TEvent;
  onClick: () => void;
  total: number;
  offset: number;
};

export type EventState = {
  events: TEvent[];
  selectedEvent: TEvent | null;
};

export type EventAction =
  | { type: "ADD_EVENT"; payload: TEvent }
  | { type: "UPDATE_EVENT"; payload: TEvent }
  | { type: "DELETE_EVENT"; payload: number }
  | { type: "SELECT_EVENT"; payload: TEvent }
  | { type: "CLEAR_EVENT" };

export type DateSelectorProps = {
  currentDate: Moment;
  onDateChange: (date: Moment) => void;
  onClear: () => void;
};
