# Testing guide

## 1) Manual QA workflow (recommended first)

1. In n8n open folder **AI Customer Support → 03 - Testing**
2. Open **Test - Manual AI Support QA**
3. Ensure OpenAI Header Auth credential is connected on the AI subworkflow nodes
4. Set `$vars.SUPABASE_SERVICE_KEY` to your service role key
5. Click **Execute workflow**
6. Confirm output includes `category`, `confidence`, `ai_response`, `qa_passed=true`
7. In Supabase Table Editor, verify rows in `support_tickets` and `support_execution_logs`

### Force human-review path

In **Load Test Fixture**, set `force_low_confidence = true`, re-run, confirm `auto_reply_eligible=false`.

## 2) Webhook channel

1. Open **Main - Webhook AI Customer Support**
2. Click **Listen for test event**
3. Send:

```bash
curl -X POST "http://localhost:5678/webhook-test/ai-customer-support" ^
  -H "Content-Type: application/json" ^
  -d "@n8n-ai-customer-support/test-data/webhook-payload.json"
```

4. Expect HTTP 202 JSON with `ticket_id`, `category`, `confidence`

## 3) Email channel

1. Connect Gmail OAuth credential on trigger + send nodes
2. Activate **Main - Email AI Customer Support**
3. Send a real unread email to the connected inbox using a fixture from `test-data/sample-emails.json`
4. Watch Executions → should classify, write Airtable, then auto-reply or Slack wait

## 4) Error handler smoke test

Temporarily break OpenAI auth on the AI subworkflow and run Manual QA — Slack alert channel should receive a failure notice and Supabase should log `workflow_error`.

## Acceptance checklist

- [ ] All 6 workflows visible under **AI Customer Support** folders
- [ ] Variables present (threshold, Supabase URL, channels, Airtable)
- [ ] High-confidence path auto-replies
- [ ] Low-confidence path waits on Slack approval links
- [ ] Supabase ticket + execution log rows created
- [ ] Error workflow referenced from main workflow settings
