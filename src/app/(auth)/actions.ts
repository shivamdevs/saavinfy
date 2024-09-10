"use server";

import SupabaseServerClient from "@/supabase/server";
import { AuthState } from "./states";

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): string | undefined {
    // Password must be at least 8 characters long
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }

    // Password must contain at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter";
    }

    // Password must contain at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter";
    }

    // Password must contain at least one number
    if (!/\d/.test(password)) {
        return "Password must contain at least one number";
    }

    // Password must contain at least one special character
    if (!/[^A-Za-z0-9]/.test(password)) {
        return "Password must contain at least one special character";
    }

    return;
}

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

    success(): AuthState {
        return {
            ...this.state,
            success: true,
            error: "",
        };
    }
}

export async function loginAction(
    state: AuthState,
    formData: FormData
): Promise<AuthState> {
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    const response = new Response(state);

    if (!email) {
        return response.fail("Email is required");
    }

    if (!password) {
        return response.fail("Password is required");
    }

    if (!validateEmail(email)) {
        return response.fail("Invalid email");
    }

    const passwordError = validatePassword(password);

    if (passwordError) {
        return response.fail(passwordError);
    }

    const supabase = SupabaseServerClient();

    const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return response.fail(error.message, error);
    }

    if (data.weakPassword) {
        return response.fail("Weak password");
    }

    return response.success();
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
