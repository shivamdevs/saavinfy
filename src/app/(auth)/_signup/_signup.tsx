// "use client";

// import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import React from "react";
// import { useAuthStatus, useSignup } from "../hooks";
// import { Button } from "@/components/ui/button";
// import ErrorBox from "@/components/ui/error";
// import { AuthState } from "../states";
// import AuthLoader from "../_loader";
// import ContinueButton from "@/components/blocks/continue";

// export default function SignupPage() {
//     const [state, formAction] = useSignup();

//     return (
//         <>
//             <CardHeader>
//                 <h2 className="text-2xl font-bold text-center">
//                     Signup to start listening
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
//                 {/* <Input type="hidden" id="pointer" value={state.pointer} /> */}
//                 {!state.pointer && (
//                     <>
//                         <Input
//                             id="first_name"
//                             type="text"
//                             label="Full name"
//                             placeholder="First name..."
//                             className="bg-card"
//                             disabled={status.pending}
//                             autoComplete="given-name"
//                             autoFocus
//                             required
//                         />
//                         <Input
//                             id="last_name"
//                             type="text"
//                             placeholder="Last name..."
//                             className="bg-card"
//                             disabled={status.pending}
//                             autoComplete="family-name"
//                             required
//                         />
//                     </>
//                 )}
//                 {state.pointer === "email" && (
//                     <>
//                         <Input
//                             id="email"
//                             type="email"
//                             label="Email"
//                             placeholder="Email..."
//                             className="bg-card"
//                             disabled={status.pending}
//                             autoComplete="email"
//                             required
//                         />
//                         <Input
//                             id="new_password"
//                             type="password"
//                             label="Create Password"
//                             placeholder="Password..."
//                             className="bg-card"
//                             disabled={status.pending}
//                             autoComplete="new-password"
//                             required
//                         />
//                         <Input
//                             id="confirm_password"
//                             type="password"
//                             placeholder="Confirm password..."
//                             className="bg-card"
//                             disabled={status.pending}
//                             autoComplete="new-password"
//                             required
//                         />
//                     </>
//                 )}
//                 <ErrorBox error={state.error} />
//             </CardContent>
//             <CardFooter className="flex-col gap-3 items-stretch">
//                 <Button type="submit" disabled={status.pending}>
//                     Next
//                 </Button>
//                 {!state.pointer && (
//                     <ContinueButton variant="ghost" href="/login" replace>
//                         Already have an account? Login here
//                     </ContinueButton>
//                 )}
//             </CardFooter>
//         </>
//     );
// }
