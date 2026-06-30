const getEnvVar = (key: string) => {
  const value = process.env[key];
  return value?.trim() || "";
};

export const env = {
  n8nWebhookUrl: getEnvVar("N8N_WEBHOOK_URL"),
};
