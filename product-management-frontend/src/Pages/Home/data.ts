import type { Product } from "../../types";

// Mock product data
export const initialProducts: Product[] = [
  {
    id: "1",
    name: "HP AMD Ryzen 3",
    price: 529.99,
    category: "laptop",
    brand: "hp",
    image: "/laptop-1.png",
    rating: 4,
    isFavorite: false,
  },
  {
    id: "2",
    name: "HP AMD Ryzen 3",
    price: 529.99,
    category: "laptop",
    brand: "hp",
    image: "/laptop-1.png",
    rating: 4,
    isFavorite: false,
  },
  {
    id: "3",
    name: "HP AMD Ryzen 3",
    price: 529.99,
    category: "laptop",
    brand: "hp",
    image: "/laptop-1.png",
    rating: 4,
    isFavorite: false,
  },
  {
    id: "4",
    name: "HP AMD Ryzen 3",
    price: 529.99,
    category: "laptop",
    brand: "hp",
    image: "/laptop-1.png",
    rating: 5,
    isFavorite: false,
  },
  {
    id: "5",
    name: "HP AMD Ryzen 3",
    price: 529.99,
    category: "laptop",
    brand: "hp",
    image: "/laptop-1.png",
    rating: 4,
    isFavorite: false,
  },
  {
    id: "6",
    name: "HP AMD Ryzen 3",
    price: 529.99,
    category: "laptop",
    brand: "hp",
    image: "/laptop-1.png",
    rating: 3,
    isFavorite: false,
  },
  {
    id: "7",
    name: "Dell XPS 13",
    price: 899.99,
    category: "laptop",
    brand: "dell",
    image: "/laptop-2.png",
    rating: 5,
    isFavorite: false,
  },
  {
    id: "8",
    name: "Dell Inspiron 15",
    price: 649.99,
    category: "laptop",
    brand: "dell",
    image: "/laptop-2.png",
    rating: 4,
    isFavorite: false,
  },
  {
    id: "9",
    name: "Samsung Galaxy Tab S7",
    price: 449.99,
    category: "tablet",
    brand: "samsung",
    image: "/tablet-1.png",
    rating: 5,
    isFavorite: false,
  },
  {
    id: "10",
    name: "Apple iPad Pro",
    price: 799.99,
    category: "tablet",
    brand: "apple",
    image: "/tablet-2.png",
    rating: 5,
    isFavorite: false,
  },
  {
    id: "11",
    name: "Sony WH-1000XM4",
    price: 349.99,
    category: "headphones",
    brand: "sony",
    image: "/headphones-1.png",
    rating: 5,
    isFavorite: false,
  },
  {
    id: "12",
    name: "Bose QuietComfort 35 II",
    price: 299.99,
    category: "headphones",
    brand: "bose",
    image: "/headphones-2.png",
    rating: 4,
    isFavorite: false,
  },
];

// Generate more mock products for pagination testing
for (let i = 13; i <= 50; i++) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const brandIndex = i % 2;
  const categoryIndex = i % 3;
  const categories = ["laptop", "tablet", "headphones"];
  const brands = [
    ["hp", "dell", "lenovo", "asus"],
    ["apple", "samsung", "microsoft"],
    ["sony", "bose", "sennheiser", "jbl"],
  ];

  initialProducts.push({
    id: i.toString(),
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 199.99,
    category: categories[categoryIndex],
    brand: brands[categoryIndex][i % brands[categoryIndex].length],
    image: `/product-${(i % 5) + 1}.png`,
    rating: Math.floor(Math.random() * 5) + 1,
    isFavorite: false,
    description: "",
  });
}
