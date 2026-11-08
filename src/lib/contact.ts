const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  message: 5000,
} as const;

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
  website?: string;
};

export type ContactValidationError = "missing" | "invalid_email" | "too_long";

export function parseContactPayload(body: unknown): ContactPayload | null {
  if (!body || typeof body !== "object") return null;
  const data = body as Record<string, unknown>;
  return {
    name: typeof data.name === "string" ? data.name.trim() : "",
    email: typeof data.email === "string" ? data.email.trim() : "",
    message: typeof data.message === "string" ? data.message.trim() : "",
    website: typeof data.website === "string" ? data.website : "",
  };
}

export function validateContactPayload(
  payload: ContactPayload,
): ContactValidationError | null {
  if (!payload.name || !payload.email || !payload.message) return "missing";
  if (!EMAIL_RE.test(payload.email)) return "invalid_email";
  if (
    payload.name.length > CONTACT_LIMITS.name ||
    payload.email.length > CONTACT_LIMITS.email ||
    payload.message.length > CONTACT_LIMITS.message
  ) {
    return "too_long";
  }
  return null;
}

export function buildContactEmail(payload: ContactPayload) {
  const subject = `Contacto portfolio — ${payload.name}`;
  const text = [
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    "",
    payload.message,
  ].join("\n");

  const html = `
    <p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
  `.trim();

  return { subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
