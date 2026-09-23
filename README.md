# 🛡️ HireXpose

### Expose the job before you apply.

HireXpose is a Chrome extension designed to help job seekers identify potentially fraudulent job listings before they apply or share sensitive information.

It analyzes both **behavioural red flags** in job listings and **technical signals** from website URLs, then generates an explainable **0–100 risk score**.

> 🚨 A website can have HTTPS and still be used for a scam.  
> HireXpose focuses not only on how a website looks technically, but also on what it asks the job seeker to do.

---

## 🚨 Problem Statement

### The Job Portal Trap

Fake job listings and lookalike job portals can target job seekers by pretending to be legitimate recruitment platforms.

These scams may attempt to collect:

- Aadhaar / PAN details
- Bank account information
- OTPs and verification codes
- Personal information
- Registration or processing fees

The challenge is that scammers can create websites that appear legitimate.

A fraudulent website may still have:

- 🔒 HTTPS
- A professional-looking interface
- A valid SSL certificate
- A seemingly legitimate domain

Therefore, checking technical security alone is not enough.

---

# 💡 Our Solution

**HireXpose** is a browser-based job safety scanner built as a Chrome extension.

When a user visits a job listing, HireXpose:

1. Reads the job page content
2. Extracts relevant text and URL information
3. Detects suspicious behavioural patterns
4. Analyzes URL-level signals
5. Combines the detected signals
6. Generates a risk score from 0–100
7. Explains why the listing was flagged

---

# 🔍 How It Works

```text
                 JOB LISTING
                      │
                      ▼
              ┌───────────────┐
              │   content.js  │
              │ Page Analysis │
              └───────┬───────┘
                      │
             ┌────────┴────────┐
             ▼                 ▼
      ┌──────────────┐  ┌───────────────┐
      │ detector.js  │  │urlDetector.js │
      │ Behavioural  │  │ URL Analysis  │
      │ Analysis     │  │               │
      └──────┬───────┘  └───────┬───────┘
             │                   │
             └─────────┬─────────┘
                       ▼
                ┌─────────────┐
                │ Risk Engine │
                │   0–100     │
                └──────┬──────┘
---
#🚀 Installation
1. Clone the Repository
git clone https://github.com/Jaypatil01/HireXpose.git

Open the project folder in VS Code.

2. Open Chrome Extensions

Navigate to:

chrome://extensions
3. Enable Developer Mode

Turn on Developer mode in the top-right corner.

4. Load HireXpose

Click:

Load unpacked

and select the cloned HireXpose folder.

5. Start Scanning

Open a job listing in Chrome.

Click the HireXpose extension and select:

Analyze Job

The extension will display:

Risk score
Risk level
Detection reasons
Website signals
                       ▼
               ┌───────────────┐
               │ HireXpose UI  │
               │ Score + Why   │
               └───────────────┘
