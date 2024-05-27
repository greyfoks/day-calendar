import React, { useEffect, useState } from "react";
import { EventFormProps } from "../types";
import { TextField, Alert } from "@mui/material";
import { TimeSelect } from "./TimeSelect";
import { Button } from "./Button";
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
    emptyFieldError: string;
    timeError: string;
  }>({
    emptyFieldError: "",
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
    const newErrors = { emptyFieldError: "", timeError: "" };
    let valid = true;

    if (name === "" || !start || !end) {
      newErrors.emptyFieldError = "All fields are required";
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

      <Button
        click={handleSubmit}
        value={selectedEvent === null ? "Add Event" : "Update Event"}
      />
      {selectedEvent && (
        <>
          <Button click={handleDelete} value={"Delete Event"} />
          <Button click={onClear} value={"Clear"} />
        </>
      )}
      {(errors.emptyFieldError || errors.timeError) && (
        <Alert severity="error" className="mt-2">
          {errors.emptyFieldError && <div>{errors.emptyFieldError}</div>}
          {errors.timeError && <div>{errors.timeError}</div>}
        </Alert>
      )}
    </div>
  );
};

export default EventForm;
