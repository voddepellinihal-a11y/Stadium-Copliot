import { translations, t } from '../translations';
import { Lang } from '../components/shared/AppContext';

describe('translations', () => {
  const languages: Lang[] = ['en', 'es', 'fr'];

  it('has translations for all supported languages', () => {
    for (const lang of languages) {
      expect(translations[lang]).toBeDefined();
      expect(typeof translations[lang]).toBe('object');
    }
  });

  it('has all required keys for each language', () => {
    const requiredKeys = [
      'stadiumCopilot', 'fifaWorldCup', 'selectCity', 'selectLanguage',
      'welcomeMessage', 'typeYourQuestion', 'askAboutStadium', 'sendMessage',
      'fan', 'volunteer', 'ops', 'analytics', 'sustainability', 'accessibility',
      'opsDashboard', 'analyticsDashboard', 'sustainabilityTracker', 'accessibilityCompanion',
      'volunteerHub', 'skipToContent', 'somethingWrong', 'refreshPage',
    ];

    for (const lang of languages) {
      for (const key of requiredKeys) {
        expect(translations[lang]).toHaveProperty(key);
        expect(typeof translations[lang][key as keyof typeof translations[lang]]).toBe('string');
        expect((translations[lang][key as keyof typeof translations[lang]] as string).length).toBeGreaterThan(0);
      }
    }
  });

  it('has all 13 city translations in each language', () => {
    const cityKeys = [
      'metlifeStadium', 'sofiStadium', 'aztecaStadium', 'bcPlaceStadium',
      'arrowheadStadium', 'attStadium', 'hardRockStadium', 'lincolnStadium',
      'nrgStadium', 'lumenStadium', 'mercedesBenzStadium', 'gilletteStadium', 'cottonBowlStadium',
    ] as const;

    for (const lang of languages) {
      for (const key of cityKeys) {
        expect(translations[lang]).toHaveProperty(key);
        expect((translations[lang][key] as string).length).toBeGreaterThan(0);
      }
    }
  });

  it('has matching key counts across all languages', () => {
    const enKeys = Object.keys(translations.en);
    for (const lang of languages) {
      expect(Object.keys(translations[lang]).length).toBe(enKeys.length);
    }
  });

  it('does not have empty string values', () => {
    for (const lang of languages) {
      for (const [, value] of Object.entries(translations[lang])) {
        expect(typeof value).toBe('string');
        expect((value as string).length).toBeGreaterThan(0);
      }
    }
  });

  it('has non-empty welcome messages for each language', () => {
    expect(translations.en.welcomeMessage.length).toBeGreaterThan(20);
    expect(translations.es.welcomeMessage.length).toBeGreaterThan(20);
    expect(translations.fr.welcomeMessage.length).toBeGreaterThan(20);
  });

  it('has unique values for different languages', () => {
    expect(translations.en.stadiumCopilot).not.toBe(translations.es.stadiumCopilot);
    expect(translations.en.stadiumCopilot).not.toBe(translations.fr.stadiumCopilot);
    expect(translations.es.stadiumCopilot).not.toBe(translations.fr.stadiumCopilot);
  });
});

describe('t() helper function', () => {
  it('returns English translation for en', () => {
    expect(t('en', 'stadiumCopilot')).toBe('Stadium Copilot');
  });

  it('returns Spanish translation for es', () => {
    expect(t('es', 'stadiumCopilot')).toBe('Copiloto del Estadio');
  });

  it('returns French translation for fr', () => {
    expect(t('fr', 'stadiumCopilot')).toBe('Copilote du Stade');
  });

  it('returns correct city translations', () => {
    expect(t('en', 'metlifeStadium')).toBe('MetLife Stadium');
    expect(t('en', 'sofiStadium')).toBe('SoFi Stadium');
    expect(t('en', 'cottonBowlStadium')).toBe('Cotton Bowl');
  });

  it('returns key as last resort fallback for nonexistent key', () => {
    const result = t('en', 'nonexistentKey' as keyof typeof translations.en);
    expect(result).toBe('nonexistentKey');
  });

  it('handles all 13 city keys without errors', () => {
    const cityKeys = [
      'metlifeStadium', 'sofiStadium', 'aztecaStadium', 'bcPlaceStadium',
      'arrowheadStadium', 'attStadium', 'hardRockStadium', 'lincolnStadium',
      'nrgStadium', 'lumenStadium', 'mercedesBenzStadium', 'gilletteStadium', 'cottonBowlStadium',
    ] as const;

    for (const lang of ['en', 'es', 'fr'] as Lang[]) {
      for (const key of cityKeys) {
        const result = t(lang, key);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      }
    }
  });
});
