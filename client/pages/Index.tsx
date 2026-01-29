import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { BlogPost, Project } from "@shared/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Globe,
  Users,
  Award,
  BookOpen,
  Calendar,
  MessageSquare,
  Star,
  CheckCircle,
} from "lucide-react";

export default function Index() {
  const { data: recentPosts } = useQuery<BlogPost[]>({
    queryKey: ["public", "blog"],
    queryFn: async () => {
      const res = await fetch("/api/public/blog");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    }
  });

  const { data: featuredProjects } = useQuery<Project[]>({
    queryKey: ["public", "projects"],
    queryFn: async () => {
      const res = await fetch("/api/public/projects");
      if (!res.ok) throw new Error("Failed");
      return res.json();
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 lg:py-32 bg-slate-50 dark:bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none"></div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20">
                🚀 Yeni Fırsatlar Yayında
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Dünyayı Keşfet, <br />
                <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                   Geleceğini Şekillendir
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                E+ Türkiye ile Erasmus+ projelerine katılın, uluslararası deneyim kazanın ve kariyerinize küresel bir yön verin. Sınırları aşmaya hazır mısınız?
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95" asChild>
                  <Link to="/firsatlar">
                    Fırsatları Keşfet <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base border-slate-300 hover:bg-slate-100" asChild>
                  <Link to="/projeler">Projelerimizi İncele</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-8 text-sm font-medium text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Onaylı Projeler</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Ücretsiz Danışmanlık</span>
                </div>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700 delay-100 hidden lg:block">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-white">
                 <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1600"
                    alt="Students collaboration"
                    className="w-full h-auto object-cover opacity-95"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                      <div className="font-bold text-lg">Erasmus+ Gençlik Değişimi</div>
                      <div className="text-sm opacity-90">Berlin, Almanya - 2024</div>
                  </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y bg-white/50">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-100">
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary">€2.5M+</div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium uppercase tracking-wider">Hibe Desteği</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium uppercase tracking-wider">Tamamlanan Proje</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary">5000+</div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium uppercase tracking-wider">Mutlu Katılımcı</div>
                </div>
                <div className="text-center p-4">
                    <div className="text-3xl font-bold text-primary">25</div>
                    <div className="text-sm text-muted-foreground mt-1 font-medium uppercase tracking-wider">Partner Ülke</div>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Programs Grid */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
              Size Uygun Programı Seçin
            </h2>
            <p className="text-lg text-muted-foreground">
              İlgi alanlarınıza ve hedeflerinize en uygun programı keşfedin. Avrupa fırsatları bir tık uzağınızda.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dynamic Card: Recent Blog */}
            {recentPosts?.slice(0, 1).map(post => (
              <Card key={post.id} className="flex flex-col h-full border-t-4 border-t-blue-500 hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                    <BookOpen size={24} />
                  </div>
                  <CardTitle className="line-clamp-1">{post.title}</CardTitle>
                  <CardDescription>Son Blog Yazısı</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3 mb-4">{post.content}</p>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="px-0 font-semibold text-blue-600" asChild>
                        <Link to={`/blog/${post.id}`}>Okumaya Devam Et &rarr;</Link>
                    </Button>
                </div>
              </Card>
            ))}

            {/* Dynamic Card: Featured Project */}
             {featuredProjects?.slice(0, 1).map(project => (
              <Card key={project.id} className="flex flex-col h-full border-t-4 border-t-green-500 hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-4">
                    <Award size={24} />
                  </div>
                  <CardTitle className="line-clamp-1">{project.title}</CardTitle>
                  <CardDescription>Öne Çıkan Proje</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3 mb-4">{project.description}</p>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="px-0 font-semibold text-green-600" asChild>
                        <Link to="/projeler">Detayları Gör &rarr;</Link>
                    </Button>
                </div>
              </Card>
            ))}

            {/* Static Card: Events */}
            <Card className="flex flex-col h-full border-t-4 border-t-purple-500 hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                    <Calendar size={24} />
                  </div>
                  <CardTitle>Etkinlik Takvimi</CardTitle>
                  <CardDescription>Yaklaşan Organizasyonlar</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">
                     Webinarlar, bilgilendirme toplantıları ve proje yaygınlaştırma etkinliklerimize katılın.
                  </p>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="px-0 font-semibold text-purple-600" asChild>
                        <Link to="/etkinlikler">Takvimi İncele &rarr;</Link>
                    </Button>
                </div>
              </Card>

            {/* Static Card: Consultancy */}
             <Card className="flex flex-col h-full border-t-4 border-t-orange-500 hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-4">
                    <MessageSquare size={24} />
                  </div>
                  <CardTitle>Danışmanlık</CardTitle>
                  <CardDescription>Profesyonel Destek</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">
                     Proje yazımı, yönetimi ve raporlama süreçlerinde uzman ekibimizden destek alın.
                  </p>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="px-0 font-semibold text-orange-600" asChild>
                        <Link to="/danismanlıklar">Bize Danışın &rarr;</Link>
                    </Button>
                </div>
              </Card>

              {/* Static Card: Global */}
              <Card className="flex flex-col h-full border-t-4 border-t-cyan-500 hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-cyan-100 text-cyan-600 flex items-center justify-center mb-4">
                    <Globe size={24} />
                  </div>
                  <CardTitle>Yurt Dışı Fırsatları</CardTitle>
                  <CardDescription>ESC & Değişimler</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">
                     Avrupa Gönüllü Hizmeti ve gençlik değişimleri ile dünyayı gezerken kendinizi keşfedin.
                  </p>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="px-0 font-semibold text-cyan-600" asChild>
                        <Link to="/firsatlar">Fırsatları Gör &rarr;</Link>
                    </Button>
                </div>
              </Card>

              {/* Static Card: Community */}
               <Card className="flex flex-col h-full border-t-4 border-t-pink-500 hover:-translate-y-1 transition-transform">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <CardTitle>Topluluğumuza Katılın</CardTitle>
                  <CardDescription>Gönüllü Olun</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4">
                     Yerel faaliyetlerimizde gönüllü olarak yer alın, ekibimizin bir parçası olun.
                  </p>
                </CardContent>
                 <div className="p-6 pt-0 mt-auto">
                    <Button variant="link" className="px-0 font-semibold text-pink-600" asChild>
                        <Link to="/iletisim">Başvuru Yap &rarr;</Link>
                    </Button>
                </div>
              </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
        </div>

        <div className="relative container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Hayallerinizi Ertelemeyin
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Hemen şimdi ilk adımı atın ve binlerce gencin hayatını değiştiren bu yolculuğa siz de katılın.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white border-0 h-14 px-8 text-lg" asChild>
              <Link to="/iletisim">Hemen Başvur</Link>
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10 h-14 px-8 text-lg" asChild>
              <Link to="/biz-kimiz">Daha Fazla Bilgi</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
