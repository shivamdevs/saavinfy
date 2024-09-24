import * as Users from "./users";
import * as Playlists from "./playlists";
import * as PlaylistSongs from "./playlist-songs";
import * as History from "./history";

const Schema = {
    $raw: {
        ...Users,
        ...Playlists,
        ...PlaylistSongs,
        ...History,
    },
    User: Users.Users,
    Playlist: Playlists.Playlists,
    PlaylistSong: PlaylistSongs.PlaylistSongs,
    History: History.History,
};

export default Schema;
