
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveCalendar } from "@nivo/calendar"
import { format, parseISO, subMonths } from "date-fns"

type StreakCalendarProps = {
  data: {
    value: number
    day: string
  }[]
}

export function StreakCalendar({ data }: StreakCalendarProps) {
  const today = new Date()
  const sixMonthsAgo = subMonths(today, 6)
  
  return (
    <Card className="col-span-full">
      <CardHeader>
        <CardTitle>Consistency Calendar</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px]">
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveCalendar
            data={data}
            from={format(sixMonthsAgo, "yyyy-MM-dd")}
            to={format(today, "yyyy-MM-dd")}
            emptyColor="#eeeeee"
            colors={[
              "#E5DEFF",
              "#D6BCFA", 
              "#9b87f5",
              "#7E69AB",
              "#6E59A5"
            ]}
            margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
            yearSpacing={40}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "row",
                translateY: 36,
                itemCount: 4,
                itemWidth: 42,
                itemHeight: 36,
                itemsSpacing: 14,
                itemDirection: "right-to-left"
              }
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}
