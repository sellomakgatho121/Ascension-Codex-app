/**
 * HTML Sanitization utility for safe rendering of user content
 * Prevents XSS attacks while preserving safe formatting
 */

// Simple HTML sanitizer for basic formatting
export function sanitizeHTML(html: string): string {
  // Remove potentially dangerous tags and attributes
  const cleanHTML = html
    // Remove script tags entirely
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove iframe tags
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove object/embed tags
    .replace(/<(object|embed|form|input|link|meta)[^>]*>/gi, '')
    // Remove event handlers
    .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '')
    // Remove javascript: links
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, '')
    // Remove data: URIs except images
    .replace(/src\s*=\s*["']data:(?!image\/)[^"']*["']/gi, '')
    // Convert basic markdown-style formatting to HTML safely
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-sacred-gold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');

  return cleanHTML;
}

// Safe content renderer that handles both plain text and basic HTML
export function renderSafeContent(content: string): { __html: string } {
  const sanitized = sanitizeHTML(content);
  return { __html: sanitized };
}

// Validate if content is safe for rendering
export function isContentSafe(content: string): boolean {
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:(?!image\/)/i
  ];
  
  return !dangerousPatterns.some(pattern => pattern.test(content));
}

// Extract plain text from HTML for search/preview purposes
export function extractPlainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with regular space
    .replace(/&lt;/g, '<')   // Decode common entities
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')    // Normalize whitespace
    .trim();
}