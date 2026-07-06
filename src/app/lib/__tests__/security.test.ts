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
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('alert("xss")');
  });

  it('removes javascript protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('removes event handlers', () => {
    expect(sanitizeInput('onclick=alert(1)')).toBe('alert(1)');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello  world  ')).toBe('hello  world');
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

  it('does not flag empty string', () => {
    expect(isEmergencyInput('')).toBe(false);
  });

  it('does not flag single word', () => {
    expect(isEmergencyInput('hello')).toBe(false);
  });
});

describe('Rate Limiter edge cases', () => {
  it('tracks different users independently', () => {
    const userA = 'independent-user-a';
    const userB = 'independent-user-b';
    for (let i = 0; i < 30; i++) {
      checkRateLimit(userA);
    }
    expect(checkRateLimit(userA)).toBe(false);
    expect(checkRateLimit(userB)).toBe(true);
  });

  it('returns full remaining for new user', () => {
    const newUser = 'new-rate-user-' + Date.now();
    expect(getRateLimitRemaining(newUser)).toBe(30);
  });
});

describe('sanitizeInput edge cases', () => {
  it('handles empty input', () => {
    expect(sanitizeInput('')).toBe('');
  });

  it('handles input with only special characters', () => {
    const result = sanitizeInput('<>&"\'');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });

  it('removes nested script tags', () => {
    const result = sanitizeInput('<script><script>alert(1)</script></script>');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });
});

describe('validateInput edge cases', () => {
  it('accepts single character input', () => {
    expect(validateInput('a').valid).toBe(true);
  });

  it('accepts input at 499 characters', () => {
    const input = 'a b c d e f g h i j k l m n o p q r s t u v w x y z '.repeat(9).slice(0, 499);
    expect(validateInput(input).valid).toBe(true);
  });

  it('rejects whitespace-only input', () => {
    const result = validateInput('   a   ');
    expect(result.valid).toBe(true);
  });
});

describe('escapeHtml edge cases', () => {
  it('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  it('handles string with no special chars', () => {
    expect(escapeHtml('hello world')).toBe('hello world');
  });

  it('handles multiple special characters', () => {
    const result = escapeHtml('<>&"\'');
    expect(result).toContain('&lt;');
    expect(result).toContain('&gt;');
    expect(result).toContain('&amp;');
    expect(result).toContain('&quot;');
    expect(result).toContain('&#039;');
  });
});
