# Hikmet rollout setup

Replace `api/chat.js` with the included file.

## Required Vercel environment variables

- `GEMINI_API_KEY`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `RATE_LIMIT_SECRET` — generate a long random value
- `APP_ORIGIN` — exact production origin, for example `https://your-domain.example`

Set all variables for Production, then redeploy.

## Current limits

- 3 requests per minute per hashed IP
- 10 requests per UTC day per hashed IP
- 4,000 characters per user message
- Last 8 conversation items only
- At most 16,000 conversation characters sent to Gemini
- 1,536 maximum output tokens
- One Gemini request per user request
- 30-second upstream timeout

In production, the endpoint fails closed if persistent Redis rate limiting is not configured. Raw IP addresses are not stored in Redis; an HMAC-derived identifier is used.

## Validation

The included JavaScript passed `node --check` using Node.js v22.16.0.
