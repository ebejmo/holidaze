import { useNavigate } from 'react-router-dom';
import Icon from '../ui/Icon';

export default function VenueGallery({ media = [], title }) {
  const navigate = useNavigate();

  const imageUrl =
    media && media.length > 0
      ? media[0].url
      : 'https://dummyimage.com/1200x675/eee/aaa&text=No+image';
  const imageAlt =
    media && media.length > 0 ? media[0].alt || title : `${title} image`;

  return (
    <div className="position-relative mb-4">
      <button
        type="button"
        className="btn btn-light position-absolute top-0 start-0 m-3 rounded-circle shadow-sm"
        aria-label="Go back"
        onClick={() => navigate(-1)}
      >
        <Icon name="back" size="sm" />
      </button>

      <img
        src={imageUrl}
        alt={imageAlt}
        className="img-fluid w-100 rounded-1"
      />
    </div>
  );
}
