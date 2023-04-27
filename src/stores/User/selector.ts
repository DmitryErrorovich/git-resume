import get from "lodash/get";
import { createSelector } from "reselect";

const baseState = (state: any) => get(state, "singleUser") || {};

export const loading = createSelector(baseState, (state) =>
  get(state, "loading")
);

export const user = createSelector(baseState, (state) => get(state, "user"));

// TODO: need repos 
