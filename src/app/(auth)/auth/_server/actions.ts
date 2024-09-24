"use server";

import SupabaseServerClient from "@/supabase/server";
import { AuthState } from "./states";
import { redirect } from "next/navigation";
import { validateEmail } from "@/lib/utils";

// function validatePassword(password: string): string | undefined {
//     // Password must be at least 8 characters long
//     if (password.length < 8) {
//         return "Password must be at least 8 characters long";
//     }

//     // Password must contain at least one uppercase letter
//     if (!/[A-Z]/.test(password)) {
//         return "Password must contain at least one uppercase letter";
//     }

//     // Password must contain at least one lowercase letter
//     if (!/[a-z]/.test(password)) {
//         return "Password must contain at least one lowercase letter";
//     }

//     // Password must contain at least one number
//     if (!/\d/.test(password)) {
//         return "Password must contain at least one number";
//     }

//     // Password must contain at least one special character
//     if (!/[^A-Za-z0-9]/.test(password)) {
//         return "Password must contain at least one special character";
//     }

//     return;
// }

class Response {
    state: AuthState;

    constructor(state: AuthState) {
        this.state = state;
    }

    fail(error: string, stack?: AuthState["_error"]): AuthState {
        return {
            ...this.state,
            success: false,
            error,
            _error: stack,
        };
    }

    success(data?: Partial<AuthState>): AuthState {
        return {
            ...this.state,
            success: true,
            error: "",
            ...(data ?? {}),
        };
    }
}

// export async function loginAction(
//     state: AuthState,
//     formData: FormData
// ): Promise<AuthState> {
//     const email = (formData.get("email") as string)?.trim();
//     const password = formData.get("password") as string;

//     const response = new Response(state);

//     if (!email) {
//         return response.fail("Email is required");
//     }

//     if (!password) {
//         return response.fail("Password is required");
//     }

//     if (!validateEmail(email)) {
//         return response.fail("Invalid email");
//     }

//     const passwordError = validatePassword(password);

//     if (passwordError) {
//         return response.fail(passwordError);
//     }

//     const supabase = SupabaseServerClient();

//     const { error, data } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//     });

//     if (error) {
//         return response.fail(error.message, error);
//     }

//     if (data.weakPassword) {
//         return response.fail("Weak password");
//     }

//     return response.success();
// }

// export async function signupAction(
//     state: AuthState,
//     formData: FormData
// ): Promise<AuthState> {
//     const response = new Response(state);

//     const firstName =
//         (formData.get("first_name") as string)?.trim() ??
//         state.signup?.firstName;
//     const lastName =
//         (formData.get("last_name") as string)?.trim() ??
//         state.signup?.firstName;

//     if (!firstName) {
//         return response.fail("First name is required");
//     }

//     if (!lastName) {
//         return response.fail("Last name is required");
//     }

//     const supabase = SupabaseServerClient();

//     if (state.pointer === "email") {
//         const email = (formData.get("email") as string)?.trim();
//         const password = formData.get("new_password") as string;
//         const confirmPassword = formData.get("confirm_password") as string;

//         if (!email) {
//             return response.fail("Email is required");
//         }

//         if (!validateEmail(email)) {
//             return response.fail("Invalid email");
//         }

//         if (!password) {
//             return response.fail("Password is required");
//         }

//         const passwordError = validatePassword(password);

//         if (passwordError) {
//             return response.fail(passwordError);
//         }

//         if (password !== confirmPassword) {
//             return response.fail("Passwords do not match");
//         }

//         const { data, error } = await supabase.auth.signUp({
//             email,
//             password,
//             options: {
//                 data: {
//                     // eslint-disable-next-line camelcase
//                     first_name: firstName,
//                     // eslint-disable-next-line camelcase
//                     last_name: lastName,
//                 },
//             },
//         });

//         console.log(data, error);

//         if (error) {
//             return response.fail(error.message, error);
//         }

//         if (!data.user) {
//             return response.fail("Failed to create user");
//         }

//         const aud = data.user.aud === "authenticated";

//         return response.success({
//             success: aud,
//             pointer: "verify",
//             signup: {
//                 firstName,
//                 lastName,
//                 email,
//                 password: "",
//             },
//         });
//     } else {
//         return response.success({
//             success: false,
//             pointer: "email",
//             signup: {
//                 firstName,
//                 lastName,
//                 email: "",
//                 password: "",
//             },
//         });
//     }

//     return response.success();
// }

export async function authAction(
    state: AuthState,
    formData: FormData
): Promise<AuthState> {
    const response = new Response(state);

    const email = (formData.get("email") as string)?.trim();

    if (!email) {
        return response.fail("Email is required");
    }

    if (!validateEmail(email)) {
        return response.fail("Invalid email");
    }

    const supabase = SupabaseServerClient();

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
            emailRedirectTo: state.origin,
        },
    });

    if (error) {
        return response.fail(error.message, error);
    }

    redirect(`/auth/verify?email=${email}&continue=${state.continue}`);
}

// export async function signup(formData: FormData) {
//     const supabase = createClient();

//     // type-casting here for convenience
//     // in practice, you should validate your inputs
//     const data = {
//         email: formData.get("email") as string,
//         password: formData.get("password") as string,
//     };

//     const { error } = await supabase.auth.signUp(data);

//     if (error) {
//         redirect("/error");
//     }

//     revalidatePath("/", "layout");
//     redirect("/");
// }
