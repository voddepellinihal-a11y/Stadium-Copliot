import knowledgeBase from './knowledge_base.json';
import { Lang } from '../components/shared/AppContext';

export function detectEmergency(text: string): boolean {
  const keywords = ['fire', 'medical', 'emergency', 'help', 'doctor', 'hospital', 'police', 'fuego', 'médico', 'urgencia', 'policía', 'incendie', 'urgence', 'pompier'];
  return keywords.some(k => text.toLowerCase().includes(k));
}

export async function getResponse(question: string, lang: Lang): Promise<string> {
  await new Promise(res => setTimeout(res, 800)); // simulate network

  if (detectEmergency(question)) {
    return knowledgeBase.emergency[lang] || knowledgeBase.emergency.en;
  }

  const lower = question.toLowerCase();

  // Simple keyword matching for the demo
  if (lower.includes('gate') || lower.includes('gate_a') || lower.includes('gate g')) {
    if (lower.includes('a')) return knowledgeBase.venues.gates.gate_a[lang];
    if (lower.includes('b')) return knowledgeBase.venues.gates.gate_b[lang];
    if (lower.includes('c')) return knowledgeBase.venues.gates.gate_c[lang];
    if (lower.includes('g')) return knowledgeBase.venues.gates.gate_g[lang];
    return knowledgeBase.venues.gates.gate_a[lang]; // default
  }

  if (lower.includes('restroom') || lower.includes('toilet') || lower.includes('bathroom') || lower.includes('baño') || lower.includes('toilettes')) {
    return knowledgeBase.venues.restrooms.map(r => r[lang]).join('\n');
  }

  if (lower.includes('food') || lower.includes('eat') || lower.includes('comida') || lower.includes('manger')) {
    return knowledgeBase.venues.food.map(r => r[lang]).join('\n');
  }

  if (lower.includes('match') || lower.includes('start') || lower.includes('inicio') || lower.includes('début') || lower.includes('commence')) {
    return knowledgeBase.faqs[0][lang];
  }

  return knowledgeBase.fallback[lang] || knowledgeBase.fallback.en;
}
