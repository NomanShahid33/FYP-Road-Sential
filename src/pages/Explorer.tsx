import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { DataTable } from '@/components/explorer/DataTable';
import { FilterBar } from '@/components/explorer/FilterBar';
import { DetailPanel } from '@/components/dashboard/DetailPanel';
import { anomalies, stats, type Anomaly } from '@/data/mockData';
import { motion } from 'framer-motion';

export default function Explorer() {
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);
  const [filters, setFilters] = useState({
    severity: 'all',
    type: 'all',
    sector: 'all',
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      severity: 'all',
      type: 'all',
      sector: 'all',
    });
  };

  return (
    <MainLayout
      title="Anomaly Explorer"
      subtitle="Browse and filter all detected road anomalies"
    >
      {/* Summary Stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
      >
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground">Total Records</p>
          <p className="text-2xl font-bold text-foreground">{anomalies.length}</p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground">Severe Issues</p>
          <p className="text-2xl font-bold text-destructive">{stats.severeCount}</p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground">Moderate</p>
          <p className="text-2xl font-bold text-warning">{stats.moderateCount}</p>
        </div>
        <div className="glass-panel p-4">
          <p className="text-xs text-muted-foreground">Minor</p>
          <p className="text-2xl font-bold text-success">{stats.minorCount}</p>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <div className="mb-4">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
      </div>

      {/* Data Table */}
      <DataTable
        data={anomalies}
        filters={filters}
        onViewOnMap={setSelectedAnomaly}
      />

      {/* Detail Panel */}
      <DetailPanel
        anomaly={selectedAnomaly}
        onClose={() => setSelectedAnomaly(null)}
      />
    </MainLayout>
  );
}
