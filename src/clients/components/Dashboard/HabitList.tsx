import { Checkbox, Loader } from "@mantine/core";
import { IconDots } from "@tabler/icons";
import dayjs from "dayjs";
import React from "react";
import Calendar from "react-github-contribution-calendar";
import { api } from "../../../utils/api";

type Props = {
  isTodayDone: boolean;
  contributions: {
    [x: string]: number;
  };
  id: string;
  name: string;
  showRemainder: boolean;
  day: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
};
var panelColors = ["#f0f7f1", "#39d353"];

export const HabitList = (props: Props) => {
  const today = dayjs().format("YYYY-MM-DD");

  const client = api.useContext();

  const { mutateAsync: checkHabit, isLoading } = api.habit.checkHabit
    .useMutation({
      onSuccess: async () => {
        await client.habit.getAllHabits.refetch();
      },
    });

  return (
    <li
      className={`col-span-1 divide-y divide-gray-200 rounded-lg ${
        props.isTodayDone ? "bg-green-50" : "bg-white"
      } shadow`}
    >
      <div className="flex w-full items-center justify-between space-x-6 p-6">
        <div className="flex bg-gray-50 border border-gray-200 rounded-md">
          {isLoading
            ? (
              <div className="flex items-center justify-center h-8 w-8 rounded-md bg-gray-50 border-x border-gray-200">
                <Loader color="teal" size="sm" />
              </div>
            )
            : (
              <Checkbox
                onChange={async () => {
                  await checkHabit({ id: props.id });
                }}
                defaultChecked={props.isTodayDone}
                color="teal"
                size="lg"
              />
            )}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md">
          <div className="flex-1 truncate text-sm">
            <span
              className={`
            font-semibold text-gray-900 hover:text-gray-600 text-lg ${
                props.isTodayDone ? "line-through" : ""
              }
            `}
            >
              {props.name}
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
          values={props.contributions}
          until={today}
          weekLabelAttributes={undefined}
          monthLabelAttributes={undefined}
          panelAttributes={undefined}
          panelColors={panelColors}
        />
      </div>
    </li>
  );
};
