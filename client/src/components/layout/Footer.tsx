import { Link } from "wouter";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageSquare,
  Shield,
  ArrowUpRight,
} from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Separator } from "@/components/ui/separator";
import { site } from "@/data/site";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About us" },
  { href: "/contact", label: "Contact" },
];

const popularCourses = [
  "MS Office",
  "Tally ERP 9",
  "Python",
  "Web Designing",
  "DCA",
  "Spoken English",
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm">
                CSS
              </div>
              <span className="font-heading text-base font-bold text-background">
                CSS Computer Education
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-4">{site.intro}</p>
            <div className="flex items-center gap-2 rounded-lg bg-background/10 px-3 py-2 text-xs font-medium">
              <Shield className="h-3.5 w-3.5 text-accent" />
              <span>ISO 9001:2015 Certified Institute</span>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-background mb-4">
              Quick links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm transition-colors hover:text-background"
                  >
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-background mb-4">
              Popular courses
            </h4>
            <ul className="space-y-2.5">
              {popularCourses.map((course) => (
                <li key={course}>
                  <Link
                    href="/courses"
                    className="group flex items-center gap-1.5 text-sm transition-colors hover:text-background"
                  >
                    <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-background mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <span>{site.address}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-background">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${site.email}`} className="hover:text-background">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span>{site.hours}</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <MessageSquare className="h-4 w-4 shrink-0 text-accent" />
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background"
                >
                  WhatsApp us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      <Separator className="bg-background/10" />

      <Container className="py-6">
        <div className="flex flex-col items-center gap-3 text-xs text-background/50">
          <p>
            Developed and maintained by{" "}
            <a
              href="https://weraisetech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background/70 underline underline-offset-2 transition-colors hover:text-background"
            >
              We Raise Tech
            </a>
          </p>
          <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
            <p>
              &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
            </p>
            <p>Proprietor: {site.proprietor}</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
