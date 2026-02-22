const starsEl = document.getElementById("stars");
for (let i = 0; i < 120; i++) {
  const s = document.createElement("div");
  s.className = "star";
  const size = Math.random() * 2.5 + 0.5;
  s.style.cssText = `width:${size}px;height:${size}px;top:${Math.random() * 100}%;left:${Math.random() * 100}%;animation-duration:${2 + Math.random() * 4}s;animation-delay:${Math.random() * 4}s;`;
  starsEl.appendChild(s);
}

// Parallax effect for stars
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  starsEl.style.transform = `translate(${x}px, ${y}px)`;
});

function switchTab(name) {
  document
    .querySelectorAll(".tab-panel")
    .forEach((p) => p.classList.remove("active"));
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document.getElementById("tab-" + name).classList.add("active");
  document.querySelector(".tab-btn." + name).classList.add("active");
}

function toggleTile(card) {
  const wasOpen = card.classList.contains("open");
  document.querySelectorAll(".tile-card.open").forEach((c) => {
    c.classList.remove("open");
    c.querySelector(".tile-toggle").textContent = "▼ TAP TO EXPAND";
  });
  if (!wasOpen) {
    card.classList.add("open");
    card.querySelector(".tile-toggle").textContent = "▲ TAP TO COLLAPSE";
  }
}

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-item");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((n) => n.classList.remove("active"));
        const active = document.querySelector(
          `.nav-item[href="#${entry.target.id}"]`,
        );
        if (active) {
          active.classList.add("active");
          active.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    });
  },
  { threshold: 0.3 },
);
sections.forEach((s) => observer.observe(s));

navItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(item.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// DARE CARD GENERATOR
const dares = [
  {
    num: "01",
    emoji: "🎤",
    title: "Classroom Announcement",
    desc: 'Go to the nearest classroom and shout "VITOPOLY RUSH!" three times loudly.',
    reward: "Gain ₹1,000",
  },
  {
    num: "02",
    emoji: "⚡",
    title: "Custom Dare",
    desc: "The moderator will provide a custom DARE.",
    reward: "Determined by Moderator",
    isCustom: true,
  },
  {
    num: "03",
    emoji: "🤳",
    title: "Social Butterfly",
    desc: "Take a selfie with 3 random strangers. All three must clearly appear in the picture.",
    reward: "Gain ₹800",
  },
  {
    num: "04",
    emoji: "😂",
    title: "Joke Diplomacy",
    desc: "Go to another Faction, tell them a joke, make them clap. Clap must be audible.",
    reward: "Gain ₹900",
  },
  {
    num: "05",
    emoji: "📈",
    title: "Investment Guru",
    desc: "Ask a random person their best investment advice. Come back and repeat it loudly at your table.",
    reward: "Gain +75 Credit",
  },
  {
    num: "06",
    emoji: "👑",
    title: "Confidence Move",
    desc: "\"Bro, don't worry… I'm winning this. You guys are just participating.\" Full confidence required.",
    reward: "Gain ₹1,200",
  },
  {
    num: "07",
    emoji: "😴",
    title: "Class Inspector",
    desc: 'Tell a stranger: "Bro, I\'ve seen you in class. Why are you always sleeping?" Casually.',
    reward: "Gain ₹700 + 25 Credit",
  },
];

const generateBtn = document.getElementById("generate-dare-btn");
const dareCardDisplay = document.getElementById("random-dare-card");

generateBtn.addEventListener("click", () => {
  const randomDare = dares[Math.floor(Math.random() * dares.length)];

  document.getElementById("random-dare-num").textContent = randomDare.num;
  document.getElementById("random-dare-emoji").textContent = randomDare.emoji;
  document.getElementById("random-dare-title").textContent = randomDare.title;
  document.getElementById("random-dare-desc").textContent = randomDare.desc;
  document.getElementById("random-dare-reward").textContent = randomDare.reward;

  const rewardEl = document.getElementById("random-dare-reward");
  if (randomDare.isCustom) {
    rewardEl.style.color = "var(--neon-yellow)";
    rewardEl.style.borderColor = "rgba(255,230,0,0.3)";
    rewardEl.style.background = "rgba(255,230,0,0.1)";
  } else {
    rewardEl.style.color = "var(--neon-green)";
    rewardEl.style.borderColor = "rgba(57,255,20,0.3)";
    rewardEl.style.background = "rgba(57,255,20,0.1)";
  }

  dareCardDisplay.style.display = "block";
  generateBtn.textContent = "Generate Another";
});

// VIOLATION GENERATOR
const violations = [
  "Skip next 1 turn",
  "Cannot collect rent during detention",
  "Cannot build/upgrade during detention",
  "Auto-released after 1 skipped turn",
];

function generateViolation() {
  const randomViolation =
    violations[Math.floor(Math.random() * violations.length)];
  document.getElementById("violation-text").textContent = randomViolation;
  document.getElementById("generate-violation-btn").textContent =
    "🎲 Randomize Again";
}

// EXTRA CLASS - CHAOS CARD GENERATOR
const chaosCards = [
  "Swap one property with an opponent",
  "Collect ₹500 from every player",
  "Pay ₹500 to every player",
  "Freeze one opponent for 1 turn",
  "Gain +25 Credit from every player",
  "Lose 25 Credit to every player",
  "Double your next rent collection",
  "Gain immunity from next penalty",
  "Take ₹700 from richest player",
  "Give ₹700 to poorest player",
  "Choose two players → They swap a property",
  "Gain ₹1,000",
  "Lose ₹800",
  "Gain +75 Credit",
  "Lose 50 Credit",
];

function generateExtraClass() {
  const random = chaosCards[Math.floor(Math.random() * chaosCards.length)];
  document.getElementById("extra-class-text").textContent = random;
  document.getElementById("generate-extra-class-btn").textContent =
    "🎲 Draw Again";
}

// CAMPUS TREASURE CHEST GENERATOR
const treasureCards = [
  "Gain ₹1,500",
  "Gain ₹1,000 + 50 Credit",
  "Free House Upgrade on one property",
  "Double next rent collection",
  "Immunity from next penalty",
  "Take ₹500 from richest player",
  "Everyone gives you ₹300",
  "Gain +100 Credit",
  "Convert 50 Credit → ₹1,200",
  "Bank pays your next fine",
];

function generateTreasure() {
  const random =
    treasureCards[Math.floor(Math.random() * treasureCards.length)];
  document.getElementById("treasure-text").textContent = random;
  document.getElementById("generate-treasure-btn").textContent =
    "🎲 Open Again";
}
