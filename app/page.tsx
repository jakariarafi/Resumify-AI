import { db } from "@/lib/db";
import { cookies } from "next/headers";

import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustedCompanies from "@/components/landing/TrustedCompanies";
import Features from "@/components/landing/Features";
import Templates from "@/components/landing/Templates";
import HowItWorks from "@/components/landing/HowItWorks";
import Pricing from "@/components/landing/Pricing";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default async function Home() {
  const cookieStore = await cookies();
  const userEmail = cookieStore.get("user_email")?.value;

  let userData = null;

  if (userEmail) {
    userData = await db.user.findUnique({
      where: { email: userEmail },
    });
  }

  // ইউজার নেম থেকে শর্টফর্ম তৈরি (যেমন: Al Jakaria -> AJ)
  const getInitials = (fullName: string) => {
    if (!fullName) return "U";
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

  const userName = userData?.name || "User";
  const userInitials = getInitials(userName);
  const isLoggedIn = !!userData;

  return (
    <main className="min-h-screen bg-white text-gray-900 selection:bg-indigo-600 selection:text-white">
      {/* Navbar এ লগইন স্ট্যাটাস ও নাম পাস করা হলো */}
      <Navbar 
        isLoggedIn={isLoggedIn} 
        userName={userName} 
        userInitials={userInitials} 
      />
      
      <Hero />
      <TrustedCompanies />
      <Features />
      <Templates />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

export const dynamic = "force-dynamic";
export const revalidate = 0;