
import { useState } from "react";
import { 
  addMonths, 
  format, 
  startOfMonth,
  subMonths, 
} from "date-fns";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { HabitSummary } from "@/components/dashboard/HabitSummary";
import { HabitCard } from "@/components/dashboard/HabitCard";
import { MonthlyToggle } from "@/components/dashboard/MonthlyToggle";
import { StreakCalendar } from "@/components/dashboard/StreakCalendar";
import { HabitStats } from "@/components/dashboard/HabitStats";
import { Button } from "@/components/ui/button";

// Mock data
const habits = [
  { id: 1, name: "Morning Meditation", streak: 7, progress: 70, status: "completed" as const },
  { id: 2, name: "Read 30 minutes", streak: 3, progress: 30, status: "pending" as const },
  { id: 3, name: "Exercise", streak: 0, progress: 0, status: "missed" as const },
  { id: 4, name: "Journaling", streak: 5, progress: 50, status: "completed" as const },
  { id: 5, name: "Drink water", streak: 10, progress: 100, status: "completed" as const },
  { id: 6, name: "Learn a language", streak: 2, progress: 20, status: "pending" as const },
];

const calendarData = Array.from({ length: 180 }, (_, i) => {
  const date = subMonths(new Date(), 6);
  date.setDate(date.getDate() + i);
  
  return {
    day: format(date, "yyyy-MM-dd"),
    value: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
  };
});

const statsData = [
  { name: "Meditation", value: 22 },
  { name: "Reading", value: 15 },
  { name: "Exercise", value: 8 },
  { name: "Journaling", value: 18 },
  { name: "Water", value: 30 },
  { name: "Language", value: 12 },
];

const Index = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const handleResetMonth = () => {
    // In a real app, this would reset or update the habit list
    alert("Month reset feature would update habit goals here");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex flex-col gap-6">
              <header className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                  <p className="text-muted-foreground">
                    Track your habits and stay consistent
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="md:hidden" />
                  <Button className="bg-zen-purple hover:bg-zen-purple-dark">
                    Add New Habit
                  </Button>
                </div>
              </header>
              
              {/* Summary Cards */}
              <HabitSummary 
                totalHabits={habits.length}
                completedToday={habits.filter(h => h.status === "completed").length}
                currentStreak={7}
                bestStreak={21}
              />
              
              {/* Month Navigation */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Current Habits</h2>
                <MonthlyToggle 
                  currentMonth={currentMonth}
                  onPrevious={handlePreviousMonth}
                  onNext={handleNextMonth}
                  onReset={handleResetMonth}
                />
              </div>
              
              {/* Habit Cards */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {habits.map((habit) => (
                  <HabitCard 
                    key={habit.id}
                    name={habit.name}
                    streak={habit.streak}
                    progress={habit.progress}
                    status={habit.status}
                  />
                ))}
              </div>
              
              {/* Analytics Section */}
              <h2 className="text-2xl font-bold mt-6">Analytics</h2>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                <HabitStats 
                  title="Monthly Completion Rate" 
                  data={statsData}
                />
                <StreakCalendar data={calendarData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
