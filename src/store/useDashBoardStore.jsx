import { create } from "zustand";

const useDashboardStore = create((set) => ({
    dashboardText: "All Books",
    setDashboardText: (text) => set({ dashboardText: text }),
  }));
export default useDashboardStore;
