import type { Metadata } from "next";
import { Syne, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["700", "800"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Pol-Martí de Tera | Portfolio",
  description: "Portfolio personal de Pol-Martí de Tera Pujol - Estudiant de Batxillerat amb interès en robòtica, programació i disseny 3D",
  keywords: ["portfolio", "robòtica", "Python", "Micro:bit", "Onshape", "Batxillerat"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ca"
      suppressHydrationWarning
      className={`${syne.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background font-body">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
