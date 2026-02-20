const canvas = document.getElementById("starfield");
const counter = document.getElementById("counter");
const certDuration = document.getElementById("cert-duration");
const certIssuedAt = document.getElementById("cert-issued-at");
const certMarriedDate = document.getElementById("cert-married-date");
const scene3Date = document.getElementById("s3-date");
const issueButton = document.getElementById("issue-certificate");
const seal = document.getElementById("seal");
const intro = document.getElementById("intro-overlay");
const scenes = document.querySelectorAll(".scene");
const scene2 = document.getElementById("scene-2");
const scene3 = document.getElementById("scene-3");
const scene4 = document.getElementById("scene-4");
const langButtons = document.querySelectorAll(".lang-btn");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const MET_DATE = new Date("2016-04-30T00:00:00");
const MET_DATE_TEXT = "2016.04.30";
const MARRIED_DATE_TEXT = "2018.01.02";
const STAR_COUNT = prefersReducedMotion ? 36 : 150;

const state = {
    phase: 0, // 0 independent, 1 gravity, 2 orbit
    approachProgress: 0,
    orbitProgress: 0,
    angle: 0,
    calmFactor: 0
};

let ctx = null;
let stars = [];
let currentLang = "en";

const i18n = {
    en: {
        introText: "In the vastness of time,<br>two points aligned.",
        s1Kicker: "In the vastness of time,",
        s1Title: "most stars travel alone.",
        s1Birth1: "A point of light enters the universe.",
        s1Birth2: "Another begins its silent journey.",
        s2Kicker: "Gravity",
        s2Body: "How many chapters of the universe<br>must we pass through<br>before we arrive here?",
        s2Caption: "Alignment is not certainty. It is a slight bend.",
        s3Kicker: "Shared Orbit",
        s3Body: "Two trajectories.<br>One orbit.",
        s3CounterLabel: "We have been in orbit for",
        s4Title: "Now.<br>Still here.",
        s4Body: "A hundred-year river is nothing more than this moment.",
        s4Caption: "This second exists only once.",
        s5Title: "Certificate of This Moment",
        s5Caption: "Issued not for eternity, but for this breath in time.",
        certTitle: "Certificate of This Moment",
        certSubtitle: "Issued for Toby & Lily",
        certMetLabel: "Met",
        certMarriedLabel: "Married",
        certDurationLabel: "Together For",
        certIssuedLabel: "Issued At",
        issueButton: "Issue This Moment"
    },
    zh: {
        introText: "在漫长星河里，<br>两束光恰好同频。",
        s1Kicker: "在浩瀚时间中，",
        s1Title: "多数星辰各自前行。",
        s1Birth1: "一束光落进宇宙，旅程开始。",
        s1Birth2: "另一束光也在远处醒来。",
        s2Kicker: "引力",
        s2Body: "我们要穿过多少宇宙章节<br>才能在这一页里<br>看见彼此？",
        s2Caption: "相遇不是注定，而是轨迹轻轻偏向了对方。",
        s3Kicker: "共轨",
        s3Body: "两条轨迹。<br>同一轨道。",
        s3CounterLabel: "我们并肩至今，已走过",
        s4Title: "此刻。<br>仍在这里。",
        s4Body: "百年长河，终究都落在这一秒里。",
        s4Caption: "这一秒，只会出现一次。",
        s5Title: "此刻证书",
        s5Caption: "不是为永恒签发，只为这一口正在呼吸的时间。",
        certTitle: "此刻证书",
        certSubtitle: "签发给 Toby & Lily",
        certMetLabel: "相识",
        certMarriedLabel: "结婚",
        certDurationLabel: "共同时间",
        certIssuedLabel: "签发时刻",
        issueButton: "签发此刻"
    }
};

function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

function lerp(from, to, amount) {
    return from + (to - from) * amount;
}

function formatTimeParts(diff) {
    if (currentLang === "zh") {
        return `${diff.years}年 ${diff.months}月 ${diff.days}日<br>${diff.hours}时 ${diff.minutes}分 ${diff.seconds}秒`;
    }
    return `${diff.years}y ${diff.months}m ${diff.days}d<br>${diff.hours}h ${diff.minutes}m ${diff.seconds}s`;
}

function formatIssueDate(date) {
    return new Intl.DateTimeFormat(currentLang === "zh" ? "zh-CN" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    }).format(date);
}

function setNodeText(id, value, useHtml = false) {
    const node = document.getElementById(id);
    if (!node) return;
    if (useHtml) {
        node.innerHTML = value;
    } else {
        node.textContent = value;
    }
}

function applyLanguage(lang) {
    const copy = i18n[lang] || i18n.en;
    currentLang = lang in i18n ? lang : "en";
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";

    setNodeText("intro-text", copy.introText, true);
    setNodeText("s1-kicker", copy.s1Kicker);
    setNodeText("s1-title", copy.s1Title);
    setNodeText("s1-birth-1", copy.s1Birth1);
    setNodeText("s1-birth-2", copy.s1Birth2);
    setNodeText("s2-kicker", copy.s2Kicker);
    setNodeText("s2-body", copy.s2Body, true);
    setNodeText("s2-caption", copy.s2Caption);
    setNodeText("s3-kicker", copy.s3Kicker);
    setNodeText("s3-body", copy.s3Body, true);
    setNodeText("s3-counter-label", copy.s3CounterLabel);
    setNodeText("s4-title", copy.s4Title, true);
    setNodeText("s4-body", copy.s4Body);
    setNodeText("s4-caption", copy.s4Caption);
    setNodeText("s5-title", copy.s5Title);
    setNodeText("s5-caption", copy.s5Caption);
    setNodeText("cert-title", copy.certTitle);
    setNodeText("cert-subtitle", copy.certSubtitle);
    setNodeText("cert-met-label", copy.certMetLabel);
    setNodeText("cert-married-label", copy.certMarriedLabel);
    setNodeText("cert-duration-label", copy.certDurationLabel);
    setNodeText("cert-issued-label", copy.certIssuedLabel);
    setNodeText("issue-certificate", copy.issueButton);

    langButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.lang === currentLang);
    });

    updateCounter();
    refreshIssuedDate();
}

function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createStars() {
    if (!canvas) return;
    stars = [];
    for (let i = 0; i < STAR_COUNT; i += 1) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2 + 0.2,
            alpha: Math.random() * 0.8 + 0.15,
            drift: (Math.random() - 0.5) * 0.14
        });
    }
}

function initCanvas() {
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    resizeCanvas();
    createStars();
    animate();
}

function drawDot(x, y, radius, color) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawLine(x1, y1, x2, y2, alpha) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = `rgba(239,243,255,${alpha})`;
    ctx.lineWidth = 1.3;
    ctx.stroke();
}

function drawOrbit(x, y, radius, alpha) {
    if (!ctx) return;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(239,243,255,${alpha})`;
    ctx.lineWidth = 1.3;
    ctx.stroke();
}

function drawOrbitParticles(centerX, centerY, radius, alpha) {
    if (prefersReducedMotion || !ctx) return;
    for (let i = 0; i < 28; i += 1) {
        const offset = (Math.PI * 2 * i) / 28 + state.angle * 0.28;
        const x = centerX + Math.cos(offset) * (radius + Math.sin(i) * 2.2);
        const y = centerY + Math.sin(offset) * (radius + Math.cos(i) * 2.2);
        drawDot(x, y, 0.9, `rgba(239,243,255,${alpha})`);
    }
}

function updateSceneState() {
    if (!scene2 || !scene3 || !scene4) return;
    const vh = window.innerHeight;
    const s2Top = scene2.getBoundingClientRect().top;
    const s3Top = scene3.getBoundingClientRect().top;
    const s4Top = scene4.getBoundingClientRect().top;

    const approachTarget = clamp((vh * 0.72 - s2Top) / (vh * 0.9), 0, 1);
    const orbitTarget = clamp((vh * 0.64 - s3Top) / (vh * 0.8), 0, 1);
    const calmTarget = clamp((vh * 0.68 - s4Top) / (vh * 0.9), 0, 1);

    state.approachProgress = lerp(state.approachProgress, approachTarget, 0.08);
    state.orbitProgress = lerp(state.orbitProgress, orbitTarget, 0.08);
    state.calmFactor = lerp(state.calmFactor, calmTarget, 0.08);

    if (state.orbitProgress > 0.05) {
        state.phase = 2;
    } else if (state.approachProgress > 0.02) {
        state.phase = 1;
    } else {
        state.phase = 0;
    }
}

function updateBackgroundStars() {
    if (!ctx || !canvas) return;
    const dimByCalm = lerp(1, 0.4, state.calmFactor);
    const driftByCalm = lerp(1, 0.2, state.calmFactor);

    for (const star of stars) {
        drawDot(star.x, star.y, star.radius, `rgba(239,243,255,${star.alpha * dimByCalm})`);
        if (!prefersReducedMotion) {
            star.alpha = clamp(star.alpha + (Math.random() - 0.5) * 0.01, 0.12, 1);
            star.y += star.drift * driftByCalm;
            if (star.y < -2) star.y = canvas.height + 2;
            if (star.y > canvas.height + 2) star.y = -2;
        }
    }
}

function drawIndependent(centerX, centerY) {
    drawLine(centerX - 430, centerY, centerX - 88, centerY, 0.3);
    drawLine(centerX + 88, centerY, centerX + 430, centerY, 0.3);
    drawDot(centerX - 220, centerY, 6, "#8ab4ff");
    drawDot(centerX + 220, centerY, 6, "#ff9acb");
}

function drawApproaching(centerX, centerY) {
    if (!ctx) return;
    const offset = lerp(220, 56, state.approachProgress);
    const bend = lerp(0, 54, state.approachProgress);
    const alpha = lerp(0.3, 0.38, state.approachProgress);

    ctx.beginPath();
    ctx.moveTo(centerX - 380, centerY);
    ctx.quadraticCurveTo(centerX - 120, centerY - bend, centerX - offset, centerY);
    ctx.strokeStyle = `rgba(239,243,255,${alpha})`;
    ctx.lineWidth = 1.35;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(centerX + 380, centerY);
    ctx.quadraticCurveTo(centerX + 120, centerY - bend, centerX + offset, centerY);
    ctx.strokeStyle = `rgba(239,243,255,${alpha})`;
    ctx.lineWidth = 1.35;
    ctx.stroke();

    drawDot(centerX - offset, centerY, 6, "#8ab4ff");
    drawDot(centerX + offset, centerY, 6, "#ff9acb");
}

function drawOrbiting(centerX, centerY) {
    const radius = 44;
    const orbitAlpha = lerp(0.16, 0.1, state.calmFactor);
    drawOrbit(centerX, centerY, radius, orbitAlpha);
    drawOrbitParticles(centerX, centerY, radius, lerp(0.25, 0.1, state.calmFactor));

    if (!prefersReducedMotion) {
        const speed = lerp(0.012, 0.004, state.calmFactor);
        state.angle += speed;
    }

    const x1 = centerX + Math.cos(state.angle) * radius;
    const y1 = centerY + Math.sin(state.angle) * radius;
    const x2 = centerX + Math.cos(state.angle + Math.PI) * radius;
    const y2 = centerY + Math.sin(state.angle + Math.PI) * radius;

    drawDot(x1, y1, 6, "#8ab4ff");
    drawDot(x2, y2, 6, "#ff9acb");
}

function animate() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateSceneState();
    updateBackgroundStars();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    if (state.phase === 0) drawIndependent(centerX, centerY);
    if (state.phase === 1) drawApproaching(centerX, centerY);
    if (state.phase === 2) drawOrbiting(centerX, centerY);
    requestAnimationFrame(animate);
}

function calculateDiff(start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes -= 1;
    }
    if (minutes < 0) {
        minutes += 60;
        hours -= 1;
    }
    if (hours < 0) {
        hours += 24;
        days -= 1;
    }
    if (days < 0) {
        days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
        months -= 1;
    }
    if (months < 0) {
        months += 12;
        years -= 1;
    }

    return { years, months, days, hours, minutes, seconds };
}

function updateCounter() {
    const diff = calculateDiff(MET_DATE, new Date());
    const rendered = formatTimeParts(diff);
    if (counter) counter.innerHTML = rendered;
    if (certDuration) certDuration.innerHTML = rendered;
}

function refreshIssuedDate() {
    if (!certIssuedAt) return;
    certIssuedAt.textContent = formatIssueDate(new Date());
}

function drawRoundedRect(context, x, y, width, height, radius) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.lineTo(x + width - radius, y);
    context.quadraticCurveTo(x + width, y, x + width, y + radius);
    context.lineTo(x + width, y + height - radius);
    context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    context.lineTo(x + radius, y + height);
    context.quadraticCurveTo(x, y + height, x, y + height - radius);
    context.lineTo(x, y + radius);
    context.quadraticCurveTo(x, y, x + radius, y);
    context.closePath();
}

function exportCertificateImage() {
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = 1800;
    exportCanvas.height = 1200;
    const exportCtx = exportCanvas.getContext("2d");
    if (!exportCtx) return;

    const copy = i18n[currentLang] || i18n.en;
    const durationText = (certDuration?.innerText || "").replace(/\s*\n\s*/g, " | ");
    const issuedText = certIssuedAt?.textContent || formatIssueDate(new Date());
    const marriedText = certMarriedDate?.textContent || MARRIED_DATE_TEXT;

    const bgGradient = exportCtx.createRadialGradient(360, 220, 90, 360, 220, 980);
    bgGradient.addColorStop(0, "#17243f");
    bgGradient.addColorStop(0.4, "#0b1324");
    bgGradient.addColorStop(1, "#060b17");
    exportCtx.fillStyle = bgGradient;
    exportCtx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);

    const cardX = 140;
    const cardY = 120;
    const cardW = 1520;
    const cardH = 960;
    drawRoundedRect(exportCtx, cardX, cardY, cardW, cardH, 28);
    exportCtx.fillStyle = "rgba(8, 14, 28, 0.94)";
    exportCtx.fill();
    exportCtx.strokeStyle = "rgba(215, 194, 137, 0.5)";
    exportCtx.lineWidth = 2;
    exportCtx.stroke();

    exportCtx.strokeStyle = "rgba(215, 194, 137, 0.3)";
    exportCtx.beginPath();
    exportCtx.moveTo(cardX + 44, cardY + 240);
    exportCtx.lineTo(cardX + cardW - 44, cardY + 240);
    exportCtx.stroke();

    exportCtx.fillStyle = "#d7c289";
    exportCtx.font = "600 56px 'Playfair Display', Georgia, serif";
    exportCtx.fillText(copy.certTitle, cardX + 52, cardY + 108);

    exportCtx.fillStyle = "rgba(215, 194, 137, 0.78)";
    exportCtx.font = "400 32px 'Manrope', Arial, sans-serif";
    exportCtx.fillText(copy.certSubtitle, cardX + 52, cardY + 168);

    const labelXLeft = cardX + 52;
    const valueXLeft = cardX + 52;
    const labelXRight = cardX + 820;
    const valueXRight = cardX + 820;
    const row1Y = cardY + 330;
    const row2Y = cardY + 520;

    exportCtx.fillStyle = "rgba(239, 243, 255, 0.66)";
    exportCtx.font = "500 24px 'Manrope', Arial, sans-serif";
    exportCtx.fillText(copy.certMetLabel.toUpperCase(), labelXLeft, row1Y);
    exportCtx.fillText(copy.certMarriedLabel.toUpperCase(), labelXRight, row1Y);
    exportCtx.fillText(copy.certDurationLabel.toUpperCase(), labelXLeft, row2Y);
    exportCtx.fillText(copy.certIssuedLabel.toUpperCase(), labelXRight, row2Y);

    exportCtx.fillStyle = "#eff3ff";
    exportCtx.font = "500 44px 'Manrope', Arial, sans-serif";
    exportCtx.fillText(MET_DATE_TEXT, valueXLeft, row1Y + 62);
    exportCtx.fillText(marriedText, valueXRight, row1Y + 62);

    exportCtx.font = "500 36px 'Manrope', Arial, sans-serif";
    exportCtx.fillText(durationText, valueXLeft, row2Y + 62);
    exportCtx.font = "500 30px 'Manrope', Arial, sans-serif";
    exportCtx.fillText(issuedText, valueXRight, row2Y + 62);

    exportCtx.save();
    const sealX = cardX + cardW - 185;
    const sealY = cardY + cardH - 165;
    exportCtx.translate(sealX, sealY);
    exportCtx.rotate((-12 * Math.PI) / 180);
    exportCtx.strokeStyle = "rgba(215, 194, 137, 0.72)";
    exportCtx.lineWidth = 4;
    exportCtx.beginPath();
    exportCtx.arc(0, 0, 95, 0, Math.PI * 2);
    exportCtx.stroke();
    exportCtx.fillStyle = "rgba(215, 194, 137, 0.82)";
    exportCtx.font = "600 22px 'Manrope', Arial, sans-serif";
    exportCtx.textAlign = "center";
    exportCtx.fillText("THIS MOMENT", 0, 8);
    exportCtx.restore();

    const stamp = new Date();
    const filenameTime = `${stamp.getFullYear()}${String(stamp.getMonth() + 1).padStart(2, "0")}${String(stamp.getDate()).padStart(2, "0")}-${String(stamp.getHours()).padStart(2, "0")}${String(stamp.getMinutes()).padStart(2, "0")}${String(stamp.getSeconds()).padStart(2, "0")}`;
    exportCanvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `certificate-this-moment-${filenameTime}.png`;
        link.click();
        URL.revokeObjectURL(url);
    }, "image/png");
}

function triggerStamp() {
    if (!seal) return;
    seal.classList.remove("stamped");
    void seal.offsetWidth;
    seal.classList.add("stamped");
}

function createPulse(x, y) {
    if (prefersReducedMotion) return;
    const pulse = document.createElement("span");
    pulse.className = "pulse";
    pulse.style.left = `${x}px`;
    pulse.style.top = `${y}px`;
    document.body.appendChild(pulse);
    setTimeout(() => pulse.remove(), 1800);
}

function createPetals(x, y) {
    if (prefersReducedMotion) return;
    const petals = 8;
    for (let i = 0; i < petals; i += 1) {
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.style.left = `${x + (Math.random() - 0.5) * 28}px`;
        petal.style.top = `${y + (Math.random() - 0.5) * 28}px`;
        const driftX = `${(Math.random() - 0.5) * 140}px`;
        const driftY = `${65 + Math.random() * 95}px`;
        const rot = `${(Math.random() - 0.5) * 220}deg`;
        petal.style.setProperty("--drift-x", driftX);
        petal.style.setProperty("--drift-y", driftY);
        petal.style.setProperty("--rot", rot);
        document.body.appendChild(petal);
        setTimeout(() => petal.remove(), 1900);
    }
}

function handleTouchEffect(event) {
    const target = event.target;
    if (target instanceof Element && target.closest("#lang-switcher, #issue-certificate")) {
        return;
    }
    const x = event.clientX;
    const y = event.clientY;
    createPulse(x, y);
    createPetals(x, y);
}

function setupInteractions() {
    if (issueButton) {
        issueButton.addEventListener("click", () => {
            refreshIssuedDate();
            triggerStamp();
            exportCertificateImage();
        });
    }

    document.addEventListener("click", handleTouchEffect);

    langButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const lang = btn.dataset.lang === "zh" ? "zh" : "en";
            applyLanguage(lang);
            localStorage.setItem("cosmic-lang", lang);
        });
    });
}

function setupSceneReveal() {
    if (prefersReducedMotion) {
        scenes.forEach((scene) => scene.classList.add("visible"));
        return;
    }

    if (!("IntersectionObserver" in window)) {
        scenes.forEach((scene) => scene.classList.add("visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );
    scenes.forEach((scene) => observer.observe(scene));
}

function setupIntroOverlay() {
    if (!intro) return;
    if (prefersReducedMotion) {
        intro.remove();
        return;
    }
    setTimeout(() => intro.classList.add("fade-out"), 1900);
    intro.addEventListener("transitionend", () => intro.remove(), { once: true });
}

function init() {
    const savedLang = localStorage.getItem("cosmic-lang");
    applyLanguage(savedLang === "zh" ? "zh" : "en");
    if (scene3Date) scene3Date.textContent = MARRIED_DATE_TEXT;
    if (certMarriedDate) certMarriedDate.textContent = MARRIED_DATE_TEXT;
    initCanvas();
    updateCounter();
    refreshIssuedDate();
    setupSceneReveal();
    setupIntroOverlay();
    setupInteractions();
    setInterval(updateCounter, 1000);

    window.addEventListener("resize", () => {
        resizeCanvas();
        createStars();
    });
}

window.addEventListener("load", init);
