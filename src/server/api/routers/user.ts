import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
	createUser: publicProcedure
		.input(z.object({ email: z.string(), id: z.string(), name: z.string() }))
		.mutation(async ({ input, ctx }) => {
			const userExists = await ctx.prisma.user.findFirst({
				where: {
					id: input.id,
				},
			});

			if (!userExists) {
				await ctx.prisma.user.create({
					data: {
						id: input.id,
						email: input.email,
						name: input.name,
					},
				});
			}
			ctx.cookie.set("userId", input.id, {
				maxAge: 7 * 24 * 60 * 60,
				path: "/",
				secure: process.env.NODE_ENV === "production",
			});
			return "Success";
		}),

	isLoggedIn: publicProcedure.mutation(async ({ ctx }) => {
		return !!ctx.userId;
	}),
});
