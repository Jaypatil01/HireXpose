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

```
## 🚀 Installation

### 1. Clone the repository

```bash
    git clone https://github.com/Jaypatil01/HireXpose.git
```

### 2. Open Chrome Extensions

Open Chrome and go to:

```text
chrome://extensions
```

### 3. Enable Developer Mode

Turn on **Developer mode** in the top-right corner.

### 4. Load HireXpose

Click **Load unpacked** and select the cloned `HireXpose` folder.

### 5. Start Scanning

Open any job listing, click the **HireXpose** extension, and select:

**Analyze Job**

---

## 🧪 Demo / Testing

The repository includes a controlled test page:

```text
test-job.html
```

The test page contains simulated suspicious job-recruitment patterns such as:

* Registration fee requests
* Aadhaar / PAN requests
* Bank details requests
* OTP requests
* Urgency and pressure

To test the MVP:

1. Open `test-job.html` in Chrome.
2. If required, enable **Allow access to file URLs** for HireXpose in Chrome Extensions.
3. Open the HireXpose extension.
4. Click **Analyze Job**.
5. Review the risk score and detected signals.

This provides a controlled environment for demonstrating the HireXpose detection pipeline without interacting with a real malicious website.




