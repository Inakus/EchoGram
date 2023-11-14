import { z } from "zod";
import { User, clerkClient } from "@clerk/nextjs/server";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profileImageUrl: user.imageUrl,
  }
}


export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.post.findMany({
      take: 10
    })

    const users = (await clerkClient.users.getUserList({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      userId: posts.map(post => post.userId),
      limit: 10
    })).map(filterUserForClient)


    return posts.map(post => ({
      post,
      author: users.find(user => user.id === post.userId)
    }))
  })
});
