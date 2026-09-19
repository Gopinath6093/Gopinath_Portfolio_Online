import { create } from "zustand";

type PortfolioState = {
  booting: boolean;
  setBooting: (value: boolean) => void;
  activeSection: string;
  setActiveSection: (value: string) => void;
};

export const usePortfolioStore = create<PortfolioState>((set) => ({
  booting: true,
  setBooting: (value) => set({ booting: value }),
  activeSection: "home",
  setActiveSection: (value) => set({ activeSection: value }),
}));
