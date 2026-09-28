import { Component, EventEmitter, Input, Output } from "@angular/core";

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export interface CartView {
  lines: CartLine[];
  count: number;
  total: number;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: "notebook",
    name: "Carnet quadrillé",
    category: "Papeterie",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=640&q=80",
  },
  {
    id: "lamp",
    name: "Lampe de bureau",
    category: "Éclairage",
    price: 42,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=640&q=80",
  },
  {
    id: "mug",
    name: "Tasse en céramique",
    category: "Accessoires",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=640&q=80",
  },
];

@Component({
  selector: "formation-shop-product-card",
  standalone: true,
  template: `<article
    class="card overflow-hidden border border-base-300 bg-base-100 text-base-content shadow-sm"
  >
    <figure class="aspect-4/3 bg-base-200">
      <img
        class="h-full w-full object-cover"
        [src]="product.image"
        [alt]="product.name"
      />
    </figure>
    <div class="card-body gap-2 p-5">
      <p class="text-xs uppercase text-base-content/60">
        {{ product.category }}
      </p>
      <h3 class="card-title text-lg">{{ product.name }}</h3>
      <div class="card-actions mt-3 items-center justify-between">
        <span class="font-semibold">{{ product.price }} €</span>
        <button
          class="btn btn-primary btn-sm"
          type="button"
          (click)="add.emit(product)"
        >
          Ajouter {{ product.name }}
        </button>
      </div>
    </div>
  </article>`,
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() add = new EventEmitter<Product>();
}

export interface QuantityChange {
  product: Product;
  delta: number;
}

@Component({
  selector: "formation-shop-header",
  standalone: true,
  template: `<header
    class="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-base-300 pb-6"
  >
    <div>
      <p class="text-sm font-semibold uppercase text-primary">
        La boutique de l'atelier
      </p>
      <h1 class="mt-2 text-3xl font-bold">Le coin bureau</h1>
      <p class="mt-2 text-base-content/70">
        Des objets pour vos journées créatives.
      </p>
    </div>
    <div class="badge badge-primary badge-lg" role="status">
      Panier : {{ count }} article{{ count > 1 ? "s" : "" }}
    </div>
  </header>`,
})
export class ShopHeaderComponent {
  @Input({ required: true }) count!: number;
}

@Component({
  selector: "formation-shop-catalog",
  standalone: true,
  imports: [ProductCardComponent],
  template: `<section aria-labelledby="catalog-title">
    <h2 id="catalog-title" class="mb-5 text-xl font-bold">La sélection</h2>
    <ul class="grid gap-5 sm:grid-cols-2">
      @for (product of products; track product.id) {
        <li>
          <formation-shop-product-card
            [product]="product"
            (add)="add.emit($event)"
          />
        </li>
      }
    </ul>
  </section>`,
})
export class ProductCatalogComponent {
  @Input({ required: true }) products!: readonly Product[];
  @Output() add = new EventEmitter<Product>();
}

@Component({
  selector: "formation-shop-cart-line",
  standalone: true,
  template: `<div class="py-4">
    <div class="flex items-start justify-between gap-2">
      <div>
        <h3 class="font-semibold">{{ line.product.name }}</h3>
        <p class="text-sm text-base-content/60">
          {{ line.product.price }} € l'unité
        </p>
      </div>
      <strong>{{ line.product.price * line.quantity }} €</strong>
    </div>
    <div class="mt-3 flex items-center gap-2">
      <button
        class="btn btn-outline btn-xs"
        type="button"
        [attr.aria-label]="'Diminuer ' + line.product.name"
        (click)="quantityChange.emit({ product: line.product, delta: -1 })"
      >
        −
      </button>
      <span
        class="min-w-6 text-center"
        [attr.aria-label]="'Quantité de ' + line.product.name"
        >{{ line.quantity }}</span
      >
      <button
        class="btn btn-outline btn-xs"
        type="button"
        [attr.aria-label]="'Augmenter ' + line.product.name"
        (click)="quantityChange.emit({ product: line.product, delta: 1 })"
      >
        +
      </button>
      <button
        class="btn btn-ghost btn-xs ml-auto"
        type="button"
        [attr.aria-label]="'Retirer ' + line.product.name"
        (click)="remove.emit(line.product)"
      >
        Retirer
      </button>
    </div>
  </div>`,
})
export class CartLineComponent {
  @Input({ required: true }) line!: CartLine;
  @Output() quantityChange = new EventEmitter<QuantityChange>();
  @Output() remove = new EventEmitter<Product>();
}

@Component({
  selector: "formation-shop-cart",
  standalone: true,
  imports: [CartLineComponent],
  template: `<section
    aria-labelledby="cart-title"
    class="self-start border-t border-base-300 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0"
  >
    <div class="mb-5 flex items-center justify-between gap-3">
      <h2 id="cart-title" class="text-xl font-bold">Votre panier</h2>
      <button
        class="btn btn-ghost btn-sm disabled:cursor-not-allowed! disabled:opacity-40"
        type="button"
        [disabled]="cart.count === 0"
        (click)="clear.emit()"
      >
        Vider le panier
      </button>
    </div>
    @if (cart.lines.length === 0) {
      <p
        class="rounded border border-dashed border-base-300 bg-base-100 p-6 text-center text-base-content"
      >
        Votre panier est vide.
      </p>
    } @else {
      <ul class="divide-y divide-base-300" aria-label="Articles du panier">
        @for (line of cart.lines; track line.product.id) {
          <li>
            <formation-shop-cart-line
              [line]="line"
              (quantityChange)="quantityChange.emit($event)"
              (remove)="remove.emit($event)"
            />
          </li>
        }
      </ul>
    }
    <div
      class="mt-5 flex justify-between border-t border-base-300 pt-4 text-lg font-bold"
    >
      <span>Total</span>
      <output aria-label="Total du panier">{{ cart.total }} €</output>
    </div>
  </section>`,
})
export class ShoppingCartComponent {
  @Input({ required: true }) cart!: CartView;
  @Output() quantityChange = new EventEmitter<QuantityChange>();
  @Output() remove = new EventEmitter<Product>();
  @Output() clear = new EventEmitter<void>();
}
