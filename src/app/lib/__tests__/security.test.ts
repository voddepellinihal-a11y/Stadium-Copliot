import { checkRateLimit, getRateLimitRemaining, sanitizeInput, escapeHtml, isSpam, validateInput, isEmergencyInput } from '../security';

describe('Rate Limiter', () => {
  it('allows requests within limit', () => {
    expect(checkRateLimit('test-user-1')).toBe(true);
    expect(checkRateLimit('test-user-1')).toBe(true);
  });

  it('blocks requests exceeding limit', () => {
    const userId = 'test-user-2';
    for (let i = 0; i < 30; i++) {
      checkRateLimit(userId);
    }
    expect(checkRateLimit(userId)).toBe(false);
  });

  it('returns remaining count correctly', () => {
    const userId = 'test-user-3';
    expect(getRateLimitRemaining(userId)).toBe(30);
    checkRateLimit(userId);
    expect(getRateLimitRemaining(userId)).toBe(29);
  });
});

describe('sanitizeInput', () => {
  it('removes angle brackets', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
  });

  it('removes javascript protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('removes event handlers', () => {
    expect(sanitizeInput('onclick=alert(1)')).toBe('alert(1)');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  world  ')).toBe('hello world');
  });

  it('truncates to 500 characters', () => {
    const longInput = 'a'.repeat(600);
    expect(sanitizeInput(longInput).length).toBe(500);
  });
});

describe('escapeHtml', () => {
  it('escapes special characters', () => {
    expect(escapeHtml('<div>"hello"</div>')).toBe('&lt;div&gt;&quot;hello&quot;&lt;/div&gt;');
  });

  it('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe("it&#039;s");
  });

  it('escapes ampersand', () => {
    expect(escapeHtml('a & b')).toBe('a &amp; b');
  });
});

describe('isSpam', () => {
  it('detects repeated characters', () => {
    expect(isSpam('aaaaaaaaaaaaa')).toBe(true);
  });

  it('detects repeated short strings', () => {
    expect(isSpam('abababababab')).toBe(true);
  });

  it('detects URLs', () => {
    expect(isSpam('visit https://example.com for info')).toBe(true);
  });

  it('allows normal messages', () => {
    expect(isSpam('Where is the nearest gate?')).toBe(false);
  });
});

describe('validateInput', () => {
  it('rejects empty input', () => {
    const result = validateInput('');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Input is too short');
  });

  it('rejects input exceeding max length', () => {
    const result = validateInput('a'.repeat(501));
    expect(result.valid).toBe(false);
    expect(result.error).toContain('500 characters');
  });

  it('rejects spam messages', () => {
    const result = validateInput('aaaaaaaaaaaaa');
    expect(result.valid).toBe(false);
    expect(result.error).toBe('Message flagged as potential spam');
  });

  it('accepts valid input', () => {
    expect(validateInput('Where is Gate A?').valid).toBe(true);
  });
});

describe('isEmergencyInput', () => {
  it('detects English emergency keywords', () => {
    expect(isEmergencyInput('I need medical help')).toBe(true);
    expect(isEmergencyInput('there is a fire')).toBe(true);
    expect(isEmergencyInput('call an ambulance')).toBe(true);
  });

  it('detects Spanish emergency keywords', () => {
    expect(isEmergencyInput('necesito ayuda médica')).toBe(true);
    expect(isEmergencyInput('hay fuego')).toBe(true);
  });

  it('detects French emergency keywords', () => {
    expect(isEmergencyInput('j\'ai besoin d\'urgence')).toBe(true);
    expect(isEmergencyInput('il y a un incendie')).toBe(true);
  });

  it('does not flag normal messages', () => {
    expect(isEmergencyInput('Where is the food court?')).toBe(false);
  });
});
