const button = document.querySelector("#analyzeButton");

const pageInfo = document.querySelector("#pageInfo");
const scoreElement = document.querySelector(".score");
const statusElement = document.querySelector(".status");
const redFlagsContainer = document.querySelector("#redFlags");

button.addEventListener("click", async () => {

    pageInfo.textContent = "Analyzing page...";
    scoreElement.textContent = "--";
    statusElement.textContent = "ANALYZING...";

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

            // Show page title
            pageInfo.textContent =
                response.title;

            // Analyze the page text
            const result = analyzeJobText(response.text);

            console.log("ANALYSIS RESULT:");
            console.log(result);

            // Show score
            scoreElement.textContent =
                result.score + "/100";

            // Show risk level
            statusElement.textContent =
                result.level;
                redFlagsContainer.innerHTML = "";

if (result.redFlags.length === 0) {

    redFlagsContainer.textContent =
        "No major red flags detected.";

} else {

    result.redFlags.forEach(flag => {

        const flagElement = document.createElement("div");

        flagElement.className = "red-flag";

        flagElement.innerHTML = `
            <span class="flag-message">
                ⚠ ${flag.message}
            </span>

            <span class="flag-points">
                Risk contribution: +${flag.points}
            </span>
        `;

        redFlagsContainer.appendChild(flagElement);

    });

}

        }
    );

});