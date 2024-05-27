"use client";
import React, { useReducer, useState } from "react";
import { EventAction, EventState, TEvent } from "./types";
import Event from "./Event";
import EventForm from "./EventForm";
import moment from "moment-timezone";

const initialState = { events: [], selectedEvent: null };

const reducer = (state: EventState, action: EventAction): EventState => {
  switch (action.type) {
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "UPDATE_EVENT":
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === action.payload.id ? action.payload : event
        ),
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => event.id !== action.payload),
      };
    case "SELECT_EVENT":
      return { ...state, selectedEvent: action.payload };
    case "CLEAR_EVENT":
      return { ...state, selectedEvent: null };
    default:
      return state;
  }
};

const Calendar = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [start, setStart] = useState<number | string>("");
  const [end, setEnd] = useState<number | string>("");
  const [name, setName] = useState<string>("");

  const addEvent = (newEvent: TEvent) => {
    // Would probably use tanstack query here and do something like this. and use react-hot-toast for error messages?
    // const {
    //   mutate,
    //   isPending,
    //   data: event,
    // } = useMutation({
    //   mutationFn: async (event) => {
    //   },
    // });
    dispatch({ type: "ADD_EVENT", payload: newEvent });
  };

  const updateEvent = (updatedEvent: TEvent) => {
    dispatch({ type: "UPDATE_EVENT", payload: updatedEvent });
  };

  const deleteEvent = (eventId: number) => {
    dispatch({ type: "DELETE_EVENT", payload: eventId });
  };

  const clearEvent = () => {
    dispatch({ type: "CLEAR_EVENT" });
    setName("");
    setStart("");
    setEnd("");
  };

  const handleHourClick = (hour: number) => {
    setStart(hour);
  };

  const getOverlappingEvents = (start: number, end: number) => {
    return state.events.filter(
      (event) => event.start < end && event.end > start
    );
  };

  const renderEvents = (i: number) => {
    return state.events.map((event) => {
      if (event.start !== i) return null;

      const overlappingEvents = getOverlappingEvents(event.start, event.end);
      const total = overlappingEvents.length;
      const offset = overlappingEvents.findIndex((e) => e.id === event.id);

      return (
        <div key={event.id}>
          <Event
            event={event}
            offset={offset}
            total={total}
            onClick={() => dispatch({ type: "SELECT_EVENT", payload: event })}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h1 className="mb-5">{moment().format("LL")}</h1>
      <EventForm
        selectedEvent={state.selectedEvent}
        onAdd={addEvent}
        onUpdate={updateEvent}
        onDelete={deleteEvent}
        onClear={clearEvent}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        name={name}
        setName={setName}
      />
      <div className="flex flex-col	min-w-full">
        {[...Array(24)].map((_, i) => (
          <div className="flex h-10 relative" key={i}>
            <div
              className="flex w-24 text-right pr-5 box-border cursor-pointer"
              onClick={() => handleHourClick(i)}
            >
              {moment(i, "HH").format("hh:mm a")}
            </div>
            <div className="flex-1 box-border relative left-[0] after:absolute after:top-0 after:left-[-10px] after:h-[0.5px] after:bg-gray-200 after:--tw-content-[''] after:w-[calc(100%+10px)] after:block">
              {renderEvents(i)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
