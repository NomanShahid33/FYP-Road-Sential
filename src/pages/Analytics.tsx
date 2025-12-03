import { MainLayout } from '@/components/layout/MainLayout';
import { ChartCard } from '@/components/analytics/ChartCard';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';
import {
  roadHealthData,
  severityDistribution,
  monthlyTrendData,
  typeDistribution,
} from '@/data/mockData';

const COLORS = {
  primary: '#00E5FF',
  success: '#00C853',
  warning: '#FF9100',
  destructive: '#FF5252',
  muted: '#4A5568',
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-muted-foreground">
            {entry.name}: <span className="text-foreground font-medium">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Analytics() {
  // Transform road health data for chart
  const healthChartData = roadHealthData.map(r => ({
    sector: r.sector,
    health: r.healthIndex,
    anomalies: r.anomalyCount,
    fill: r.healthIndex >= 70 ? COLORS.success : r.healthIndex >= 50 ? COLORS.warning : COLORS.destructive,
  }));

  return (
    <MainLayout
      title="Road Health Analytics"
      subtitle="Insights and trends from infrastructure analysis"
    >
      {/* Top Row - Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Road Health by Sector */}
        <ChartCard
          title="Road Health Index by Sector"
          subtitle="Current health status across all monitored sectors"
          delay={0}
        >
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} tick={{ fill: '#718096', fontSize: 12 }} />
                <YAxis type="category" dataKey="sector" tick={{ fill: '#718096', fontSize: 12 }} width={70} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="health" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {healthChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Severity Distribution */}
        <ChartCard
          title="Severity Distribution"
          subtitle="Breakdown of anomalies by severity level"
          delay={0.1}
        >
          <div className="h-[300px] flex items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {severityDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {severityDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-muted-foreground">{item.name}</span>
                  <span className="text-sm font-medium text-foreground ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend */}
        <ChartCard
          title="Monthly Anomaly Trend"
          subtitle="Detected anomalies over time"
          className="lg:col-span-2"
          delay={0.2}
        >
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" />
                <XAxis dataKey="month" tick={{ fill: '#718096', fontSize: 12 }} />
                <YAxis tick={{ fill: '#718096', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="anomalies"
                  stroke={COLORS.primary}
                  fill="url(#anomalyGradient)"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="processed"
                  stroke={COLORS.success}
                  strokeWidth={2}
                  dot={{ fill: COLORS.success }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Anomalies Detected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Videos Processed</span>
            </div>
          </div>
        </ChartCard>

        {/* Type Distribution */}
        <ChartCard
          title="Anomaly Types"
          subtitle="Distribution by category"
          delay={0.3}
        >
          <div className="space-y-4">
            {typeDistribution.map((type, index) => {
              const total = typeDistribution.reduce((acc, t) => acc + t.value, 0);
              const percentage = Math.round((type.value / total) * 100);
              return (
                <div key={type.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-foreground">{type.name}</span>
                    <span className="text-sm text-muted-foreground">{type.value}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%`, animationDelay: `${index * 0.1}s` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ChartCard>
      </div>

      {/* Heatmap Placeholder */}
      <ChartCard
        title="Geographic Heatmap"
        subtitle="Anomaly density visualization (Coming Soon)"
        className="mt-6"
        delay={0.4}
      >
        <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-lg border border-dashed border-border">
          <p className="text-sm text-muted-foreground">
            {/* TODO: Integrate heatmap visualization with backend data */}
            Heatmap visualization will be available when connected to backend
          </p>
        </div>
      </ChartCard>
    </MainLayout>
  );
}
