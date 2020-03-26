import React from "react";
import PropTypes from "prop-types";
import { SummerPageTemplate } from "../../templates/summer-page";

const SummerPagePreview = ({ entry, widgetFor }) => {
  const files = entry.getIn(["data", "filesList"]);
  return (
    <SummerPageTemplate
      content={widgetFor("body")}
      filesList={files && files.toJS()}
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
