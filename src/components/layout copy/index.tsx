import React from "react";
import SidePanel from "./side-panel";
import FooterPlayer from "./player";
import Palettes from "./palettes";
import FullscreenView from "./fullscreen";

export type AppLayoutProps = React.PropsWithChildren;

function AppLayout({ children }: AppLayoutProps) {
    return (
        <section className="fixed inset-0 p-2 layout-col" id="fullscreen">
            <FullscreenView>
                <section className="layout-row flex-1">
                    <SidePanel />
                    <section className="layout-card relative flex-[3]">
                        <main className="absolute inset-0 w-full h-full overflow-auto">
                            {children}
                        </main>
                    </section>
                    <Palettes />
                </section>
            </FullscreenView>
            <FooterPlayer />
        </section>
    );
}

export default AppLayout;
