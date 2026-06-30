import { env } from "@/env";
import { HEADERS } from "../constants/constant";

export async function submitBookingToN8n(payload: unknown) {
  if (!env.n8nWebhookUrl) {
    throw new Error("Webhook URL is not configured.");
  }

  const response = await fetch(env.n8nWebhookUrl, {
    method: "POST",
    headers: HEADERS.JSON,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed with status ${response.status}`);
  }

  return response;
}
