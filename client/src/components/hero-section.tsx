import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{
          backgroundImage: `linear-gradient(rgba(12, 28, 16, 0.4), rgba(12, 28, 16, 0.4)), url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')`
        }}
      />
      
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Jelajahi Keindahan <br />
          <span className="text-light-green">Indonesia Bersama Kami</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200">
          Temukan pengalaman tak terlupakan di destinasi wisata terbaik Indonesia dengan paket tour terpercaya
        </p>
        
        {/* Search Widget */}
        <div className="bg-white rounded-default p-4 md:p-6 shadow-xl max-w-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            <div>
              <Label className="block text-gray-900 text-sm font-medium mb-2">Destinasi</Label>
              <Select>
                <SelectTrigger className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green text-gray-900 placeholder:text-gray-500">
                  <SelectValue placeholder="Pilih Destinasi" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bali">Bali</SelectItem>
                  <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                  <SelectItem value="lombok">Lombok</SelectItem>
                  <SelectItem value="raja-ampat">Raja Ampat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="block text-gray-900 text-sm font-medium mb-2">Tanggal</Label>
              <Input 
                type="date" 
                className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green text-gray-900"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <Label className="block text-gray-900 text-sm font-medium mb-2">Peserta</Label>
              <Select>
                <SelectTrigger className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green text-gray-900 placeholder:text-gray-500">
                  <SelectValue placeholder="Jumlah Peserta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-2">1-2 Orang</SelectItem>
                  <SelectItem value="3-5">3-5 Orang</SelectItem>
                  <SelectItem value="6+">6+ Orang</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="w-full bg-primary-green text-white py-2 md:py-3 rounded-default mt-3 md:mt-4 hover:bg-green-600 transition-colors font-semibold text-sm md:text-base">
            Cari Paket Wisata
          </Button>
        </div>
      </div>
    </section>
  );
}
