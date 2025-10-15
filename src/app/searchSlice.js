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
      const data = res.data; // Assuming ApiResponse wraps it
      return data;
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
    searchContent: ""
  },
  reducers: {
    changeIsSearchBoxSelected: (state,action)=>{
        console.log("in the changeIsSearchBoxSelected");
        state.isSearchBoxSelected = action.payload;
        console.log(state.isSearchBoxSelected);
    },
    changeSearchContant: (state,action)=>{
      state.searchContent = action.payload
      console.log(state.searchContent);
    }
  },
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
        console.log("searchVideo.fulfilled action:"+ action);
        console.log(`searchVideo.fulfilled state: ${state}`);
        console.log("action paylaod:")
        console.log(action);
        state.loading = false;
        state.videos = action.payload.data.docs;
        console.log(state.videos);
        state.error = null;
        state.isSearchBoxSelected=true;
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

export const {changeIsSearchBoxSelected, changeSearchContant} = searchSlice.actions;
export default searchSlice.reducer;