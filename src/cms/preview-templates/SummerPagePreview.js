import React from "react";
import PropTypes from "prop-types";
import { SummerPageTemplate } from "../../templates/summer-page";

const SummerPagePreview = ({ entry, widgetFor }) => {
  const tags = entry.getIn(["data", "tags"]);
  const files = entry.getIn(["data", "files"]);
  return (
    <SummerPageTemplate
      content={widgetFor("body")}
      description={entry.getIn(["data", "description"])}
      files={files && files.toJS()}
      tags={tags && tags.toJS()}
      title={entry.getIn(["data", "title"])}
    />
  );
};

SummerPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default SummerPagePreview;
