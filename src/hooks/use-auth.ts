// import { create } from "zustand";

// type AuthModalStore = {
//   isAuthOpen: boolean;
//   view: "login" | "register";
//   openAuth: (view?: "login" | "register") => void;
//   closeAuth: () => void;
//   setView: (view: "login" | "register") => void;
// };

// export const useAuth = create<AuthModalStore>((set) => ({
//   isAuthOpen: false,
//   view: "login",
//   openAuth: (view = "login") => set({ isAuthOpen: true, view }),
//   closeAuth: () => set({ isAuthOpen: false }),
//   setView: (view) => set({ view }),
// }));


import { create } from "zustand";

type AuthView = "login" | "register" | "forgot-password";

type AuthModalStore = {
  isAuthOpen: boolean;
  view: AuthView;
  openAuth: (view?: AuthView) => void;
  closeAuth: () => void;
  setView: (view: AuthView) => void;
};

export const useAuth = create<AuthModalStore>((set) => ({
  isAuthOpen: false,
  view: "login",
  openAuth: (view = "login") => set({ isAuthOpen: true, view }),
  closeAuth: () => set({ isAuthOpen: false }),
  setView: (view) => set({ view }),
}));