import React from "react";
import PropTypes from "prop-types";
import { JuniorPageTemplate } from "../../templates/junior-page";

const JuniorPagePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  const files = entry.getIn(["data", "files"]);
  return (
    <JuniorPageTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      files={files && files.toJS()}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

JuniorPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default JuniorPagePreview;
