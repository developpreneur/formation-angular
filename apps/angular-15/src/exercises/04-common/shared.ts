export interface Product {
  id: string;
  name: string;
  price: number;
  listedAt: Date;
  sold: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "lamp",
    name: "Lampe d'atelier",
    price: 45,
    listedAt: new Date("2026-03-02"),
    sold: false,
  },
  {
    id: "chair",
    name: "Fauteuil club",
    price: 1250,
    listedAt: new Date("2026-02-18"),
    sold: true,
  },
  {
    id: "desk",
    name: "Bureau en chene",
    price: 320,
    listedAt: new Date("2026-03-05"),
    sold: false,
  },
];
