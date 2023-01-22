import { Button, Group } from "@mantine/core";
import React from "react";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardBody() {
  return (
    <>
      <Group position="right">
        <Button color="teal">
          Add Habit
        </Button>
      </Group>
    </>
  );
}
