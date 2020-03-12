import React from "react";
import PropTypes from "prop-types";
import { InvolvementPageTemplate } from "../../templates/involvement-page";

const InvolvementPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  return (
    <InvolvementPageTemplate
      title={data.title}
      content={widgetFor("body")}
      image={data.image}
      heading={data.heading}
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
