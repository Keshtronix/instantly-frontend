import { ShieldCheck, Zap, Heart, Wallet, Users, Globe } from "lucide-react";

// Edit these — swap in your real numbers once you have them.
const storyStats = [
  { value: "10K+", label: "Happy customers" },
  { value: "500+", label: "Products listed" },
  { value: "20+", label: "Countries served" },
  { value: "5+", label: "Years of trust" },
];

const missionStats = [
  { value: "2020", label: "Founded" },
  { value: "25+", label: "Team size" },
  { value: "4.8 ★", label: "Avg. rating" },
  { value: "< 2%", label: "Return rate" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Quality guaranteed",
    body: "Every product in our catalog is carefully vetted to meet the highest standards of performance and durability.",
  },
  {
    icon: Zap,
    title: "Fast and reliable",
    body: "From browsing to delivery, we're obsessed with speed. Orders are processed and dispatched within 24 hours.",
  },
  {
    icon: Heart,
    title: "Customer first",
    body: "We genuinely care about your experience. Our support team is always here to make things right.",
  },
  {
    icon: Wallet,
    title: "Transparent pricing",
    body: "No hidden fees, no surprises. What you see is what you pay — fair, honest, always.",
  },
  {
    icon: Users,
    title: "Community driven",
    body: "Built around real feedback from real customers. Every feature we ship comes from listening to you.",
  },
  {
    icon: Globe,
    title: "Worldwide reach",
    body: "Serving customers across the globe with localized experiences and reliable logistics.",
  },
];

export default function About() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero / Story */}
      <div className="max-width mx-auto px-6 py-20 text-center">
        <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
          Our story
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-4xl font-bold tracking-tight md:text-5xl">
          Built for people who love great products.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-muted-foreground">
          We started with a simple belief — shopping for quality products
          shouldn't be complicated, overpriced, or frustrating. Since day one,
          we've been on a mission to make great products accessible to everyone,
          delivered with the care and speed you deserve.
        </p>

        <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
          {storyStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen border-t border-border bg-[var(--grey50)]">
        <div className="max-width mx-auto px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Our mission
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Connecting people with the products they love.
            </h2>
            <p className="mt-5 text-muted-foreground">
              We exist to close the gap between great products and the people
              who need them. Our platform curates only the best — rigorously
              tested, fairly priced, and rapidly delivered — because we believe
              everyone deserves access to things that make life better.
            </p>
            <p className="mt-4 text-muted-foreground">
              We're not just a marketplace. We're a team that genuinely loves
              the products we carry. Every listing, every deal, and every
              recommendation comes from a place of real passion and expertise.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-width mx-auto px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            What we stand for
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            Our core values
          </h2>
          <p className="mt-5 text-muted-foreground">
            These aren't just words on a wall — they shape every decision we
            make, every product we pick, and every interaction we have.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-[var(--grey50)] p-6"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[var(--grey100)]">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="mt-4 font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
