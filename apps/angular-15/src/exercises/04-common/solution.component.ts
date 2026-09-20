import { CommonModule, registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import { Component, Input, LOCALE_ID } from "@angular/core";
import { Product, PRODUCTS } from "./shared";

registerLocaleData(localeFr);

@Component({
  selector: "formation-product-card-solution",
  standalone: true,
  imports: [CommonModule],
  template: `<article
    role="listitem"
    [attr.data-testid]="'product-' + product.id"
  >
    <h2>{{ product.name }}</h2>
    <p>Mis en vente le {{ product.listedAt | date: "longDate" }}</p>
    <p>Prix : {{ product.price | currency: "EUR" }}</p>
    <p *ngIf="product.sold">Vendu</p>
    <button type="button" (click)="compare = !compare">
      {{ compare ? "Retirer de la comparaison" : "Comparer" }}
    </button>
    <p *ngIf="compare">À comparer</p>
  </article>`,
})
export class ProductCardSolutionComponent {
  @Input() product!: Product;
  protected compare = false;
}

@Component({
  selector: "formation-product-list-solution",
  standalone: true,
  imports: [CommonModule, ProductCardSolutionComponent],
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
      <ng-container *ngFor="let product of products; trackBy: trackByProductId">
        <formation-product-card-solution
          *ngIf="!hideSold || !product.sold"
          [product]="product"
        />
      </ng-container>
    </div>
  </section>`,
})
export class ProductListSolutionComponent {
  hideSold = false;
  products: Product[] = PRODUCTS;

  trackByProductId(_: number, product: Product): string {
    return product.id;
  }

  refreshCatalog(): void {
    this.products = [...this.products]
      .reverse()
      .map((product) => ({ ...product }));
  }
}
