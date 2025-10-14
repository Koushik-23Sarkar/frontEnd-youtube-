const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
import axios from "axios";

export const searchVideo = createAsyncThunk(
  "search/video",
  async (params, { rejectWithValue }) => {
    console.log(params);
    try {
      const res = await axios.get("http://localhost:8000/api/v1/videos", {
        ...params,
      });
      const data = res; // Assuming ApiResponse wraps it
      console.log(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    isSearchBoxSelected: false,
    videos: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchVideo.pending, (state, action) => {
        console.log(`searchVideo.pending action: ${action}`);
        console.log(`searchVideo.pending state: ${state}`);
        state.loading = true;
        state.error = null;
        state.videos = null;
        state.isSearchBoxSelected=false;
      })
      .addCase(searchVideo.fulfilled, (state, action) => {
        console.log(`searchVideo.fulfilled action: ${action}`);
        console.log(`searchVideo.fulfilled state: ${state}`);
        state.loading = true;
        state.videos = action.payload;
        state.error = null;
        state.isSearchBoxSelected=false;
      })
      .addCase(searchVideo.rejected, (state) => {
        console.log(`searchVideo.rejected action: ${action}`);
        console.log(`searchVideo.rejected state: ${state}`);
        state.loading = false;
        state.error =
            action.payload?.message || "something wants worng while searching";
        state.videos = null;
        state.isSearchBoxSelected=false;
      });
  },
});


export default searchSlice.reducer;