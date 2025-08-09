import ownerImage from "@assets/IMG_20250506_100848-removebg-preview_1754716476473.png";

const stats = [
  { number: "2,500+", label: "Happy Travelers" },
  { number: "50+", label: "Destinasi" },
  { number: "5+", label: "Tahun Pengalaman" },
  { number: "4.8/5", label: "Rating Pelanggan" }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-dark-forest mb-6">Tentang RR Travel</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              RR Travel didirikan dengan visi untuk memperkenalkan keindahan Indonesia kepada wisatawan domestik dan mancanegara. 
              Kami percaya bahwa setiap perjalanan adalah kesempatan untuk menciptakan kenangan yang tak terlupakan.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Dengan pengalaman lebih dari 5 tahun dalam industri pariwisata, kami telah melayani ribuan wisatawan dengan 
              kepuasan tinggi dan komitmen pada kualitas layanan terbaik.
            </p>

            {/* Owner Profile */}
            <div className="bg-gray-50 rounded-default p-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={ownerImage} 
                  alt="Reza Pahlawan - Founder RR Travel" 
                  className="w-20 h-20 rounded-full object-cover shadow-lg"
                />
                <div>
                  <h4 className="text-xl font-bold text-dark-forest">Reza Pahlawan</h4>
                  <p className="text-primary-green font-medium">Founder & CEO</p>
                  <p className="text-gray-600 text-sm mt-1">
                    "Passion saya adalah membantu orang mengeksplorasi keajaiban Indonesia dengan cara yang autentik dan berkesan"
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
              alt="Indonesian cultural landmarks" 
              className="rounded-default shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
              alt="Traditional Indonesian village" 
              className="rounded-default shadow-lg mt-6"
            />
            <img 
              src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
              alt="Indonesian traditional market" 
              className="rounded-default shadow-lg"
            />
            <img 
              src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300" 
              alt="Indonesian temple architecture" 
              className="rounded-default shadow-lg mt-6"
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-8 mt-16 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl font-bold text-primary-green mb-2">{stat.number}</div>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
