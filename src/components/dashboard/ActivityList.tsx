import { motion } from 'framer-motion';
import { FileVideo, CheckCircle2, Clock, AlertCircle, Loader2 } from 'lucide-react';
import { recentActivities, type Activity } from '@/data/mockData';
import { cn } from '@/lib/utils';

export function ActivityList() {
  const getStatusIcon = (status: Activity['status']) => {
    switch (status) {
      case 'Processed':
        return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'Processing':
        return <Loader2 className="w-4 h-4 text-primary animate-spin" />;
      case 'In Queue':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'Failed':
        return <AlertCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: Activity['status']) => {
    const styles = {
      Processed: 'bg-success/10 text-success border-success/20',
      Processing: 'bg-primary/10 text-primary border-primary/20',
      'In Queue': 'bg-warning/10 text-warning border-warning/20',
      Failed: 'bg-destructive/10 text-destructive border-destructive/20',
    };
    return styles[status];
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-panel p-5"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
        <button className="text-xs text-primary hover:text-primary/80 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {recentActivities.slice(0, 5).map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0">
              <FileVideo className="w-5 h-5 text-muted-foreground" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {activity.file}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                {getStatusIcon(activity.status)}
                <span className="text-xs text-muted-foreground">
                  {activity.status === 'Processed' 
                    ? `${activity.detected} anomalies detected`
                    : activity.status
                  }
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className={cn(
                'text-xs px-2 py-0.5 rounded-full border',
                getStatusBadge(activity.status)
              )}>
                {activity.status}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatTimestamp(activity.timestamp)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
