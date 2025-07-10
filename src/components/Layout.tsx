import type { ReactNode } from "react";

interface LayoutProps {
    children: ReactNode;
    className?: string;
}

export default function Layout({ children, className = "" }: LayoutProps) {
    return (
        <div className={`w-full min-h-screen flex flex-col ${className}`}>
            {children}
        </div>
    );
}
