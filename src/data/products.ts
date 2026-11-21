
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  // RINGS
  {
    id: 1,
    name: "Golden Elegance Ring",
    category: "Rings",
    price: 850,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700",
  },
  {
    id: 5,
    name: "Elegant Gold Ring",
    category: "Rings",
    price: 1100,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700",
  },
  {
    id: 11,
    name: "Rose Gold Ring",
    category: "Rings",
    price: 950,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700",
  },
  {
    id: 12,
    name: "Minimal Diamond Ring",
    category: "Rings",
    price: 1350,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700",
  },
  {
    id: 13,
    name: "Classic Silver Ring",
    category: "Rings",
    price: 1050,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700",
  },
  {
    id: 14,
    name: "Luxury Statement Ring",
    category: "Rings",
    price: 1500,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=700",
  },
  {
    id: 15,
    name: "Elegant Pearl Ring",
    category: "Rings",
    price: 1200,
    image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=700",
  },

  // BRACELETS
  {
    id: 2,
    name: "Classic Bracelet",
    category: "Bracelets",
    price: 1250,
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=700",
  },
  {
    id: 6,
    name: "Charm Bracelet",
    category: "Bracelets",
    price: 1400,
    image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700",
  },

  // WATCHES
  {
    id: 3,
    name: "Luxury Watch",
    category: "Watches",
    price: 1750,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700",
  },
  {
    id: 7,
    name: "Classic Timepiece",
    category: "Watches",
    price: 1650,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700",
  },

  // EARRINGS
  {
    id: 4,
    name: "Pearl Earrings",
    category: "Earrings",
    price: 950,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=700",
  },
  {
    id: 8,
    name: "Golden Studs",
    category: "Earrings",
    price: 750,
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=700",
  },

  // CHAINS
  {
    id: 9,
    name: "Elegant Gold Chain",
    category: "Chains",
    price: 950,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=700",
  },
  {
    id: 10,
    name: "Classic Chain Necklace",
    category: "Chains",
    price: 1200,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=700",
  },
];
