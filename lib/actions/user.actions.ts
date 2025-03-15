"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signIn, signOut } from "@/auth";
import { signInFormSchema } from "../validator";

// Sign in the user with credentials
export async function signInWithCreadentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
    await signIn("credentials", user);
    return { success: true, message: "Sign in successful" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

// Sign out the user
export async function signOutUser() {
  await signOut();
}
