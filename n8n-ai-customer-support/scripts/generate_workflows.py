#!/usr/bin/env python3
"""Generate production-ready n8n workflow JSON for AI Customer Support Automation."""

from __future__ import annotations

import json
import uuid
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
WF_DIR = ROOT / "workflows"
WF_DIR.mkdir(parents=True, exist_ok=True)

# Stable IDs so parent workflows can reference subworkflows after import
IDS = {
    "classify": "aicsClassifySub1",
    "logger": "aicsLogSupabase2",
    "error": "aicsErrorHandler",
    "email": "aicsMainEmailWf",
    "webhook": "aicsWebhookFlow",
    "manual": "aicsManualTestW",
}

PROJECT_ID = "zKWuALHErl8nOjxH"
USER_ID = "45813284-7302-41f1-9959-567e981d422c"


def nid() -> str:
    return str(uuid.uuid4())


def sticky(name: str, content: str, pos: list[int], width: int = 420, height: int = 240, color: int = 5) -> dict:
    return {
        "parameters": {
            "content": content,
            "height": height,
            "width": width,
            "color": color,
        },
        "id": nid(),
        "name": name,
        "type": "n8n-nodes-base.stickyNote",
        "typeVersion": 1,
        "position": pos,
    }


def settings(error_workflow_id: str | None = None) -> dict:
    s = {
        "executionOrder": "v1",
        "saveManualExecutions": True,
        "callerPolicy": "workflowsFromSameOwner",
        "errorWorkflow": error_workflow_id or IDS["error"],
        "timezone": "UTC",
        "executionTimeout": 900,
    }
    return s


def base_meta(folder_hint: str) -> dict:
    return {
        "templateCredsSetupCompleted": False,
        "instanceId": "local-portfolio-n8n",
    }


def write_workflow(filename: str, payload: dict) -> None:
    path = WF_DIR / filename
    path.write_text(json.dumps(payload, indent=2), encoding="utf-8")
    print(f"wrote {path.name}")


# ---------------------------------------------------------------------------
# 1) Reusable subworkflow: AI Classify + Draft Response
# ---------------------------------------------------------------------------

def workflow_classify() -> dict:
    nodes = [
        sticky(
            "Docs · AI Classification Subworkflow",
            "## Reusable Subworkflow\n\n**Purpose:** Classify inbound support messages and draft a reply.\n\n**Input fields:** `ticket_id`, `customer_name`, `customer_email`, `subject`, `body`, `channel`\n\n**Output fields:** `category`, `confidence`, `ai_summary`, `ai_response`, `priority`\n\nUses `$vars.OPENAI_MODEL` and `$vars.CONFIDENCE_THRESHOLD`.",
            [-520, -120],
            460,
            320,
            4,
        ),
        {
            "id": nid(),
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "typeVersion": 1.1,
            "position": [-40, 200],
            "parameters": {
                "inputSource": "passthrough",
            },
            "notes": "Entry point for parent workflows (email / webhook / manual).",
            "notesInFlow": True,
        },
        {
            "id": nid(),
            "name": "Validate Inbound Payload",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [220, 200],
            "parameters": {
                "jsCode": """const item = $input.first().json;
const required = ['customer_email', 'body'];
for (const key of required) {
  if (!item[key] || String(item[key]).trim() === '') {
    throw new Error(`Missing required field: ${key}`);
  }
}
const ticketId = item.ticket_id || `TKT-${Date.now()}`;
return [{
  json: {
    ticket_id: ticketId,
    customer_name: item.customer_name || 'Valued Customer',
    customer_email: String(item.customer_email).trim().toLowerCase(),
    subject: item.subject || '(no subject)',
    body: String(item.body).slice(0, 12000),
    channel: item.channel || 'email',
    received_at: item.received_at || new Date().toISOString(),
  }
}];"""
            },
            "notes": "Guards against empty payloads before spending OpenAI tokens.",
            "notesInFlow": True,
            "retryOnFail": True,
            "maxTries": 2,
        },
        {
            "id": nid(),
            "name": "Build Classification Prompt",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [480, 200],
            "parameters": {
                "mode": "manual",
                "duplicateItem": False,
                "assignments": {
                    "assignments": [
                        {
                            "id": nid(),
                            "name": "system_prompt",
                            "value": "You are an expert customer support triage engine. Classify the email into exactly one category: Billing, Technical Support, Sales, Refund, General Inquiry. Return strict JSON with keys: category (string), confidence (number 0-100), priority (Low|Medium|High|Urgent), ai_summary (string <= 280 chars), reasoning (string).",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "user_prompt",
                            "value": "=Ticket: {{$json.ticket_id}}\nFrom: {{$json.customer_name}} <{{$json.customer_email}}>\nSubject: {{$json.subject}}\n\nBody:\n{{$json.body}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ticket_id",
                            "value": "={{$json.ticket_id}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "customer_name",
                            "value": "={{$json.customer_name}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "customer_email",
                            "value": "={{$json.customer_email}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "subject",
                            "value": "={{$json.subject}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "body",
                            "value": "={{$json.body}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "channel",
                            "value": "={{$json.channel}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "received_at",
                            "value": "={{$json.received_at}}",
                            "type": "string",
                        },
                    ]
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "OpenAI · Classify Message",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [760, 200],
            "parameters": {
                "method": "POST",
                "url": "https://api.openai.com/v1/chat/completions",
                "authentication": "genericCredentialType",
                "genericAuthType": "httpHeaderAuth",
                "sendBody": True,
                "specifyBody": "json",
                "jsonBody": "={{JSON.stringify({ model: $vars.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.1, response_format: { type: 'json_object' }, messages: [ { role: 'system', content: $json.system_prompt }, { role: 'user', content: $json.user_prompt } ] })}}",
                "options": {
                    "timeout": 60000,
                    "retry": {
                        "maxRetries": 3,
                        "retryInterval": 2000,
                    },
                },
            },
            "credentials": {
                "httpHeaderAuth": {
                    "id": "credOpenAiHeader",
                    "name": "OpenAI API Header Auth",
                }
            },
            "notes": "Header Auth value should be: Bearer <OPENAI_API_KEY>",
            "notesInFlow": True,
            "retryOnFail": True,
            "maxTries": 3,
            "waitBetweenTries": 2000,
            "onError": "continueErrorOutput",
        },
        {
            "id": nid(),
            "name": "Parse Classification JSON",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [1040, 200],
            "parameters": {
                "jsCode": """const prev = $('Build Classification Prompt').first().json;
const raw = $input.first().json;
const content = raw?.choices?.[0]?.message?.content;
if (!content) {
  throw new Error('OpenAI classification returned empty content');
}
let parsed;
try {
  parsed = typeof content === 'string' ? JSON.parse(content) : content;
} catch (e) {
  throw new Error('Failed to parse classification JSON: ' + e.message);
}
const allowed = ['Billing', 'Technical Support', 'Sales', 'Refund', 'General Inquiry'];
let category = parsed.category || 'General Inquiry';
if (!allowed.includes(category)) category = 'General Inquiry';
const confidence = Math.max(0, Math.min(100, Number(parsed.confidence) || 0));
return [{
  json: {
    ...prev,
    category,
    confidence,
    priority: parsed.priority || 'Medium',
    ai_summary: parsed.ai_summary || parsed.reasoning || 'No summary provided',
    classification_reasoning: parsed.reasoning || '',
  }
}];"""
            },
        },
        {
            "id": nid(),
            "name": "Build Reply Prompt",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [1300, 200],
            "parameters": {
                "mode": "manual",
                "assignments": {
                    "assignments": [
                        {
                            "id": nid(),
                            "name": "reply_system",
                            "value": "You are a professional, empathetic customer support agent. Write a clear email reply. Never invent account balances, refund amounts, or policy exceptions. If information is missing, ask concise clarifying questions. Return strict JSON with keys: subject (string), body (string), confidence (number 0-100).",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "reply_user",
                            "value": "=Brand: {{$vars.SUPPORT_BRAND_NAME || 'Customer Support'}}\nCategory: {{$json.category}}\nPriority: {{$json.priority}}\nCustomer: {{$json.customer_name}}\nOriginal subject: {{$json.subject}}\nSummary: {{$json.ai_summary}}\n\nOriginal message:\n{{$json.body}}\n\nWrite a helpful reply.",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ticket_id",
                            "value": "={{$json.ticket_id}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "customer_name",
                            "value": "={{$json.customer_name}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "customer_email",
                            "value": "={{$json.customer_email}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "subject",
                            "value": "={{$json.subject}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "body",
                            "value": "={{$json.body}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "channel",
                            "value": "={{$json.channel}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "received_at",
                            "value": "={{$json.received_at}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "category",
                            "value": "={{$json.category}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "confidence",
                            "value": "={{$json.confidence}}",
                            "type": "number",
                        },
                        {
                            "id": nid(),
                            "name": "priority",
                            "value": "={{$json.priority}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ai_summary",
                            "value": "={{$json.ai_summary}}",
                            "type": "string",
                        },
                    ]
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "OpenAI · Generate Reply Draft",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [1580, 200],
            "parameters": {
                "method": "POST",
                "url": "https://api.openai.com/v1/chat/completions",
                "authentication": "genericCredentialType",
                "genericAuthType": "httpHeaderAuth",
                "sendBody": True,
                "specifyBody": "json",
                "jsonBody": "={{JSON.stringify({ model: $vars.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.4, response_format: { type: 'json_object' }, messages: [ { role: 'system', content: $json.reply_system }, { role: 'user', content: $json.reply_user } ] })}}",
                "options": {"timeout": 60000},
            },
            "credentials": {
                "httpHeaderAuth": {
                    "id": "credOpenAiHeader",
                    "name": "OpenAI API Header Auth",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
            "waitBetweenTries": 2000,
        },
        {
            "id": nid(),
            "name": "Assemble AI Result",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [1860, 200],
            "parameters": {
                "jsCode": """const base = $('Build Reply Prompt').first().json;
const raw = $input.first().json;
const content = raw?.choices?.[0]?.message?.content;
if (!content) throw new Error('OpenAI reply draft returned empty content');
const parsed = typeof content === 'string' ? JSON.parse(content) : content;
const replyConfidence = Math.max(0, Math.min(100, Number(parsed.confidence) || Number(base.confidence) || 0));
const finalConfidence = Math.round((Number(base.confidence) + replyConfidence) / 2);
const threshold = Number($vars.CONFIDENCE_THRESHOLD || 90);
return [{
  json: {
    ticket_id: base.ticket_id,
    customer_name: base.customer_name,
    customer_email: base.customer_email,
    subject: base.subject,
    body: base.body,
    channel: base.channel,
    received_at: base.received_at,
    category: base.category,
    priority: base.priority,
    ai_summary: base.ai_summary,
    ai_response_subject: parsed.subject || `Re: ${base.subject}`,
    ai_response: parsed.body || '',
    confidence: finalConfidence,
    classification_confidence: Number(base.confidence),
    reply_confidence: replyConfidence,
    confidence_threshold: threshold,
    auto_reply_eligible: finalConfidence >= threshold,
    status: finalConfidence >= threshold ? 'classified_auto' : 'classified_review',
  }
}];"""
            },
            "notes": "Averages classification + reply confidence; compares to $vars.CONFIDENCE_THRESHOLD.",
            "notesInFlow": True,
        },
    ]

    connections = {
        "Execute Workflow Trigger": {"main": [[{"node": "Validate Inbound Payload", "type": "main", "index": 0}]]},
        "Validate Inbound Payload": {"main": [[{"node": "Build Classification Prompt", "type": "main", "index": 0}]]},
        "Build Classification Prompt": {"main": [[{"node": "OpenAI · Classify Message", "type": "main", "index": 0}]]},
        "OpenAI · Classify Message": {"main": [[{"node": "Parse Classification JSON", "type": "main", "index": 0}]]},
        "Parse Classification JSON": {"main": [[{"node": "Build Reply Prompt", "type": "main", "index": 0}]]},
        "Build Reply Prompt": {"main": [[{"node": "OpenAI · Generate Reply Draft", "type": "main", "index": 0}]]},
        "OpenAI · Generate Reply Draft": {"main": [[{"node": "Assemble AI Result", "type": "main", "index": 0}]]},
    }

    return {
        "id": IDS["classify"],
        "name": "Sub · AI Classify & Draft Response",
        "active": False,
        "isArchived": False,
        "nodes": nodes,
        "connections": connections,
        "settings": settings(),
        "meta": base_meta("01-Core"),
        "tags": [{"name": "AI Customer Support"}, {"name": "Subworkflow"}],
        "versionId": nid(),
        "pinData": {},
    }


# ---------------------------------------------------------------------------
# 2) Logging subworkflow → Supabase
# ---------------------------------------------------------------------------

def workflow_logger() -> dict:
    nodes = [
        sticky(
            "Docs · Supabase Logger",
            "## Logging Subworkflow\n\nWrites ticket snapshots + execution events to Supabase tables:\n- `support_tickets`\n- `support_execution_logs`\n\nAuth: Header Auth with `apikey` + `Authorization: Bearer <service_role>`.",
            [-480, -80],
            440,
            260,
            6,
        ),
        {
            "id": nid(),
            "name": "Execute Workflow Trigger",
            "type": "n8n-nodes-base.executeWorkflowTrigger",
            "typeVersion": 1.1,
            "position": [0, 180],
            "parameters": {"inputSource": "passthrough"},
        },
        {
            "id": nid(),
            "name": "Normalize Log Payload",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [260, 180],
            "parameters": {
                "jsCode": """const j = $input.first().json;
const ticketId = j.ticket_id || `TKT-${Date.now()}`;
const eventType = j.event_type || 'ticket_upsert';
const level = j.level || 'info';
const message = j.message || `Support event ${eventType}`;
const supabaseUrl = ($vars.SUPABASE_URL || '').replace(/\\/$/, '');
if (!supabaseUrl) {
  throw new Error('Missing $vars.SUPABASE_URL');
}
return [{
  json: {
    supabase_url: supabaseUrl,
    ticket: {
      ticket_id: ticketId,
      customer_name: j.customer_name || null,
      customer_email: j.customer_email || 'unknown@example.com',
      subject: j.subject || null,
      category: j.category || 'General Inquiry',
      confidence: Number(j.confidence || 0),
      status: j.status || 'received',
      channel: j.channel || 'email',
      airtable_record_id: j.airtable_record_id || null,
      slack_thread_ts: j.slack_thread_ts || null,
      ai_summary: j.ai_summary || null,
      ai_response: j.ai_response || null,
      human_approved: Boolean(j.human_approved),
      final_response: j.final_response || null,
      metadata: j.metadata || {},
      updated_at: new Date().toISOString(),
    },
    log: {
      ticket_id: ticketId,
      workflow_name: j.workflow_name || $workflow.name,
      execution_id: j.execution_id || $execution.id,
      event_type: eventType,
      level,
      message,
      payload: j.payload || j,
    }
  }
}];"""
            },
        },
        {
            "id": nid(),
            "name": "Supabase · Upsert Ticket",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [540, 80],
            "parameters": {
                "method": "POST",
                "url": "={{$json.supabase_url}}/rest/v1/support_tickets?on_conflict=ticket_id",
                "authentication": "genericCredentialType",
                "genericAuthType": "httpHeaderAuth",
                "sendHeaders": True,
                "headerParameters": {
                    "parameters": [
                        {"name": "apikey", "value": "={{$vars.SUPABASE_SERVICE_KEY}}"},
                        {"name": "Authorization", "value": "=Bearer {{$vars.SUPABASE_SERVICE_KEY}}"},
                        {"name": "Prefer", "value": "resolution=merge-duplicates,return=representation"},
                        {"name": "Content-Type", "value": "application/json"},
                    ]
                },
                "sendBody": True,
                "specifyBody": "json",
                "jsonBody": "={{JSON.stringify($json.ticket)}}",
                "options": {"timeout": 30000},
            },
            "credentials": {
                "httpHeaderAuth": {
                    "id": "credSupabaseHeader",
                    "name": "Supabase Service Role Header",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
            "waitBetweenTries": 1500,
            "notes": "Credential can be a dummy header; real key comes from $vars.SUPABASE_SERVICE_KEY.",
            "notesInFlow": True,
        },
        {
            "id": nid(),
            "name": "Supabase · Insert Execution Log",
            "type": "n8n-nodes-base.httpRequest",
            "typeVersion": 4.2,
            "position": [540, 300],
            "parameters": {
                "method": "POST",
                "url": "={{$('Normalize Log Payload').item.json.supabase_url}}/rest/v1/support_execution_logs",
                "authentication": "genericCredentialType",
                "genericAuthType": "httpHeaderAuth",
                "sendHeaders": True,
                "headerParameters": {
                    "parameters": [
                        {"name": "apikey", "value": "={{$vars.SUPABASE_SERVICE_KEY}}"},
                        {"name": "Authorization", "value": "=Bearer {{$vars.SUPABASE_SERVICE_KEY}}"},
                        {"name": "Prefer", "value": "return=representation"},
                        {"name": "Content-Type", "value": "application/json"},
                    ]
                },
                "sendBody": True,
                "specifyBody": "json",
                "jsonBody": "={{JSON.stringify($('Normalize Log Payload').item.json.log)}}",
                "options": {"timeout": 30000},
            },
            "credentials": {
                "httpHeaderAuth": {
                    "id": "credSupabaseHeader",
                    "name": "Supabase Service Role Header",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
        },
        {
            "id": nid(),
            "name": "Merge Log Results",
            "type": "n8n-nodes-base.merge",
            "typeVersion": 3,
            "position": [820, 180],
            "parameters": {"mode": "combine", "combineBy": "combineByPosition", "options": {}},
        },
        {
            "id": nid(),
            "name": "Return Logging Status",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [1080, 180],
            "parameters": {
                "assignments": {
                    "assignments": [
                        {"id": nid(), "name": "logged", "value": True, "type": "boolean"},
                        {"id": nid(), "name": "ticket_id", "value": "={{$('Normalize Log Payload').item.json.ticket.ticket_id}}", "type": "string"},
                        {"id": nid(), "name": "event_type", "value": "={{$('Normalize Log Payload').item.json.log.event_type}}", "type": "string"},
                    ]
                },
                "options": {},
            },
        },
    ]

    connections = {
        "Execute Workflow Trigger": {"main": [[{"node": "Normalize Log Payload", "type": "main", "index": 0}]]},
        "Normalize Log Payload": {
            "main": [[
                {"node": "Supabase · Upsert Ticket", "type": "main", "index": 0},
                {"node": "Supabase · Insert Execution Log", "type": "main", "index": 0},
            ]]
        },
        "Supabase · Upsert Ticket": {"main": [[{"node": "Merge Log Results", "type": "main", "index": 0}]]},
        "Supabase · Insert Execution Log": {"main": [[{"node": "Merge Log Results", "type": "main", "index": 1}]]},
        "Merge Log Results": {"main": [[{"node": "Return Logging Status", "type": "main", "index": 0}]]},
    }

    return {
        "id": IDS["logger"],
        "name": "Sub · Log to Supabase",
        "active": False,
        "nodes": nodes,
        "connections": connections,
        "settings": settings(),
        "meta": base_meta("01-Core"),
        "tags": [{"name": "AI Customer Support"}, {"name": "Logging"}],
        "versionId": nid(),
        "pinData": {},
    }


# ---------------------------------------------------------------------------
# 3) Global error handler
# ---------------------------------------------------------------------------

def workflow_error() -> dict:
    nodes = [
        sticky(
            "Docs · Error Handler",
            "## Global Error Workflow\n\nAssigned as `errorWorkflow` on all production flows.\n\n1. Capture failed execution metadata\n2. Notify Slack `#support-alerts`\n3. Persist error log in Supabase",
            [-420, -40],
            420,
            240,
            3,
        ),
        {
            "id": nid(),
            "name": "Error Trigger",
            "type": "n8n-nodes-base.errorTrigger",
            "typeVersion": 1,
            "position": [0, 200],
            "parameters": {},
        },
        {
            "id": nid(),
            "name": "Format Error Context",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [280, 200],
            "parameters": {
                "jsCode": """const e = $input.first().json;
const exec = e.execution || {};
const wf = e.workflow || {};
return [{
  json: {
    ticket_id: exec.id ? `ERR-${exec.id}` : `ERR-${Date.now()}`,
    customer_email: 'system@n8n.local',
    category: 'General Inquiry',
    confidence: 0,
    status: 'error',
    channel: 'manual',
    event_type: 'workflow_error',
    level: 'error',
    message: `Workflow failed: ${wf.name || 'unknown'} — ${exec.error?.message || e.message || 'unknown error'}`,
    workflow_name: wf.name || 'unknown',
    execution_id: exec.id || $execution.id,
    payload: {
      lastNode: exec.lastNodeExecuted,
      error: exec.error || e,
    },
    slack_text: `🚨 *AI Support workflow failed*\\n• Workflow: *${wf.name || 'unknown'}*\\n• Execution: \\`${exec.id || 'n/a'}\\`\\n• Node: \\`${exec.lastNodeExecuted || 'n/a'}\\`\\n• Error: ${exec.error?.message || e.message || 'unknown'}`,
  }
}];"""
            },
        },
        {
            "id": nid(),
            "name": "Slack · Alert On-Call",
            "type": "n8n-nodes-base.slack",
            "typeVersion": 2.3,
            "position": [560, 80],
            "parameters": {
                "select": "channel",
                "channelId": {"__rl": True, "mode": "name", "value": "={{$vars.SLACK_ALERT_CHANNEL || 'support-alerts'}}"},
                "text": "={{$json.slack_text}}",
                "otherOptions": {},
            },
            "credentials": {
                "slackApi": {
                    "id": "credSlackApi",
                    "name": "Slack Bot Credential",
                }
            },
            "retryOnFail": True,
            "maxTries": 2,
            "continueOnFail": True,
        },
        {
            "id": nid(),
            "name": "Call · Log to Supabase",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [560, 300],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["logger"]},
                "options": {"waitForSubWorkflow": True},
            },
            "continueOnFail": True,
        },
    ]

    connections = {
        "Error Trigger": {"main": [[{"node": "Format Error Context", "type": "main", "index": 0}]]},
        "Format Error Context": {
            "main": [[
                {"node": "Slack · Alert On-Call", "type": "main", "index": 0},
                {"node": "Call · Log to Supabase", "type": "main", "index": 0},
            ]]
        },
    }

    return {
        "id": IDS["error"],
        "name": "Error · AI Support Global Handler",
        "active": True,
        "nodes": nodes,
        "connections": connections,
        "settings": {
            "executionOrder": "v1",
            "saveManualExecutions": True,
            "callerPolicy": "workflowsFromSameOwner",
            "timezone": "UTC",
        },
        "meta": base_meta("01-Core"),
        "tags": [{"name": "AI Customer Support"}, {"name": "Error Handling"}],
        "versionId": nid(),
        "pinData": {},
    }


def shared_pipeline_nodes(prefix_x: int = 0) -> tuple[list, dict, str]:
    """Shared middle/end pipeline used by email + webhook mains. Returns nodes, partial connections, entry_node_name."""
    # Entry expects normalized fields already present.
    nodes = [
        {
            "id": nid(),
            "name": "Call · AI Classify & Draft",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [prefix_x + 520, 240],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["classify"]},
                "options": {"waitForSubWorkflow": True},
            },
            "notes": "Reusable AI subworkflow — classification + draft reply.",
            "notesInFlow": True,
            "retryOnFail": True,
            "maxTries": 2,
        },
        {
            "id": nid(),
            "name": "Airtable · Upsert Support Ticket",
            "type": "n8n-nodes-base.airtable",
            "typeVersion": 2.1,
            "position": [prefix_x + 800, 240],
            "parameters": {
                "operation": "create",
                "base": {
                    "__rl": True,
                    "mode": "id",
                    "value": "={{$vars.AIRTABLE_BASE_ID}}",
                },
                "table": {
                    "__rl": True,
                    "mode": "name",
                    "value": "={{$vars.AIRTABLE_TABLE_NAME || 'Support Tickets'}}",
                },
                "columns": {
                    "mappingMode": "defineBelow",
                    "value": {
                        "Ticket ID": "={{$json.ticket_id}}",
                        "Customer Name": "={{$json.customer_name}}",
                        "Customer Email": "={{$json.customer_email}}",
                        "Subject": "={{$json.subject}}",
                        "Category": "={{$json.category}}",
                        "Confidence": "={{$json.confidence}}",
                        "Priority": "={{$json.priority}}",
                        "Status": "={{$json.auto_reply_eligible ? 'Auto Reply Pending' : 'Needs Human Review'}}",
                        "AI Summary": "={{$json.ai_summary}}",
                        "AI Draft": "={{$json.ai_response}}",
                        "Channel": "={{$json.channel}}",
                    },
                },
                "options": {"typecast": True},
            },
            "credentials": {
                "airtableTokenApi": {
                    "id": "credAirtable",
                    "name": "Airtable Personal Access Token",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
            "waitBetweenTries": 2000,
        },
        {
            "id": nid(),
            "name": "Attach Airtable Record ID",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [prefix_x + 1060, 240],
            "parameters": {
                "includeOtherFields": True,
                "assignments": {
                    "assignments": [
                        {
                            "id": nid(),
                            "name": "airtable_record_id",
                            "value": "={{$json.id || $json.records?.[0]?.id || $json.id}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "status",
                            "value": "={{$('Call · AI Classify & Draft').item.json.auto_reply_eligible ? 'classified' : 'pending_approval'}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "event_type",
                            "value": "ticket_created",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "message",
                            "value": "=Ticket {{$('Call · AI Classify & Draft').item.json.ticket_id}} stored in Airtable",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ai_response",
                            "value": "={{$('Call · AI Classify & Draft').item.json.ai_response}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ticket_id",
                            "value": "={{$('Call · AI Classify & Draft').item.json.ticket_id}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "customer_name",
                            "value": "={{$('Call · AI Classify & Draft').item.json.customer_name}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "customer_email",
                            "value": "={{$('Call · AI Classify & Draft').item.json.customer_email}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "subject",
                            "value": "={{$('Call · AI Classify & Draft').item.json.subject}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "category",
                            "value": "={{$('Call · AI Classify & Draft').item.json.category}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "confidence",
                            "value": "={{$('Call · AI Classify & Draft').item.json.confidence}}",
                            "type": "number",
                        },
                        {
                            "id": nid(),
                            "name": "priority",
                            "value": "={{$('Call · AI Classify & Draft').item.json.priority}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ai_summary",
                            "value": "={{$('Call · AI Classify & Draft').item.json.ai_summary}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "ai_response_subject",
                            "value": "={{$('Call · AI Classify & Draft').item.json.ai_response_subject}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "channel",
                            "value": "={{$('Call · AI Classify & Draft').item.json.channel}}",
                            "type": "string",
                        },
                        {
                            "id": nid(),
                            "name": "auto_reply_eligible",
                            "value": "={{$('Call · AI Classify & Draft').item.json.auto_reply_eligible}}",
                            "type": "boolean",
                        },
                        {
                            "id": nid(),
                            "name": "confidence_threshold",
                            "value": "={{$('Call · AI Classify & Draft').item.json.confidence_threshold}}",
                            "type": "number",
                        },
                    ]
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "Call · Log Ticket Created",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [prefix_x + 1320, 240],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["logger"]},
                "options": {"waitForSubWorkflow": True},
            },
        },
        {
            "id": nid(),
            "name": "IF · Confidence ≥ Threshold",
            "type": "n8n-nodes-base.if",
            "typeVersion": 2.2,
            "position": [prefix_x + 1600, 240],
            "parameters": {
                "conditions": {
                    "options": {"caseSensitive": True, "leftValue": "", "typeValidation": "loose"},
                    "conditions": [
                        {
                            "id": nid(),
                            "leftValue": "={{$('Attach Airtable Record ID').item.json.confidence}}",
                            "rightValue": "={{$('Attach Airtable Record ID').item.json.confidence_threshold}}",
                            "operator": {"type": "number", "operation": "gte"},
                        }
                    ],
                    "combinator": "and",
                },
                "options": {},
            },
            "notes": "Default threshold is 90 via $vars.CONFIDENCE_THRESHOLD.",
            "notesInFlow": True,
        },
        # AUTO path
        {
            "id": nid(),
            "name": "Gmail · Send Auto Reply",
            "type": "n8n-nodes-base.gmail",
            "typeVersion": 2.1,
            "position": [prefix_x + 1900, 60],
            "parameters": {
                "operation": "send",
                "sendTo": "={{$('Attach Airtable Record ID').item.json.customer_email}}",
                "subject": "={{$('Attach Airtable Record ID').item.json.ai_response_subject}}",
                "emailType": "text",
                "message": "={{$('Attach Airtable Record ID').item.json.ai_response}}\\n\\n---\\nTicket: {{$('Attach Airtable Record ID').item.json.ticket_id}}\\nCategory: {{$('Attach Airtable Record ID').item.json.category}}",
                "options": {
                    "appendAttribution": False,
                },
            },
            "credentials": {
                "gmailOAuth2": {
                    "id": "credGmail",
                    "name": "Gmail OAuth2 Support Inbox",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
        },
        {
            "id": nid(),
            "name": "Airtable · Mark Auto Replied",
            "type": "n8n-nodes-base.airtable",
            "typeVersion": 2.1,
            "position": [prefix_x + 2180, 60],
            "parameters": {
                "operation": "update",
                "base": {"__rl": True, "mode": "id", "value": "={{$vars.AIRTABLE_BASE_ID}}"},
                "table": {"__rl": True, "mode": "name", "value": "={{$vars.AIRTABLE_TABLE_NAME || 'Support Tickets'}}"},
                "columns": {
                    "mappingMode": "defineBelow",
                    "value": {
                        "id": "={{$('Attach Airtable Record ID').item.json.airtable_record_id}}",
                        "Status": "Auto Replied",
                        "Final Response": "={{$('Attach Airtable Record ID').item.json.ai_response}}",
                    },
                },
                "options": {"typecast": True},
            },
            "credentials": {
                "airtableTokenApi": {
                    "id": "credAirtable",
                    "name": "Airtable Personal Access Token",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
        },
        {
            "id": nid(),
            "name": "Prepare Auto Reply Log",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [prefix_x + 2460, 60],
            "parameters": {
                "assignments": {
                    "assignments": [
                        {"id": nid(), "name": "ticket_id", "value": "={{$('Attach Airtable Record ID').item.json.ticket_id}}", "type": "string"},
                        {"id": nid(), "name": "customer_name", "value": "={{$('Attach Airtable Record ID').item.json.customer_name}}", "type": "string"},
                        {"id": nid(), "name": "customer_email", "value": "={{$('Attach Airtable Record ID').item.json.customer_email}}", "type": "string"},
                        {"id": nid(), "name": "subject", "value": "={{$('Attach Airtable Record ID').item.json.subject}}", "type": "string"},
                        {"id": nid(), "name": "category", "value": "={{$('Attach Airtable Record ID').item.json.category}}", "type": "string"},
                        {"id": nid(), "name": "confidence", "value": "={{$('Attach Airtable Record ID').item.json.confidence}}", "type": "number"},
                        {"id": nid(), "name": "channel", "value": "={{$('Attach Airtable Record ID').item.json.channel}}", "type": "string"},
                        {"id": nid(), "name": "airtable_record_id", "value": "={{$('Attach Airtable Record ID').item.json.airtable_record_id}}", "type": "string"},
                        {"id": nid(), "name": "ai_summary", "value": "={{$('Attach Airtable Record ID').item.json.ai_summary}}", "type": "string"},
                        {"id": nid(), "name": "ai_response", "value": "={{$('Attach Airtable Record ID').item.json.ai_response}}", "type": "string"},
                        {"id": nid(), "name": "final_response", "value": "={{$('Attach Airtable Record ID').item.json.ai_response}}", "type": "string"},
                        {"id": nid(), "name": "human_approved", "value": False, "type": "boolean"},
                        {"id": nid(), "name": "status", "value": "auto_replied", "type": "string"},
                        {"id": nid(), "name": "event_type", "value": "auto_replied", "type": "string"},
                        {"id": nid(), "name": "message", "value": "=Auto-replied to {{$('Attach Airtable Record ID').item.json.customer_email}}", "type": "string"},
                        {"id": nid(), "name": "level", "value": "info", "type": "string"},
                    ]
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "Call · Log Auto Reply",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [prefix_x + 2740, 60],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["logger"]},
                "options": {"waitForSubWorkflow": True},
            },
        },
        # HUMAN path
        {
            "id": nid(),
            "name": "Slack · Request Human Approval",
            "type": "n8n-nodes-base.slack",
            "typeVersion": 2.3,
            "position": [prefix_x + 1900, 420],
            "parameters": {
                "select": "channel",
                "channelId": {"__rl": True, "mode": "name", "value": "={{$vars.SLACK_SUPPORT_CHANNEL || 'customer-support'}}"},
                "text": "=:ticket: *Human review required*\\n• Ticket: `{{$('Attach Airtable Record ID').item.json.ticket_id}}`\\n• Customer: {{$('Attach Airtable Record ID').item.json.customer_name}} <{{$('Attach Airtable Record ID').item.json.customer_email}}>\\n• Category: *{{$('Attach Airtable Record ID').item.json.category}}*\\n• Confidence: *{{$('Attach Airtable Record ID').item.json.confidence}}%* (threshold {{$('Attach Airtable Record ID').item.json.confidence_threshold}}%)\\n• Priority: {{$('Attach Airtable Record ID').item.json.priority}}\\n• Summary: {{$('Attach Airtable Record ID').item.json.ai_summary}}\\n\\n*Draft reply:*\\n>>> {{$('Attach Airtable Record ID').item.json.ai_response}}\\n\\nApprove: {{$execution.resumeUrl}}?decision=approve\\nReject: {{$execution.resumeUrl}}?decision=reject",
                "otherOptions": {
                    "includeLinkToWorkflow": False,
                },
            },
            "credentials": {
                "slackApi": {
                    "id": "credSlackApi",
                    "name": "Slack Bot Credential",
                }
            },
            "retryOnFail": True,
            "maxTries": 2,
        },
        {
            "id": nid(),
            "name": "Wait · Human Approval Webhook",
            "type": "n8n-nodes-base.wait",
            "typeVersion": 1.1,
            "position": [prefix_x + 2180, 420],
            "webhookId": nid(),
            "parameters": {
                "resume": "webhook",
                "options": {
                    "httpMethod": "GET",
                },
            },
            "notes": "Agent clicks Approve/Reject links from Slack to resume.",
            "notesInFlow": True,
        },
        {
            "id": nid(),
            "name": "IF · Approved By Human",
            "type": "n8n-nodes-base.if",
            "typeVersion": 2.2,
            "position": [prefix_x + 2460, 420],
            "parameters": {
                "conditions": {
                    "options": {"caseSensitive": False, "leftValue": "", "typeValidation": "loose"},
                    "conditions": [
                        {
                            "id": nid(),
                            "leftValue": "={{$json.query?.decision || $json.decision || 'reject'}}",
                            "rightValue": "approve",
                            "operator": {"type": "string", "operation": "equals"},
                        }
                    ],
                    "combinator": "and",
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "Gmail · Send Approved Reply",
            "type": "n8n-nodes-base.gmail",
            "typeVersion": 2.1,
            "position": [prefix_x + 2740, 300],
            "parameters": {
                "operation": "send",
                "sendTo": "={{$('Attach Airtable Record ID').item.json.customer_email}}",
                "subject": "={{$('Attach Airtable Record ID').item.json.ai_response_subject}}",
                "emailType": "text",
                "message": "={{$('Attach Airtable Record ID').item.json.ai_response}}\\n\\n---\\nTicket: {{$('Attach Airtable Record ID').item.json.ticket_id}}\\nReviewed by support team",
                "options": {"appendAttribution": False},
            },
            "credentials": {
                "gmailOAuth2": {
                    "id": "credGmail",
                    "name": "Gmail OAuth2 Support Inbox",
                }
            },
            "retryOnFail": True,
            "maxTries": 3,
        },
        {
            "id": nid(),
            "name": "Airtable · Mark Human Replied",
            "type": "n8n-nodes-base.airtable",
            "typeVersion": 2.1,
            "position": [prefix_x + 3020, 300],
            "parameters": {
                "operation": "update",
                "base": {"__rl": True, "mode": "id", "value": "={{$vars.AIRTABLE_BASE_ID}}"},
                "table": {"__rl": True, "mode": "name", "value": "={{$vars.AIRTABLE_TABLE_NAME || 'Support Tickets'}}"},
                "columns": {
                    "mappingMode": "defineBelow",
                    "value": {
                        "id": "={{$('Attach Airtable Record ID').item.json.airtable_record_id}}",
                        "Status": "Human Approved & Sent",
                        "Final Response": "={{$('Attach Airtable Record ID').item.json.ai_response}}",
                    },
                },
                "options": {"typecast": True},
            },
            "credentials": {
                "airtableTokenApi": {
                    "id": "credAirtable",
                    "name": "Airtable Personal Access Token",
                }
            },
        },
        {
            "id": nid(),
            "name": "Prepare Approved Log",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [prefix_x + 3300, 300],
            "parameters": {
                "assignments": {
                    "assignments": [
                        {"id": nid(), "name": "ticket_id", "value": "={{$('Attach Airtable Record ID').item.json.ticket_id}}", "type": "string"},
                        {"id": nid(), "name": "customer_name", "value": "={{$('Attach Airtable Record ID').item.json.customer_name}}", "type": "string"},
                        {"id": nid(), "name": "customer_email", "value": "={{$('Attach Airtable Record ID').item.json.customer_email}}", "type": "string"},
                        {"id": nid(), "name": "subject", "value": "={{$('Attach Airtable Record ID').item.json.subject}}", "type": "string"},
                        {"id": nid(), "name": "category", "value": "={{$('Attach Airtable Record ID').item.json.category}}", "type": "string"},
                        {"id": nid(), "name": "confidence", "value": "={{$('Attach Airtable Record ID').item.json.confidence}}", "type": "number"},
                        {"id": nid(), "name": "channel", "value": "={{$('Attach Airtable Record ID').item.json.channel}}", "type": "string"},
                        {"id": nid(), "name": "airtable_record_id", "value": "={{$('Attach Airtable Record ID').item.json.airtable_record_id}}", "type": "string"},
                        {"id": nid(), "name": "ai_summary", "value": "={{$('Attach Airtable Record ID').item.json.ai_summary}}", "type": "string"},
                        {"id": nid(), "name": "ai_response", "value": "={{$('Attach Airtable Record ID').item.json.ai_response}}", "type": "string"},
                        {"id": nid(), "name": "final_response", "value": "={{$('Attach Airtable Record ID').item.json.ai_response}}", "type": "string"},
                        {"id": nid(), "name": "human_approved", "value": True, "type": "boolean"},
                        {"id": nid(), "name": "status", "value": "replied", "type": "string"},
                        {"id": nid(), "name": "event_type", "value": "human_approved_sent", "type": "string"},
                        {"id": nid(), "name": "message", "value": "Human approved and sent final email", "type": "string"},
                    ]
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "Call · Log Approved Reply",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [prefix_x + 3580, 300],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["logger"]},
                "options": {"waitForSubWorkflow": True},
            },
        },
        {
            "id": nid(),
            "name": "Airtable · Mark Rejected",
            "type": "n8n-nodes-base.airtable",
            "typeVersion": 2.1,
            "position": [prefix_x + 2740, 540],
            "parameters": {
                "operation": "update",
                "base": {"__rl": True, "mode": "id", "value": "={{$vars.AIRTABLE_BASE_ID}}"},
                "table": {"__rl": True, "mode": "name", "value": "={{$vars.AIRTABLE_TABLE_NAME || 'Support Tickets'}}"},
                "columns": {
                    "mappingMode": "defineBelow",
                    "value": {
                        "id": "={{$('Attach Airtable Record ID').item.json.airtable_record_id}}",
                        "Status": "Rejected — Needs Rewrite",
                    },
                },
                "options": {"typecast": True},
            },
            "credentials": {
                "airtableTokenApi": {
                    "id": "credAirtable",
                    "name": "Airtable Personal Access Token",
                }
            },
        },
        {
            "id": nid(),
            "name": "Prepare Rejected Log",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [prefix_x + 3020, 540],
            "parameters": {
                "assignments": {
                    "assignments": [
                        {"id": nid(), "name": "ticket_id", "value": "={{$('Attach Airtable Record ID').item.json.ticket_id}}", "type": "string"},
                        {"id": nid(), "name": "customer_email", "value": "={{$('Attach Airtable Record ID').item.json.customer_email}}", "type": "string"},
                        {"id": nid(), "name": "category", "value": "={{$('Attach Airtable Record ID').item.json.category}}", "type": "string"},
                        {"id": nid(), "name": "confidence", "value": "={{$('Attach Airtable Record ID').item.json.confidence}}", "type": "number"},
                        {"id": nid(), "name": "channel", "value": "={{$('Attach Airtable Record ID').item.json.channel}}", "type": "string"},
                        {"id": nid(), "name": "status", "value": "pending_approval", "type": "string"},
                        {"id": nid(), "name": "human_approved", "value": False, "type": "boolean"},
                        {"id": nid(), "name": "event_type", "value": "human_rejected", "type": "string"},
                        {"id": nid(), "name": "level", "value": "warn", "type": "string"},
                        {"id": nid(), "name": "message", "value": "Human rejected AI draft — ticket left open for rewrite", "type": "string"},
                        {"id": nid(), "name": "subject", "value": "={{$('Attach Airtable Record ID').item.json.subject}}", "type": "string"},
                        {"id": nid(), "name": "ai_summary", "value": "={{$('Attach Airtable Record ID').item.json.ai_summary}}", "type": "string"},
                        {"id": nid(), "name": "ai_response", "value": "={{$('Attach Airtable Record ID').item.json.ai_response}}", "type": "string"},
                        {"id": nid(), "name": "airtable_record_id", "value": "={{$('Attach Airtable Record ID').item.json.airtable_record_id}}", "type": "string"},
                    ]
                },
                "options": {},
            },
        },
        {
            "id": nid(),
            "name": "Call · Log Rejection",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [prefix_x + 3300, 540],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["logger"]},
                "options": {"waitForSubWorkflow": True},
            },
        },
    ]

    connections = {
        "Call · AI Classify & Draft": {"main": [[{"node": "Airtable · Upsert Support Ticket", "type": "main", "index": 0}]]},
        "Airtable · Upsert Support Ticket": {"main": [[{"node": "Attach Airtable Record ID", "type": "main", "index": 0}]]},
        "Attach Airtable Record ID": {"main": [[{"node": "Call · Log Ticket Created", "type": "main", "index": 0}]]},
        "Call · Log Ticket Created": {"main": [[{"node": "IF · Confidence ≥ Threshold", "type": "main", "index": 0}]]},
        "IF · Confidence ≥ Threshold": {
            "main": [
                [{"node": "Gmail · Send Auto Reply", "type": "main", "index": 0}],
                [{"node": "Slack · Request Human Approval", "type": "main", "index": 0}],
            ]
        },
        "Gmail · Send Auto Reply": {"main": [[{"node": "Airtable · Mark Auto Replied", "type": "main", "index": 0}]]},
        "Airtable · Mark Auto Replied": {"main": [[{"node": "Prepare Auto Reply Log", "type": "main", "index": 0}]]},
        "Prepare Auto Reply Log": {"main": [[{"node": "Call · Log Auto Reply", "type": "main", "index": 0}]]},
        "Slack · Request Human Approval": {"main": [[{"node": "Wait · Human Approval Webhook", "type": "main", "index": 0}]]},
        "Wait · Human Approval Webhook": {"main": [[{"node": "IF · Approved By Human", "type": "main", "index": 0}]]},
        "IF · Approved By Human": {
            "main": [
                [{"node": "Gmail · Send Approved Reply", "type": "main", "index": 0}],
                [{"node": "Airtable · Mark Rejected", "type": "main", "index": 0}],
            ]
        },
        "Gmail · Send Approved Reply": {"main": [[{"node": "Airtable · Mark Human Replied", "type": "main", "index": 0}]]},
        "Airtable · Mark Human Replied": {"main": [[{"node": "Prepare Approved Log", "type": "main", "index": 0}]]},
        "Prepare Approved Log": {"main": [[{"node": "Call · Log Approved Reply", "type": "main", "index": 0}]]},
        "Airtable · Mark Rejected": {"main": [[{"node": "Prepare Rejected Log", "type": "main", "index": 0}]]},
        "Prepare Rejected Log": {"main": [[{"node": "Call · Log Rejection", "type": "main", "index": 0}]]},
    }

    return nodes, connections, "Call · AI Classify & Draft"


def workflow_email() -> dict:
    sticky_nodes = [
        sticky(
            "Docs · Email Production Flow",
            "## AI Customer Support — Email\n\n**Trigger:** Gmail (UNREAD inbox)\n\n**Flow:** Classify → Airtable → Auto-reply (≥90%) OR Slack approval → Final email → Supabase logs\n\n**Error workflow:** `Error · AI Support Global Handler`\n**Retries:** enabled on OpenAI, Airtable, Gmail, Slack",
            [-620, 40],
            480,
            320,
            5,
        ),
        sticky(
            "Docs · Confidence Gate",
            "## Confidence Gate\n\n`confidence >= $vars.CONFIDENCE_THRESHOLD` (default **90**)\n\nTRUE → automatic Gmail reply\\nFALSE → Slack assign + Wait webhook",
            [1480, -40],
            360,
            200,
            7,
        ),
    ]

    entry = [
        {
            "id": nid(),
            "name": "Gmail Trigger · New Support Email",
            "type": "n8n-nodes-base.gmailTrigger",
            "typeVersion": 1.2,
            "position": [0, 240],
            "parameters": {
                "pollTimes": {"item": [{"mode": "everyMinute"}]},
                "simple": False,
                "filters": {
                    "readStatus": "unread",
                    "q": "={{$vars.GMAIL_SEARCH_QUERY || 'label:inbox -category:promotions -category:social'}}",
                },
                "options": {
                    "downloadAttachments": False,
                },
            },
            "credentials": {
                "gmailOAuth2": {
                    "id": "credGmail",
                    "name": "Gmail OAuth2 Support Inbox",
                }
            },
            "notes": "Polls unread inbox emails every minute.",
            "notesInFlow": True,
        },
        {
            "id": nid(),
            "name": "Normalize Gmail Payload",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [260, 240],
            "parameters": {
                "jsCode": """const j = $input.first().json;
const headers = j.headers || {};
const fromRaw = j.from?.value?.[0] || {};
const email = (fromRaw.address || j.from || '').toString();
const name = fromRaw.name || email.split('@')[0] || 'Customer';
const subject = j.subject || '(no subject)';
const body = j.text || j.snippet || j.textPlain || '';
if (!email) throw new Error('Gmail message missing sender email');
return [{
  json: {
    ticket_id: `TKT-EM-${j.id || Date.now()}`,
    customer_name: name,
    customer_email: email.toLowerCase(),
    subject,
    body: String(body).slice(0, 12000),
    channel: 'email',
    received_at: j.date || new Date().toISOString(),
    gmail_message_id: j.id,
    gmail_thread_id: j.threadId,
  }
}];"""
            },
        },
    ]

    mid_nodes, mid_conn, entry_name = shared_pipeline_nodes(0)
    nodes = sticky_nodes + entry + mid_nodes
    connections = {
        "Gmail Trigger · New Support Email": {"main": [[{"node": "Normalize Gmail Payload", "type": "main", "index": 0}]]},
        "Normalize Gmail Payload": {"main": [[{"node": entry_name, "type": "main", "index": 0}]]},
        **mid_conn,
    }

    return {
        "id": IDS["email"],
        "name": "Main · Email AI Customer Support",
        "active": False,
        "nodes": nodes,
        "connections": connections,
        "settings": settings(IDS["error"]),
        "meta": base_meta("02-Channels"),
        "tags": [{"name": "AI Customer Support"}, {"name": "Production"}, {"name": "Email"}],
        "versionId": nid(),
        "pinData": {},
    }


def workflow_webhook() -> dict:
    sticky_nodes = [
        sticky(
            "Docs · Webhook Channel",
            "## Webhook Version\n\n`POST /webhook/ai-customer-support`\n\nBody JSON:\n```json\n{\n  \"customer_name\": \"Alex Kim\",\n  \"customer_email\": \"alex@example.com\",\n  \"subject\": \"Refund request\",\n  \"body\": \"I was charged twice...\"\n}\n```\nSame confidence gate + Slack approval as email flow.",
            [-640, 20],
            480,
            340,
            4,
        )
    ]
    entry = [
        {
            "id": nid(),
            "name": "Webhook · Inbound Support Message",
            "type": "n8n-nodes-base.webhook",
            "typeVersion": 2,
            "position": [0, 240],
            "webhookId": "ai-customer-support",
            "parameters": {
                "httpMethod": "POST",
                "path": "ai-customer-support",
                "responseMode": "responseNode",
                "options": {},
            },
            "notes": "Production URL: /webhook/ai-customer-support — Test: /webhook-test/ai-customer-support",
            "notesInFlow": True,
        },
        {
            "id": nid(),
            "name": "Normalize Webhook Payload",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [260, 240],
            "parameters": {
                "jsCode": """const body = $input.first().json.body || $input.first().json;
const email = (body.customer_email || body.email || '').toString().trim().toLowerCase();
const message = body.body || body.message || body.text || '';
if (!email) throw new Error('customer_email is required');
if (!message) throw new Error('body/message is required');
return [{
  json: {
    ticket_id: body.ticket_id || `TKT-WH-${Date.now()}`,
    customer_name: body.customer_name || body.name || email.split('@')[0],
    customer_email: email,
    subject: body.subject || 'Support request',
    body: String(message).slice(0, 12000),
    channel: 'webhook',
    received_at: new Date().toISOString(),
  }
}];"""
            },
        },
    ]

    # Early ack response node after normalize for webhook UX — actually responseMode responseNode
    # We'll respond after AI starts / at end. Better: respond after ticket created.
    response_node = {
        "id": nid(),
        "name": "Webhook · Accept Response",
        "type": "n8n-nodes-base.respondToWebhook",
        "typeVersion": 1.1,
        "position": [1320, -40],
        "parameters": {
            "respondWith": "json",
            "responseBody": "={{JSON.stringify({ ok: true, ticket_id: $('Attach Airtable Record ID').item.json.ticket_id, category: $('Attach Airtable Record ID').item.json.category, confidence: $('Attach Airtable Record ID').item.json.confidence, auto_reply_eligible: $('Attach Airtable Record ID').item.json.auto_reply_eligible, status: $('Attach Airtable Record ID').item.json.status })}}",
            "options": {"responseCode": 202},
        },
    }

    mid_nodes, mid_conn, entry_name = shared_pipeline_nodes(0)
    nodes = sticky_nodes + entry + mid_nodes + [response_node]

    # Branch response after Attach Airtable Record ID (before long wait paths)
    connections = {
        "Webhook · Inbound Support Message": {"main": [[{"node": "Normalize Webhook Payload", "type": "main", "index": 0}]]},
        "Normalize Webhook Payload": {"main": [[{"node": entry_name, "type": "main", "index": 0}]]},
        **mid_conn,
    }
    # Insert parallel response after Attach Airtable Record ID
    connections["Attach Airtable Record ID"] = {
        "main": [[
            {"node": "Call · Log Ticket Created", "type": "main", "index": 0},
            {"node": "Webhook · Accept Response", "type": "main", "index": 0},
        ]]
    }

    return {
        "id": IDS["webhook"],
        "name": "Main · Webhook AI Customer Support",
        "active": False,
        "nodes": nodes,
        "connections": connections,
        "settings": settings(IDS["error"]),
        "meta": base_meta("02-Channels"),
        "tags": [{"name": "AI Customer Support"}, {"name": "Production"}, {"name": "Webhook"}],
        "versionId": nid(),
        "pinData": {},
    }


def workflow_manual() -> dict:
    nodes = [
        sticky(
            "Docs · Manual QA Harness",
            "## Manual Testing Workflow\n\nUse pinned/test fixtures to validate:\n1. High-confidence auto-reply path\n2. Low-confidence human approval path\n3. Logger subworkflow\n\nToggle `force_low_confidence` in the fixture Set node.",
            [-520, -20],
            460,
            280,
            2,
        ),
        {
            "id": nid(),
            "name": "Manual Trigger · Run Test Suite",
            "type": "n8n-nodes-base.manualTrigger",
            "typeVersion": 1,
            "position": [0, 220],
            "parameters": {},
        },
        {
            "id": nid(),
            "name": "Load Test Fixture",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [240, 220],
            "parameters": {
                "assignments": {
                    "assignments": [
                        {"id": nid(), "name": "ticket_id", "value": "={{'TKT-TEST-' + Date.now()}}", "type": "string"},
                        {"id": nid(), "name": "customer_name", "value": "Jordan Lee", "type": "string"},
                        {"id": nid(), "name": "customer_email", "value": "jordan.lee@example.com", "type": "string"},
                        {"id": nid(), "name": "subject", "value": "I was charged twice for my subscription", "type": "string"},
                        {"id": nid(), "name": "body", "value": "Hi support, I was billed twice on July 1 for my Pro plan ($49). Transaction IDs: ch_123 and ch_456. Please refund the duplicate charge. Account email is jordan.lee@example.com.", "type": "string"},
                        {"id": nid(), "name": "channel", "value": "manual", "type": "string"},
                        {"id": nid(), "name": "received_at", "value": "={{$now.toISO()}}", "type": "string"},
                        {"id": nid(), "name": "force_low_confidence", "value": False, "type": "boolean"},
                    ]
                },
                "options": {},
            },
            "notes": "Swap fixture values or set force_low_confidence=true to exercise Slack approval.",
            "notesInFlow": True,
        },
        {
            "id": nid(),
            "name": "Call · AI Classify & Draft",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [520, 220],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["classify"]},
                "options": {"waitForSubWorkflow": True},
            },
        },
        {
            "id": nid(),
            "name": "Apply Test Confidence Override",
            "type": "n8n-nodes-base.code",
            "typeVersion": 2,
            "position": [800, 220],
            "parameters": {
                "jsCode": """const fixture = $('Load Test Fixture').first().json;
const ai = $input.first().json;
const forceLow = Boolean(fixture.force_low_confidence);
const confidence = forceLow ? 72 : ai.confidence;
const threshold = Number(ai.confidence_threshold || 90);
return [{
  json: {
    ...ai,
    confidence,
    auto_reply_eligible: confidence >= threshold,
    status: confidence >= threshold ? 'classified_auto' : 'classified_review',
    test_mode: true,
    force_low_confidence: forceLow,
    event_type: 'manual_test',
    message: `Manual test completed for ${ai.ticket_id}`,
  }
}];"""
            },
        },
        {
            "id": nid(),
            "name": "Call · Log Test Result",
            "type": "n8n-nodes-base.executeWorkflow",
            "typeVersion": 1.2,
            "position": [1080, 220],
            "parameters": {
                "source": "database",
                "workflowId": {"__rl": True, "mode": "id", "value": IDS["logger"]},
                "options": {"waitForSubWorkflow": True},
            },
            "continueOnFail": True,
        },
        {
            "id": nid(),
            "name": "QA Summary Output",
            "type": "n8n-nodes-base.set",
            "typeVersion": 3.4,
            "position": [1360, 220],
            "parameters": {
                "assignments": {
                    "assignments": [
                        {"id": nid(), "name": "ticket_id", "value": "={{$('Apply Test Confidence Override').item.json.ticket_id}}", "type": "string"},
                        {"id": nid(), "name": "category", "value": "={{$('Apply Test Confidence Override').item.json.category}}", "type": "string"},
                        {"id": nid(), "name": "confidence", "value": "={{$('Apply Test Confidence Override').item.json.confidence}}", "type": "number"},
                        {"id": nid(), "name": "auto_reply_eligible", "value": "={{$('Apply Test Confidence Override').item.json.auto_reply_eligible}}", "type": "boolean"},
                        {"id": nid(), "name": "ai_summary", "value": "={{$('Apply Test Confidence Override').item.json.ai_summary}}", "type": "string"},
                        {"id": nid(), "name": "ai_response", "value": "={{$('Apply Test Confidence Override').item.json.ai_response}}", "type": "string"},
                        {"id": nid(), "name": "qa_passed", "value": "={{Boolean($('Apply Test Confidence Override').item.json.category && $('Apply Test Confidence Override').item.json.ai_response)}}", "type": "boolean"},
                    ]
                },
                "options": {},
            },
        },
    ]

    connections = {
        "Manual Trigger · Run Test Suite": {"main": [[{"node": "Load Test Fixture", "type": "main", "index": 0}]]},
        "Load Test Fixture": {"main": [[{"node": "Call · AI Classify & Draft", "type": "main", "index": 0}]]},
        "Call · AI Classify & Draft": {"main": [[{"node": "Apply Test Confidence Override", "type": "main", "index": 0}]]},
        "Apply Test Confidence Override": {"main": [[{"node": "Call · Log Test Result", "type": "main", "index": 0}]]},
        "Call · Log Test Result": {"main": [[{"node": "QA Summary Output", "type": "main", "index": 0}]]},
    }

    return {
        "id": IDS["manual"],
        "name": "Test · Manual AI Support QA",
        "active": False,
        "nodes": nodes,
        "connections": connections,
        "settings": settings(IDS["error"]),
        "meta": base_meta("03-Testing"),
        "tags": [{"name": "AI Customer Support"}, {"name": "Testing"}],
        "versionId": nid(),
        "pinData": {
            "Load Test Fixture": [
                {
                    "json": {
                        "ticket_id": "TKT-TEST-PINNED-001",
                        "customer_name": "Jordan Lee",
                        "customer_email": "jordan.lee@example.com",
                        "subject": "I was charged twice for my subscription",
                        "body": "Hi support, I was billed twice on July 1 for my Pro plan ($49). Please refund the duplicate charge.",
                        "channel": "manual",
                        "force_low_confidence": False,
                    }
                }
            ]
        },
    }


def main() -> None:
    workflows = [
        ("01-sub-ai-classify-and-draft.json", workflow_classify()),
        ("02-sub-log-to-supabase.json", workflow_logger()),
        ("03-error-ai-support-global-handler.json", workflow_error()),
        ("04-main-email-ai-customer-support.json", workflow_email()),
        ("05-main-webhook-ai-customer-support.json", workflow_webhook()),
        ("06-test-manual-ai-support-qa.json", workflow_manual()),
    ]
    for name, wf in workflows:
        write_workflow(name, wf)

    manifest = {
        "project": "AI Customer Support Automation",
        "n8n_project_id": PROJECT_ID,
        "owner_user_id": USER_ID,
        "workflow_ids": IDS,
        "import_order": [w[0] for w in workflows],
        "supabase_url": "https://ltwohsvgafjtxdgypmyh.supabase.co",
        "tables": ["support_tickets", "support_execution_logs"],
    }
    (ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print("manifest.json written")


if __name__ == "__main__":
    main()
