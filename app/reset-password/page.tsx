'use client'

import { useState, useRef, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { resetPassword } from "@/actions/auth"
import Link from "next/link"
import { Eye, EyeOff, Lock } from "lucide-react"

function ResetPasswordForm() {
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  
  const formRef = useRef<HTMLFormElement>(null)
  
  const searchParams = useSearchParams()
  const email = searchParams.get("email")
  const router = useRouter()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    const formData = new FormData(event.currentTarget)
    const newPassword = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // নতুন পাসওয়ার্ড এবং রিটাইপ পাসওয়ার্ড মিল আছে কি না চেক করা
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match!")
      setLoading(false)
      return
    }

    if (email) {
      formData.append("email", email)
    }

    const result = await resetPassword(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else if (result.success) {
      setSuccess(result.success)
      setLoading(false)
      formRef.current?.reset()
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-slate-950 via-indigo-950 to-violet-950 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white/95 p-8 shadow-2xl backdrop-blur-md border border-white/20">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-2">Reset Password</h2>
        <p className="text-gray-500 text-xs text-center mb-6">Enter your new password below.</p>

        {error && <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-xs font-medium text-center">{error}</div>}
        {success && <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-xs font-medium text-center">{success} Redirecting to login...</div>}

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
          
          {/* New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">New Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showNew ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-11 pr-12 py-3 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Retype New Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">Retype New Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="••••••••"
                className="w-full rounded-xl bg-gray-50 border border-gray-200 pl-11 pr-12 py-3 text-sm text-gray-900 focus:border-indigo-600 focus:outline-none transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3.5 transition duration-200 disabled:opacity-50 shadow-lg shadow-indigo-600/20 cursor-pointer mt-2"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link href="/login" className="text-xs font-semibold text-indigo-600 hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-950 text-white text-sm">Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  )
}