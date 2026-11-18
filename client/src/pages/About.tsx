import { Link } from "wouter";
import {
  Target,
  HandshakeIcon,
  TrendingUp,
  Heart,
  ArrowRight,
  CheckCircle,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  AnimateOnScroll,
  AnimatedItem,
} from "@/components/shared/AnimateOnScroll";
import { site, stats } from "@/data/site";

const values = [
  {
    icon: Target,
    title: "Practical first",
    desc: "We believe in learning by doing — every lesson happens on a real computer with real projects.",
  },
  {
    icon: HandshakeIcon,
    title: "Patient teaching",
    desc: "No one is left behind. Our trainers adapt to every student’s pace and explain until it clicks.",
  },
  {
    icon: TrendingUp,
    title: "Career support",
    desc: "Guidance on résumé building, interview preparation and job placement support after the course.",
  },
  {
    icon: Heart,
    title: "Community trust",
    desc: `Thousands of students across ${site.area} have trained here since ${site.established}.`,
  },
];

const steps = [
  {
    n: "01",
    title: "Choose a course",
    desc: "Pick a program that matches your goal and schedule.",
  },
  {
    n: "02",
    title: "Enroll & join a batch",
    desc: "Simple admission with flexible fee options.",
  },
  {
    n: "03",
    title: "Learn hands-on",
    desc: "Practice in the lab with project-based lessons.",
  },
  {
    n: "04",
    title: "Get certified",
    desc: "Earn a recognised certificate and placement guidance.",
  },
];

const checklist = [
  "ISO 9001:2015 Certified — quality you can trust",
  "Government-recognised certificates",
  "Small batches with individual attention",
  "Placement guidance and interview coaching",
  "Flexible morning, afternoon and evening batches",
];

export function About() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-gradient-start)] via-[var(--hero-gradient-mid)] to-[var(--hero-gradient-end)] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,rgba(255,255,255,0.06),transparent_50%)]" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Shield className="h-4 w-4" />
              ISO 9001:2015 Certified Institute
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              About {site.name}
            </h1>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              {site.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* ── Stats ── */}
      <section className="relative -mt-10 z-10">
        <Container>
          <AnimateOnScroll className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((s) => (
              <AnimatedItem key={s.label}>
                <div className="rounded-xl border border-border/50 bg-card p-5 text-center shadow-lg">
                  <div className="font-heading text-2xl font-bold text-primary sm:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {s.label}
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-12 items-center lg:grid-cols-2">
            <div>
              <div className="relative rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-8 sm:p-12">
                <div className="absolute top-4 right-4 rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-primary-foreground">
                  Since {site.established}
                </div>
                <div className="space-y-4 text-6xl font-heading font-bold text-primary/20 sm:text-8xl">
                  <div>Learn.</div>
                  <div>Practice.</div>
                  <div>Succeed.</div>
                </div>
              </div>
            </div>
            <div>
              <span className="mb-3 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary">
                Our mission
              </span>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Making quality computer education accessible to everyone
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {site.name} was founded to give students and working
                professionals in {site.area} the practical, job-ready
                computer skills they need &mdash; without having to travel
                to a big city. We focus on small batch sizes, patient
                trainers, and hands-on lab practice so every learner leaves
                confident and employable.
              </p>
              <ul className="mt-6 space-y-3">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Values ── */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="What we stand for"
            title="Our values"
          />
          <AnimateOnScroll className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <AnimatedItem key={v.title}>
                  <div className="rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-md">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-heading text-base font-bold">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.desc}
                    </p>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Steps ── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="How it works"
            title="From admission to certification"
          />
          <AnimateOnScroll className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <AnimatedItem key={step.n}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-border/60 -translate-x-1/2" />
                  )}
                  <div className="rounded-xl border border-border/50 bg-card p-6 text-center transition-all duration-300 hover:shadow-md">
                    <span className="font-heading text-3xl font-bold text-primary/20">
                      {step.n}
                    </span>
                    <h3 className="mt-2 font-heading text-base font-bold">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </AnimatedItem>
            ))}
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-lg mx-auto">
              <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">
                Ready to start your journey?
              </h2>
              <p className="mt-3 text-primary-foreground/75 leading-relaxed">
                Book a free demo class or visit us in Mathalangulam.
              </p>
              <div className="mt-6">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-md"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
