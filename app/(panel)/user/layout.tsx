import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "@/app/globals.css";
import React from "react";

export const metadata: Metadata = {
	title: "dashboard | Datafy",
};

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<html lang="en">
				<body>
					<Toaster />
					<Header />
					<div className="flex">
						<Sidebar />
						<main className="flex-1 overflow-y-scroll p-16">{children}</main>
					</div>
				</body>
			</html>
		</>
	);
}
