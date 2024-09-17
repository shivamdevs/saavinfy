import BlockBrand from "@/components/blocks/brand";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

export default function Layout({ children }: React.PropsWithChildren) {
    return (
        <ScrollArea className="fixed inset-0 h-screen bg-gradient-to-b from-background to-primary/10">
            <section className="min-h-screen flex flex-col p-5 gap-5">
                <header className="flex">
                    <div className="flex-1 max-w-[23rem]">
                        <BlockBrand />
                    </div>
                </header>
                <section className="flex-1 flex justify-center items-center">
                    <Card className="w-full max-w-[756px] bg-card/40 backdrop-blur">
                        <div className="max-w-[512px] mx-auto">{children}</div>
                    </Card>
                </section>
            </section>
        </ScrollArea>
    );
}
