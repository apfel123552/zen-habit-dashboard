
import { useState } from "react";
import { 
  addMonths, 
  format, 
  startOfMonth,
  subMonths, 
  subDays,
} from "date-fns";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { HabitSummary } from "@/components/dashboard/HabitSummary";
import { HabitCard } from "@/components/dashboard/HabitCard";
import { MonthlyToggle } from "@/components/dashboard/MonthlyToggle";
import { StreakCalendar } from "@/components/dashboard/StreakCalendar";
import { HabitStats } from "@/components/dashboard/HabitStats";
import { Button } from "@/components/ui/button";
import { HabitFormDialog } from "@/components/habits/HabitFormDialog";
import { useHabits } from "@/contexts/HabitContext";
import { useToast } from "@/hooks/use-toast";

// Generate mock calendar data
const generateCalendarData = () => {
  return Array.from({ length: 180 }, (_, i) => {
    const date = subMonths(new Date(), 6);
    date.setDate(date.getDate() + i);
    
    return {
      day: format(date, "yyyy-MM-dd"),
      value: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
    };
  });
};

const Index = () => {
  const { habits, addHabit } = useHabits();
  const { toast } = useToast();
  
  const [currentMonth, setCurrentMonth] = useState<Date>(startOfMonth(new Date()));
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Get only active habits
  const activeHabits = habits.filter(h => h.status === "active");
  
  // Generate stats data based on current habits
  const statsData = activeHabits.map((habit) => ({
    name: habit.name,
    value: habit.streak,
  }));

  // Generate calendar data
  const calendarData = generateCalendarData();
  
  const handlePreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  
  const handleResetMonth = () => {
    toast({
      title: "Month Reset",
      description: "Habits have been reset for the new month."
    });
  };

  const handleAddHabit = (data: {
    name: string;
    description: string;
    frequency: string;
    timeOfDay: string;
  }) => {
    addHabit(data);
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
                  <Button 
                    className="bg-zen-purple hover:bg-zen-purple-dark"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Add New Habit
                  </Button>
                </div>
              </header>
              
              {/* Summary Cards */}
              <HabitSummary 
                totalHabits={activeHabits.length}
                completedToday={activeHabits.filter(h => h.progress === 100).length}
                currentStreak={Math.max(...activeHabits.map(h => h.streak), 0)}
                bestStreak={21} // Hard-coded for now
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
                {activeHabits.map((habit) => (
                  <HabitCard 
                    key={habit.id}
                    name={habit.name}
                    streak={habit.streak}
                    progress={habit.progress}
                    status={habit.progress === 100 ? "completed" : (habit.progress > 0 ? "pending" : "missed")}
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

      {/* Add Habit Dialog */}
      <HabitFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddHabit}
        mode="add"
      />
    </SidebarProvider>
  );
};

export default Index;
