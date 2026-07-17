# AI Customer Support Automation — Environment Variables

Copy these into n8n **Settings → Variables** (preferred) or host env vars.

| Key | Example | Purpose |
|---|---|---|
| `CONFIDENCE_THRESHOLD` | `90` | Auto-reply cutoff |
| `OPENAI_MODEL` | `gpt-4o-mini` | Classification + reply model |
| `SUPPORT_BRAND_NAME` | `Acme Support` | Brand voice in AI replies |
| `SUPABASE_URL` | `https://ltwohsvgafjtxdgypmyh.supabase.co` | Logging API base |
| `SUPABASE_SERVICE_KEY` | `eyJ...` (service_role) | Upsert tickets/logs |
| `AIRTABLE_BASE_ID` | `appXXXXXXXX` | Support Tickets base |
| `AIRTABLE_TABLE_NAME` | `Support Tickets` | Table name |
| `SLACK_SUPPORT_CHANNEL` | `customer-support` | Human approval channel |
| `SLACK_ALERT_CHANNEL` | `support-alerts` | Error alerts |
| `GMAIL_SEARCH_QUERY` | `label:inbox -category:promotions` | Gmail trigger filter |

## Credentials to create in n8n

| Credential name | Type | Notes |
|---|---|---|
| `OpenAI API Header Auth` | Header Auth | Name=`Authorization`, Value=`Bearer sk-...` |
| `Supabase Service Role Header` | Header Auth | Placeholder OK; real key via `$vars.SUPABASE_SERVICE_KEY` |
| `Gmail OAuth2 Support Inbox` | Gmail OAuth2 | Support mailbox |
| `Airtable Personal Access Token` | Airtable Token | `data.records:read/write` |
| `Slack Bot Credential` | Slack API | `chat:write`, `channels:read` |
