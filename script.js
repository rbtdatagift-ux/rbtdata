/* =========================================================
   RBTDATA GIFT
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   DATA PACKAGE SETTINGS
========================================================= */

const packageSizes = [
    5,
    7,
    10,
    15,
    20,
    25,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75
];


const networks = {

    MTN: {
        pricePerGB: 250
    },

    Airtel: {
        pricePerGB: 200
    },

    Glo: {
        pricePerGB: 300
    },

    "9mobile": {
        pricePerGB: 300
    }

};


/* =========================================================
   DOM ELEMENTS
========================================================= */

const packageGrid =
    document.getElementById("packageGrid");

const packageTitle =
    document.getElementById("packageTitle");

const themeToggle =
    document.getElementById("themeToggle");

const menuBtn =
    document.getElementById("menuBtn");

const mobileMenu =
    document.getElementById("mobileMenu");

const copyAccount =
    document.getElementById("copyAccount");

const accountNumber =
    document.getElementById("accountNumber");

const referralLink =
    document.getElementById("referralLink");

const copyReferral =
    document.getElementById("copyReferral");

const shareReferral =
    document.getElementById("shareReferral");

const referralCount =
    document.getElementById("referralCount");

const referralProgress =
    document.getElementById("referralProgress");

const successfulReferrals =
    document.getElementById("successfulReferrals");

const referralEarnings =
    document.getElementById("referralEarnings");

const referralEligibility =
    document.getElementById("referralEligibility");


/* =========================================================
   CURRENT NETWORK
========================================================= */

let currentNetwork = "MTN";


/* =========================================================
   FORMAT MONEY
========================================================= */

function formatMoney(amount) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(amount);

}


/* =========================================================
   GENERATE PACKAGES
========================================================= */

function generatePackages(networkName) {

    if (!packageGrid) return;

    const network =
        networks[networkName];

    if (!network) return;

    packageGrid.innerHTML = "";

    packageSizes.forEach((gb, index) => {

        const price =
            gb * network.pricePerGB;

        const card =
            document.createElement("div");

        card.className =
            "package-card";


        card.innerHTML = `

            <div class="package-network">
                ${networkName}
            </div>

            <div class="package-size">
                ${gb}GB
            </div>

            <div class="package-price">
                ${formatMoney(price)}
            </div>

            <button
                class="package-buy"
                type="button"
                data-network="${networkName}"
                data-gb="${gb}"
                data-price="${price}">

                Buy ${gb}GB

            </button>

        `;


        packageGrid.appendChild(card);

    });


    packageTitle.textContent =
        `${networkName} Data Packages`;


    attachBuyButtons();

}


/* =========================================================
   BUY BUTTONS
========================================================= */

function attachBuyButtons() {

    const buttons =
        document.querySelectorAll(".package-buy");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const network =
                    this.dataset.network;

                const gb =
                    this.dataset.gb;

                const price =
                    this.dataset.price;


                showPurchaseMessage(
                    network,
                    gb,
                    price
                );

            }
        );

    });

}


/* =========================================================
   PURCHASE MESSAGE
========================================================= */

function showPurchaseMessage(
    network,
    gb,
    price
) {

    alert(
        `RBTDATA GIFT\n\n` +
        `${network} ${gb}GB\n` +
        `Price: ${formatMoney(Number(price))}\n\n` +
        `Payment should be made to:\n` +
        `PalmPay\n` +
        `8991168761\n` +
        `RBTDATAGIFT (MUHAMMAD)`
    );

}


/* =========================================================
   NETWORK SELECTION
========================================================= */

const networkCards =
    document.querySelectorAll(".network-card");


networkCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            const selectedNetwork =
                this.dataset.network;

            currentNetwork =
                selectedNetwork;


            networkCards.forEach(item => {

                item.style.borderColor = "";

            });


            this.style.borderColor =
                "var(--yellow)";


            generatePackages(
                selectedNetwork
            );


            const packageSection =
                document.querySelector(
                    ".packages-section"
                );


            if (packageSection) {

                packageSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }
    );

});


/* =========================================================
   INITIAL PACKAGES
========================================================= */

generatePackages("MTN");


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

function setTheme(theme) {

    if (theme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        if (themeToggle) {

            themeToggle.textContent = "🌙";

        }

    } else {

        document.body.classList.remove(
            "light-mode"
        );

        if (themeToggle) {

            themeToggle.textContent = "☀";

        }

    }


    localStorage.setItem(
        "rbtdata-theme",
        theme
    );

}


const savedTheme =
    localStorage.getItem(
        "rbtdata-theme"
    );


if (savedTheme) {

    setTheme(savedTheme);

} else {

    setTheme("dark");

}


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        function () {

            const isLight =
                document.body.classList.contains(
                    "light-mode"
                );


            setTheme(
                isLight
                    ? "dark"
                    : "light"
            );

        }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuBtn) {

    menuBtn.addEventListener(
        "click",
        function () {

            mobileMenu.classList.toggle(
                "active"
            );


            this.textContent =
                mobileMenu.classList.contains(
                    "active"
                )
                    ? "✕"
                    : "☰";

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

const mobileLinks =
    document.querySelectorAll(
        ".mobile-menu a"
    );


mobileLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            mobileMenu.classList.remove(
                "active"
            );


            if (menuBtn) {

                menuBtn.textContent = "☰";

            }

        }
    );

});


/* =========================================================
   COPY ACCOUNT NUMBER
========================================================= */

if (copyAccount) {

    copyAccount.addEventListener(
        "click",
        async function () {

            const number =
                accountNumber.textContent.trim();


            try {

                await navigator.clipboard.writeText(
                    number
                );

                const oldText =
                    this.textContent;


                this.textContent =
                    "✓ Copied";


                setTimeout(() => {

                    this.textContent =
                        oldText;

                }, 2000);


            } catch (error) {

                alert(
                    "Account number: " +
                    number
                );

            }

        }
    );

}


/* =========================================================
   REFERRAL ID
========================================================= */

function generateReferralID() {

    let referralID =
        localStorage.getItem(
            "rbtdata-referral-id"
        );


    if (!referralID) {

        const randomPart =
            Math.random()
                .toString(36)
                .substring(2, 8)
                .toUpperCase();


        referralID =
            "RBT" + randomPart;


        localStorage.setItem(
            "rbtdata-referral-id",
            referralID
        );

    }


    return referralID;

}


/* =========================================================
   CREATE REFERRAL LINK
========================================================= */

function createReferralLink() {

    if (!referralLink) return;


    const referralID =
        generateReferralID();


    const baseURL =
        window.location.origin +
        window.location.pathname;


    const link =
        `${baseURL}?ref=${referralID}`;


    referralLink.value =
        link;

}


createReferralLink();


/* =========================================================
   COPY REFERRAL LINK
========================================================= */

if (copyReferral) {

    copyReferral.addEventListener(
        "click",
        async function () {

            const link =
                referralLink.value;


            try {

                await navigator.clipboard.writeText(
                    link
                );


                const oldText =
                    this.textContent;


                this.textContent =
                    "✓ Copied";


                setTimeout(() => {

                    this.textContent =
                        oldText;

                }, 2000);


            } catch (error) {

                referralLink.select();

                document.execCommand(
                    "copy"
                );

            }

        }
    );

}


/* =========================================================
   SHARE REFERRAL LINK
========================================================= */

if (shareReferral) {

    shareReferral.addEventListener(
        "click",
        async function () {

            const link =
                referralLink.value;


            const shareText =
                `Join RBTDATA GIFT and enjoy affordable data packages. Check it out here: ${link}`;


            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "RBTDATA GIFT",

                        text:
                            shareText,

                        url:
                            link

                    });

                } catch (error) {

                    // User cancelled sharing

                }

            } else {

                try {

                    await navigator.clipboard.writeText(
                        link
                    );


                    alert(
                        "Referral link copied. You can now share it."
                    );

                } catch (error) {

                    alert(link);

                }

            }

        }
    );

}


/* =========================================================
   REFERRAL PROGRESS
========================================================= */

function updateReferralProgress(
    count
) {

    const safeCount =
        Math.min(
            Math.max(
                Number(count) || 0,
                0
            ),
            10
        );


    const percentage =
        (safeCount / 10) * 100;


    const earnings =
        safeCount * 1340;


    if (referralCount) {

        referralCount.textContent =
            `${safeCount} / 10`;

    }


    if (successfulReferrals) {

        successfulReferrals.textContent =
            safeCount;

    }


    if (referralEarnings) {

        referralEarnings.textContent =
            formatMoney(earnings);

    }


    if (referralProgress) {

        referralProgress.style.width =
            `${percentage}%`;

    }


    if (referralEligibility) {

        if (safeCount >= 10) {

            referralEligibility.textContent =
                "Eligible";

            referralEligibility.style.color =
                "var(--yellow)";

        } else {

            referralEligibility.textContent =
                "Locked";

            referralEligibility.style.color =
                "";

        }

    }

}


/* =========================================================
   LOAD DEMO REFERRAL DATA
========================================================= */

const savedReferralCount =
    localStorage.getItem(
        "rbtdata-referral-count"
    );


updateReferralProgress(
    savedReferralCount || 0
);


/* =========================================================
   READ REFERRAL FROM URL
========================================================= */

function getReferralFromURL() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const ref =
        params.get("ref");


    if (ref) {

        localStorage.setItem(
            "rbtdata-referred-by",
            ref
        );

    }

}


getReferralFromURL();


/* =========================================================
   PREVENT EMPTY SOCIAL LINKS
========================================================= */

const socialLinks =
    document.querySelectorAll(
        ".social-icons a"
    );


socialLinks.forEach(link => {

    link.addEventListener(
        "click",
        function (event) {

            if (
                this.getAttribute("href") === "#"
            ) {

                event.preventDefault();

            }

        }
    );

});


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "RBTDATA GIFT website loaded successfully."
);