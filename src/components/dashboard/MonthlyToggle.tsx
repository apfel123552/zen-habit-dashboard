
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

type MonthlyToggleProps = {
  currentMonth: Date
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
}

export function MonthlyToggle({ 
  currentMonth, 
  onPrevious, 
  onNext, 
  onReset 
}: MonthlyToggleProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={onPrevious}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="min-w-[120px] text-center font-medium">
          {format(currentMonth, "MMMM yyyy")}
        </div>
        <Button 
          variant="outline" 
          size="icon"
          onClick={onNext}
          aria-label="Next month"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <Button 
        variant="outline"
        onClick={onReset}
        className="ml-2 text-xs"
      >
        Reset Month
      </Button>
    </div>
  )
}
