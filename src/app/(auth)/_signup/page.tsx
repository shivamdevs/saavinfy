// import React from "react";
// import SignupPage from "./_signup";
// import { SupabaseServerUser } from "@/supabase/server";
// import { PageProps } from "@/types/args";
// import { redirect } from "next/navigation";

// export default async function Page({ searchParams }: PageProps) {
//     const user = await SupabaseServerUser();
//     const continuePath = (searchParams?.continue as string) || "/";

//     if (user) {
//         return redirect(continuePath);
//     }

//     return <SignupPage />;
// }
