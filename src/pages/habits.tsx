
import { useState } from "react";
import { Check, Edit, MoreVertical, Trash } from "lucide-react";
import { format } from "date-fns";

import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { HabitFormDialog } from "@/components/habits/HabitFormDialog";
import { useHabits } from "@/contexts/HabitContext";
import { useToast } from "@/hooks/use-toast";

const HabitsPage = () => {
  const { 
    habits, 
    addHabit, 
    updateHabit, 
    deleteHabit, 
    markHabitComplete, 
    filterStatus, 
    setFilterStatus 
  } = useHabits();
  
  const { toast } = useToast();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentHabit, setCurrentHabit] = useState<typeof habits[0] | null>(null);
  
  // Filter habits based on status
  const filteredHabits = filterStatus === "all" 
    ? habits 
    : habits.filter(habit => habit.status === filterStatus);

  const handleEdit = (habit: typeof habits[0]) => {
    setCurrentHabit(habit);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: number, name: string) => {
    console.log(`Attempting to delete habit: ${id} - ${name}`);
    deleteHabit(id);
    toast({
      title: "Habit deleted",
      description: `"${name}" has been removed from your habits.`,
    });
  };

  const handleMarkComplete = (id: number, name: string) => {
    markHabitComplete(id);
    toast({
      title: "Habit completed",
      description: `Great job completing "${name}"!`,
    });
  };

  const handleAddSubmit = (data: {
    name: string;
    description: string;
    frequency: string;
    timeOfDay: string;
  }) => {
    addHabit(data);
  };

  const handleEditSubmit = (data: {
    name: string;
    description: string;
    frequency: string;
    timeOfDay: string;
  }) => {
    if (currentHabit) {
      updateHabit(currentHabit.id, data);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Habits</h1>
                  <p className="text-muted-foreground">
                    Manage and track your habits
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SidebarTrigger className="md:hidden" />
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setFilterStatus("all")}
                      className={filterStatus === "all" ? "bg-muted" : ""}
                    >
                      All
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setFilterStatus("active")}
                      className={filterStatus === "active" ? "bg-muted" : ""}
                    >
                      Active
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setFilterStatus("archived")}
                      className={filterStatus === "archived" ? "bg-muted" : ""}
                    >
                      Archived
                    </Button>
                  </div>
                  <Button 
                    className="bg-zen-purple hover:bg-zen-purple-dark"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Add New Habit
                  </Button>
                </div>
              </header>
              
              {/* Habit List */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredHabits.map((habit) => (
                  <Card key={habit.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle>{habit.name}</CardTitle>
                          <CardDescription className="mt-1">{habit.description}</CardDescription>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="-mr-2 h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEdit(habit)}>
                              <Edit className="mr-2 h-4 w-4" />
                              <span>Edit Habit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleMarkComplete(habit.id, habit.name)}>
                              <Check className="mr-2 h-4 w-4" />
                              <span>Mark as Complete</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleDelete(habit.id, habit.name)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              <span>Delete Habit</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex flex-col space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <p className="text-muted-foreground">Frequency</p>
                            <p className="font-medium">{habit.frequency}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Time of Day</p>
                            <p className="font-medium">{habit.timeOfDay}</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Monthly Progress</span>
                            <span className="text-sm font-medium">{habit.progress}%</span>
                          </div>
                          <Progress value={habit.progress} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-4 text-xs text-muted-foreground">
                      <div className="flex w-full justify-between">
                        <span>Created {format(new Date(habit.created), "MMM d, yyyy")}</span>
                        <span className="font-medium">Streak: {habit.streak} days</span>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              {/* Empty State */}
              {filteredHabits.length === 0 && (
                <div className="flex h-[300px] flex-col items-center justify-center rounded-lg border border-dashed">
                  <h3 className="text-xl font-medium">No habits found</h3>
                  <p className="text-muted-foreground">
                    {filterStatus === "all" 
                      ? "Get started by creating your first habit" 
                      : `No ${filterStatus} habits found`}
                  </p>
                  <Button 
                    className="mt-4 bg-zen-purple hover:bg-zen-purple-dark"
                    onClick={() => setIsAddDialogOpen(true)}
                  >
                    Add New Habit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Add Habit Dialog */}
      <HabitFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onSubmit={handleAddSubmit}
        mode="add"
      />

      {/* Edit Habit Dialog */}
      {currentHabit && (
        <HabitFormDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSubmit={handleEditSubmit}
          initialValues={{
            name: currentHabit.name,
            description: currentHabit.description,
            frequency: currentHabit.frequency,
            timeOfDay: currentHabit.timeOfDay,
          }}
          mode="edit"
        />
      )}
    </SidebarProvider>
  );
};

export default HabitsPage;
