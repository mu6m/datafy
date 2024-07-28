"use client";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";

export default function Delete({ id, mutate }: any) {
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [state, setState] = useState({
		success: false,
		message: "",
	});

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<div className="flex">
					<TrashIcon className="h-4 w-4 mr-2" />
					Delete
				</div>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you sure?</AlertDialogTitle>
					<AlertDialogDescription>
						{state.message != "" ? (
							<div id="name-error" aria-live="polite" className=" text-sm ">
								<p
									className={state.success ? `text-green-500` : `text-red-500`}
								>
									{state.message}
								</p>
							</div>
						) : null}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<Button
						onClick={async () => {
							setLoading(true);
							const { data } = await axios.delete("/user/tasks/delete", {
								params: { id },
							});
							setLoading(false);
							if (!data.success) {
								setState(data);
							} else {
								setOpen(false);
								await mutate();
							}
						}}
						variant="destructive"
						disabled={loading}
					>
						{loading ? (
							<>
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
								Please wait
							</>
						) : (
							<>Delete</>
						)}
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
