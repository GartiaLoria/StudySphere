import { create } from "zustand";
import { persist } from "zustand/middleware";
import { decodeToken } from "react-jwt";

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      isLoggedIn: false,
      user: null,

      // Initialize authentication state
      initializeAuth: () => {
        const token = get().token; // Auto-retrieved from Zustand's persist
        if (token) {
          const decodedData = decodeToken(token);
          if (decodedData) {
            set({
              isLoggedIn: true,
              user: decodedData?.user || null,
            });
          } else {
            set({ token: null, isLoggedIn: false, user: null }); // Auto-logout if token is invalid
          }
        }
      },

      // Login: Stores token & user data automatically
      login: (token) => {
        const decodedData = decodeToken(token);
        if (!decodedData) return; // Prevent setting invalid data
        set({
          token,
          isLoggedIn: true,
          user: decodedData?.user || null,
        });
      },

      // Logout: Clears stored data
      logout: () => {
        set({
          token: null,
          isLoggedIn: false,
          user: null,
        });
      },
    }),
    {
      name: "jwtTokenStore", // Key used in localStorage
    }
  )
);

// ✅ Ensure initializeAuth is called on app load
useAuthStore.getState().initializeAuth();

export default useAuthStore;
