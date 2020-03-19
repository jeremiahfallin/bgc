import React from "react";
import PropTypes from "prop-types";
import { AboutPageTemplate } from "../../templates/about-page";
import showdown from "showdown";

const AboutPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  const converter = new showdown.Converter();

  return (
    <AboutPageTemplate
      image={data.image}
      title={data.title}
      heading={data.heading}
      board={converter.makeHtml(data.board)}
      staff={converter.makeHtml(data.staff)}
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
