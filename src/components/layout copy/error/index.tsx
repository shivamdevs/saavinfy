import { CallError, CallResponse } from "@/lib/call";
import Image from "next/image";
import React from "react";
import ErrorBoxRefresh from "./refresh";

function ErrorBox({
    data,
    children,
}: React.PropsWithChildren<{ data: CallError | CallResponse<unknown> }>) {
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
