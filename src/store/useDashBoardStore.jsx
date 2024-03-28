import { create } from "zustand";
import { ClientEnum } from "../ClientEnum";

const useDashboardStore = create((set) => ({
  dashboardText: "All Books",
  currentRole: ClientEnum.GUEST_TYPE,
  dashboardColor: "#1976d2",
  setDashboardText: (text) => set({ dashboardText: text }),
  setDashboardColor: (color) => set({ dashboardColor: color }),
  setCurrentRole: (role) => set({ currentRole: role }),
}));
export default useDashboardStore;
