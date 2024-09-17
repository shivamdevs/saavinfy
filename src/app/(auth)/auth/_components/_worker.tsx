"use client";

import SupabaseBrowserClient from "@/supabase/client";
import { SearchParams } from "@/types/args";
import { useInterval } from "react-unique-hooks";

export default function AuthWorker({
    searchParams,
}: {
    searchParams?: SearchParams;
}) {
    const { stop } = useInterval(() => {
        const supabase = SupabaseBrowserClient();
        const next = (searchParams?.continue as string) || "/";

        supabase.auth.getUser().then(({ data, error }) => {
            if (!error && data.user) {
                stop();
                window.location.replace(next);
            }
        });
    }, 100);

    return null;
}
