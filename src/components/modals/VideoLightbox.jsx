import Modal from "react-bootstrap/Modal";

export default function VideoLightbox({ show, onHide, videoUrl }) {
  // Only set the iframe src when modal is open (autoplay + prevents background loading)
  const iframeSrc = show ? videoUrl : "";

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      size="lg"
      className="video-lightbox-modal"
      dialogClassName="video-lightbox-dialog"
      contentClassName="video-lightbox-content"
    >
      <Modal.Body style={{ padding: 0 }}>
        <button className="video-lightbox-close" onClick={onHide} aria-label="Close video">
          ✕
        </button>
        <div className="video-lightbox-wrapper">
          {iframeSrc && (
            <iframe
              src={iframeSrc}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title="TokScript Demo Video"
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
