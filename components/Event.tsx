import React from "react";
import { TEvent } from "./types";
import moment from "moment";

const Event = ({
  event,
  onClick,
  total,
  offset,
}: {
  event: TEvent;
  onClick: () => void;
  total: number;
  offset: number;
}) => {
  return (
    <div
      className="flex w-full bg-gray-200 border-[1px] border-solid border-gray-50 p-[5px] cursor-pointer absolute top-0 z-10 flex-wrap lg:flex-nowrap justify-center text-center align- lg:justify-start"
      onClick={onClick}
      style={{
        height: `${(event.end - event.start) * 40}px`,
        width: `calc(${100 / total}% - 2px)`,
        left: `${(offset / total) * 100}%`,
      }}
    >
      <strong className="mr-2 text-sm capitalize">{event.name}</strong>
      <div className="text-sm">{`${moment(event.start, "HH").format(
        "h:mm A"
      )} - ${moment(event.end, "HH").format("h:mm A")}`}</div>
    </div>
  );
};

export default Event;
