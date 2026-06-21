export type Collection = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: "Dresses" | "Tops" | "Bottoms" | "Accessories" | "Other";
  sizes: string[];
  image_url: string | null;
  collection_id: string | null;
  collection?: Collection;
  is_in_stock: boolean;
  is_featured: boolean;
  display_order: number;
  created_at: string;
};
