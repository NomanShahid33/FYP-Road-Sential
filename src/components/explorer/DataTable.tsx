import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { anomalies, type Anomaly } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface DataTableProps {
  data?: Anomaly[];
  onViewOnMap?: (anomaly: Anomaly) => void;
  filters?: {
    severity: string;
    type: string;
    sector: string;
  };
}

export function DataTable({ data = anomalies, onViewOnMap, filters }: DataTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter data
  let filteredData = data;
  if (filters) {
    if (filters.severity && filters.severity !== 'all') {
      filteredData = filteredData.filter(a => a.severity === filters.severity);
    }
    if (filters.type && filters.type !== 'all') {
      filteredData = filteredData.filter(a => a.type === filters.type);
    }
    if (filters.sector && filters.sector !== 'all') {
      filteredData = filteredData.filter(a => a.sector === filters.sector);
    }
  }

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'Severe':
        return 'severity-severe';
      case 'Moderate':
        return 'severity-moderate';
      case 'Minor':
        return 'severity-minor';
      default:
        return '';
    }
  };

  const formatType = (type: string) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-panel overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr className="bg-muted/30">
              <th>Preview</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Confidence</th>
              <th>Location</th>
              <th>Detected</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((anomaly, index) => (
              <motion.tr
                key={anomaly.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>
                  <div className="w-16 h-12 rounded-md overflow-hidden bg-muted">
                    <img
                      src={anomaly.thumbnail}
                      alt={anomaly.type}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td>
                  <span className="font-medium text-foreground">
                    {formatType(anomaly.type)}
                  </span>
                </td>
                <td>
                  <span className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    getSeverityClass(anomaly.severity)
                  )}>
                    {anomaly.severity}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${anomaly.confidence * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {(anomaly.confidence * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-foreground">{anomaly.road}</p>
                      <p className="text-xs text-muted-foreground">{anomaly.sector}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-sm text-muted-foreground">
                    {formatDate(anomaly.timestamp)}
                  </span>
                </td>
                <td>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1.5 text-primary hover:text-primary"
                    onClick={() => onViewOnMap?.(anomaly)}
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t border-border">
        <p className="text-sm text-muted-foreground">
          Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredData.length)} of {filteredData.length}
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentPage(page)}
              className="w-8"
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
