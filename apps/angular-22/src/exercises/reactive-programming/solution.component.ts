import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { BehaviorSubject, map } from "rxjs";
import {
  CartLine,
  CartView,
  PRODUCTS,
  Product,
  ProductCatalogComponent,
  ShopHeaderComponent,
  ShoppingCartComponent,
} from "./shared";

@Component({
  selector: "formation-reactive-shop-solution",
  standalone: true,
  imports: [
    AsyncPipe,
    ShopHeaderComponent,
    ProductCatalogComponent,
    ShoppingCartComponent,
  ],
  template: `<main class="mx-auto max-w-6xl px-4 py-8 lg:py-12">
    @if (cart$ | async; as cart) {
      <formation-shop-header [count]="cart.count" />
      <div class="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,22rem)]">
        <formation-shop-catalog
          [products]="products"
          (add)="addToCart($event)"
        />
        <formation-shop-cart
          [cart]="cart"
          (quantityChange)="changeQuantity($event.product, $event.delta)"
          (remove)="removeFromCart($event)"
          (clear)="clearCart()"
        />
      </div>
    }
  </main>`,
})
export class SolutionComponent {
  protected readonly products = PRODUCTS;
  protected readonly quantities$ = new BehaviorSubject<Record<string, number>>(
    {},
  );
  protected readonly cart$ = this.quantities$.pipe(
    map((quantities): CartView => {
      const lines: CartLine[] = this.products
        .filter((product) => (quantities[product.id] ?? 0) > 0)
        .map((product) => ({ product, quantity: quantities[product.id] }));
      return {
        lines,
        count: lines.reduce((count, line) => count + line.quantity, 0),
        total: lines.reduce(
          (sum, line) => sum + line.product.price * line.quantity,
          0,
        ),
      };
    }),
  );

  protected addToCart(product: Product): void {
    this.changeQuantity(product, 1);
  }

  protected changeQuantity(product: Product, delta: number): void {
    const next = { ...this.quantities$.value };
    const quantity = (next[product.id] ?? 0) + delta;
    if (quantity <= 0) {
      delete next[product.id];
    } else {
      next[product.id] = quantity;
    }
    this.quantities$.next(next);
  }

  protected removeFromCart(product: Product): void {
    const next = { ...this.quantities$.value };
    delete next[product.id];
    this.quantities$.next(next);
  }

  protected clearCart(): void {
    this.quantities$.next({});
  }
}
