"use client";

import { useActionState, useEffect, useState } from "react";
import { form } from "./action";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";

function Column() {
	enum types {
		STRING = "STRING",
		NUMBER = "NUMBER",
		TIME = "TIME",
		BOOLEAN = "BOOLEAN",
	}
	const [type, setType] = useState(types.STRING);
	return (
		<>
			<div>
				<label
					htmlFor="name"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					name
				</label>
				<input
					type="text"
					name="name"
					id="name"
					className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="..."
				/>
			</div>
			<label
				htmlFor="type"
				className="block mt-4 mb-2 text-sm font-medium text-gray-900"
			>
				Type
			</label>
			<select
				id="type"
				name="type"
				className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
				value={type}
				onChange={(e: any) => setType(e.target.value)}
			>
				{Object.values(types).map((t) => (
					<option key={t} value={t}>
						{t}
					</option>
				))}
			</select>
			<div>
				<label
					htmlFor="generate"
					className="block mb-2 text-sm font-medium text-gray-900"
				>
					generate
				</label>
				<textarea
					rows={5}
					name="generate"
					id="generate"
					className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
					placeholder="..."
					maxLength={500}
				/>
			</div>
		</>
	);
}

function SubmitButton({ loading }: any) {
	return (
		<Button type="submit" disabled={loading}>
			{loading ? (
				<>
					<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</>
			) : (
				<>Submit</>
			)}
		</Button>
	);
}

export default function Comp() {
	const { toast } = useToast();
	const [state, formAction] = useActionState(form, {
		success: true,
		message: "",
	});
	const [cols, setCols] = useState(1);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		if (state.message != "") {
			toast({
				variant: state.success ? "default" : "destructive",
				title: state.message,
			});
		}
		setLoading(false);
	}, [state]);

	return (
		<section>
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
				<div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
							Create
						</h1>
						<form
							className="space-y-4 md:space-y-6"
							onSubmit={(e: any) => {
								e.preventDefault();
								setLoading(true);
								formAction(new FormData(e.target));
							}}
						>
							<div>
								<label
									htmlFor="title"
									className="block mb-2 text-sm font-medium text-gray-900"
								>
									title
								</label>
								<input
									type="text"
									name="title"
									id="title"
									className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
									placeholder="..."
								/>
							</div>
							<div>
								<label
									htmlFor="rows"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									number of Rows:
								</label>
								<input
									type="number"
									min={1}
									max={1_000}
									id="rows"
									name="rows"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									defaultValue={100}
									required
								/>
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
									number of columns:
								</label>
								<input
									min={1}
									max={10}
									type="number"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
									value={cols}
									onChange={(e) => setCols(Number(e.target.value))}
									required
								/>
							</div>
							<div className="flex gap-4 overflow-x-auto">
								{[...Array(cols)].map((e, i) => (
									<div key={i} className="min-w-80 p-2 rounded-md bg-slate-100">
										<Column />
									</div>
								))}
							</div>
							<SubmitButton loading={loading} />
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
