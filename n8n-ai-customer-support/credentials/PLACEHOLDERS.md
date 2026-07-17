# Credential placeholders

Create these exact credential names in n8n so imported nodes auto-bind after you paste secrets.

## 1. OpenAI API Header Auth
- Type: **Header Auth**
- Name: `OpenAI API Header Auth`
- Header Name: `Authorization`
- Header Value: `Bearer sk-...`

## 2. Supabase Service Role Header
- Type: **Header Auth**
- Name: `Supabase Service Role Header`
- Header Name: `Authorization`
- Header Value: `Bearer placeholder`
- Note: workflows also send `$vars.SUPABASE_SERVICE_KEY` explicitly.

## 3. Gmail OAuth2 Support Inbox
- Type: **Gmail OAuth2**
- Name: `Gmail OAuth2 Support Inbox`

## 4. Airtable Personal Access Token
- Type: **Airtable Personal Access Token**
- Name: `Airtable Personal Access Token`
- Scopes: `data.records:read`, `data.records:write`, `schema.bases:read`

## 5. Slack Bot Credential
- Type: **Slack API**
- Name: `Slack Bot Credential`
- Bot scopes: `chat:write`, `channels:read`, `groups:read`
