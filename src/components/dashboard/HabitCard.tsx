
import { CheckCircle2, Circle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type HabitCardProps = {
  name: string
  streak: number
  progress: number
  status: "completed" | "pending" | "missed"
}

export function HabitCard({ name, streak, progress, status }: HabitCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{name}</CardTitle>
          <StatusIcon status={status} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">Current streak</span>
            </div>
            <div className="font-semibold">
              {streak} {streak === 1 ? 'day' : 'days'}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StatusIcon({ status }: { status: "completed" | "pending" | "missed" }) {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="h-5 w-5 text-green-500" />
    case "pending":
      return <Clock className="h-5 w-5 text-amber-500" />
    case "missed":
      return <Circle className="h-5 w-5 text-gray-300" />
  }
}
