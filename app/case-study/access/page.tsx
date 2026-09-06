import Link from "next/link";
import { caseStudyMetadata } from "../../lib/siteMetadata";

const PROTECTED_PATHS = new Set([
  "/case-study/discover-integration",
  "/case-study/path-360",
  "/case-study/people-leader-redesign",
  "/case-study/sa-xd",
]);

export const metadata = caseStudyMetadata({
  title: "Protected Case Study",
  description: "Protected portfolio work.",
  slug: "access",
});

function getSafeRedirect(redirect?: string) {
  if (!redirect || !PROTECTED_PATHS.has(redirect)) {
    return "/case-study/path-360";
  }

  return redirect;
}

export default async function CaseStudyAccessPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const params = await searchParams;
  const redirect = getSafeRedirect(params.redirect);
  const hasError = params.error === "1";

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20">
      <section
        className="w-full max-w-[520px] rounded-[28px] p-8 sm:p-10"
        style={{
          background: "linear-gradient(145deg, var(--card-grad-a), var(--card-grad-b))",
          border: "1px solid var(--glass-border)",
          boxShadow: "var(--glass-shadow)",
        }}
      >
        <p className="mono-label mb-5" style={{ color: "var(--accent-text)" }}>
          Protected Work
        </p>
        <form action="/api/case-study-access" method="post" className="flex flex-col gap-4">
          <input type="hidden" name="redirect" value={redirect} />
          <label className="flex flex-col gap-2">
            <span className="mono-label">Password</span>
            <input
              className="rounded-full px-5 py-4 text-base outline-none"
              name="password"
              type="password"
              autoComplete="current-password"
              autoFocus
              required
              style={{
                background: "rgba(237, 231, 218, 0.08)",
                border: "1px solid var(--border)",
                color: "var(--foreground)",
              }}
            />
          </label>
          {hasError && (
            <p className="text-sm" style={{ color: "var(--accent)" }}>
              That password didn&apos;t work. Try again.
            </p>
          )}
          <button className="sr-only" type="submit">
            Submit password
          </button>
        </form>

        <Link
          className="mono-label mt-8 inline-block border-b border-[var(--border)] pb-1 transition-colors duration-200 hover:border-[var(--accent)]"
          href="/"
          style={{ color: "var(--midtone)" }}
        >
          ← Back to projects
        </Link>
      </section>
    </main>
  );
}
