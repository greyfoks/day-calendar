import React from "react";
import { Select, MenuItem, InputLabel } from "@mui/material";
import moment from "moment-timezone";

export const TimeSelect = ({
  change,
  value,
  labelId,
  label,
}: {
  change: (e: string | number) => void;
  value: string | number;
  labelId: string;
  label: string;
}) => {
  return (
    <>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        value={value}
        onChange={(e) => change(e.target.value)}
        className="max-w-[250px] w-full mb-5 bg-white text-gray-900 text-sm rounded-lg block border-none"
        labelId={labelId}
      >
        {[...Array(24)].map((_, index) => (
          <MenuItem key={index} value={index}>
            {moment(index, ["HH"]).format("h:mm A")}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
