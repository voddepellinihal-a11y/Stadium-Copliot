import { translations } from '../translations';
import cityKnowledge from '../city_knowledge.json';

describe('city_knowledge.json', () => {
  const cities = ['metlife', 'sofi', 'azteca', 'bc_place'] as const;

  it('has data for all 4 cities', () => {
    for (const city of cities) {
      expect(cityKnowledge).toHaveProperty(city);
    }
  });

  it('each city has required fields', () => {
    for (const city of cities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      expect(venue).toHaveProperty('name');
      expect(venue).toHaveProperty('country');
      expect(venue).toHaveProperty('languages');
      expect(venue).toHaveProperty('gates');
      expect(venue).toHaveProperty('restrooms');
      expect(venue).toHaveProperty('food');
      expect(venue).toHaveProperty('services');
      expect(venue).toHaveProperty('transport');
      expect(venue).toHaveProperty('schedule');
    }
  });

  it('each city has multilingual gate info', () => {
    for (const city of cities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      const gateKeys = Object.keys(venue.gates);
      expect(gateKeys.length).toBeGreaterThan(0);
      for (const gateKey of gateKeys) {
        const gate = venue.gates[gateKey as keyof typeof venue.gates];
        expect(gate).toHaveProperty('en');
        expect((gate as Record<string, string>).en.length).toBeGreaterThan(0);
      }
    }
  });

  it('each city has services with medical info', () => {
    for (const city of cities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      expect(venue.services).toHaveProperty('medical');
      expect(venue.services.medical).toHaveProperty('en');
    }
  });

  it('has cities matching translations city keys', () => {
    const translationCities = ['metlifeStadium', 'sofiStadium', 'aztecaStadium', 'bcPlaceStadium'] as const;
    for (const key of translationCities) {
      expect(translations.en).toHaveProperty(key);
      expect(translations.es).toHaveProperty(key);
      expect(translations.fr).toHaveProperty(key);
    }
  });
});
