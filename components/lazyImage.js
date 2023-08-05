import React from "react";
import PropTypes from "prop-types";
import LazyLoad from "react-lazyload";

const LazyImage = ({ src, alt }) => {
  const refPlaceholder = React.useRef();

  const removePlaceholder = () => {
    console.log("Replacing the image with lazy loading!");
    refPlaceholder.current.remove();
  };

  return (
    <div className="relative w-full h-full">
      <div
        className="relative block overflow-hidden"
        style={{ paddingTop: "67.85741285714286%" }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full" ref={refPlaceholder}>
        <img
          src="/images/tech_page_brain_nets_1.jpg"
          className="absolute top-0 left-0 object-cover w-full h-full"
          alt="test"
        />
      </div>
      <LazyLoad>
        <div className="absolute top-0 left-0 w-full h-full">
          <img
            className="absolute top-0 left-0 object-cover w-full h-full"
            onLoad={removePlaceholder}
            onError={removePlaceholder}
            src={src}
            alt={alt}
          />
        </div>
      </LazyLoad>
    </div>
  );
};

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

LazyImage.defaultProps = {
  src: "",
  alt: "",
};

export default LazyImage;
