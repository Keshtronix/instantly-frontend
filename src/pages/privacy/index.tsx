import { Database, Cookie, Share2, Lock, UserCheck, Mail } from "lucide-react";

// Edit this array to add/remove/reorder sections — the layout handles the rest.
const sections = [
  {
    icon: Database,
    title: "Information We Collect",
    body: "We collect information you provide directly, such as your name, email, shipping address, and payment details when you place an order or create an account. We also automatically collect usage data like device type, browser, and pages visited to help us improve our services.",
  },
  {
    icon: Cookie,
    title: "Cookies and Tracking",
    body: "We use cookies and similar technologies to keep you signed in, remember your cart, and understand how you use our site. You can control or disable cookies through your browser settings, though some features may not work correctly without them.",
  },
  {
    icon: Share2,
    title: "How We Share Your Data",
    body: "We do not sell your personal information. We may share it with trusted service providers who help us operate our business, such as payment processors and shipping carriers, and only to the extent necessary for them to perform their services.",
  },
  {
    icon: Lock,
    title: "Data Security",
    body: "We use industry-standard measures, including encryption in transit, to protect your personal information from unauthorised access, alteration, or disclosure. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security.",
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    body: "You may request access to, correction of, or deletion of your personal data at any time. You can also opt out of marketing communications by using the unsubscribe link in our emails or by contacting us directly.",
  },
  {
    icon: Mail,
    title: "Contact Us",
    body: "If you have any questions about this Privacy Policy or how we handle your data, reach out to our support team and we will respond as soon as possible.",
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-b border-border bg-[var(--grey50)]">
        <div className="w-full px-16 md:px-24 py-16">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Legal
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            This policy explains how we collect, use, and protect your
            personal information when you use our platform. Last updated:{" "}
            <span className="font-semibold text-foreground">
              September 2026
            </span>
            .
          </p>
        </div>
      </div>

      {/* Sections */}
      <div className="max-width mx-auto px-6 py-16">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div
                key={section.title}
                className="rounded-lg border border-border bg-[var(--grey50)] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--grey50)]">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                      Section {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1 text-lg font-semibold">
                      {section.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {section.body}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}




