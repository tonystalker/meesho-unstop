# Meesho Clone - Next.js E-commerce App

A modern, responsive e-commerce application built with Next.js 14, TypeScript, and Tailwind CSS, inspired by Meesho's design and functionality.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Product Catalog**: Browse and search through various product categories
- **Shopping Cart**: Add/remove items with real-time cart updates
- **Category Filtering**: Filter products by category
- **Search Functionality**: Search products by name or category
- **Responsive Design**: Works perfectly on all device sizes
- **TypeScript**: Full type safety throughout the application
- **Context API**: State management for cart functionality
- **Tailwind CSS**: Utility-first CSS framework for styling

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **Animations**: Framer Motion
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd meesho-clone
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
meesho-clone/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Home page
├── components/
│   ├── Header.tsx           # Header with search and cart
│   ├── Navigation.tsx       # Category navigation
│   ├── HeroBanner.tsx       # Hero section
│   ├── CategoriesSection.tsx # Category grid
│   ├── ProductsSection.tsx  # Product listing and filtering
│   ├── DealsSection.tsx     # Special deals section
│   ├── Footer.tsx           # Footer with links
│   └── Notification.tsx     # Toast notifications
├── context/
│   └── CartContext.tsx      # Cart state management
├── data/
│   └── products.ts          # Sample product data
├── package.json
├── tailwind.config.js       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── next.config.js          # Next.js configuration
```

## 🎨 Key Components

### Header

- Logo and branding
- Search functionality
- User profile and cart icons
- Cart item counter

### Navigation

- Category-based navigation
- Active state management
- Responsive design

### Products Section

- Product grid with filtering
- Search functionality
- Add to cart functionality
- Product ratings and reviews

### Cart Context

- Global cart state management
- Add/remove/update cart items
- Cart total calculations

## 🎯 Features in Detail

### Shopping Cart

- Add products to cart
- Update quantities
- Remove items
- Real-time cart counter
- Persistent cart state

### Product Filtering

- Filter by category
- Search by product name
- Real-time filtering
- No results handling

### Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interactions
- Smooth animations

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 🎨 Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#ff6b6b', // Your primary color
    600: '#ee5a24', // Your secondary color
  }
}
```

### Products

Add or modify products in `data/products.ts`:

```typescript
export const products: Product[] = [
  {
    id: 1,
    title: "Your Product",
    price: 299,
    originalPrice: 599,
    discount: 50,
    category: "Fashion",
    badge: "New",
  },
];
```

## 📱 Mobile Features

- Touch-friendly interface
- Swipe gestures support
- Responsive navigation
- Optimized product grid

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by Meesho's design and functionality
- Built with modern web technologies
- Icons from React Icons
- Fonts from Google Fonts

---

**Happy Shopping! 🛍️**


