import { AuthError } from "@supabase/supabase-js";

export type AuthState = {
    continue: string;
    success: boolean;
    error: string;
    origin: string;
    _error?: AuthError;
};

export const authState: AuthState = {
    continue: "/",
    success: false,
    error: "",
    origin: "",
};
