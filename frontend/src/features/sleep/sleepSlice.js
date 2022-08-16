import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sleepService from "./sleepService";

const initialState = {
  sleep: null,
  sleepData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  daysBack: 7,
};

export const createSleepEntry = createAsyncThunk(
  "sleep/createSleepEntry",
  async (sleepData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sleepService.createSleepEntry(sleepData, token);
    } catch (e) {
      const message = e.response.data.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSleepEntries = createAsyncThunk(
  "sleep/getSleepEntries",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const daysBack = thunkAPI.getState().sleep.daysBack;
      return await sleepService.getSleepEntries(token, daysBack);
    } catch (e) {
      const message =
        (e.response && e.response.data && e.data.message) ||
        e.message ||
        e.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteSleepEntry = createAsyncThunk(
  "sleep/deleteSleepEntry",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sleepService.deleteSleepEntry(id, token);
    } catch (e) {
      const message = e.response.data.message || e.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sleepSlice = createSlice({
  name: "sleep",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    setDaysBack: (state, action) => {
      state.daysBack = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSleepEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSleepEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sleepData.push(action.payload);
      })
      .addCase(createSleepEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSleepEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSleepEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sleepData = action.payload;
      })
      .addCase(getSleepEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.sleepData = null;
      })
      .addCase(deleteSleepEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSleepEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sleepData.filter((sleep) => sleep._id !== action.payload._id);
      })
      .addCase(deleteSleepEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setDaysBack } = sleepSlice.actions;
export default sleepSlice.reducer;
