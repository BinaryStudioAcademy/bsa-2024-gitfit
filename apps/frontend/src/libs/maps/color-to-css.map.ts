import { type Color } from "~/libs/types/types.js";

const colorToCss: Record<Color, string> = {
	backgroundHover: "var(--color-background-hover)",
	backgroundPrimary: "var(--color-background-primary)",
	backgroundSecondary: "var(--color-background-secondary)",
	borderPrimary: "var(--color-border-primary)",
	borderSecondary: "var(--color-border-secondary)",
	brandPrimary: "var(--color-brand-primary)",
	brandPrimaryHover: "var(--color-brand-primary-hover)",
	danger: "var(--color-danger)",
	overlay: "var(--color-overlay)",
	success: "var(--color-success)",
	textPrimary: "var(--color-text-primary)",
	textSecondary: "var(--color-text-secondary)",
	warning: "var(--color-warning)",
} as const;

export { colorToCss };
