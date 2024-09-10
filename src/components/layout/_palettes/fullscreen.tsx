// "use client";

// import useColors from "@/contexts/hooks/use-colors";
// import usePlayer from "@/contexts/player";
// import Image from "next/image";
// import React from "react";
// import { Heading, Text } from "../tokens/typography";
// import Entity from "../tokens/entity";
// import { cn } from "@/lib/utils";
// import { getSongArtists } from "../tokens/list";
// import { MediaSong } from "@/types/media";

// function FullscreenView({ children }: React.PropsWithChildren) {
//     const player = usePlayer();

//     const { currentSong } = player;
//     const currentIndex = player.queue.findIndex(
//         (song) => song.id === currentSong?.id
//     );

//     const previousSong =
//         currentIndex > 0 ? player.queue.at(currentIndex - 1) : null;
//     const nextSong =
//         currentIndex < player.queue.length - 1
//             ? player.queue.at(currentIndex + 1)
//             : null;

//     const colors = useColors(currentSong?.image);

//     if (!player.fullScreen) return children;

//     return (
//         <div
//             className={cn("flex-1 grid grid-cols-3", {
//                 "text-white": colors?.isDark,
//                 "text-black": !colors?.isDark,
//             })}
//         >
//             <div
//                 className="fixed inset-0 -z-10"
//                 style={{
//                     backgroundColor: colors?.background,
//                 }}
//             />
//             <SongInfo song={previousSong} />
//             <SongInfo song={currentSong} current />
//             <SongInfo song={nextSong} />
//         </div>
//     );
// }

// export default FullscreenView;

// export type SongInfoProps = {
//     song?: MediaSong | null;
//     current?: boolean;
// };

// function SongInfo({ song, current }: SongInfoProps) {
//     const player = usePlayer();

//     return (
//         <div className="relative flex-1 flex-center flex-col">
//             {song && (
//                 <>
//                     <Image
//                         src={song?.image.at(-1)?.url!}
//                         alt={song?.title ?? song?.name ?? ""}
//                         width={500}
//                         height={500}
//                         className={cn("rounded-lg shadow-2xl transition-all", {
//                             "cursor-pointer scale-75 opacity-5 blur-sm hover:scale-100 hover:opacity-100 hover:blur-none":
//                                 !current,
//                         })}
//                         onClick={() => {
//                             if (current) return;

//                             // play song

//                             player.play(song);
//                         }}
//                     />
//                     {current && (
//                         <div className="h-28 -mb-28 text-center">
//                             <Heading
//                                 level={1}
//                                 className="mt-4 text-4xl line-clamp-1 font-bold"
//                             >
//                                 <Entity
//                                     html={song?.title ?? song?.name ?? ""}
//                                 />
//                             </Heading>

//                             <Text className="text-lg font-medium mt-4 text-current opacity-75 line-clamp-1">
//                                 {getSongArtists(
//                                     song?.artists?.primary,
//                                     song?.description
//                                 )}
//                             </Text>
//                         </div>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// }
