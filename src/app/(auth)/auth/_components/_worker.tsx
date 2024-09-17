"use client";

import SupabaseBrowserClient from "@/supabase/client";
import { useSearchParams } from "next/navigation";
import { useInterval } from "react-unique-hooks";

export default function AuthWorker() {
    const searchParams = useSearchParams();

    const { stop } = useInterval(() => {
        const supabase = SupabaseBrowserClient();
        const next = (searchParams.get("continue") as string) || "/";

        supabase.auth.getUser().then(({ data, error }) => {
            if (!error && data.user) {
                stop();
                window.location.replace(next);
            }
        });
    }, 100);

    return null;
}
