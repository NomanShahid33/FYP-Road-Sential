import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileVideo, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

interface UploadBoxProps {
  onUploadComplete?: (file: UploadedFile) => void;
}

export function UploadBox({ onUploadComplete }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const simulateUpload = (file: File) => {
    const uploadedFile: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
    };

    setFiles((prev) => [...prev, uploadedFile]);

    // Simulate upload progress
    const interval = setInterval(() => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === uploadedFile.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100);
            if (newProgress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                onUploadComplete?.(f);
              }, 500);
              return { ...f, progress: 100, status: 'complete' };
            }
            return { ...f, progress: newProgress };
          }
          return f;
        })
      );
    }, 300);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    droppedFiles.forEach((file) => {
      if (file.type.startsWith('video/')) {
        simulateUpload(file);
      }
    });
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach((file) => {
      if (file.type.startsWith('video/')) {
        simulateUpload(file);
      }
    });
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer group',
          isDragging
            ? 'border-primary bg-primary/5 scale-[1.02]'
            : 'border-border hover:border-primary/50 hover:bg-muted/30'
        )}
      >
        <input
          type="file"
          accept="video/*"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ y: isDragging ? -5 : 0 }}
            className={cn(
              'w-16 h-16 rounded-2xl flex items-center justify-center transition-colors',
              isDragging ? 'bg-primary/20' : 'bg-muted'
            )}
          >
            <Upload className={cn(
              'w-8 h-8 transition-colors',
              isDragging ? 'text-primary' : 'text-muted-foreground'
            )} />
          </motion.div>

          <div>
            <p className="text-lg font-medium text-foreground">
              {isDragging ? 'Drop your video here' : 'Drag & drop video files'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              or click to browse • MP4, MOV, AVI supported
            </p>
          </div>

          <Button variant="outline" className="mt-2">
            Select Files
          </Button>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-4 left-4 w-4 h-4 border-l-2 border-t-2 border-primary/30 rounded-tl" />
        <div className="absolute top-4 right-4 w-4 h-4 border-r-2 border-t-2 border-primary/30 rounded-tr" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-l-2 border-b-2 border-primary/30 rounded-bl" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-r-2 border-b-2 border-primary/30 rounded-br" />
      </motion.div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          {files.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-4 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileVideo className="w-5 h-5 text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {file.name}
                  </p>
                  {file.status === 'complete' ? (
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {Math.round(file.progress)}%
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      className={cn(
                        'h-full rounded-full transition-colors',
                        file.status === 'complete' ? 'bg-success' : 'bg-primary'
                      )}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {formatFileSize(file.size)}
                  </span>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0"
                onClick={() => removeFile(file.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
