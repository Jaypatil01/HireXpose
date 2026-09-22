function analyzeJobText(text) {

    const lowerText = text.toLowerCase();

    let score = 0;
    let redFlags = [];

    // Helper function
    function containsAny(words) {
        return words.some(word => lowerText.includes(word));
    }

    // ------------------------------------------------
    // 1. PAYMENT REQUEST
    // ------------------------------------------------
     // ------------------------------------------------
// 1. PAYMENT REQUEST
// ------------------------------------------------

     const paymentRequestPatterns = [
    "registration fee",
    "application fee",
    "processing fee",
    "security deposit",
    "onboarding fee",
    "joining fee",
    "training fee",
    "verification fee",
    "pay before joining",
    "pay before interview",
    "payment required",
    "fee required",
    "deposit required",
    "pay to apply",
    "pay to register",
    "pay to confirm",
    "pay to secure",
    "pay a fee",
    "make a payment",
    "send payment",
    "transfer money",
    "send money",
    "pay ₹",
    "pay rs",
    "pay inr"
    ];

    if (containsAny(paymentRequestPatterns)) {

    score += 30;

    redFlags.push({
        message: "Payment or fee requested from applicant",
        points: 30
    });
  }


    // ------------------------------------------------
    // 2. SENSITIVE IDENTITY INFORMATION
    // ------------------------------------------------

    // ------------------------------------------------
// 2. SENSITIVE IDENTITY INFORMATION
// ------------------------------------------------

 const identityRequestPatterns = [
    "upload your aadhaar",
    "upload your aadhar",
    "submit your aadhaar",
    "submit your aadhar",
    "provide your aadhaar",
    "provide your aadhar",
    "send your aadhaar",
    "send your aadhar",
    "share your aadhaar",
    "share your aadhar",
    "enter your aadhaar",
    "enter your aadhar",
    "upload aadhaar card",
    "upload aadhar card",
    "submit aadhaar card",
    "submit aadhar card",
    "upload your pan card",
    "submit your pan card",
    "provide your pan card",
    "send your pan card",
    "upload identity proof",
    "submit identity proof",
    "provide identity proof"
    ];

   if (containsAny(identityRequestPatterns)) {

    score += 20;

    redFlags.push({
        message: "Sensitive identity document requested",
        points: 20
    });
 }

    // ------------------------------------------------
    // 3. BANK INFORMATION
    // ------------------------------------------------

    const bankWords = [
        "bank account",
        "bank details",
        "account number",
        "ifsc",
        "debit card",
        "credit card",
        "banking information"
    ];

    if (
        containsAny(bankWords) &&
        containsAny(requestWords)
    ) {
        score += 25;

        redFlags.push({
            message: "Banking information may be requested",
            points: 25
        });
    }


    // ------------------------------------------------
    // 4. OTP / VERIFICATION CODE
    // ------------------------------------------------

    const otpWords = [
        "otp",
        "one time password",
        "verification code",
        "security code"
    ];

    if (
        containsAny(otpWords) &&
        containsAny([
            "enter",
            "share",
            "send",
            "provide",
            "submit",
            "verify"
        ])
    ) {
        score += 30;

        redFlags.push({
            message: "OTP or verification code may be requested",
            points: 30
        });
    }


    // ------------------------------------------------
    // 5. GUARANTEED / UNREALISTIC INCOME
    // ------------------------------------------------

    const salaryWords = [
        "guaranteed salary",
        "guaranteed income",
        "earn money guaranteed",
        "fixed income",
        "guaranteed earnings",
        "earn ₹",
        "earn rs"
    ];

    if (containsAny(salaryWords)) {

        score += 15;

        redFlags.push({
            message: "Guaranteed or unusually strong income claim",
            points: 15
        });
    }


    // ------------------------------------------------
    // 6. URGENCY / PRESSURE
    // ------------------------------------------------

    const urgencyWords = [
        "apply immediately",
        "act now",
        "limited vacancies",
        "urgent hiring",
        "join immediately",
        "apply today",
        "limited seats",
        "hurry",
        "last chance"
    ];

    if (containsAny(urgencyWords)) {

        score += 10;

        redFlags.push({
            message: "Urgency or pressure detected",
            points: 10
        });
    }


    // ------------------------------------------------
    // 7. WHATSAPP / TELEGRAM RECRUITMENT
    // ------------------------------------------------

    const messagingWords = [
        "whatsapp only",
        "contact on whatsapp",
        "contact us on whatsapp",
        "message us on whatsapp",
        "telegram only",
        "contact on telegram",
        "message us on telegram"
    ];

    if (containsAny(messagingWords)) {

        score += 10;

        redFlags.push({
            message: "Recruitment relies on messaging apps",
            points: 10
        });
    }


    // ------------------------------------------------
    // FINAL SCORE
    // ------------------------------------------------

    if (score > 100) {
        score = 100;
    }


    // ------------------------------------------------
    // RISK LEVEL
    // ------------------------------------------------

    let level;

    if (score <= 30) {
        level = "LOW RISK";
    }
    else if (score <= 60) {
        level = "SUSPICIOUS";
    }
    else {
        level = "HIGH RISK";
    }


    return {
        score: score,
        level: level,
        redFlags: redFlags
    };
}