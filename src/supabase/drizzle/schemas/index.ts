import * as Users from "./users";
import * as Playlists from "./playlists";
import * as PlaylistSongs from "./playlist-songs";

const Schema = {
    $raw: {
        ...Users,
        ...Playlists,
        ...PlaylistSongs,
    },
    User: Users.Users,
    Playlist: Playlists.Playlists,
    PlaylistSong: PlaylistSongs.PlaylistSongs,
};

export default Schema;
