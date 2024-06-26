import React from "react";
import { EventProps } from "../types";
import moment from "moment-timezone";

const Event = ({ event, onClick, total, offset }: EventProps) => {
  const eventStartFormat = moment(event.start).hour();
  const eventEndFormat = moment(event.end).hour();
  const eventHeight = (eventEndFormat - eventStartFormat) * 40;
  const eventWidth = `calc(${100 / total}% - 2px)`;
  const eventLeft = `${(offset / total) * 100}%`;
  return (
    <div
      className="flex w-full bg-gray-200 border-[1px] border-solid border-gray-50 p-[5px] cursor-pointer absolute top-0 z-10 flex-wrap lg:flex-nowrap justify-center text-center align- lg:justify-start"
      onClick={onClick}
      style={{
        height: `${eventHeight}px`,
        width: eventWidth,
        left: eventLeft,
      }}
    >
      <strong className="mr-2 text-sm capitalize">{event.name}</strong>
      <div className="text-sm">
        {`${moment(eventStartFormat, "HH").format("h:mm A")} - ${moment(
          eventEndFormat,
          "HH"
        ).format("h:mm A")}`}
      </div>
    </div>
  );
};

export default Event;
