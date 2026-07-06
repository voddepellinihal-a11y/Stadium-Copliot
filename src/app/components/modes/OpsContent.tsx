'use client';

import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, Users, Clock, Map, Shield, Bell } from 'lucide-react';
import { useApp } from '../shared/AppContext';

interface ZoneData {
  name: string;
  density: number;
  trend: 'up' | 'down' | 'stable';
  count: number;
}

const zones: string[] = ['gate_a', 'gate_b', 'gate_c', 'concourse_a', 'concourse_b', 'section_101', 'section_115', 'section_120', 'parking_a', 'train_station'];

export default function OpsContent() {
  const { language: lang, highContrast } = useApp();
  const [crowdData, setCrowdData] = useState<ZoneData[]>([]);

  useEffect(() => {
    const initial: ZoneData[] = zones.map(z => ({
      name: z,
      density: Math.random() * 0.8,
      trend: (['up', 'down', 'stable'] as const)[Math.floor(Math.random() * 3)],
      count: Math.floor(Math.random() * 1500),
    }));
    setCrowdData(initial);

    const interval = setInterval(() => {
      setCrowdData(prev => prev.map(z => {
        const delta = (Math.random() - 0.5) * 0.15;
        const nd = Math.max(0, Math.min(1, z.density + delta));
        const trend: ZoneData['trend'] = delta > 0.03 ? 'up' : delta < -0.03 ? 'down' : 'stable';
        return { ...z, density: Math.round(nd * 100) / 100, trend, count: Math.floor(nd * 1500) };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (d: number) => d >= 0.7 ? 'bg-red-500' : d >= 0.4 ? 'bg-yellow-500' : 'bg-green-500';
  const avgDensity = crowdData.length ? crowdData.reduce((s, z) => s + z.density, 0) / crowdData.length : 0;
  const t = (en: string, es: string, fr: string) => lang === 'en' ? en : lang === 'es' ? es : fr;

  return (
    <div className={`flex-1 overflow-y-auto ${highContrast ? 'bg-black' : 'bg-gray-100'}`} role="main" aria-label={t('Operations Dashboard', 'Panel de Operaciones', "Tableau de Bord")}>
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="group" aria-label={t('Key Metrics', 'Métricas Clave', 'Métriques Clés')}>
          {[
            { icon: <Activity className="w-5 h-5" />, label: t('Avg Density', 'Densidad Prom.', 'Densité Moy.'), value: `${(avgDensity * 100).toFixed(0)}%` },
            { icon: <AlertTriangle className="w-5 h-5" />, label: t('Hotspots', 'Puntos Críticos', 'Points Chauds'), value: `${crowdData.filter(z => z.density >= 0.7).length}` },
            { icon: <Users className="w-5 h-5" />, label: t('Total Fans', 'Total Fans', 'Total Fans'), value: crowdData.reduce((s, z) => s + (z.count || 0), 0).toLocaleString() },
            { icon: <Clock className="w-5 h-5" />, label: t('Updated', 'Actualizado', 'Mis à Jour'), value: t('Live', 'En Vivo', 'En Direct') },
          ].map((card, i) => (
            <div key={i} className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-1">
                <span aria-hidden="true">{card.icon}</span>
                <span className="text-xs opacity-60">{card.label}</span>
              </div>
              <div className="text-2xl font-bold" aria-label={`${card.label}: ${card.value}`}>{card.value}</div>
            </div>
          ))}
        </div>

        {/* Heatmap */}
        <div className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Map className="w-4 h-4" aria-hidden="true" /> {t('Live Stadium Heatmap', 'Mapa de Calor', 'Carte de Chaleur')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2" role="img" aria-label={t('Stadium zone density map', 'Mapa de densidad de zonas', 'Carte de densité des zones')}>
            {crowdData.map(z => (
              <div
                key={z.name}
                className="p-3 rounded-lg text-center"
                style={{ backgroundColor: highContrast ? '#1f2937' : `${getColor(z.density)}22` }}
                role="img"
                aria-label={`${z.name.replace('_', ' ')}: ${z.count} fans, ${z.density >= 0.7 ? 'high' : z.density >= 0.4 ? 'medium' : 'low'} density`}
              >
                <div className="text-[10px] font-mono mb-1 opacity-70">{z.name.replace('_', ' ').toUpperCase()}</div>
                <div className={`w-2 h-2 rounded-full mx-auto mb-1 ${getColor(z.density)}`} aria-hidden="true"></div>
                <div className="text-sm font-bold">{z.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Reports */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3">
              <Shield className="w-4 h-4 inline text-red-500 mr-2" aria-hidden="true" />
              {t('Report Incident', 'Reportar', 'Signaler')}
            </h3>
            <div role="list">
              {[
                { type: t('Medical', 'Médico', 'Médical'), severity: 'high' },
                { type: t('Crowding', 'Aglomeración', 'Foule'), severity: 'medium' },
                { type: t('Facility', 'Instalación', 'Installation'), severity: 'low' },
                { type: t('Security', 'Seguridad', 'Sécurité'), severity: 'critical' },
              ].map((inc, i) => (
                <button key={i} role="listitem" className={`w-full flex items-center justify-between p-2.5 rounded-lg text-sm ${highContrast ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                  <span>{inc.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${inc.severity === 'critical' ? 'bg-red-100 text-red-700' : inc.severity === 'high' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-600'}`}>
                    {inc.severity}
                  </span>
                </button>
              ))}
            </div>
          </div>
          <div className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3">
              <Bell className="w-4 h-4 inline text-yellow-500 mr-2" aria-hidden="true" />
              {t('Active Alerts', 'Alertas', 'Alertes')}
            </h3>
            <div role="list" aria-label={t('Active alerts list', 'Lista de alertas', 'Liste des alertes')}>
              {[
                { msg: t('Gate C congestion', 'Congestión Puerta C', 'Congestion Porte C'), time: '2m', level: 'warning' as const },
                { msg: t('Parking A at 85%', 'Estacionamiento A al 85%', 'Parking A à 85%'), time: '5m', level: 'info' as const },
              ].map((a, i) => (
                <div key={i} role="listitem" className={`flex items-start gap-2 p-2.5 rounded-lg text-sm mb-1 ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${a.level === 'warning' ? 'text-yellow-500' : 'text-blue-500'}`} aria-hidden="true" />
                  <div>
                    <p>{a.msg}</p>
                    <p className="text-[10px] opacity-50">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
