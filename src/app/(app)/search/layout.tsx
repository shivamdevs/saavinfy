import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
    return <div className="p-5">{children}</div>;
}
