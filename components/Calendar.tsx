"use client";
import React, { useState } from "react";
import { TEvent } from "./types";
import Event from "./Event";
import EventForm from "./EventForm";
import moment from "moment-timezone";

const Calendar = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const [start, setStart] = useState<number | string>("");
  const [end, setEnd] = useState<number | string>("");
  const [name, setName] = useState<string>("");

  const addEvent = (event: TEvent) => {
    // Would probably use tanstack query here and do something like this. and use react-hot-toast for error messages?
    // const {
    //   mutate,
    //   isPending,
    //   data: event,
    // } = useMutation({
    //   mutationFn: async (event) => {
    //   },
    // });
    setEvents([...events, event]);
  };

  const updateEvent = (updatedEvent: TEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (eventId: number) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  const clearEvent = () => {
    setSelectedEvent(null);
    setName("");
    setStart("");
    setEnd("");
  };

  const handleHourClick = (hour: number) => {
    setStart(hour);
  };

  const getOverlappingEvents = (start: number, end: number) => {
    return events.filter((event) => event.start < end && event.end > start);
  };

  const renderEvents = (i: number) => {
    return events.map((event) => {
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
            onClick={() => setSelectedEvent(event)}
          />
        </div>
      );
    });
  };

  return (
    <div>
      <h1 className="mb-5">{moment().format("LL")}</h1>
      <EventForm
        selectedEvent={selectedEvent}
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
