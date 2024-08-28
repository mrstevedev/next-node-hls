import { Fragment } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import { onProgress } from "@/util/index";

export default function Track({
  progressRef,
  counter,
  elapsed,
  duration,
  onSeek,
}: any) {
  return (
    <Fragment>
      <div
        className="progress-container"
        style={{ fontWeight: 100, fontSize: 11 }}
        onClick={onSeek}
      >
        <ProgressBar
          variant="info"
          ref={progressRef}
          color="#9cd1ee"
          now={onProgress(counter, duration)}
          style={{ cursor: "pointer", height: "4px", margin: "0.5rem 0" }}
          id="progress-bar"
        />
        <div
          style={{
            height: "14px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div id="elapsed">{elapsed}</div>
          <div id="duration">{duration}</div>
        </div>
      </div>
    </Fragment>
  );
}
