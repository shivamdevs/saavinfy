// "use client";

// import usePlayer from "@/contexts/player";
// import React from "react";
// import TrackSeeker from "./track";
// import SongCard from "./song";
// import Controller from "./controller";
// import { cn } from "@/lib/utils";

// function FooterPlayer() {
//     const player = usePlayer();

//     if (player.queue.length === 0 || !player.current) {
//         return null;
//     }

//     return (
//         <footer
//             className={cn("layout-card py-2 px-5 flex flex-col gap-4", {
//                 "bg-black/50": player.fullScreen,
//             })}
//         >
//             <TrackSeeker />
//             <div className="grid grid-cols-3 gap-10">
//                 <SongCard />
//                 <Controller />
//             </div>
//         </footer>
//     );
// }

// export default FooterPlayer;
