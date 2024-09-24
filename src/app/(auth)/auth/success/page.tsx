import React from "react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function Page() {
    return (
        <>
            <CardHeader>
                <h2 className="text-2xl font-bold text-center">
                    Email successfully verified
                </h2>
            </CardHeader>
            <Separator />
            <CardContent className="text-sm py-5 space-y-3 text-center">
                <p>Your email has been successfully verified.</p>

                <Image
                    src="/images/email-verified.svg"
                    alt="Email verified"
                    width={120}
                    height={120}
                    className="mx-auto"
                />

                <p className="text-secondary-foreground">
                    You can safely close this window.
                </p>
            </CardContent>
        </>
    );
}
