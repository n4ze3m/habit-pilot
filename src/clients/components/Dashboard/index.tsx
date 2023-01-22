import { Button, Container, Group } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { HabitList } from "./HabitList";

//@ts-ignore
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardBody() {
  const router = useRouter();
  return (
    <Container>
      <Group position="right">
        <Button color="teal" onClick={() => router.push("/dashboard/new")}>
          Add Habit
        </Button>
      </Group>

      <ul
        role="list"
        className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2"
      >
        <HabitList />
        <HabitList />
        <HabitList />
        <HabitList />
        <HabitList />
      </ul>
    </Container>
  );
}
