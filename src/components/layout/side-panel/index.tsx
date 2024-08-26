import React from "react";
import SidePanelNavigation from "./navigation";
import FavoritesAndPlaylists from "./favorites";

function SidePanel() {
    return (
        <aside className="layout-col w-96">
            <SidePanelNavigation />
            <FavoritesAndPlaylists />
        </aside>
    );
}

export default SidePanel;
