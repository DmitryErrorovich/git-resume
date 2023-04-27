import { createSlice } from "@reduxjs/toolkit";
import { fetchUserAction, fetchUserReposAction } from "./actions";

export type Cell = {
  id: number;
  info: string;
  hovered: boolean;
};

export interface IInitialState {
  user: any;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

export const userReducer = createSlice({
  name: "cells",
  initialState: {
    user: null,
    loading: "idle",
  } as IInitialState,
  reducers: {
    cleanStore: (state) => ({
      ...state,
      user: null,
      loading: 'idle',
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserAction.fulfilled, (state: any, action: any) => {
      return {
        ...state,
        user: action.payload,
        loading: "succeeded",
      };
    });
    builder.addCase(fetchUserAction.pending, (state: any, action: any) => ({
      ...state,
      loading: "pending",
    }));
    builder.addCase(fetchUserAction.rejected, (state: any, action: any) => ({
      ...state,
      ...action.payload,
      loading: "failed",
    }));
    builder.addCase(fetchUserReposAction.fulfilled, (state: any, action: any) => {
      return {
        ...state,
        user: {
            ...state.user,
            repos: action.payload
        },
        loading: "succeeded",
      };
    });
    builder.addCase(fetchUserReposAction.pending, (state: any, action: any) => ({
      ...state,
      loading: "pending",
    }));
    builder.addCase(fetchUserReposAction.rejected, (state: any, action: any) => ({
      ...state,
      ...action.payload,
      loading: "failed",
    }));
  },
});

export const { cleanStore } = userReducer.actions;

export default userReducer.reducer;
