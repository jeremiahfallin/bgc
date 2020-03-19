import React from "react";
import PropTypes from "prop-types";
import { FormsPageTemplate } from "../../templates/forms-page";

const FormsPagePreview = ({ entry, widgetFor }) => {
  const files = entry.getIn(["data", "filesList"]);

  return (
    <FormsPageTemplate
      content={widgetFor("body")}
      filesList={files && files.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

FormsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default FormsPagePreview;
