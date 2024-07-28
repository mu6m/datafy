import { Box, LayoutDashboardIcon, User } from "lucide-react";

export const navItems: any[] = [
	{
		title: "Dashboard",
		href: "/user",
		icon: LayoutDashboardIcon,
		label: "Dashboard",
	},
	{
		title: "Tasks",
		href: "/user/tasks",
		icon: Box,
		label: "Tasks",
	},
	{
		title: "User",
		href: "/user/settings",
		icon: User,
		label: "User",
	},
];
