import React from "react";
import PropTypes from "prop-types";
import { AtHomePageTemplate } from "../../templates/at-home-page";

const AtHomePagePreview = ({ entry, widgetFor }) => {
  return (
    <AtHomePageTemplate
      title={entry.getIn(["data", "title"])}
      heading={entry.getIn(["data", "heading"])}
      content={widgetFor("body")}
      intro={entry.getIn(["data"]).toJS().intro || {}}
    />
  );
};

AtHomePagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default AtHomePagePreview;
