'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Product } from '@/data/products'

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  incognitoItems: CartItem[]
  incognitoTotalItems: number
  incognitoTotalPrice: number
  isIncognitoMode: boolean
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product & { selectedSize?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_INCOGNITO_MODE' }
  | { type: 'ADD_TO_INCOGNITO_CART'; payload: Product & { selectedSize?: string } }
  | { type: 'REMOVE_FROM_INCOGNITO_CART'; payload: number }
  | { type: 'UPDATE_INCOGNITO_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_INCOGNITO_CART' }

interface CartContextType {
  state: CartState
  addToCart: (product: Product & { selectedSize?: string }) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: number) => boolean
  getCartItemQuantity: (productId: number) => number
  toggleIncognitoMode: () => void
  addToIncognitoCart: (product: Product & { selectedSize?: string }) => void
  removeFromIncognitoCart: (productId: number) => void
  updateIncognitoQuantity: (productId: number, quantity: number) => void
  clearIncognitoCart: () => void
  isInIncognitoCart: (productId: number) => boolean
  getIncognitoCartItemQuantity: (productId: number) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { selectedSize, ...product } = action.payload
      const existingItem = state.items.find(item => 
        item.id === product.id && item.selectedSize === selectedSize
      )
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price
        }
      } else {
        const newItem = { ...product, quantity: 1, selectedSize }
        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price
        }
      }
    }
    
    case 'REMOVE_FROM_CART': {
      const itemToRemove = state.items.find(item => item.id === action.payload)
      if (!itemToRemove) return state
      
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalPrice: state.totalPrice - (itemToRemove.price * itemToRemove.quantity)
      }
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      const item = state.items.find(item => item.id === id)
      if (!item) return state
      
      const quantityDiff = quantity - item.quantity
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
      
      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalPrice: state.totalPrice + (quantityDiff * item.price)
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalPrice: 0
      }

    case 'TOGGLE_INCOGNITO_MODE':
      return {
        ...state,
        isIncognitoMode: !state.isIncognitoMode
      }

    case 'ADD_TO_INCOGNITO_CART': {
      const { selectedSize, ...product } = action.payload
      const existingItem = state.incognitoItems.find(item => 
        item.id === product.id && item.selectedSize === selectedSize
      )
      
      if (existingItem) {
        const updatedItems = state.incognitoItems.map(item =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return {
          ...state,
          incognitoItems: updatedItems,
          incognitoTotalItems: state.incognitoTotalItems + 1,
          incognitoTotalPrice: state.incognitoTotalPrice + product.price
        }
      } else {
        const newItem = { ...product, quantity: 1, selectedSize }
        return {
          ...state,
          incognitoItems: [...state.incognitoItems, newItem],
          incognitoTotalItems: state.incognitoTotalItems + 1,
          incognitoTotalPrice: state.incognitoTotalPrice + product.price
        }
      }
    }
    
    case 'REMOVE_FROM_INCOGNITO_CART': {
      const itemToRemove = state.incognitoItems.find(item => item.id === action.payload)
      if (!itemToRemove) return state
      
      const updatedItems = state.incognitoItems.filter(item => item.id !== action.payload)
      return {
        ...state,
        incognitoItems: updatedItems,
        incognitoTotalItems: state.incognitoTotalItems - itemToRemove.quantity,
        incognitoTotalPrice: state.incognitoTotalPrice - (itemToRemove.price * itemToRemove.quantity)
      }
    }
    
    case 'UPDATE_INCOGNITO_QUANTITY': {
      const { id, quantity } = action.payload
      const item = state.incognitoItems.find(item => item.id === id)
      if (!item) return state
      
      const quantityDiff = quantity - item.quantity
      const updatedItems = state.incognitoItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
      
      return {
        ...state,
        incognitoItems: updatedItems,
        incognitoTotalItems: state.incognitoTotalItems + quantityDiff,
        incognitoTotalPrice: state.incognitoTotalPrice + (quantityDiff * item.price)
      }
    }
    
    case 'CLEAR_INCOGNITO_CART':
      return {
        ...state,
        incognitoItems: [],
        incognitoTotalItems: 0,
        incognitoTotalPrice: 0
      }
    
    default:
      return state
  }
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  incognitoItems: [],
  incognitoTotalItems: 0,
  incognitoTotalPrice: 0,
  isIncognitoMode: false
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product: Product & { selectedSize?: string }) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } })
    }
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const isInCart = (productId: number) => {
    return state.items.some(item => item.id === productId)
  }

  const getCartItemQuantity = (productId: number) => {
    const item = state.items.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const toggleIncognitoMode = () => {
    dispatch({ type: 'TOGGLE_INCOGNITO_MODE' })
  }

  const addToIncognitoCart = (product: Product & { selectedSize?: string }) => {
    dispatch({ type: 'ADD_TO_INCOGNITO_CART', payload: product })
  }

  const removeFromIncognitoCart = (productId: number) => {
    dispatch({ type: 'REMOVE_FROM_INCOGNITO_CART', payload: productId })
  }

  const updateIncognitoQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromIncognitoCart(productId)
    } else {
      dispatch({ type: 'UPDATE_INCOGNITO_QUANTITY', payload: { id: productId, quantity } })
    }
  }

  const clearIncognitoCart = () => {
    dispatch({ type: 'CLEAR_INCOGNITO_CART' })
  }

  const isInIncognitoCart = (productId: number) => {
    return state.incognitoItems.some(item => item.id === productId)
  }

  const getIncognitoCartItemQuantity = (productId: number) => {
    const item = state.incognitoItems.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItemQuantity,
    toggleIncognitoMode,
    addToIncognitoCart,
    removeFromIncognitoCart,
    updateIncognitoQuantity,
    clearIncognitoCart,
    isInIncognitoCart,
    getIncognitoCartItemQuantity
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

