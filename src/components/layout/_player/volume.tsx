// import React from "react";
// import InputRange from "./input";
// import { usePlayerVolume } from "@/contexts/player/hooks";
// import usePlayer from "@/contexts/player";

// function VolumeSeeker() {
//     const player = usePlayer();
//     const [volume, setVolume, muted] = usePlayerVolume();

//     return (
//         <div className="range-box volume-range">
//             <InputRange
//                 max={1}
//                 divisor={10}
//                 disabled={muted}
//                 value={volume}
//                 onChange={(vol: number) => {
//                     const volume = Number(vol.toFixed(1));
//                     player.element!.volume = volume;
//                     setVolume(volume);
//                 }}
//             />
//         </div>
//     );
// }

// export default VolumeSeeker;
