// Travel packages data
const packages = [
    {
        id: 1,
        name: "Bali Budaya & Alam",
        description: "Jelajahi keindahan sawah terasering Jatiluwih, Pura Tanah Lot, dan budaya Bali yang autentik",
        duration: "3D2N",
        price: 2850000,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Bali",
        color: "bg-primary-green",
        longDescription: "Rasakan pengalaman tak terlupakan di Pulau Dewata dengan paket wisata yang menggabungkan keindahan alam dan kekayaan budaya Bali. Kunjungi sawah terasering Jatiluwih yang menakjubkan, saksi Pura Tanah Lot saat matahari terbenam, dan nikmati pertunjukan tari tradisional di Ubud.",
        highlights: ["Sawah Terasering Jatiluwih", "Pura Tanah Lot", "Ubud Monkey Forest", "Pasar Seni Sukawati", "Pertunjukan Tari Kecak"],
        includes: ["Hotel bintang 4", "Transportasi AC", "Makan 6x", "Guide profesional", "Tiket masuk wisata"],
        maxCapacity: 20,
        gallery: [
            "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400",
            "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=400",
            "https://images.unsplash.com/photo-1555400113-f9031b67b441?w=400"
        ]
    },
    {
        id: 2,
        name: "Yogya Heritage Tour",
        description: "Eksplorasi Candi Borobudur, Prambanan, Keraton Yogya, dan kuliner legendaris Gudeg",
        duration: "4D3N",
        price: 1950000,
        rating: 4.9,
        imageUrl: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Yogyakarta",
        color: "bg-warm-brown",
        longDescription: "Nikmati perjalanan sejarah dan budaya di kota istimewa Yogyakarta. Jelajahi kemegahan Candi Borobudur dan Prambanan, rasakan kehidupan kerajaan di Kraton Sultan, dan manjakan lidah dengan kuliner khas seperti Gudeg Yu Djum yang legendaris.",
        highlights: ["Candi Borobudur Sunrise", "Candi Prambanan", "Keraton Yogyakarta", "Jalan Malioboro", "Taman Sari", "Kuliner Gudeg"],
        includes: ["Hotel heritage", "Transportasi pribadi", "Makan 9x", "Guide sejarah", "Tiket candi", "Workshop batik"],
        maxCapacity: 15,
        gallery: [
            "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"
        ]
    },
    {
        id: 3,
        name: "Lombok Paradise",
        description: "Nikmati keindahan Pantai Senggigi, Gili Trawangan, dan pendakian Gunung Rinjani",
        duration: "5D4N",
        price: 3450000,
        rating: 4.6,
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Lombok",
        color: "bg-blue-500",
        longDescription: "Temukan surga tersembunyi di Lombok dengan kombinasi sempurna antara petualangan dan relaksasi. Jelajahi pantai-pantai eksotis, nikmati snorkeling di Gili Trawangan, dan tantang diri dengan pendakian Gunung Rinjani yang menakjubkan.",
        highlights: ["Pantai Senggigi", "Gili Trawangan", "Trekking Rinjani", "Air Terjun Sekumpul", "Desa Sade", "Pantai Kuta Lombok"],
        includes: ["Resort tepi pantai", "Speedboat Gili", "Peralatan snorkeling", "Guide trekking", "Makan 12x", "Perlengkapan camping"],
        maxCapacity: 12,
        gallery: [
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
            "https://images.unsplash.com/photo-1566142475016-16e88ac35de7?w=400"
        ]
    },
    {
        id: 4,
        name: "Raja Ampat Diving",
        description: "Eksplorasi surga bawah laut terbaik dunia dengan keanekaragaman hayati luar biasa",
        duration: "6D5N",
        price: 8750000,
        rating: 5.0,
        imageUrl: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Raja Ampat",
        color: "bg-teal-500",
        longDescription: "Rasakan pengalaman diving terbaik di dunia di Raja Ampat, Papua Barat. Dengan 75% spesies ikan dunia dan terumbu karang yang masih pristine, Raja Ampat adalah surga bagi para pecinta bawah laut dan underwater photography.",
        highlights: ["Diving Pianemo", "Cape Kri", "Arborek Village", "Piaynemo Mushroom Rock", "Underwater Photography", "Manta Ray Cleaning Station"],
        includes: ["Liveaboard premium", "Full diving equipment", "Certified divemaster", "Underwater camera", "Full board meals", "Airport transfer Sorong"],
        maxCapacity: 8,
        gallery: [
            "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
            "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=400"
        ]
    },
    {
        id: 5,
        name: "Java Cultural Journey",
        description: "Perjalanan budaya lengkap Jakarta-Bandung-Yogya-Solo dengan pengalaman autentik",
        duration: "7D6N",
        price: 4250000,
        rating: 4.7,
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "Java",
        color: "bg-purple-500",
        longDescription: "Jelajahi kekayaan budaya Pulau Jawa dari Jakarta hingga Solo. Rasakan perkembangan sejarah Indonesia melalui museum, istana kerajaan, kampung batik, dan kuliner tradisional yang otentik di setiap kota.",
        highlights: ["Monas Jakarta", "Factory Outlet Bandung", "Candi Borobudur", "Keraton Solo", "Museum Batik", "Kuliner Street Food"],
        includes: ["Hotel bintang 4", "Kereta eksekutif", "Bus pariwisata", "Guide lokal", "Makan 18x", "Workshop batik"],
        maxCapacity: 25,
        gallery: [
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
            "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400"
        ]
    },
    {
        id: 6,
        name: "Adventure Trekking",
        description: "Petualangan mendaki Gunung Bromo, air terjun Tumpak Sewu, dan kawah Ijen yang memukau",
        duration: "4D3N",
        price: 2150000,
        rating: 4.8,
        imageUrl: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        location: "East Java",
        color: "bg-orange-500",
        longDescription: "Tantang adrenalin dengan petualangan trekking di Jawa Timur. Saksikan sunrise dari puncak Bromo, jelajahi keindahan air terjun Tumpak Sewu, dan nikmati blue fire phenomenon di kawah Ijen yang spektakuler.",
        highlights: ["Sunrise Mount Bromo", "Tumpak Sewu Waterfall", "Ijen Blue Fire", "Whispering Sand", "Cemoro Lawang", "Traditional Village"],
        includes: ["Mountain lodge", "Jeep 4WD", "Trekking equipment", "Professional guide", "Makan 9x", "Gas mask Ijen"],
        maxCapacity: 16,
        gallery: [
            "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400",
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400",
            "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400"
        ]
    }
];

// Global variables
let map;
let qrScanner;
let currentPackage = null;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupNavigation();
    renderPackages();
    initializeMap();
    setupModals();
    setupContactForm();
    setupScrollEffects();
}

// Navigation setup
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    hamburger?.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Render packages
function renderPackages() {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid) return;
    
    packagesGrid.innerHTML = packages.map(pkg => createPackageCard(pkg)).join('');
}

// Create package card HTML
function createPackageCard(pkg) {
    const colorMap = {
        'bg-primary-green': '#5da96a',
        'bg-warm-brown': '#8b4513',
        'bg-blue-500': '#3b82f6',
        'bg-teal-500': '#14b8a6',
        'bg-purple-500': '#8b5cf6',
        'bg-orange-500': '#f97316'
    };
    
    const backgroundColor = colorMap[pkg.color] || '#5da96a';
    
    return `
        <div class="package-card" onclick="openPackageModal(${pkg.id})">
            <div class="package-image">
                <img src="${pkg.imageUrl}" alt="${pkg.name}" loading="lazy">
                <div class="package-badge" style="background-color: ${backgroundColor}">
                    ${pkg.duration}
                </div>
                <div class="package-rating">
                    ${renderStars(pkg.rating)}
                    <span>${pkg.rating}</span>
                </div>
            </div>
            <div class="package-content">
                <div class="package-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${pkg.location}</span>
                </div>
                <h3 class="package-title">${pkg.name}</h3>
                <p class="package-description">${pkg.description}</p>
                <div class="package-footer">
                    <div class="package-price">
                        Rp ${formatPrice(pkg.price)}
                        <span class="package-price-unit">/orang</span>
                    </div>
                    <button class="package-btn" onclick="event.stopPropagation(); openPackageModal(${pkg.id})">
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Render stars for rating
function renderStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        const starClass = i <= rating ? 'star' : 'star empty';
        stars += `<i class="fas fa-star ${starClass}"></i>`;
    }
    return `<div class="stars">${stars}</div>`;
}

// Format price to Indonesian format
function formatPrice(price) {
    return new Intl.NumberFormat('id-ID').format(price);
}

// Format price to currency
function formatCurrency(price) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(price);
}

// Open package modal
function openPackageModal(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (!pkg) return;
    
    currentPackage = pkg;
    const modal = document.getElementById('packageModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = pkg.name;
    modalBody.innerHTML = createPackageModalContent(pkg);
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Create package modal content
function createPackageModalContent(pkg) {
    const colorMap = {
        'bg-primary-green': '#5da96a',
        'bg-warm-brown': '#8b4513',
        'bg-blue-500': '#3b82f6',
        'bg-teal-500': '#14b8a6',
        'bg-purple-500': '#8b5cf6',
        'bg-orange-500': '#f97316'
    };
    
    const backgroundColor = colorMap[pkg.color] || '#5da96a';
    
    return `
        <div class="package-modal-grid">
            <div class="package-gallery">
                <img src="${pkg.imageUrl}" alt="${pkg.name}" class="main-image" id="mainImage">
                <div class="thumbnail-grid">
                    ${pkg.gallery.map(img => `
                        <img src="${img}" alt="${pkg.name}" class="thumbnail" onclick="changeMainImage('${img}')">
                    `).join('')}
                </div>
            </div>
            <div class="package-details">
                <div class="package-meta">
                    <div>
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${pkg.location}</span>
                    </div>
                    <div>
                        <i class="fas fa-clock"></i>
                        <span>${pkg.duration}</span>
                    </div>
                    <div>
                        <i class="fas fa-users"></i>
                        <span>Max ${pkg.maxCapacity} orang</span>
                    </div>
                    ${renderStars(pkg.rating)}
                </div>
                
                <div>
                    <h4>Deskripsi Paket</h4>
                    <p>${pkg.longDescription}</p>
                </div>
                
                <div class="package-highlights">
                    <h4>Highlight Destinasi</h4>
                    <ul>
                        ${pkg.highlights.map(highlight => `
                            <li><i class="fas fa-camera"></i> ${highlight}</li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="package-includes">
                    <h4>Yang Sudah Termasuk</h4>
                    <ul>
                        ${pkg.includes.map(include => `<li>${include}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="package-pricing">
                    <div class="price">${formatCurrency(pkg.price)}</div>
                    <div class="price-unit">per orang</div>
                    <div style="background-color: ${backgroundColor}; color: white; padding: 0.5rem 1rem; border-radius: 8px; margin-top: 1rem; display: inline-block;">
                        ${pkg.duration}
                    </div>
                </div>
                
                <div class="package-actions">
                    <button class="btn-primary" onclick="bookPackage(${pkg.id})">
                        <i class="fas fa-car"></i>
                        Pesan Sekarang
                    </button>
                    <button class="btn-secondary" onclick="askDetails(${pkg.id})">
                        <i class="fas fa-utensils"></i>
                        Tanya Detail
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Change main image in modal
function changeMainImage(imageSrc) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = imageSrc;
    }
}

// Close package modal
function closePackageModal() {
    const modal = document.getElementById('packageModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    currentPackage = null;
}

// Book package
function bookPackage(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
        const message = `Halo RR Travel! Saya tertarik dengan paket ${pkg.name} (${pkg.duration}) seharga ${formatCurrency(pkg.price)}. Bisa tolong berikan informasi lebih detail?`;
        const whatsappUrl = `https://wa.me/6282115665661?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    closePackageModal();
}

// Ask details
function askDetails(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
        const message = `Halo RR Travel! Saya ingin tanya detail lebih lanjut tentang paket ${pkg.name}. Bisa dijelaskan lebih detail?`;
        const whatsappUrl = `https://wa.me/6282115665661?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    closePackageModal();
}

// Initialize Mapbox
function initializeMap() {
    if (typeof mapboxgl === 'undefined') {
        console.warn('Mapbox GL JS not loaded');
        return;
    }
    
    // Use your actual Mapbox token here
    mapboxgl.accessToken = 'pk.eyJ1IjoidmluYTk4IiwiYSI6ImNtN3VjZ3loNjBmY2IyanF1Zm5ra3RyMjEifQ.P1CXwmOxsWHR5b4bKu5GQg';
    
    try {
        map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [107.6098, -6.9175], // Bandung coordinates
            zoom: 15
        });
        
        // Add marker for office location
        new mapboxgl.Marker({
            color: '#5da96a'
        })
        .setLngLat([107.6098, -6.9175])
        .setPopup(new mapboxgl.Popup().setHTML('<h3>RR Travel</h3><p>Jl. Siti Mariah, Bandung 40231</p>'))
        .addTo(map);
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
        
    } catch (error) {
        console.error('Error initializing map:', error);
        // Fallback: show static map message
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f5f5f5; color: #666;">
                    <div style="text-align: center;">
                        <i class="fas fa-map-marker-alt" style="font-size: 3rem; color: #5da96a; margin-bottom: 1rem;"></i>
                        <h3>Lokasi RR Travel</h3>
                        <p>Jl. Siti Mariah, Bandung 40231</p>
                        <p>Telepon: 082115665661</p>
                    </div>
                </div>
            `;
        }
    }
}

// Search location on map
function searchLocation() {
    const searchInput = document.getElementById('locationSearch');
    const query = searchInput.value.trim();
    
    if (!query || !map) return;
    
    // Use Mapbox Geocoding API for location search
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${mapboxgl.accessToken}&country=ID&proximity=107.6098,-6.9175`;
    
    fetch(geocodingUrl)
        .then(response => response.json())
        .then(data => {
            if (data.features && data.features.length > 0) {
                const [lng, lat] = data.features[0].center;
                map.flyTo({
                    center: [lng, lat],
                    zoom: 15
                });
                
                // Add temporary marker
                new mapboxgl.Marker({
                    color: '#f97316'
                })
                .setLngLat([lng, lat])
                .setPopup(new mapboxgl.Popup().setHTML(`<h3>${data.features[0].place_name}</h3>`))
                .addTo(map);
            } else {
                alert('Lokasi tidak ditemukan. Silakan coba kata kunci lain.');
            }
        })
        .catch(error => {
            console.error('Error searching location:', error);
            alert('Terjadi error saat mencari lokasi.');
        });
}

// Setup modals
function setupModals() {
    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        const packageModal = document.getElementById('packageModal');
        const qrModal = document.getElementById('qrModal');
        
        if (e.target === packageModal) {
            closePackageModal();
        }
        
        if (e.target === qrModal) {
            closeQRScanner();
        }
    });
    
    // Close modals with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePackageModal();
            closeQRScanner();
        }
    });
}

// Setup contact form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', handleContactSubmit);
    }
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        package: formData.get('package'),
        message: formData.get('message')
    };
    
    // Create WhatsApp message
    const packageName = data.package ? packages.find(p => p.id === data.package)?.name || 'Paket Custom' : 'Konsultasi Umum';
    const whatsappMessage = `
Halo RR Travel!

Saya tertarik untuk berkonsultasi tentang paket wisata.

Detail kontak:
- Nama: ${data.name}
- Email: ${data.email}
- WhatsApp: ${data.phone}
- Paket: ${packageName}

Pesan:
${data.message}

Mohon informasi lebih lanjut. Terima kasih!
    `.trim();
    
    const whatsappUrl = `https://wa.me/6282115665661?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Mengirim...';
    submitBtn.disabled = true;
    
    // Simulate sending delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        e.target.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Show success message
        alert('Pesan berhasil disiapkan! Anda akan diarahkan ke WhatsApp.');
    }, 1000);
}

// QR Scanner functionality
function openQRScanner() {
    if (typeof Html5Qrcode === 'undefined') {
        alert('QR Scanner belum tersedia. Pastikan koneksi internet stabil.');
        return;
    }
    
    const modal = document.getElementById('qrModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    const qrReaderId = "qr-reader";
    qrScanner = new Html5Qrcode(qrReaderId);
    
    const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
    };
    
    Html5Qrcode.getCameras().then(cameras => {
        if (cameras && cameras.length) {
            const cameraId = cameras[0].id;
            
            qrScanner.start(cameraId, config, (decodedText, decodedResult) => {
                onQRCodeScanned(decodedText);
            })
            .catch(err => {
                console.error('Error starting QR scanner:', err);
                alert('Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.');
                closeQRScanner();
            });
        } else {
            alert('Tidak ada kamera yang tersedia.');
            closeQRScanner();
        }
    }).catch(err => {
        console.error('Error getting cameras:', err);
        alert('Error mengakses kamera.');
        closeQRScanner();
    });
}

function closeQRScanner() {
    const modal = document.getElementById('qrModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    if (qrScanner) {
        qrScanner.stop().then(() => {
            qrScanner.clear();
            qrScanner = null;
        }).catch(err => {
            console.error('Error stopping QR scanner:', err);
        });
    }
    
    // Clear results
    const resultsDiv = document.getElementById('qr-reader-results');
    if (resultsDiv) {
        resultsDiv.classList.remove('show');
        resultsDiv.innerHTML = '';
    }
}

function onQRCodeScanned(decodedText) {
    // Stop scanning
    if (qrScanner) {
        qrScanner.stop();
    }
    
    // Show results
    const resultsDiv = document.getElementById('qr-reader-results');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <h4>QR Code Berhasil Dipindai!</h4>
            <p><strong>Hasil:</strong> ${decodedText}</p>
            <div style="margin-top: 1rem;">
                <button class="btn-primary" onclick="processQRResult('${decodedText}')">
                    Proses Hasil
                </button>
                <button class="btn-secondary" onclick="closeQRScanner()" style="margin-left: 0.5rem;">
                    Tutup
                </button>
            </div>
        `;
        resultsDiv.classList.add('show');
    }
}

function processQRResult(result) {
    // Process QR code result (customize based on your QR code format)
    if (result.includes('rrtravel') || result.includes('rr-travel')) {
        // It's an RR Travel QR code
        if (result.includes('package')) {
            // Extract package ID from QR code
            const packageMatch = result.match(/package[=:](\d+)/i);
            if (packageMatch) {
                const packageId = parseInt(packageMatch[1]);
                closeQRScanner();
                setTimeout(() => openPackageModal(packageId), 500);
                return;
            }
        }
        
        // Default RR Travel QR code action
        alert('QR Code RR Travel berhasil dipindai! Mengarahkan ke halaman utama...');
        closeQRScanner();
        scrollToSection('home');
    } else if (result.startsWith('http')) {
        // It's a URL
        if (confirm('QR Code berisi link. Buka link ini?')) {
            window.open(result, '_blank');
        }
        closeQRScanner();
    } else {
        // Generic text or other format
        alert(`QR Code berisi: ${result}`);
        closeQRScanner();
    }
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function setupScrollEffects() {
    // Add scroll effect to navigation
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add smooth scroll CSS for navigation hide/show
const style = document.createElement('style');
style.textContent = `
    .header.scroll-down {
        transform: translateY(-100%);
    }
    
    .header.scroll-up {
        transform: translateY(0);
    }
    
    .header {
        transition: transform 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);