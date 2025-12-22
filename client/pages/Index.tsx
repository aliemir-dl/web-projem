import { Button } from "@/components/ui/button";
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
} from "lucide-react";

export default function Index() {
  return (
    <div className="bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Küresel Fırsatlara Açılan{" "}
                  <span className="text-primary">Kapınız</span>
                </h1>
                <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl">
                  Küresel bir perspektif kazanmak ve kişisel gelişiminize
                  katkıda bulunmak i��in E+ Türkiye'nin yaygınlaştırdığı
                  programları inceleyin. Dünyayı keşfedin ve kendinizi
                  geliştirin.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Fırsatları Keşfet
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg">
                  Projelerimizi İncele
                </Button>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">150+</div>
                  <div className="text-sm text-muted-foreground">
                    Aktif Proje
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Katılımcı</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">25</div>
                  <div className="text-sm text-muted-foreground">Ülke</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-8">
                <div className="w-full h-full rounded-xl bg-white shadow-2xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <Globe className="w-24 h-24 text-primary mx-auto" />
                    <h3 className="text-xl font-semibold">
                      Dünya Çapında Fırsatlar
                    </h3>
                    <p className="text-muted-foreground">
                      Erasmus+ ile sınırları aşın
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Sections */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Öne Çıkan Programlarımız
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Erasmus+ ve diğer Avrupa programları ile uluslararası deneyim
              kazanın
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Erasmus+ Projects */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Erasmus+ Projeleri
                </CardTitle>
                <CardDescription>
                  Avrupa'nın en büyük eğitim ve gençlik programına katılın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  KA1, KA2 ve KA3 projeleri ile eğitim, gençlik ve spor
                  alanlarında uluslararası deneyim kazanma fırsatı.
                </p>
                <Button
                  variant="ghost"
                  className="group p-0 hover:bg-transparent"
                >
                  Detayları İncele
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* International Opportunities */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="group-hover:text-accent transition-colors">
                  Yurt Dışı Fırsatları
                </CardTitle>
                <CardDescription>
                  Küresel ağınızı genişletin ve yeni kültürler keşfedin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Değişim programları, stajlar ve gönüllü faaliyetler ile
                  kişisel ve profesyonel gelişiminizi destekleyin.
                </p>
                <Button
                  variant="ghost"
                  className="group p-0 hover:bg-transparent"
                >
                  Fırsatları Gör
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* E+ Adventures */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  E+ Serüvenlerine Tanık Olun
                </CardTitle>
                <CardDescription>
                  Katılımcıların gerçek hikayelerini keşfedin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Erasmus+ deneyimi yaşamış gençlerin ilham verici hikayeleri ve
                  başarı öyküleri.
                </p>
                <Button
                  variant="ghost"
                  className="group p-0 hover:bg-transparent"
                >
                  Hikayeleri Oku
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Project Experiences */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="group-hover:text-accent transition-colors">
                  Proje Deneyimleri
                </CardTitle>
                <CardDescription>
                  Başarılı proje örnekleri ve uygulama rehberleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Tamamlanmış projelerden örnekler ve gelecek projeler için
                  pratik ipuçları.
                </p>
                <Button
                  variant="ghost"
                  className="group p-0 hover:bg-transparent"
                >
                  Örnekleri İncele
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Events */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors">
                  Etkinlikler
                </CardTitle>
                <CardDescription>
                  Yaklaşan etkinlik ve eğitimlere katılın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Bilgilendirme toplantıları, webinarlar ve networking
                  etkinliklerimize davetlisiniz.
                </p>
                <Button
                  variant="ghost"
                  className="group p-0 hover:bg-transparent"
                >
                  Etkinlik Takvimi
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* Consultancy */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-accent">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="group-hover:text-accent transition-colors">
                  Danışmanlık
                </CardTitle>
                <CardDescription>
                  Uzman ekibimizden profesyonel destek alın
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Proje yazımından uygulama sürecine kadar her aşamada size
                  rehberlik ediyoruz.
                </p>
                <Button
                  variant="ghost"
                  className="group p-0 hover:bg-transparent"
                >
                  Danışmanlık Al
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Başarılarımız Rakamlarla
            </h2>
            <p className="text-lg text-muted-foreground">
              Yıllar içinde elde ettiğimiz başarıların kısa özeti
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">€2.5M+</div>
              <div className="text-muted-foreground">Toplam Bütçe</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-accent mb-2">150+</div>
              <div className="text-muted-foreground">Aktif Proje</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">25</div>
              <div className="text-muted-foreground">Partner Ülke</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-accent mb-2">95%</div>
              <div className="text-muted-foreground">Başarı Oranı</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Erasmus+ Yolculuğunuza Bugün Başlayın
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kişisel ve profesyonel gelişiminiz için hayal ettiğiniz fırsatlar
            sizi bekliyor. Uzman ekibimizle iletişime geçin ve size en uygun
            programı bulun.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Hemen Başvur
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Ücretsiz Danışmanlık
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
