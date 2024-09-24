import { SupabaseServerUser } from "@/supabase/server";
import { SearchParams } from "@/types/args";
import { redirect } from "next/navigation";

export default async function AuthUserCheck({
    searchParams,
}: {
    searchParams?: SearchParams;
}) {
    const user = await SupabaseServerUser();
    const continuePath = (searchParams?.continue as string) || "/";

    if (user) {
        redirect(continuePath);
    }

    return null;
}
