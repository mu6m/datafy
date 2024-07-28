import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/landing/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Datafy",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Nav />
				<main className="min-h-screen px-4">{children}</main>
				<Footer />
			</body>
		</html>
	);
}
