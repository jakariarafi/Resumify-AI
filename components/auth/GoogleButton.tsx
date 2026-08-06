"use client";

interface GoogleButtonProps {
  onClick?: () => void;
  loading?: boolean;
}

export default function GoogleButton({
  onClick,
  loading = false,
}: GoogleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-60"
    >
      {loading ? (
        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
          >
            <path
              fill="#4285F4"
              d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.48c-.28 1.47-1.11 2.72-2.37 3.56v2.95h3.83c2.24-2.06 3.55-5.1 3.55-8.54z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.96-1.07 7.95-2.91l-3.83-2.95c-1.06.71-2.41 1.13-4.12 1.13-3.16 0-5.84-2.13-6.8-5H1.26v3.13A12 12 0 0012 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.2 14.27A7.2 7.2 0 014.8 12c0-.79.14-1.55.4-2.27V6.6H1.26A12 12 0 000 12c0 1.93.46 3.75 1.26 5.4l3.94-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.73c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.95 1.18 15.23 0 12 0A12 12 0 001.26 6.6L5.2 9.73c.96-2.87 3.64-5 6.8-5z"
            />
          </svg>

          <span className="font-semibold text-sm text-gray-700">
            Continue with Google
          </span>
        </>
      )}
    </button>
  );
}