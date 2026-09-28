import { AsyncPipe } from "@angular/common";
import { Component } from "@angular/core";
import { BehaviorSubject, of } from "rxjs";
import {
  CartView,
  PRODUCTS,
  Product,
  ProductCatalogComponent,
  ShopHeaderComponent,
  ShoppingCartComponent,
} from "./shared";

@Component({
  selector: "formation-reactive-shop-exercise",
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
export class ExerciseComponent {
  protected readonly products = PRODUCTS;
  protected readonly quantities$ = new BehaviorSubject<Record<string, number>>(
    {},
  );
  protected readonly cart$ = of<CartView>({ lines: [], count: 0, total: 0 });

  protected addToCart(product: Product): void {}

  protected changeQuantity(product: Product, delta: number): void {}

  protected removeFromCart(product: Product): void {}

  protected clearCart(): void {}
}
