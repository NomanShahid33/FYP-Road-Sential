// Mock data for Road Sentinel application
// TODO: Replace with actual API calls to backend

export interface Anomaly {
  id: string;
  type: 'pothole' | 'crack' | 'deformation' | 'surface_wear';
  severity: 'Minor' | 'Moderate' | 'Severe';
  confidence: number;
  lat: number;
  lng: number;
  thumbnail: string;
  road: string;
  sector: string;
  timestamp: string;
  description?: string;
}

export interface RoadHealth {
  sector: string;
  healthIndex: number;
  anomalyCount: number;
  lastUpdated: string;
}

export interface Activity {
  id: string;
  file: string;
  status: 'Processing' | 'Processed' | 'In Queue' | 'Failed';
  detected: number;
  timestamp: string;
  duration?: string;
}

export interface ProcessingStep {
  id: number;
  name: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  duration?: string;
}

// Anomaly thumbnails (using placeholder colors)
const thumbnails = [
  'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1586953083125-8f3a19c8e4b8?w=200&h=150&fit=crop',
  'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=200&h=150&fit=crop',
];

export const anomalies: Anomaly[] = [
  {
    id: 'a1',
    type: 'pothole',
    severity: 'Severe',
    confidence: 0.94,
    lat: 33.6844,
    lng: 73.0479,
    thumbnail: thumbnails[0],
    road: 'F-10 Main Road',
    sector: 'F-10',
    timestamp: '2025-12-03T12:30:00Z',
    description: 'Large pothole causing significant traffic slowdown',
  },
  {
    id: 'a2',
    type: 'crack',
    severity: 'Moderate',
    confidence: 0.87,
    lat: 33.6920,
    lng: 73.0550,
    thumbnail: thumbnails[1],
    road: 'Blue Area Boulevard',
    sector: 'Blue Area',
    timestamp: '2025-12-03T10:15:00Z',
    description: 'Longitudinal crack approximately 3 meters long',
  },
  {
    id: 'a3',
    type: 'deformation',
    severity: 'Minor',
    confidence: 0.78,
    lat: 33.6750,
    lng: 73.0600,
    thumbnail: thumbnails[2],
    road: 'G-9 Markaz Road',
    sector: 'G-9',
    timestamp: '2025-12-02T16:45:00Z',
    description: 'Surface deformation near drainage',
  },
  {
    id: 'a4',
    type: 'pothole',
    severity: 'Moderate',
    confidence: 0.91,
    lat: 33.7000,
    lng: 73.0400,
    thumbnail: thumbnails[0],
    road: 'F-7 Jinnah Super',
    sector: 'F-7',
    timestamp: '2025-12-02T14:20:00Z',
    description: 'Medium-sized pothole near intersection',
  },
  {
    id: 'a5',
    type: 'surface_wear',
    severity: 'Minor',
    confidence: 0.72,
    lat: 33.6800,
    lng: 73.0350,
    thumbnail: thumbnails[1],
    road: 'I-8 Industrial Area',
    sector: 'I-8',
    timestamp: '2025-12-01T09:00:00Z',
    description: 'Surface wear due to heavy vehicle traffic',
  },
  {
    id: 'a6',
    type: 'crack',
    severity: 'Severe',
    confidence: 0.96,
    lat: 33.6900,
    lng: 73.0700,
    thumbnail: thumbnails[2],
    road: 'E-11 Main Highway',
    sector: 'E-11',
    timestamp: '2025-12-01T11:30:00Z',
    description: 'Network of cracks requiring immediate attention',
  },
  {
    id: 'a7',
    type: 'pothole',
    severity: 'Severe',
    confidence: 0.89,
    lat: 33.6780,
    lng: 73.0520,
    thumbnail: thumbnails[0],
    road: 'G-11 Markaz',
    sector: 'G-11',
    timestamp: '2025-11-30T15:45:00Z',
    description: 'Deep pothole with water accumulation',
  },
  {
    id: 'a8',
    type: 'deformation',
    severity: 'Moderate',
    confidence: 0.83,
    lat: 33.6950,
    lng: 73.0450,
    thumbnail: thumbnails[1],
    road: 'F-6 Super Market',
    sector: 'F-6',
    timestamp: '2025-11-30T08:20:00Z',
    description: 'Road settlement near utility cover',
  },
];

export const roadHealthData: RoadHealth[] = [
  { sector: 'G-15', healthIndex: 68, anomalyCount: 5, lastUpdated: '2025-12-03T12:00:00Z' },
  { sector: 'F-7', healthIndex: 82, anomalyCount: 2, lastUpdated: '2025-12-03T11:30:00Z' },
  { sector: 'G-9', healthIndex: 55, anomalyCount: 8, lastUpdated: '2025-12-03T10:45:00Z' },
  { sector: 'Blue Area', healthIndex: 74, anomalyCount: 3, lastUpdated: '2025-12-03T09:15:00Z' },
  { sector: 'I-8', healthIndex: 45, anomalyCount: 12, lastUpdated: '2025-12-02T16:00:00Z' },
  { sector: 'E-11', healthIndex: 38, anomalyCount: 15, lastUpdated: '2025-12-02T14:30:00Z' },
  { sector: 'G-11', healthIndex: 61, anomalyCount: 6, lastUpdated: '2025-12-01T18:00:00Z' },
  { sector: 'F-6', healthIndex: 79, anomalyCount: 2, lastUpdated: '2025-12-01T12:00:00Z' },
];

export const recentActivities: Activity[] = [
  {
    id: 'act1',
    file: 'drone_survey_f10_dec03.mp4',
    status: 'Processed',
    detected: 5,
    timestamp: '2025-12-03T12:30:00Z',
    duration: '12:45',
  },
  {
    id: 'act2',
    file: 'street_footage_bluearea.mp4',
    status: 'Processing',
    detected: 0,
    timestamp: '2025-12-03T11:00:00Z',
    duration: '08:32',
  },
  {
    id: 'act3',
    file: 'highway_scan_e11.mp4',
    status: 'In Queue',
    detected: 0,
    timestamp: '2025-12-03T10:30:00Z',
    duration: '25:18',
  },
  {
    id: 'act4',
    file: 'sector_g9_morning.mp4',
    status: 'Processed',
    detected: 8,
    timestamp: '2025-12-02T16:45:00Z',
    duration: '15:22',
  },
  {
    id: 'act5',
    file: 'i8_industrial_area.mp4',
    status: 'Failed',
    detected: 0,
    timestamp: '2025-12-02T14:00:00Z',
    duration: '18:05',
  },
];

export const processingSteps: ProcessingStep[] = [
  { id: 1, name: 'Frame Extraction', status: 'pending' },
  { id: 2, name: 'Image Normalization', status: 'pending' },
  { id: 3, name: 'AI Analysis', status: 'pending' },
  { id: 4, name: 'Severity Estimation', status: 'pending' },
  { id: 5, name: 'GPS Processing', status: 'pending' },
  { id: 6, name: 'Saving Results', status: 'pending' },
];

// Stats calculations
export const stats = {
  totalAnomalies: anomalies.length,
  totalVideosProcessed: recentActivities.filter(a => a.status === 'Processed').length,
  overallHealthScore: Math.round(roadHealthData.reduce((acc, r) => acc + r.healthIndex, 0) / roadHealthData.length),
  mostAffectedSector: roadHealthData.reduce((min, r) => r.healthIndex < min.healthIndex ? r : min, roadHealthData[0]).sector,
  severeCount: anomalies.filter(a => a.severity === 'Severe').length,
  moderateCount: anomalies.filter(a => a.severity === 'Moderate').length,
  minorCount: anomalies.filter(a => a.severity === 'Minor').length,
};

// Monthly trend data for charts
export const monthlyTrendData = [
  { month: 'Jul', anomalies: 23, processed: 8 },
  { month: 'Aug', anomalies: 31, processed: 12 },
  { month: 'Sep', anomalies: 28, processed: 15 },
  { month: 'Oct', anomalies: 45, processed: 18 },
  { month: 'Nov', anomalies: 38, processed: 22 },
  { month: 'Dec', anomalies: anomalies.length, processed: recentActivities.filter(a => a.status === 'Processed').length },
];

// Severity distribution for pie chart
export const severityDistribution = [
  { name: 'Severe', value: stats.severeCount, color: 'hsl(0, 72%, 63%)' },
  { name: 'Moderate', value: stats.moderateCount, color: 'hsl(32, 100%, 50%)' },
  { name: 'Minor', value: stats.minorCount, color: 'hsl(145, 80%, 40%)' },
];

// Type distribution
export const typeDistribution = [
  { name: 'Pothole', value: anomalies.filter(a => a.type === 'pothole').length },
  { name: 'Crack', value: anomalies.filter(a => a.type === 'crack').length },
  { name: 'Deformation', value: anomalies.filter(a => a.type === 'deformation').length },
  { name: 'Surface Wear', value: anomalies.filter(a => a.type === 'surface_wear').length },
];
