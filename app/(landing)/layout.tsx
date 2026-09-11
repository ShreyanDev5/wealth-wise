import Header from "@/components/landing/header";
import Footer from "@/components/landing/footer";
import ShowcaseFooter from "@/components/landing/showcase-footer";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen relative flex flex-col selection:bg-emerald-100 selection:text-emerald-950">
      <Header />

      <main className="relative z-10 px-4 sm:px-6 pt-20 sm:pt-24 pb-12 sm:pb-16 flex-grow">
        {children}
      </main>

      <ShowcaseFooter />
      <ScrollToTop />
      <Footer />
    </div>
  );
}
