import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  ActionReducerMap,
  createReducer,
  createSelector,
  on,
} from "@ngrx/store";
import { catchError, exhaustMap, map, of } from "rxjs";
import { MatchScoresService, MatchesPanelState, ScoreBoard } from "./shared";
import {
  AppState,
  INITIAL_SCOREBOARD_STATE,
  addPoints,
  loadInProgressMatches,
  loadInProgressMatchesFailure,
  loadInProgressMatchesSuccess,
  navigationReducer,
  selectScoreboardFeature,
} from "./shared-store";

export const scoreboardReducer = createReducer(
  INITIAL_SCOREBOARD_STATE,
  on(addPoints, (state, { team, points }) => ({
    ...state,
    homeScore: team === "home" ? state.homeScore + points : state.homeScore,
    awayScore: team === "away" ? state.awayScore + points : state.awayScore,
  })),
  on(loadInProgressMatches, (state) => ({
    ...state,
    status: "loading" as const,
    error: null,
  })),
  on(loadInProgressMatchesSuccess, (state, { matches }) => ({
    ...state,
    matches,
    status: "loaded" as const,
    error: null,
  })),
  on(loadInProgressMatchesFailure, (state, { error }) => ({
    ...state,
    status: "error" as const,
    error,
  })),
);

export const solutionReducers: ActionReducerMap<AppState> = {
  scoreboard: scoreboardReducer,
  navigation: navigationReducer,
};

export const selectScoreBoard = createSelector(
  selectScoreboardFeature,
  ({ homeScore, awayScore }): ScoreBoard => ({ homeScore, awayScore }),
);
export const selectMatchsInProgress = createSelector(
  selectScoreboardFeature,
  ({ matches, status, error }): MatchesPanelState => ({
    matches,
    status,
    error,
  }),
);

@Injectable()
export class SolutionMatchEffects {
  private readonly actions$ = inject(Actions);
  private readonly matchScoresService = inject(MatchScoresService);

  readonly loadMatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInProgressMatches),
      exhaustMap(() =>
        this.matchScoresService.getInProgressMatches().pipe(
          map((matches) => loadInProgressMatchesSuccess({ matches })),
          catchError((error: unknown) =>
            of(
              loadInProgressMatchesFailure({
                error:
                  error instanceof Error
                    ? error.message
                    : "Une erreur inattendue est survenue.",
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
