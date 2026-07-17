# Airtable schema — Support Tickets

Create a base (any name) and a table named **Support Tickets** (or set `$vars.AIRTABLE_TABLE_NAME`).

| Field | Type | Notes |
|---|---|---|
| Ticket ID | Single line text | Primary business key |
| Customer Name | Single line text | |
| Customer Email | Email | |
| Subject | Single line text | |
| Category | Single select | Billing, Technical Support, Sales, Refund, General Inquiry |
| Confidence | Number | 0–100 |
| Priority | Single select | Low, Medium, High, Urgent |
| Status | Single select | Auto Reply Pending, Needs Human Review, Auto Replied, Human Approved & Sent, Rejected — Needs Rewrite |
| AI Summary | Long text | |
| AI Draft | Long text | |
| Final Response | Long text | |
| Channel | Single select | email, webhook, manual |
| Created | Created time | optional |

Set `$vars.AIRTABLE_BASE_ID` to the base id (`app...`).
