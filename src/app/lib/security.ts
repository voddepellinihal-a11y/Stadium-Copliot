/**
 * Security utilities for input validation, rate limiting, and XSS prevention.
 * @module security
 */

// Rate limiter - tracks requests per user
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30; // max 30 messages per minute

/**
 * Checks if a user is within the rate limit.
 * @param userId - The user identifier (defaults to 'anonymous')
 * @returns true if the request is allowed, false if rate limited
 */
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

/**
 * Returns the number of remaining requests for a user.
 * @param userId - The user identifier (defaults to 'anonymous')
 * @returns Number of remaining requests in the current window
 */
export function getRateLimitRemaining(userId: string = 'anonymous'): number {
  const record = rateLimitMap.get(userId);
  if (!record) return RATE_LIMIT_MAX_REQUESTS;
  return Math.max(0, RATE_LIMIT_MAX_REQUESTS - record.count);
}

// Input sanitization
const MAX_INPUT_LENGTH = 500;
const MIN_INPUT_LENGTH = 1;

/**
 * Sanitizes user input by removing HTML tags, scripts, and event handlers.
 * @param input - Raw user input string
 * @returns Sanitized string safe for display
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .trim()
    .slice(0, MAX_INPUT_LENGTH);
}

/**
 * Escapes HTML special characters to prevent XSS.
 * @param text - Text to escape
 * @returns HTML-safe escaped string
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, c => map[c] || c);
}

/**
 * Detects spam patterns in user input.
 * @param text - Text to check for spam
 * @returns true if the text matches spam patterns
 */
export function isSpam(text: string): boolean {
  return SPAM_PATTERNS.some(p => p.test(text));
}

const SPAM_PATTERNS = [
  /(.)\1{10,}/, // repeated characters
  /^(.{1,2})\1{5,}/, // repeated short strings
  /https?:\/\/[^\s]+/gi, // URLs
];

/**
 * Validates user input for length and spam.
 * @param input - User input to validate
 * @returns Object with valid flag and optional error message
 */
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

/**
 * Detects emergency keywords in user input across EN/ES/FR.
 * @param text - User input to check
 * @returns true if emergency keywords are detected
 */
export function isEmergencyInput(text: string): boolean {
  return EMERGENCY_PATTERNS.test(text);
}
