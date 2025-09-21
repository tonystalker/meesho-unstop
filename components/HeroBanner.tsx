'use client'

import { FaGift, FaBullhorn } from 'react-icons/fa'

export default function HeroBanner() {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products-section')
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden">
      {/* Main Banner - Using WebP Image as Background */}
      <div className="relative min-h-[500px]">
        {/* WebP Background Image */}
        <img 
          src="/assets/banners/1757490578069.webp" 
          alt="Meesho Banner" 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback to CSS banner if webp doesn't load
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'block';
          }}
        />
        
        {/* Fallback CSS Banner (hidden by default) */}
        <div className="mega-banner text-white py-8 hidden absolute inset-0">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="grid lg:grid-cols-3 gap-8 items-center w-full">
              {/* Left - Mega Blockbuster Sale */}
              <div className="lg:col-span-2 relative">
                <div className="relative z-10">
                  {/* Mamaearth Present */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      mamaearth
                    </div>
                    <span className="text-sm">Presents</span>
                  </div>

                  {/* Main Hexagon */}
                  <div className="relative mb-6">
                    <div className="blockbuster-hexagon w-64 h-48 mx-auto flex flex-col items-center justify-center text-center relative">
                      <div className="text-xs mb-1">meesho</div>
                      <div className="text-2xl font-bold mb-1">MEGA</div>
                      <div className="bg-white text-red-600 px-4 py-1 rounded text-xl font-bold mb-1">
                        BLOCKBUSTER
                      </div>
                      <div className="text-2xl font-bold">SALE</div>
                    </div>
                    
                    {/* Megaphones */}
                    <FaBullhorn className="absolute top-4 left-8 text-yellow-400 text-2xl transform rotate-12" />
                    <FaBullhorn className="absolute bottom-4 right-8 text-yellow-400 text-2xl transform -rotate-12" />
                  </div>

                  {/* Starts Date */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <div className="bg-[#8B5CF6] border-2 border-red-500 px-4 py-1 rounded-full text-sm">
                      Starts 19th Sept.
                    </div>
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>

                  {/* Powered by */}
                  <div className="text-center text-sm">
                    <span>Powered by</span>
                    <div className="flex justify-center gap-4 mt-2">
                      <span className="bg-white/20 px-2 py-1 rounded text-xs">Ghar</span>
                      <span className="bg-white/20 px-2 py-1 rounded text-xs">BUMTUM</span>
                      <span className="bg-white/20 px-2 py-1 rounded text-xs">DENVER</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Discount and CTA */}
              <div className="lg:col-span-1 text-center">
                {/* 80% OFF Cloud */}
                <div className="relative mb-6">
                  <img 
                    src="/assets/banners/80-off-banner.png" 
                    alt="80% OFF" 
                    className="w-full max-w-xs mx-auto"
                    onError={(e) => {
                      // Fallback to original design if image doesn't exist
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling.style.display = 'block';
                    }}
                  />
                  <div className="bg-red-500 border-4 border-white rounded-full px-8 py-6 relative hidden">
                    <div className="text-sm mb-1">UP TO</div>
                    <div className="text-4xl font-bold">80%</div>
                    <div className="text-lg">OFF</div>
                    {/* Sparkles */}
                    <div className="absolute top-2 left-2 text-yellow-300">✨</div>
                    <div className="absolute top-4 right-4 text-yellow-300">⭐</div>
                    <div className="absolute bottom-2 left-4 text-yellow-300">✨</div>
                  </div>
                </div>

                {/* Text and CTA */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold">Smart Shopping</h2>
                  <h3 className="text-xl">Trusted by Millions</h3>
                  <button
                    onClick={scrollToProducts}
                    className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay Content - Smart Shopping on Right Side */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-full flex">
            {/* Left side - empty to let webp show */}
            <div className="w-1/2"></div>
            
            {/* Right side - Smart Shopping overlay */}
            <div className="w-1/2 relative">
              {/* Content - No overlay, completely transparent */}
              <div className="relative z-10 h-full flex items-center justify-center px-8">
                <div className="text-center space-y-6">
                  {/* Main Text */}
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                      Smart Shopping
                    </h1>
                    <h2 className="text-xl md:text-2xl text-white drop-shadow-lg">
                      Trusted by Millions
                    </h2>
                  </div>
                  
                  {/* Shop Now Button */}
                  <button
                    onClick={scrollToProducts}
                    className="bg-white text-purple-800 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Bar */}
      <div className="py-6 bg-pink-50">
        <div className="container mx-auto px-6">
          <div className="bg-white border border-pink-200 rounded-lg py-4 px-8">
            <div className="flex justify-center items-center gap-16">
              <div className="flex items-center gap-3 text-gray-800">
                <img 
                  src="/assets/icons/returns.svg" 
                  alt="Returns" 
                  className="w-8 h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <span className="text-white text-sm hidden">↻</span>
                <span className="text-sm font-medium">7 Days Easy Return</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-3 text-gray-800">
                <img 
                  src="/assets/icons/cod.svg" 
                  alt="Cash on Delivery" 
                  className="w-8 h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <span className="text-white text-sm hidden">₹</span>
                <span className="text-sm font-medium">Cash on Delivery</span>
              </div>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-3 text-gray-800">
                <img 
                  src="/assets/icons/lowest-price.svg" 
                  alt="Lowest Prices" 
                  className="w-8 h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling.style.display = 'block';
                  }}
                />
                <span className="text-white text-sm hidden">%</span>
                <span className="text-sm font-medium">Lowest Prices</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="bg-white">
        <div className="flex flex-col">
          <img 
            src="/images/1.png" 
            alt="Image 1" 
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <img 
            src="/images/2.png" 
            alt="Image 2" 
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </div>
    </section>
  )
}
