'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Shield, RefreshCw, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useApp } from '../shared/AppContext';
import { t } from '../../data/translations';
import { getCityData } from '../../data/cityData';

type ZoneData = { capacity: number; current: number; trend: 'up' | 'down' | 'stable' };
type Incident = { id: number; zone: string; severity: 'low' | 'medium' | 'high'; title: string; status: 'active' | 'resolved' };

/** Operations dashboard with live crowd heatmap, incident tracking, and zone monitoring */
export default function OpsContent() {
  const { language, highContrast, city } = useApp();
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [zones, setZones] = useState<Record<string, ZoneData>>({});
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [showSchedule, setShowSchedule] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const cityData = getCityData(city);

  useEffect(() => {
    const generateZoneData = (): Record<string, ZoneData> => {
      const zoneNames = ['North Gate', 'South Gate', 'East Concourse', 'West Stand', 'VIP Zone', 'General Admission'];
      const trends: ZoneData['trend'][] = ['up', 'down', 'stable'];
      const result: Record<string, ZoneData> = {};
      for (const name of zoneNames) {
        const trendIndex = Math.floor(Math.random() * trends.length);
        result[name] = {
          capacity: Math.floor(Math.random() * 15000) + 5000,
          current: Math.floor(Math.random() * 12000) + 2000,
          trend: trends[trendIndex] || 'stable',
        };
      }
      return result;
    };

    const generateIncidents = (): Incident[] => [
      { id: 1, zone: 'North Gate', severity: 'medium', title: language === 'en' ? 'High traffic volume' : language === 'es' ? 'Alto volumen de tráfico' : 'Fort volume de trafic', status: 'active' },
      { id: 2, zone: 'South Gate', severity: 'low', title: language === 'en' ? 'Minor queue forming' : language === 'es' ? 'Cola menor formándose' : 'File mineure en formation', status: 'active' },
      { id: 3, zone: 'VIP Zone', severity: 'high', title: language === 'en' ? 'Accessibility alert' : language === 'es' ? 'Alerta de accesibilidad' : 'Alerte accessibilité', status: 'active' },
      { id: 4, zone: 'East Concourse', severity: 'low', title: language === 'en' ? 'Maintenance scheduled' : language === 'es' ? 'Mantenimiento programado' : 'Maintenance programmée', status: 'resolved' },
    ];

    setZones(generateZoneData());
    setIncidents(generateIncidents());
    setLastUpdate(new Date());

    timerRef.current = setInterval(() => {
      setZones(prev => {
        const updated = { ...prev };
        for (const key of Object.keys(updated)) {
          const zone = updated[key];
          if (!zone) continue;
          const change = Math.floor(Math.random() * 200) - 100;
          updated[key] = {
            capacity: zone.capacity,
            current: Math.max(0, Math.min(zone.capacity, zone.current + change)),
            trend: change > 50 ? 'up' : change < -50 ? 'down' : 'stable',
          };
        }
        return updated;
      });
      setLastUpdate(new Date());
    }, 3000);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [language]);

  const getSeverityColor = (severity: Incident['severity']) => {
    if (highContrast) return 'bg-gray-800 text-white';
    return severity === 'high' ? 'bg-red-100 text-red-800' : severity === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800';
  };

  const getStatusColor = (status: Incident['status']) => {
    if (highContrast) return status === 'active' ? 'text-yellow-400' : 'text-green-400';
    return status === 'active' ? 'text-red-600' : 'text-green-600';
  };

  const getCapacityColor = (current: number, capacity: number) => {
    const pct = current / capacity;
    if (pct > 0.85) return highContrast ? 'text-red-400' : 'text-red-600';
    if (pct > 0.65) return highContrast ? 'text-yellow-400' : 'text-amber-600';
    return highContrast ? 'text-green-400' : 'text-green-600';
  };

  const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
    if (trend === 'up') return <TrendingUp className="w-3.5 h-3.5 text-red-500" />;
    if (trend === 'down') return <TrendingDown className="w-3.5 h-3.5 text-green-500" />;
    return <Minus className="w-3.5 h-3.5 text-gray-400" />;
  };

  return (
    <div className="h-full flex flex-col p-4 pb-2" role="tabpanel" id="panel-ops" aria-labelledby="tab-ops">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highContrast ? 'bg-gray-800 text-purple-400' : 'bg-purple-50'}`}>
            <Shield className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{t(language, 'ops')}</h1>
            <p className="text-xs text-gray-500">{t(language, 'opsDesc')}</p>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label="Key metrics">
        <div className={`rounded-xl p-3 text-center ${highContrast ? 'bg-gray-800' : 'bg-blue-50'}`}>
          <div className={`text-2xl font-bold ${getCapacityColor(Object.values(zones).reduce((s, z) => s + z.current, 0), Object.values(zones).reduce((s, z) => s + z.capacity, 0))}`} aria-live="polite">
            {Object.values(zones).reduce((s, z) => s + z.current, 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{t(language, 'capacity')}</div>
        </div>
        <div className={`rounded-xl p-3 text-center ${highContrast ? 'bg-gray-800' : 'bg-red-50'}`}>
          <div className="text-2xl font-bold text-red-600" aria-live="polite">{incidents.filter(i => i.status === 'active').length}</div>
          <div className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{t(language, 'alerts')}</div>
        </div>
      </div>

      {/* Live Crowd Heatmap */}
      <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xs">{t(language, 'liveHeatmap')}</h3>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500" aria-live="polite">
            <RefreshCw className="w-3 h-3 animate-spin" aria-hidden="true" />
            <span>{lastUpdate.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="space-y-1.5" role="list" aria-label="Zone crowd data">
          {Object.entries(zones).map(([name, data]) => {
            const pct = (data.current / data.capacity) * 100;
            return (
              <div
                key={name}
                role="listitem"
                tabIndex={0}
                aria-label={`${name}: ${data.current.toLocaleString()} of ${data.capacity.toLocaleString()} people, ${pct.toFixed(0)}% capacity`}
                onClick={() => setSelectedZone(selectedZone === name ? null : name)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedZone(selectedZone === name ? null : name); } }}
                className={`flex items-center gap-2 p-2 rounded-xl cursor-pointer transition-all ${
                  selectedZone === name
                    ? highContrast ? 'bg-gray-700 ring-2 ring-yellow-500' : 'bg-blue-50 ring-2 ring-blue-500 shadow-sm'
                    : highContrast ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                }`}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: pct > 85 ? '#ef4444' : pct > 65 ? '#f59e0b' : '#22c55e' }} aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold truncate">{name}</span>
                    <div className="flex items-center gap-1.5">
                      <TrendIcon trend={data.trend} />
                      <span className={`text-[10px] font-bold ${getCapacityColor(data.current, data.capacity)}`}>{pct.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-gray-200 overflow-hidden" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} aria-label={`${name} capacity`}>
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: pct > 85 ? '#ef4444' : pct > 65 ? '#f59e0b' : '#22c55e' }} />
                  </div>
                  <div className="flex justify-between mt-0.5">
                    <span className="text-[9px] text-gray-400">{data.current.toLocaleString()} / {data.capacity.toLocaleString()}</span>
                    <span className="text-[9px] text-gray-400">{data.trend === 'up' ? '↑ Rising' : data.trend === 'down' ? '↓ Falling' : '→ Stable'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Incidents */}
      <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xs">{t(language, 'activeIncidents')}</h3>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${highContrast ? 'bg-gray-700 text-yellow-400' : 'bg-red-100 text-red-700'}`}>
            {incidents.filter(i => i.status === 'active').length} {t(language, 'alerts')}
          </span>
        </div>
        <div className="space-y-1.5" role="log" aria-label="Incident list">
          {incidents.map(inc => (
            <div key={inc.id} className={`flex items-center gap-2 p-2 rounded-xl ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`} role="document">
              <div className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${getSeverityColor(inc.severity)}`}>
                {inc.severity}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold truncate">{inc.title}</div>
                <div className="text-[9px] text-gray-500">{inc.zone}</div>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-[10px] font-bold ${getStatusColor(inc.status)}`}>{inc.status}</span>
                <button aria-label={`View incident details: ${inc.title}`} className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
                  <ChevronRight className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schedule */}
      <div className={`rounded-2xl p-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <button onClick={() => setShowSchedule(!showSchedule)} aria-expanded={showSchedule} aria-controls="ops-schedule" className="w-full flex items-center justify-between">
          <h3 className="font-bold text-xs">{t(language, 'todaysSchedule')}</h3>
          <ChevronRight className={`w-4 h-4 transition-transform ${showSchedule ? 'rotate-90' : ''}`} aria-hidden="true" />
        </button>
        {showSchedule && (
          <div id="ops-schedule" className="mt-2 space-y-1.5" role="list" aria-label="Today's schedule">
            {Array.isArray(cityData.schedule) ? cityData.schedule.map((s: { time: string; event: string; type: string }, i: number) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl text-xs ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`} role="listitem">
                <div className="text-[10px] font-bold text-gray-500 w-12 text-center">{s.time}</div>
                <div className="flex-1">
                  <div className="font-semibold text-[10px]">{s.event}</div>
                  <div className="text-[9px] text-gray-500">{s.type}</div>
                </div>
              </div>
            )) : (
              <div className={`p-2 rounded-xl text-xs ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`} role="listitem">
                <span className="text-[10px]">{typeof cityData.schedule === 'object' ? cityData.schedule[language as 'en' | 'es' | 'fr'] || cityData.schedule.en : cityData.schedule}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
