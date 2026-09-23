function analyzeURL(url) {

    let score = 0;
    let redFlags = [];

    let parsedURL;

    try {
        parsedURL = new URL(url);
    } catch (error) {

        return {
            score: 30,
            redFlags: [
                {
                    message: "Unable to validate website URL",
                    points: 30
                }
            ]
        };
    }


    // -----------------------------------------
    // 1. HTTPS CHECK
    // -----------------------------------------

    if (parsedURL.protocol !== "https:") {

        score += 20;

        redFlags.push({
            message: "Website is not using HTTPS",
            points: 20
        });
    }


    // -----------------------------------------
    // 2. EXCESSIVE SUBDOMAINS
    // -----------------------------------------

    const hostname = parsedURL.hostname;

    const parts = hostname.split(".");

    if (parts.length >= 5) {

        score += 10;

        redFlags.push({
            message: "Unusually complex domain structure",
            points: 10
        });
    }


    // -----------------------------------------
    // 3. SUSPICIOUS URL WORDS
    // -----------------------------------------

    const suspiciousWords = [
        "verify",
        "verification",
        "secure",
        "account",
        "payment",
        "refund",
        "reward",
        "claim",
        "bonus",
        "offer"
    ];

    const urlText = url.toLowerCase();

    const foundWords = suspiciousWords.filter(word =>
        urlText.includes(word)
    );

    if (foundWords.length >= 2) {

        score += 15;

        redFlags.push({
            message: "URL contains multiple high-risk keywords",
            points: 15
        });
    }


    // -----------------------------------------
    // 4. SUSPICIOUS TLD
    // -----------------------------------------

    const suspiciousTLDs = [
        ".xyz",
        ".top",
        ".click",
        ".work",
        ".buzz",
        ".live"
    ];

    if (
        suspiciousTLDs.some(tld =>
            hostname.endsWith(tld)
        )
    ) {

        score += 10;

        redFlags.push({
            message: "Domain uses a higher-risk TLD",
            points: 10
        });
    }


    // -----------------------------------------
    // MAXIMUM URL SCORE
    // -----------------------------------------

    if (score > 40) {
        score = 40;
    }


    return {
        score: score,
        redFlags: redFlags
    };
}