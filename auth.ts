import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { cookies } from "next/headers"
import { db } from "@/lib/db"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user }) {
      if (user && user.email) {
        // ডাটাবেজে ইউজার না থাকলে রেজিস্টার করে নিতে পারেন অথবা চেক করতে পারেন
        const existingUser = await db.user.findUnique({
          where: { email: user.email }
        })

        if (!existingUser) {
          await db.user.create({
            data: {
              name: user.name || "Google User",
              email: user.email,
              password: "", // গুগল ইউজারের জন্য পাসওয়ার্ড ফাঁকা থাকতে পারে
            }
          })
        }

        // কাস্টম কুকি সেট করা যা আপনার ড্যাশবোর্ড বা প্রটেক্টেড রাউট চেক করে
        const cookieStore = await cookies()
        cookieStore.set("user_email", user.email, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24, // ১ দিন
          path: "/",
        })
      }
      return true
    },
  },
})