"use client";
import { ListGroup } from "react-bootstrap";
import TrackItem from "@/components/AudioPlayer/TrackItem/TrackItem";

export default function TrackList({ current, tracks, onStart }: any) {
  return (
    <div className="tracklist" style={{ margin: "1rem 0", width: "100%" }}>
      <h1 style={{ fontSize: 11, textTransform: "uppercase" }}>TrackList</h1>
      <ListGroup
        as="ol"
        style={{
          fontWeight: 100,
          lineHeight: 2.5,
          height: "199px",
          overflowY: "auto",
          margin: "0 0 0 -1rem",
        }}
      >
        {tracks.map((item: { id: number }) => {
          return (
            <TrackItem
              key={item.id}
              current={current}
              track={item}
              onStart={onStart}
            />
          );
        })}
      </ListGroup>
    </div>
  );
}
