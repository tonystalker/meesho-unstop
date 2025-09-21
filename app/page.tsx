'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Navigation from '@/components/Navigation'
import HeroBanner from '@/components/HeroBanner'
import ProductsSection from '@/components/ProductsSection'
import PeopleAlsoViewed from '@/components/PeopleAlsoViewed'
import Footer from '@/components/Footer'
import Notification from '@/components/Notification'
import { CartProvider, useCart } from '@/context/CartContext'
import { products } from '@/data/products'

function HomeContent() {
  const [notifications, setNotifications] = useState<Array<{id: string, message: string}>>([])
  const { state } = useCart()

  const showNotification = (message: string) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { id, message }])
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(notif => notif.id !== id))
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <main>
        <HeroBanner />
        <ProductsSection />
        <PeopleAlsoViewed products={products} />
      </main>
      <Footer />
      
      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map(notification => (
          <Notification
            key={notification.id}
            message={notification.message}
            onClose={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          />
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <HomeContent />
    </CartProvider>
  )
}
