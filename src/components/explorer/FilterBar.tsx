import { motion } from 'framer-motion';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface FilterBarProps {
  filters: {
    severity: string;
    type: string;
    sector: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClearFilters: () => void;
}

export function FilterBar({ filters, onFilterChange, onClearFilters }: FilterBarProps) {
  const hasActiveFilters = filters.severity !== 'all' || filters.type !== 'all' || filters.sector !== 'all';

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="glass-panel p-4 flex flex-wrap items-center gap-4"
    >
      <div className="flex items-center gap-2 text-muted-foreground">
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">Filters</span>
      </div>

      <div className="flex flex-wrap items-center gap-3 flex-1">
        {/* Severity Filter */}
        <Select
          value={filters.severity}
          onValueChange={(value) => onFilterChange('severity', value)}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-border">
            <SelectValue placeholder="Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severities</SelectItem>
            <SelectItem value="Severe">Severe</SelectItem>
            <SelectItem value="Moderate">Moderate</SelectItem>
            <SelectItem value="Minor">Minor</SelectItem>
          </SelectContent>
        </Select>

        {/* Type Filter */}
        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange('type', value)}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-border">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="pothole">Pothole</SelectItem>
            <SelectItem value="crack">Crack</SelectItem>
            <SelectItem value="deformation">Deformation</SelectItem>
            <SelectItem value="surface_wear">Surface Wear</SelectItem>
          </SelectContent>
        </Select>

        {/* Sector Filter */}
        <Select
          value={filters.sector}
          onValueChange={(value) => onFilterChange('sector', value)}
        >
          <SelectTrigger className="w-[140px] bg-muted/50 border-border">
            <SelectValue placeholder="Sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sectors</SelectItem>
            <SelectItem value="F-10">F-10</SelectItem>
            <SelectItem value="F-7">F-7</SelectItem>
            <SelectItem value="G-9">G-9</SelectItem>
            <SelectItem value="Blue Area">Blue Area</SelectItem>
            <SelectItem value="I-8">I-8</SelectItem>
            <SelectItem value="E-11">E-11</SelectItem>
            <SelectItem value="G-11">G-11</SelectItem>
            <SelectItem value="F-6">F-6</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="gap-1.5 text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
          Clear
        </Button>
      )}
    </motion.div>
  );
}
