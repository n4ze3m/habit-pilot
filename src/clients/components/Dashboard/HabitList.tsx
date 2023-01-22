import { Checkbox, Loader, Menu } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconDots } from "@tabler/icons";
import dayjs from "dayjs";
import React from "react";
import Calendar from "react-github-contribution-calendar";
import { api } from "../../../utils/api";
import { UpdateHabitModal } from "./UpdateHabitModal";

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

  const [modalData, setModalData] = React.useState<{
    name: string;
    showReminder: boolean;
    reminderDay: string;
    reminderTime: string;
    id: string;
  }>({
    name: "",
    showReminder: false,
    reminderDay: "",
    reminderTime: "",
    id: "",
  });

  const [openModal, setOpenModal] = React.useState(false);

  const { mutateAsync: checkHabit, isLoading } = api.habit.checkHabit
    .useMutation({
      onSuccess: async () => {
        await client.invalidate();
      },
    });

  const { mutateAsync: deleteHabit, isLoading: isDeleting } = api.habit
    .deleteHabit.useMutation({});

  const openDeleteModal = () =>
    openConfirmModal({
      title: "Delete Habit",
      centered: true,
      children: (
        <p className="text-gray-700">
          Are you sure you want to delete this Habit? This action cannot be
          undone.
        </p>
      ),
      labels: { confirm: "Delete Habit", cancel: "No don't delete it" },
      confirmProps: { color: "red", loading: isDeleting },
      onConfirm: async () => {
        await deleteHabit({ id: props.id });
        await client.invalidate();
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
                checked={props.isTodayDone}
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
            <Menu
              withArrow
            >
              <Menu.Target>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">Open options</span>
                  <IconDots className="h-5 w-5" aria-hidden="true" />
                </button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    setModalData({
                      name: props.name,
                      showReminder: props.showRemainder,
                      reminderDay: props.day,
                      reminderTime: props.time,
                      id: props.id,
                    });
                    setOpenModal(true);
                  }}
                >
                  Edit
                </Menu.Item>
                <Menu.Item
                  color={"red"}
                  onClick={openDeleteModal}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
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

      <UpdateHabitModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        data={modalData}
      />
    </li>
  );
};
