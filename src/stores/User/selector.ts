import get from "lodash/get";
import reduce from "lodash/reduce";
import { createSelector } from "reselect";

const baseState = (state: any) => get(state, "singleUser") || {};

export const loading = createSelector(baseState, (state) =>
  get(state, "loading")
);

export const user = createSelector(baseState, (state) => get(state, "user"));

export const userLanguages = createSelector(baseState, (state) => {
  return (
    reduce(
      get(state, "user.repos"),
      (acc, item) => {
        if (item.language) {
          // @ts-ignore
          acc[item.language] = (acc[item.language] || 0) + 1;
        }
        return acc;
      },
      {}
    ) || {}
  );
});

export const userRepos = createSelector(baseState, (state) => {
  return get(state, "user.repos") ? (
    [...get(state, "user.repos")].sort(
      // @ts-ignore
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    )
  ) : [];
});
