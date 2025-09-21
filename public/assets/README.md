# Assets Directory Structure

This directory contains all the visual assets for the Meesho clone website, organized by category for easy management.

## 📁 Directory Structure

```
public/assets/
├── banners/          # Banner images and promotional graphics
├── icons/           # Small icons and UI elements
├── logos/           # Brand logos and identity
├── products/        # Product images and photos
└── svg/            # SVG graphics and scalable icons
```

## 🎯 Usage Guidelines

### 📢 Banners (`/banners/`)

**Purpose**: Promotional banners, hero sections, and marketing graphics

**Recommended Files**:

- `mega-blockbuster-sale.png` - Main hero banner
- `80-off-banner.png` - Discount banner
- `fashion-sale-banner.png` - Category-specific banners
- `electronics-deal.png` - Product category banners

**Specifications**:

- **Format**: PNG, JPG, or WebP
- **Size**: 1200x400px (hero), 800x200px (section banners)
- **Optimization**: Compress for web use

### 🎨 Icons (`/icons/`)

**Purpose**: Small UI icons, feature icons, and interface elements

**Recommended Files**:

- `return-icon.png` - 7 Days Easy Return
- `cod-icon.png` - Cash on Delivery
- `price-icon.png` - Lowest Prices
- `search-icon.svg` - Search functionality
- `cart-icon.svg` - Shopping cart
- `user-icon.svg` - User profile

**Specifications**:

- **Format**: PNG (32x32px) or SVG
- **Size**: 16x16px to 64x64px
- **Style**: Consistent with brand guidelines

### 🏷️ Logos (`/logos/`)

**Purpose**: Brand logos and identity elements

**Recommended Files**:

- `meesho-logo.png` - Main brand logo
- `meesho-logo-white.png` - White version for dark backgrounds
- `meesho-logo-dark.png` - Dark version for light backgrounds
- `meesho-logo.svg` - Scalable vector version

**Specifications**:

- **Format**: PNG, SVG
- **Size**: 200x60px (header), 400x120px (footer)
- **Background**: Transparent preferred

### 🛍️ Products (`/products/`)

**Purpose**: Product images, category images, and merchandise photos

**Recommended Files**:

- `fashion-category.jpg` - Fashion category image
- `electronics-category.jpg` - Electronics category image
- `home-kitchen-category.jpg` - Home & Kitchen category image
- `beauty-category.jpg` - Beauty category image
- `sample-product-1.jpg` - Sample product images
- `sample-product-2.jpg` - Sample product images

**Specifications**:

- **Format**: JPG, PNG, WebP
- **Size**: 400x400px (product cards), 800x600px (category banners)
- **Quality**: High resolution, web-optimized

### 🎨 SVG (`/svg/`)

**Purpose**: Scalable vector graphics, icons, and illustrations

**Recommended Files**:

- `megaphone.svg` - Megaphone icon for banners
- `sparkle.svg` - Decorative sparkles
- `hexagon.svg` - Geometric shapes
- `shopping-bag.svg` - Shopping bag icon
- `star.svg` - Rating stars
- `heart.svg` - Wishlist/favorites

**Specifications**:

- **Format**: SVG only
- **Size**: Scalable (no fixed dimensions)
- **Optimization**: Minified for web use

## 🚀 Implementation

### Using Images in Components:

```jsx
// Banner image
<img src="/assets/banners/mega-blockbuster-sale.png" alt="Mega Sale" />

// Icon
<img src="/assets/icons/return-icon.png" alt="Return" className="w-8 h-8" />

// Logo
<img src="/assets/logos/meesho-logo.png" alt="Meesho" className="h-8" />

// Product image
<img src="/assets/products/fashion-category.jpg" alt="Fashion" />

// SVG
<img src="/assets/svg/megaphone.svg" alt="Megaphone" className="w-6 h-6" />
```

### Fallback System:

All components include fallback mechanisms:

- If image fails to load, CSS fallbacks are shown
- No errors occur if images are missing
- Graceful degradation ensures site functionality

## 📋 Asset Checklist

### Required for Full Functionality:

- [ ] `logos/meesho-logo.png` - Main logo
- [ ] `banners/80-off-banner.png` - Hero banner
- [ ] `icons/return-icon.png` - Return icon
- [ ] `icons/cod-icon.png` - COD icon
- [ ] `icons/price-icon.png` - Price icon

### Recommended for Enhanced Experience:

- [ ] `banners/mega-blockbuster-sale.png` - Main banner
- [ ] `products/fashion-category.jpg` - Category images
- [ ] `svg/megaphone.svg` - Decorative elements
- [ ] `svg/sparkle.svg` - Banner decorations

## 🔧 Optimization Tips

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Use WebP**: For better compression (with PNG fallbacks)
3. **SVG for Icons**: Scalable and lightweight
4. **Responsive Images**: Provide multiple sizes for different screens
5. **Lazy Loading**: Implement for better performance

## 📱 Responsive Considerations

- **Mobile**: Optimize for smaller screens
- **Tablet**: Medium-sized images
- **Desktop**: Full-resolution images
- **Retina**: Provide 2x versions for high-DPI displays

## 🎨 Brand Guidelines

- **Colors**: Use Meesho brand colors (#8B5CF6, #FF6B35, #DC2626)
- **Typography**: Maintain consistency with Inter font
- **Style**: Clean, modern, and professional
- **Tone**: Friendly, approachable, and trustworthy


