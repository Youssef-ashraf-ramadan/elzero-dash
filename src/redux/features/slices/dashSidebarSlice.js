import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDashSidebarOpen: true,
};

const dashSidebarSlice = createSlice({
  name: "dashSidebar",
  initialState,
  reducers: {
    toggleDashSidebar: (state) => {
      state.isDashSidebarOpen = !state.isDashSidebarOpen;
    },
    openDashSidebar: (state) => {
      state.isDashSidebarOpen = true;
    },
    closeDashSidebar: (state) => {
      state.isDashSidebarOpen = false;
    },
  },
});

export const { toggleDashSidebar, openDashSidebar, closeDashSidebar } =
  dashSidebarSlice.actions;
export default dashSidebarSlice.reducer;
