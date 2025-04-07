export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  galleryImages: string[]  // Array of additional product images
  category: string
  sizes: string[]
  colors: string[]
  stock: number
  badge?: string
  rating: number
  reviewCount: number
  material?: string
  isOnSale?: boolean
  salePrice?: number
}

export const products: Product[] = [
  {
    id: 1,
    name: "Filipiniana Modern Dress",
    description: "Elegant modern take on traditional Filipiniana dress with butterfly sleeves. Made with premium piña fabric.",
    price: 4999.99,
    image: "/products/Filipiniana Modern Dress.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Cream", "Pearl"],
    stock: 50,
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 24,
    material: "Piña",
    isOnSale: false
  },
  {
    id: 2,
    name: "Barong Tagalog Slim Fit",
    description: "Contemporary slim-fit Barong Tagalog with intricate embroidery. Perfect for modern formal occasions.",
    price: 3999.99,
    image: "/products/Barong Tagalog Slim Fit.jpg",
    galleryImages: [],
    category: "Traditional",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Ecru"],
    stock: 75,
    rating: 4.6,
    reviewCount: 42,
    material: "Jusi"
  },
  {
    id: 3,
    name: "Malong Inspired Skirt",
    description: "Modern skirt inspired by traditional Malong patterns. Features adjustable waist and side pockets.",
    price: 1999.99,
    image: "/products/Malong Inspired Skirt.jpg",
    galleryImages: [],
    category: "Skirts",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Red", "Green"],
    stock: 30,
    badge: "Bestseller",
    rating: 4.7,
    reviewCount: 18,
    material: "Cotton Blend",
    isOnSale: true,
    salePrice: 1599.99
  },
  {
    id: 4,
    name: "Handwoven Inabel Blazer",
    description: "Contemporary blazer made from traditional Inabel fabric. Each piece is uniquely handwoven.",
    price: 5999.99,
    image: "/products/Handwoven Inabel Blazer.jpg",
    galleryImages: [],
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Natural", "Indigo"],
    stock: 25,
    badge: "Limited Edition",
    rating: 4.9,
    reviewCount: 15,
    material: "Inabel"
  },
  {
    id: 5,
    name: "T'nalak Pattern Tote",
    description: "Modern tote bag featuring T'nalak-inspired patterns. Spacious interior with laptop sleeve.",
    price: 2499.99,
    image: "/products/T'nalak Pattern Tote.jpg",
    galleryImages: [],
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Multi"],
    stock: 100,
    rating: 4.5,
    reviewCount: 56,
    material: "Canvas with T'nalak"
  },
  {
    id: 6,
    name: "Piña Silk Evening Gown",
    description: "Luxurious evening gown combining piña and silk fabrics. Perfect for formal events.",
    price: 8999.99,
    image: "/products/Piña Silk Evening Gown.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Gold", "Rose Gold"],
    stock: 15,
    badge: "Luxury",
    rating: 5.0,
    reviewCount: 8,
    material: "Piña Silk"
  },
  {
    id: 7,
    name: "Abaca Woven Sandals",
    description: "Handcrafted sandals made with abaca fibers. Features comfortable memory foam insole.",
    price: 1499.99,
    image: "/products/Abaca Woven Sandals.jpg",
    galleryImages: [],
    category: "Shoes",
    sizes: ["36", "37", "38", "39", "40"],
    colors: ["Natural", "Black"],
    stock: 45,
    rating: 4.3,
    reviewCount: 32,
    material: "Abaca",
    isOnSale: true,
    salePrice: 1199.99
  },
  {
    id: 8,
    name: "Mindanao Weave Clutch",
    description: "Elegant clutch featuring traditional Mindanao weaving patterns. Includes detachable chain strap.",
    price: 1999.99,
    image: "/products/Mindanao Weave Clutch.jpg",
    galleryImages: [],
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Multi"],
    stock: 60,
    badge: "Handcrafted",
    rating: 4.7,
    reviewCount: 27,
    material: "Mindanao Weave"
  },
  {
    id: 9,
    name: "Modern Terno Top",
    description: "Contemporary take on the traditional Filipino terno top. Features removable butterfly sleeves.",
    price: 3499.99,
    image: "/products/Modern Terno Top.jpg",
    galleryImages: [],
    category: "Tops",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Blush", "Mint"],
    stock: 40,
    badge: "New Arrival",
    rating: 4.6,
    reviewCount: 12,
    material: "Silk Blend"
  },
  {
    id: 10,
    name: "lon Wrap DresHabs",
    description: "Versatile wrap dress made from Ilonggo Hablon fabric. Can be styled multiple ways.",
    price: 4499.99,
    image: "/products/lon Wrap DresHabs.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["S", "M", "L"],
    colors: ["Blue", "Maroon", "Forest Green"],
    stock: 35,
    rating: 4.8,
    reviewCount: 21,
    material: "Hablon",
    isOnSale: true,
    salePrice: 3599.99
  },
  {
    id: 11,
    name: "Pearl Drop Earrings",
    description: "Elegant South Sea pearl drop earrings with 18k gold settings. Perfect for special occasions.",
    price: 2999.99,
    image: "/products/Pearl Drop Earrings.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Gold", "Rose Gold"],
    stock: 25,
    badge: "New Arrival",
    rating: 4.9,
    reviewCount: 8,
    material: "South Sea Pearl, 18k Gold"
  },
  {
    id: 12,
    name: "Capiz Shell Necklace",
    description: "Handcrafted necklace featuring iridescent Capiz shells in a modern design.",
    price: 1499.99,
    image: "/products/Capiz Shell Necklace.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Natural", "Rainbow"],
    stock: 30,
    badge: "New Arrival",
    rating: 4.7,
    reviewCount: 12,
    material: "Capiz Shell, Sterling Silver"
  },
  {
    id: 13,
    name: "Woven Rattan Clutch",
    description: "Contemporary clutch made from hand-woven rattan with leather trim and magnetic closure.",
    price: 1999.99,
    image: "/products/Woven Rattan Clutch.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Natural", "Black", "Brown"],
    stock: 40,
    rating: 4.6,
    reviewCount: 15,
    material: "Rattan, Leather"
  },
  {
    id: 14,
    name: "Mother of Pearl Hair Pins",
    description: "Set of 3 decorative hair pins featuring mother of pearl inlays in floral designs.",
    price: 899.99,
    image: "/products/Mother of Pearl Hair Pins.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Pearl", "Gold"],
    stock: 50,
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 6,
    material: "Mother of Pearl, Gold-plated"
  },
  {
    id: 15,
    name: "Abaca Woven Belt",
    description: "Handwoven abaca fiber belt with genuine leather backing and brass buckle.",
    price: 799.99,
    image: "/products/Abaca Woven Belt.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["S", "M", "L"],
    colors: ["Natural", "Black"],
    stock: 35,
    rating: 4.5,
    reviewCount: 18,
    material: "Abaca, Leather"
  },
  {
    id: 16,
    name: "Shell Statement Bracelet",
    description: "Bold statement bracelet featuring local shells and brass details.",
    price: 1299.99,
    image: "/products/Shell Statement Bracelet.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Multi"],
    stock: 20,
    badge: "New Arrival",
    rating: 4.7,
    reviewCount: 9,
    material: "Mixed Shells, Brass"
  },
  {
    id: 17,
    name: "Solihiya Pattern Sunglasses",
    description: "Modern sunglasses with frames inspired by traditional Solihiya weaving patterns.",
    price: 2499.99,
    image: "/products/Solihiya Pattern Sunglasses.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Tortoise", "Black", "Brown"],
    stock: 45,
    rating: 4.6,
    reviewCount: 22,
    material: "Acetate",
    isOnSale: true,
    salePrice: 1999.99
  },
  {
    id: 18,
    name: "Tribal Print Silk Scarf",
    description: "Luxurious silk scarf featuring traditional tribal prints in contemporary colors.",
    price: 1799.99,
    image: "/products/Tribal Print Silk Scarf.jpg",
    galleryImages: [],
    category: "Accessories",
    sizes: ["One Size"],
    colors: ["Blue/Gold", "Red/Black", "Green/Brown"],
    stock: 30,
    badge: "New Arrival",
    rating: 4.8,
    reviewCount: 11,
    material: "Silk"
  },
  {
    id: 19,
    name: "Contemporary Terno Dress",
    description: "Modern interpretation of the traditional terno with detachable butterfly sleeves.",
    price: 5999.99,
    image: "/products/Contemporary Terno Dress.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Emerald", "Navy", "Burgundy"],
    stock: 25,
    rating: 4.7,
    reviewCount: 15,
    material: "Premium Silk"
  },
  {
    id: 20,
    name: "Embroidered Cocktail Dress",
    description: "Elegant cocktail dress with traditional Filipino embroidery patterns.",
    price: 3999.99,
    image: "/products/Embroidered Cocktail Dress.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Red", "Blue"],
    stock: 30,
    rating: 4.6,
    reviewCount: 12,
    material: "Cotton Silk Blend"
  },
  {
    id: 21,
    name: "Modern Mestiza Dress",
    description: "Contemporary take on the mestiza dress with modern silhouette.",
    price: 6999.99,
    image: "/products/Modern Mestiza Dress.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Ivory", "Blush"],
    stock: 20,
    badge: "Limited Edition",
    rating: 4.9,
    reviewCount: 18,
    material: "Premium Jusi"
  },
  {
    id: 22,
    name: "Handwoven Maxi Dress",
    description: "Floor-length dress featuring handwoven Filipino textile patterns.",
    price: 7499.99,
    image: "/products/Handwoven Maxi Dress.jpg",
    galleryImages: [],
    category: "Dresses",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Multi", "Earth", "Ocean"],
    stock: 15,
    rating: 4.8,
    reviewCount: 9,
    material: "Handwoven Cotton"
  },
  {
    id: 23,
    name: "Classic Barong Tagalog",
    description: "Traditional full-cut Barong Tagalog with classic embroidery patterns.",
    price: 4499.99,
    image: "/products/Classic Barong Tagalog.jpg",
    galleryImages: [],
    category: "Traditional",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["White", "Ivory"],
    stock: 50,
    rating: 4.7,
    reviewCount: 35,
    material: "Piña"
  },
  {
    id: 24,
    name: "Modern Kimona",
    description: "Contemporary version of the traditional Kimona with adjustable ties.",
    price: 2999.99,
    image: "/products/Modern Kimona.jpg",
    galleryImages: [],
    category: "Traditional",
    sizes: ["S", "M", "L", "XL"],
    colors: ["White", "Cream", "Beige"],
    stock: 40,
    rating: 4.5,
    reviewCount: 28,
    material: "Cotton Jusi"
  },
  {
    id: 25,
    name: "Embroidered Barong Dress",
    description: "Women's barong dress with intricate callado embroidery.",
    price: 3799.99,
    image: "/products/Embroidered Barong Dress.jpg",
    galleryImages: [],
    category: "Traditional",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Ecru", "Champagne"],
    stock: 35,
    rating: 4.8,
    reviewCount: 22,
    material: "Jusi Silk"
  },
  {
    id: 26,
    name: "Youth Barong",
    description: "Modern barong design for younger generation with contemporary patterns.",
    price: 2499.99,
    image: "/products/Youth Barong.jpg",
    galleryImages: [],
    category: "Traditional",
    sizes: ["XS", "S", "M", "L"],
    colors: ["White", "Light Blue", "Sage"],
    stock: 60,
    badge: "New Arrival",
    rating: 4.6,
    reviewCount: 15,
    material: "Cotton Blend"
  },
  {
    id: 27,
    name: "Formal Filipiniana",
    description: "Traditional Filipiniana outfit with butterfly sleeves and matching skirt.",
    price: 5999.99,
    image: "/products/Formal Filipiniana.jpg",
    galleryImages: [],
    category: "Traditional",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Blue", "Pink"],
    stock: 25,
    rating: 4.9,
    reviewCount: 19,
    material: "Pure Piña"
  },
  {
    id: 28,
    name: "Abaca Backpack",
    description: "Modern backpack made from durable abaca fiber with leather trim.",
    price: 3499.99,
    image: "/products/Abaca Backpack.jpg",
    galleryImages: [],
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Natural", "Black", "Brown"],
    stock: 45,
    rating: 4.6,
    reviewCount: 31,
    material: "Abaca"
  },
  {
    id: 29,
    name: "Inabel Shoulder Bag",
    description: "Contemporary shoulder bag featuring traditional Inabel patterns.",
    price: 2799.99,
    image: "/products/Inabel Shoulder Bag.jpg",
    galleryImages: [],
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Blue", "Red", "Black"],
    stock: 50,
    rating: 4.8,
    reviewCount: 24,
    material: "Inabel"
  },
  {
    id: 30,
    name: "Rattan Crossbody",
    description: "Handwoven rattan crossbody bag with leather strap.",
    price: 1899.99,
    image: "/products/Rattan Crossbody.jpg",
    galleryImages: [],
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Natural", "Dark Brown"],
    stock: 70,
    badge: "New Arrival",
    rating: 4.4,
    reviewCount: 16,
    material: "Rattan"
  },
  {
    id: 31,
    name: "Banig Market Bag",
    description: "Eco-friendly market bag made from traditional banig material.",
    price: 1299.99,
    image: "/products/Banig Market Bag.jpg",
    galleryImages: [],
    category: "Bags",
    sizes: ["One Size"],
    colors: ["Multi", "Natural"],
    stock: 85,
    rating: 4.5,
    reviewCount: 42,
    material: "Banig"
  },
  {
    id: 32,
    name: "Modern Piña Jacket",
    description: "Lightweight jacket made with piña fabric blend, perfect for formal occasions.",
    price: 4999.99,
    image: "/products/Modern Piña Jacket.jpg",
    galleryImages: [],
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Cream", "Black", "Navy"],
    stock: 30,
    rating: 4.7,
    reviewCount: 21,
    material: "Piña Blend"
  },
  {
    id: 33,
    name: "T'nalak Pattern Coat",
    description: "Statement coat featuring T'nalak-inspired patterns.",
    price: 6999.99,
    image: "/products/T'nalak Pattern Coat.jpg",
    galleryImages: [],
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Multi"],
    stock: 20,
    badge: "Limited Edition",
    rating: 4.8,
    reviewCount: 14,
    material: "Wool Blend with T'nalak"
  },
  {
    id: 34,
    name: "Abaca Vest",
    description: "Modern vest made with abaca fiber blend, perfect for layering.",
    price: 3499.99,
    image: "/products/Abaca Vest.jpg",
    galleryImages: [],
    category: "Outerwear",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Natural", "Black"],
    stock: 40,
    rating: 4.6,
    reviewCount: 18,
    material: "Abaca Blend"
  },
  {
    id: 35,
    name: "Mindanao Print Cardigan",
    description: "Comfortable cardigan featuring traditional Mindanao prints.",
    price: 4299.99,
    image: "/products/Mindanao Print Cardigan.jpg",
    galleryImages: [],
    category: "Outerwear",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blue", "Brown", "Green"],
    stock: 35,
    rating: 4.5,
    reviewCount: 23,
    material: "Cotton Blend"
  },
  {
    id: 36,
    name: "Hablon Wrap Coat",
    description: "Elegant wrap coat made from Hablon fabric with modern styling.",
    price: 5499.99,
    image: "/products/Hablon Wrap Coat.jpg",
    galleryImages: [],
    category: "Outerwear",
    sizes: ["S", "M", "L"],
    colors: ["Maroon", "Navy", "Forest Green"],
    stock: 25,
    badge: "New Arrival",
    rating: 4.7,
    reviewCount: 9,
    material: "Hablon"
  },
  {
    id: 37,
    name: "T'nalak Print Sneakers",
    description: "Modern canvas sneakers featuring traditional T'nalak patterns. Perfect for casual wear.",
    price: 2499.99,
    image: "/products/T'nalak Print Sneakers.jpg",
    galleryImages: [],
    category: "Shoes",
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    colors: ["Multi", "Black/Multi"],
    stock: 60,
    badge: "New Arrival",
    rating: 4.6,
    reviewCount: 28,
    material: "Canvas with T'nalak Print"
  },
  {
    id: 38,
    name: "Handwoven Espadrilles",
    description: "Comfortable espadrilles featuring handwoven Filipino textiles and jute soles.",
    price: 1799.99,
    image: "/products/Handwoven Espadrilles.jpg",
    galleryImages: [],
    category: "Shoes",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Natural", "Blue", "Red"],
    stock: 40,
    rating: 4.7,
    reviewCount: 19,
    material: "Inabel and Jute"
  },
  {
    id: 39,
    name: "Rattan Slip-Ons",
    description: "Elegant slip-on shoes with rattan weaving details and leather lining.",
    price: 1999.99,
    image: "/products/Rattan Slip-Ons.jpg",
    galleryImages: [],
    category: "Shoes",
    sizes: ["36", "37", "38", "39", "40", "41"],
    colors: ["Natural", "Black", "Brown"],
    stock: 35,
    rating: 4.5,
    reviewCount: 24,
    material: "Rattan and Leather"
  },
  {
    id: 40,
    name: "Piña Fabric Mules",
    description: "Elegant mules featuring piña fabric upper with intricate embroidery.",
    price: 2299.99,
    image: "/products/Piña Fabric Mules.jpg",
    galleryImages: [],
    category: "Shoes",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Cream", "Black", "Rose Gold"],
    stock: 30,
    badge: "Limited Edition",
    rating: 4.8,
    reviewCount: 15,
    material: "Piña Fabric and Leather"
  },
  {
    id: 41,
    name: "Banig Weave Flats",
    description: "Comfortable flats inspired by traditional banig weaving patterns.",
    price: 1699.99,
    image: "/products/Banig Weave Flats.jpg",
    galleryImages: [],
    category: "Shoes",
    sizes: ["35", "36", "37", "38", "39", "40"],
    colors: ["Natural", "Black", "Navy"],
    stock: 50,
    rating: 4.4,
    reviewCount: 21,
    material: "Woven Fabric and Leather"
  }
];

export const getFeaturedProducts = () => {
  return products.filter((product) => product.rating >= 4.7)
}

export const getProductsByCategory = (category: string) => {
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export const getProductById = (id: number) => {
  return products.find((product) => product.id === id)
}

export const getNewArrivals = () => {
  return products.filter((product) => product.badge === "New Arrival")
}

export const getBestsellers = () => {
  return products.filter((product) => product.badge === "Bestseller" || product.rating >= 4.8)
}

export const getOnSaleProducts = () => {
  return products.filter((product) => product.isOnSale)
}

export const getProductsByPriceRange = (minPrice: number, maxPrice: number) => {
  return products.filter((product) => {
    const finalPrice = product.isOnSale ? product.salePrice! : product.price
    return finalPrice >= minPrice && finalPrice <= maxPrice
  })
}

export const getProductsByMaterial = (material: string) => {
  return products.filter((product) => 
    product.material?.toLowerCase().includes(material.toLowerCase())
  )
}

export const getTopRatedProducts = () => {
  return products
    .filter((product) => product.reviewCount >= 20)
    .sort((a, b) => b.rating - a.rating)
}

