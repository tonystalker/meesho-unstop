export interface Product {
  id: number
  title: string
  price: number
  originalPrice: number
  discount: number
  category: string
  badge: string
  image?: string
  description?: string
  rating?: number
  reviews?: number
}

export const products: Product[] = [
  {
    id: 1,
    title: "Men Cotton Blend Oversize Tshirts",
    price: 223,
    originalPrice: 234,
    discount: 5,
    category: "Fashion",
    badge: "SALE",
    image: "/assets/products/p21.avif",
    description: "Men Graphic Print Round neck Tshirt for Casual Wear, Break rules printed tshirt, oversize men tshirt party wear",
    rating: 3.9,
    reviews: 15
  },
  {
    id: 2,
    title: "CHHOTE NAWAB Men's Tshirts",
    price: 307,
    originalPrice: 307,
    discount: 0,
    category: "Fashion",
    badge: "NEW",
    image: "/assets/products/p2.avif",
    description: "Stylish men's t-shirts with unique designs",
    rating: 4.2,
    reviews: 89
  },
  {
    id: 3,
    title: "Deodorant & Fragrances",
    price: 249,
    originalPrice: 320,
    discount: 22,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p3.avif",
    description: "DENVER deodorant combo pack",
    rating: 4.1,
    reviews: 156
  },
  {
    id: 4,
    title: "Men Polyester REGULAR Tshirts",
    price: 207,
    originalPrice: 207,
    discount: 0,
    category: "Fashion",
    badge: "TRENDING",
    image: "/assets/products/p4.avif",
    description: "Comfortable polyester regular fit t-shirts",
    rating: 4.3,
    reviews: 203
  },
  {
    id: 5,
    title: "THE MAN COMPANY Privilege...",
    price: 199,
    originalPrice: 598,
    discount: 67,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p5.avif",
    description: "Privilege body spray for men",
    rating: 3.7,
    reviews: 490
  },
  {
    id: 6,
    title: "adivasi herbal Advanced Relief Herbal...",
    price: 94,
    originalPrice: 125,
    discount: 25,
    category: "Beauty",
    badge: "POPULAR",
    image: "/assets/products/p6.avif",
    description: "Advanced relief herbal hair oil",
    rating: 3.9,
    reviews: 55191
  },
  {
    id: 7,
    title: "Lux Venus Men's Raincoat Pack...",
    price: 1117,
    originalPrice: 1499,
    discount: 25,
    category: "Fashion",
    badge: "SALE",
    image: "/assets/products/p7.avif",
    description: "Stylish raincoat pack for men",
    rating: 4.1,
    reviews: 32
  },
  {
    id: 8,
    title: "Men Polyester REGULAR Tshirts",
    price: 226,
    originalPrice: 259,
    discount: 13,
    category: "Fashion",
    badge: "TRENDING",
    image: "/assets/products/p8.avif",
    description: "Emirates themed polyester t-shirts",
    rating: 4.1,
    reviews: 2504
  },
  {
    id: 9,
    title: "Latest Deodorant & Fragrances",
    price: 317,
    originalPrice: 400,
    discount: 21,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p9.avif",
    description: "DENVER deodorant 5 pack combo",
    rating: 3.9,
    reviews: 8582
  },
  {
    id: 10,
    title: "Tshirts",
    price: 337,
    originalPrice: 354,
    discount: 5,
    category: "Fashion",
    badge: "NEW",
    image: "/assets/products/p10.avif",
    description: "bwin branded polo t-shirts",
    rating: 4.5,
    reviews: 1404
  },
  {
    id: 11,
    title: "THE MAN COMPANY Privilege...",
    price: 288,
    originalPrice: 897,
    discount: 68,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p11.avif",
    description: "Privilege body spray 3 pack combo",
    rating: 3.8,
    reviews: 72
  },
  {
    id: 12,
    title: "Men Cotton Blend Regular Tshirts",
    price: 198,
    originalPrice: 223,
    discount: 11,
    category: "Fashion",
    badge: "SALE",
    image: "/assets/products/p12.avif",
    description: "Cotton blend regular fit t-shirts",
    rating: 4.1,
    reviews: 1883
  },
  {
    id: 13,
    title: "Men Cotton Blend Oversize Tshirts",
    price: 234,
    originalPrice: 234,
    discount: 0,
    category: "Fashion",
    badge: "NEW",
    image: "/assets/products/p13.avif",
    description: "Break rules themed oversized t-shirts",
    rating: 4.0,
    reviews: 14
  },
  {
    id: 14,
    title: "Forever Paris, Forever Black, For...",
    price: 228,
    originalPrice: 320,
    discount: 29,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p14.avif",
    description: "OSCAR FOREVER deodorant combo",
    rating: 4.0,
    reviews: 1033
  },
  {
    id: 15,
    title: "DENVER Hamilton Deodorant ...",
    price: 288,
    originalPrice: 460,
    discount: 37,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p15.avif",
    description: "DENVER Hamilton deodorant pack",
    rating: 4.2,
    reviews: 23540
  },
  {
    id: 16,
    title: "Men Cotton Oversize Tshirts",
    price: 183,
    originalPrice: 247,
    discount: 26,
    category: "Fashion",
    badge: "SALE",
    image: "/assets/products/p16.avif",
    description: "Happiness themed oversized t-shirts",
    rating: 4.0,
    reviews: 43
  },
  {
    id: 17,
    title: "Chitrarekha Attractive Kurtis",
    price: 211,
    originalPrice: 226,
    discount: 7,
    category: "Fashion",
    badge: "TRENDING",
    image: "/assets/products/p17.avif",
    description: "Attractive kurtis for women",
    rating: 4.0,
    reviews: 103770
  },
  {
    id: 18,
    title: "Men Polyester Regular Tshirts",
    price: 306,
    originalPrice: 368,
    discount: 17,
    category: "Fashion",
    badge: "TRUSTED",
    image: "/assets/products/p18.avif",
    description: "Multi-color polyester t-shirts",
    rating: 4.0,
    reviews: 211
  },
  {
    id: 19,
    title: "DENVER Classic Deodorant & ...",
    price: 99,
    originalPrice: 160,
    discount: 38,
    category: "Beauty",
    badge: "MALL",
    image: "/assets/products/p19.avif",
    description: "DENVER classic deodorant pack",
    rating: 3.8,
    reviews: 72713
  },
  {
    id: 20,
    title: "Aakarsha Attractive Sarees",
    price: 340,
    originalPrice: 376,
    discount: 10,
    category: "Fashion",
    badge: "POPULAR",
    image: "/assets/products/p20.avif",
    description: "Beautiful sarees with traditional designs",
    rating: 3.9,
    reviews: 5012
  }
]

export const categories = [
  { name: "Fashion", icon: "FaTshirt", color: "from-pink-500 to-rose-500" },
  { name: "Electronics", icon: "FaMobileAlt", color: "from-blue-500 to-cyan-500" },
  { name: "Home & Kitchen", icon: "FaHome", color: "from-green-500 to-emerald-500" },
  { name: "Toys & Games", icon: "FaGamepad", color: "from-purple-500 to-violet-500" },
  { name: "Beauty", icon: "FaHeart", color: "from-red-500 to-pink-500" },
  { name: "Books", icon: "FaBook", color: "from-yellow-500 to-orange-500" },
  { name: "Sports", icon: "FaDumbbell", color: "from-indigo-500 to-blue-500" },
  { name: "Baby Care", icon: "FaBaby", color: "from-teal-500 to-green-500" }
]

export const deals = [
  {
    id: 1,
    title: "Fashion Sale",
    description: "Up to 50% off on all fashion items",
    discount: "50% OFF",
    category: "Fashion",
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 2,
    title: "Electronics",
    description: "Great deals on smartphones & gadgets",
    discount: "30% OFF",
    category: "Electronics",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    title: "Home & Kitchen",
    description: "Transform your home with our deals",
    discount: "40% OFF",
    category: "Home & Kitchen",
    color: "from-green-500 to-emerald-500"
  }
]
