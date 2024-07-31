"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import useSession from "@/hooks/useSession";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import useSWR from "swr";

function EditForm({ mutate, name, type, value }: any) {
	const [loading, setLoading] = useState(false);
	const [edit, setEdit] = useState(true);
	const input: any = useRef(null);

	let user = useSession.getState().user;
	const setUser = useSession((state) => state.setUser);

	return (
		<div className="flex w-full max-w-md items-end space-x-2">
			<div className="grid w-full max-w-md items-center gap-1.5">
				<Label htmlFor={name}>{name}</Label>
				<Input
					defaultValue={value}
					type={type}
					id={name}
					placeholder={name}
					disabled={edit}
					ref={input}
					className="bg-white"
				/>
			</div>
			{!edit && (
				<Button
					type="submit"
					onClick={async () => {
						setLoading(true);
						const { data } = await axios.post(
							`/user/settings/update?type=${name}`,
							{
								[name]: input?.current?.value,
							},
							{
								validateStatus: () => true,
							}
						);
						if (data.success) {
							mutate();
							user[name] = input?.current?.value;
							setUser(user);
							setEdit(true);
						}
						toast({
							variant: data.success ? "default" : "destructive",
							title: data.message,
						});
						setLoading(false);
					}}
					disabled={loading}
				>
					{loading ? (
						<>
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							loading
						</>
					) : (
						<>Update</>
					)}
				</Button>
			)}
			<Button
				variant={"outline"}
				type="button"
				onClick={() => {
					setEdit(!edit);
				}}
			>
				{edit ? "Edit" : "Undo"}
			</Button>
		</div>
	);
}

export default function Comp() {
	const fetcher = (url: string) => fetch(url).then((r) => r.json());
	let { data, mutate } = useSWR(`/user/settings/update`, fetcher);
	return (
		<div className="w-2/3 space-y-6">
			<h1 className="text-4xl font-bold">Settings</h1>
			{data ? (
				<>
					<EditForm
						mutate={mutate}
						value={data.username}
						name={"username"}
						type={"text"}
					/>
					<EditForm
						mutate={mutate}
						value={data.name[0]}
						name={"name"}
						type={"text"}
					/>
				</>
			) : (
				<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			)}

			<Button>
				<Link href="/auth/forget">Reset Password</Link>
			</Button>
		</div>
	);
}
