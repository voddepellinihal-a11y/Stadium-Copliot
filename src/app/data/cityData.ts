import { CityKey } from '../components/shared/AppContext';
import { CityKnowledge } from './translations';
import cityKnowledgeData from './city_knowledge.json';

const defaultCityData = {
  name: '',
  country: '',
  location: '',
  languages: [] as string[],
  capacity: 0,
  gates: {} as Record<string, Record<string, string>>,
  restrooms: [] as Record<string, string>[],
  food: [] as Record<string, string>[],
  services: {} as Record<string, Record<string, string>>,
  transport: {} as Record<string, Record<string, string>>,
  accessibility: {
    wheelchair_routes: { en: '' } as Record<string, string>,
    assistance: { en: '' } as Record<string, string>,
  },
  schedule: '' as Record<string, string> | string,
  bag_policy: { en: '' } as Record<string, string>,
};

/**
 * Safely retrieves city data from the knowledge base with a fallback.
 * @param city - The city key to look up
 * @returns City data object, never undefined
 */
export function getCityData(city: CityKey): CityKnowledge[string] {
  return (cityKnowledgeData as CityKnowledge)[city] || defaultCityData;
}
