import { handlers } from "@/auth"
import { NextRequest } from "next/server"
import { cookies } from "next/headers"

const { GET: originalGET, POST } = handlers

const GET = async (req: NextRequest) => {
  const response = await originalGET(req);
  
  if (req.url.includes("/api/auth/callback/google")) {
    try {
      const { auth } = await import("@/auth");
      const session = await auth();
      
      if (session?.user?.email) {
        const cookieStore = await cookies();
        cookieStore.set("user_email", session.user.email, {
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 7, // ৭ দিন
        });
      }
    } catch (err) {
      console.error("Cookie setting error:", err);
    }
  }

  return response;
};

export { GET, POST }