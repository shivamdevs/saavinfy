// import { MediaSong } from "@/types/media";

// class PlayerManager {
// 	element?: HTMLAudioElement;
// 	current: string | null = null;
// 	queue: Set<MediaSong> = new Set<MediaSong>();

// 	init() {
// 		this.element = new Audio();
// 	}

// 	async addSong(
// 		song: MediaSong,
// 		{ play = false, clear = false }: { play?: boolean; clear?: boolean }
// 	) {
// 		if (clear) {
// 			this.queue.clear();
// 		}

// 		this.queue.add(song);

// 		if (clear) {
// 			await this.updateCurrent(song);
// 		}

// 		if (play) {
// 			this.play(song);
// 		}
// 	}

// 	async updateCurrent(song: MediaSong) {
// 		this.current = song.id;
// 		if (this.element) {
// 			console.log(song.downloadUrl);
// 			this.element.src = song.downloadUrl.at(-1)?.url!;
// 		}

// 		this.element?.load();
// 	}

// 	async play(song?: MediaSong) {
// 		if (song) {
// 			await this.updateCurrent(song);
// 		}
// 		this.element?.play();
// 	}

// 	async pause() {
// 		this.element?.pause();
// 	}
// }

// const player = new PlayerManager();

// export default player;
