export default function TrustedCompanies() {
  const companies = [
    { 
      name: "Booking.com", 
      logo: "/logos/bol.png" 
    },
    { 
      name: "Apple", 
      logo: "/logos/app.png" 
    },
    { 
      name: "DHL", 
      logo: "/logos/dhl.png" 
    },
    { 
      name: "Amazon", 
      logo: "/logos/ama.jpg" 
    },
    { 
      name: "American Express", 
      logo: "/logos/amr.jpg" 
    },
    { 
      name: "Accenture", 
      logo: "/logos/acc.png" 
    },
    { 
      name: "KPMG", 
      logo: "/logos/kpmg." 
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-12 lg:px-14">
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Text */}
          <div className="shrink-0 text-center lg:text-left">
            <p className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wide leading-snug">
              Our candidates <br />
              have been hired at:
            </p>
          </div>

          {/* Right Brands Logo Container */}
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-6 sm:gap-10 md:gap-12 w-full overflow-hidden">
            {companies.map((company, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center bg-white transition-all duration-300 hover:scale-105"
              >
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-15 sm:h-19 w-auto object-contain"
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}