import { useState } from 'react';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Key,
  Cpu,
  Palette,
  Bell,
  Shield,
  Save,
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export default function Settings() {
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState(true);
  const [autoProcess, setAutoProcess] = useState(true);
  const [highQuality, setHighQuality] = useState(false);

  const handleSave = () => {
    // TODO: Connect to backend to save settings
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <MainLayout
      title="Settings"
      subtitle="Configure your Road Sentinel preferences"
    >
      <div className="max-w-3xl space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">User Profile</h2>
              <p className="text-xs text-muted-foreground">Manage your account information</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Admin" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="User" className="bg-muted/50" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="admin@roadsentinel.io" className="bg-muted/50" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organization">Organization</Label>
              <Input id="organization" defaultValue="City Infrastructure Dept." className="bg-muted/50" />
            </div>
          </div>
        </motion.div>

        {/* API Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Key className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">API Configuration</h2>
              <p className="text-xs text-muted-foreground">Configure backend API endpoints</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="apiEndpoint">API Endpoint</Label>
              <Input 
                id="apiEndpoint" 
                placeholder="https://api.roadsentinel.io/v1"
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">
                {/* TODO: Connect to actual backend API */}
                Enter the base URL for the Road Sentinel API
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input 
                id="apiKey" 
                type="password"
                placeholder="••••••••••••••••"
                className="bg-muted/50"
              />
            </div>
          </div>
        </motion.div>

        {/* Model Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">AI Model Settings</h2>
              <p className="text-xs text-muted-foreground">Configure detection model parameters</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Detection Model</Label>
              <Select defaultValue="yolov8">
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yolov8">YOLOv8 (Recommended)</SelectItem>
                  <SelectItem value="yolov5">YOLOv5</SelectItem>
                  <SelectItem value="efficientdet">EfficientDet</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Confidence Threshold</Label>
              <Select defaultValue="0.7">
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0.5">50% (More detections)</SelectItem>
                  <SelectItem value="0.7">70% (Balanced)</SelectItem>
                  <SelectItem value="0.9">90% (High precision)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>High Quality Processing</Label>
                <p className="text-xs text-muted-foreground">Process at full resolution (slower)</p>
              </div>
              <Switch checked={highQuality} onCheckedChange={setHighQuality} />
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Auto-process Uploads</Label>
                <p className="text-xs text-muted-foreground">Automatically start analysis on upload</p>
              </div>
              <Switch checked={autoProcess} onCheckedChange={setAutoProcess} />
            </div>
          </div>
        </motion.div>

        {/* Appearance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-panel p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
              <p className="text-xs text-muted-foreground">Customize the interface appearance</p>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="bg-muted/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dark">Dark (Default)</SelectItem>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <Label>Desktop Notifications</Label>
                <p className="text-xs text-muted-foreground">Receive alerts for new detections</p>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end"
        >
          <Button onClick={handleSave} className="gap-2">
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
        </motion.div>
      </div>
    </MainLayout>
  );
}
