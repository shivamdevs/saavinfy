import React from "react";
import LoginPage from "./_login";
import { PageProps } from "@/types/args";
import { SupabaseServerUser } from "@/supabase/server";
import { redirect } from "next/navigation";

export default async function Page({ searchParams }: PageProps) {
    const user = await SupabaseServerUser();
    const continuePath = (searchParams?.continue as string) || "/";

    if (user) {
        return redirect(continuePath);
    }

    return <LoginPage />;
}
