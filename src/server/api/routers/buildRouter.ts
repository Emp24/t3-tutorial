import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

import { contextProps } from "@trpc/react-query/shared";
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

  listBuilds: publicProcedure.query(async ({ ctx }) => {
    const builds = await ctx.prisma.buildOrder.findMany({
      select: { build: true, matchUp: true, id: true },
    });
    return builds;
  }),

  //   getAll: publicProcedure.query(({ ctx }) => {
  //     return ctx.pr1isma.example.findMany();
  //   }),

  //   getSecretMessage: protectedProcedure.query(() => {
  //     return "you can now see this secret message!";
  //   }),
});
