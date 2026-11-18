import { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { courses, categories, type Course } from "@/data/courses";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

function CourseCard({ course }: { course: Course }) {
  const Icon = course.icon;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-xl border border-border/60 bg-card overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
    >
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            <Icon className="h-6 w-6" />
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-[11px] font-bold text-muted-foreground">
            {course.category}
          </span>
        </div>

        <h3 className="font-heading text-lg font-bold">{course.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2">
          {course.desc}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            {course.level}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {course.highlights.map((h) => (
            <span
              key={h}
              className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground"
            >
              {h}
            </span>
          ))}
        </div>
      </div>

      <div className="border-t border-border/50 px-6 py-3">
        <Link href="/contact">
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 cursor-pointer">
            Enquire about this course
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export function Courses() {
  const [active, setActive] = useState<string>("All");

  const filtered =
    active === "All"
      ? courses
      : courses.filter((c) => c.category === active);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-gradient-start)] via-[var(--hero-gradient-mid)] to-[var(--hero-gradient-end)] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_30%,rgba(255,255,255,0.06),transparent_50%)]" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              {courses.length} courses across {categories.length - 1} categories
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Our courses
            </h1>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              From office basics to advanced programming — pick the skill
              that opens the door you want to walk through.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="mb-10 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active === cat
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                {cat}
                {cat !== "All" && (
                  <span className="ml-1.5 text-xs opacity-60">
                    ({courses.filter((c) => c.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <p className="py-20 text-center text-muted-foreground">
              No courses in this category.
            </p>
          )}
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="bg-muted/40 py-16 sm:py-20">
        <Container>
          <div className="text-center max-w-xl mx-auto">
            <h2 className="font-heading text-2xl font-bold sm:text-3xl">
              Not sure which course to pick?
            </h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Visit us or call &mdash; we will help you find the right
              course based on your goals and schedule.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg">
                  Talk to us
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`}>
                <Button size="lg" variant="outline">
                  Call {site.phone}
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
