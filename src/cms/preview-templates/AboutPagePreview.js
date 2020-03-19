import React from "react";
import PropTypes from "prop-types";
import { AboutPageTemplate } from "../../templates/about-page";

const AboutPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();

  return (
    <AboutPageTemplate
      image={data.image}
      title={data.title}
      heading={data.heading}
      board={widgetFor("board")}
      staff={widgetFor("staff")}
    />
  );
};

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  widgetFor: PropTypes.func
};

export default AboutPagePreview;
