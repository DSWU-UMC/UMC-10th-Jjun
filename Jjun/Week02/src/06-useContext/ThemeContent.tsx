import clsx from "clsx";
import { THEME, useTheme } from "./context/ThemeProvider";

export default function ThemeContent() {
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div
            className={clsx(
                "p-4 h-dvh w-full",
                isLightMode ? "bg-white" : "bg-gray-800"
            )}
        >
            <h1
                className={clsx(
                    "text-2xl font-bold",
                    isLightMode ? "text-gray-800" : "text-white"
                )}
            >
                Theme Content
            </h1>
            <p className={clsx("mt-2", isLightMode ? "text-black" : "text-white")}>
                This is a simple theme content component.
            </p>
        </div>
    );
}