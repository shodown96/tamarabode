import { type Project, type Quote } from '@/lib/sanity'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface State {
    triggered: boolean
    loading: boolean
    projects: Project[]
    quotes: Quote[]
}

interface Actions {
    setTriggered: (triggered: boolean) => void
    setLoading: (loading: boolean) => void
    setProjects: (projects: Project[]) => void
    setQuotes: (quotes: Quote[]) => void
    resetStore: () => void
}

const initialState: State = {
    loading: true,
    triggered: false,
    projects: [],
    quotes: [],
}

export const useAppStore = create(
    persist<State & Actions>(
        (set) => ({
            ...initialState,
            setTriggered: (triggered) => set({ triggered }),
            setLoading: (loading) => set({ loading }),
            setProjects: (projects) => set({ projects }),
            setQuotes: (quotes) => set({ quotes }),
            resetStore: () => set(initialState),
        }),
        {
            name: 'app-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)