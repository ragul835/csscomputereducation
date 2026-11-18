import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  CheckCircle,
  Send,
  User,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Container } from "@/components/shared/Container";
import {
  AnimateOnScroll,
  AnimatedItem,
} from "@/components/shared/AnimateOnScroll";
import { site } from "@/data/site";
import { courses } from "@/data/courses";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  course: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

const contactInfo = [
  {
    icon: MapPin,
    label: "Address",
    value: site.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(site.mapQuery)}`,
  },
  {
    icon: Phone,
    label: "Office",
    value: site.office,
    href: `tel:${site.office}`,
  },
  {
    icon: Phone,
    label: "Mobile",
    value: `${site.phone} / ${site.cell}`,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Clock,
    label: "Hours",
    value: site.hours,
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "Chat with us",
    href: `https://wa.me/${site.whatsapp}`,
    external: true,
  },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}) as Record<string, string>);
        throw new Error(json.error || "Server error");
      }
      setSubmitted(true);
    } catch (err) {
      setServerError(
        (err as Error).message ||
          "Something went wrong. Please try again or call us directly.",
      );
    }
  }

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--hero-gradient-start)] via-[var(--hero-gradient-mid)] to-[var(--hero-gradient-end)] pt-28 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(255,255,255,0.06),transparent_50%)]" />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm">
              <Phone className="h-4 w-4" />
              We are here to help
            </span>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Contact us
            </h1>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              Visit us, call us, or send an enquiry &mdash; we will help you
              pick the right course.
            </p>
          </div>
        </Container>
      </section>

      {/* ── Main content ── */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-5">
            {/* Info column */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <User className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-heading font-bold">{site.proprietor}</p>
                    <p className="text-sm text-muted-foreground">Proprietor</p>
                  </div>
                </div>
              </div>

              <AnimateOnScroll className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4 transition-all duration-200 hover:shadow-sm">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-sm font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <AnimatedItem key={item.label}>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={item.external ? "noopener noreferrer" : undefined}
                          className="block"
                        >
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </AnimatedItem>
                  );
                })}
              </AnimateOnScroll>

              <div className="mt-6 overflow-hidden rounded-xl border border-border/50">
                <iframe
                  title="CSS Computer Education map"
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="h-48 w-full"
                />
              </div>
            </div>

            {/* Form column */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-border/50 bg-card p-6 sm:p-8 shadow-sm">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 text-accent">
                        <CheckCircle className="h-7 w-7" />
                      </div>
                      <h3 className="font-heading text-xl font-bold">
                        Thank you!
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        Your enquiry has been received. We will reach out to
                        you shortly.
                      </p>
                      <Button
                        variant="outline"
                        className="mt-6"
                        onClick={() => setSubmitted(false)}
                      >
                        Send another enquiry
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div className="mb-6">
                        <h3 className="font-heading text-xl font-bold">
                          Request a call back
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          Fill in your details and we will get back to you
                          within 24 hours.
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-5"
                      >
                        <div>
                          <Label htmlFor="name">Full name *</Label>
                          <Input
                            id="name"
                            placeholder="Your name"
                            className="mt-1.5"
                            {...register("name")}
                          />
                          {errors.name && (
                            <p className="mt-1 text-xs text-destructive">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone">Phone number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="10-digit mobile number"
                            className="mt-1.5"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="mt-1 text-xs text-destructive">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="course">Interested course</Label>
                          <select
                            id="course"
                            className="mt-1.5 flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            {...register("course")}
                          >
                            <option value="">Select a course</option>
                            {courses.map((c) => (
                              <option key={c.id} value={c.title}>
                                {c.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <Label htmlFor="message">Message</Label>
                          <Textarea
                            id="message"
                            placeholder="Anything you would like to know?"
                            className="mt-1.5"
                            rows={3}
                            {...register("message")}
                          />
                        </div>

                        {serverError && (
                          <p className="text-sm text-destructive">
                            {serverError}
                          </p>
                        )}

                        <Button
                          type="submit"
                          size="lg"
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending…"
                          ) : (
                            <>
                              Send enquiry
                              <Send className="h-4 w-4" />
                            </>
                          )}
                        </Button>

                        <p className="text-center text-xs text-muted-foreground">
                          Your enquiry is saved securely and we will respond
                          within 24 hours.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Shield className="h-3.5 w-3.5" />
                <span>ISO 9001:2015 Certified Institute</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
