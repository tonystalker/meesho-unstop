'use client'

import { useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'
import { Product } from '@/data/products'

interface PeopleAlsoViewedProps {
  products: Product[]
}

export default function PeopleAlsoViewed({ products }: PeopleAlsoViewedProps) {
  const router = useRouter()
  const { addToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart(product)
  }

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        {/* Top Feature Bar */}
        <div className="bg-purple-50 py-3 mb-6">
          <div className="container mx-auto px-4">
            <div className="flex justify-center items-center gap-12">
            <div className="flex items-center gap-2 text-[#8B5CF6]">
              <img 
                src="/assets/icons/price-icon.png" 
                alt="Lowest Price" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-green-500 rounded-full items-center justify-center hidden">
                <span className="text-white text-sm font-bold">%</span>
              </div>
              <span className="text-sm font-medium">Lowest Price</span>
            </div>
            <div className="flex items-center gap-2 text-[#8B5CF6]">
              <img 
                src="/assets/icons/cod-icon.png" 
                alt="Cash on Delivery" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-green-500 rounded-full items-center justify-center hidden">
                <span className="text-white text-sm font-bold">₹</span>
              </div>
              <span className="text-sm font-medium">Cash on Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-[#8B5CF6]">
              <img 
                src="/assets/icons/return-icon.png" 
                alt="7-day Returns" 
                className="w-8 h-8"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-8 h-8 bg-green-500 rounded-full items-center justify-center hidden">
                <span className="text-white text-sm">↻</span>
              </div>
              <span className="text-sm font-medium">7-day Returns</span>
            </div>
            </div>
          </div>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6">People also viewed</h2>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.slice(0, 5).map((product, index) => (
            <div
              key={product.id}
              className="product-card overflow-hidden group cursor-pointer"
              onClick={() => handleProductClick(product.id)}
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                {/* Timer Badge (for second product) */}
                {index === 1 && (
                  <div className="timer-badge">
                    00h:01m:50s
                  </div>
                )}
                
                {/* Product Image Placeholder */}
                <div className="text-4xl text-gray-400">
                  {product.category === 'Fashion' ? '👕' : 
                   product.category === 'Electronics' ? '📱' :
                   product.category === 'Home & Kitchen' ? '🏠' : '🛍️'}
                </div>
                
                {/* Product ID Overlay */}
                <div className="product-image-overlay">
                  s-{product.id.toString().padStart(9, '0')}
                </div>
                
                {/* More Images Badge */}
                <div className="more-images-badge">
                  +{Math.floor(Math.random() * 5) + 1} More
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3">
                <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h4>
                
                {/* Price */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-gray-800">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{product.originalPrice}
                      </span>
                      <span className="discount-text">
                        {product.discount}% off
                      </span>
                    </>
                  )}
                </div>

                {/* Delivery */}
                <p className="text-xs text-gray-600 mb-2">Free Delivery</p>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1">
                    <FaStar className="rating-star w-3 h-3" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-xs text-gray-500">
                      {product.reviews} Reviews
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
