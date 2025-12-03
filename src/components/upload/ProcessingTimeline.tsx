import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Loader2, AlertCircle } from 'lucide-react';
import { processingSteps, type ProcessingStep } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ProcessingTimelineProps {
  isProcessing: boolean;
  onComplete?: () => void;
}

export function ProcessingTimeline({ isProcessing, onComplete }: ProcessingTimelineProps) {
  const [steps, setSteps] = useState<ProcessingStep[]>(processingSteps);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isProcessing) {
      setSteps(processingSteps.map(s => ({ ...s, status: 'pending' })));
      setCurrentStep(0);
      return;
    }

    // Simulate processing
    const processStep = (stepIndex: number) => {
      if (stepIndex >= steps.length) {
        onComplete?.();
        return;
      }

      // Set current step to processing
      setSteps(prev => prev.map((s, i) => ({
        ...s,
        status: i === stepIndex ? 'processing' : i < stepIndex ? 'completed' : 'pending'
      })));
      setCurrentStep(stepIndex);

      // Complete step after random delay
      const delay = 1000 + Math.random() * 2000;
      setTimeout(() => {
        setSteps(prev => prev.map((s, i) => ({
          ...s,
          status: i <= stepIndex ? 'completed' : 'pending',
          duration: i === stepIndex ? `${(delay / 1000).toFixed(1)}s` : s.duration
        })));
        processStep(stepIndex + 1);
      }, delay);
    };

    processStep(0);
  }, [isProcessing]);

  const getStepIcon = (status: ProcessingStep['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'processing':
        return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-panel p-6"
    >
      <h3 className="text-sm font-semibold text-foreground mb-6">Processing Pipeline</h3>

      <div className="space-y-1">
        {steps.map((step, index) => (
          <div key={step.id} className="timeline-step">
            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={cn(
                'absolute left-[11px] top-8 w-0.5 h-8 transition-colors duration-300',
                steps[index + 1].status !== 'pending' ? 'bg-success' : 'bg-border'
              )} />
            )}

            {/* Step Content */}
            <div className="flex items-center gap-4 relative z-10">
              <motion.div
                initial={false}
                animate={{
                  scale: step.status === 'processing' ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  repeat: step.status === 'processing' ? Infinity : 0,
                  duration: 1,
                }}
              >
                {getStepIcon(step.status)}
              </motion.div>

              <div className="flex-1">
                <p className={cn(
                  'text-sm font-medium transition-colors',
                  step.status === 'completed' && 'text-foreground',
                  step.status === 'processing' && 'text-primary',
                  step.status === 'pending' && 'text-muted-foreground',
                  step.status === 'error' && 'text-destructive'
                )}>
                  {step.name}
                </p>
              </div>

              {step.duration && step.status === 'completed' && (
                <span className="text-xs text-muted-foreground">{step.duration}</span>
              )}

              {step.status === 'processing' && (
                <span className="text-xs text-primary">Processing...</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">Overall Progress</span>
          <span className="text-xs font-medium text-foreground">
            {Math.round((steps.filter(s => s.status === 'completed').length / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%`
            }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-primary to-success rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
}
