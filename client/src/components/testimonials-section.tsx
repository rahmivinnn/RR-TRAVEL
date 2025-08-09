import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Andi Setiawan",
    location: "Jakarta",
    rating: 5,
    text: "Perjalanan ke Bali bersama RR Travel sangat memuaskan! Guide-nya ramah dan berpengetahuan luas. Semua destinasi sesuai dengan yang dijanjikan, bahkan melebihi ekspektasi kami.",
    initials: "AS"
  },
  {
    id: 2,
    name: "Maya Pertiwi",
    location: "Surabaya",
    rating: 5,
    text: "Diving di Raja Ampat adalah pengalaman yang luar biasa! Tim RR Travel sangat profesional dalam mengatur semuanya. Safety equipment lengkap dan guide diving sangat berpengalaman.",
    initials: "MP"
  },
  {
    id: 3,
    name: "Rizki Hermawan",
    location: "Bandung",
    rating: 4,
    text: "Tour Yogyakarta sangat edukatif! Kami belajar banyak tentang sejarah dan budaya Jawa. Harga paket juga sangat terjangkau untuk kualitas layanan yang diberikan.",
    initials: "RH"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-forest mb-4">Testimoni Pelanggan</h2>
          <p className="text-xl text-gray-600">Dengarkan cerita pengalaman wisata terbaik dari para pelanggan kami</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white rounded-default shadow-lg">
              <CardContent className="p-6">
                <div className="flex text-yellow-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-current' : 'stroke-current'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h5 className="font-bold text-dark-forest">{testimonial.name}</h5>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
