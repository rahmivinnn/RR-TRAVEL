import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  destination: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    phone: "",
    destination: "",
    message: ""
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: ContactForm) => {
      return await apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Pesan Terkirim!",
        description: "Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.",
      });
      setFormData({ name: "", email: "", phone: "", destination: "", message: "" });
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Gagal mengirim pesan. Silakan coba lagi.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi.",
        variant: "destructive",
      });
      return;
    }
    submitInquiry.mutate(formData);
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat Kantor",
      content: "Jl. Sudirman No. 123, Jakarta Pusat\nIndonesia 10270"
    },
    {
      icon: Phone,
      title: "Telepon",
      content: "+62 21 1234 5678\n+62 812 3456 7890"
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@rrtravel.com\nreservation@rrtravel.com"
    },
    {
      icon: Clock,
      title: "Jam Operasional",
      content: "Senin - Jumat: 09.00 - 18.00\nSabtu: 09.00 - 15.00"
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Youtube, href: "#" }
  ];

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark-forest mb-4">Hubungi Kami</h2>
          <p className="text-xl text-gray-600">Siap merencanakan liburan impian Anda? Mari diskusikan kebutuhan wisata Anda</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <div className="space-y-8">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary-green text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-dark-forest mb-2">{info.title}</h4>
                      <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Media */}
            <div className="mt-8">
              <h4 className="text-xl font-bold text-dark-forest mb-4">Ikuti Kami</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a 
                      key={index}
                      href={social.href} 
                      className="bg-primary-green text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-default p-8">
            <h3 className="text-2xl font-bold text-dark-forest mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="block text-gray-700 text-sm font-medium mb-2">Nama Lengkap *</Label>
                  <Input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div>
                  <Label className="block text-gray-700 text-sm font-medium mb-2">Email *</Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    placeholder="Masukkan email"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label className="block text-gray-700 text-sm font-medium mb-2">No. Telepon *</Label>
                  <Input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    placeholder="Masukkan no. telepon"
                  />
                </div>
                <div>
                  <Label className="block text-gray-700 text-sm font-medium mb-2">Destinasi Minat</Label>
                  <Select value={formData.destination} onValueChange={(value) => handleInputChange('destination', value)}>
                    <SelectTrigger className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent">
                      <SelectValue placeholder="Pilih Destinasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bali">Bali</SelectItem>
                      <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="lombok">Lombok</SelectItem>
                      <SelectItem value="raja-ampat">Raja Ampat</SelectItem>
                      <SelectItem value="lainnya">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="block text-gray-700 text-sm font-medium mb-2">Pesan</Label>
                <Textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className="w-full border-gray-300 rounded-default focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Ceritakan rencana liburan Anda..."
                />
              </div>

              <Button
                type="submit"
                disabled={submitInquiry.isPending}
                className="w-full bg-primary-green text-white py-3 rounded-default hover:bg-green-600 transition-colors font-semibold"
              >
                {submitInquiry.isPending ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
