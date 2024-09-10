"use client";

import { loginAction } from "./actions";
import { useFormState, useFormStatus } from "react-dom";
import { authState } from "./states";
import { useSearchParams } from "next/navigation";
import React from "react";

export function useAuthStatus() {
    return useFormStatus();
}

export function useLogin() {
    const searchParams = useSearchParams();

    const [state, formAction] = useFormState(loginAction, {
        ...authState,
        continue: searchParams.get("continue") || "/",
    });

    React.useEffect(() => {
        if (state.success) {
            window.location.replace(state.continue);
        }
    }, [state.success, state.continue]);

    return [state, formAction] as const;
}

export function useSignup() {
    const searchParams = useSearchParams();

    const [state, formAction] = useFormState(loginAction, {
        ...authState,
        continue: searchParams.get("continue") || "/",
    });

    React.useEffect(() => {
        if (state.success) {
            window.location.replace(state.continue);
        }
    }, [state.success, state.continue]);

    return [state, formAction] as const;
}
