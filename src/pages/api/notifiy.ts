import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { CourierClient } from "@trycourier/courier";
import crypto from "crypto";

interface UserApiRequest extends NextApiRequest {}
dayjs.extend(utc);
dayjs.extend(isSameOrAfter);
export default async function handler(
  req: UserApiRequest,
  res: NextApiResponse,
) {
  // if (req.headers["x-api-key"] !== process.env.API_KEY) {
  // 	res.status(401).json({ error: "Invalid API Key" });
  // 	return;
  // }

  const courier = CourierClient({
    authorizationToken: process.env.HABIT_PILOT_COURIER_KEY,
  });

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const day = new Date()
    .toLocaleString("en-US", {
      weekday: "long",
    })
    .toLowerCase();

  const startOfDay = dayjs().startOf("day").toISOString();
  const endOfDay = dayjs().endOf("day").toISOString();

  const isAlreadyFinished = await prisma.habitContributions.findMany({
    where: {
      createdAt: {
        gte: startOfDay,
        lte: endOfDay,
      },
    },
  });

  const habitIds = isAlreadyFinished.map((habit) => habit.habitId);

  const habits = await prisma.habit.findMany({
    where: {
      showRemainder: true,
      id: {
        notIn: habitIds,
      },
      day: {
        in: [day.toLowerCase(), "everyday"],
      },
    },
    include: {
      user: true,
    },
  });

  for (const habit of habits) {
    const notificationTime = habit.time;
    const notificationTimeInUTC = dayjs(notificationTime).utc();
    const currentTimeInUTC = dayjs().utc();
    const isTimeToNotify = currentTimeInUTC.isSameOrAfter(
      notificationTimeInUTC,
    );

    const isSameHour = currentTimeInUTC.hour() === notificationTimeInUTC.hour();

    const notificationHash = crypto
      .createHash("sha256")
      .update(`
		${habit.id}-${habit.time}-${habit.day}-${startOfDay}-${endOfDay}
		`)
      .digest("hex");

    const isNotified = await prisma.notification.findFirst({
      where: {
        habitId: habit.id,
        hash: notificationHash,
      },
    });

    if (isTimeToNotify && isSameHour && !isNotified) {
      const { requestId } = await courier.send({
        message: {
          to: {
            email: habit.user.email,
          },
          template: process.env!.HABIT_PILOT_COURIER_TEMPLATE as string,
          data: {
            subject: `Don't forget to ${habit.name}`,
            message: `Hey, don't forget to do your ${habit.name} today!`,
            btnTxt: "I did it!",
            btnLink: "https://habit-pilot.vercel.app/dashboard",
          },
        },
      });

      await prisma.notification.create({
        data: {
          habitId: habit.id,
          identifier: requestId,
          hash: notificationHash,
        },
      });
    }
  }

  res.status(200).json({ message: "ok" });
}
