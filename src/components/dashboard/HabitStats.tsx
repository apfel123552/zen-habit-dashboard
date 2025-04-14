
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveBar } from "@nivo/bar"

type HabitStatsProps = {
  title: string
  data: {
    name: string
    value: number
  }[]
}

export function HabitStats({ title, data }: HabitStatsProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-[200px]">
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveBar
            data={data}
            keys={["value"]}
            indexBy="name"
            margin={{ top: 10, right: 10, bottom: 50, left: 60 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={["hsl(var(--primary))"]}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            role="application"
            ariaLabel="Habit statistics chart"
          />
        </div>
      </CardContent>
    </Card>
  )
}
