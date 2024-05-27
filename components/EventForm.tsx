import React, { useEffect, useState } from "react";
import { EventFormProps } from "./types";
import { Select, MenuItem, TextField, InputLabel } from "@mui/material";
const EventForm = ({
  selectedEvent,
  onAdd,
  onUpdate,
  onDelete,
  onClear,
  start,
  setStart,
  end,
  setEnd,
  name,
  setName,
}: EventFormProps) => {
  const [nameError, setNameError] = useState("");
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    if (selectedEvent) {
      setName(selectedEvent.name);
      setStart(selectedEvent.start);
      setEnd(selectedEvent.end);
    } else {
      setName("");
      setStart("");
      setEnd("");
    }
  }, [selectedEvent, setStart, setEnd, setName]);

  const isValid = () => {
    setNameError("");
    setTimeError("");
    if (name === "") {
      setNameError("An event name is required");
      return false;
    }
    if (start >= end) {
      setTimeError("Start time must be before end time");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!isValid()) return null;
    if (selectedEvent === null) {
      onAdd({ id: Date.now(), name, start: Number(start), end: Number(end) });
    } else {
      onUpdate({
        id: selectedEvent?.id,
        name,
        start: Number(start),
        end: Number(end),
      });
    }
    onClear();
  };

  const handleDelete = () => {
    if (selectedEvent) {
      onDelete(selectedEvent.id);
      onClear();
    }
  };

  return (
    <div className="flex flex-col items-center p-[20px] bg-gray-200	mb-[20px] w-full">
      <TextField
        className="mx-[5px] mb-5 max-w-[250px] w-full h-[53px] bg-white"
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <InputLabel id="start-select-label">Start Time</InputLabel>
      <Select
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="max-w-[250px] w-full mb-5 bg-white text-gray-900 text-sm rounded-lg block border-none"
        label="Start Time"
        labelId="start-select-label"
      >
        <MenuItem value={0}>12:00 AM</MenuItem>
        <MenuItem value={1}>1:00 AM</MenuItem>
        <MenuItem value={2}>2:00 AM</MenuItem>
        <MenuItem value={3}>3:00 AM</MenuItem>
        <MenuItem value={4}>4:00 AM</MenuItem>
        <MenuItem value={5}>5:00 AM</MenuItem>
        <MenuItem value={6}>6:00 AM</MenuItem>
        <MenuItem value={7}>7:00 AM</MenuItem>
        <MenuItem value={8}>8:00 AM</MenuItem>
        <MenuItem value={9}>9:00 AM</MenuItem>
        <MenuItem value={10}>10:00 AM</MenuItem>
        <MenuItem value={11}>11:00 AM</MenuItem>
        <MenuItem value={12}>12:00 PM</MenuItem>
        <MenuItem value={13}>1:00 PM</MenuItem>
        <MenuItem value={14}>2:00 PM</MenuItem>
        <MenuItem value={15}>3:00 PM</MenuItem>
        <MenuItem value={16}>4:00 PM</MenuItem>
        <MenuItem value={17}>5:00 PM</MenuItem>
        <MenuItem value={18}>6:00 PM</MenuItem>
        <MenuItem value={19}>7:00 PM</MenuItem>
        <MenuItem value={20}>8:00 PM</MenuItem>
        <MenuItem value={21}>9:00 PM</MenuItem>
        <MenuItem value={22}>10:00 PM</MenuItem>
        <MenuItem value={23}>11:00 PM</MenuItem>
      </Select>

      <InputLabel id="end-select-label">End Time</InputLabel>
      <Select
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="max-w-[250px] mb-1 w-full bg-white text-gray-900 text-sm rounded-lg block border-none"
        labelId="end-select-label"
      >
        <MenuItem value={0}>12:00 AM</MenuItem>
        <MenuItem value={1}>1:00 AM</MenuItem>
        <MenuItem value={2}>2:00 AM</MenuItem>
        <MenuItem value={3}>3:00 AM</MenuItem>
        <MenuItem value={4}>4:00 AM</MenuItem>
        <MenuItem value={5}>5:00 AM</MenuItem>
        <MenuItem value={6}>6:00 AM</MenuItem>
        <MenuItem value={7}>7:00 AM</MenuItem>
        <MenuItem value={8}>8:00 AM</MenuItem>
        <MenuItem value={9}>9:00 AM</MenuItem>
        <MenuItem value={10}>10:00 AM</MenuItem>
        <MenuItem value={11}>11:00 AM</MenuItem>
        <MenuItem value={12}>12:00 PM</MenuItem>
        <MenuItem value={13}>1:00 PM</MenuItem>
        <MenuItem value={14}>2:00 PM</MenuItem>
        <MenuItem value={15}>3:00 PM</MenuItem>
        <MenuItem value={16}>4:00 PM</MenuItem>
        <MenuItem value={17}>5:00 PM</MenuItem>
        <MenuItem value={18}>6:00 PM</MenuItem>
        <MenuItem value={19}>7:00 PM</MenuItem>
        <MenuItem value={20}>8:00 PM</MenuItem>
        <MenuItem value={21}>9:00 PM</MenuItem>
        <MenuItem value={22}>10:00 PM</MenuItem>
        <MenuItem value={23}>11:00 PM</MenuItem>
      </Select>
      <button
        className="m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        onClick={handleSubmit}
      >
        {selectedEvent === null ? "Add Event" : "Update Event"}
      </button>
      {selectedEvent && (
        <>
          <button
            className="m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={handleDelete}
          >
            Delete Event
          </button>
          <button
            className="m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            onClick={onClear}
          >
            Clear
          </button>
        </>
      )}
      {nameError || timeError ? (
        <div
          className="m-1 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold text-sm mr-2">Error!</strong>
          <span className="block sm:inline text-sm">{nameError}</span>
          <span className="block sm:inline text-sm">{timeError}</span>
        </div>
      ) : null}
    </div>
  );
};

export default EventForm;
