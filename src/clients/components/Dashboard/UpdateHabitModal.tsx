import { Transition } from "@headlessui/react";
import {
  Button,
  Checkbox,
  Divider,
  Group,
  Modal,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { api } from "../../../utils/api";

const days = [
  { label: "Everyday", value: "everyday" },
  { label: "Monday", value: "monday" },
  { label: "Tuesday", value: "tuesday" },
  { label: "Wednesday", value: "wednesday" },
  { label: "Thursday", value: "thursday" },
  { label: "Friday", value: "friday" },
  { label: "Saturday", value: "saturday" },
  { label: "Sunday", value: "sunday" },
];

interface Props {
  open: boolean;
  onClose: () => void;
  data: {
    name: string;
    showReminder: boolean;
    reminderDay: string;
    reminderTime: string;
    id: string;
  };
}

export const UpdateHabitModal = (props: Props) => {
  const form = useForm({
    initialValues: {
      ...props.data,
    },
  });

  React.useEffect(() => {
    form.setValues(props.data);
  }, [props.data]);

  const client = api.useContext();
  const {
    mutate: updateHabit,
    isLoading,
  } = api.habit.updateHabit.useMutation({
    onSuccess: () => {
      showNotification({
        title: "Habit Updated",
        message: "Yeah! You updated a habit. 🎉",
        color: "green",
      });
      client.invalidate();
      props.onClose();
    },
    onError: () => {
      showNotification({
        title: "Error",
        message: "Something went wrong. Please try again.",
        color: "red",
      });
    },
  });

  return (
    <Modal
      opened={props.open}
      onClose={props.onClose}
      title="Update Habit Details"
    >
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        {"Let's Start an Awesome Habit 👀"}
      </h3>

      <div className="mt-5">
        <form
          onSubmit={form.onSubmit((values) =>
            updateHabit({
              ...values,
              id: props.data.id,
            })
          )}
        >
          <Stack my="md">
            <TextInput
              required={true}
              placeholder="Walk the dog 🐶"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)}
            />
          </Stack>

          <Divider my="md" />

          <Checkbox
            label="Remind me to do this habit"
            // @ts-ignore
            checked={form.values.showReminder}
            onChange={(event) => {
              form.setFieldValue("showReminder", event.currentTarget.checked);
            }}
          />
          <Transition
            show={form.values.showReminder}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Group my="md" grow>
              <Select
                data={days}
                placeholder="Select a day"
                value={form.values.reminderDay}
                onChange={(value) => {
                  if (value) {
                    form.setFieldValue("reminderDay", value);
                  }
                }}
              />
              <TimeInput
                amLabel="am"
                pmLabel="pm"
                format="12"
                defaultValue={new Date()}
                onChange={(value) => {
                  form.setFieldValue("reminderTime", value.toTimeString());
                }}
              />
            </Group>
          </Transition>
          <Button
            loading={isLoading}
            fullWidth={true}
            type="submit"
            color="teal"
            mt="md"
          >
            Update Habit
          </Button>
        </form>
      </div>
    </Modal>
  );
};
