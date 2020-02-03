import React from "react";
import PropTypes from "prop-types";
import { SportsPostTemplate } from "../../templates/sports-post";

const SportsPostPreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  const files = entry.getIn(["data", "files"]);
  console.log(files);
  return (
    <SportsPostTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      files={files && files.toJS()}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
      intro={entry.getIn(["data"]).toJS().intro || {}}
    />
  );
};

SportsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default SportsPostPreview;
