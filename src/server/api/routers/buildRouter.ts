import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import { z } from "zod";

export const buildsRouter = createTRPCRouter({
  createBuild: publicProcedure
    .input(
      z.object({
        matchUp: z.string(),
        build: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const build = await ctx.prisma.buildOrder.create({
        data: {
          matchUp: input.matchUp,
          build: input.build,
        },
      });

      return build;
    }),

  //   getAll: publicProcedure.query(({ ctx }) => {
  //     return ctx.pr1isma.example.findMany();
  //   }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
