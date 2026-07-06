'use client';

import React, { useState } from 'react';
import { BarChart3, MessageSquare, Clock, Languages, CheckCircle, AlertCircle, TrendingUp, Globe } from 'lucide-react';
import { useApp } from '../shared/AppContext';

export default function AnalyticsContent() {
  const { language: lang, highContrast } = useApp();
  const [activeMetric, setActiveMetric] = useState('overview');
  const t = (en: string, es: string, fr: string) => lang === 'en' ? en : lang === 'es' ? es : fr;

  const tabs = [
    { key: 'overview', label: t('Overview', 'Resumen', 'Aperçu'), icon: <BarChart3 className="w-4 h-4" /> },
    { key: 'queries', label: t('Top Queries', 'Consultas', 'Requêtes'), icon: <MessageSquare className="w-4 h-4" /> },
    { key: 'performance', label: t('Performance', 'Rendimiento', 'Performance'), icon: <Clock className="w-4 h-4" /> },
    { key: 'languages', label: t('Languages', 'Idiomas', 'Langues'), icon: <Languages className="w-4 h-4" /> },
  ];

  const topQueries = [
    { q: 'Where is the nearest restroom?', count: 1247, pct: 18 },
    { q: 'How do I get to Gate X?', count: 982, pct: 14 },
    { q: 'What time does the match start?', count: 876, pct: 13 },
    { q: 'Where can I find food?', count: 654, pct: 9 },
    { q: 'Is there wheelchair access?', count: 543, pct: 8 },
  ];

  const langBreakdown = [
    { lang: 'English', pct: 62, count: 4210 },
    { lang: 'Spanish', pct: 29, count: 1980 },
    { lang: 'French', pct: 9, count: 610 },
  ];

  return (
    <div className={`flex-1 overflow-y-auto ${highContrast ? 'bg-black' : 'bg-gray-100'}`} role="main" aria-label={t('Analytics Dashboard', 'Panel de Analítica', 'Tableau Analytique')}>
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Tab Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar" role="tablist" aria-label={t('Analytics sections', 'Secciones de analítica', 'Sections analytiques')}>
          {tabs.map(m => (
            <button
              key={m.key}
              onClick={() => setActiveMetric(m.key)}
              role="tab"
              aria-selected={activeMetric === m.key}
              aria-controls={`panel-${m.key}`}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                activeMetric === m.key ? highContrast ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white shadow-md'
                : highContrast ? 'bg-gray-800 text-gray-300' : 'bg-white text-gray-600 shadow-sm'
              }`}
            >
              <span aria-hidden="true">{m.icon}</span> {m.label}
            </button>
          ))}
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3" role="group" aria-label={t('Key performance indicators', 'Indicadores clave', 'Indicateurs clés')}>
          {[
            { icon: <MessageSquare />, label: t('Total Queries', 'Total Consultas', 'Total Requêtes'), value: '6,800' },
            { icon: <CheckCircle />, label: t('Resolution Rate', 'Tasa Resolución', 'Taux Résolution'), value: '87%' },
            { icon: <Clock />, label: t('Avg Response', 'Resp. Promedio', 'Réponse Moy.'), value: '1.2s' },
            { icon: <AlertCircle />, label: t('Emergencies', 'Emergencias', 'Urgences'), value: '24' },
          ].map((kpi, i) => (
            <div key={i} className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
              <div className="mb-2" aria-hidden="true">{kpi.icon}</div>
              <div className="text-xl font-bold" aria-label={`${kpi.label}: ${kpi.value}`}>{kpi.value}</div>
              <div className="text-xs opacity-60">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Panel: Queries */}
        {activeMetric === 'queries' && (
          <div id="panel-queries" role="tabpanel" aria-labelledby="tab-queries" className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3">{t('Most Common Questions', 'Preguntas Comunes', 'Questions Fréquentes')}</h3>
            <div role="list">
              {topQueries.map((q, i) => (
                <div key={i} role="listitem" className={`flex items-center gap-3 p-2.5 rounded-lg ${highContrast ? 'hover:bg-gray-800' : 'hover:bg-gray-50'}`}>
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${highContrast ? 'bg-gray-700' : 'bg-gray-200'}`} aria-hidden="true">{i + 1}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{q.q}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className={`h-1.5 rounded-full flex-1 ${highContrast ? 'bg-gray-700' : 'bg-gray-200'}`} role="progressbar" aria-valuenow={q.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${q.pct}%`}>
                        <div className={`h-full rounded-full ${highContrast ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${q.pct}%` }}></div>
                      </div>
                      <span className="text-xs opacity-60">{q.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel: Languages */}
        {activeMetric === 'languages' && (
          <div id="panel-languages" role="tabpanel" aria-labelledby="tab-languages" className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3"><Globe className="w-4 h-4 inline mr-2" aria-hidden="true" />{t('Language Distribution', 'Distribución de Idiomas', 'Répartition Linguistique')}</h3>
            <div role="list">
              {langBreakdown.map((lb, i) => (
                <div key={i} role="listitem" className={`p-3 rounded-lg mb-2 ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold">{lb.lang}</span>
                    <span className="text-sm font-bold">{lb.pct}%</span>
                  </div>
                  <div className={`h-2 rounded-full ${highContrast ? 'bg-gray-700' : 'bg-gray-200'}`} role="progressbar" aria-valuenow={lb.pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${lb.lang}: ${lb.pct}%`}>
                    <div className={`h-full rounded-full ${highContrast ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${lb.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel: Performance */}
        {activeMetric === 'performance' && (
          <div id="panel-performance" role="tabpanel" aria-labelledby="tab-performance" className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3">{t('System Performance', 'Rendimiento', 'Performance')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: t('Avg Response', 'Resp. Prom.', 'Réponse Moy.'), value: '1.2s' },
                { label: t('P95 Response', 'Resp. P95', 'Réponse P95'), value: '2.8s' },
                { label: t('AI Accuracy', 'Precisión IA', 'Précision IA'), value: '94%' },
                { label: t('Uptime', 'Tiempo Activo', 'Temps Actif'), value: '99.9%' },
              ].map((p, i) => (
                <div key={i} className={`p-3 rounded-lg ${highContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <div className="text-xs opacity-60">{p.label}</div>
                  <div className="text-lg font-bold mt-1">{p.value}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Panel: Overview */}
        {activeMetric === 'overview' && (
          <div id="panel-overview" role="tabpanel" aria-labelledby="tab-overview" className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
            <h3 className="font-bold text-sm mb-3">{t('Real-Time Insights', 'Información', 'Informations')}</h3>
            <p className="text-sm opacity-80">{t(
              'Stadium Copilot has handled over 6,800 fan queries with 87% resolution rate. Average response time: 1.2 seconds.',
              'Stadium Copilot ha manejado más de 6,800 consultas con 87% de resolución.',
              "Stadium Copilot a traité plus de 6 800 requêtes avec un taux de résolution de 87 %."
            )}</p>
          </div>
        )}
      </div>
    </div>
  );
}
