"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "./ui/tooltip";

interface DashboardNavProps {
	items: any[];
	setOpen?: Dispatch<SetStateAction<boolean>>;
	isMobileNav?: boolean;
}

export function DashboardNav({
	items,
	setOpen,
	isMobileNav = false,
}: DashboardNavProps) {
	const path = usePathname();
	const { isMinimized } = useSidebar();

	if (!items?.length) {
		return null;
	}

	return (
		<nav className="grid items-start gap-2 px-4">
			<TooltipProvider>
				{items.map((item: any, index) => {
					return (
						item.href && (
							<Tooltip key={index}>
								<TooltipTrigger asChild>
									<Link
										href={item.disabled ? "/" : item.href}
										className={cn(
											"flex px-3 gap-2 items-center overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-slate-100 hover:text-accent-foreground",
											path === item.href ? "bg-slate-200" : "transparent",
											item.disabled && "cursor-not-allowed opacity-80"
										)}
										onClick={() => {
											if (setOpen) setOpen(false);
										}}
									>
										<item.icon className={`min-w-8`} />

										{isMobileNav || (!isMinimized && !isMobileNav) ? (
											<span className="truncate">{item.title}</span>
										) : (
											""
										)}
									</Link>
								</TooltipTrigger>
								<TooltipContent
									align="center"
									side="right"
									sideOffset={8}
									className={!isMinimized ? "hidden" : "inline-block"}
								>
									{item.title}
								</TooltipContent>
							</Tooltip>
						)
					);
				})}
			</TooltipProvider>
		</nav>
	);
}
