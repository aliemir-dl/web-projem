import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminPage from "./pages/Admin";

const queryClient = new QueryClient();

// Placeholder components for other routes
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen bg-background">
    <Header />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground">
          Bu sayfa yakında aktif olacak.
        </p>
      </div>
    </div>
  </div>
);

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <Header />
    {children}
    <Footer />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Index />
              </Layout>
            }
          />
          <Route
            path="/biz-kimiz"
            element={<PlaceholderPage title="Biz Kimiz" />}
          />
          <Route
            path="/projeler"
            element={<PlaceholderPage title="Projeler" />}
          />
          <Route
            path="/etkinlikler"
            element={<PlaceholderPage title="Etkinlikler" />}
          />
          <Route
            path="/danismanlıklar"
            element={<PlaceholderPage title="Danışmanlıklar" />}
          />
          <Route
            path="/firsatlar"
            element={<PlaceholderPage title="Fırsatlar" />}
          />
          <Route path="/blog" element={<PlaceholderPage title="Blog" />} />
          <Route
            path="/iletisim"
            element={<PlaceholderPage title="İletişim" />}
          />
          <Route
            path="/admin"
            element={<Layout><AdminPage /></Layout>}
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
