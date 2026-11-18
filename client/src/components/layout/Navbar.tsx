import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/shared/Container";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/courses", label: "Courses" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-lg shadow-sm border-b border-border/50"
          : "bg-white/10 backdrop-blur-md",
      )}
    >
      <Container>
        <nav className="flex h-16 items-center justify-between sm:h-18">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-heading font-bold text-sm transition-transform group-hover:scale-105">
              CSS
            </div>
            <div className="hidden sm:block">
              <span
                className={cn(
                  "font-heading text-base font-bold leading-tight block transition-colors",
                  scrolled ? "text-foreground" : "text-white",
                )}
              >
                {site.shortName} Computer Education
              </span>
              <span
                className={cn(
                  "flex items-center gap-1 text-[10px] font-medium transition-colors",
                  scrolled ? "text-muted-foreground" : "text-white/70",
                )}
              >
                <Shield className="h-2.5 w-2.5" />
                ISO 9001:2015 Certified
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer",
                    scrolled
                      ? location === link.href
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      : location === link.href
                        ? "text-white"
                        : "text-white/75 hover:text-white hover:bg-white/10",
                  )}
                >
                  {link.label}
                  {location === link.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className={cn(
                        "absolute bottom-0 left-2 right-2 h-0.5 rounded-full",
                        scrolled ? "bg-primary" : "bg-white",
                      )}
                    />
                  )}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className={cn(
                "hidden items-center gap-2 text-sm font-medium transition-colors sm:flex",
                scrolled
                  ? "text-muted-foreground hover:text-primary"
                  : "text-white/75 hover:text-white",
              )}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden lg:inline">{site.phone}</span>
            </a>
            <Link href="/contact">
              <Button
                size="sm"
                className={cn(
                  "hidden sm:inline-flex",
                  !scrolled && "bg-white text-primary hover:bg-white/90",
                )}
              >
                Enquire now
              </Button>
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors md:hidden",
                scrolled
                  ? "text-foreground hover:bg-muted"
                  : "text-white hover:bg-white/10",
              )}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </Container>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-background/95 backdrop-blur-lg md:hidden"
          >
            <Container className="py-4">
              <div className="flex flex-col gap-1">
                {links.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <span
                      className={cn(
                        "block rounded-lg px-4 py-3 text-sm font-medium transition-colors cursor-pointer",
                        location === link.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                      )}
                    >
                      {link.label}
                    </span>
                  </Link>
                ))}
                <div className="mt-3 border-t border-border pt-3">
                  <Link href="/contact">
                    <Button className="w-full">Enquire now</Button>
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
