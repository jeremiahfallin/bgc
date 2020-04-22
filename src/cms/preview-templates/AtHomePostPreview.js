import React from "react";
import PropTypes from "prop-types";
import { AtHomePostTemplate } from "../../templates/sports-post";

const AtHomePostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  const files = entry.getIn(["data", "files"]);
  const videos = entry.getIn(["data", "videos"]);

  return (
    <AtHomePostTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      files={files && files.toJS()}
      videos={videos && videos.toJS()}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

AtHomePostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default AtHomePostPreview;
