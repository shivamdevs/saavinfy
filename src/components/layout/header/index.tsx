import React from "react";
import Search from "./search";

function MainHeader() {
    return (
        <header className="w-full h-16 absolute inset-0 bottom-auto bg-black/20 px-4 py-2 backdrop-blur z-20">
            <Search />
        </header>
    );
}

export default MainHeader;
