function analyzeJobText(text) {

    const lowerText = text.toLowerCase();

    let score = 0;
    let redFlags = [];

    // 1. Payment requests
    const paymentWords = [
        "registration fee",
        "pay a fee",
        "pay money",
        "payment required",
        "processing fee",
        "security deposit"
    ];

    if (paymentWords.some(word => lowerText.includes(word))) {
        score += 30;

        redFlags.push({
            message: "Payment or registration fee requested",
            points: 30
        });
    }


    // 2. Aadhaar / identity documents
    const identityWords = [
        "aadhaar",
        "aadhar",
        "pan card",
        "identity proof"
    ];

    if (identityWords.some(word => lowerText.includes(word))) {
        score += 20;

        redFlags.push({
            message: "Sensitive identity information requested",
            points: 20
        });
    }


    // 3. Bank information
    const bankWords = [
        "bank account",
        "bank details",
        "account number",
        "ifsc",
        "debit card"
    ];

    if (bankWords.some(word => lowerText.includes(word))) {
        score += 25;

        redFlags.push({
            message: "Banking information requested",
            points: 25
        });
    }


    // 4. OTP
    const otpWords = [
        "otp",
        "one time password",
        "verification code"
    ];

    if (otpWords.some(word => lowerText.includes(word))) {
        score += 30;

        redFlags.push({
            message: "OTP or verification code requested",
            points: 30
        });
    }


    // 5. Guaranteed salary
    const salaryWords = [
        "guaranteed salary",
        "guaranteed income",
        "earn money guaranteed",
        "fixed income"
    ];

    if (salaryWords.some(word => lowerText.includes(word))) {
        score += 15;

        redFlags.push({
            message: "Unusually guaranteed income claim",
            points: 15
        });
    }


    // 6. Urgency
    const urgencyWords = [
        "apply immediately",
        "act now",
        "limited vacancies",
        "urgent hiring",
        "join immediately"
    ];

    if (urgencyWords.some(word => lowerText.includes(word))) {
        score += 10;

        redFlags.push({
            message: "Urgency or pressure detected",
            points: 10
        });
    }


    // 7. WhatsApp-only recruitment
    const whatsappWords = [
        "contact on whatsapp",
        "contact us on whatsapp",
        "whatsapp only",
        "message us on whatsapp"
    ];

    if (whatsappWords.some(word => lowerText.includes(word))) {
        score += 10;

        redFlags.push({
            message: "WhatsApp-only recruitment detected",
            points: 10
        });
    }


    // Maximum score = 100
    if (score > 100) {
        score = 100;
    }


    // Determine risk level
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