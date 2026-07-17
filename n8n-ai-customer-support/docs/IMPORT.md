# Import / re-import

From repo root:

```powershell
# Import one-by-one (recommended)
Get-ChildItem .\n8n-ai-customer-support\workflows\*.json | ForEach-Object {
  n8n import:workflow --input $_.FullName --projectId zKWuALHErl8nOjxH
}

# Seed folders, variables, tags
python .\n8n-ai-customer-support\scripts\seed_n8n_metadata.py
```

Then refresh the n8n browser tab.
