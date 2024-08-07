"use client";
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import useSWR from "swr";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from "@/components/ui/table";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationPrevious,
	PaginationNext,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import Delete from "./delete/Delete";
import { ExpandIcon, FileIcon, FilePenIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DataTable({ searchParams }: any) {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	let { data, mutate } = useSWR(
		`/user/tasks/read?${new URLSearchParams(searchParams).toString()}`,
		fetcher
	);
	const router = useRouter();
	const search: string = searchParams.q || "";
	const currentPage: number = Number(searchParams.page) || 1;
	const search_input: any = useRef(null);
	return (
		<Card>
			<CardHeader>
				<CardTitle>Tasks</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Input
							type="search"
							placeholder="Search ..."
							className="max-w-xs"
							defaultValue={search}
							ref={search_input}
						/>
						<Button
							size="sm"
							onClick={() => {
								router.push(
									`/user/tasks?${new URLSearchParams({
										...searchParams,
										q: search_input?.current?.value || "",
									}).toString()}`
								);
							}}
						>
							Search
						</Button>
					</div>
					<a
						href="/user/tasks/create"
						className={buttonVariants({
							size: "sm",
						})}
					>
						Create
					</a>
				</div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>id</TableHead>
							<TableHead>Title</TableHead>
							<TableHead>Rows</TableHead>
							<TableHead>State</TableHead>
							<TableHead>actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{data
							? data.items.map((item: any, index: number) => {
									return (
										<TableRow key={item.id}>
											<TableCell>{index + 1}</TableCell>
											<TableCell className="font-medium">
												{item.title}
											</TableCell>
											<TableCell>{item.rows}</TableCell>
											<TableCell>
												{item.state}{" "}
												{item.state == "ERROR" && (
													<Button
														variant={"outline"}
														onClick={async () => {
															await axios.get(
																`/user/tasks/actions?id=${item.id}`
															);
															await mutate();
														}}
													>
														Restart Task
													</Button>
												)}
											</TableCell>
											<TableCell>
												<DropdownMenu>
													<DropdownMenuTrigger asChild>
														<Button size="icon" variant="ghost">
															<ExpandIcon className="h-4 w-4" />
															<span className="sr-only">Actions</span>
														</Button>
													</DropdownMenuTrigger>
													<DropdownMenuContent align="end">
														<DropdownMenuItem>
															<a
																href={`/user/tasks/${item.id}?view=true`}
																className="flex gap-1"
															>
																<FileIcon className="h-4 w-4 mr-2" />
																View
															</a>
														</DropdownMenuItem>
														<DropdownMenuItem>
															<a
																href={`/user/tasks/${item.id}`}
																className="flex gap-1"
															>
																<FilePenIcon className="h-4 w-4 mr-2" />
																Edit
															</a>
														</DropdownMenuItem>
														<DropdownMenuItem
															onClick={(e) => {
																e.preventDefault();
															}}
														>
															<Delete mutate={mutate} id={item.id} />
														</DropdownMenuItem>
													</DropdownMenuContent>
												</DropdownMenu>
											</TableCell>
										</TableRow>
									);
							  })
							: [...Array(10)].map((index: number) => {
									return (
										<TableRow key={index}>
											{[...Array(5)].map((row: number) => {
												return (
													<TableCell key={row}>
														<Skeleton className="h-4 w-[100px]" />
													</TableCell>
												);
											})}
										</TableRow>
									);
							  })}
					</TableBody>
				</Table>
			</CardContent>
			{data && data.items.length == 0 && (
				<CardFooter>
					<div className="mx-auto">
						<div className="text-xs flex gap-1 w-full text-muted-foreground">
							no data.
						</div>
					</div>
				</CardFooter>
			)}
			{data && (
				<CardFooter>
					<div className="flex items-center justify-between">
						<div className="text-xs flex gap-1 w-full text-muted-foreground">
							page <strong>{currentPage}</strong> of{" "}
							<strong>{Math.max(data.pages, 1)}</strong>
						</div>
						<Pagination>
							<PaginationContent>
								{currentPage > 1 && (
									<PaginationItem>
										<PaginationPrevious
											href={`/user/tasks?${new URLSearchParams({
												...searchParams,
												page: currentPage - 1,
											}).toString()}`}
										/>
									</PaginationItem>
								)}
								{currentPage < data.pages && (
									<PaginationItem>
										<PaginationNext
											href={`/user/tasks?${new URLSearchParams({
												...searchParams,
												page: currentPage + 1,
											}).toString()}`}
										/>
									</PaginationItem>
								)}
							</PaginationContent>
						</Pagination>
					</div>
				</CardFooter>
			)}
		</Card>
	);
}
