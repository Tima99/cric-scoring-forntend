// Central theme configuration.
// Single source of truth for colors, gradients, spacing, motion and breakpoints.
// `applyTheme` turns this config into CSS custom properties on :root,
// so every stylesheet (global + CSS modules) can consume them via var(--token).

export const theme = {
    colors: {
        primary: "#1dac1d",
        primaryDark: "#0f7d2a",
        primaryLight: "#6fe06f",
        primarySoft: "#e8f8e8",
        secondary: "#1e90ff",
        secondaryDark: "#1565c0",
        accent: "#f5b82e",
        danger: "#f24545",
        success: "#13a313",
        warning: "#d6ba1b",
        bg: "#eef3ee",
        surface: "#ffffff",
        text: "#25302a",
        muted: "#7b867f",
        border: "#d9e2db",
        // cricket ball outcomes (spell / over display)
        ballWicket: "#e53935",
        ballSix: "#16b8c8",
        ballFour: "#22b04a",
        ballExtra: "#f0a21b",
        ballDot: "#c9d3cc",
        ballRun: "#ffffff",
    },
    gradients: {
        primary: "linear-gradient(135deg, #25c425 0%, #1dac1d 45%, #0f7d2a 100%)",
        primarySoft: "linear-gradient(135deg, #f1fbf1 0%, #dff5e3 100%)",
        secondary: "linear-gradient(135deg, #4aa8ff 0%, #1e90ff 55%, #1565c0 100%)",
        danger: "linear-gradient(135deg, #ff6b6b 0%, #f24545 100%)",
        dark: "linear-gradient(160deg, #2b3a30 0%, #1b2520 100%)",
        page: "linear-gradient(180deg, #eaf5ea 0%, #eef3ee 40%, #e9eff3 100%)",
        hero: "linear-gradient(180deg, rgba(20,60,30,.35) 0%, rgba(20,40,28,.78) 60%, #16221a 100%)",
    },
    radius: { sm: "0.5rem", md: "0.8rem", lg: "1.2rem", pill: "999px" },
    shadows: {
        sm: "0 1px 3px rgba(20, 60, 30, 0.12)",
        md: "0 4px 14px rgba(20, 60, 30, 0.14)",
        lg: "0 10px 30px rgba(20, 60, 30, 0.2)",
        glow: "0 0 0 4px rgba(29, 172, 29, 0.22)",
    },
    layout: { navHeight: "56px", tabSize: "90px", maxWidth: "940px" },
    motion: {
        fast: "0.18s",
        base: "0.35s",
        slow: "0.6s",
        ease: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    breakpoints: { sm: 480, md: 650, lg: 1024 },
};

const kebab = (s) => s.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

export function applyTheme(t = theme, root = document.documentElement) {
    Object.entries(t).forEach(([group, tokens]) => {
        if (group === "breakpoints") return;
        Object.entries(tokens).forEach(([key, value]) => {
            root.style.setProperty(`--${kebab(group)}-${kebab(key)}`, value);
        });
    });

    // Aliases keep the legacy variables used by existing stylesheets working.
    const c = t.colors;
    const alias = {
        "--bg": c.bg,
        "--primary": c.primary,
        "--primary-dark": c.primaryDark,
        "--secondary": c.secondary,
        "--light": c.muted,
        "--radius": t.radius.sm,
        "--shadow": t.shadows.lg,
        "--shadow-light": t.shadows.md,
        "--shadow-light2": t.shadows.sm,
        "--shadow-light3": t.shadows.sm,
        "--nav-height": t.layout.navHeight,
        "--tab-size": t.layout.tabSize,
    };
    Object.entries(alias).forEach(([k, v]) => root.style.setProperty(k, v));
}
