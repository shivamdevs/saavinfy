// import Lucide from "@/components/lucide";
// import RoundButton from "@/components/tokens/button";
// import usePlayer from "@/contexts/player";
// import { usePlayerNavigation, usePlayerState } from "@/contexts/player/hooks";
// import { cn } from "@/lib/utils";
// import React from "react";

// export default function NextPlayPausePrevious() {
//     const player = usePlayer();
//     const [playing, ended] = usePlayerState();
//     const states = usePlayerNavigation();

//     const Icon = ended
//         ? Lucide.RotateCcw
//         : playing
//           ? Lucide.Pause
//           : Lucide.Play;

//     const LoopIcon = player.options.loop === 1 ? Lucide.Repeat1 : Lucide.Repeat;

//     return (
//         <>
//             <RoundButton
//                 size={35}
//                 className="rounded-full p-2 transition-all"
//                 disabled={player.queue.length < 2}
//                 onClick={() => player.shuffleQueue()}
//             >
//                 <Lucide.Shuffle />
//             </RoundButton>
//             <RoundButton
//                 size={45}
//                 className="rounded-full p-2 transition-all"
//                 disabled={!states.hasPrevious}
//                 onClick={() => states.previous()}
//             >
//                 <Lucide.SkipBack />
//             </RoundButton>
//             <RoundButton
//                 size={55}
//                 className="rounded-full p-2 transition-all"
//                 onClick={() => states.toggle()}
//             >
//                 <Icon fill={!ended ? "currentColor" : "none"} />
//             </RoundButton>
//             <RoundButton
//                 size={45}
//                 className="rounded-full p-2 transition-all"
//                 disabled={!states.hasNext}
//                 onClick={() => states.next()}
//             >
//                 <Lucide.SkipForward />
//             </RoundButton>
//             <RoundButton
//                 size={35}
//                 className={cn("rounded-full p-2 transition-all", {
//                     "text-primary": player.options.loop !== 0,
//                 })}
//                 onClick={() => {
//                     player.updateOptions({
//                         loop:
//                             player.options.loop === 0
//                                 ? 2
//                                 : player.options.loop === 2
//                                   ? 1
//                                   : 0,
//                     });
//                 }}
//             >
//                 <LoopIcon />
//             </RoundButton>
//         </>
//     );
// }
