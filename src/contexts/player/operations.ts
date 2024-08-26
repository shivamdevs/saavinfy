import crypt from "@/lib/crypt";
import { MediaArtistSongs, MediaPlaylist, MediaSong } from "@/types/media";
import { setCookie } from "cookies-next";
import React from "react";
import { ContextType } from "./context";
import { PlayerCache, PlayerCachePush, PlayerOptions } from "@/types/opts";
import { shuffleArray } from "@/lib/utils";
import { serverCall } from "@/lib/call";
import { Endpoints } from "@/config/endpoints";
import { SearchArtistFilters } from "@/types/search";
import { usePathname } from "next/navigation";

function useOps(data: PlayerCache) {
    const pathname = usePathname();

    const [options, setOptions] = React.useState<PlayerOptions>(() => {
        const opts = data.options ?? {};

        console.log(data);

        return {
            loop: opts.loop ?? 0,
            muted: opts.muted ?? false,
            panel: opts.panel ?? undefined,
        };
    });

    const [current, setCurrent] = React.useState<string | null>(() => {
        if (!data.queue.length) return null;

        if (data.current) {
            if (data.queue.some((song) => song.id === data.current)) {
                return data.current;
            }
        }

        return data.queue[0].id;
    });

    const [queue, setQueue] = React.useState<Array<MediaSong>>(data.queue);

    const element = React.useRef<HTMLAudioElement>();

    const [currentTime, setCurrentTime] = React.useState(data.time ?? 0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(data.volume ?? 1);

    const [playing, setPlaying] = React.useState(false);
    const [ended, setEnded] = React.useState(false);

    const [fullScreen, setFullScreen] = React.useState(false);

    // Update the player options
    const updateOptions = React.useCallback(
        (opts: Partial<PlayerOptions>) => {
            setOptions((prev) => ({
                ...prev,
                ...opts,
            }));
        },
        [options]
    );

    // Initialize the audio element
    React.useEffect(() => {
        const audio = new Audio();

        audio.preload = "metadata";

        const song = current ? getSong(current) : null;

        if (options.muted) {
            audio.muted = true;
        }

        audio.volume = volume;

        if (song) {
            audio.src = song.downloadUrl.at(-1)?.url!;
            audio.onloadeddata = () => {
                audio.currentTime =
                    Math.floor(currentTime) === Math.floor(song.duration)
                        ? 0
                        : currentTime;
            };

            audio.load();
        }

        const play = () => {
            setPlaying(true);
            setEnded(false);
        };
        const pause = () => setPlaying(false);
        const timeupdate = () => {
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
            setEnded(audio.ended);
        };

        audio.addEventListener("play", play);
        audio.addEventListener("pause", pause);
        audio.addEventListener("timeupdate", timeupdate);
        audio.addEventListener("canplay", timeupdate);
        audio.addEventListener("loadeddata", timeupdate);
        audio.addEventListener("ended", timeupdate);

        element.current = audio;

        return () => {
            audio.removeEventListener("play", play);
            audio.removeEventListener("pause", pause);
            audio.removeEventListener("timeupdate", timeupdate);
            audio.removeEventListener("canplay", timeupdate);
            audio.removeEventListener("loadeddata", timeupdate);
            audio.removeEventListener("ended", timeupdate);
        };
    }, []);

    // Update the cookies whenever the player state changes
    const updateStorage = React.useCallback(() => {
        const data = {
            queue: Array.from(queue).map((song) => song.id),
            current: current,
            time: currentTime,
            volume: volume,
            options,
        } as PlayerCachePush;

        setCookie("aPqL", crypt.encrypt(data), {
            maxAge: 60 * 60 * 24 * 365 * 100,
        });
    }, [current, currentTime, queue, volume, options]);

    // Update the cookies whenever the player state changes
    React.useEffect(() => {
        updateStorage();
    }, [current, currentTime, queue, volume, options]);

    // Update the current entry in the queue
    const updateCurrent = React.useCallback(async (song: MediaSong) => {
        const audio = element.current!;
        setCurrent(song.id);
        setDuration(0);
        audio.pause();
        audio.currentTime = 0;
        audio.src = song.downloadUrl.at(-1)?.url!;

        return new Promise<void>((resolve) => {
            audio.onloadeddata = () => {
                audio.currentTime = 0;
                resolve();
            };
            audio.load();
        });
    }, []);

    // Shuffle the queue
    const shuffleQueue = React.useCallback(() => {
        setQueue((prev) => {
            const q = shuffleArray(prev);

            const currentIndex = q.findIndex((song) => song.id === current);

            if (currentIndex !== -1) {
                const currentSong = q[currentIndex];
                q.splice(currentIndex, 1);
                q.unshift(currentSong);
            }

            return q;
        });
    }, [current, queue]);

    // Trigger the play function
    const play = React.useCallback(
        async (song?: MediaSong) => {
            if (song) {
                if (!queue.some((s) => s.id === song.id)) {
                    setQueue([song]);
                }

                await updateCurrent(song);
            }
            if (element.current?.ended) {
                element.current.currentTime = 0;
            }

            element.current?.play();
        },
        [current, queue]
    );

    // Trigger the pause function
    const pause = React.useCallback(() => {
        element.current?.pause();
    }, []);

    // Toggle the play/pause state
    const toggle = React.useCallback(() => {
        if (playing) {
            pause();
        } else {
            play();
        }
    }, [playing]);

    // Add a song to the queue
    const addSong = React.useCallback(
        async (
            song: MediaSong,
            start: boolean = false,
            clear: boolean = false
        ) => {
            let q = Array.from(queue);
            if (clear) {
                q = [];
            }

            if (!q.some((s) => s.id === song.id)) {
                q.push(song);
            }

            setQueue(q);

            if (!current) {
                await updateCurrent(song);
            }

            if (start) {
                play(song);
            }
        },
        [current, queue]
    );

    // Add multiple songs to the queue
    const addSongs = React.useCallback(
        async (
            songs: MediaSong[],
            start: boolean = false,
            clear: boolean = false
        ) => {
            let q = Array.from(queue);

            if (clear) {
                q = [];
            }

            for (const song of songs) {
                if (!q.some((s) => s.id === song.id)) {
                    q.push(song);
                }
            }

            setQueue(q);

            if (!current) {
                await updateCurrent(songs[0]);
            }

            if (start) {
                play(songs[0]);
            }
        },
        [current, queue]
    );

    // Check if a song is in the queue
    const hasSong = React.useCallback(
        (song: MediaSong | string) => {
            return queue.some(
                (s) => s.id === (typeof song === "string" ? song : song.id)
            );
        },
        [queue]
    );

    // Get a song from the queue
    const getSong = React.useCallback(
        (song: MediaSong | string) => {
            return queue.find(
                (s) => s.id === (typeof song === "string" ? song : song.id)
            );
        },
        [queue]
    );

    // Remove a song from the queue
    const removeSong = React.useCallback(
        (song: MediaSong | string) => {
            setQueue((prev) =>
                prev.filter(
                    (s) => s.id !== (typeof song === "string" ? song : song.id)
                )
            );
        },
        [queue]
    );

    // Check if a song is currently playing
    const playingSong = React.useCallback(
        (song?: MediaSong | string) => {
            if (!song) return false;

            return current === (typeof song === "string" ? song : song.id);
        },
        [current]
    );

    // Whenever the song ends, play the next song based on the loop options
    React.useEffect(() => {
        if (ended) {
            const currentIndex = queue.findIndex(
                (track) => track.id === current
            );
            if (options.loop === 1) {
                play();
            } else if (options.loop === 2) {
                if (currentIndex < queue.length - 1) {
                    play(queue[currentIndex + 1]);
                } else {
                    play(queue[0]);
                }
            } else {
                if (currentIndex < queue.length - 1) {
                    play(queue[currentIndex + 1]);
                }
            }
        }
    }, [ended, options.loop]);

    React.useEffect(() => {
        console.log(
            "Currently playing",
            queue.find((s) => s.id === current)
        );
    }, [current]);

    React.useEffect(() => {
        console.log("Options updated", options);
    }, [options]);

    React.useEffect(() => {
        if (fullScreen) {
            const element = document.getElementById("fullscreen");
            if (element) {
                element.requestFullscreen();
            }
        } else {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        }
    }, [fullScreen]);

    // if user exits fullscreen, set the fullScreen state to false
    React.useEffect(() => {
        document.onfullscreenchange = () => {
            if (!document.fullscreenElement) {
                setFullScreen(false);
            }
        };
    }, []);

    // if pathname changes, set the fullScreen state to false
    React.useEffect(() => {
        setFullScreen(false);
    }, [pathname]);

    return {
        element: element.current,

        current,
        currentSong: getSong(current ?? ""),
        updateCurrent,

        queue,
        shuffleQueue,

        play,
        pause,
        toggle,

        addSong,
        getSong,
        hasSong,
        addSongs,
        removeSong,
        playingSong,

        ended,
        playing,

        duration,
        currentTime,
        setCurrentTime,

        volume,
        setVolume,

        options,
        updateOptions,

        fullScreen,
        setFullScreen,
    } as ContextType;
}

export default useOps;
