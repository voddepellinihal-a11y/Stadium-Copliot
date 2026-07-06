'use client';

import React, { useState } from 'react';
import { Accessibility, MapPin, Phone, AlertTriangle, CheckCircle, Volume2, Contrast, Languages } from 'lucide-react';
import { useApp } from '../shared/AppContext';
import { t, CityKnowledge } from '../../data/translations';
import cityKnowledgeData from '../../data/city_knowledge.json';

export default function AccessibilityContent() {
  const { language, highContrast, setHighContrast, fontScale, setFontScale, city } = useApp();
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  const [emergencyActive, setEmergencyActive] = useState(false);
  const cityData = (cityKnowledgeData as CityKnowledge)[city] || {
    name: '', country: '', location: '', languages: [], capacity: 0,
    gates: {}, restrooms: [], food: [], services: {}, transport: {},
    accessibility: { wheelchair_routes: { en: '' }, assistance: { en: '' } },
    schedule: '', bag_policy: { en: '' }
  };

  const handleEmergency = (_type: 'medical' | 'security' | 'lost') => {
    setEmergencyActive(true);
    setTimeout(() => setEmergencyActive(false), 5000);
  };

  const getAccessibleRoutes = () => [
    { from: 'North Gate', to: 'Section 101', distance: '200m', elevator: true, wheelchair: true, color: '#3b82f6' },
    { from: 'South Gate', to: 'Section 205', distance: '350m', elevator: true, wheelchair: true, color: '#8b5cf6' },
    { from: 'East Entrance', to: 'VIP Lounge', distance: '150m', elevator: true, wheelchair: true, color: '#10b981' },
  ];

  const wheelchairRoutes = cityData.accessibility?.wheelchair_routes
    ? [cityData.accessibility.wheelchair_routes[language as 'en' | 'es' | 'fr'] || cityData.accessibility.wheelchair_routes.en]
    : ['Wheelchair accessible routes available at all gates'];

  return (
    <div className="h-full flex flex-col p-4 pb-2" role="tabpanel" id="panel-accessibility" aria-labelledby="tab-accessibility">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highContrast ? 'bg-gray-800 text-indigo-400' : 'bg-indigo-50'}`}>
            <Accessibility className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{t(language, 'accessibility')}</h1>
            <p className="text-xs text-gray-500">{t(language, 'accessibilityDesc')}</p>
          </div>
        </div>
      </div>

      {/* Accessibility Controls */}
      <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className="font-bold text-xs mb-2">{t(language, 'displaySettings')}</h3>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="font-slider" className="text-xs font-medium">{t(language, 'fontSize')}</label>
              <span className="text-xs text-gray-500">{Math.round(fontScale * 100)}%</span>
            </div>
            <input
              id="font-slider"
              type="range"
              min="0.8"
              max="1.5"
              step="0.1"
              value={fontScale}
              onChange={e => setFontScale(parseFloat(e.target.value))}
              aria-label={t(language, 'fontSize')}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>
          <button
            onClick={() => setHighContrast(!highContrast)}
            role="switch"
            aria-checked={highContrast}
            aria-label={t(language, 'highContrast')}
            className={`flex items-center justify-between w-full p-2.5 rounded-xl transition-all ${
              highContrast ? 'bg-yellow-500 text-black font-bold' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Contrast className="w-4 h-4" aria-hidden="true" />
              <span className="text-xs font-medium">{t(language, 'highContrast')}</span>
            </div>
            <div className={`w-10 h-5 rounded-full flex items-center px-0.5 ${highContrast ? 'bg-black justify-end' : 'bg-gray-300 justify-start'}`}>
              <div className="w-4 h-4 rounded-full bg-white shadow" />
            </div>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-2 mb-3" role="group" aria-label="Accessibility quick actions">
        <button
          onClick={() => setActiveFeature(activeFeature === 'stepFree' ? null : 'stepFree')}
          role="checkbox"
          aria-checked={activeFeature === 'stepFree'}
          aria-label={t(language, 'stepFreeRoutes')}
          className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${
            highContrast
              ? activeFeature === 'stepFree' ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-600 text-gray-300'
              : activeFeature === 'stepFree' ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
        >
          <MapPin className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-semibold text-center leading-tight">{t(language, 'stepFreeRoutes')}</span>
        </button>
        <button
          onClick={() => setActiveFeature(activeFeature === 'hearing' ? null : 'hearing')}
          role="checkbox"
          aria-checked={activeFeature === 'hearing'}
          aria-label={t(language, 'hearingAid')}
          className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${
            highContrast
              ? activeFeature === 'hearing' ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-600 text-gray-300'
              : activeFeature === 'hearing' ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
        >
          <Volume2 className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-semibold text-center leading-tight">{t(language, 'hearingAid')}</span>
        </button>
        <button
          onClick={() => setActiveFeature(activeFeature === 'sensory' ? null : 'sensory')}
          role="checkbox"
          aria-checked={activeFeature === 'sensory'}
          aria-label={t(language, 'sensoryKits')}
          className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all ${
            highContrast
              ? activeFeature === 'sensory' ? 'bg-yellow-500 border-yellow-500 text-black' : 'border-gray-600 text-gray-300'
              : activeFeature === 'sensory' ? 'bg-blue-100 border-blue-500' : 'border-gray-200 hover:border-blue-300 bg-white'
          }`}
        >
          <Languages className="w-5 h-5 mb-1" aria-hidden="true" />
          <span className="text-[9px] font-semibold text-center leading-tight">{t(language, 'sensoryKits')}</span>
        </button>
      </div>

      {/* Step-Free Routes */}
      {activeFeature === 'stepFree' && (
        <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="list" aria-label="Step-free routes">
          <h3 className="font-bold text-xs mb-2">{t(language, 'stepFreeRoutes')}</h3>
          <div className="space-y-2">
            {getAccessibleRoutes().map((route, i) => (
              <div key={i} className={`flex items-center gap-3 p-2 rounded-xl ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`} role="listitem">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: route.color + '20', color: route.color }}>
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="flex-1">
                  <div className="text-[10px] font-semibold">{route.from} → {route.to}</div>
                  <div className="text-[9px] text-gray-500">{route.distance} • {route.elevator ? 'Elevator' : 'Ramp'}</div>
                </div>
                <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Accessible Seating */}
      <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-xs">{t(language, 'accessibleSeating')}</h3>
          <span className={`text-xs font-bold ${highContrast ? 'text-yellow-400' : 'text-blue-600'}`}>
            {cityData.capacity?.toLocaleString() || 'N/A'}
          </span>
        </div>
        <div className="space-y-1.5">
          {wheelchairRoutes.map((route, i) => (
            <div key={i} className={`flex items-center gap-2 p-2 rounded-xl text-xs ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <MapPin className="w-3.5 h-3.5 text-green-500" aria-hidden="true" />
              <span className="text-[10px]">{route}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Escalation */}
      <div className={`rounded-2xl p-3 ${emergencyActive ? 'ring-2 ring-red-500' : ''} ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`} role="alert" aria-live="assertive">
        <h3 className="font-bold text-xs mb-2 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" aria-hidden="true" />
          {t(language, 'emergencyEscalation')}
        </h3>
        {emergencyActive ? (
          <div className="p-3 rounded-xl bg-red-100 text-red-800 text-xs font-medium text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Phone className="w-4 h-4 animate-pulse" aria-hidden="true" />
              <span>{t(language, 'alertSent')}</span>
            </div>
            <p className="text-[10px] text-red-600">Staff notified • Response team dispatched</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleEmergency('medical')}
              aria-label="Medical emergency escalation"
              className="flex flex-col items-center p-2 rounded-xl bg-red-50 hover:bg-red-100 transition-colors"
            >
              <span className="text-lg" aria-hidden="true">🏥</span>
              <span className="text-[9px] font-semibold mt-1">{t(language, 'medical')}</span>
            </button>
            <button
              onClick={() => handleEmergency('security')}
              aria-label="Security emergency escalation"
              className="flex flex-col items-center p-2 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors"
            >
              <span className="text-lg" aria-hidden="true">🛡️</span>
              <span className="text-[9px] font-semibold mt-1">{t(language, 'security')}</span>
            </button>
            <button
              onClick={() => handleEmergency('lost')}
              aria-label="Lost person emergency escalation"
              className="flex flex-col items-center p-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-lg" aria-hidden="true">👤</span>
              <span className="text-[9px] font-semibold mt-1">{t(language, 'lostPerson')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
