import { NextResponse, type NextRequest } from "next/server";
import SupabaseServerClient from "./server";

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = SupabaseServerClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (
        user &&
        (request.nextUrl.pathname.startsWith("/login") ||
            request.nextUrl.pathname.startsWith("/signup"))
    ) {
        // user is logged in
        const url = request.nextUrl.clone();
        url.pathname = "/";

        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
