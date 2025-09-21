'use client'

import { FaTshirt, FaMobileAlt, FaHome, FaGamepad, FaHeart, FaBook, FaDumbbell, FaBaby } from 'react-icons/fa'

const categories = [
  { name: 'Fashion', icon: FaTshirt, color: 'from-pink-500 to-rose-500' },
  { name: 'Electronics', icon: FaMobileAlt, color: 'from-[#8B5CF6] to-purple-500' },
  { name: 'Home & Kitchen', icon: FaHome, color: 'from-green-500 to-emerald-500' },
  { name: 'Toys & Games', icon: FaGamepad, color: 'from-purple-500 to-violet-500' },
  { name: 'Beauty', icon: FaHeart, color: 'from-red-500 to-pink-500' },
  { name: 'Books', icon: FaBook, color: 'from-yellow-500 to-orange-500' },
  { name: 'Sports', icon: FaDumbbell, color: 'from-[#8B5CF6] to-purple-500' },
  { name: 'Baby Care', icon: FaBaby, color: 'from-teal-500 to-green-500' },
]

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Shop by Category
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.name}
                className="group cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="card p-6 text-center hover:scale-105 transition-all duration-300">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-primary-600 transition-colors">
                    {category.name}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

