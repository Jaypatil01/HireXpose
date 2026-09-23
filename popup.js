const button = document.querySelector("#analyzeButton");

const pageInfo = document.querySelector("#pageInfo");
const scoreElement = document.querySelector(".score");
const statusElement = document.querySelector(".status");
const redFlagsContainer = document.querySelector("#redFlags");
const urlSignalsContainer =
    document.querySelector("#urlSignals");

button.addEventListener("click", async () => {

    pageInfo.textContent = "Analyzing page...";
    scoreElement.textContent = "--";
    statusElement.textContent = "ANALYZING...";
    redFlagsContainer.innerHTML = "Scanning...";

    const tabs = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });

    const currentTab = tabs[0];

    chrome.tabs.sendMessage(
        currentTab.id,
        {
            action: "getPageData"
        },
        (response) => {

            if (chrome.runtime.lastError) {

                pageInfo.textContent =
                    "Could not read this page.";

                console.error(chrome.runtime.lastError);

                return;
            }


            // -----------------------------------------
            // PAGE INFORMATION
            // -----------------------------------------

            pageInfo.textContent = response.title;


            // -----------------------------------------
            // BEHAVIOURAL ANALYSIS
            // -----------------------------------------

            const behaviourResult =
                analyzeJobText(response.text);


            // -----------------------------------------
            // URL ANALYSIS
            // -----------------------------------------

            const urlResult =
                analyzeURL(response.url);


            // -----------------------------------------
            // COMBINE SCORES
            // -----------------------------------------

            let finalScore =
                behaviourResult.score +
                urlResult.score;


            if (finalScore > 100) {
                finalScore = 100;
            }


            // -----------------------------------------
            // FINAL RISK LEVEL
            // -----------------------------------------

            let finalLevel;

            if (finalScore <= 30) {

                finalLevel = "LOW RISK";

            } else if (finalScore <= 60) {

                finalLevel = "SUSPICIOUS";

            } else {

                finalLevel = "HIGH RISK";
            }


            // -----------------------------------------
            // COMBINE RED FLAGS
            // -----------------------------------------

            const allRedFlags = [
                ...behaviourResult.redFlags,
                ...urlResult.redFlags
            ];


            // -----------------------------------------
            // DISPLAY SCORE
            // -----------------------------------------

            scoreElement.textContent =
                finalScore + "/100";

            statusElement.textContent =
                finalLevel;


            // -----------------------------------------
            // DISPLAY RED FLAGS
            // -----------------------------------------

            redFlagsContainer.innerHTML = "";

            if (allRedFlags.length === 0) {

                redFlagsContainer.textContent =
                    "No major red flags detected.";

            } else {

                allRedFlags.forEach(flag => {

                    const flagElement =
                        document.createElement("div");

                    flagElement.className =
                        "red-flag";

                    flagElement.innerHTML = `
                        <span class="flag-message">
                            ⚠ ${flag.message}
                        </span>

                        <span class="flag-points">
                            Risk contribution: +${flag.points}
                        </span>
                    `;

                    redFlagsContainer.appendChild(
                        flagElement
                    );

                });

            }
            
            // -----------------------------------------
// DISPLAY URL SIGNALS
// -----------------------------------------

urlSignalsContainer.innerHTML = "";

if (urlResult.redFlags.length === 0) {

    urlSignalsContainer.textContent =
        "No suspicious URL signals detected.";

} else {

    urlResult.redFlags.forEach(flag => {

        const signalElement =
            document.createElement("div");

        signalElement.className =
            "red-flag";

        signalElement.innerHTML = `
            <span class="flag-message">
                ⚠ ${flag.message}
            </span>

            <span class="flag-points">
                URL risk contribution: +${flag.points}
            </span>
        `;

        urlSignalsContainer.appendChild(
            signalElement
        );

    });

}


            // -----------------------------------------
            // DEBUGGING
            // -----------------------------------------

            console.log("BEHAVIOURAL RESULT:");
            console.log(behaviourResult);

            console.log("URL RESULT:");
            console.log(urlResult);

            console.log("FINAL SCORE:");
            console.log(finalScore);

        }
    );

});