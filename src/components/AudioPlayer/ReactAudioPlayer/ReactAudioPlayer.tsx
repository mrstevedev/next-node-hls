"use client";
import { MouseEvent, useRef, useState, Fragment, useEffect } from "react";
import Controls from "@/components/AudioPlayer/Controls/Controls";
import TrackBar from "@/components/AudioPlayer/TrackBar/TrackBar";
import TrackList from "@/components/AudioPlayer/TrackList/TrackList";
import SoundWave from "@/components/AudioPlayer/SoundWave/SoundWave";
import {
  convertDurationToSeconds,
  convertSecondsToMinutes,
} from "@/util/index";
import ReactPlayer from "react-player";

export default function ReactAudioPlayer({ data }) {
  const playerRef = useRef<ReactPlayer>(null);
  const progressRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState<string | null | undefined>(null);
  const [elapsed, setElapsed] = useState<string | null>("0:00");
  const [duration, setDuration] = useState<string | null | undefined>("0:00");
  const [displayWave, setDisplayWave] = useState(false);
  const [currentPlayingTracklist] = useState(data.map((data) => data.Url));
  const [counter, setCounter] = useState<number>(0);
  const [timeInterval, setTimeInterval] = useState<
    undefined | ReturnType<typeof setTimeout>
  >(undefined);
  const [audioIndex, setAudioIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [toggleVolume, setToggleVolume] = useState(false);

  const audioSrcUrl =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + `/${current}.m3u8`;

  const onPause = () => {
    setPlaying(false);
    setDisplayWave(false);
    clearInterval(timeInterval);
    const trackBtn = document.querySelector(".track-active");
    trackBtn?.classList.remove("track-active");
  };

  const onSeek = (event) => {
    const slider = document.querySelector(".progress");
    const progress = document.querySelector(".progress-bar");

    if (slider && progress) {
      progress?.setAttribute("style", "transition: " + "none");

      const progressBarWidth = parseInt(window.getComputedStyle(slider).width);

      const amountComplete =
        (event.clientX - progress?.getBoundingClientRect().left) /
        progressBarWidth;

      const getPositionClicked = Math.floor(
        (convertDurationToSeconds(duration) || 0) * amountComplete
      );

      const getConvertedToMinutes = convertSecondsToMinutes(getPositionClicked);
      setElapsed(getConvertedToMinutes);
      setCounter(convertDurationToSeconds(getConvertedToMinutes));

      document
        .querySelector(".progress-bar")
        ?.setAttribute("style", "transition: " + "linear 0.7s");

      document
        .querySelector(".progress-bar")
        ?.setAttribute("style", "width: " + getPositionClicked + "%");
      playerRef.current?.seekTo(getPositionClicked);
    }
  };

  const onPlayNext = () => {
    stopTimer();
    clearInterval(timeInterval);

    document
      .querySelector(".progress-bar")
      ?.setAttribute("style", "width: " + 0 + "%");

    document
      .querySelector(".progress-bar")
      ?.setAttribute("style", "transition: " + "none");

    setTimeout(() => {
      document
        .querySelector(".progress-bar")
        ?.setAttribute("style", "transition: " + "linear 1s");
    }, 10);

    // Autoloop
    const nextIndex = audioIndex + 1;
    if (nextIndex >= currentPlayingTracklist.length) {
      console.log("back to beg");
      const audioLink = currentPlayingTracklist[0]
        .split("/")[3]
        .split(".m3u8")[0];
      setCurrent(audioLink);
      setAudioIndex(0);
      startTimer();
      return;
    }
    setCurrent(
      currentPlayingTracklist[nextIndex].split("/")[3].split(".m3u8")[0]
    );
    setAudioIndex(nextIndex);

    const li = document.querySelectorAll(".list-group li");
    li.forEach((node) => {
      if (node.classList.contains("active")) {
        node.classList.remove("active");
      }
      const tracks = node.getAttribute("data-name");

      if (tracks === `${current}`) {
        node.classList.add("active");
      }
    });
    startTimer();
  };

  const onStart = (event: MouseEvent) => {
    document
      .querySelector(".progress-bar")
      ?.setAttribute("style", "width: " + 0 + "%");
    document
      .querySelector(".progress-bar")
      ?.setAttribute("style", "transition: " + "none");

    setTimeout(() => {
      document
        .querySelector(".progress-bar")
        ?.setAttribute("style", "transition: " + "linear 1s");
    }, 10);

    stopTimer();
    clearInterval(timeInterval);
    const active = document.querySelector(".active");
    const trackName = event?.currentTarget.getAttribute("data-name") as string;
    const itemIndex = currentPlayingTracklist.findIndex(
      (name) => name.split("/")[3].split(".m3u8")[0] === trackName
    );
    setAudioIndex(itemIndex);
    const trackDuration = event?.currentTarget.getAttribute(
      "data-duration"
    ) as string;

    setPlaying(true);
    startTimer();
    setElapsed("0:00");
    setDisplayWave(true);
    setCurrent(trackName);
    setDuration(trackDuration);

    if (active !== null) {
      active.classList.remove("active");
    }
    if (event) event.currentTarget.classList.add("active");
  };

  const onStartButton = (event: MouseEvent) => {
    startTimer();
    const track = document.querySelector(".list-group li");
    const trackLi = document.querySelector(`[data-name="${current}"]`);
    const trackName = trackLi?.getAttribute("data-name");

    if (trackName === undefined) setCurrent(track?.getAttribute("data-name"));

    const trackActive = document.querySelector(".tracklist-item.active");

    if (trackActive) {
      const trackDuration = trackActive?.getAttribute(
        "data-duration"
      ) as string;
      setDuration(trackDuration);
    }

    const trackDuration = event?.currentTarget.getAttribute(
      "data-duration"
    ) as string;

    setPlaying(true);
    setDuration(trackDuration);
    setDisplayWave(true);
  };

  const onStop = () => {
    stopTimer();
    setCurrent(null);
    const nodes = document.querySelector(".active");
    const trackBtn = document.querySelector(".track-active");
    nodes?.classList.remove("active");
    trackBtn?.classList.remove("track-active");
    setDisplayWave(false);
    setDuration("0:00");
    document
      .querySelector(".progress-bar")
      ?.setAttribute("style", "width: " + 0 + "%");
    document
      .querySelector(".progress-bar")
      ?.setAttribute("style", "transition: " + "none");
  };

  const startTimer = () => {
    setTimeInterval(
      setInterval(() => {
        setCounter((prev) => prev + 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    clearInterval(timeInterval);
    setCounter(0);
  };

  useEffect(() => {
    const nextli = document.querySelector(`[data-name="${current}"]`);
    const nextDuration = nextli?.getAttribute("data-duration");
    if (nextDuration) {
      setDuration(nextDuration);
    }
  }, [current]);

  useEffect(() => {
    if (counter === convertDurationToSeconds(duration)) {
      clearInterval(timeInterval);
    }
  }, [counter]);

  useEffect(() => {
    const li = document.querySelectorAll(".list-group li");
    li.forEach((node) => {
      if (node.classList.contains("active")) {
        node.classList.remove("active");
      }
      const tracks = node.getAttribute("data-name");
      if (tracks?.includes(`${current}`)) {
        node.classList.add("active");
      }
    });
  }, [current]);

  useEffect(() => {
    setElapsed(convertSecondsToMinutes(counter));
  }, [counter]);

  const handleMuteVolume = () => {
    setVolume(0);
    setToggleVolume((prev) => !prev);
  };
  const handleRaiseVolume = () => {
    setVolume(1);
    setToggleVolume((prev) => !prev);
  };

  return (
    <Fragment>
      <SoundWave displayWave={displayWave} />
      <Controls
        onStartButton={onStartButton}
        onPause={onPause}
        onStop={onStop}
        current={current}
        tracks={data}
        handleRaiseVolume={handleRaiseVolume}
        handleMuteVolume={handleMuteVolume}
        toggleVolume={toggleVolume}
      />

      <ReactPlayer
        width={0}
        height={0}
        volume={volume}
        ref={playerRef}
        url={current ? audioSrcUrl : ""}
        playing={playing}
        onEnded={onPlayNext}
      />

      <TrackBar
        progressRef={progressRef}
        counter={counter}
        duration={duration}
        elapsed={elapsed}
        onSeek={onSeek}
      />
      <TrackList current={current} tracks={data} onStart={onStart} />
    </Fragment>
  );
}
