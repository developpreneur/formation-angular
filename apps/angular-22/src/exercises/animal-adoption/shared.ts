import { Component, Injectable, input, model, output } from "@angular/core";

export type AnimalSpecies = "chat" | "chien";
export type SpeciesFilter = AnimalSpecies | "all";

export interface SpeciesFilterOption {
  value: SpeciesFilter;
  label: string;
}

export const SPECIES_FILTER_OPTIONS: readonly SpeciesFilterOption[] = [
  { value: "all", label: "Toutes les espèces" },
  { value: "chien", label: "Chiens" },
  { value: "chat", label: "Chats" },
];

export interface Animal {
  id: string;
  name: string;
  species: AnimalSpecies;
  age: string;
  description: string;
  image: string;
}

export const ANIMALS: readonly Animal[] = [
  {
    id: "milo",
    name: "Milo",
    species: "chien",
    age: "3 ans",
    description: "Joueur et toujours partant pour une promenade.",
    image:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?w=640&q=80",
  },
  {
    id: "nala",
    name: "Nala",
    species: "chat",
    age: "2 ans",
    description: "Curieuse, calme et très sociable.",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=640&q=80",
  },
  {
    id: "oslo",
    name: "Oslo",
    species: "chien",
    age: "5 ans",
    description: "Un compagnon doux qui aime les longues siestes.",
    image:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=640&q=80",
  },
  {
    id: "plume",
    name: "Plume",
    species: "chat",
    age: "1 an",
    description: "Une petite exploratrice pleine d'énergie.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=640&q=80",
  },
];

@Injectable()
export class AnimalShelterService {
  loadAnimals(): Promise<readonly Animal[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(ANIMALS), 350);
    });
  }
}

@Component({
  selector: "formation-species-filter",
  standalone: true,
  template: `<label class="form-control w-full max-w-xs">
    <span class="label-text mb-2">Filtrer par espèce</span>
    <select
      class="select select-bordered"
      aria-label="Filtrer par espèce"
      [value]="selected()"
      (change)="updateSelected($event)"
    >
      @for (option of options(); track option.value) {
        <option [value]="option.value">{{ option.label }}</option>
      }
    </select>
  </label>`,
})
export class SpeciesFilterComponent {
  readonly options = input.required<readonly SpeciesFilterOption[]>();
  readonly selected = model<SpeciesFilter>("all");

  protected updateSelected(event: Event): void {
    this.selected.set(
      (event.target as HTMLSelectElement).value as SpeciesFilter,
    );
  }
}

@Component({
  selector: "formation-animal-card",
  standalone: true,
  template: `<article
    class="card h-full overflow-hidden border border-base-300 bg-base-100 text-base-content shadow-sm"
    [attr.aria-label]="animal().name + ', ' + speciesLabel"
  >
    <figure class="aspect-4/3 bg-base-200">
      <img
        class="h-full w-full object-cover"
        [src]="animal().image"
        [alt]="animal().name"
        loading="lazy"
      />
    </figure>
    <div class="card-body gap-3 p-5">
      <div>
        <p class="badge badge-outline">{{ speciesLabel }}</p>
        <h3 class="card-title mt-2 text-xl">{{ animal().name }}</h3>
        <p class="mt-1 text-sm text-base-content/70">{{ animal().age }}</p>
      </div>
      <p class="text-sm">{{ animal().description }}</p>
      <div
        class="card-actions mt-auto justify-between border-t border-base-300 pt-4"
      >
        <button
          class="btn btn-ghost btn-sm"
          type="button"
          [attr.aria-pressed]="favorite()"
          [attr.aria-label]="
            favorite()
              ? 'Retirer ' + animal().name + ' de la sélection'
              : 'Ajouter ' + animal().name + ' à la sélection'
          "
          (click)="favorite.set(!favorite())"
        >
          {{ favorite() ? "Dans ma sélection" : "Ajouter à ma sélection" }}
        </button>
        <button
          class="btn btn-primary btn-sm"
          type="button"
          [attr.aria-label]="adoptionButtonLabel"
          (click)="adoptionRequested.emit(animal())"
        >
          Demander l'adoption
        </button>
      </div>
    </div>
  </article>`,
})
export class AnimalCardComponent {
  readonly animal = input.required<Animal>();
  readonly favorite = model(false);
  readonly adoptionRequested = output<Animal>();

  protected get speciesLabel(): string {
    return this.animal().species === "chien" ? "Chien" : "Chat";
  }

  protected get adoptionButtonLabel(): string {
    return `Demander l'adoption de ${this.animal().name}`;
  }
}
