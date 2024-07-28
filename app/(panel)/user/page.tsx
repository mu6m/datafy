"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Link } from "lucide-react";
import React from "react";
import useSWR from "swr";

export default function Comp() {
	const fetcher = (url: string) =>
		fetch(url, { method: "POST" }).then((r) => r.json());
	let { data, isLoading } = useSWR(`/user/data/`, fetcher);
	console.log(data);
	if (isLoading) {
		return <ReloadIcon className="h-4 w-4 animate-spin mx-auto my-60" />;
	}
	return (
		<div className="flex flex-col gap-4 max-w-xl w-full mx-auto">
			<div className="flex flex-col justify-between items-center w-full  md:flex-row gap-4">
				<div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
					<div className="px-4 py-5 sm:p-6">
						<dl>
							<dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
								Dataset pending
							</dt>
							<dd className="mt-1 text-3xl leading-9 font-semibold text-indigo-600 dark:text-indigo-400">
								{data.pending.count}
							</dd>
						</dl>
					</div>
				</div>
				<div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
					<div className="px-4 py-5 sm:p-6">
						<dl>
							<dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
								Dataset finished
							</dt>
							<dd className="mt-1 text-3xl leading-9 font-semibold text-green-600 dark:text-indigo-400">
								{data.finished.count}
							</dd>
						</dl>
					</div>
				</div>
				<div className="bg-white overflow-hidden shadow sm:rounded-lg dark:bg-gray-900">
					<div className="px-4 py-5 sm:p-6">
						<dl>
							<dt className="text-sm leading-5 font-medium text-gray-500 truncate dark:text-gray-400">
								Dataset with error
							</dt>
							<dd className="mt-1 text-3xl leading-9 font-semibold text-red-600 dark:text-indigo-400">
								{data.error.count}
							</dd>
						</dl>
					</div>
				</div>
			</div>

			<div className="relative overflow-x-auto mx-auto bg-white rounded-md w-full">
				<table className="w-full text-sm text-left rtl:text-right text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-neutral-300">
						<tr>
							<th scope="col" className="px-6 py-3">
								Title
							</th>
							<th scope="col" className="px-6 py-3">
								Link
							</th>
						</tr>
					</thead>
					<tbody>
						{data.items.map((item: any) => {
							return (
								<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
									<th
										scope="row"
										className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
									>
										{item.title}
									</th>
									<td className="px-6 py-4">
										<Link href={`/user/data?id=${item.id}`}></Link>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{data.items.length == 0 && (
					<h1 className="font-bold text-1xl my-8 text-center">
						no generations are created
					</h1>
				)}
			</div>
		</div>
	);
}
