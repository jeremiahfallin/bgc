import React from "react";
import PropTypes from "prop-types";
import { FormsPageTemplate } from "../../templates/forms-page";

const FormsPagePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  const files = entry.getIn(["data", "files"]);
  return (
    <FormsPageTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      filesList={files && files.toJS()}
      tags={tags && tags.toJS()}
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
