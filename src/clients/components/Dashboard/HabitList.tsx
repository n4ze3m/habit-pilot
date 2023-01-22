import { Checkbox } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import React from "react";
import Calendar from "react-github-contribution-calendar";

export const HabitList = () => {
  var values = {
    "2016-06-23": 1,
    "2016-06-26": 2,
    "2016-06-27": 3,
    "2016-06-28": 4,
    "2016-06-29": 4,
  };
  var until = "2016-06-30";
  return (
    <li className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex bg-gray-50 border border-gray-200 rounded-l-md">
          <Checkbox color="teal" size="lg" />
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md">
          <div className="flex-1 truncate text-sm">
            <span className="font-medium text-gray-900 hover:text-gray-600">
              SOme name dfasdsd asd
            </span>
          </div>
          <div className="flex-shrink-0 pr-2">
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">Open options</span>
              <IconDots className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <Calendar
          values={values}
          until={until}
          weekLabelAttributes={undefined}
          monthLabelAttributes={undefined}
          panelAttributes={undefined}
        />
      </div>
    </li>
  );
};
