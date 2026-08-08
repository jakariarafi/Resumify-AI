'use server'

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!name || !email || !password) {
    return { error: "All fields are required!" }
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "An account with this email already exists!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return { success: "Account created successfully!", user: newUser }
  } catch (error) {
    console.error("Registration Error:", error)
    return { error: "Something went wrong, please try again." }
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "All fields are required!" }
  }

  try {
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return { error: "Invalid email or password!" }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return { error: "Invalid email or password!" }
    }

    const cookieStore = await cookies()
    cookieStore.set("user_email", user.email, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    return { success: "Login successful!", user }
  } catch (error) {
    console.error("Login Error:", error)
    return { error: "Something went wrong, please try again." }
  }
}

export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete("user_email")
  redirect("/")
}

export async function forgotPassword(formData: FormData) {
  const email = formData.get("email") as string

  if (!email) {
    return { error: "Email is required!" }
  }

  try {
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return { error: "No account found with this email!" }
    }

    const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?email=${encodeURIComponent(email)}`

    await transporter.sendMail({
      from: `"Resumify.AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Your Password - Resumify.AI',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; background: #f9f9f9; border-radius: 10px; color: #333;">
          <h2 style="color: #4f46e5;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>We received a request to reset your password. Click the button below to set a new password:</p>
          <a href="${resetLink}" style="display: inline-block; background: #4f46e5; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 15px 0;">Reset Password</a>
          <p style="font-size: 13px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });

    return { success: "Password reset link has been sent to your email!" }
  } catch (error) {
    console.error("Nodemailer Error:", error)
    return { error: "Failed to send email. Please try again." }
  }
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { error: "Email and new password are required!" }
  }

  try {
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user) {
      return { error: "User not found!" }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    return { success: "Password updated successfully!" }
  } catch (error) {
    console.error("Reset Password Error:", error)
    return { error: "Something went wrong, please try again." }
  }
}

export async function changePassword(formData: FormData) {
  const cookieStore = await cookies()
  const email = cookieStore.get("user_email")?.value

  const oldPassword = formData.get("oldPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!email) {
    return { error: "Unauthorized! Please login first." }
  }

  if (!oldPassword || !newPassword || !confirmPassword) {
    return { error: "All fields are required!" }
  }

  if (newPassword !== confirmPassword) {
    return { error: "New password and confirm password do not match!" }
  }

  try {
    const user = await db.user.findUnique({
      where: { email }
    })

    if (!user || !user.password) {
      return { error: "User not found!" }
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password)
    if (!isPasswordValid) {
      return { error: "Incorrect old password!" }
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    await db.user.update({
      where: { email },
      data: { password: hashedPassword },
    })

    return { success: "Password changed successfully!" }
  } catch (error) {
    console.error("Change Password Error:", error)
    return { error: "Something went wrong, please try again." }
  }
}

export async function deleteUserAccount() {
  try {
    const cookieStore = await cookies();
    const email = cookieStore.get("user_email")?.value;

    if (!email) {
      return { error: "Unauthorized!" };
    }

    await db.user.delete({
      where: { email },
    });

    cookieStore.delete("user_email");

    return { success: true };
  } catch (error) {
    console.error("Delete Account Error:", error);
    return { error: "Failed to delete account!" };
  }
}

export async function sendProCodeEmail(email: string, code: string) {
  if (!email || !code) {
    return { error: "Email and code are required!" }
  }

  try {
    await transporter.sendMail({
      from: `"Resumify.AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your PRO Account Activation Code - Resumify.AI',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; background: #f9f9f9; border-radius: 10px; color: #333;">
          <h2 style="color: #4f46e5;">Your PRO Access is Unlocked!</h2>
          <p>Hello,</p>
          <p>Thank you for your payment. Here is your unique activation code to unlock lifetime PRO access:</p>
          <div style="background: #e0e7ff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #4f46e5; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p>Use this code on the activation page to activate your account.</p>
        </div>
      `,
    });

    return { success: "PRO code sent successfully!" };
  } catch (error) {
    console.error("PRO Code Email Error:", error);
    return { error: "Failed to send PRO code email." };
  }
}

export async function sendStudentVerificationEmail(email: string, code: string) {
  if (!email || !code) {
    return { error: "Email and code are required!" }
  }

  // ব্যাকএন্ড টার্মিনালে কোড প্রিন্ট করে রাখা হলো, যাতে মেইল ডিলে হলেও টেস্ট করা যায়
  console.log(`========================================`);
  console.log(`[STUDENT VERIFICATION] Email: ${email} | Code: ${code}`);
  console.log(`========================================`);

  try {
    await transporter.sendMail({
      from: `"Resumify.AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Student Verification Code - Resumify.AI',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; background: #f9f9f9; border-radius: 10px; color: #333;">
          <h2 style="color: #4f46e5;">Student Email Verification</h2>
          <p>Hello,</p>
          <p>You requested free PRO access using your student (.edu) email. Here is your verification code:</p>
          <div style="background: #e0e7ff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 2px; color: #4f46e5; border-radius: 8px; margin: 20px 0;">
            ${code}
          </div>
          <p>Enter this code on the website to verify your student status.</p>
        </div>
      `,
    });

    return { success: "Verification code sent successfully!" };
  } catch (error) {
    console.error("Student Verification Email Error:", error);
    // মেইল ফেইল করলেও কোড যাতে ব্যাকএন্ডে রান করে তার জন্য ফলব্যাক
    return { success: "Code generated successfully!" };
  }
}