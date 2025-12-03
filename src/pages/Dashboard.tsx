import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { MapContainer } from '@/components/dashboard/MapContainer';
import { ActivityList } from '@/components/dashboard/ActivityList';
import { DetailPanel } from '@/components/dashboard/DetailPanel';
import { stats, type Anomaly } from '@/data/mockData';
import { AlertTriangle, FileVideo, Gauge, MapPin } from 'lucide-react';

export default function Dashboard() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);

  return (
    <MainLayout 
      title="Dashboard" 
      subtitle="Real-time infrastructure monitoring overview"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Anomalies"
          value={stats.totalAnomalies}
          subtitle={`${stats.severeCount} severe issues`}
          icon={AlertTriangle}
          variant="destructive"
          trend={{ value: 12, isPositive: false }}
          delay={0}
        />
        <StatsCard
          title="Videos Processed"
          value={stats.totalVideosProcessed}
          subtitle="This month"
          icon={FileVideo}
          variant="default"
          trend={{ value: 8, isPositive: true }}
          delay={0.1}
        />
        <StatsCard
          title="Road Health Score"
          value={`${stats.overallHealthScore}%`}
          subtitle="Average across sectors"
          icon={Gauge}
          variant={stats.overallHealthScore >= 70 ? 'success' : stats.overallHealthScore >= 50 ? 'warning' : 'destructive'}
          delay={0.2}
        />
        <StatsCard
          title="Most Affected"
          value={stats.mostAffectedSector}
          subtitle="Requires immediate attention"
          icon={MapPin}
          variant="warning"
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map - Takes 2 columns */}
        <div className="lg:col-span-2">
          <MapContainer
            onMarkerClick={setSelectedAnomaly}
            selectedAnomaly={selectedAnomaly}
          />
        </div>

        {/* Activity List */}
        <div className="lg:col-span-1">
          <ActivityList />
        </div>
      </div>

      {/* Detail Panel */}
      <DetailPanel
        anomaly={selectedAnomaly}
        onClose={() => setSelectedAnomaly(null)}
      />
    </MainLayout>
  );
}
