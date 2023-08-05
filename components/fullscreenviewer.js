import ImageGallery from "react-image-gallery";
import Image from "next/image";

const FullScreenViewer = ({
  images,
  startIndex,
  visible,
  toggleFullScreenViewer,
}) => {
  return visible ? (
    <div
      className="fixed w-full h-screen left-0 top-0 bg-white"
      style={{ zIndex: "99999" }}
    >
      <div
        className="cursor-pointer absolute right-5 top-5 z-10"
        onClick={() => toggleFullScreenViewer()}
      >
        <Image
          src="/icons/close.svg"
          width={20}
          height={20}
          alt="Close Full screen viewer"
        />
      </div>
      <ImageGallery
        items={images}
        showThumbnails={false}
        showPlayButton={false}
        showBullets={false}
        startIndex={startIndex}
      />
    </div>
  ) : null;
};

export default FullScreenViewer;
