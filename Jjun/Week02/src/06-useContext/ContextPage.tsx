import { ThemeProvider } from "./context/ThemeProvider";
import Navbar from "./Navbar";
import ThemeContent from "./ThemeContent";
import { useTheme, THEME } from "./context/ThemeProvider";
import clsx from "clsx";

function Layout() {
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <div
            className={clsx(
                "min-h-screen w-full",
                isLightMode ? "bg-white" : "bg-gray-800"
            )}
        >
            <Navbar />
            <main className="flex justify-center">
                <ThemeContent />
            </main>
        </div>
    );
}

export default function ContextPage() {
    return (
        <ThemeProvider>
            <Layout />
        </ThemeProvider>
    );
}