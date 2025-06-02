import React, { Component } from "react";
import {
  Grid,
  Typography,
  Card,
  IconButton,
  LinearProgress,
} from "@material-ui/core";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipNextIcon from "@material-ui/icons/SkipNext";


/**
 * Музичний плеєр, який показує інформацію про поточну пісню та дозволяє керувати відтворенням.
 *
 * @component
 * @param {Object} props
 * @param {string} props.title - Назва пісні
 * @param {string} props.artist - Ім'я виконавця
 * @param {string} props.image_url - Посилання на обкладинку
 * @param {boolean} props.is_playing - Статус: грає чи пауза
 * @param {number} props.time - Поточний час відтворення (сек.)
 * @param {number} props.duration - Тривалість пісні (сек.)
 * @param {number} props.votes - Кількість голосів за пропуск
 * @param {number} props.votes_required - Необхідно голосів для пропуску
 * @example
 * <MusicPlayer
 *   title="Song"
 *   artist="Artist"
 *   image_url="cover.jpg"
 *   is_playing={true}
 *   time={60}
 *   duration={180}
 *   votes={2}
 *   votes_required={5}
 * />
 */


export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
  }
  /**
   * Відправляє запит для пропуску поточної пісні.
   */
  skipSong() {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/skip", requestOptions);
  }
  /**
   * Відправляє запит для паузи відтворення.
   */
  pauseSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/pause", requestOptions);
  }
   /**
   * Відправляє запит для відновлення відтворення.
   */

  playSong() {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/spotify/play", requestOptions);
  }


  render() {
    const songProgress = (this.props.time / this.props.duration) * 100;

    return (
      <Card>
        <Grid container alignItems="center" justifyContent="center">
          <Grid item align="center" xs={4}>
            <img src={this.props.image_url} height="100%" width="100%" />
          </Grid>
          <Grid item align="center" xs={8}>
            <Typography component="h5" variant="h5">
              {this.props.title}
            </Typography>
            <Typography color="textSecondary" variant="subtitle1">
              {this.props.artist}
            </Typography>
            <div>
              <IconButton onClick={() =>{this.props.is_playing ? this.pauseSong(): this.playSong();}}>
                {this.props.is_playing ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton onClick={() => this.skipSong()}>
                { this.props.votes} /{" "}
                {this.props.votes_required}
                <SkipNextIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <LinearProgress variant="determinate" value={songProgress} />
      </Card>
    );
  }
}