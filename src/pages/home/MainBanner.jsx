const MainBanner = () => {

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Find Funding Schemes with Ease
          </h1>
          <p className="text-lg text-gray-600">
            Explore various funding schemes and get all the information you need in one place.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -z-10 w-64 h-64 rounded-full bg-lime-300 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="bg-emerald-50 p-8 rounded-lg shadow-sm">
              <div className="w-48 h-48">
                <svg viewBox="0 0 24 24" className="w-full h-full text-emerald-500">
                  <path
                    fill="currentColor"
                    d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z"
                  />
                </svg>
              
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default MainBanner;
