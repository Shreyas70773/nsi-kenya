# Google Sheets lead capture — Apps Script setup

Every quote / contact / consultation / site-audit form submission is mirrored
into a Google Sheet via the Apps Script web app at the URL you already
deployed:

```
https://script.google.com/macros/s/AKfycbzu_dGQkXiFdrCb9hCtgbRubx5E2UBmCz5r9GYAS8ZqsXAWv7-bdWA3Yad1cqKUjkVu/exec
```

The Next.js server actions POST a JSON body to that URL. The script below
appends the row to the appropriate tab. Convex remains the source of truth;
Sheets is the sales-team-friendly working copy.

## Steps

### 1. Open your Apps Script project

Go to https://script.google.com/home/projects, open the project that
currently exposes the `/exec` URL above, and replace the contents of
`Code.gs` with the script below.

### 2. Bind a Google Sheet

Create a new Google Sheet (or reuse one) and copy its ID from the URL —
`https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`. Paste that
ID into `SHEET_ID` in the script.

The script auto-creates two tabs the first time a row arrives:
- `quotes` — for quote requests (Tier-1 sales leads)
- `inquiries` — for contact / consultation / site-audit submissions

### 3. Re-deploy

In the Apps Script editor:
- Deploy → Manage Deployments → pick the existing deployment → pencil icon
- Version: New version
- Description: e.g. "Add quote + inquiry routing"
- Deploy

The `/exec` URL stays the same so no env var change is needed.

### 4. Set `GSHEETS_WEBHOOK_URL` in Netlify

In Netlify → Site Settings → Environment Variables, add:

```
GSHEETS_WEBHOOK_URL = https://script.google.com/macros/s/AKfycbzu_dGQkXiFdrCb9hCtgbRubx5E2UBmCz5r9GYAS8ZqsXAWv7-bdWA3Yad1cqKUjkVu/exec
```

Redeploy the site. From the next form submission onward, rows will land in
the sheet within a few seconds. (If the env var is missing the code no-ops
silently, so a misconfigured preview build never breaks form submission.)

## The script

Paste this into `Code.gs` in the Apps Script editor:

```javascript
/**
 * North Star Impex — lead capture endpoint.
 * Append every form submission as a new row in the bound Google Sheet,
 * with one tab per form_type.
 */
const SHEET_ID = "PASTE_YOUR_SHEET_ID_HERE";

const HEADERS = {
  quote: [
    "submitted_at",
    "intent",
    "name",
    "company",
    "email",
    "phone",
    "industry",
    "product_slugs",
    "message",
  ],
  inquiry: [
    "submitted_at",
    "kind",
    "name",
    "company",
    "email",
    "phone",
    "industry",
    "site_location",
    "topic",
    "message",
  ],
};

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const formType = payload.form_type;

    if (formType !== "quote" && formType !== "inquiry") {
      return jsonResponse({ ok: false, error: "unknown form_type" }, 400);
    }

    const ss = SpreadsheetApp.openById(SHEET_ID);
    const tabName = formType === "quote" ? "quotes" : "inquiries";
    let sheet = ss.getSheetByName(tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
      sheet.appendRow(HEADERS[formType]);
      sheet.setFrozenRows(1);
    }

    const row = HEADERS[formType].map((h) => payload[h] || "");
    sheet.appendRow(row);

    return jsonResponse({ ok: true });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

function doGet() {
  return jsonResponse({
    ok: true,
    info: "North Star lead capture. Use POST with form_type='quote' or 'inquiry'.",
  });
}

function jsonResponse(obj, status) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

## Manual test

After deploying, you can sanity-check the endpoint from your terminal:

```bash
curl -L -X POST -H 'Content-Type: application/json' \
  -d '{"form_type":"inquiry","submitted_at":"2026-05-26T08:00:00Z","kind":"contact","name":"Test","company":"Test Co","email":"test@example.com"}' \
  "https://script.google.com/macros/s/AKfycbzu_dGQkXiFdrCb9hCtgbRubx5E2UBmCz5r9GYAS8ZqsXAWv7-bdWA3Yad1cqKUjkVu/exec"
```

You should see `{"ok":true}` and a new row in the `inquiries` tab.

## Which forms feed which tab

| Form on the site | URL | Sheet tab |
|---|---|---|
| Quote request (any intent) | `/request-quote/`, `/request-quote/explore/`, `/request-quote/evaluate/`, `/request-quote/purchase/`, `/request-quote/urgent-etp/` | `quotes` |
| Contact | `/contact/` | `inquiries` (kind=contact) |
| Book a consultation | `/book-consultation/` | `inquiries` (kind=consultation) |
| Request a site audit | `/request-site-audit/` | `inquiries` (kind=site-audit) |

Filter the `inquiries` tab by `kind` to split contact / consultation /
site-audit views if you want them on separate dashboards.
