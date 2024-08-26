"use client";

import React from "react";
import { convertHTMLEntities } from "@/lib/utils";

export default function Entity({ html }: { html: string }) {
    const [text, setText] = React.useState<string>(html);

    React.useLayoutEffect(() => {
        setText(convertHTMLEntities(html));
    }, [html]);

    return text;
}
