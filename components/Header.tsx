'use client'

import { useState, useRef, useEffect } from 'react'
import { FaSearch, FaEye, FaEyeSlash, FaPlus, FaMinus, FaTimes } from 'react-icons/fa'
import { FiUser, FiShoppingCart } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('')
  const [showCartDropdown, setShowCartDropdown] = useState(false)
  const cartDropdownRef = useRef<HTMLDivElement>(null)
  const { state, toggleIncognitoMode, updateQuantity, removeFromCart, updateIncognitoQuantity, removeFromIncognitoCart } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle search functionality
    console.log('Searching for:', searchQuery)
  }

  // Close cart dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Cart quantity management functions
  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (state.isIncognitoMode) {
      if (newQuantity <= 0) {
        removeFromIncognitoCart(productId)
      } else {
        updateIncognitoQuantity(productId, newQuantity)
      }
    } else {
      if (newQuantity <= 0) {
        removeFromCart(productId)
      } else {
        updateQuantity(productId, newQuantity)
      }
    }
  }

  // Get current cart items based on mode
  const currentCartItems = state.isIncognitoMode ? state.incognitoItems : state.items
  const currentTotalPrice = state.isIncognitoMode ? state.incognitoTotalPrice : state.totalPrice

  return (
    <header className="bg-white sticky top-0 z-50">
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/assets/svg/meeshoLogo.svg" 
              alt="Meesho" 
              className="h-7 w-auto"
              onError={(e) => {
                // Fallback to text if image doesn't exist
                e.currentTarget.style.display = 'none';
                const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                if (nextElement) {
                  nextElement.style.display = 'block';
                }
              }}
            />
            <h1 className="text-[#8B5CF6] font-bold text-lg hidden">meesho</h1>
          </div>

          {/* Search Bar - Centered */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                     <input
                       type="text"
                       placeholder="Try Saree, Kurti or Search by Product Code"
                       value={searchQuery}
                       onChange={(e) => setSearchQuery(e.target.value)}
                       className="w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-md text-gray-900 text-sm focus:outline-none focus:border-gray-300 bg-gray-50"
                     />
            </div>
          </form>

          {/* Header Actions - Right Side Group */}
          <div className="flex items-center gap-8">
            {/* Become a Supplier */}
            <div className="cursor-pointer hover:text-[#8B5CF6] transition-colors">
                   <span className="text-xs text-gray-700 font-medium">Become a Supplier</span>
            </div>

            {/* Vertical Divider */}
            <div className="w-px h-4 bg-gray-300"></div>

            {/* Investor Relations */}
            <div className="cursor-pointer hover:text-[#8B5CF6] transition-colors">
                   <span className="text-xs text-gray-700 font-medium">Investor Relations</span>
            </div>

            {/* Large Spacing before Profile */}
            <div className="w-8"></div>

            {/* Profile */}
            <div className="flex flex-col items-center cursor-pointer hover:text-[#8B5CF6] transition-colors">
                     <FiUser className="w-5 h-5 mb-1 text-gray-800" />
                     <span className="text-xs text-gray-800 font-medium">Profile</span>
            </div>

                   {/* Spacing between Profile and Cart */}
                   <div className="w-6"></div>

                   {/* Incognito Toggle */}
                   <div className="flex flex-col items-center cursor-pointer hover:text-[#8B5CF6] transition-colors">
                     <button
                       onClick={toggleIncognitoMode}
                       className={`p-2 rounded-full transition-colors ${
                         state.isIncognitoMode 
                           ? 'bg-gray-800 text-white' 
                           : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                       }`}
                       title={state.isIncognitoMode ? 'Exit Incognito Mode' : 'Enter Incognito Mode'}
                     >
                       {state.isIncognitoMode ? (
                         <FaEyeSlash className="w-4 h-4" />
                       ) : (
                         <FaEye className="w-4 h-4" />
                       )}
                     </button>
                     <span className="text-xs text-gray-800 font-medium mt-1">
                       {state.isIncognitoMode ? 'Incognito' : 'Normal'}
                     </span>
                   </div>

                   {/* Spacing between Incognito and Cart */}
                   <div className="w-6"></div>

                   {/* Cart */}
                   <div className="flex flex-col items-center cursor-pointer hover:text-[#8B5CF6] transition-colors relative" ref={cartDropdownRef}>
                     <button
                       onClick={() => setShowCartDropdown(!showCartDropdown)}
                       className="flex flex-col items-center"
                     >
                       <FiShoppingCart className="w-5 h-5 mb-1 text-gray-800" />
                       <span className="text-xs text-gray-800 font-medium">Cart</span>
                       {(state.isIncognitoMode ? state.incognitoTotalItems : state.totalItems) > 0 && (
                         <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-[10px]">
                           {state.isIncognitoMode ? state.incognitoTotalItems : state.totalItems}
                         </span>
                       )}
                     </button>

                     {/* Cart Dropdown */}
                     {showCartDropdown && (
                       <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                         <div className="p-4">
                           {/* Header */}
                           <div className="flex items-center justify-between mb-4">
                             <h3 className="text-lg font-semibold text-gray-800">
                               {state.isIncognitoMode ? 'Incognito Cart' : 'Shopping Cart'}
                             </h3>
                             <button
                               onClick={() => setShowCartDropdown(false)}
                               className="text-gray-400 hover:text-gray-600"
                             >
                               <FaTimes className="w-4 h-4" />
                             </button>
                           </div>

                           {/* Cart Items */}
                           {currentCartItems.length === 0 ? (
                             <div className="text-center py-8">
                               <FiShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                               <p className="text-gray-500">Your cart is empty</p>
                             </div>
                           ) : (
                             <div className="space-y-3 max-h-64 overflow-y-auto">
                               {currentCartItems.map((item) => (
                                 <div key={`${item.id}-${item.selectedSize || 'default'}`} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded">
                                   {/* Product Image */}
                                   <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                     <img
                                       src={item.image}
                                       alt={item.title}
                                       className="w-full h-full object-cover"
                                       onError={(e) => {
                                         (e.currentTarget as HTMLImageElement).style.display = 'none';
                                         ((e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement).style.display = 'flex';
                                       }}
                                     />
                                     <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-xs hidden">
                                       No Image
                                     </div>
                                   </div>

                                   {/* Product Details */}
                                   <div className="flex-1 min-w-0">
                                     <h4 className="text-sm font-medium text-gray-800 truncate">{item.title}</h4>
                                     {item.selectedSize && (
                                       <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                                     )}
                                     <p className="text-sm font-semibold text-gray-900">₹{item.price}</p>
                                   </div>

                                   {/* Quantity Controls */}
                                   <div className="flex items-center space-x-2">
                                     <button
                                       onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                       className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                                     >
                                       <FaMinus className="w-3 h-3 text-gray-600" />
                                     </button>
                                     <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                                     <button
                                       onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                       className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                                     >
                                       <FaPlus className="w-3 h-3 text-gray-600" />
                                     </button>
                                   </div>
                                 </div>
                               ))}
                             </div>
                           )}

                           {/* Footer */}
                           {currentCartItems.length > 0 && (
                             <div className="mt-4 pt-4 border-t border-gray-200">
                               <div className="flex items-center justify-between mb-3">
                                 <span className="text-lg font-semibold text-gray-800">Total:</span>
                                 <span className="text-lg font-bold text-gray-900">₹{currentTotalPrice}</span>
                               </div>
                               <button
                                 className="w-full py-2 px-4 text-white rounded-lg font-medium hover:opacity-90 transition-colors"
                                 style={{
                                   backgroundColor: 'rgb(159, 32, 137)',
                                   fontSize: '14px'
                                 }}
                               >
                                 Proceed to Checkout
                               </button>
                             </div>
                           )}
                         </div>
                       </div>
                     )}
                   </div>
          </div>
        </div>
      </div>
    </header>
  )
}
