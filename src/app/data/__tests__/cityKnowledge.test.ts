import { translations } from '../translations';
import cityKnowledge from '../city_knowledge.json';

describe('city_knowledge.json', () => {
  const expectedCities = [
    'metlife', 'sofi', 'azteca', 'bc_place',
    'arrowhead', 'at_t_stadium', 'hard_rock', 'lincoln_financial',
    'nrg', 'lumen', 'mercedes_benz', 'gillette', 'cotton_bowl',
  ] as const;

  it('has data for all 13 FIFA World Cup 2026 cities', () => {
    for (const city of expectedCities) {
      expect(cityKnowledge).toHaveProperty(city);
    }
  });

  it('has exactly 13 cities (no duplicates)', () => {
    const keys = Object.keys(cityKnowledge);
    expect(keys.length).toBe(13);
  });

  it('each city has required fields', () => {
    for (const city of expectedCities) {
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
      expect(venue).toHaveProperty('capacity');
    }
  });

  it('each city has at least 2 gates', () => {
    for (const city of expectedCities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      const gateCount = Object.keys(venue.gates).length;
      expect(gateCount).toBeGreaterThanOrEqual(2);
    }
  });

  it('each city has medical services', () => {
    for (const city of expectedCities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      expect(venue.services).toHaveProperty('medical');
      expect(venue.services.medical).toHaveProperty('en');
      expect((venue.services.medical as Record<string, string>).en.length).toBeGreaterThan(0);
    }
  });

  it('each city has food options', () => {
    for (const city of expectedCities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      expect(venue.food.length).toBeGreaterThanOrEqual(2);
    }
  });

  it('each city has transport info', () => {
    for (const city of expectedCities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      expect(Object.keys(venue.transport).length).toBeGreaterThanOrEqual(1);
    }
  });

  it('each city has accessibility info', () => {
    for (const city of expectedCities) {
      const venue = cityKnowledge[city as keyof typeof cityKnowledge];
      expect(venue.accessibility).toHaveProperty('wheelchair_routes');
      expect(venue.accessibility).toHaveProperty('assistance');
    }
  });

  it('has cities matching translations city keys', () => {
    const translationCities = [
      'metlifeStadium', 'sofiStadium', 'aztecaStadium', 'bcPlaceStadium',
      'arrowheadStadium', 'attStadium', 'hardRockStadium', 'lincolnStadium',
      'nrgStadium', 'lumenStadium', 'mercedesBenzStadium', 'gilletteStadium', 'cottonBowlStadium',
    ] as const;
    for (const key of translationCities) {
      expect(translations.en).toHaveProperty(key);
      expect(translations.es).toHaveProperty(key);
      expect(translations.fr).toHaveProperty(key);
    }
  });
});
