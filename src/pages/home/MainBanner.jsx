import { Link } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { ArrowRight } from "lucide-react";

const MainBanner = () => {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="container mx-auto px-4 py-12 md:py-20">
        {/* Mobile Search Bar */}
        <div className="md:hidden mb-8">
          <SearchBar />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-2">
              Financial Support
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Find Funding Schemes with Ease
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Explore various funding schemes and get all the information you need in one place.
              Get started today and find the right financial support for your needs.
            </p>
            
            {/* CTA Button - Centered */}
          {/* CTA Button - More centered near the illustration */}
<div className="col-span-full flex justify-center md:justify-center pt-4">
  <Link to="/schemes" className="inline-block">
    <button className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold transition-all shadow-md flex items-center justify-center gap-2 group">
      Explore Schemes
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  </Link>
</div>

            
            {/* Trust indicators */}
            {/* <div className="flex items-center justify-center sm:justify-start gap-2 text-sm text-gray-500 pt-4">
              <span className="flex items-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-yellow-500 mr-1">
                  <path fill="currentColor" d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" />
                </svg>
                Trusted by 10,000+ users
              </span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span>Updated weekly</span>
            </div> */}
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              {/* Background circles */}
              <div className="absolute -z-10 w-72 h-72 rounded-full bg-lime-200/70 blur-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute -z-10 w-48 h-48 rounded-full bg-emerald-200/70 blur-lg -top-4 -right-8"></div>
              
              {/* Main illustration container */}
              <div className="bg-white p-8 rounded-2xl shadow-lg relative z-10 rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="w-56 h-56 md:w-64 md:h-64">
                  <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-500">
                    <path
                      fill="currentColor"
                      d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z"
                    />
                  </svg>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-6 -left-3 w-8 h-8 bg-yellow-400 rounded-lg rotate-12"></div>
                <div className="absolute -bottom-2 right-8 w-6 h-6 bg-emerald-400 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;