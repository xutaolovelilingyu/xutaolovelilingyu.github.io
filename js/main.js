// 星空动画
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.2,
            alpha: Math.random()
        });
    }
}

createStars();

// ===== 主星体系统 =====

let phase = 0; // 0:独立 1:靠近 2:共轨
let progress = 0;

function detectPhase() {
    const scene2 = document.getElementById("scene-2");
    const scene3 = document.getElementById("scene-3");

    const s2Top = scene2.getBoundingClientRect().top;
    const s3Top = scene3.getBoundingClientRect().top;

    if (s2Top < window.innerHeight * 0.5) {
        phase = 1;
    }

    if (s3Top < window.innerHeight * 0.5) {
        phase = 2;
    }
}

window.addEventListener("scroll", detectPhase);
window.addEventListener("load", detectPhase);

let angle = 0;

function drawStar(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // --- background stars ---
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
        ctx.fill();

        star.alpha += (Math.random() - 0.5) * 0.02;
        if (star.alpha < 0.1) star.alpha = 0.1;
        if (star.alpha > 1) star.alpha = 1;
    }

    // --- main stars ---
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function drawLine(x1, y1, x2, y2, alpha = 0.35) {
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    function drawOrbit(radius, alpha = 0.3) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    }

    if (phase === 0) {
        // independent straight trajectories
        drawLine(centerX - 400, centerY, centerX - 80, centerY, 0.35);
        drawLine(centerX + 80, centerY, centerX + 400, centerY, 0.35);

        const x1 = centerX - 200;
        const x2 = centerX + 200;

        drawStar(x1, centerY, 6, "#8ab4ff");
        drawStar(x2, centerY, 6, "#ff9acb");
    }

    if (phase === 1) {
        progress += 0.01;
        if (progress > 1) progress = 1;

        const offset = 200 * (1 - progress);

        // bending trajectories (visual gravity effect)
        ctx.beginPath();
        ctx.moveTo(centerX - 350, centerY);
        ctx.quadraticCurveTo(centerX - 100, centerY - 40 * progress, centerX - offset, centerY);
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(centerX + 350, centerY);
        ctx.quadraticCurveTo(centerX + 100, centerY - 40 * progress, centerX + offset, centerY);
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        drawStar(centerX - offset, centerY, 6, "#8ab4ff");
        drawStar(centerX + offset, centerY, 6, "#ff9acb");
    }

    if (phase === 2) {
        // orbit circle
        drawOrbit(40, 0.2);

        angle += 0.01;

        const orbitRadius = 40;

        const x1 = centerX + Math.cos(angle) * orbitRadius;
        const y1 = centerY + Math.sin(angle) * orbitRadius;

        const x2 = centerX + Math.cos(angle + Math.PI) * orbitRadius;
        const y2 = centerY + Math.sin(angle + Math.PI) * orbitRadius;

        drawStar(x1, y1, 6, "#8ab4ff");
        drawStar(x2, y2, 6, "#ff9acb");
    }

    requestAnimationFrame(animate);
}

animate();

// 精确计时系统
const startDate = new Date("2016-04-30T00:00:00");
const counter = document.getElementById("counter");

function calculateDiff(start, end) {
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();
    let hours = end.getHours() - start.getHours();
    let minutes = end.getMinutes() - start.getMinutes();
    let seconds = end.getSeconds() - start.getSeconds();

    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }
    if (hours < 0) {
        hours += 24;
        days--;
    }
    if (days < 0) {
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
        months--;
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    return { years, months, days, hours, minutes, seconds };
}

function updateCounter() {
    const now = new Date();
    const diff = calculateDiff(startDate, now);

    if (counter) {
        counter.innerHTML = `
            ${diff.years}y 
            ${diff.months}m 
            ${diff.days}d<br>
            ${diff.hours}h 
            ${diff.minutes}m 
            ${diff.seconds}s
        `;
    }
}

setInterval(updateCounter, 1000);
updateCounter();

// 滚动触发渐显
const scenes = document.querySelectorAll(".scene");

function checkVisibility() {
    const triggerBottom = window.innerHeight * 0.85;

    scenes.forEach(scene => {
        const boxTop = scene.getBoundingClientRect().top;

        if (boxTop < triggerBottom) {
            scene.classList.add("visible");
        }
    });
}

window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);

// 开场渐隐
window.addEventListener("load", () => {
    const intro = document.getElementById("intro-overlay");

    if (intro) {
        setTimeout(() => {
            intro.classList.add("fade-out");
        }, 2000);
    }
});