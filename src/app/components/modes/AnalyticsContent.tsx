'use client';

import React, { useState } from 'react';
import { BarChart3, MessageSquare, Users, Clock, ThumbsUp, CheckCircle, Activity, Zap, Shield, FileText, Languages, Menu, X } from 'lucide-react';
import { useApp } from '../shared/AppContext';
import { t } from '../../data/translations';

/** Analytics dashboard with KPIs, query stats, language breakdown, and security compliance */
export default function AnalyticsContent() {
  const { language, highContrast } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'satisfaction' | 'performance' | 'security'>('overview');
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = [
    { id: 'overview' as const, icon: BarChart3, label: 'overview' as const },
    { id: 'questions' as const, icon: MessageSquare, label: 'topQuestions' as const },
    { id: 'satisfaction' as const, icon: ThumbsUp, label: 'satisfaction' as const },
    { id: 'performance' as const, icon: Zap, label: 'performance' as const },
    { id: 'security' as const, icon: Shield, label: 'securityCompliance' as const },
  ];

  const kpis = [
    { label: t(language, 'totalQueries'), value: '2,450', trend: '+23%', color: 'blue', icon: MessageSquare },
    { label: t(language, 'uptime'), value: '99.9%', trend: 'Stable', color: 'green', icon: Activity },
    { label: t(language, 'responseTime'), value: '1.8s', trend: '-15%', color: 'purple', icon: Clock },
    { label: t(language, 'satisfactionRate'), value: '94.2%', trend: '+5.1%', color: 'amber', icon: ThumbsUp },
    { label: t(language, 'languagesServed'), value: '3', trend: 'Active', color: 'indigo', icon: Languages },
    { label: t(language, 'activeUsers'), value: '892', trend: '+12%', color: 'cyan', icon: Users },
  ];

  const topQuestions = [
    { q: t(language, 'whereIsNearestGate'), count: 412, lang: 'en', satisfaction: 96 },
    { q: t(language, 'wheelchairAccessibility'), count: 287, lang: 'en', satisfaction: 91 },
    { q: t(language, 'bagPolicyAllowed'), count: 198, lang: 'en', satisfaction: 88 },
    { q: t(language, 'publicTransportRoutes'), count: 165, lang: 'en', satisfaction: 94 },
    { q: t(language, 'nearestRestroom'), count: 143, lang: 'en', satisfaction: 97 },
    { q: t(language, 'menuAndDietary'), count: 128, lang: 'en', satisfaction: 92 },
  ];

  const securityMetrics = [
    { label: 'Input Validation', value: 100, status: 'passed', icon: CheckCircle },
    { label: 'Rate Limiting', value: 100, status: 'passed', icon: Activity },
    { label: 'XSS Prevention', value: 100, status: 'passed', icon: Shield },
    { label: 'Auth & Encryption', value: 100, status: 'passed', icon: Shield },
    { label: 'Emergency Protocols', value: 100, status: 'passed', icon: AlertTriangleIcon },
    { label: 'GDPR Compliance', value: 100, status: 'passed', icon: FileText },
  ];

  const performanceMetrics = [
    { label: t(language, 'aiResponseTime'), value: '1.8s', target: '< 2s', status: 'good' },
    { label: t(language, 'ragAccuracy'), value: '94.2%', target: '> 90%', status: 'good' },
    { label: t(language, 'fallbackRate'), value: '5.8%', target: '< 10%', status: 'good' },
    { label: t(language, 'uptime'), value: '99.9%', target: '> 99%', status: 'good' },
  ];

  const satisfactionData = [
    { category: t(language, 'navigation'), score: 92, responses: 412, icon: '🗺️' },
    { category: t(language, 'crowdManagement'), score: 87, responses: 287, icon: '👥' },
    { category: t(language, 'accessibility'), score: 95, responses: 165, icon: '♿' },
    { category: t(language, 'transportation'), score: 89, responses: 143, icon: '🚌' },
    { category: t(language, 'sustainability'), score: 91, responses: 128, icon: '🌱' },
  ];

  return (
    <div className="h-full flex flex-col p-4 pb-2" role="tabpanel" id="panel-analytics" aria-labelledby="tab-analytics">
      <div className="flex items-center gap-2 mb-3">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highContrast ? 'bg-gray-800 text-amber-400' : 'bg-amber-50'}`}>
          <BarChart3 className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-lg font-bold">{t(language, 'analytics')}</h1>
          <p className="text-xs text-gray-500">{t(language, 'analyticsDesc')}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="relative mb-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-full flex items-center justify-between p-2 rounded-xl bg-gray-100"
          aria-label="Select analytics tab"
          aria-expanded={menuOpen}
        >
          <span className="text-sm font-semibold">{tabs.find(t => t.id === activeTab)?.label || 'Overview'}</span>
          {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
        {menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-lg z-10 border md:hidden" role="menu">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMenuOpen(false); }}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-xl last:rounded-b-xl"
                role="menuitem"
              >
                {t(language, tab.label)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex gap-1 mb-3 bg-gray-100 p-1 rounded-xl" role="tablist" aria-label="Analytics sections">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-analytics-${tab.id}`}
            id={`tab-analytics-${tab.id}`}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? highContrast ? 'bg-yellow-500 text-black shadow' : 'bg-white text-blue-700 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-3.5 h-3.5" aria-hidden="true" />
            {t(language, tab.label)}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-hide" role="tabpanel" id={`panel-analytics-${activeTab}`} aria-labelledby={`tab-analytics-${activeTab}`}>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-4" role="list" aria-label="Key performance indicators">
            {kpis.map((kpi, i) => {
              const Icon = kpi.icon;
              return (
                <div key={i} className={`rounded-2xl p-3 flex flex-col items-center gap-1 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="listitem">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center mb-1 ${highContrast ? 'bg-gray-700 text-yellow-400' : `bg-${kpi.color}-50 text-${kpi.color}-600`}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="text-xl font-bold">{kpi.value}</div>
                  <div className="text-[9px] text-gray-500 font-semibold text-center">{kpi.label}</div>
                  <div className={`text-[10px] font-bold ${kpi.trend.includes('+') || kpi.trend.includes('-') ? 'text-green-600' : 'text-gray-500'}`}>
                    {kpi.trend}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'questions' && (
          <div className="space-y-2" role="log" aria-label="Top questions list">
            {topQuestions.map((item, i) => (
              <div key={i} className={`rounded-xl p-3 flex items-center gap-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="document">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${highContrast ? 'bg-gray-700 text-yellow-400' : 'bg-blue-50 text-blue-600'}`}>
                  #{i + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-xs truncate">{item.q}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    <span>{item.count} {t(language, 'asked')}</span>
                    <span className="mx-1">•</span>
                    <span>{item.satisfaction}% {t(language, 'satisfaction')}</span>
                  </div>
                </div>
                <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${highContrast ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}>
                  {item.lang}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'satisfaction' && (
          <div className="space-y-3" role="list" aria-label="Satisfaction by category">
            {satisfactionData.map((item, i) => (
              <div key={i} className={`rounded-xl p-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="listitem">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">{item.icon}</span>
                    <span className="font-semibold text-xs">{item.category}</span>
                  </div>
                  <span className={`text-sm font-bold ${item.score >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{item.score}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden" role="progressbar" aria-valuenow={item.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${item.category} satisfaction`}>
                  <div className="h-full rounded-full transition-all duration-500" style={{ width: `${item.score}%`, backgroundColor: item.score >= 90 ? '#22c55e' : '#f59e0b' }} />
                </div>
                <div className="text-[10px] text-gray-500 mt-1">{item.responses} {t(language, 'responses')}</div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'performance' && (
          <div className="space-y-2" role="list" aria-label="Performance metrics">
            {performanceMetrics.map((metric, i) => (
              <div key={i} className={`rounded-xl p-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="listitem">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-xs">{metric.label}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-blue-600">{metric.value}</span>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${highContrast ? 'bg-gray-700 text-green-400' : 'bg-green-100 text-green-700'}`}>
                      {metric.target}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-2" role="list" aria-label="Security compliance">
            {securityMetrics.map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div key={i} className={`rounded-xl p-3 flex items-center gap-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="listitem">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highContrast ? 'bg-gray-700 text-green-400' : 'bg-green-50 text-green-600'}`}>
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-xs">{metric.label}</div>
                    <div className="text-[10px] text-gray-500">Status: {metric.status}</div>
                  </div>
                  <div className={`text-lg font-bold ${highContrast ? 'text-green-400' : 'text-green-600'}`}>{metric.value}%</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4" /><path d="M12 17h.01"/></svg>;
}
