(function () {
    "use strict";

    const MET = { y: 2016, m: 4, d: 30 };
    const MARRIED = { y: 2018, m: 1, d: 2 };
    const MET_DATE = new Date(MET.y, MET.m - 1, MET.d);
    const DAY_MS = 86400000;
    const LANG_KEY = "love-lang";

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const i18n = {
        zh: {
            pageTitle: "Toby & Lily · 从那天起",
            navMet: "初见",
            navStory: "故事",
            navTime: "时光",
            navLetter: "情书",
            navKeepsake: "纪念",
            heroSvgTitle: "两条线相遇，成为一颗心",
            heroSub: "从那天起，这个世界多了一个“我们”。",
            heroDaysPre: "今天是我们相识的第",
            heroDaysPost: "天",
            scrollCue: "往下，看看我们的故事",
            beforeEyebrow: "在遇见之前",
            beforeTitle: "同一片天空下，两条各自的路",
            beforeLead: "1993 年，有两个人在不同的季节来到这个世界。他们走着各自的路，还不知道彼此的名字。",
            tobyNote: "出生在一个冬天",
            lilyNote: "出生在夏天的尾巴上",
            beforeFootnote: "相差七个多月，相隔不知多远——然后，过了二十三年。",
            metEyebrow: "初见",
            metWeekday: "四月的最后一天 · 星期六",
            metTitle: "春天快要结束的时候，我们遇见了",
            metBody1: "后来才明白，那不是春天的结束，而是我们的开始。",
            metBody2: "那天之后，很多普通的日子都有了名字：第一次见面，第一次牵手，第一次说起“以后”。",
            metQuote: "“我寻觅了一千年，也流过一千次泪。终于，我找到了你。”",
            metQuoteCite: "—— 写在 2017 年的一封情书里",
            storyEyebrow: "我们的故事",
            storyTitle: "从两个人，到一个家",
            tl1Title: "Toby 出生",
            tl1Body: "冬天里，一个小小的人来到了世界上。",
            tl2Title: "Lily 出生",
            tl2Body: "夏末，另一个人也来了。故事的另一半，就位。",
            tl3Title: "我们相识",
            tl3Body: "两条路，在这一天交汇。",
            tl4Title: "我们结婚了",
            tl4Body: "新年的第二天，“我”和“你”，正式成了“我们”。",
            tl5Title: "此刻",
            tl5BodyPre: "仍在一起，仍然相爱。相识的第",
            tl5BodyPost: "天。",
            timeEyebrow: "一起走过的时光",
            timeTitle: "从相识那天起，我们已经一起走了",
            unitYears: "年",
            unitMonths: "个月",
            unitDays: "天",
            unitHours: "小时",
            unitMinutes: "分",
            unitSeconds: "秒",
            statMet: "相识的天数",
            statMarried: "结婚的天数",
            statAnniv: "一起过的相识纪念日",
            statNext: (n) => `天后，第 ${n} 个相识纪念日`,
            statNextToday: (n) => `第 ${n} 个相识纪念日`,
            statToday: "今天",
            timeNote: "时间一直在走，而我们一直在一起。",
            letterEyebrow: "写给你",
            letterTitle: "有一封信，一直想再给你读一遍",
            letterOpen: "轻触打开",
            letterGreeting: "亲爱的：",
            letterL1: "爱上你，是我收到过最好的礼物。",
            letterL2: "愿我们彼此照顾，",
            letterL3: "无论遇见什么，",
            letterL4: "直到生命的尽头。",
            letterL5: "你是我生命里的光。",
            letterL6: "我爱你。",
            letterSign: "—— 你的灵魂伴侣",
            keepEyebrow: "收藏此刻",
            keepTitle: "把今天，也存进我们的回忆里",
            keepLead: "每一天都会被记住。这张卡片记下的，是今天的我们。",
            cardDayPre: "今天是我们相识的第",
            cardDayPost: "天",
            cardMet: "相识",
            cardMarried: "结婚",
            cardToday: "今天",
            cardMotto: "余生很长，慢慢走。",
            saveCard: "保存纪念卡",
            footerSince: "相识于 2016.04.30",
            langToggle: "EN",
            langToggleLabel: "Switch to English"
        },
        en: {
            pageTitle: "Toby & Lily · Since That Day",
            navMet: "We Met",
            navStory: "Story",
            navTime: "Time",
            navLetter: "Letter",
            navKeepsake: "Keepsake",
            heroSvgTitle: "Two lines meet and become one heart",
            heroSub: "Since that day, the world has had an “us”.",
            heroDaysPre: "Today is day",
            heroDaysPost: "since we met",
            scrollCue: "Scroll down for our story",
            beforeEyebrow: "Before we met",
            beforeTitle: "Under one sky, two separate roads",
            beforeLead: "In 1993, two people arrived in different seasons. They walked their own roads, not yet knowing each other's names.",
            tobyNote: "Born in the middle of winter",
            lilyNote: "Born at the tail end of summer",
            beforeFootnote: "Seven months apart in age, who knows how many miles apart — and then, twenty-three years went by.",
            metEyebrow: "The day we met",
            metWeekday: "The last day of April · a Saturday",
            metTitle: "Spring was almost over when we met",
            metBody1: "Only later did we understand: it wasn't the end of spring. It was the beginning of us.",
            metBody2: "After that day, ordinary days started to have names — the first meeting, the first time holding hands, the first time we said “someday”.",
            metQuote: "“I have searched a thousand years, and I have cried a thousand tears. Finally, I found you.”",
            metQuoteCite: "— from a love note, 2017",
            storyEyebrow: "Our story",
            storyTitle: "From two people to one home",
            tl1Title: "Toby is born",
            tl1Body: "In winter, a small person arrives in the world.",
            tl2Title: "Lily is born",
            tl2Body: "At summer's end, the other half of the story arrives.",
            tl3Title: "We meet",
            tl3Body: "Two roads cross on this day.",
            tl4Title: "We get married",
            tl4Body: "On the second day of the new year, “you” and “me” officially became “us”.",
            tl5Title: "Right now",
            tl5BodyPre: "Still together, still in love. Day",
            tl5BodyPost: "since we met.",
            timeEyebrow: "Time together",
            timeTitle: "Since the day we met, we have walked together for",
            unitYears: "years",
            unitMonths: "months",
            unitDays: "days",
            unitHours: "hours",
            unitMinutes: "minutes",
            unitSeconds: "seconds",
            statMet: "days since we met",
            statMarried: "days since our wedding",
            statAnniv: "meeting anniversaries together",
            statNext: (n) => `days until our ${ordinal(n)} anniversary of meeting`,
            statNextToday: (n) => `our ${ordinal(n)} anniversary of meeting`,
            statToday: "Today",
            timeNote: "Time keeps moving, and we keep going — together.",
            letterEyebrow: "For you",
            letterTitle: "A letter I'd like to read to you again",
            letterOpen: "Tap to open",
            letterGreeting: "Darling,",
            letterL1: "It is the best gift for me, falling in love with you.",
            letterL2: "I wish we can take care of each other,",
            letterL3: "no matter what we meet,",
            letterL4: "till the end of life.",
            letterL5: "You are the light of my life.",
            letterL6: "I love you.",
            letterSign: "— your soulmate",
            keepEyebrow: "Keep this moment",
            keepTitle: "Let today join our memories, too",
            keepLead: "Every day deserves to be remembered. This card remembers us, today.",
            cardDayPre: "Today is day",
            cardDayPost: "since we met",
            cardMet: "Met",
            cardMarried: "Married",
            cardToday: "Today",
            cardMotto: "Life is long. Let's take it slow.",
            saveCard: "Save the card",
            footerSince: "Together since 2016.04.30",
            langToggle: "中文",
            langToggleLabel: "切换到中文"
        }
    };

    let lang = "zh";

    function ordinal(n) {
        const rem100 = n % 100;
        if (rem100 >= 11 && rem100 <= 13) return `${n}th`;
        return n + ({ 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th");
    }

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function formatNumber(n) {
        return n.toLocaleString(lang === "zh" ? "zh-CN" : "en-US");
    }

    function formatDot(date) {
        return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
    }

    function storageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (e) {
            return null;
        }
    }

    function storageSet(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (e) {
            /* storage unavailable: language just won't be remembered */
        }
    }

    /* ---------- Dates ---------- */

    // Calendar-day difference, immune to DST shifts.
    function daysBetween(from, to) {
        const a = Date.UTC(from.y, from.m - 1, from.d);
        const b = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
        return Math.floor((b - a) / DAY_MS);
    }

    function calculateDiff(start, end) {
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();
        let hours = end.getHours() - start.getHours();
        let minutes = end.getMinutes() - start.getMinutes();
        let seconds = end.getSeconds() - start.getSeconds();

        if (seconds < 0) { seconds += 60; minutes -= 1; }
        if (minutes < 0) { minutes += 60; hours -= 1; }
        if (hours < 0) { hours += 24; days -= 1; }
        if (days < 0) {
            days += new Date(end.getFullYear(), end.getMonth(), 0).getDate();
            months -= 1;
        }
        if (months < 0) { months += 12; years -= 1; }

        return { years, months, days, hours, minutes, seconds };
    }

    function anniversaryInfo(now) {
        const year = now.getFullYear();
        const thisYear = new Date(year, MET.m - 1, MET.d);
        const today = new Date(year, now.getMonth(), now.getDate());

        if (today.getTime() === thisYear.getTime()) {
            const nth = year - MET.y;
            return { passed: nth, isToday: true, nth, daysUntil: 0 };
        }
        const passed = year - MET.y - (today < thisYear ? 1 : 0);
        const nextYear = today < thisYear ? year : year + 1;
        const next = { y: nextYear, m: MET.m, d: MET.d };
        const daysUntil = -daysBetween(next, today);
        return { passed, isToday: false, nth: nextYear - MET.y, daysUntil };
    }

    /* ---------- Rendering ---------- */

    const clockEls = {
        years: document.getElementById("c-years"),
        months: document.getElementById("c-months"),
        days: document.getElementById("c-days"),
        hours: document.getElementById("c-hours"),
        minutes: document.getElementById("c-minutes"),
        seconds: document.getElementById("c-seconds")
    };

    function setAll(selector, text) {
        document.querySelectorAll(selector).forEach((el) => {
            el.textContent = text;
        });
    }

    let lastDayKey = "";

    function renderDaily(now) {
        const copy = i18n[lang];
        const dayMet = daysBetween(MET, now) + 1;
        const dayMarried = daysBetween(MARRIED, now) + 1;
        const anniv = anniversaryInfo(now);

        setAll(".js-day-met", formatNumber(dayMet));
        setAll(".js-today", formatDot(now));
        document.querySelectorAll("time.js-today").forEach((el) => {
            el.setAttribute("datetime", `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`);
        });

        const married = document.getElementById("stat-married");
        const annivEl = document.getElementById("stat-anniv");
        const next = document.getElementById("stat-next");
        const nextLabel = document.getElementById("stat-next-label");
        if (married) married.textContent = formatNumber(dayMarried);
        if (annivEl) annivEl.textContent = formatNumber(anniv.passed);
        if (next && nextLabel) {
            if (anniv.isToday) {
                next.textContent = copy.statToday;
                nextLabel.textContent = copy.statNextToday(anniv.nth);
            } else {
                next.textContent = formatNumber(anniv.daysUntil);
                nextLabel.textContent = copy.statNext(anniv.nth);
            }
        }
    }

    function tick() {
        const now = new Date();
        const diff = calculateDiff(MET_DATE, now);
        if (clockEls.years) clockEls.years.textContent = diff.years;
        if (clockEls.months) clockEls.months.textContent = diff.months;
        if (clockEls.days) clockEls.days.textContent = diff.days;
        if (clockEls.hours) clockEls.hours.textContent = pad(diff.hours);
        if (clockEls.minutes) clockEls.minutes.textContent = pad(diff.minutes);
        if (clockEls.seconds) {
            clockEls.seconds.textContent = pad(diff.seconds);
            if (!prefersReducedMotion) {
                clockEls.seconds.classList.remove("tick");
                void clockEls.seconds.offsetWidth;
                clockEls.seconds.classList.add("tick");
            }
        }

        const dayKey = `${lang}-${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
        if (dayKey !== lastDayKey) {
            lastDayKey = dayKey;
            renderDaily(now);
        }
    }

    function applyLanguage(next) {
        lang = next === "en" ? "en" : "zh";
        const copy = i18n[lang];
        document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
        document.title = copy.pageTitle;

        document.querySelectorAll("[data-i18n]").forEach((el) => {
            const value = copy[el.dataset.i18n];
            if (typeof value === "string") el.textContent = value;
        });

        const toggle = document.getElementById("lang-toggle");
        if (toggle) {
            toggle.textContent = copy.langToggle;
            toggle.setAttribute("aria-label", copy.langToggleLabel);
        }

        lastDayKey = "";
        tick();
    }

    function detectLanguage() {
        const saved = storageGet(LANG_KEY);
        if (saved === "zh" || saved === "en") return saved;
        const langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
        return langs.some((l) => /^zh/i.test(l)) ? "zh" : "en";
    }

    /* ---------- Ambient canvas: warm bokeh + drifting hearts ---------- */

    function setupAmbient() {
        const canvas = document.getElementById("ambient");
        if (!canvas || prefersReducedMotion) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const colors = ["255, 214, 186", "246, 190, 176", "255, 228, 196", "236, 160, 150"];
        let width = 0;
        let height = 0;
        let particles = [];

        function makeParticle(randomY) {
            const isHeart = Math.random() < 0.28;
            return {
                x: Math.random() * width,
                y: randomY ? Math.random() * height : height + 30,
                r: isHeart ? 5 + Math.random() * 6 : 14 + Math.random() * 46,
                alpha: isHeart ? 0.16 + Math.random() * 0.18 : 0.12 + Math.random() * 0.2,
                speed: 0.12 + Math.random() * 0.32,
                sway: Math.random() * Math.PI * 2,
                swaySpeed: 0.004 + Math.random() * 0.008,
                color: colors[Math.floor(Math.random() * colors.length)],
                heart: isHeart
            };
        }

        function resize() {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * dpr);
            canvas.height = Math.round(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const count = Math.round(Math.min(34, Math.max(14, (width * height) / 42000)));
            particles = Array.from({ length: count }, () => makeParticle(true));
        }

        function drawHeart(x, y, size, color, alpha) {
            ctx.save();
            ctx.translate(x, y);
            ctx.scale(size / 16, size / 16);
            ctx.beginPath();
            ctx.moveTo(0, 6);
            ctx.bezierCurveTo(-9, 0, -14, -5, -14, -10);
            ctx.bezierCurveTo(-14, -16, -6, -18, 0, -11);
            ctx.bezierCurveTo(6, -18, 14, -16, 14, -10);
            ctx.bezierCurveTo(14, -5, 9, 0, 0, 6);
            ctx.fillStyle = `rgba(${color}, ${alpha})`;
            ctx.fill();
            ctx.restore();
        }

        function frame() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i += 1) {
                const p = particles[i];
                p.y -= p.speed;
                p.sway += p.swaySpeed;
                const x = p.x + Math.sin(p.sway) * 18;

                if (p.heart) {
                    drawHeart(x, p.y, p.r * 2, "212, 101, 106", p.alpha);
                } else {
                    const g = ctx.createRadialGradient(x, p.y, 0, x, p.y, p.r);
                    g.addColorStop(0, `rgba(${p.color}, ${p.alpha})`);
                    g.addColorStop(1, `rgba(${p.color}, 0)`);
                    ctx.fillStyle = g;
                    ctx.beginPath();
                    ctx.arc(x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                }

                if (p.y < -p.r * 2 - 20) particles[i] = makeParticle(false);
            }
            window.requestAnimationFrame(frame);
        }

        resize();
        window.addEventListener("resize", resize);
        window.requestAnimationFrame(frame);
    }

    /* ---------- Interactions ---------- */

    function spawnHearts(x, y) {
        if (prefersReducedMotion) return;
        const count = 6;
        for (let i = 0; i < count; i += 1) {
            const heart = document.createElement("span");
            heart.className = "float-heart";
            heart.textContent = "♥";
            const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
            const dist = 40 + Math.random() * 40;
            heart.style.left = `${x}px`;
            heart.style.top = `${y}px`;
            heart.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
            heart.style.setProperty("--dy", `${Math.sin(angle) * dist - 50}px`);
            heart.style.setProperty("--rot", `${(Math.random() - 0.5) * 50}deg`);
            heart.style.setProperty("--size", `${12 + Math.random() * 12}px`);
            heart.style.opacity = "0";
            document.body.appendChild(heart);
            window.setTimeout(() => heart.remove(), 1700);
        }
    }

    function setupClickHearts() {
        document.addEventListener("click", (event) => {
            const target = event.target;
            if (target instanceof Element && target.closest("a, button, input, textarea, .letter-paper")) return;
            spawnHearts(event.clientX, event.clientY);
        });
    }

    function setupTopbar() {
        const bar = document.getElementById("topbar");
        if (!bar) return;
        const update = () => bar.classList.toggle("scrolled", window.scrollY > 40);
        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    function setupReveal() {
        const items = document.querySelectorAll(".reveal");
        if (prefersReducedMotion || !("IntersectionObserver" in window)) {
            items.forEach((el) => el.classList.add("visible"));
            return;
        }
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
        );
        items.forEach((el) => observer.observe(el));
    }

    function setupLetter() {
        const envelope = document.getElementById("envelope");
        const paper = document.getElementById("letter-paper");
        if (!envelope || !paper) return;

        envelope.addEventListener("click", () => {
            envelope.setAttribute("aria-expanded", "true");
            const reveal = () => {
                envelope.hidden = true;
                paper.hidden = false;
                const rect = paper.getBoundingClientRect();
                spawnHearts(rect.left + rect.width / 2, rect.top + 20);
            };
            if (prefersReducedMotion) {
                reveal();
                return;
            }
            envelope.classList.add("opening");
            window.setTimeout(reveal, 750);
        });
    }

    function setupLangToggle() {
        const toggle = document.getElementById("lang-toggle");
        if (!toggle) return;
        toggle.addEventListener("click", () => {
            const next = lang === "zh" ? "en" : "zh";
            applyLanguage(next);
            storageSet(LANG_KEY, next);
        });
    }

    /* ---------- Keepsake card export ---------- */

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    function canvasHeart(ctx, x, y, size, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.scale(size / 32, size / 32);
        ctx.beginPath();
        ctx.moveTo(0, 14);
        ctx.bezierCurveTo(-18, 2, -28, -8, -28, -18);
        ctx.bezierCurveTo(-28, -30, -14, -36, 0, -22);
        ctx.bezierCurveTo(14, -36, 28, -30, 28, -18);
        ctx.bezierCurveTo(28, -8, 18, 2, 0, 14);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
    }

    async function exportCard() {
        const copy = i18n[lang];
        const now = new Date();
        const dayMet = formatNumber(daysBetween(MET, now) + 1);
        const isZh = lang === "zh";
        const body = isZh ? "'Noto Serif SC', serif" : "'Cormorant Garamond', 'Noto Serif SC', serif";
        const display = "'Cormorant Garamond', 'Noto Serif SC', serif";

        if (document.fonts && document.fonts.load) {
            try {
                await Promise.all([
                    document.fonts.load(`500 120px ${display}`, "Toby & Lily 0123456789."),
                    document.fonts.load(`400 40px ${body}`, copy.cardDayPre + copy.cardDayPost + copy.cardMotto + copy.cardMet + copy.cardMarried + copy.cardToday)
                ]);
            } catch (e) {
                /* fall back to whatever fonts are available */
            }
        }

        const W = 1080;
        const H = 1350;
        const canvas = document.createElement("canvas");
        canvas.width = W;
        canvas.height = H;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const bg = ctx.createLinearGradient(0, 0, W, H);
        bg.addColorStop(0, "#f7d9c6");
        bg.addColorStop(0.55, "#f3c4b6");
        bg.addColorStop(1, "#efb2ab");
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, W, H);

        // soft glows
        [[180, 200, 420, "255,236,220"], [900, 1150, 480, "255,224,214"]].forEach(([x, y, r, c]) => {
            const g = ctx.createRadialGradient(x, y, 0, x, y, r);
            g.addColorStop(0, `rgba(${c},0.75)`);
            g.addColorStop(1, `rgba(${c},0)`);
            ctx.fillStyle = g;
            ctx.fillRect(0, 0, W, H);
        });

        const cx = 90;
        const cy = 110;
        const cw = W - 180;
        const ch = H - 220;
        ctx.save();
        ctx.shadowColor = "rgba(122, 64, 50, 0.25)";
        ctx.shadowBlur = 50;
        ctx.shadowOffsetY = 18;
        roundRect(ctx, cx, cy, cw, ch, 44);
        ctx.fillStyle = "#fffaf3";
        ctx.fill();
        ctx.restore();
        roundRect(ctx, cx + 26, cy + 26, cw - 52, ch - 52, 30);
        ctx.strokeStyle = "rgba(201, 154, 91, 0.55)";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";

        canvasHeart(ctx, W / 2, 300, 84, "#d4656a");

        ctx.fillStyle = "#4a2f2a";
        ctx.font = `500 112px ${display}`;
        ctx.fillText("Toby & Lily", W / 2, 470);

        ctx.fillStyle = "#7d5d55";
        ctx.font = `400 ${isZh ? 40 : 46}px ${body}`;
        ctx.fillText(copy.cardDayPre, W / 2, 590);

        ctx.fillStyle = "#b2474e";
        ctx.font = `600 150px ${display}`;
        ctx.fillText(dayMet, W / 2, 740);

        ctx.fillStyle = "#7d5d55";
        ctx.font = `400 ${isZh ? 40 : 46}px ${body}`;
        ctx.fillText(copy.cardDayPost, W / 2, 810);

        // dashed divider
        ctx.save();
        ctx.setLineDash([10, 10]);
        ctx.strokeStyle = "rgba(201, 154, 91, 0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx + 110, 880);
        ctx.lineTo(cx + cw - 110, 880);
        ctx.stroke();
        ctx.restore();

        const facts = [
            [copy.cardMet, "2016.04.30"],
            [copy.cardMarried, "2018.01.02"],
            [copy.cardToday, formatDot(now)]
        ];
        const colW = (cw - 160) / 3;
        facts.forEach(([label, value], i) => {
            const x = cx + 80 + colW * i + colW / 2;
            ctx.fillStyle = "#a88c83";
            ctx.font = `400 ${isZh ? 30 : 34}px ${body}`;
            ctx.fillText(label, x, 960);
            ctx.fillStyle = "#4a2f2a";
            ctx.font = `600 44px ${display}`;
            ctx.fillText(value, x, 1018);
        });

        ctx.fillStyle = "#7d5d55";
        ctx.font = `${isZh ? "" : "italic "}400 ${isZh ? 36 : 44}px ${body}`;
        ctx.fillText(copy.cardMotto, W / 2, 1120);

        ctx.fillStyle = "#a88c83";
        ctx.font = `400 26px ${display}`;
        ctx.fillText("lilyli.org", W / 2, 1180);

        canvas.toBlob((blob) => {
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `toby-lily-day-${daysBetween(MET, now) + 1}.png`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.setTimeout(() => URL.revokeObjectURL(url), 1000);
        }, "image/png");
    }

    function setupKeepsake() {
        const button = document.getElementById("save-card");
        if (!button) return;
        button.addEventListener("click", () => {
            const rect = button.getBoundingClientRect();
            spawnHearts(rect.left + rect.width / 2, rect.top);
            exportCard();
        });
    }

    /* ---------- Init ---------- */

    function init() {
        applyLanguage(detectLanguage());
        setupLangToggle();
        setupTopbar();
        setupReveal();
        setupLetter();
        setupKeepsake();
        setupClickHearts();
        setupAmbient();
        window.setInterval(tick, 1000);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
