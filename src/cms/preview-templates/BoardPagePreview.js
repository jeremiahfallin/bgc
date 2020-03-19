import React from "react";
import PropTypes from "prop-types";
import { BoardPageTemplate } from "../../templates/board-page";

const BoardPagePreview = ({ entry, widgetFor }) => {
  const files = entry.getIn(["data", "filesList"]);

  return (
    <BoardPageTemplate
      title={entry.getIn(["data", "title"])}
      filesList={files && files.toJS()}
    />
  );
};

BoardPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default BoardPagePreview;
