import React from "react";
import PropTypes from "prop-types";
import { BoardPageTemplate } from "../../templates/board-page";

const BoardPagePreview = ({ entry, widgetFor }) => {
  return (
    <BoardPageTemplate
      image={entry.getIn(["data", "image"])}
      title={entry.getIn(["data", "title"])}
      heading={entry.getIn(["data", "heading"])}
      content={widgetFor("body")}
      intro={entry.getIn(["data"]).toJS().intro || {}}
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
