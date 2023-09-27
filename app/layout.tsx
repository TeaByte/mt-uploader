import "./globals.css";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";

import Image from "next/image";
import Footer from "@/components/footer";
import ThemeProvider from "@/components/theme/provider";
import Link from "next/link";

const font = Rubik({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "MT Uploader",
  description: "Upload files up to 2GB for free",
  keywords: [
    "upload file",
    "file upload",
    "free upload",
    "free file upload",
    "upload files",
    "anonfiles",
    "anonfile",
    "free anonfiles",
    "free anonfile",
    "mtproto upload",
    "telegram upload",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <main className="container mt-20">
            <div className="flex flex-col justify-center items-center gap-4">
              <Link
                href={"/"}
                className="flex items-center gap-3 hover:animate-pulse"
              >
                <div>
                  <h1 className="md:text-5xl text-3xl">MT Uploader</h1>
                  {/* <p>Upload up to 2GB</p> */}
                </div>
                <Image
                  src="/folder.webp"
                  className="transition-transform duration-1000 ease-in-out animate-bounce"
                  alt="logo"
                  width={50}
                  height={50}
                />
              </Link>
              {children}
              <Footer />
            </div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
