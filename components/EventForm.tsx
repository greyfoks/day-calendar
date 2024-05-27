import React, { useEffect, useState } from "react";
import { EventFormProps } from "./types";
import { Select, MenuItem, TextField, InputLabel, Alert } from "@mui/material";
import { TimeSelect } from "./TimeSelect";
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
  const [errors, setErrors] = useState<{
    nameError: string;
    timeError: string;
  }>({
    nameError: "",
    timeError: "",
  });

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
    const newErrors = { nameError: "", timeError: "" };
    let valid = true;

    if (name === "") {
      newErrors.nameError = "An event name is required";
      valid = false;
    }
    if (start >= end) {
      newErrors.timeError = "Start time must be before end time";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
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
      <TimeSelect
        change={setStart}
        value={start}
        label="Start Time"
        labelId="start-select-label"
      />

      <TimeSelect
        change={setEnd}
        value={end}
        label="End Time"
        labelId="end-select-label"
      />

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
      {(errors.nameError || errors.timeError) && (
        <Alert severity="error" className="mt-2">
          {errors.nameError && <div>{errors.nameError}</div>}
          {errors.timeError && <div>{errors.timeError}</div>}
        </Alert>
      )}
    </div>
  );
};

export default EventForm;
