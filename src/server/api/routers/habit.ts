import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const habitRouter = createTRPCRouter({
	createHabit: publicProcedure
		.input(
			z.object({
				name: z.string(),
				showReminder: z.boolean(),
				reminderDay: z.string(),
				reminderTime: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const userId: string = ctx.userId as string;

			if (!userId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to create a habit",
				});
			}

			await ctx.prisma.habit.create({
				data: {
					name: input.name,
					showRemainder: input.showReminder,
					time: input.reminderTime,
					day: input.reminderDay,
					userId: ctx.userId as string,
				},
			});

			return "Habit created";
		}),
});
