#!/usr/bin/env python3
"""Seed folders, variables, tags and assign imported workflows into folders."""

from __future__ import annotations

import json
import sqlite3
import uuid
from datetime import datetime, timezone
from pathlib import Path

DB = Path.home() / ".n8n" / "database.sqlite"
PROJECT_ID = "zKWuALHErl8nOjxH"
ROOT = Path(__file__).resolve().parents[1]
MANIFEST = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))

NOW = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]


def uid() -> str:
    return str(uuid.uuid4())


def main() -> None:
    conn = sqlite3.connect(DB)
    cur = conn.cursor()

    folders = {
        "root": ("AI Customer Support", None),
        "core": ("01 · Core", "root"),
        "channels": ("02 · Channels", "root"),
        "testing": ("03 · Testing", "root"),
    }
    folder_ids: dict[str, str] = {}

    # Clear previous folder set with same names under this project (idempotent-ish)
    existing = cur.execute(
        "SELECT id, name, parentFolderId FROM folder WHERE projectId = ?",
        (PROJECT_ID,),
    ).fetchall()
    by_name = {row[1]: row[0] for row in existing}

    for key, (name, parent_key) in folders.items():
        if name in by_name:
            folder_ids[key] = by_name[name]
            continue
        fid = uid()
        parent = folder_ids.get(parent_key) if parent_key else None
        cur.execute(
            "INSERT INTO folder (id, name, parentFolderId, projectId, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)",
            (fid, name, parent, PROJECT_ID, NOW, NOW),
        )
        folder_ids[key] = fid
        print(f"folder created: {name} -> {fid}")

    # Ensure nested parent links if folders already existed without parents
    cur.execute(
        "UPDATE folder SET parentFolderId = ?, updatedAt = ? WHERE id = ? AND (parentFolderId IS NULL OR parentFolderId = '')",
        (folder_ids["root"], NOW, folder_ids["core"]),
    )
    cur.execute(
        "UPDATE folder SET parentFolderId = ?, updatedAt = ? WHERE id = ?",
        (folder_ids["root"], NOW, folder_ids["channels"]),
    )
    cur.execute(
        "UPDATE folder SET parentFolderId = ?, updatedAt = ? WHERE id = ?",
        (folder_ids["root"], NOW, folder_ids["testing"]),
    )

    variables = {
        "CONFIDENCE_THRESHOLD": "90",
        "OPENAI_MODEL": "gpt-4o-mini",
        "SUPPORT_BRAND_NAME": "Portfolio Support",
        "SUPABASE_URL": "https://ltwohsvgafjtxdgypmyh.supabase.co",
        "SUPABASE_SERVICE_KEY": "REPLACE_WITH_SUPABASE_SERVICE_ROLE_KEY",
        "AIRTABLE_BASE_ID": "REPLACE_WITH_AIRTABLE_BASE_ID",
        "AIRTABLE_TABLE_NAME": "Support Tickets",
        "SLACK_SUPPORT_CHANNEL": "customer-support",
        "SLACK_ALERT_CHANNEL": "support-alerts",
        "GMAIL_SEARCH_QUERY": "label:inbox -category:promotions -category:social",
    }

    for key, value in variables.items():
        row = cur.execute(
            "SELECT id FROM variables WHERE key = ? AND projectId = ?",
            (key, PROJECT_ID),
        ).fetchone()
        if row:
            cur.execute(
                "UPDATE variables SET value = ?, type = ? WHERE id = ?",
                (value, "string", row[0]),
            )
            print(f"variable updated: {key}")
        else:
            cur.execute(
                "INSERT INTO variables (id, key, type, value, projectId) VALUES (?, ?, ?, ?, ?)",
                (uid(), key, "string", value, PROJECT_ID),
            )
            print(f"variable created: {key}")

    # Tags
    tag_names = [
        "AI Customer Support",
        "Subworkflow",
        "Logging",
        "Error Handling",
        "Production",
        "Email",
        "Webhook",
        "Testing",
    ]
    tag_ids: dict[str, str] = {}
    for name in tag_names:
        row = cur.execute("SELECT id FROM tag_entity WHERE name = ?", (name,)).fetchone()
        if row:
            tag_ids[name] = row[0]
        else:
            tid = uid()
            cur.execute(
                "INSERT INTO tag_entity (id, name, createdAt, updatedAt) VALUES (?, ?, ?, ?)",
                (tid, name, NOW, NOW),
            )
            tag_ids[name] = tid
            print(f"tag created: {name}")

    wf_folder = {
        "aicsClassifySub1": folder_ids["core"],
        "aicsLogSupabase2": folder_ids["core"],
        "aicsErrorHandler": folder_ids["core"],
        "aicsMainEmailWf": folder_ids["channels"],
        "aicsWebhookFlow": folder_ids["channels"],
        "aicsManualTestW": folder_ids["testing"],
    }

    wf_tags = {
        "aicsClassifySub1": ["AI Customer Support", "Subworkflow"],
        "aicsLogSupabase2": ["AI Customer Support", "Logging"],
        "aicsErrorHandler": ["AI Customer Support", "Error Handling"],
        "aicsMainEmailWf": ["AI Customer Support", "Production", "Email"],
        "aicsWebhookFlow": ["AI Customer Support", "Production", "Webhook"],
        "aicsManualTestW": ["AI Customer Support", "Testing"],
    }

    for wf_id, folder_id in wf_folder.items():
        exists = cur.execute("SELECT id FROM workflow_entity WHERE id = ?", (wf_id,)).fetchone()
        if not exists:
            print(f"skip folder assign (missing workflow): {wf_id}")
            continue
        cur.execute(
            "UPDATE workflow_entity SET parentFolderId = ?, updatedAt = ? WHERE id = ?",
            (folder_id, NOW, wf_id),
        )
        # shared_workflow ownership
        shared = cur.execute(
            "SELECT workflowId FROM shared_workflow WHERE workflowId = ?",
            (wf_id,),
        ).fetchone()
        if not shared:
            cur.execute(
                "INSERT INTO shared_workflow (workflowId, projectId, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)",
                (wf_id, PROJECT_ID, "workflow:owner", NOW, NOW),
            )
        for tname in wf_tags.get(wf_id, []):
            tid = tag_ids[tname]
            link = cur.execute(
                "SELECT workflowId FROM workflows_tags WHERE workflowId = ? AND tagId = ?",
                (wf_id, tid),
            ).fetchone()
            if not link:
                try:
                    cur.execute(
                        "INSERT INTO workflows_tags (workflowId, tagId) VALUES (?, ?)",
                        (wf_id, tid),
                    )
                except Exception as e:
                    print(f"tag link warn {wf_id}/{tname}: {e}")
        print(f"assigned {wf_id} -> folder {folder_id}")

    conn.commit()
    conn.close()
    print("seed complete")


if __name__ == "__main__":
    main()
