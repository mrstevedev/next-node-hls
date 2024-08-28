import { Fragment } from "react";

export default function ComingSoon() {
  return (
    <Fragment>
      <p
        style={{
          fontWeight: 200,
          textTransform: "uppercase",
          fontSize: 11,
          padding: "1rem 0 0.4rem 0",
          margin: 0,
        }}
      >
        Coming Soon
      </p>
      <p
        style={{
          color: "#9CD1EE",
          fontWeight: "bolder",
          fontSize: 11,
          textTransform: "uppercase",
        }}
      >
        bbpmusiclibrary.com
      </p>
    </Fragment>
  );
}
