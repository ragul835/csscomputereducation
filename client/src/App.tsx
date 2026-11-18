import { Route, Switch } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Home } from "@/pages/Home";
import { Courses } from "@/pages/Courses";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { useScrollTop } from "@/hooks/useScrollTop";

function ScrollToTop() {
  useScrollTop();
  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/courses" component={Courses} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route>
            <div className="flex min-h-[60vh] items-center justify-center pt-20">
              <div className="text-center">
                <h1 className="font-heading text-4xl font-bold">404</h1>
                <p className="mt-2 text-muted-foreground">Page not found</p>
              </div>
            </div>
          </Route>
        </Switch>
      </main>
      <Footer />
    </>
  );
}
