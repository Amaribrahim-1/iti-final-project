import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: 'light',

      toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light'
        set({ theme: nextTheme })
      },
    }),
    {
      name: 'theme',
      // cspell:ignore partialize
      partialize: (state) => ({ theme: state.theme }),
    },
  ),
)

export default useThemeStore
