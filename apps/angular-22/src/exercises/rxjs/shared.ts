import { Observable, of, switchMap, throwError, timer } from "rxjs";

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  summary: string;
}

export type SearchState =
  | { status: "idle" }
  | { status: "loading"; query: string }
  | { status: "success"; query: string; courses: Course[] }
  | { status: "error"; query: string; message: string };

export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_API_DELAY_MS = 500;

const COURSES: Course[] = [
  {
    id: "angular-advanced",
    title: "Angular avancé",
    category: "Développement frontend",
    duration: "2 jours",
    summary:
      "Architecture, composants et formulaires pour des applications robustes.",
  },
  {
    id: "angular-performance",
    title: "Interfaces Angular performantes",
    category: "Développement frontend",
    duration: "1 jour",
    summary: "Optimiser le rendu et structurer des interfaces réactives.",
  },
  {
    id: "rxjs-advanced",
    title: "RxJS avancé",
    category: "Programmation réactive",
    duration: "1 jour",
    summary:
      "Composer des flux asynchrones et maîtriser les stratégies de concurrence.",
  },
  {
    id: "typescript-web",
    title: "TypeScript pour le web",
    category: "Développement frontend",
    duration: "1 jour",
    summary:
      "Types avancés et conception d'API fiables pour les applications web.",
  },
];

export function searchCourses(query: string): Observable<Course[]> {
  return timer(SEARCH_API_DELAY_MS).pipe(
    switchMap(() => {
      if (query === "erreur") {
        return throwError(
          () => new Error("Le service de recherche est indisponible."),
        );
      }

      return of(
        COURSES.filter((course) =>
          `${course.title} ${course.category} ${course.summary}`
            .toLowerCase()
            .includes(query),
        ),
      );
    }),
  );
}
