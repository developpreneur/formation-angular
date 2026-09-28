import {
  createAction,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
  props,
} from "@ngrx/store";
import {
  DashboardPanel,
  MatchScore,
  MatchesPanelState,
  ScoreBoard,
  Team,
} from "./shared";

export interface ScoreboardState extends ScoreBoard, MatchesPanelState {}

export interface NavigationState {
  activePanel: DashboardPanel;
}

export interface AppState {
  scoreboard: ScoreboardState;
  navigation: NavigationState;
}

export const INITIAL_SCOREBOARD_STATE: ScoreboardState = {
  homeScore: 0,
  awayScore: 0,
  matches: [],
  status: "idle",
  error: null,
};

const INITIAL_NAVIGATION_STATE: NavigationState = {
  activePanel: "score",
};

export const addPoints = createAction(
  "[Tableau] Ajouter des points",
  props<{ team: Team; points: number }>(),
);
export const selectPanel = createAction(
  "[Tableau] Sélectionner un panneau",
  props<{ panel: DashboardPanel }>(),
);
export const loadInProgressMatches = createAction(
  "[Matchs] Charger les matchs en cours",
);
export const loadInProgressMatchesSuccess = createAction(
  "[Matchs] Chargement réussi",
  props<{ matches: readonly MatchScore[] }>(),
);
export const loadInProgressMatchesFailure = createAction(
  "[Matchs] Échec du chargement",
  props<{ error: string }>(),
);

export const navigationReducer = createReducer(
  INITIAL_NAVIGATION_STATE,
  on(selectPanel, (state, { panel }) => ({ ...state, activePanel: panel })),
);

const selectNavigationFeature =
  createFeatureSelector<NavigationState>("navigation");

export const selectScoreboardFeature =
  createFeatureSelector<ScoreboardState>("scoreboard");

export const selectActivePanel = createSelector(
  selectNavigationFeature,
  (state) => state.activePanel,
);
