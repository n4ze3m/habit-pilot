import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import dayjs from "dayjs";

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

	getAllHabits: publicProcedure.query(async ({ ctx }) => {
		const userId = ctx.userId as string;

		if (!userId) {
			throw new TRPCError({
				code: "UNAUTHORIZED",
				message: "You must be logged in to get all habits",
			});
		}

		const habits = await ctx.prisma.habit.findMany({
			where: {
				userId: userId,
			},
			include: {
				contributions: true,
			},
		});

		const result: {
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
		}[] = habits.map((habit) => {
			const today = dayjs().format("YYYY-MM-DD");

			const contributions = habit.contributions.reduce((acc, contribution) => {
				const date = dayjs(contribution.createdAt).format("YYYY-MM-DD");
				// @ts-ignore
				acc[date] = 1;
				return acc;
			}, {} as { [x: string]: number });

			const isTodayDone = contributions[today] ? true : false;

			return {
				...habit,
				isTodayDone,
				contributions,
			};
		});

		return result;
	}),
	checkHabit: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.userId as string;

			if (!userId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to check a habit",
				});
			}

			const habit = await ctx.prisma.habit.findFirst({
				where: {
					id: input.id,
					userId: userId,
				},
			});

			if (!habit) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Habit not found",
				});
			}

			// check if habit is already checked today
			const startOfDay = dayjs().startOf("day").toISOString();
			const endOfDay = dayjs().endOf("day").toISOString();

			const contribution = await ctx.prisma.habitContributions.findFirst({
				where: {
					habitId: habit.id,
					createdAt: {
						gte: startOfDay,
						lte: endOfDay,
					},
				},
			});

			if (contribution) {
				await ctx.prisma.habitContributions.delete({
					where: {
						id: contribution.id,
					},
				});
			} else {
				await ctx.prisma.habitContributions.create({
					data: {
						habitId: habit.id,
						userId: userId,
					},
				});
			}

			return "Habit checked";
		}),

	updateHabit: publicProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string(),

				showReminder: z.boolean(),
				reminderDay: z.string(),
				reminderTime: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.userId as string;

			if (!userId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to update a habit",
				});
			}

			const habit = await ctx.prisma.habit.findFirst({
				where: {
					id: input.id,
					userId: userId,
				},
			});

			if (!habit) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Habit not found",
				});
			}

			await ctx.prisma.habit.update({
				where: {
					id: input.id,
				},
				data: {
					name: input.name,
					showRemainder: input.showReminder,
					time: input.reminderTime,
					day: input.reminderDay,
				},
			});

			return "Habit updated";
		}),
	deleteHabit: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const userId = ctx.userId as string;

			if (!userId) {
				throw new TRPCError({
					code: "UNAUTHORIZED",
					message: "You must be logged in to delete a habit",
				});
			}

			const habit = await ctx.prisma.habit.findFirst({
				where: {
					id: input.id,
					userId: userId,
				},
			});

			if (!habit) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Habit not found",
				});
			}

			await ctx.prisma.habitContributions.deleteMany({
				where: {
					habitId: input.id,
				}
			});

			await ctx.prisma.habit.delete({
				where: {
					id: input.id,
				},
			});

			return "Habit deleted";
		}),
});
