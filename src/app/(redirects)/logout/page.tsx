import { PageProps } from "@/types/args";
import React from "react";
import LogoutPage from "./_logout";
import SupabaseServerClient from "@/supabase/server";
import { revalidatePath } from "next/cache";

export default async function Page({ searchParams }: PageProps) {
    const supabase = SupabaseServerClient();

    const continuePath = (searchParams?.continue as string) || "/";

    await supabase.auth.signOut();

    revalidatePath(continuePath);

    return <LogoutPage continuePath={continuePath} />;
}
