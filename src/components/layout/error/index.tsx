import { CallError, CallResponse } from "@/lib/call";
import Image from "next/image";
import React from "react";
import ErrorBoxRefresh from "./refresh";
import Lucide from "@/components/lucide";

export type ErrorBoxProps = React.PropsWithChildren<{
    data: CallError | CallResponse<unknown>;
    isLoading?: boolean;
    isValidating?: boolean;
}>;

function ErrorBox({ data, children, isLoading, isValidating }: ErrorBoxProps) {
    if (isLoading || isValidating) {
        return (
            <div className="relative flex-1 flex-center h-full w-full max-h-screen max-w-[100vw]">
                <Lucide.LoaderCircle size={40} className="animate-spin" />
            </div>
        );
    }

    if (data.success === false) {
        return (
            <div className="relative flex-1 flex flex-col items-stretch justify-center">
                <div className="relative w-full h-40">
                    <Image
                        src="/images/broken.png"
                        alt="Error"
                        priority
                        className="object-cover w-full h-full absolute inset-0"
                        width={1000}
                        height={1000}
                    />
                </div>
                <h2 className="text-2xl font-bold text-center text-red-400 mt-8">
                    Something went wrong!
                </h2>
                <p className="text-center text-lg text-secondary-foreground mt-8">
                    {data.message}
                </p>

                <ErrorBoxRefresh />
            </div>
        );
    }

    return children;
}

export default ErrorBox;
