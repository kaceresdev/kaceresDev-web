import { Resend } from "resend";
import {
  buildContactEmail,
  parseContactPayload,
  validateContactPayload,
} from "@/lib/contact";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const payload = parseContactPayload(body);
  if (!payload) {
    return Response.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: bots fill this; humans leave it empty.
  if (payload.website?.trim()) {
    return Response.json({ ok: true });
  }

  const validationError = validateContactPayload(payload);
  if (validationError) {
    return Response.json({ ok: false, error: validationError }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("Contact API misconfigured: missing Resend env vars");
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }

  const { subject, text, html } = buildContactEmail(payload);
  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: payload.email,
      subject,
      text,
      html,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ ok: false, error: "send_failed" }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("Contact API unexpected error:", error);
    return Response.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
