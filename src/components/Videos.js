import React from "react";
import PropTypes from "prop-types";

const Videos = ({ videos, setVideo, activeVideo }) => (
  <div className="container">
    <div className="columns">
      <div className="column">
        {videos &&
          videos.length > 1 &&
          videos.map(video => {
            return (
              <button
                className="button"
                key={video.video}
                onClick={e => setVideo(video)}
              >
                {video.text}
              </button>
            );
          })}
      </div>
    </div>
    <div className="columns">
      <div
        className="column"
        style={{
          position: "relative",
          paddingBottom: "56.25%" /* 16:9 */,
          paddingTop: 25,
          height: 0
        }}
      >
        <iframe
          title={activeVideo.text}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          }}
          frameBorder="0"
          src={`https://youtube.com/embed/${activeVideo.id}`}
          allowFullScreen
        />
      </div>
    </div>
  </div>
);

Videos.propTypes = {
  videos: PropTypes.array,
  setVideo: PropTypes.func,
  activeVideo: PropTypes.object
};

export default Videos;
