'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FaShoppingCart, FaStar, FaChevronDown, FaSearch, FaChevronRight, FaSpinner, FaPlus, FaMinus } from 'react-icons/fa'
import { useCart } from '@/context/CartContext'
import { products, Product } from '@/data/products'

export default function ProductsSection() {
  const router = useRouter()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(products)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('Relevance')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [categorySearch, setCategorySearch] = useState('')
  const [showMoreCategories, setShowMoreCategories] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef<HTMLDivElement>(null)
  const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    isInCart, 
    getCartItemQuantity,
    addToIncognitoCart,
    removeFromIncognitoCart,
    updateIncognitoQuantity,
    isInIncognitoCart,
    getIncognitoCartItemQuantity,
    state
  } = useCart()

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]
  
  const categoryOptions = [
    'Women T-shirts',
    'Women Tops And Tunics', 
    'Analog Watches',
    'Bangles & Bracelets',
    'Bedsheets',
    'Bike Covers',
    'Blouses',
    'Bluetooth Headphones',
    'Boxes, Baskets & Bins',
    'Dresses',
    'Dupatta Sets',
    'Earrings & Studs',
    'Men T-shirts',
    'Men Polo Shirts',
    'Men Casual Shirts',
    'Men Formal Shirts',
    'Men Jeans',
    'Men Trousers',
    'Men Shorts',
    'Men Jackets',
    'Men Hoodies',
    'Men Sweatshirts',
    'Men Track Pants',
    'Men Pyjamas',
    'Men Undergarments',
    'Men Socks',
    'Men Belts',
    'Men Wallets',
    'Men Bags',
    'Men Shoes',
    'Men Sandals',
    'Men Slippers',
    'Men Watches',
    'Men Sunglasses',
    'Men Caps',
    'Men Scarves',
    'Men Gloves',
    'Men Ties',
    'Men Cufflinks',
    'Men Rings',
    'Men Bracelets',
    'Men Necklaces',
    'Men Earrings',
    'Men Anklets',
    'Men Toe Rings',
    'Men Nose Pins',
    'Men Bangles',
    'Men Chains',
    'Men Pendants',
    'Men Charms',
    'Men Brooches',
    'Men Hair Accessories',
    'Men Hair Bands',
    'Men Hair Clips',
    'Men Hair Pins',
    'Men Hair Combs',
    'Men Hair Brushes',
    'Men Hair Dryers',
    'Men Hair Straighteners',
    'Men Hair Curlers',
    'Men Hair Rollers',
    'Men Hair Sprays',
    'Men Hair Gels',
    'Men Hair Oils',
    'Men Hair Shampoos',
    'Men Hair Conditioners',
    'Men Hair Masks',
    'Men Hair Serums',
    'Men Hair Treatments',
    'Men Hair Colors',
    'Men Hair Dyes',
    'Men Hair Bleaches',
    'Men Hair Highlights',
    'Men Hair Lowlights',
    'Men Hair Ombre',
    'Men Hair Balayage',
    'Men Hair Foils',
    'Men Hair Perms',
    'Men Hair Relaxers',
    'Men Hair Texturizers',
    'Men Hair Volumizers',
    'Men Hair Thickeners',
    'Men Hair Growth',
    'Men Hair Loss',
    'Men Hair Fall',
    'Men Hair Thinning',
    'Men Hair Baldness',
    'Men Hair Replacement',
    'Men Hair Wigs',
    'Men Hair Extensions',
    'Men Hair Weaves',
    'Men Hair Braids',
    'Men Hair Twists',
    'Men Hair Locs',
    'Men Hair Dreadlocks',
    'Men Hair Cornrows',
    'Men Hair French Braids',
    'Men Hair Dutch Braids',
    'Men Hair Fishtail Braids',
    'Men Hair Waterfall Braids',
    'Men Hair Crown Braids',
    'Men Hair Milkmaid Braids',
    'Men Hair Box Braids',
    'Men Hair Senegalese Twists',
    'Men Hair Marley Twists',
    'Men Hair Havana Twists',
    'Men Hair Passion Twists',
    'Men Hair Spring Twists',
    'Men Hair Flat Twists',
    'Men Hair Two Strand Twists',
    'Men Hair Three Strand Twists',
    'Men Hair Four Strand Twists',
    'Men Hair Five Strand Twists',
    'Men Hair Six Strand Twists',
    'Men Hair Seven Strand Twists',
    'Men Hair Eight Strand Twists',
    'Men Hair Nine Strand Twists',
    'Men Hair Ten Strand Twists'
  ]

  const genderOptions = ['Boys', 'Girls', 'Men', 'Women']
  
  const otherFilters = [
    'Color',
    'Fabric', 
    'Dial Shape',
    'Size',
    'Price',
    'Rating',
    'Occasion',
    'Combo of',
    'Kurta Fabric',
    'Dupatta Color',
    'Combo',
    'Discount',
    'Reversible'
  ]

  // Load more products function
  const loadMoreProducts = useCallback(() => {
    if (isLoading || !hasMore) return
    
    setIsLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      setDisplayedProducts(prev => [...prev, ...filteredProducts])
      setIsLoading(false)
    }, 1000)
  }, [filteredProducts, isLoading, hasMore])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMoreProducts()
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [loadMoreProducts, hasMore, isLoading])

  // Filter products effect
  useEffect(() => {
    let filtered = products

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    setFilteredProducts(filtered)
    setDisplayedProducts(filtered)
    setHasMore(true)
  }, [searchQuery, selectedCategory])

  const handleAddToCart = (product: Product) => {
    if (state.isIncognitoMode) {
      addToIncognitoCart(product)
    } else {
      addToCart(product)
    }
  }

  const handleIncrementQuantity = (product: Product) => {
    if (state.isIncognitoMode) {
      const currentQuantity = getIncognitoCartItemQuantity(product.id)
      updateIncognitoQuantity(product.id, currentQuantity + 1)
    } else {
      const currentQuantity = getCartItemQuantity(product.id)
      updateQuantity(product.id, currentQuantity + 1)
    }
  }

  const handleDecrementQuantity = (product: Product) => {
    if (state.isIncognitoMode) {
      const currentQuantity = getIncognitoCartItemQuantity(product.id)
      if (currentQuantity > 1) {
        updateIncognitoQuantity(product.id, currentQuantity - 1)
      } else {
        removeFromIncognitoCart(product.id)
      }
    } else {
      const currentQuantity = getCartItemQuantity(product.id)
      if (currentQuantity > 1) {
        updateQuantity(product.id, currentQuantity - 1)
      } else {
        removeFromCart(product.id)
      }
    }
  }

  const isProductInCart = (productId: number) => {
    return state.isIncognitoMode ? isInIncognitoCart(productId) : isInCart(productId)
  }

  const getProductCartQuantity = (productId: number) => {
    return state.isIncognitoMode ? getIncognitoCartItemQuantity(productId) : getCartItemQuantity(productId)
  }

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  return (
    <section id="products-section" className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 bg-white p-4 rounded-lg shadow-sm">
            {/* Sort by dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by:</label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Price Low to High">Price Low to High</option>
                  <option value="Price High to Low">Price High to Low</option>
                  <option value="Newest First">Newest First</option>
                  <option value="Popularity">Popularity</option>
                </select>
                <FaChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2">FILTERS</h3>
              <p className="text-sm text-gray-600">1000+ Products</p>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Category</h4>
              
              {/* Category Search */}
              <div className="relative mb-3">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                <input
                  type="text"
                  placeholder="Search"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
                />
              </div>

              {/* Category Options */}
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {categoryOptions
                  .filter(category => 
                    category.toLowerCase().includes(categorySearch.toLowerCase())
                  )
                  .slice(0, showMoreCategories ? categoryOptions.length : 12)
                  .map(category => (
                    <label key={category} className="flex items-center cursor-pointer hover:bg-gray-50 p-1 rounded">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories([...selectedCategories, category])
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category))
                          }
                        }}
                        className="mr-3 text-[#8B5CF6] focus:ring-[#8B5CF6]"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
              </div>
              
              {!showMoreCategories && (
                <button
                  onClick={() => setShowMoreCategories(true)}
                  className="text-sm text-[#8B5CF6] hover:text-[#7C3AED] mt-2"
                >
                  Show More
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3">Gender</h4>
              <div className="grid grid-cols-2 gap-2">
                {genderOptions.map(gender => (
                  <button
                    key={gender}
                    onClick={() => setSelectedGender(selectedGender === gender ? '' : gender)}
                    className={`p-2 text-sm rounded-md border transition-colors ${
                      selectedGender === gender
                        ? 'bg-[#8B5CF6] text-white border-[#8B5CF6]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#8B5CF6]'
                    }`}
                  >
                    {gender}
                  </button>
                ))}
              </div>
            </div>

            {/* Other Filters */}
            <div className="space-y-3">
              {otherFilters.map(filter => (
                <div key={filter} className="border-b border-gray-200 pb-2">
                  <button className="flex items-center justify-between w-full text-left hover:bg-gray-50 p-2 rounded">
                    <span className="text-sm font-medium text-gray-700">{filter}</span>
                    <FaChevronRight className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white p-4 mb-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by :</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border-none bg-transparent text-sm font-medium focus:outline-none"
                >
                  <option value="Relevance">Relevance</option>
                  <option value="Price Low to High">Price Low to High</option>
                  <option value="Price High to Low">Price High to Low</option>
                  <option value="Rating">Rating</option>
                </select>
                <FaChevronDown className="w-3 h-3 text-gray-400" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {displayedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="product-card overflow-hidden group relative cursor-pointer"
                  onClick={() => handleProductClick(product.id)}
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {/* Sale Badge */}
                    <div className="absolute top-2 left-2 sale-badge">
                      {product.badge}
                    </div>
                    
                    {/* Timer Badge (for some products) */}
                    {index % 3 === 1 && (
                      <div className="timer-badge">
                        00h: 07m: 50s
                      </div>
                    )}
                    
                    {/* Product Image */}
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    
                    {/* Fallback Image */}
                    <div className="text-4xl text-gray-400 hidden">
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
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                          <span className="text-sm font-bold">{product.rating}</span>
                          <FaStar className="w-3 h-3" />
                        </div>
                        <span className="text-sm text-gray-600">
                          {product.reviews} Reviews
                        </span>
                      </div>
                    )}

                    {/* Trusted Badge (for some products) */}
                    {index % 4 === 2 && (
                      <div className="inline-block mb-2">
                        <img
                          src="/assets/svg/mtrusted.svg"
                          alt="Meesho Trusted"
                          className="h-6 w-auto"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling.style.display = 'inline-block';
                          }}
                        />
                        <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium hidden">
                          m Trusted
                        </div>
                      </div>
                    )}

                    {/* Cart Button/Counter */}
                    {!isProductInCart(product.id) ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                        className="absolute bottom-3 right-3 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors shadow-lg"
                        title="Add to Cart"
                      >
                        <FaShoppingCart className="w-4 h-4" />
                      </button>
                    ) : (
                      <div className="absolute bottom-3 right-3 flex items-center bg-pink-500 text-white rounded-full shadow-lg">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDecrementQuantity(product)
                          }}
                          className="p-2 hover:bg-pink-600 rounded-l-full transition-colors"
                          title="Decrease Quantity"
                        >
                          <FaMinus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-2 text-sm font-semibold min-w-[2rem] text-center">
                          {getProductCartQuantity(product.id)}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleIncrementQuantity(product)
                          }}
                          className="p-2 hover:bg-pink-600 rounded-r-full transition-colors"
                          title="Increase Quantity"
                        >
                          <FaPlus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <FaSpinner className="animate-spin text-[#8B5CF6] text-2xl mr-2" />
                <span className="text-gray-600">Loading more products...</span>
              </div>
            )}

            {/* Infinite Scroll Trigger */}
            <div ref={observerRef} className="h-4"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
