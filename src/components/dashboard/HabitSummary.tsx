
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BrainCircuit, Calendar, ListTodo, Zap } from "lucide-react"

type HabitSummaryProps = {
  totalHabits: number
  completedToday: number
  currentStreak: number
  bestStreak: number
}

export function HabitSummary({ 
  totalHabits, 
  completedToday, 
  currentStreak, 
  bestStreak 
}: HabitSummaryProps) {
  const summaryItems = [
    {
      title: "Total Habits",
      value: totalHabits,
      icon: ListTodo,
      color: "text-zen-purple",
      bgColor: "bg-zen-soft-purple",
    },
    {
      title: "Completed Today",
      value: completedToday,
      icon: Calendar,
      color: "text-green-500",
      bgColor: "bg-zen-soft-green",
    },
    {
      title: "Current Streak",
      value: currentStreak,
      icon: Zap,
      color: "text-amber-500",
      bgColor: "bg-zen-soft-yellow",
    },
    {
      title: "Best Streak",
      value: bestStreak,
      icon: BrainCircuit,
      color: "text-blue-500",
      bgColor: "bg-zen-soft-blue",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {summaryItems.map((item) => (
        <Card key={item.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`${item.bgColor} p-2 rounded-full`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
