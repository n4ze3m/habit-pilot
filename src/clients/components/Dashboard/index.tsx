import { Button, Container, Group, Skeleton } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";
import { api } from "../../../utils/api";
import { Empty } from "./Empty";
import { HabitList } from "./HabitList";

//@ts-ignore
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardBody() {
  const router = useRouter();
  const { data, status } = api.habit.getAllHabits.useQuery();
  return (
    <Container>
      <Group position="right">
        <Button color="teal" onClick={() => router.push("/dashboard/new")}>
          Add Habit
        </Button>
      </Group>

      {status === "success"
        ? (
        <>
          <ul
            role="list"
            className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2"
          >
            {data?.map((habit) => <HabitList key={habit.id} {...habit} />)}
          </ul>

          {
            data?.length === 0 && <Empty />
          }
        </>
        )
        : null}

      {status === "loading"
        ? (
          <ul className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-2">
            {/* skeleton loading  */}

            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i.toString()} height={200} />
            ))}
          </ul>
        )
        : null}
    </Container>
  );
}
