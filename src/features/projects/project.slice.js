import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../common/constants";
import { read } from "./projects.service.js";

const fetchProject = createAsyncThunk(
  "project/projectFetched",
  (data, { getState }) => {
    const { status } = getState().coin;
    if (status !== STATUS.loading) return;
    return read(data);
  }
);

const initialState = {
  coin: {},
  status: STATUS.idle,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectReset(state) {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProject.pending, (state, action) => {
        if (state.status === STATUS.idle) {
          state.status = STATUS.loading;
        }
      })
      .addCase(fetchProject.fulfilled, (state, { payload }) => {
        if (state.status === STATUS.loading) {
          state.status = STATUS.idle;
          state.coin = payload;
        }
      })
      .addCase(fetchProject.rejected, (state, { error: { message } }) => {
        if (state.status === STATUS.loading) {
          state.status = STATUS.idle;
          state.error = message;
        }
      });
  },
});

const selectProject = ({ project: { project } }) => project;
const selectFetchProjectStatus = ({ project: { status } }) => status;
const { reducer: projectReducer } = projectSlice;
const { projectReset } = projectSlice.actions;

export {
  projectReducer,
  projectReset,
  fetchProject,
  selectProject,
  selectFetchProjectStatus,
};
