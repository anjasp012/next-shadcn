import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Sidebar from "../fragments/Sidebar";
import Header from "../fragments/Header";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../ui/toaster";

const AuthenticationLayout = ({ children }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex">
                <Sidebar />
                <main className="w-full flex-1 overflow-hidden">
                    <Header />
                    <div className="h-full  p-4 md:px-8">
                        {children}
                    </div>
                </main>
            </div>
            <Toaster />
        </ThemeProvider>
    )
}

export default AuthenticationLayout;
