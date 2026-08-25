import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export function LakhimpurBranch() {
  // Ensure the page scrolls to the top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const clinicPhone = "918052899698"; 
  const whatsappMessage = encodeURIComponent("नमस्ते, मुझे लखीमपुर खीरी ब्रांच में डॉक्टर मौर्य से आयुर्वेदिक परामर्श बुक करना है।");
  const whatsappLink = `https://wa.me/${clinicPhone}?text=${whatsappMessage}`;
  const branchAddress = 'Kalkari hospital k piche, Nahariya Rd, behind Awas vikas colony, near Jawa Agency, Awas Vikas Colony, Lakhimpur, Uttar Pradesh 262701';
  const branchMapSrc = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3524.9881308258596!2d80.78353157452905!3d27.933009115504202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399f35ab7ec4a1a1%3A0xfe56d22186e6c51c!2sAshtang%20Ayurveda%20clinic!5e0!3m2!1sen!2sin!4v1786421624928!5m2!1sen!2sin';
  const branchMapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branchAddress)}`;

  // JSON-LD Schema for Google Search Optimization
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Ashtang Ayurveda - Lakhimpur Kheri Branch",
    "image": "https://www.ashtangayurveda.com/logo.png",
    "description": "Expert Ayurvedic care in Lakhimpur Kheri. Authentic Nadi Pariksha, personalized treatments, and root-cause healing.",
    "url": "https://www.ashtangayurveda.com/lakhimpur-kheri",
    "telephone": "+918052899698",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kalkari hospital k piche, Nahariya Rd, behind Awas vikas colony, near Jawa Agency, Awas Vikas Colony",
      "addressLocality": "Lakhimpur",
      "addressRegion": "Uttar Pradesh",
      "postalCode": "262701",
      "addressCountry": "IN"
    },
    // Updated to reflect Sunday-only operations (Su)
    "openingHours": "Su 10:00-18:00",
    "priceRange": "$$"
  };

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-[#f8f9ea] py-20 px-4 font-sans flex items-center justify-center">
        
        <Helmet>
          <title>Ayurvedic Clinic in Lakhimpur Kheri | Ashtang Ayurveda</title>
          <meta name="description" content="Experience root-cause healing at Ashtang Ayurveda in Lakhimpur Kheri. Book your consultation for Nadi Pariksha and natural treatments today." />
          <script type="application/ld+json">
            {JSON.stringify(localBusinessSchema)}
          </script>
        </Helmet>

        {/* The Main UI Card */}
        <div className="max-w-4xl w-full mx-auto shadow-2xl rounded-3xl overflow-hidden">
          
          {/* Top Dark Green Section */}
          <div className="bg-[#1a3b2b] px-8 py-12 sm:px-12 sm:py-16">
            <span className="text-[#c59e5e] font-bold tracking-widest uppercase text-xs sm:text-sm mb-4 block">
              Lakhimpur Kheri Branch
            </span>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6 leading-tight">
              Authentic Ayurvedic Care <br className="hidden sm:block"/> in Lakhimpur Kheri
            </h1>
            
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mb-10 leading-relaxed">
              Our state-of-the-art clinic brings decades of Ayurvedic wisdom to your city. We specialize in Nadi Pariksha (Pulse Diagnosis), chronic disease management, and natural therapies designed to treat the root cause of your illness, not just the symptoms.
            </p>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#c59e5e] hover:bg-[#b08d53] text-[#1a3b2b] text-sm sm:text-base font-bold rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Book your visit</span>
            </a>
          </div>

          {/* Bottom Light/White Section */}
          <div className="bg-[#fcfcf9] px-8 py-10 sm:px-12 border-t border-[#c59e5e]/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              
              {/* Clinic Timings */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c59e5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3b2b] text-lg mb-1">Clinic Timings</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    <span className="font-semibold text-gray-800">Every Sunday</span> <br/>
                    10:00 AM - 6:00 PM <br/>
                    <span className="text-gray-400 italic mt-1 block">Mon - Sat Closed</span>
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c59e5e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a3b2b] text-lg mb-1">Find us</h3>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {branchAddress}
                  </p>
                </div>
              </div>

            </div>

            <div className="mt-10 overflow-hidden rounded-2xl border border-[#c59e5e]/25 bg-gray-100 shadow-sm">
              <div className="flex items-center justify-between gap-4 bg-[#f8f5e9] px-4 py-3 sm:px-5">
                <div>
                  <h3 className="font-bold text-[#1a3b2b]">Location map</h3>
                  <p className="text-sm text-gray-600">Find our Lakhimpur Kheri branch</p>
                </div>
              </div>
              <iframe
                title="Ashtang Ayurveda Lakhimpur Kheri location map"
                src={branchMapSrc}
                width="100%"
                height="240"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
              <a
                href={branchMapLink}
                target="_blank"
                rel="noreferrer"
                className="block bg-white px-4 py-3 text-center text-sm font-semibold text-[#1a3b2b] hover:bg-[#f8f5e9]"
              >
                Open this location in Google Maps
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </HelmetProvider>
  );
}