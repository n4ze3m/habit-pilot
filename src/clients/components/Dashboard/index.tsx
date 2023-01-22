import { Button, Group } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DashboardBody() {
  const router = useRouter();
  return (
    <>
      <Group position="right">
        <Button color="teal" onClick={() => router.push("/dashboard/new")}>
          Add Habit
        </Button>
      </Group>
    </>
  );
}
