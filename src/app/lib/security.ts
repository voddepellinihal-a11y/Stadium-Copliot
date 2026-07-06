// Rate limiter - tracks requests per user
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // max 30 messages per minute

export function checkRateLimit(userId: string = 'anonymous'): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(userId);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(userId, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

export function getRateLimitRemaining(userId: string = 'anonymous'): number {
  const record = rateLimitMap.get(userId);
  if (!record) return RATE_LIMIT_MAX_REQUESTS;
  return Math.max(0, RATE_LIMIT_MAX_REQUESTS - record.count);
}

// Input sanitization
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 500);
}

// XSS prevention for output
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Spam detection
const SPAM_PATTERNS = [
  /(.)\1{10,}/, // repeated characters
  /^(.{1,2})\1{5,}/, // repeated short strings
  /https?:\/\/[^\s]+/gi, // URLs
];

export function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some(p => p.test(text));
}

// Input length validation
const MAX_INPUT_LENGTH = 500;
const MIN_INPUT_LENGTH = 1;

export function validateInput(input: string): { valid: boolean; error?: string } {
  if (input.length < MIN_INPUT_LENGTH) {
    return { valid: false, error: 'Input is too short' };
  }
  if (input.length > MAX_INPUT_LENGTH) {
    return { valid: false, error: `Input exceeds ${MAX_INPUT_LENGTH} characters` };
  }
  if (isSpam(input)) {
    return { valid: false, error: 'Message flagged as potential spam' };
  }
  return { valid: true };
}

// Emergency keyword detection (fast check before full processing)
const EMERGENCY_PATTERNS = /\b(fire|medical|emergency|help|doctor|hospital|police|ambulance|fuego|médico|urgencia|ayuda|incendie|urgence|heart attack|bleeding)\b/i;

export function isEmergencyInput(text: string): boolean {
  return EMERGENCY_PATTERNS.test(text);
}
