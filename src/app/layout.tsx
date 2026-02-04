import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";
import { HashScroller } from "@/components/HashScroller";
import { HeadScripts, BodyScripts, FooterScripts, UTMTracker } from "@/extensions";

export const metadata: Metadata = {
    title: "WPFYE | The Fluid Cloud",
    description: "Infrastructure That Breathes. Engineered for high-intensity workloads. Our cloud fabric expands organically with your traffic, delivering peak performance without manual intervention.",
    keywords: ["cloud", "infrastructure", "autoscaling", "serverless", "hosting"],
    openGraph: {
        title: "WPFYE | The Fluid Cloud",
        description: "Infrastructure That Breathes. Engineered for high-intensity workloads.",
        type: "website",
    },
    icons: {
        icon: '/images/wpfye_favicon.svg',
        shortcut: '/images/wpfye_favicon.svg',
        apple: '/images/wpfye_favicon.svg',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link
                    href="https://api.fontshare.com/v2/css?f[]=clash-display@700,600&f[]=satoshi@400,500,700&display=swap"
                    rel="stylesheet"
                />
                <HeadScripts />
            </head>
            <body>
                <BodyScripts />
                <UTMTracker />
                <LenisProvider>
                    <HashScroller />
                    {children}
                </LenisProvider>
                <div className="noise-texture" />
                <div className="spotlight" />
                <FooterScripts />
            </body>
        </html>
    );
}
