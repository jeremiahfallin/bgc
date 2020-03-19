import React from "react";
import PropTypes from "prop-types";
import { ProgramsPageTemplate } from "../../templates/programs-page";

const ProgramsPagePreview = ({ entry, widgetFor }) => (
  <ProgramsPageTemplate
    title={entry.getIn(["data", "title"])}
    heading={entry.getIn(["data", "heading"])}
    image={entry.getIn(["data", "image"])}
    content={widgetFor("body")}
  />
);

ProgramsPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default ProgramsPagePreview;
