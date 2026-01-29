import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { href: "/", label: "Anasayfa" },
    { href: "/biz-kimiz", label: "Biz Kimiz" },
    { href: "/projeler", label: "Projeler" },
    { href: "/etkinlikler", label: "Etkinlikler" },
    { href: "/danismanlıklar", label: "Danışmanlıklar" },
    { href: "/firsatlar", label: "Fırsatlar" },
    { href: "/blog", label: "Blog" },
    { href: "/iletisim", label: "İletişim" },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground font-bold text-xl px-3 py-1 rounded-lg transition-transform group-hover:scale-105">
            E+
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            Türkiye
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary ${
                location.pathname === link.href
                  ? "text-primary bg-primary/5"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Button className="ml-4" asChild>
             <Link to="/iletisim">Bize Ulaşın</Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`text-lg font-medium px-4 py-2 rounded-md transition-colors ${
                    location.pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button className="mt-4 w-full" asChild>
                <Link to="/iletisim">Bize Ulaşın</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
