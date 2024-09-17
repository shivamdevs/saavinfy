// "use client";

// import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import React from "react";
// import { useAuthStatus } from "../hooks";
// import { Button } from "@/components/ui/button";
// import ErrorBox from "@/components/ui/error";
// import { AuthState } from "../states";
// import AuthLoader from "../_loader";
// import ContinueButton from "@/components/blocks/continue";

// export default function LoginPage() {
//     const [state, formAction] = useLogin();

//     return (
//         <>
//             <CardHeader>
//                 <h2 className="text-2xl font-bold text-center">
//                     Login to Saavinfy
//                 </h2>
//             </CardHeader>
//             <Separator />
//             <form action={formAction} className="mx-auto mt-3 max-w-96 py-3">
//                 {state && <FormContent state={state} />}
//                 <AuthLoader />
//             </form>
//         </>
//     );
// }

// export function FormContent({ state }: { state: AuthState }) {
//     const status = useAuthStatus();

//     return (
//         <>
//             <CardContent className="space-y-6">
//                 <Input
//                     id="email"
//                     type="email"
//                     label="Email"
//                     placeholder="Email..."
//                     className="bg-card"
//                     disabled={status.pending}
//                     autoComplete="email"
//                     autoFocus
//                     required
//                 />
//                 <Input
//                     id="password"
//                     type="password"
//                     label="Password"
//                     placeholder="Password..."
//                     className="bg-card"
//                     disabled={status.pending}
//                     autoComplete="current-password"
//                     required
//                 />
//                 <div className="flex justify-end">
//                     <ContinueButton
//                         href="/login/recover"
//                         variant="link"
//                         replace
//                     >
//                         Forgot password?
//                     </ContinueButton>
//                 </div>
//                 <ErrorBox error={state.error} />
//             </CardContent>
//             <CardFooter className="flex-col gap-3 items-stretch">
//                 <Button type="submit" disabled={status.pending}>
//                     Login
//                 </Button>
//                 <ContinueButton variant="ghost" href="/signup" replace>
//                     Don&apos;t have an account? Sign up
//                 </ContinueButton>
//             </CardFooter>
//         </>
//     );
// }
