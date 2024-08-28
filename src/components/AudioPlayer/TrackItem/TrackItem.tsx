import { Fragment } from "react";
import Badge from "react-bootstrap/Badge";

export default function TrackItem({ current, track, onStart }: any) {
  return (
    <Fragment>
      {current !== track.Key.split(".m3u8")[0] ? (
        <Fragment>
          <li
            className="tracklist-item"
            data-id={track.id}
            data-name={track.Key.split(".m3u8")[0]}
            data-duration={track.Duration}
            onClick={onStart}
          >
            <div className="tracklist-item-inner">
              {track.id}. {track.Title}
              <div style={{ gap: 8, display: "flex" }}>
                <Badge bg="light" text="dark">
                  {track.Release}
                </Badge>
                <Badge bg="light" text="dark">
                  {track.Bpm}
                </Badge>
              </div>
            </div>
          </li>
        </Fragment>
      ) : (
        <Fragment>
          <li
            className="tracklist-item"
            data-id={track.index}
            data-name={track.Key.split(".m3u8")[0]}
            data-duration={track.Duration}
          >
            <div className="tracklist-item-inner">
              {track.id}. {track.Title}
              <div style={{ gap: 8, display: "flex" }}>
                <Badge bg="light" text="dark">
                  {track.Release}
                </Badge>
                <Badge bg="light" text="dark">
                  {track.Bpm}
                </Badge>
              </div>
            </div>
          </li>
        </Fragment>
      )}
    </Fragment>
  );
}
