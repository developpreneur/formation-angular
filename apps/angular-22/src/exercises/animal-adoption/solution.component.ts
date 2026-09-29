import { Component, computed, inject, resource, signal } from "@angular/core";
import {
  AnimalCardComponent,
  AnimalShelterService,
  SPECIES_FILTER_OPTIONS,
  SpeciesFilterComponent,
  type Animal,
  type SpeciesFilter,
} from "./shared";

@Component({
  selector: "formation-animal-adoption-solution",
  standalone: true,
  imports: [AnimalCardComponent, SpeciesFilterComponent],
  template: `<main
      data-theme="light"
      class="mx-auto min-h-screen max-w-6xl bg-base-100 px-4 py-8 text-base-content sm:px-8 lg:py-12"
    >
      <header class="mb-8 border-b border-base-300 pb-6">
        <p class="text-sm font-semibold uppercase text-primary">
          Le refuge des compagnons
        </p>
        <h1 class="mt-2 text-3xl font-bold">Animaux à adopter</h1>
        <p class="mt-2 text-base-content/70">
          Trouvez un nouveau compagnon parmi les animaux du refuge.
        </p>
      </header>

      <section aria-label="Catalogue des animaux">
        <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
          <formation-species-filter
            [options]="speciesOptions"
            [selected]="speciesFilter()"
            (selectedChange)="speciesFilter.set($event)"
          />

          <div class="flex flex-wrap items-center gap-3">
            <p role="status" aria-label="Animaux dans votre sélection">
              {{ favoriteCount() }}
              {{ favoriteCount() === 1 ? "animal" : "animaux" }} dans votre
              sélection
            </p>
            <button
              class="btn btn-outline btn-sm"
              type="button"
              [disabled]="favoriteCount() === 0"
              (click)="clearSelection()"
            >
              Effacer la sélection
            </button>
          </div>
        </div>

        @if (animalResource.isLoading()) {
          <p class="py-10 text-center" role="status">Chargement des animaux…</p>
        } @else if (animalResource.hasValue()) {
          @switch (speciesFilter()) {
            @case ("all") {
              <h2 class="mb-4 text-xl font-bold">Tous les animaux</h2>
            }
            @case ("chien") {
              <h2 class="mb-4 text-xl font-bold">Les chiens</h2>
            }
            @case ("chat") {
              <h2 class="mb-4 text-xl font-bold">Les chats</h2>
            }
          }

          <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            @for (animal of filteredAnimals(); track animal.id) {
              <li>
                <formation-animal-card
                  [animal]="animal"
                  [favorite]="favoriteIds().has(animal.id)"
                  (favoriteChange)="setFavorite(animal.id, $event)"
                  (adoptionRequested)="showConfirmation($event)"
                />
              </li>
            } @empty {
              <li class="col-span-full py-10 text-center" role="status">
                Aucun animal ne correspond à cette espèce.
              </li>
            }
          </ul>
        }
      </section>
    </main>

    @if (toastAnimal(); as animal) {
      <div class="toast toast-top toast-center z-50">
        <div
          class="alert alert-success shadow-lg"
          role="status"
          aria-label="Confirmation de demande"
          aria-live="polite"
        >
          <span
            >Votre demande a été prise en compte pour {{ animal.name }}.</span
          >
          <button
            class="btn btn-ghost btn-sm"
            type="button"
            aria-label="Fermer la confirmation"
            (click)="dismissConfirmation()"
          >
            Fermer
          </button>
        </div>
      </div>
    }`,
})
export class SolutionComponent {
  private readonly shelter = inject(AnimalShelterService);
  protected readonly speciesOptions = SPECIES_FILTER_OPTIONS;
  protected readonly animalResource = resource({
    loader: () => this.shelter.loadAnimals(),
  });
  protected readonly speciesFilter = signal<SpeciesFilter>("all");
  protected readonly favoriteIds = signal<ReadonlySet<string>>(new Set());
  protected readonly favoriteCount = computed(() => this.favoriteIds().size);
  protected readonly toastAnimal = signal<Animal | null>(null);

  protected readonly filteredAnimals = computed(() => {
    const animals = this.animalResource.value() ?? [];
    const species = this.speciesFilter();

    return species === "all"
      ? animals
      : animals.filter((animal) => animal.species === species);
  });

  protected setFavorite(animalId: string, isFavorite: boolean): void {
    this.favoriteIds.update((current) => {
      const next = new Set(current);
      if (isFavorite) {
        next.add(animalId);
      } else {
        next.delete(animalId);
      }
      return next;
    });
  }

  protected clearSelection(): void {
    this.favoriteIds.set(new Set());
  }

  protected showConfirmation(animal: Animal): void {
    this.toastAnimal.set(animal);
  }

  protected dismissConfirmation(): void {
    this.toastAnimal.set(null);
  }
}
