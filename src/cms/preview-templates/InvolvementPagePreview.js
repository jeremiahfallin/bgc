import React from "react";
import PropTypes from "prop-types";
import { InvolvementPageTemplate } from "../../templates/involvement-page";

const InvolvementPagePreview = ({ entry, widgetFor }) => {
  console.log(entry);
  return (
    <InvolvementPageTemplate
      title={entry.getIn(["data", "title"])}
      content={widgetFor("body")}
    />
  );
};

InvolvementPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default InvolvementPagePreview;
