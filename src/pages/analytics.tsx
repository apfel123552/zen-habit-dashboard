
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveBar } from "@nivo/bar";
import { ResponsiveLine } from "@nivo/line";
import { ResponsiveCalendar } from "@nivo/calendar";
import { format, subMonths, subDays } from "date-fns";

// Mock data for streak chart
const streakData = [
  {
    id: "streak",
    data: Array.from({ length: 30 }, (_, i) => ({
      x: format(subDays(new Date(), 30 - i), "MMM dd"),
      y: Math.floor(Math.random() * 10),
    })),
  },
];

// Mock data for habit completion
const completionData = [
  { habit: "Meditation", completed: 22, target: 30 },
  { habit: "Reading", completed: 15, target: 30 },
  { habit: "Exercise", completed: 8, target: 12 },
  { habit: "Journaling", completed: 18, target: 30 },
  { habit: "Water", completed: 30, target: 30 },
  { habit: "Language", completed: 12, target: 20 },
];

// Mock data for heat map
const calendarData = Array.from({ length: 180 }, (_, i) => {
  const date = subMonths(new Date(), 6);
  date.setDate(date.getDate() + i);
  
  return {
    day: format(date, "yyyy-MM-dd"),
    value: Math.random() > 0.3 ? Math.floor(Math.random() * 5) : 0
  };
});

// Format data for completion rate chart
const completionRateData = completionData.map(item => ({
  habit: item.habit,
  completed: (item.completed / item.target) * 100,
}));

const AnalyticsPage = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex flex-col gap-6">
              <header className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
                  <p className="text-muted-foreground">
                    Visualize your habit tracking progress
                  </p>
                </div>
                <SidebarTrigger className="md:hidden" />
              </header>
              
              {/* Streak Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Daily Streak Timeline</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div style={{ height: '100%', width: '100%' }}>
                    <ResponsiveLine
                      data={streakData}
                      margin={{ top: 20, right: 20, bottom: 50, left: 50 }}
                      xScale={{ type: 'point' }}
                      yScale={{
                        type: 'linear',
                        min: 0,
                        max: 'auto',
                        stacked: false,
                        reverse: false
                      }}
                      curve="natural"
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: 'Date',
                        legendOffset: 46,
                        legendPosition: 'middle'
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Count',
                        legendOffset: -40,
                        legendPosition: 'middle'
                      }}
                      colors={["hsl(var(--primary))"]}
                      pointSize={10}
                      pointColor={{ theme: 'background' }}
                      pointBorderWidth={2}
                      pointBorderColor={{ from: 'serieColor' }}
                      pointLabelYOffset={-12}
                      useMesh={true}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Habit Completion Rate */}
              <Card>
                <CardHeader>
                  <CardTitle>Habit Completion Rate (%)</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div style={{ height: '100%', width: '100%' }}>
                    <ResponsiveBar
                      data={completionRateData}
                      keys={['completed']}
                      indexBy="habit"
                      margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
                      padding={0.3}
                      valueScale={{ type: 'linear' }}
                      indexScale={{ type: 'band', round: true }}
                      colors={["hsl(var(--primary))"]}
                      borderRadius={4}
                      axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -45,
                        legend: 'Habit',
                        legendPosition: 'middle',
                        legendOffset: 40
                      }}
                      axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Completion Rate (%)',
                        legendPosition: 'middle',
                        legendOffset: -50
                      }}
                      labelSkipWidth={12}
                      labelSkipHeight={12}
                      labelTextColor={{
                        from: 'color',
                        modifiers: [['darker', 1.6]]
                      }}
                      animate={true}
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* 6 Month Calendar View */}
              <Card>
                <CardHeader>
                  <CardTitle>6 Month Activity Heatmap</CardTitle>
                </CardHeader>
                <CardContent className="h-[220px]">
                  <div style={{ height: '100%', width: '100%' }}>
                    <ResponsiveCalendar
                      data={calendarData}
                      from={format(subMonths(new Date(), 6), "yyyy-MM-dd")}
                      to={format(new Date(), "yyyy-MM-dd")}
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
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

export default AnalyticsPage;
