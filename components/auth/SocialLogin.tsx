"use client";

import GoogleButton from "./GoogleButton";

export default function SocialLogin() {
  return (
    <div className="space-y-4">

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>

        <span className="mx-4 bg-white px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Or continue with
        </span>

        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Google */}
      <GoogleButton />

      {/* Microsoft */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <svg className="w-5 h-5" viewBox="0 0 23 23">
          <path fill="#f35325" d="M1 1h10v10H1z" />
          <path fill="#81bc06" d="M12 1h10v10H12z" />
          <path fill="#05a6f0" d="M1 12h10v10H1z" />
          <path fill="#ffba08" d="M12 12h10v10H12z" />
        </svg>

        <span className="font-semibold text-sm text-gray-700">
          Continue with Microsoft
        </span>
      </button>

      {/* GitHub */}
      <button
        type="button"
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.86 10.92c.58.1.79-.25.79-.56v-2.03c-3.2.69-3.87-1.54-3.87-1.54-.52-1.33-1.27-1.69-1.27-1.69-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.27-5.24-5.68 0-1.26.45-2.28 1.18-3.08-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 015.74 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.24 2.77.12 3.06.73.8 1.18 1.82 1.18 3.08 0 4.42-2.69 5.39-5.26 5.67.41.36.78 1.07.78 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0023.5 12C23.5 5.65 18.35.5 12 .5z"/>
        </svg>

        <span className="font-semibold text-sm text-gray-700">
          Continue with GitHub
        </span>
      </button>

    </div>
  );
}