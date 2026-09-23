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

     const bankRequestPatterns = [
    "enter your bank account",
    "enter your bank details",
    "enter your account number",
    "provide your bank account",
    "provide your bank details",
    "provide your account number",
    "submit your bank details",
    "submit your bank account",
    "send your bank details",
    "send your account number",
    "share your bank details",
    "share your account number",
    "upload bank details",
    "enter your ifsc",
    "provide your ifsc",
    "submit your ifsc",
    "enter your debit card",
    "enter your credit card",
    "provide your debit card",
    "provide your credit card"
    ];

      if (containsAny(bankRequestPatterns)) {

      score += 25;

      redFlags.push({
        message: "Banking or card information requested",
        points: 25
       });
     }


    // ------------------------------------------------
    // 4. OTP / VERIFICATION CODE
// ------------------------------------------------
    

    const otpRequestPatterns = [
    "enter your otp",
    "enter otp",
    "submit your otp",
    "submit otp",
    "provide your otp",
    "provide otp",
    "share your otp",
    "share otp",
    "send your otp",
    "send otp",
    "enter your one time password",
    "share your one time password",
    "provide your verification code",
    "enter your verification code",
    "share your verification code",
    "send your verification code",
    "enter the otp",
    "share the otp"
    ];

    if (containsAny(otpRequestPatterns)) {

        score += 30;

         redFlags.push({
         message: "OTP or verification code requested",
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

    const strongUrgencyPatterns = [
    "pay now",
    "act now",
    "apply immediately",
    "join immediately",
    "limited vacancies",
    "limited seats",
    "last chance",
    "hurry",
    "offer expires today",
    "offer expires soon",
    "respond immediately",
    "must apply today",
    "apply within 24 hours",
    "confirm immediately"
    ];

     if (containsAny(strongUrgencyPatterns)) {

      score += 10;

     redFlags.push({
        message: "Strong urgency or pressure detected",
        points: 10
      });
   }


    // ------------------------------------------------
    // 7. WHATSAPP / TELEGRAM RECRUITMENT
     // ------------------------------------------------

    const messagingRecruitmentPatterns = [
    "whatsapp only",
    "contact recruiter on whatsapp",
    "contact us on whatsapp",
    "message recruiter on whatsapp",
    "message us on whatsapp",
    "send resume on whatsapp",
    "send cv on whatsapp",
    "whatsapp interview",
    "whatsapp recruitment",
    "telegram only",
    "contact recruiter on telegram",
    "contact us on telegram",
    "message recruiter on telegram",
    "send resume on telegram",
    "telegram interview"
    ];

    if (containsAny(messagingRecruitmentPatterns)) {

    score += 10;

    redFlags.push({
        message: "Recruitment relies heavily on messaging apps",
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