import { PageProps } from "@/types/args";
import React from "react";
import AuthUserCheck from "../_components/_user";
import { redirect } from "next/navigation";
import { validateEmail } from "@/lib/utils";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ContinueButton from "@/components/blocks/continue";
import Image from "next/image";
import AuthWorker from "../_components/_worker";

export default async function Page({ searchParams }: PageProps) {
    const email = searchParams?.email as string;
    const continuePath = (searchParams?.continue as string) || "/";

    if (!email || !validateEmail(email)) {
        return redirect(`/auth?continue=${encodeURIComponent(continuePath)}`);
    }

    return (
        <>
            <AuthUserCheck searchParams={searchParams} />
            <AuthWorker />
            <CardHeader>
                <h2 className="text-2xl font-bold text-center">
                    Verify your email
                </h2>
            </CardHeader>
            <Separator />
            <CardContent className="text-sm py-5 space-y-3">
                <p>
                    Hi <b className="text-primary">{email}</b>,
                </p>
                <p>
                    We have sent a magic link to you. Click on the link to
                    verify yourself.
                </p>

                <Image
                    src="/images/email-sent.svg"
                    alt="Email sent"
                    width={120}
                    height={120}
                    className="mx-auto"
                />

                <p className="text-secondary-foreground">
                    Check your spam folder if you don&apos;t see the email in
                    your inbox.
                </p>
            </CardContent>
            <CardFooter className="flex-col gap-3 items-stretch">
                <ContinueButton href={`/auth?email=${email}`}>
                    Update / resend email
                </ContinueButton>
            </CardFooter>
        </>
    );
}
