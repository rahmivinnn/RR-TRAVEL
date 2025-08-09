import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Calendar, MapPin, Users, Clock, CreditCard, Star } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { TravelPackage, PaymentMethod } from "@shared/schema";

const bookingSchema = z.object({
  packageId: z.string().min(1, "Package ID is required"),
  customerName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  customerEmail: z.string().email("Email tidak valid"),
  customerPhone: z.string().min(10, "Nomor telepon minimal 10 digit"),
  participants: z.number().min(1, "Minimal 1 peserta").max(20, "Maksimal 20 peserta"),
  startDate: z.string().min(1, "Tanggal keberangkatan harus dipilih"),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const paymentMethods: { value: PaymentMethod; label: string; description: string }[] = [
  { value: "qris", label: "QRIS", description: "Scan QR code untuk pembayaran instant" },
  { value: "gopay", label: "GoPay", description: "Bayar dengan GoPay" },
  { value: "ovo", label: "OVO", description: "Bayar dengan OVO" },
  { value: "shopeepay", label: "ShopeePay", description: "Bayar dengan ShopeePay" },
  { value: "dana", label: "DANA", description: "Bayar dengan DANA" },
  { value: "bank_transfer", label: "Bank Transfer", description: "Transfer bank virtual account" },
  { value: "credit_card", label: "Kartu Kredit", description: "Bayar dengan kartu kredit/debit" },
];

export default function BookingPage() {
  const [match, params] = useRoute("/booking/:packageId");
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("qris");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const packageId = params?.packageId;

  // Fetch travel package details
  const { data: travelPackage, isLoading: isLoadingPackage } = useQuery<TravelPackage>({
    queryKey: ["/api/packages", packageId],
    enabled: !!packageId
  });

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      packageId: packageId || "",
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      participants: 1,
      startDate: "",
      specialRequests: "",
    }
  });

  // Update package ID when it changes
  useEffect(() => {
    if (packageId) {
      form.setValue("packageId", packageId);
    }
  }, [packageId, form]);

  // Calculate total amount
  const participants = form.watch("participants");
  const totalAmount = travelPackage ? travelPackage.price * participants : 0;

  // Create booking mutation
  const createBookingMutation = useMutation({
    mutationFn: async (data: BookingFormData & { totalAmount: number }) => {
      return await apiRequest("/api/bookings", "POST", data);
    },
    onSuccess: (booking) => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      // Proceed to payment
      handlePayment(booking);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Gagal membuat booking",
        variant: "destructive",
      });
    },
  });

  // Create payment mutation
  const createPaymentMutation = useMutation({
    mutationFn: async (paymentData: { bookingId: string; paymentMethod: PaymentMethod; customerDetails: any }) => {
      return await apiRequest("/api/payments/create", "POST", paymentData);
    },
    onSuccess: (response: any) => {
      // Redirect to Midtrans payment page
      if (response?.transaction?.redirect_url) {
        window.location.href = response.transaction.redirect_url;
      } else {
        toast({
          title: "Error",
          description: "URL pembayaran tidak tersedia",
          variant: "destructive",
        });
      }
      setIsProcessingPayment(false);
    },
    onError: (error: any) => {
      console.error("Payment creation error:", error);
      toast({
        title: "Error Pembayaran",
        description: error.message || "Gagal memproses pembayaran",
        variant: "destructive",
      });
      setIsProcessingPayment(false);
    },
  });

  const handlePayment = async (booking: any) => {
    setIsProcessingPayment(true);
    
    const formData = form.getValues();
    const customerDetails = {
      firstName: formData.customerName.split(' ')[0],
      lastName: formData.customerName.split(' ').slice(1).join(' '),
      email: formData.customerEmail,
      phone: formData.customerPhone
    };

    createPaymentMutation.mutate({
      bookingId: booking.id,
      paymentMethod: selectedPaymentMethod,
      customerDetails
    });
  };

  const onSubmit = (data: BookingFormData) => {
    if (!travelPackage) {
      toast({
        title: "Error",
        description: "Data paket tidak ditemukan",
        variant: "destructive",
      });
      return;
    }

    createBookingMutation.mutate({
      ...data,
      totalAmount
    });
  };

  if (!match) {
    return null;
  }

  if (isLoadingPackage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Memuat data paket...</p>
        </div>
      </div>
    );
  }

  if (!travelPackage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Paket Tidak Ditemukan</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Paket wisata yang Anda cari tidak tersedia.</p>
          <Button onClick={() => setLocation("/")}>Kembali ke Beranda</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => setLocation("/")}
              className="text-green-600 hover:text-green-700"
            >
              ← Kembali
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Booking Paket Wisata</h1>
              <p className="text-gray-600 dark:text-gray-400">Lengkapi formulir untuk melanjutkan pembayaran</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Package Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Detail Paket
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video relative rounded-lg overflow-hidden">
                  <img 
                    src={travelPackage.imageUrl} 
                    alt={travelPackage.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {travelPackage.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                    {travelPackage.description}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{travelPackage.rating}/5</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>{travelPackage.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{travelPackage.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{participants} peserta</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Harga per orang:
                    </span>
                    <span className="font-medium">
                      Rp {travelPackage.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold mt-2">
                    <span>Total:</span>
                    <span className="text-green-600">
                      Rp {totalAmount.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Customer Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pemesan</CardTitle>
                    <CardDescription>
                      Masukkan data pribadi yang valid untuk booking
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nama Lengkap *</FormLabel>
                          <FormControl>
                            <Input placeholder="Masukkan nama lengkap" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="customerEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input 
                                type="email" 
                                placeholder="contoh@email.com" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="customerPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nomor Telepon *</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="08xxxxxxxxxx" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Trip Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detail Perjalanan</CardTitle>
                    <CardDescription>
                      Tentukan jumlah peserta dan tanggal keberangkatan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="participants"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jumlah Peserta *</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                max="20"
                                placeholder="1"
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                              />
                            </FormControl>
                            <FormDescription>
                              Maksimal 20 peserta per booking
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tanggal Keberangkatan *</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                min={new Date().toISOString().split('T')[0]}
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Pilih tanggal minimal H+3 dari sekarang
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Permintaan Khusus (Opsional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Contoh: alergi makanan, kebutuhan aksesibilitas, dll."
                              rows={3}
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Tuliskan permintaan khusus untuk perjalanan Anda
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Metode Pembayaran
                    </CardTitle>
                    <CardDescription>
                      Pilih metode pembayaran yang diinginkan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {paymentMethods.map((method) => (
                        <div 
                          key={method.value}
                          className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-green-500 ${
                            selectedPaymentMethod === method.value 
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                          onClick={() => setSelectedPaymentMethod(method.value)}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              selectedPaymentMethod === method.value 
                                ? 'border-green-500 bg-green-500' 
                                : 'border-gray-300'
                            }`}>
                              {selectedPaymentMethod === method.value && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                              )}
                            </div>
                            <span className="font-medium text-sm">{method.label}</span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {method.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8"
                    disabled={createBookingMutation.isPending || isProcessingPayment}
                  >
                    {createBookingMutation.isPending ? (
                      "Membuat Booking..."
                    ) : isProcessingPayment ? (
                      "Memproses Pembayaran..."
                    ) : (
                      `Bayar Sekarang - Rp ${totalAmount.toLocaleString('id-ID')}`
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}