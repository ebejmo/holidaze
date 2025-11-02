import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';
import { handleImageError } from '../../utils/handleImageError';

function SingleImageDisplay({ image, title }) {
  return (
    <img
      src={image.url}
      alt={image.alt || `${title} image`}
      className="img-fluid w-100 rounded-2 venue-gallery_image"
      onError={handleImageError}
    />
  );
}

function ImageCarousel({ images, title }) {
  return (
    <div id="venueCarousel" className="carousel slide rounded-2">
      <div className="carousel-inner rounded-2 overflow-hidden">
        {images.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${index === 0 ? 'active' : ''}`}
          >
            <img
              src={item.url}
              alt={item.alt || `${title} image ${index + 1}`}
              className="d-block w-100 img-fluid venue-gallery_image"
              onError={handleImageError}
            />
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#venueCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#venueCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
export default function VenueGallery({ media = [], title }) {
  const navigate = useNavigate();

  const galleryImages =
    media && media.length > 0
      ? media
      : [
          {
            url: 'https://placehold.co/500x500?text=Holidaze',
            alt: `${title} image`,
          },
        ];

  const showCarousel = galleryImages.length > 1;

  return (
    <div className="position-relative mb-4">
      <button
        type="button"
        className="btn btn-light position-absolute top-0 start-0 m-3 rounded-circle z-3"
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        <Icon name="back" size="sm" />
      </button>

      {showCarousel ? (
        <ImageCarousel images={galleryImages} title={title} />
      ) : (
        <SingleImageDisplay image={galleryImages[0]} title={title} />
      )}
    </div>
  );
}
