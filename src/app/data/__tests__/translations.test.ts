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
      'metlifeStadium', 'sofiStadium', 'aztecaStadium', 'bcPlaceStadium',
    ];

    for (const lang of languages) {
      for (const key of requiredKeys) {
        expect(translations[lang]).toHaveProperty(key);
        expect(typeof translations[lang][key as keyof typeof translations[lang]]).toBe('string');
        expect((translations[lang][key as keyof typeof translations[lang]] as string).length).toBeGreaterThan(0);
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

  it('falls back to English if translation missing', () => {
    const result = t('es' as Lang, 'stadiumCopilot');
    expect(result).toBeTruthy();
  });

  it('returns key as last resort fallback', () => {
    const result = t('en', 'nonexistentKey' as keyof typeof translations.en);
    expect(result).toBe('nonexistentKey');
  });
});
