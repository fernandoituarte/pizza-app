export type Product = {
  availability?: 'AVAILABLE' |'UNAVAILABLE' |'OUT_OF_STOCK';
  category?: Category;
  id: string;
  ingredients?: Ingredient[];
  name: string;
  price: number;
  stock: number;
  description?: string;
  imageUrl?: string;
  imageKey?: string;
  tags?: Tag[];
  extras?: Extra[];
  createdAt?: Date;
  updatedAt?: Date;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
};

export type Ingredient = {
  id: string;
  name: string;
  quantity?: number;
};

export type Tag = {
  id: string;
  name: string;
};

export type Extra = {
  id: string;
  name: string;
  price: number;
};
