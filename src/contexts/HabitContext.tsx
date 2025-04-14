
import { createContext, useContext, useState, ReactNode } from "react";

// Types
export type HabitStatus = "active" | "archived";
export type HabitCompletionStatus = "completed" | "pending" | "missed";

export interface Habit {
  id: number;
  name: string;
  description: string;
  frequency: string;
  timeOfDay: string;
  streak: number;
  progress: number;
  status: HabitStatus;
  created: string;
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, "id" | "streak" | "progress" | "status" | "created">) => void;
  updateHabit: (id: number, habit: Partial<Habit>) => void;
  deleteHabit: (id: number) => void;
  markHabitComplete: (id: number) => void;
  archiveHabit: (id: number) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

// Initial mock data
const initialHabits: Habit[] = [
  { 
    id: 1, 
    name: "Morning Meditation", 
    description: "10 minutes of mindfulness practice",
    frequency: "Daily",
    timeOfDay: "Morning",
    streak: 7, 
    progress: 70, 
    status: "active",
    created: "2023-04-01",
  },
  { 
    id: 2, 
    name: "Read 30 minutes", 
    description: "Read non-fiction books to learn new things",
    frequency: "Daily",
    timeOfDay: "Evening",
    streak: 3, 
    progress: 30, 
    status: "active",
    created: "2023-04-05",
  },
  { 
    id: 3, 
    name: "Exercise", 
    description: "30 minutes of physical activity",
    frequency: "3 times a week",
    timeOfDay: "Afternoon",
    streak: 0, 
    progress: 0, 
    status: "active",
    created: "2023-04-10",
  },
  { 
    id: 4, 
    name: "Journaling", 
    description: "Write down thoughts and gratitude",
    frequency: "Daily",
    timeOfDay: "Evening",
    streak: 5, 
    progress: 50, 
    status: "active",
    created: "2023-03-15",
  },
  { 
    id: 5, 
    name: "Drink water", 
    description: "Drink 8 glasses of water throughout the day",
    frequency: "Daily",
    timeOfDay: "All day",
    streak: 10, 
    progress: 100, 
    status: "active",
    created: "2023-02-20",
  },
  { 
    id: 6, 
    name: "Learn a language", 
    description: "Practice foreign language for 15 minutes",
    frequency: "Daily",
    timeOfDay: "Afternoon",
    streak: 2, 
    progress: 20, 
    status: "active",
    created: "2023-04-15",
  },
];

const HabitContext = createContext<HabitContextType | null>(null);

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>(initialHabits);
  const [filterStatus, setFilterStatus] = useState("all");

  const addHabit = (newHabit: Omit<Habit, "id" | "streak" | "progress" | "status" | "created">) => {
    const habit: Habit = {
      id: Date.now(), // Simple unique ID
      ...newHabit,
      streak: 0,
      progress: 0,
      status: "active",
      created: new Date().toISOString().split("T")[0],
    };
    setHabits([...habits, habit]);
  };

  const updateHabit = (id: number, updatedData: Partial<Habit>) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, ...updatedData } : habit
      )
    );
  };

  const deleteHabit = (id: number) => {
    console.log(`Deleting habit with id: ${id}`);
    const updatedHabits = habits.filter((habit) => habit.id !== id);
    console.log(`Habits before deletion: ${habits.length}, after: ${updatedHabits.length}`);
    setHabits(updatedHabits);
  };

  const markHabitComplete = (id: number) => {
    setHabits(
      habits.map((habit) => {
        if (habit.id === id) {
          const newStreak = habit.streak + 1;
          const newProgress = Math.min(100, habit.progress + 10);
          return { ...habit, streak: newStreak, progress: newProgress };
        }
        return habit;
      })
    );
  };

  const archiveHabit = (id: number) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id ? { ...habit, status: "archived" } : habit
      )
    );
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        markHabitComplete,
        archiveHabit,
        filterStatus,
        setFilterStatus,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};
