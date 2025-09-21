'use client'

import { useState } from 'react'

const categories = [
  'Women Ethnic',
  'Women Western', 
  'Men',
  'Kids',
  'Home & Kitchen',
  'Beauty & Health',
  'Jewellery & Accessories',
  'Bags & Footwear',
  'Electronics',
  'Sports & Fitness',
  'Car & Motorbike',
  'Office'
]

export default function Navigation() {
  const [activeCategory, setActiveCategory] = useState('Women Ethnic')

  return (
    <nav className="bg-white sticky top-16 z-40">
      <div className="w-full px-6 py-3">
        <div className="flex justify-center">
          <div className="flex gap-8 overflow-x-auto scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap py-1 ${
                  activeCategory === category
                    ? 'text-[#8B5CF6]'
                    : 'text-gray-700 hover:text-[#8B5CF6]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
