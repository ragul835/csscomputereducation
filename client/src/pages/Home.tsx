import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Shield,
  Users,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { SectionHeader } from "@/components/shared/SectionHeader";
import {
  AnimateOnScroll,
  AnimatedItem,
} from "@/components/shared/AnimateOnScroll";
import { site, stats } from "@/data/site";
import { courses, categories } from "@/data/courses";

const featured = courses.filter((c) =>
  ["ms-office", "tally-erp9", "python", "web-designing", "dca", "pgdca"].includes(c.id),
);

const reasons = [
  {
    icon: Shield,
    title: "ISO 9001:2015 Certified",
    desc: "Quality-assured training recognised by industry and government bodies.",
  },
  {
    icon: Users,
    title: "Small batch sizes",
    desc: "Individual attention for every student. No overcrowded classrooms.",
  },
  {
    icon: BookOpen,
    title: "100% hands-on",
    desc: "Every lesson happens on a real computer with real projects.",
  },
  {
    icon: Award,
    title: "Recognised certificates",
    desc: "Government-approved certificates that employers trust.",
  },
  {
    icon: Clock,
    title: "Flexible timings",
    desc: "Morning, afternoon and evening batches to suit your schedule.",
  },
  {
    icon: Sparkles,
    title: "Placement guidance",
    desc: "Resume building, interview coaching and job placement support.",
  },
];

export function Home() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hero-gradient-start)] via-[var(--hero-gradient-mid)] to-[var(--hero-gradient-end)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

        <Container className="relative z-10 pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm"
            >
              <Shield className="h-4 w-4" />
              ISO 9001:2015 Certified Institute
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Learn computers{" "}
              <span className="relative">
                the right way
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                >
                  <path
                    d="M2 8c40-6 80-6 120-3s60 4 76-1"
                    stroke="var(--accent)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                </svg>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl"
            >
              {site.tagline} Practical, job-ready computer training in{" "}
              {site.area} since {site.established}.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Link href="/courses">
                <Button size="xl" variant="accent">
                  Browse courses
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="xl"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:text-white"
                >
                  Book a free demo
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60"
            >
              {["5,000+ students", "18+ courses", "Since 2018"].map((text) => (
                <span key={text} className="flex items-center gap-1.5">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {text}
                </span>
              ))}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── Stats strip ── */}
      <section className="relative -mt-16 z-10">
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

      {/* ── Featured courses ── */}
      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="What we teach"
            title="Popular courses"
            description="From office basics to programming — pick the skill that moves your career forward."
          />
          <AnimateOnScroll className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((course) => {
              const Icon = course.icon;
              return (
                <AnimatedItem key={course.id}>
                  <div className="group relative rounded-xl border border-border/60 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                        {course.duration}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg font-bold">{course.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {course.desc}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {course.highlights.map((h) => (
                        <span
                          key={h}
                          className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimateOnScroll>
          <div className="mt-10 text-center">
            <Link href="/courses">
              <Button variant="outline" size="lg">
                View all {courses.length} courses
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Why choose us ── */}
      <section className="bg-muted/40 py-20 sm:py-28">
        <Container>
          <SectionHeader
            eyebrow="Why CSS Computer Education"
            title="Built different from day one"
            description={`Since ${site.established}, we’ve focused on one thing: making sure every student who walks in leaves with real, practical skills.`}
          />
          <AnimateOnScroll className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => {
              const Icon = r.icon;
              return (
                <AnimatedItem key={r.title}>
                  <div className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold">
                        {r.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {r.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimateOnScroll>
        </Container>
      </section>

      {/* ── Course categories marquee ── */}
      <section className="border-y border-border/40 py-10 overflow-hidden">
        <Container className="mb-6">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {categories.length - 1} categories &middot; {courses.length} courses
          </p>
        </Container>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 animate-[marquee_25s_linear_infinite] w-max">
            {[...courses, ...courses].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={`${c.id}-${i}`}
                  className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card px-4 py-2.5 text-sm font-medium whitespace-nowrap"
                >
                  <Icon className="h-4 w-4 text-primary" />
                  {c.title}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 sm:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative z-10 max-w-xl">
              <h2 className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl lg:text-4xl">
                Ready to start your journey?
              </h2>
              <p className="mt-4 text-primary-foreground/75 text-lg leading-relaxed">
                Walk in for a free demo class, or send us an enquiry. We
                help you pick the right course and batch timing.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 shadow-md"
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-primary-foreground hover:bg-white/10"
                  >
                    WhatsApp us
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
