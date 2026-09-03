import { FileText, Shield, CreditCard, Truck, RotateCcw, Scale } from "lucide-react";

// Edit this array to add/remove/reorder sections — the layout handles the rest.
const sections = [
  {
    icon: FileText,
    title: "Acceptance of Terms",
    body: "By accessing or using our website, mobile app, or any of our services, you agree to be bound by these Terms and Conditions in full. If you do not agree with any part, please discontinue use immediately. We may update these terms at any time — continued use after changes constitutes acceptance.",
  },
  {
    icon: Shield,
    title: "Use of Services",
    body: "You agree to use our services solely for lawful purposes. You must not use our platform to engage in any fraudulent activity, transmit harmful content, attempt unauthorised access, or violate any applicable law or regulation. Violations may result in immediate account termination.",
  },
  {
    icon: CreditCard,
    title: "Payments and Pricing",
    body: "All prices are listed in the applicable currency and are subject to change without prior notice. Payment must be completed at checkout before an order is confirmed. We reserve the right to refuse or cancel any order suspected of fraud or error in pricing.",
  },
  {
    icon: Truck,
    title: "Shipping and Delivery",
    body: "Delivery timelines are estimates and not guaranteed. We are not liable for delays caused by couriers, customs, or events outside our control. Risk of loss passes to the customer once an order is handed to the shipping carrier.",
  },
  {
    icon: RotateCcw,
    title: "Returns and Refunds",
    body: "Eligible items may be returned within the period stated on our Returns page, provided they are unused and in original packaging. Refunds are issued to the original payment method once the return is received and inspected.",
  },
  {
    icon: Scale,
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, we are not liable for any indirect, incidental, or consequential damages arising from your use of our services. Our total liability for any claim will not exceed the amount you paid for the relevant order.",
  },
];

export default function TermsAndConditions() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-b border-border bg-[var(--grey50)]">
        <div className="w-full px-16 md:px-24 py-16">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Legal
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            These terms govern your use of our platform. Please read them
            carefully before using our services. Last updated:{" "}
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
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[var(--grey100)]">
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