const categories = [
  {
    name: "Dresses",
    slug: "dresses",
    image: "/products/pina-gown.jpg",
    description: "Elegant dresses for every occasion"
  },
  {
    name: "Accessories",
    slug: "accessories",
    image: "/products/Pearl Drop Earrings.jpg",
    description: "Complete your look with our accessories"
  },
  {
    name: "New Arrivals",
    slug: "new-arrivals",
    image: "/products/Modern Terno Top.jpg",
    description: "Check out our latest collections"
  }
]

export function CategoriesSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/category/${category.slug}`}
              className="group relative h-[400px] overflow-hidden rounded-lg"
            >
              <Image
                src={/products/category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 