import React from "react";
import PropTypes from "prop-types";
import { PartnersPageTemplate } from "../../templates/partners-page";

const PartnersPagePreview = ({ entry, widgetFor }) => {
  return (
    <PartnersPageTemplate
      image={entry.getIn(["data", "image"])}
      title={entry.getIn(["data", "title"])}
      heading={entry.getIn(["data", "heading"])}
      content={widgetFor("body")}
      intro={entry.getIn(["data"]).toJS().intro || {}}
    />
  );
};

PartnersPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func
};

export default PartnersPagePreview;
