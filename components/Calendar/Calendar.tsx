"use client";
import React, { useCallback, useMemo, useReducer, useState } from "react";
import { EventAction, EventState, TEvent } from "./types";
import Event from "./Event/Event";
import EventForm from "./EventForm/EventForm";
import moment, { Moment } from "moment-timezone";
import DateSelector from "./DateSelector";

const initialState = { events: [], selectedEvent: null };

const reducer = (state: EventState, action: EventAction) => {
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
  const [currentDate, setCurrentDate] = useState<Moment>(moment());

  // Function to handle adding a new event
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

  // Function to handle updating an existing event
  const updateEvent = (updatedEvent: TEvent) => {
    dispatch({ type: "UPDATE_EVENT", payload: updatedEvent });
  };

  // Function to handle deleting an event
  const deleteEvent = (eventId: number) => {
    dispatch({ type: "DELETE_EVENT", payload: eventId });
  };

  // Clears the selected event
  const clearEvent = () => {
    dispatch({ type: "CLEAR_EVENT" });
    setName("");
    setStart("");
    setEnd("");
  };

  // Handles clicking on an hour to set the start time
  const handleHourClick = useCallback((hour: number) => {
    setStart(hour);
  }, []);

  // Filters overlapping events based on start and end times
  const getOverlappingEvents = useCallback(
    (start: number, end: number) => {
      return state.events.filter((event) => {
        const eventStartHour = moment(event.start).hour();
        const eventEndHour = moment(event.end).hour();

        // Check if the event overlaps with the specified time range and day
        if (
          currentDate.isSame(event.start, "day") &&
          eventStartHour < end &&
          eventEndHour > start
        ) {
          return true;
        }

        return false;
      });
    },
    [state.events, currentDate]
  );

  // Renders events for each hour
  const renderEvents = useCallback(
    (hour: number) => {
      const currentMoment = moment(currentDate);
      return state.events.map((event) => {
        const eventStartTime = moment(event.start);
        const eventEndTime = moment(event.end);

        // Check if the event matches the current hour and date
        if (
          eventStartTime.hour() !== hour ||
          !currentMoment.isSame(eventStartTime, "day")
        ) {
          return null;
        }

        const overlappingEvents = getOverlappingEvents(
          eventStartTime.hour(),
          eventEndTime.hour()
        );
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
    },
    [getOverlappingEvents, state.events, dispatch, currentDate]
  );

  // Renders the 24-hour grid
  const hours = useMemo(() => {
    return [...Array(24)].map((_, i) => (
      <div
        className="flex h-10 relative cursor-pointer"
        key={i}
        onClick={() => handleHourClick(i)}
      >
        <div className="flex w-24 text-right pr-5 box-border">
          {moment(i, "HH").format("hh:mm a")}
        </div>
        <div className="flex-1 box-border relative left-[0] after:absolute after:top-0 after:left-[-10px] after:h-[0.5px] after:bg-gray-200 after:--tw-content-[''] after:w-[calc(100%+10px)] after:block">
          {renderEvents(i)}
        </div>
      </div>
    ));
  }, [handleHourClick, renderEvents]);

  return (
    <div>
      <h1 className="mb-5">
        <DateSelector
          currentDate={currentDate}
          onDateChange={setCurrentDate}
          onClear={clearEvent}
        />
      </h1>
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
        currentDate={currentDate}
      />
      <div className="flex flex-col	min-w-full">{hours}</div>
    </div>
  );
};

export default Calendar;
