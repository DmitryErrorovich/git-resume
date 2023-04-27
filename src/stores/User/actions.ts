import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./userApi";

export const fetchUserAction = createAsyncThunk(
  "FETCH_USER",
  async (username: string) => {
    const response = await api.get(username);
    return response.data;
  }
);

export const fetchUserReposAction = createAsyncThunk(
  "FETCH_USER_REPOS",
  async (username: string) => {
    const response = await api.get(`${username}/repos`);
    return response.data;
  }
);
