import { useEffect, useRef, useState } from 'react';
import { MapContainer as LeafletMap, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import { Expand, Layers, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { anomalies, roadHealthData, type Anomaly } from '@/data/mockData';
import 'leaflet/dist/leaflet.css';

interface MapContainerProps {
  onMarkerClick?: (anomaly: Anomaly) => void;
  selectedAnomaly?: Anomaly | null;
}

// Custom hook to handle map center updates
function MapUpdater({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export function MapContainer({ onMarkerClick, selectedAnomaly }: MapContainerProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([33.6844, 73.0479]);
  const [activeLayer, setActiveLayer] = useState<'anomalies' | 'health'>('anomalies');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Severe':
        return '#FF5252';
      case 'Moderate':
        return '#FF9100';
      case 'Minor':
        return '#00C853';
      default:
        return '#4FC3F7';
    }
  };

  const getHealthColor = (healthIndex: number) => {
    if (healthIndex >= 70) return '#00C853';
    if (healthIndex >= 50) return '#FF9100';
    return '#FF5252';
  };

  useEffect(() => {
    if (selectedAnomaly) {
      setMapCenter([selectedAnomaly.lat, selectedAnomaly.lng]);
    }
  }, [selectedAnomaly]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-panel relative h-[500px] overflow-hidden"
    >
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
        <Button
          variant="secondary"
          size="icon"
          className="bg-card/90 backdrop-blur-sm border border-border hover:bg-muted"
          onClick={() => setActiveLayer(activeLayer === 'anomalies' ? 'health' : 'anomalies')}
        >
          <Layers className="w-4 h-4" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="bg-card/90 backdrop-blur-sm border border-border hover:bg-muted"
          onClick={() => setMapCenter([33.6844, 73.0479])}
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Layer Toggle */}
      <div className="absolute top-4 left-4 z-[1000]">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg border border-border p-1 flex gap-1">
          <button
            onClick={() => setActiveLayer('anomalies')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeLayer === 'anomalies'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Anomalies
          </button>
          <button
            onClick={() => setActiveLayer('health')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors ${
              activeLayer === 'health'
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Road Health
          </button>
        </div>
      </div>

      {/* Map */}
      <LeafletMap
        center={mapCenter}
        zoom={13}
        className="h-full w-full"
        zoomControl={false}
      >
        <MapUpdater center={mapCenter} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Anomaly Markers */}
        {activeLayer === 'anomalies' &&
          anomalies.map((anomaly) => (
            <CircleMarker
              key={anomaly.id}
              center={[anomaly.lat, anomaly.lng]}
              radius={selectedAnomaly?.id === anomaly.id ? 12 : 8}
              pathOptions={{
                color: getSeverityColor(anomaly.severity),
                fillColor: getSeverityColor(anomaly.severity),
                fillOpacity: 0.6,
                weight: selectedAnomaly?.id === anomaly.id ? 3 : 2,
              }}
              eventHandlers={{
                click: () => onMarkerClick?.(anomaly),
              }}
            >
              <Popup>
                <div className="text-sm">
                  <p className="font-semibold">{anomaly.type}</p>
                  <p className="text-muted-foreground">{anomaly.road}</p>
                  <p className="text-xs">Severity: {anomaly.severity}</p>
                </div>
              </Popup>
            </CircleMarker>
          ))}

        {/* Health Index Markers */}
        {activeLayer === 'health' &&
          roadHealthData.map((road, index) => {
            // Generate approximate coordinates for each sector
            const lat = 33.68 + (index * 0.01);
            const lng = 73.04 + (index * 0.008);
            return (
              <CircleMarker
                key={road.sector}
                center={[lat, lng]}
                radius={20}
                pathOptions={{
                  color: getHealthColor(road.healthIndex),
                  fillColor: getHealthColor(road.healthIndex),
                  fillOpacity: 0.3,
                  weight: 2,
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <p className="font-semibold">{road.sector}</p>
                    <p>Health Index: {road.healthIndex}%</p>
                    <p className="text-xs">{road.anomalyCount} anomalies detected</p>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
      </LeafletMap>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-card/90 backdrop-blur-sm rounded-lg border border-border p-3">
        <p className="text-xs font-medium text-foreground mb-2">
          {activeLayer === 'anomalies' ? 'Severity' : 'Health Index'}
        </p>
        <div className="space-y-1.5">
          {activeLayer === 'anomalies' ? (
            <>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Severe</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">Moderate</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Minor</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-success" />
                <span className="text-muted-foreground">Good (70+)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-muted-foreground">Fair (50-70)</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-muted-foreground">Poor (&lt;50)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
