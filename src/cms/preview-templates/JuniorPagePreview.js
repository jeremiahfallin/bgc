import React from "react";
import PropTypes from "prop-types";
import { JuniorPageTemplate } from "../../templates/junior-page";

const JuniorPagePreview = ({ entry, widgetFor }) => {
  const files = entry.getIn(["data", "files"]);
  return (
    <JuniorPageTemplate
      content={widgetFor("body")}
      files={files && files.toJS()}
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
