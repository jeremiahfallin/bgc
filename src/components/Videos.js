import React, { useState } from "react";
import PropTypes from "prop-types";

const Videos = ({ videos, setVideo, activeVideo }) => {
  const [active, setActive] = useState(false);

  return (
    <div classNameNameName="container">
      {videos.length > 1 && (
        <div
          className={`dropdown ${active ? "is-active" : ""}`}
          style={{ marginBottom: "20px" }}
        >
          <div className="dropdown-trigger">
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={(e) => setActive((a) => !a)}
            >
              <div style={{ display: "grid", gridTemplate: "1 / 1" }}>
                {videos.map((video) => {
                  return (
                    <span
                      style={{
                        gridArea: "1 / 1",
                        opacity: `${
                          video.text === activeVideo.text ? "100" : "0"
                        }`,
                      }}
                    >
                      {video.text}
                    </span>
                  );
                })}
              </div>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true" />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {videos.map((video) => {
                return (
                  <div
                    className="dropdown-item"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => {
                      setVideo({ text: video.text, video: video.video });
                      setActive(false);
                    }}
                  >
                    {video.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <div classNameNameName="columns">
        <div
          classNameNameName="column"
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
    </div>
  );
};

Videos.propTypes = {
  videos: PropTypes.array,
  setVideo: PropTypes.func,
  activeVideo: PropTypes.object,
};

export default Videos;
