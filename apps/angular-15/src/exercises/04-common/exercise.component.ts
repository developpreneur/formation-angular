import { CommonModule, registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { Component, Input, LOCALE_ID } from "@angular/core";
import { Product, PRODUCTS } from "./shared";

registerLocaleData(localeFr);

@Component({
  selector: "formation-product-card",
  standalone: true,
  imports: [CommonModule],
  template: `<article
    role="listitem"
    [attr.data-testid]="'product-' + product.id"
  >
    <h2>{{ product.name }}</h2>
    <p>Mis en vente le {{ product.listedAt }}</p>
    <p>Prix : {{ product.price }}</p>
    <p *ngIf="product.sold">Vendu</p>
    <button type="button" (click)="compare = !compare">
      {{ compare ? "Retirer de la comparaison" : "Comparer" }}
    </button>
    <p *ngIf="compare">À comparer</p>
  </article>`,
})
export class ProductCardComponent {
  @Input() product!: Product;
  protected compare = false;
}

@Component({
  selector: "formation-product-list-exercise",
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  providers: [{ provide: LOCALE_ID, useValue: "fr" }],
  template: `<section class="lab">
    <p class="eyebrow">Fondamentaux · Module commun</p>
    <h1>Les annonces du vide-grenier</h1>
    <label>
      <input
        type="checkbox"
        [checked]="hideSold"
        (change)="hideSold = !hideSold"
      />
      Masquer les produits vendus
    </label>
    <button type="button" (click)="refreshCatalog()">
      Rafraichir les annonces
    </button>
    <div role="list">
      <formation-product-card
        *ngFor="let product of products"
        [product]="product"
      />
    </div>
  </section>`,
})
export class ProductListExerciseComponent {
  hideSold = false;
  products: Product[] = PRODUCTS;

  refreshCatalog(): void {
    this.products = [...this.products]
      .reverse()
      .map((product) => ({ ...product }));
  }
}
