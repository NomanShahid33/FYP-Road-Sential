import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Gauge, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Anomaly } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

interface DetailPanelProps {
  anomaly: Anomaly | null;
  onClose: () => void;
}

export function DetailPanel({ anomaly, onClose }: DetailPanelProps) {
  const navigate = useNavigate();

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
    return new Date(timestamp).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <AnimatePresence>
      {anomaly && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-full max-w-md bg-card border-l border-border z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card/95 backdrop-blur-sm border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Anomaly Details</h2>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Thumbnail */}
              <div className="relative rounded-lg overflow-hidden aspect-video bg-muted">
                <img
                  src={anomaly.thumbnail}
                  alt={`${anomaly.type} anomaly`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span className={cn(
                    'px-3 py-1 rounded-full text-xs font-medium',
                    getSeverityClass(anomaly.severity)
                  )}>
                    {anomaly.severity}
                  </span>
                </div>
              </div>

              {/* Type & ID */}
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {formatType(anomaly.type)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">ID: {anomaly.id}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <MapPin className="w-4 h-4" />
                    <span className="text-xs">Location</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{anomaly.road}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {anomaly.lat.toFixed(4)}, {anomaly.lng.toFixed(4)}
                  </p>
                </div>

                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Gauge className="w-4 h-4" />
                    <span className="text-xs">Confidence</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {(anomaly.confidence * 100).toFixed(0)}%
                  </p>
                  <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${anomaly.confidence * 100}%` }}
                    />
                  </div>
                </div>

                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs">Detected</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(anomaly.timestamp)}
                  </p>
                </div>

                <div className="glass-panel p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-1">
                    <Eye className="w-4 h-4" />
                    <span className="text-xs">Sector</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{anomaly.sector}</p>
                </div>
              </div>

              {/* Description */}
              {anomaly.description && (
                <div className="glass-panel p-4">
                  <p className="text-xs text-muted-foreground mb-2">Description</p>
                  <p className="text-sm text-foreground">{anomaly.description}</p>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button 
                  className="w-full gap-2"
                  onClick={() => navigate('/explorer')}
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Analysis
                </Button>
                <Button variant="outline" className="w-full">
                  Generate Report
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
