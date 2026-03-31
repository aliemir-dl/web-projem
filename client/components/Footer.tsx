import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-primary text-white font-bold text-xl px-3 py-1 rounded-lg">
                E+
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Türkiye
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Gençlerin ve yetişkinlerin uluslararası fırsatlara erişimini kolaylaştırıyor,
              Erasmus+ projeleri ile dünyaya açılmalarını sağlıyoruz.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="hover:text-primary transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-primary transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/biz-kimiz" className="hover:text-primary transition-colors">Biz Kimiz</Link></li>
              <li><Link to="/projeler" className="hover:text-primary transition-colors">Projeler</Link></li>
              <li><Link to="/etkinlikler" className="hover:text-primary transition-colors">Etkinlikler</Link></li>
              <li><Link to="/firsatlar" className="hover:text-primary transition-colors">Fırsatlar</Link></li>
              <li><Link to="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Legal/Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Destek</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
              <li><Link to="/danismanlıklar" className="hover:text-primary transition-colors">Danışmanlık Al</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Gizlilik Politikası</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Kullanım Şartları</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">İletişim</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Teknoloji Vadisi, İstanbul, Türkiye</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:+905551234567" className="hover:text-white">+90 (555) 123 45 67</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:info@example.com" className="hover:text-white">info@example.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} E+ Türkiye. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
