import React, { useState } from "react";
import PropTypes from "prop-types";
import YoutubeCarousel from "./YoutubeCarousel";

const Videos = ({ videos, setVideo, activeVideo }) => {
  return (
    <div className="container">
      <div className="columns">
        <div
          className="column"
          style={{
            position: "relative",
            paddingBottom: "56.25%" /* 16:9 */,
            paddingTop: 25,
            height: 0,
          }}
        >
          <iframe
            title={activeVideo.text}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            frameBorder="0"
            src={`https://youtube.com/embed/${activeVideo.id}`}
            allowFullScreen
          />
        </div>
      </div>
      {videos.length > 1 && (
        <YoutubeCarousel videos={videos} setVideo={setVideo} />
      )}
    </div>
  );
};

Videos.propTypes = {
  videos: PropTypes.array,
  setVideo: PropTypes.func,
  activeVideo: PropTypes.object,
};

export default Videos;
