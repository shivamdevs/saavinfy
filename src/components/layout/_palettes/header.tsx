// import React from "react";
// import RoundButton from "@/components/tokens/button";
// import { Heading } from "@/components/tokens/typography";
// import { usePlayerOptions } from "@/contexts/player/hooks";
// import { cn } from "@/lib/utils";
// import Lucide from "@/components/lucide";

// export type PalettesHeaderProps = React.HTMLAttributes<HTMLDivElement>;
// export default function PalettesHeader({
//     className,
//     children,
//     ...props
// }: PalettesHeaderProps) {
//     const { update: updateOptions } = usePlayerOptions();

//     return (
//         <header
//             className={cn(
//                 "w-full px-4 py-2 z-20 flex justify-between items-center gap-4",
//                 className
//             )}
//             {...props}
//         >
//             <Heading level={2} className="text-xl font-semibold line-clamp-1">
//                 {children}
//             </Heading>
//             <RoundButton
//                 className="p-2 bg-card text-foreground"
//                 size={35}
//                 onClick={() =>
//                     updateOptions({
//                         panel: undefined,
//                     })
//                 }
//             >
//                 <Lucide.X />
//             </RoundButton>
//         </header>
//     );
// }
