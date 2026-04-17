export const metadata = {
  title: "Client Login | USG",
  description: "Secure client portal login for Universal Screen Graphics.",
};

export default function ClientLoginPage() {
  return (
    <div className="bg-brand-offwhite min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <p className="section-sub">Secure Portal</p>
          <h1 className="text-3xl font-extrabold tracking-brand-tight text-brand-navy">
            Client Login
          </h1>
          <p className="text-sm text-brand-navy/60 mt-2">
            Access your program dashboard, reports, and assets.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form className="space-y-5">
            <div>
              <label
                htmlFor="login-email"
                className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
              >
                Email
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="login-password"
                className="block text-sm font-semibold text-brand-navy tracking-brand-tight mb-1.5"
              >
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-brand-navy/70 cursor-pointer">
                <input type="checkbox" className="accent-brand-navy" />
                Remember me
              </label>
              <button type="button" className="text-sm text-brand-sky hover:underline">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="btn-navy w-full text-center">
              Sign In
            </button>
          </form>

          <p className="text-center text-xs text-brand-navy/40 mt-6">
            Don&apos;t have access?{" "}
            <a href="/contact" className="text-brand-sky hover:underline">
              Contact your USG account manager
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
