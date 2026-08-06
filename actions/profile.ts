'use server'

import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getUserProfile() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("user_email")?.value;

    if (!email) {
      return { error: "Unauthorized! Please login first." };
    }

    const user = await db.user.findUnique({
      where: { email },
      select: {
        name: true,
        email: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { error: "User not found!" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Fetch Profile Error:", error);
    return { error: "Something went wrong!" };
  }
}

// ইউজার নাম আপডেট করার জন্য নতুন ফাংশন
export async function updateUserName(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("user_email")?.value;
    const newName = formData.get("name") as string;

    if (!email) {
      return { error: "Unauthorized! Please login first." };
    }

    if (!newName || newName.trim() === "") {
      return { error: "Name cannot be empty!" };
    }

    const updatedUser = await db.user.update({
      where: { email },
      data: { name: newName.trim() },
    });

    revalidatePath("/dashboard/profile");
    return { success: "Name updated successfully!", user: updatedUser };
  } catch (error) {
    console.error("Update Profile Error:", error);
    return { error: "Failed to update name. Try again." };
  }
}