/* Monthly themes. Loaded in <head> so the palette is applied before first paint.
 * Each month overrides the base palette; colors become CSS variables on <html>
 * (camelCase key -> --kebab-case), and main.js reads window.THEME for the rest.
 * Preview any month with ?month=1..12. */
(function () {
    const BASE = {
        cream: "#fbf1e6",
        paper: "#fffaf3",
        blush: "#f6dcd2",
        peach: "#f3c7ad",
        rose: "#d4656a",
        roseDeep: "#b2474e",
        amber: "#d9a77f",
        gold: "#c99a5b",
        ink: "#4a2f2a",
        inkSoft: "#7d5d55",
        inkFaint: "#a88c83"
    };

    // particle: "heart" rises; "snow" / "petal" / "leaf" fall. Colors are "r, g, b".
    const THEMES = {
        1: {
            name: "一月 · 初雪",
            hero: "新年的第二天我们结婚，第七天是 Toby 的生日。",
            mood: "雪落下来，日子就慢了。",
            particle: "snow",
            particleColors: ["205, 190, 195", "220, 205, 205", "196, 160, 165"],
            bokeh: ["241, 223, 220", "234, 210, 200", "248, 236, 230"],
            colors: { cream: "#f7f2ee", paper: "#fffdfb", blush: "#f1dfdc", peach: "#ead2c8", rose: "#c4424d", roseDeep: "#9b2a35", amber: "#c9a27a", gold: "#b8945a" }
        },
        2: {
            name: "二月 · 红梅",
            mood: "冷的时候，更想靠近你。",
            particle: "petal",
            particleColors: ["214, 74, 102", "232, 120, 140", "196, 56, 86"],
            bokeh: ["245, 217, 217", "239, 198, 194", "250, 230, 228"],
            colors: { cream: "#faf0ef", paper: "#fffaf9", blush: "#f5d9d9", peach: "#efc6c2", rose: "#c23b55", roseDeep: "#9a2541", amber: "#c99a86", gold: "#b98f6a" }
        },
        3: {
            name: "三月 · 新柳",
            mood: "春风一吹，什么都重新开始。",
            particle: "leaf",
            particleColors: ["128, 168, 90", "160, 192, 110", "104, 148, 78"],
            bokeh: ["227, 234, 210", "215, 226, 189", "240, 242, 220"],
            colors: { cream: "#f4f5ea", paper: "#fdfdf6", blush: "#e3ead2", peach: "#d7e2bd", rose: "#6f9a4e", roseDeep: "#4a7232", amber: "#b7b07a", gold: "#a39a5a" }
        },
        4: {
            name: "四月 · 樱花",
            hero: "四月的最后一天，我们遇见了。",
            mood: "樱花又开了，像那年春天。",
            particle: "petal",
            particleColors: ["244, 182, 196", "250, 205, 214", "232, 150, 172"],
            bokeh: ["248, 221, 227", "243, 201, 210", "252, 235, 238"],
            colors: { cream: "#fdf3f4", paper: "#fffbfb", blush: "#f8dde3", peach: "#f3c9d2", rose: "#d65f7f", roseDeep: "#a93a5b", amber: "#d9a3a8", gold: "#c4949a" }
        },
        5: {
            name: "五月 · 蔷薇",
            mood: "日子开成了花。",
            particle: "petal",
            particleColors: ["212, 92, 116", "232, 140, 150", "190, 70, 98"],
            bokeh: ["255, 214, 186", "246, 190, 176", "255, 228, 196"],
            colors: { cream: "#fbf1ea", paper: "#fffaf5", blush: "#f6dad3", peach: "#f2c3b5", rose: "#c9506a", roseDeep: "#9e3350", amber: "#d49a7a", gold: "#c4925a" }
        },
        6: {
            name: "六月 · 栀子",
            mood: "夏天的风里有一点甜。",
            particle: "petal",
            particleColors: ["214, 210, 176", "226, 224, 200", "196, 214, 196"],
            bokeh: ["226, 236, 228", "211, 227, 214", "240, 244, 234"],
            colors: { cream: "#f5f6ef", paper: "#fdfdf8", blush: "#e2ece4", peach: "#d3e3d6", rose: "#4f9483", roseDeep: "#2f6e60", amber: "#c8b98a", gold: "#b0a06a" }
        },
        7: {
            name: "七月 · 荷风",
            mood: "慢一点，陪你看完这个夏天。",
            particle: "heart",
            particleColors: ["208, 101, 138", "226, 140, 166"],
            bokeh: ["220, 233, 216", "243, 219, 224", "235, 242, 230"],
            colors: { cream: "#f3f6f1", paper: "#fcfdfa", blush: "#f3dbe0", peach: "#dce9d8", rose: "#d0658a", roseDeep: "#a2416a", amber: "#9fbf98", gold: "#8fae80" }
        },
        8: {
            name: "八月 · 百合",
            hero: "夏天的尾巴上，Lily 来到了这个世界。",
            mood: "百合开了，像你。",
            particle: "petal",
            particleColors: ["236, 150, 96", "222, 128, 72", "244, 176, 120"],
            bokeh: ["248, 226, 207", "244, 207, 171", "252, 238, 222"],
            colors: { cream: "#fcf4ea", paper: "#fffbf5", blush: "#f8e2cf", peach: "#f4cfab", rose: "#bf6a2c", roseDeep: "#a3541e", amber: "#e0b07a", gold: "#c8963e" }
        },
        9: {
            name: "九月 · 桂子",
            mood: "风里都是桂花香。",
            particle: "snow",
            particleColors: ["232, 172, 60", "244, 196, 96", "220, 150, 40"],
            bokeh: ["246, 230, 197", "241, 213, 156", "252, 242, 220"],
            colors: { cream: "#fcf6e8", paper: "#fffcf3", blush: "#f6e6c5", peach: "#f1d59c", rose: "#b47812", roseDeep: "#8a5a0c", amber: "#deb764", gold: "#c1922e" }
        },
        10: {
            name: "十月 · 枫叶",
            mood: "秋天把思念染成了红色。",
            particle: "leaf",
            particleColors: ["204, 84, 46", "226, 128, 64", "180, 60, 40", "232, 160, 80"],
            bokeh: ["246, 220, 205", "242, 195, 162", "252, 232, 214"],
            colors: { cream: "#fbf1e6", paper: "#fffaf3", blush: "#f6dccd", peach: "#f2c3a2", rose: "#c4522f", roseDeep: "#95371b", amber: "#d9a06a", gold: "#c08a48" }
        },
        11: {
            name: "十一月 · 银杏",
            mood: "一地金黄，是时间送的。",
            particle: "leaf",
            particleColors: ["232, 190, 60", "244, 210, 100", "214, 168, 40"],
            bokeh: ["243, 234, 208", "238, 220, 162", "250, 244, 224"],
            colors: { cream: "#faf6e8", paper: "#fffdf4", blush: "#f3ead0", peach: "#eedca2", rose: "#ad7f14", roseDeep: "#7f5a0e", amber: "#d9be6a", gold: "#b8962e" }
        },
        12: {
            name: "十二月 · 暖冬",
            mood: "外面再冷，家里有灯。",
            particle: "snow",
            particleColors: ["210, 190, 186", "226, 210, 204", "196, 160, 150"],
            bokeh: ["242, 220, 214", "235, 199, 184", "250, 234, 226"],
            colors: { cream: "#f8efe8", paper: "#fffaf6", blush: "#f2dcd6", peach: "#ebc7b8", rose: "#a8323f", roseDeep: "#7e1f2c", amber: "#c99a6a", gold: "#b8894a" }
        }
    };

    const requested = Number(new URLSearchParams(window.location.search).get("month"));
    const month = Number.isInteger(requested) && THEMES[requested] ? requested : new Date().getMonth() + 1;
    const theme = THEMES[month];
    const colors = Object.assign({}, BASE, theme.colors);

    const root = document.documentElement;
    root.dataset.month = String(month);
    Object.keys(colors).forEach((key) => {
        root.style.setProperty(`--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`, colors[key]);
    });
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = colors.cream;

    window.THEME = Object.assign({ month }, theme, { colors });
})();
