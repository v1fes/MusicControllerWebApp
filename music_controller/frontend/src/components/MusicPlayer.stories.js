import React from "react";
import MusicPlayer from "./MusicPlayer";

export default {
  title: "MusicPlayer",
  component: MusicPlayer,
};

const defaultProps = {
  title: "Song Title",
  artist: "Artist Name",
  image_url: "https://via.placeholder.com/150",
  is_playing: false,
  time: 45,
  duration: 180,
  votes: 1,
  votes_required: 3,
};

export const Paused = () => <MusicPlayer {...defaultProps} is_playing={false} />;
export const Playing = () => <MusicPlayer {...defaultProps} is_playing={true} />;
export const NearVoteSkip = () => (
  <MusicPlayer
    {...defaultProps}
    votes={2}
    votes_required={3}
    title="Almost Skipped Song"
  />
);
