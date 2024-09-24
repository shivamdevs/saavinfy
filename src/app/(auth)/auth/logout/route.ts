import SupabaseServerClient from "@/supabase/server";
import { revalidatePath } from "next/cache";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";

export async function GET(request: NextRequest) {
    const supabase = SupabaseServerClient();

    const { searchParams } = new URL(request.url);

    const continuePath = (searchParams.get("continue") as string) || "/";

    await supabase.auth.signOut();

    revalidatePath(continuePath);

    redirect(continuePath);
}
