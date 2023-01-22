import {
  Button,
  Checkbox,
  Chip,
  Container,
  Divider,
  Group,
  Paper,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";
import { Transition } from "@headlessui/react";
import { TimeInput } from "@mantine/dates";
export const NewBody = () => {
  const form = useForm({
    initialValues: {
      name: "",
      showReminder: false,
      reminderDay: "everyday",
      reminderTime: "",
    },
  });
  const suggestions = [
    "Read a book 📚",
    "Go for a run 🏃‍♂️",
    "Go to the gym 🏋️‍♂️",
    "Meditate 🧘‍♂️",
    "Take a nap 💤",
    "Take a shower 🚿",
    "Eat a healthy meal 🍎",
  ];

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

  return (
    <Container>
      <Paper radius="md" p="xl" withBorder={true}>
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          {"Let's Start an Awesome Habit 👀"}
        </h3>

        <div className="mt-5">
          <form>
            <Stack my="md">
              <TextInput
                required={true}
                placeholder="Walk the dog 🐶"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)}
              />

              <Chip.Group
                position="center"
                color="gray"
                onChange={(value) => {
                  if (typeof value === "string") {
                    form.setFieldValue("name", value);
                  } else {
                    form.setFieldValue("name", value.join(""));
                  }
                }}
              >
                {suggestions.map((suggestion) => (
                  <Chip key={suggestion} value={suggestion}>
                    {suggestion}
                  </Chip>
                ))}
              </Chip.Group>
            </Stack>

            <Divider my="md" />

            <Checkbox
              label="Remind me to do this habit"
              // @ts-ignore
              value={form.values.showReminder}
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
                />
              </Group>
            </Transition>
            <Button fullWidth={true} type="submit" color="teal" mt="md">
              Create Habit
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
};
