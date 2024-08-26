import React from "react";

import call from "@/lib/call";
import ErrorBox from "@/components/layout/error";

export default async function Page() {
    const response = await call("GET", "/feed");

    return <ErrorBox data={response}></ErrorBox>;
}
