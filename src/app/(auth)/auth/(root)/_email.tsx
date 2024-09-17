"use client";

import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useAuth, useAuthStatus } from "../_server/hooks";
import { Button } from "@/components/ui/button";
import ErrorBox from "@/components/ui/error";
import { AuthState } from "../_server/states";
import AuthLoader from "../_components/_loader";
import { validateEmail } from "@/lib/utils";

export default function EmailPage({ email }: { email?: string }) {
    const [state, formAction] = useAuth();

    return (
        <>
            <CardHeader>
                <h2 className="text-2xl font-bold text-center">
                    Login to Saavinfy
                </h2>
            </CardHeader>
            <Separator />
            <form action={formAction} className="mx-auto mt-3 max-w-96 py-3">
                {state && <FormContent state={state} email={email} />}
                <AuthLoader />
            </form>
        </>
    );
}

export function FormContent({
    state,
    email,
}: {
    state: AuthState;
    email?: string;
}) {
    const status = useAuthStatus();

    return (
        <>
            <CardContent className="space-y-6">
                <Input
                    id="email"
                    type="email"
                    label="Email"
                    placeholder="Email..."
                    className="bg-card"
                    disabled={status.pending}
                    defaultValue={validateEmail(email) ? email : undefined}
                    autoComplete="email"
                    autoFocus
                    required
                />
                <ErrorBox error={state.error} />

                <div className="text-sm text-secondary-foreground space-y-2">
                    <p>We will send you a magic link to your email.</p>
                    <p>
                        A new account will be automatically created if you
                        don&apos;t have an existing one.
                    </p>
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-3 items-stretch">
                <Button type="submit" disabled={status.pending}>
                    Send Magic Link
                </Button>
            </CardFooter>
        </>
    );
}
