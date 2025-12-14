import { create } from "zustand";

interface CountMessage {
  unreadMessageCount: number;
  setUnreadMessageCount: (count: number | ((prev: number) => number)) => void;
}

const useStore = create<CountMessage>((set) => ({
  unreadMessageCount: 0,
  setUnreadMessageCount: (count) =>
    set((state) => ({
      unreadMessageCount:
        typeof count === "function" ? count(state.unreadMessageCount) : count,
    })),
}));

export default useStore;
