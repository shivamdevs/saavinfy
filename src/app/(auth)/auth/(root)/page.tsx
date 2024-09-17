import React from "react";
import { PageProps } from "@/types/args";
import AuthUserCheck from "../_components/_user";
import EmailPage from "./_email";

export default async function Page({ searchParams }: PageProps) {
    return (
        <>
            <AuthUserCheck searchParams={searchParams} />
            <EmailPage email={searchParams?.email as string} />
        </>
    );
}
