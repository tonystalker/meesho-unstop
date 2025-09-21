'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaTruck, FaCalendar, FaThumbsUp, FaChevronLeft, FaChevronRight, FaPlus, FaMinus, FaSearch, FaThumbsDown, FaEllipsisV, FaCheck, FaUser } from 'react-icons/fa'
import { products, Product } from '@/data/products'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { CartProvider, useCart } from '@/context/CartContext'

function ProductDetailContent() {
  const params = useParams()
  const router = useRouter()
  const productId = parseInt(params.id as string)
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('M')
  const [quantity, setQuantity] = useState(1)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [pincode, setPincode] = useState('')
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [displayedSimilarProducts, setDisplayedSimilarProducts] = useState(20)
  const [isLoadingSimilar, setIsLoadingSimilar] = useState(false)
  const [hasMoreSimilar, setHasMoreSimilar] = useState(true)
  const [showSizeDropdown, setShowSizeDropdown] = useState<number | null>(null)
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({})
  const [showAskQuestion, setShowAskQuestion] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')
  const [likedAnswers, setLikedAnswers] = useState<Set<number>>(new Set())
  const [dislikedAnswers, setDislikedAnswers] = useState<Set<number>>(new Set())
  const [showSizeRecommendation, setShowSizeRecommendation] = useState(false)
  const [qaData, setQaData] = useState([
    {
      id: 1,
      question: "product will faded when i wash.?",
      answer: "No. Just wash it with cold water.",
      responder: "Aniruddh Gohil",
      role: "Certified Buyer",
      roleIcon: "check",
      likes: 23,
      dislikes: 10
    },
    {
      id: 2,
      question: "does this tshirt shrink after few washes",
      answer: "no, it does not shrink",
      responder: "KartbinOnlineServices",
      role: "Meesho Seller",
      roleIcon: "user",
      likes: 15,
      dislikes: 10
    },
    {
      id: 3,
      question: "It is good for college ha",
      answer: "No",
      responder: "Anonymous",
      role: "Certified Buyer",
      roleIcon: "check",
      likes: 21,
      dislikes: 17
    },
    {
      id: 4,
      question: "What is the fabric quality?",
      answer: "The fabric is 100% cotton and very soft. It's comfortable for daily wear and doesn't cause any skin irritation.",
      responder: "Priya Sharma",
      role: "Certified Buyer",
      roleIcon: "check",
      likes: 18,
      dislikes: 2
    },
    {
      id: 5,
      question: "Is the size chart accurate?",
      answer: "Yes, the size chart is accurate. I ordered M size and it fits perfectly as per the measurements given.",
      responder: "Rajesh Kumar",
      role: "Certified Buyer",
      roleIcon: "check",
      likes: 12,
      dislikes: 5
    }
  ])
  const observerRef = useRef<HTMLDivElement>(null)
  const { addToCart, isInCart, getCartItemQuantity, updateQuantity, removeFromCart, addToIncognitoCart, removeFromIncognitoCart, updateIncognitoQuantity, isInIncognitoCart, getIncognitoCartItemQuantity, state } = useCart()

  // Load more similar products (add 20 more = 5 more rows)
  const loadMoreSimilarProducts = useCallback(() => {
    if (isLoadingSimilar) return
    
    console.log('Loading more similar products...')
    setIsLoadingSimilar(true)
    setTimeout(() => {
      setDisplayedSimilarProducts(prev => {
        const newCount = prev + 20
        console.log('Added 20 more products, total:', newCount)
        return newCount
      })
      setIsLoadingSimilar(false)
    }, 1000)
  }, [isLoadingSimilar])

  // Intersection Observer for infinite scroll (same as homepage)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('Intersection observer triggered:', entries[0].isIntersecting)
        if (entries[0].isIntersecting && !isLoadingSimilar) {
          console.log('Loading more products...')
          loadMoreSimilarProducts()
        }
      },
      { threshold: 0.1 }
    )

    const currentRef = observerRef.current
    if (currentRef) {
      console.log('Observing element:', currentRef)
      observer.observe(currentRef)
    } else {
      console.log('No observer ref found')
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [loadMoreSimilarProducts, isLoadingSimilar])

  // Close size dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSizeDropdown !== null) {
        const target = event.target as HTMLElement
        if (!target.closest('.size-dropdown')) {
          setShowSizeDropdown(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSizeDropdown])

  // Close size recommendation when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSizeRecommendation) {
        const target = event.target as HTMLElement
        if (!target.closest('.size-recommendation-popup')) {
          setShowSizeRecommendation(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSizeRecommendation])

  // Product images for Break Rules t-shirt
  const productImages = [
    product?.image || '/assets/products/p21.avif',
    '/assets/products/p22.avif'
  ]

  // Generate 20 similar products using p23-p42 images (20 products for 5 rows of 4)
  const baseSimilarProducts = Array.from({ length: 20 }, (_, index) => {
    const products = [
      { title: "Men Cotton Blend Oversize Tshirts", price: 240, originalPrice: 240, discount: 0, rating: 3.9, reviews: "Supplier" },
      { title: "Men Cotton Blend Oversize Tshirts", price: 200, originalPrice: 200, discount: 0, rating: 4.4, reviews: 12 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 232, originalPrice: 232, discount: 0, rating: 4.8, reviews: 5 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 223, originalPrice: 234, discount: 5, rating: 3.9, reviews: 25 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 223, originalPrice: 234, discount: 5, rating: 4.4, reviews: 23 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 180, originalPrice: 200, discount: 10, rating: 4.2, reviews: 8 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 195, originalPrice: 220, discount: 11, rating: 4.1, reviews: 15 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 210, originalPrice: 250, discount: 16, rating: 4.3, reviews: 7 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 225, originalPrice: 225, discount: 0, rating: 4.0, reviews: 18 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 190, originalPrice: 210, discount: 10, rating: 4.5, reviews: 22 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 205, originalPrice: 230, discount: 11, rating: 3.8, reviews: 14 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 220, originalPrice: 240, discount: 8, rating: 4.2, reviews: 9 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 185, originalPrice: 200, discount: 8, rating: 4.1, reviews: 16 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 215, originalPrice: 250, discount: 14, rating: 4.3, reviews: 11 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 200, originalPrice: 220, discount: 9, rating: 3.9, reviews: 13 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 230, originalPrice: 260, discount: 12, rating: 4.4, reviews: 6 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 195, originalPrice: 215, discount: 9, rating: 4.0, reviews: 19 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 210, originalPrice: 235, discount: 11, rating: 4.2, reviews: 17 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 225, originalPrice: 250, discount: 10, rating: 4.1, reviews: 21 },
      { title: "Men Cotton Blend Oversize Tshirts", price: 190, originalPrice: 205, discount: 7, rating: 3.8, reviews: 12 }
    ]
    
    const product = products[index % products.length]
    return {
      id: index + 23,
      title: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      discount: product.discount,
      category: "Fashion",
      badge: ["SALE", "NEW", "TRENDING", "POPULAR"][Math.floor(Math.random() * 4)],
      image: `/assets/products/p${index + 23}.avif`,
      description: "Comfortable cotton blend oversized t-shirts",
      rating: product.rating,
      reviews: product.reviews
    }
  })

  // Create infinite scroll by repeating the 20 products
  const similarProducts = Array.from({ length: displayedSimilarProducts }, (_, index) => {
    const baseIndex = index % 20
    const repeatCount = Math.floor(index / 20)
    return {
      ...baseSimilarProducts[baseIndex],
      id: baseSimilarProducts[baseIndex].id + (repeatCount * 1000) // Make IDs unique for each repeat
    }
  })

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Alok Kumar Alok",
      rating: 5.0,
      date: "18 Sep 2025",
      comment: "Nice product",
      helpful: 0
    },
    {
      id: 2,
      name: "Milind Tamhankar",
      rating: 5.0,
      date: "18 Sep 2025",
      comment: "Good quality",
      helpful: 0
    },
    {
      id: 3,
      name: "Priya Sharma",
      rating: 4.0,
      date: "15 Sep 2025",
      comment: "The fabric is really soft and comfortable. Perfect fit for me. The color is exactly as shown in the picture. Would definitely recommend this to others. Great value for money!",
      helpful: 3
    },
    {
      id: 4,
      name: "Rajesh Patel",
      rating: 2.0,
      date: "12 Sep 2025",
      comment: "Disappointed with the quality. The color started fading after just one wash. The fabric feels cheap and the stitching is not good. Size was also smaller than expected. Not worth the price.",
      helpful: 1
    },
    {
      id: 5,
      name: "Anita Singh",
      rating: 5.0,
      date: "10 Sep 2025",
      comment: "Excellent product! The material is premium quality and the fit is perfect. I've been wearing it for a week now and it still looks new. The design is trendy and goes well with both jeans and trousers. Highly satisfied!",
      helpful: 5
    }
  ]

  // Interactive Q&A functions
  const handleAskQuestion = () => {
    if (newQuestion.trim()) {
      const newQa = {
        id: qaData.length + 1,
        question: newQuestion.trim(),
        answer: "Your question has been submitted and will be answered soon.",
        responder: "Meesho Support",
        role: "Meesho Support",
        roleIcon: "user" as const,
        likes: 0,
        dislikes: 0
      }
      setQaData(prev => [newQa, ...prev])
      setNewQuestion('')
      setShowAskQuestion(false)
    }
  }

  const handleLikeAnswer = (qaId: number) => {
    setQaData(prev => prev.map(qa => {
      if (qa.id === qaId) {
        const isLiked = likedAnswers.has(qaId)
        const isDisliked = dislikedAnswers.has(qaId)
        
        let newLikes = qa.likes
        let newDislikes = qa.dislikes
        
        if (isLiked) {
          // Remove like
          newLikes = Math.max(0, qa.likes - 1)
          setLikedAnswers(prev => {
            const newSet = new Set(prev)
            newSet.delete(qaId)
            return newSet
          })
        } else {
          // Add like
          newLikes = qa.likes + 1
          setLikedAnswers(prev => new Set(prev).add(qaId))
          
          // Remove dislike if it exists
          if (isDisliked) {
            newDislikes = Math.max(0, qa.dislikes - 1)
            setDislikedAnswers(prev => {
              const newSet = new Set(prev)
              newSet.delete(qaId)
              return newSet
            })
          }
        }
        
        return { ...qa, likes: newLikes, dislikes: newDislikes }
      }
      return qa
    }))
  }

  const handleDislikeAnswer = (qaId: number) => {
    setQaData(prev => prev.map(qa => {
      if (qa.id === qaId) {
        const isLiked = likedAnswers.has(qaId)
        const isDisliked = dislikedAnswers.has(qaId)
        
        let newLikes = qa.likes
        let newDislikes = qa.dislikes
        
        if (isDisliked) {
          // Remove dislike
          newDislikes = Math.max(0, qa.dislikes - 1)
          setDislikedAnswers(prev => {
            const newSet = new Set(prev)
            newSet.delete(qaId)
            return newSet
          })
        } else {
          // Add dislike
          newDislikes = qa.dislikes + 1
          setDislikedAnswers(prev => new Set(prev).add(qaId))
          
          // Remove like if it exists
          if (isLiked) {
            newLikes = Math.max(0, qa.likes - 1)
            setLikedAnswers(prev => {
              const newSet = new Set(prev)
              newSet.delete(qaId)
              return newSet
            })
          }
        }
        
        return { ...qa, likes: newLikes, dislikes: newDislikes }
      }
      return qa
    }))
  }

  // Mock seller data
  const seller = {
    name: "LGM GARMENTS",
    rating: 4.0,
    ratings: 1592,
    followers: 18,
    products: 129
  }

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId)
    if (foundProduct) {
      setProduct(foundProduct)
    }
  }, [productId])

  const handleAddToCart = () => {
    if (product) {
    addToCart(product)
    }
  }

  const handleBuyNow = () => {
    if (product) {
    addToCart(product)
    router.push('/cart')
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (product) {
    if (newQuantity === 0) {
      removeFromCart(product.id)
    } else {
      updateQuantity(product.id, newQuantity)
      }
    }
  }

  // Cart functions for similar products
  const handleAddToCartSimilar = (product: any) => {
    if (state.isIncognitoMode) {
      addToIncognitoCart(product)
    } else {
      addToCart(product)
    }
  }

  const handleIncrementQuantitySimilar = (product: any) => {
    if (state.isIncognitoMode) {
      const currentQuantity = getIncognitoCartItemQuantity(product.id)
      updateIncognitoQuantity(product.id, currentQuantity + 1)
    } else {
      const currentQuantity = getCartItemQuantity(product.id)
      updateQuantity(product.id, currentQuantity + 1)
    }
  }

  const handleDecrementQuantitySimilar = (product: any) => {
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

  const isProductInCartSimilar = (productId: number) => {
    return state.isIncognitoMode ? isInIncognitoCart(productId) : isInCart(productId)
  }

  const getProductCartQuantitySimilar = (productId: number) => {
    return state.isIncognitoMode ? getIncognitoCartItemQuantity(productId) : getCartItemQuantity(productId)
  }

  const handleProductClick = (productId: number) => {
    router.push(`/product/${productId}`)
  }

  // Size selection handlers for similar products
  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
    setShowSizeDropdown(null)
  }

  const handleAddToCartWithSize = (product: any) => {
    const selectedSize = selectedSizes[product.id] || 'L'
    const productWithSize = { ...product, selectedSize }
    
    if (state.isIncognitoMode) {
      addToIncognitoCart(productWithSize)
    } else {
      addToCart(productWithSize)
    }
  }

  const isProductInCartWithSize = (productId: number) => {
    const selectedSize = selectedSizes[productId] || 'L'
    if (state.isIncognitoMode) {
      return state.incognitoItems.some(item => item.id === productId && item.selectedSize === selectedSize)
    } else {
      return state.items.some(item => item.id === productId && item.selectedSize === selectedSize)
    }
  }

  const getProductCartQuantityWithSize = (productId: number) => {
    const selectedSize = selectedSizes[productId] || 'L'
    if (state.isIncognitoMode) {
      const item = state.incognitoItems.find(item => item.id === productId && item.selectedSize === selectedSize)
      return item ? item.quantity : 0
    } else {
      const item = state.items.find(item => item.id === productId && item.selectedSize === selectedSize)
      return item ? item.quantity : 0
    }
  }

  const handleIncrementQuantityWithSize = (product: any) => {
    const selectedSize = selectedSizes[product.id] || 'L'
    const currentQuantity = getProductCartQuantityWithSize(product.id)
    const productWithSize = { ...product, selectedSize }
    
    if (state.isIncognitoMode) {
      updateIncognitoQuantity(product.id, currentQuantity + 1)
    } else {
      updateQuantity(product.id, currentQuantity + 1)
    }
  }

  const handleDecrementQuantityWithSize = (product: any) => {
    const currentQuantity = getProductCartQuantityWithSize(product.id)
    if (currentQuantity > 1) {
      if (state.isIncognitoMode) {
        updateIncognitoQuantity(product.id, currentQuantity - 1)
      } else {
        updateQuantity(product.id, currentQuantity - 1)
      }
    } else {
      if (state.isIncognitoMode) {
        removeFromIncognitoCart(product.id)
      } else {
        removeFromCart(product.id)
      }
    }
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL']
  const similarProductSizes = ['L', 'XL', 'XXL'] // Available sizes for similar products
  const sizeDetails = {
    'S': { chest: '36 in', length: '27 in' },
    'M': { chest: '38 in', length: '28 in' },
    'L': { chest: '40 in', length: '29 in' },
    'XL': { chest: '42 in', length: '30 in' },
    'XXL': { chest: '42 in', length: '31 in' }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading product...</p>
        </div>
      </div>
    )
  }

  // These can only be called after product is loaded
  const isInCartItem = isInCart(product.id)
  const cartQuantity = getCartItemQuantity(product.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-4">
          <span className="hover:text-purple-500 cursor-pointer">Home</span> / 
          <span className="hover:text-purple-500 cursor-pointer"> Men</span> / 
          <span className="hover:text-purple-500 cursor-pointer"> Men Western Top Wear</span> / 
          <span className="hover:text-purple-500 cursor-pointer"> Tshirts</span> / 
          <span className="text-gray-800">Men Tshirt | Men...</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                s-{product.id.toString().padStart(9, '0')}
              </div>
              <div className="absolute top-2 right-2 bg-white bg-opacity-90 text-xs px-2 py-1 rounded">
                +{productImages.length - 1} More
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Product view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            {/* Product Title */}
            <div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">
                Men Tshirt|Men Printed Round neck Tshirt|Men Graphic print Tshirt|Men Oversize Tshirt
              </h1>
              <p className="text-sm text-gray-600">Country of Origin: India</p>
              <button className="text-sm text-purple-500 hover:text-purple-600 mt-1">
                More Information
              </button>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-2xl font-bold text-gray-800">₹223</span>
              <span className="text-lg text-gray-500 line-through">₹234</span>
              <span className="text-sm text-green-600 font-semibold">5% off</span>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                  <span className="font-bold text-sm">3.9</span>
                  <FaStar className="w-3 h-3" />
                </div>
                <span className="text-sm text-gray-600">
                  25 Ratings, 15 Reviews
                </span>
              </div>
              <span className="text-sm text-gray-600">Free Delivery</span>
            </div>

            {/* Size Selection */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-semibold">Select Size</h3>
              </div>

              {/* Size Recommendation Popup */}
              {showSizeRecommendation && (
                <div className="size-recommendation-popup absolute top-full right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <img 
                        src="/assets/svg/meeshoLogo.svg" 
                        alt="Meesho" 
                        className="w-5 h-5"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'block';
                        }}
                      />
                      <span className="text-white text-xs font-bold hidden">M</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800 mb-1">Size Recommendation</h4>
                      <p className="text-sm text-gray-600">
                        Based on your size, for this product <span className="font-semibold text-purple-600">XL size</span> will be the best fit.
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedSize('XL')
                            setShowSizeRecommendation(false)
                          }}
                          className="px-3 py-1 text-xs font-medium text-white rounded hover:opacity-90 transition-colors"
                          style={{
                            backgroundColor: 'rgb(159, 32, 137)',
                            fontSize: '12px'
                          }}
                        >
                          Select XL
                        </button>
                        <button
                          onClick={() => setShowSizeRecommendation(false)}
                          className="px-3 py-1 text-xs font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 mb-3 items-center">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm ${
                      selectedSize === size
                        ? 'text-white'
                        : 'border-gray-300 hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: selectedSize === size ? 'rgb(159, 32, 137)' : 'transparent',
                      borderColor: selectedSize === size ? 'rgb(159, 32, 137)' : 'rgb(209, 213, 219)',
                      fontSize: '15px',
                      lineHeight: '20px',
                      letterSpacing: '0.0015em',
                      fontWeight: '500'
                    }}
                  >
                    {size}
                  </button>
                ))}
                
                {/* Find my Fit button next to size options */}
                <button
                  onClick={() => setShowSizeRecommendation(!showSizeRecommendation)}
                  className="find-my-fit-btn relative flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 group overflow-hidden ml-2"
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                >
                  <img 
                    src="/assets/svg/meeshoLogo.svg" 
                    alt="Meesho" 
                    className="w-3 h-3 filter brightness-0 invert"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'block';
                    }}
                  />
                  <span className="text-xs font-medium hidden">M</span>
                  <span className="text-xs font-semibold" style={{ color: 'white' }}>Find my Fit</span>
                  
                  {/* Hover effect */}
                  <div 
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                    style={{
                      backgroundColor: 'white'
                    }}
                  ></div>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              {!isInCartItem ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-transparent border-2 text-white py-3 px-4 rounded font-semibold hover:opacity-90 transition-colors flex items-center justify-center space-x-2"
                  style={{
                    borderColor: 'rgb(159, 32, 137)',
                    color: 'rgb(159, 32, 137)',
                    fontSize: '15px',
                    lineHeight: '20px',
                    letterSpacing: '0.0015em',
                    borderRadius: '4px',
                    padding: '12px',
                    fontWeight: '500'
                  }}
                >
                  <FaShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
              ) : (
                <div className="flex-1 flex items-center text-white rounded" style={{ backgroundColor: 'rgb(159, 32, 137)' }}>
                  <button
                    onClick={() => handleQuantityChange(cartQuantity - 1)}
                    className="p-3 hover:opacity-90 transition-colors rounded-l"
                    style={{ backgroundColor: 'rgb(159, 32, 137)' }}
                  >
                    <FaMinus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-3 font-semibold" style={{ fontSize: '15px', lineHeight: '20px' }}>{cartQuantity}</span>
                  <button
                    onClick={() => handleQuantityChange(cartQuantity + 1)}
                    className="p-3 hover:opacity-90 transition-colors rounded-r"
                    style={{ backgroundColor: 'rgb(159, 32, 137)' }}
                  >
                    <FaPlus className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              <button
                onClick={handleBuyNow}
                className="flex-1 text-white py-3 px-4 rounded font-semibold hover:opacity-90 transition-colors flex items-center justify-center space-x-2"
                style={{
                  backgroundColor: 'rgb(159, 32, 137)',
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '0.0015em',
                  borderRadius: '4px',
                  padding: '12px',
                  fontWeight: '500'
                }}
              >
                <span>Buy Now</span>
                <FaChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Product Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Product Details</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-medium">Name:</span> Men Tshirt|Men Printed Round neck Tshirt|Men Graphic print Tshirt|Men Oversize Tshirt</div>
                <div><span className="font-medium">Fabric:</span> Cotton Blend</div>
                <div><span className="font-medium">Sleeve Length:</span> Long Sleeves</div>
                <div><span className="font-medium">Pattern:</span> Printed</div>
                <div><span className="font-medium">Net Quantity (N):</span> 1</div>
                <div><span className="font-medium">Sizes:</span> S (Chest Size: 36 in, Length Size: 27 in), M (Chest Size: 38 in, Length Size: 28 in), L (Chest Size: 40 in, Length Size: 29 in), XL (Chest Size: 42 in, Length Size: 30 in), XXL (Chest Size: 42 in, Length Size: 31 in)</div>
                <div><span className="font-medium">Description:</span> Men Graphic Print Round neck Tshirt for Casual Wear, Break rules printed tshirt, oversize men tshirt party wear</div>
                <div><span className="font-medium">Country of Origin:</span> India</div>
              <button
                  className="text-sm mt-2 hover:opacity-90 transition-colors"
                  style={{
                    color: 'rgb(159, 32, 137)',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  More Information
              </button>
              </div>
            </div>

            {/* Seller Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-3">Sold By</h4>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs">🏪</span>
                  </div>
                  <div>
                    <div className="font-medium">{seller.name}</div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{seller.rating} ⭐</span>
                      <span>{seller.ratings} Ratings</span>
                      <span>{seller.followers} Followers</span>
                      <span>{seller.products} Products</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="px-4 py-2 border-2 rounded hover:opacity-90 transition-colors"
                  style={{
                    borderColor: 'rgb(159, 32, 137)',
                    color: 'rgb(159, 32, 137)',
                    fontSize: '15px',
                    lineHeight: '20px',
                    letterSpacing: '0.0015em',
                    borderRadius: '4px',
                    padding: '12px',
                    fontWeight: '500'
                  }}
                >
                  View Shop
                </button>
              </div>
            </div>

            {/* Frequently Bought Together */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold text-black mb-4">Frequently bought together</h4>
              
              <div className="flex items-center justify-center space-x-3 mb-6">
                {/* Current Product */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img 
                      src={product?.image || '/assets/products/p21.avif'} 
                      alt={product?.title || 'Current Product'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600 text-center max-w-20 truncate">{product?.title || 'Current Product'}</span>
                  <span className="text-sm font-semibold">₹{product?.price || 223}</span>
                </div>

                {/* Plus Sign */}
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">+</span>
                </div>

                {/* Product 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img 
                      src="/assets/products/p23.avif" 
                      alt="Men's T-Shirt"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600 text-center max-w-20 truncate">Men&apos;s T-Shirt</span>
                  <span className="text-sm font-semibold">₹299</span>
                </div>

                {/* Plus Sign */}
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-black">+</span>
                </div>

                {/* Product 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden mb-2">
                    <img 
                      src="/assets/products/p24.avif" 
                      alt="Men's Jeans"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs text-gray-600 text-center max-w-20 truncate">Men&apos;s Jeans</span>
                  <span className="text-sm font-semibold">₹599</span>
                </div>
              </div>

              {/* Special Offer */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-green-600 text-sm font-semibold">🎉</span>
                  <span className="text-green-700 text-sm font-medium">Buy 2 or more to get extra 10% off</span>
                </div>
              </div>

              {/* Buy All Button */}
              <button 
                className="w-full py-3 px-4 rounded hover:opacity-90 transition-colors"
                style={{
                  backgroundColor: 'rgb(159, 32, 137)',
                  fontSize: '15px',
                  lineHeight: '20px',
                  letterSpacing: '0.0015em',
                  borderRadius: '4px',
                  padding: '12px',
                  fontWeight: '500'
                }}
              >
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-lg font-bold text-white">Buy all 3: ₹{((product?.price || 223) + 299 + 599)}</span>
                  <FaChevronRight className="w-4 h-4 text-white" />
                </div>
                </button>
              </div>

          </div>
        </div>

        {/* Customers Say Section */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-black mb-4">Customers say</h3>
          
          {/* AI Generated Summary */}
          <div className="mb-4">
            <p className="text-gray-700 text-base leading-relaxed mb-3">
              Customers generally find the polo shirt to be a &quot;premium product with mercerized cotton fabric that feels soft and smooth.&quot; They appreciate its &quot;good fit, comfortable feel, and premium appearance,&quot; with one customer specifically mentioning it &quot;pairs well with trousers or jeans.&quot; <span className="font-semibold">Color quality</span> receives &quot;mixed feedback&quot;: some say the color doesn&apos;t fade, while others report it fades after one wash. <span className="font-semibold">Value for money</span> opinions are &quot;divided&quot;: some consider it a great value, while others find it overpriced.
            </p>
            
            {/* AI Generation Indicator */}
            <div className="flex items-center mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-white text-xs font-bold flex items-center justify-center mr-2">
                ai
              </div>
              <span className="text-sm text-gray-500">Generated from the text of customer reviews</span>
            </div>
            
            <p className="text-black font-semibold text-base mb-4">Select to learn more</p>
          </div>

          {/* Interactive Feedback Categories */}
          <div className="space-y-3">
            {/* First Row */}
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Quality</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
                <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Fabric quality</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
            </div>
                <span className="text-sm font-medium text-gray-700">Fit</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Softness</span>
              </div>
            </div>

            {/* Second Row */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Look</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Comfort</span>
              </div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Value for money</span>
              </div>
            </div>

            {/* Third Row - Color */}
            <div className="flex items-center">
              <div className="w-5 h-5 border-2 border-gray-300 rounded-full flex items-center justify-center">
                <span className="text-gray-400 text-xs font-bold">✓</span>
              </div>
              <span className="text-sm font-medium ml-2" style={{ color: 'rgb(159, 32, 137)' }}>Color</span>
            </div>
          </div>
        </div>

        {/* Product Ratings & Reviews */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-bold mb-6">Product Ratings & Reviews</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">4.2</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} className="w-5 h-5 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600">25 Ratings, 5 Reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-2">
              {[
                { label: 'Excellent', count: 3, percentage: 60 },
                { label: 'Very Good', count: 1, percentage: 20 },
                { label: 'Good', count: 0, percentage: 0 },
                { label: 'Average', count: 0, percentage: 0 },
                { label: 'Poor', count: 1, percentage: 20 }
              ].map((rating) => (
                <div key={rating.label} className="flex items-center space-x-3">
                  <span className="w-16 text-sm text-gray-600">{rating.label}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        rating.label === 'Excellent' || rating.label === 'Very Good' ? 'bg-green-500' :
                        rating.label === 'Good' ? 'bg-orange-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${rating.percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm text-gray-600">{rating.count}</span>
                </div>
              ))}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-semibold text-blue-600">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{review.name}</div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center space-x-1">
                          <span className="text-xs font-bold">{review.rating}</span>
                          <FaStar className="w-2 h-2" />
                        </div>
                        <span className="text-xs text-gray-500">Posted on {review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{review.comment}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <FaThumbsUp className="w-3 h-3" />
                    <span>Helpful ({review.helpful})</span>
                  </div>
                </div>
              ))}
              <button 
                className="text-sm font-medium hover:opacity-90 transition-colors"
                style={{
                  color: 'rgb(159, 32, 137)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                VIEW ALL REVIEWS &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Empty for now */}
          <div className="hidden lg:block">
            {/* This space can be used for additional content in the future */}
          </div>

          {/* Right Column - Questions and Answers */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">Questions and Answers</h3>
              <FaSearch className="w-5 h-5 text-gray-500" />
            </div>

            {/* Ask Question Section */}
            <div className="mb-6">
              {!showAskQuestion ? (
                <button
                  onClick={() => setShowAskQuestion(true)}
                  className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-colors"
                >
                  Ask a question about this product
                </button>
              ) : (
                <div className="space-y-3">
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Ask your question here..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAskQuestion}
                      disabled={!newQuestion.trim()}
                      className="px-4 py-2 text-white rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        backgroundColor: 'rgb(159, 32, 137)',
                        fontSize: '14px'
                      }}
                    >
                      Submit Question
                    </button>
                    <button
                      onClick={() => {
                        setShowAskQuestion(false)
                        setNewQuestion('')
                      }}
                      className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {qaData.map((qa, index) => (
                <div key={qa.id} className={`${index !== qaData.length - 1 ? 'border-b border-gray-200 pb-4' : ''}`}>
                  <div className="mb-2">
                    <p className="font-semibold text-gray-800 text-sm mb-2">Q: {qa.question}</p>
                    <p className="text-gray-700 text-sm mb-3">A: {qa.answer}</p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{qa.responder}</span>
                      <div className="flex items-center space-x-1">
                        {qa.roleIcon === 'check' ? (
                          <FaCheck className="w-3 h-3 text-gray-500" />
                        ) : (
                          <FaUser className="w-3 h-3 text-gray-500" />
                        )}
                        <span className="text-xs text-gray-500">{qa.role}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleLikeAnswer(qa.id)}
                        className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${
                          likedAnswers.has(qa.id) ? 'text-purple-600' : 'text-gray-500'
                        }`}
                      >
                        <FaThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{qa.likes}</span>
                      </button>
                      <button
                        onClick={() => handleDislikeAnswer(qa.id)}
                        className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${
                          dislikedAnswers.has(qa.id) ? 'text-red-600' : 'text-gray-500'
                        }`}
                      >
                        <FaThumbsDown className="w-4 h-4" />
                        <span className="text-sm">{qa.dislikes}</span>
                      </button>
                      <FaEllipsisV className="w-4 h-4 text-gray-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <button 
                className="text-sm font-medium hover:opacity-90 transition-colors"
                style={{
                  color: 'rgb(159, 32, 137)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                All questions &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges - Full Width Beneath Q&A */}
        <div className="mt-8 flex justify-center space-x-8">
          <div className="flex items-center space-x-2 text-gray-600">
                <img 
                  src="/assets/icons/lowest-price.svg" 
                  alt="Lowest Price" 
                  className="w-8 h-8"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-green-500 rounded-full items-center justify-center hidden">
                  <span className="text-white text-xs font-bold">%</span>
                </div>
                <span className="text-sm font-medium">Lowest Price</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
                <img 
                  src="/assets/icons/cod.svg" 
                  alt="Cash on Delivery" 
                  className="w-8 h-8"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-green-500 rounded-full items-center justify-center hidden">
                  <span className="text-white text-xs font-bold">₹</span>
                </div>
                <span className="text-sm font-medium">Cash on Delivery</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
                <img 
                  src="/assets/icons/returns.svg" 
                  alt="7-day Returns" 
                  className="w-8 h-8"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex';
                  }}
                />
                <div className="w-8 h-8 bg-green-500 rounded-full items-center justify-center hidden">
                  <span className="text-white text-xs">↻</span>
                </div>
                <span className="text-sm font-medium">7-day Returns</span>
          </div>
        </div>

        {/* People Also Viewed - Full Width */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-6">People also viewed</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {similarProducts.map((similarProduct, index) => (
              <div
                key={similarProduct.id}
                className="product-card overflow-hidden group relative cursor-pointer"
                onClick={() => handleProductClick(similarProduct.id)}
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {/* Sale Badge */}
                  <div className="absolute top-2 left-2 sale-badge">
                    {similarProduct.badge}
                  </div>
                  
                  {/* Timer Badge (for some products) */}
                  {index % 3 === 1 && (
                    <div className="timer-badge">
                      00h: 07m: 50s
                    </div>
                  )}
                  
                  {/* Product Image */}
                  {similarProduct.image ? (
                  <img
                    src={similarProduct.image}
                    alt={similarProduct.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = 'none';
                        ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback Image */}
                  <div className="text-4xl text-gray-400 hidden">
                    {similarProduct.category === 'Fashion' ? '👕' : 
                     similarProduct.category === 'Electronics' ? '📱' :
                     similarProduct.category === 'Home & Kitchen' ? '🏠' : '🛍️'}
                  </div>
                  
                  {/* Product ID Overlay */}
                  <div className="product-image-overlay">
                    s-{similarProduct.id.toString().padStart(9, '0')}
                </div>
                  
                  {/* More Images Badge */}
                  <div className="more-images-badge">
                    +{Math.floor(Math.random() * 5) + 1} More
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h4 className="font-medium text-sm text-gray-800 mb-2 line-clamp-2">
                    {similarProduct.title}
                  </h4>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-800">
                      ₹{similarProduct.price}
                    </span>
                    {similarProduct.originalPrice > similarProduct.price && (
                      <>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{similarProduct.originalPrice}
                      </span>
                        <span className="discount-text">
                          {similarProduct.discount}% off
                        </span>
                      </>
                    )}
                  </div>

                  {/* Delivery */}
                  <p className="text-xs text-gray-600 mb-2">Free Delivery</p>
                  
                  {/* Rating */}
                  {similarProduct.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-green-500 text-white px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="text-sm font-bold">{similarProduct.rating.toFixed(1)}</span>
                        <FaStar className="w-3 h-3" />
                    </div>
                      <span className="text-sm text-gray-600">
                      {similarProduct.reviews} Reviews
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
                          (e.currentTarget as HTMLImageElement).style.display = 'none';
                          ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'inline-block';
                        }}
                      />
                      <div className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-xs font-medium hidden">
                        m Trusted
                </div>
              </div>
                  )}

                  {/* Cart Button/Counter with Size Selection */}
                  {!isProductInCartWithSize(similarProduct.id) ? (
                    <div className="absolute bottom-3 right-3">
                      {showSizeDropdown === similarProduct.id ? (
                        <div className="size-dropdown bg-white border border-gray-200 rounded-lg shadow-lg p-2 mb-2 min-w-[80px]">
                          <div className="text-xs font-medium text-gray-600 mb-1">Select Size</div>
                          {similarProductSizes.map(size => (
                            <button
                              key={size}
                              onClick={(e) => {
                                e.stopPropagation()
                                handleSizeSelect(similarProduct.id, size)
                              }}
                              className={`w-full text-xs py-1 px-2 rounded mb-1 hover:bg-gray-100 ${
                                selectedSizes[similarProduct.id] === size
                                  ? 'text-white'
                                  : 'text-gray-700'
                              }`}
                              style={{
                                backgroundColor: selectedSizes[similarProduct.id] === size ? 'rgb(159, 32, 137)' : 'transparent',
                                fontSize: '12px',
                                fontWeight: '500'
                              }}
                            >
                              {size}
                            </button>
                          ))}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleAddToCartWithSize(similarProduct)
                            }}
                            className="w-full text-xs py-1 px-2 rounded text-white hover:opacity-90"
                            style={{
                              backgroundColor: 'rgb(159, 32, 137)',
                              fontSize: '12px',
                              fontWeight: '500'
                            }}
                          >
                            Add
                          </button>
          </div>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowSizeDropdown(similarProduct.id)
                          }}
                          className="text-white p-2 rounded-full hover:opacity-90 transition-colors shadow-lg"
                          style={{
                            backgroundColor: 'rgb(159, 32, 137)',
                            fontSize: '15px',
                            lineHeight: '20px',
                            letterSpacing: '0.0015em',
                            fontWeight: '500'
                          }}
                          title="Add to Cart"
                        >
                          <FaShoppingCart className="w-4 h-4" />
                        </button>
                      )}
        </div>
                  ) : (
                    <div 
                      className="absolute bottom-3 right-3 flex items-center text-white rounded-full shadow-lg"
                      style={{ backgroundColor: 'rgb(159, 32, 137)' }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDecrementQuantityWithSize(similarProduct)
                        }}
                        className="p-2 hover:opacity-90 rounded-l-full transition-colors"
                        style={{ backgroundColor: 'rgb(159, 32, 137)' }}
                        title="Decrease Quantity"
                      >
                        <FaMinus className="w-3 h-3" />
                      </button>
                      <span 
                        className="px-3 py-2 text-sm font-semibold min-w-[2rem] text-center"
                        style={{ fontSize: '15px', lineHeight: '20px' }}
                      >
                        {getProductCartQuantityWithSize(similarProduct.id)}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleIncrementQuantityWithSize(similarProduct)
                        }}
                        className="p-2 hover:opacity-90 rounded-r-full transition-colors"
                        style={{ backgroundColor: 'rgb(159, 32, 137)' }}
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
          {isLoadingSimilar && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mr-2"></div>
              <span className="text-gray-600">Loading more products...</span>
            </div>
          )}

          {/* Manual Load More Button (for testing) */}
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreSimilarProducts}
              disabled={isLoadingSimilar}
              className="px-6 py-3 text-white rounded font-semibold hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: 'rgb(159, 32, 137)',
                fontSize: '15px',
                lineHeight: '20px',
                letterSpacing: '0.0015em',
                borderRadius: '4px',
                padding: '12px',
                fontWeight: '500'
              }}
            >
              {isLoadingSimilar ? 'Loading...' : 'Load More Products'}
            </button>
          </div>

          {/* Infinite Scroll Trigger */}
          <div ref={observerRef} className="h-8 mt-4"></div>
        </div>

      </main>

      <Footer />
    </div>
  )
}

export default function ProductDetailPage() {
  return (
    <CartProvider>
      <ProductDetailContent />
    </CartProvider>
  )
}
