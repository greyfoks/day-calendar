import React from "react";

export const Button = ({
  value,
  click,
}: {
  value: string;
  click: () => void;
}) => {
  return (
    <button
      className="m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
      onClick={click}
    >
      {value}
    </button>
  );
};
