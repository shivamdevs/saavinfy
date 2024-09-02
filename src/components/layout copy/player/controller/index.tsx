import React from "react";
import NextPlayPausePrevious from "./next-play-pause-previous";
import VolumeQueueFullscreen from "./volume-queue-fullscreen";

function Controller() {
    return (
        <>
            <div className="flex gap-4 justify-center items-center">
                <NextPlayPausePrevious />
            </div>
            <div className="flex gap-4 justify-end items-center">
                <VolumeQueueFullscreen />
            </div>
        </>
    );
}

export default Controller;
