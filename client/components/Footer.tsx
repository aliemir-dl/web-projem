import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">E+</span>
              </div>
              <span className="text-xl font-bold">Türkiye</span>
            </div>
            <p className="text-muted-foreground">
              Küresel fırsatlara açılan kapınız. Erasmus+ ve Avrupa programları
              ile uluslararası deneyim kazanın.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Hızlı Bağlantılar</h3>
            <nav className="space-y-3">
              {[
                { name: "Anasayfa", href: "/" },
                { name: "Biz Kimiz", href: "/biz-kimiz" },
                { name: "Projeler", href: "/projeler" },
                { name: "Etkinlikler", href: "/etkinlikler" },
                { name: "Blog", href: "/blog" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Hizmetlerimiz</h3>
            <nav className="space-y-3">
              {[
                { name: "Erasmus+ Projeleri", href: "/projeler" },
                { name: "Danışmanlık", href: "/danismanlıklar" },
                { name: "Yurt Dışı Fırsatları", href: "/firsatlar" },
                { name: "Eğitim Programları", href: "/etkinlikler" },
                { name: "Proje Yazımı", href: "/danismanlıklar" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                <div className="text-muted-foreground">
                  <p>Erasmus+ Türkiye Ulusal Ajansı</p>
                  <p>Bahçelievler, Ankara</p>
                  <p>Türkiye</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+90 312 XXX XX XX</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">
                  info@eplusturkiye.org
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-muted-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © 2024 E+ Türkiye. Tüm hakları saklıdır.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="/gizlilik"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Gizlilik Politikası
              </Link>
              <Link
                to="/kullanim"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Kullanım Şartları
              </Link>
              <Link
                to="/cerezler"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Çerez Politikası
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
