import { z } from "zod";

export const schema_name = z.object({
	name: z.string().min(1, { message: "Name is required" }),
});
export const schema_username = z.object({
	username: z
		.string()
		.regex(new RegExp("[A-Za-z0-9]"), {
			message: "Username should have only characters and numbers ",
		})
		.min(1, { message: "Username is required" }),
});
//needs verification
export const schema_email = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Please enter a valid email address." })
		.refine(
			(email: string) => {
				const usernamePart = email.substring(0, email.indexOf("@"));
				return (
					!usernamePart.includes("+") &&
					!usernamePart.includes(".") &&
					email.endsWith("@gmail.com")
				);
			},
			{
				message: "Only Gmail addresses (without + or . in email) are allowed.",
			}
		),
});
