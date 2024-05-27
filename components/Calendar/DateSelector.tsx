import React from "react";
import { Button } from "./EventForm/Button";
import { DateSelectorProps } from "./types";

const DateSelector = ({
  currentDate,
  onDateChange,
  onClear,
}: DateSelectorProps) => {
  const handlePrevDay = () => {
    const newDate = currentDate.clone().subtract(1, "day");
    onDateChange(newDate);
    onClear();
  };

  const handleNextDay = () => {
    const newDate = currentDate.clone().add(1, "day");
    onDateChange(newDate);
    onClear();
  };

  return (
    <div className="flex items-center">
      <Button click={handlePrevDay} value={"<"} />
      <div className="text-lg font-medium px-1">{currentDate.format("LL")}</div>
      <Button click={handleNextDay} value={">"} />
    </div>
  );
};

export default DateSelector;
