import React, { Suspense } from "react";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import ContinueButton from "@/components/blocks/continue";
import Link from "next/link";

export default async function Page() {
    return (
        <>
            <CardHeader>
                <h2 className="text-2xl font-bold text-center">
                    Verification failed
                </h2>
            </CardHeader>
            <Separator />
            <CardContent className="text-sm py-5 space-y-3 text-center">
                <p>
                    An unknown error occurred while verifying your email.
                    <br />
                    Please try again.
                </p>

                <Image
                    src="/images/email-error.svg"
                    alt="Email verification failed"
                    width={120}
                    height={120}
                    className="mx-auto"
                />
            </CardContent>
            <CardFooter className="flex-col gap-3 items-stretch">
                <Suspense
                    fallback={<Link href="/auth">Update / resend email</Link>}
                >
                    <ContinueButton href={`/auth`} noContinue>
                        Update / resend email
                    </ContinueButton>
                </Suspense>
                <p className="text-secondary-foreground text-sm text-center">
                    If you continue to have problems, please contact{" "}
                    <a
                        href="/support?ref=auth-error"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        support
                    </a>
                    .
                </p>
            </CardFooter>
        </>
    );
}
