import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { UploadBox } from '@/components/upload/UploadBox';
import { ProcessingTimeline } from '@/components/upload/ProcessingTimeline';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw, MapPin, CheckCircle2 } from 'lucide-react';
import { anomalies } from '@/data/mockData';
import { useNavigate } from 'react-router-dom';

export default function Upload() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleUploadComplete = (file: { name: string }) => {
    setUploadedFiles(prev => [...prev, file.name]);
  };

  const startProcessing = () => {
    setIsProcessing(true);
    setProcessingComplete(false);
  };

  const handleProcessingComplete = () => {
    setIsProcessing(false);
    setProcessingComplete(true);
  };

  const resetUpload = () => {
    setUploadedFiles([]);
    setIsProcessing(false);
    setProcessingComplete(false);
  };

  // Mock detected anomalies (from dummy data)
  const detectedAnomalies = anomalies.slice(0, 4);

  return (
    <MainLayout
      title="Upload & Analyze"
      subtitle="Upload road footage for AI-powered analysis"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Upload */}
        <div className="space-y-6">
          <UploadBox onUploadComplete={handleUploadComplete} />

          {/* Action Buttons */}
          {uploadedFiles.length > 0 && !isProcessing && !processingComplete && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <Button onClick={startProcessing} className="flex-1 gap-2">
                <Play className="w-4 h-4" />
                Start Analysis
              </Button>
              <Button variant="outline" onClick={resetUpload}>
                <RotateCcw className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Right Column - Processing Timeline */}
        <div className="space-y-6">
          <ProcessingTimeline
            isProcessing={isProcessing}
            onComplete={handleProcessingComplete}
          />

          {/* Results Panel */}
          <AnimatePresence>
            {processingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-panel p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">Analysis Complete</h3>
                    <p className="text-xs text-muted-foreground">
                      {detectedAnomalies.length} anomalies detected
                    </p>
                  </div>
                </div>

                {/* Detected Anomalies List */}
                <div className="space-y-2 mb-4">
                  {detectedAnomalies.map((anomaly, index) => (
                    <motion.div
                      key={anomaly.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <div className="w-10 h-8 rounded overflow-hidden bg-muted">
                        <img
                          src={anomaly.thumbnail}
                          alt={anomaly.type}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground capitalize">
                          {anomaly.type.replace('_', ' ')}
                        </p>
                        <p className="text-xs text-muted-foreground">{anomaly.road}</p>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        anomaly.severity === 'Severe' ? 'severity-severe' :
                        anomaly.severity === 'Moderate' ? 'severity-moderate' : 'severity-minor'
                      }`}>
                        {anomaly.severity}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    onClick={() => navigate('/')}
                  >
                    <MapPin className="w-4 h-4" />
                    View on Map
                  </Button>
                  <Button variant="outline" onClick={resetUpload}>
                    Upload More
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 glass-panel p-6"
      >
        <h3 className="text-sm font-semibold text-foreground mb-3">How it works</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Upload Video</p>
              <p className="text-xs text-muted-foreground mt-1">
                Upload drone or dashcam footage of roads and infrastructure
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">AI Analysis</p>
              <p className="text-xs text-muted-foreground mt-1">
                Our AI processes frames, detects anomalies, and estimates severity
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">View Results</p>
              <p className="text-xs text-muted-foreground mt-1">
                Explore detected issues on the map with GPS coordinates
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}
