import {
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUser,
  FaUsers,
  FaWifi,
  FaUtensils,
  FaParking,
  FaPaw,
  FaCalendarAlt,
  FaSearch,
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
  FaHome,
} from 'react-icons/fa';

const icons = {
  back: FaArrowLeft,
  plus: FaPlus,
  minus: FaMinus,
  location: FaMapMarkerAlt,
  money: FaDollarSign,
  user: FaUser,
  users: FaUsers,
  wifi: FaWifi,
  breakfast: FaUtensils,
  parking: FaParking,
  pets: FaPaw,
  calendar: FaCalendarAlt,
  search: FaSearch,
  close: FaTimes,
  warning: FaExclamationTriangle,
  info: FaInfoCircle,
  home: FaHome,
};

export default function Icon({ name, size = 'md', className = '', ...props }) {
  const IconComponent = icons[name];
  if (!IconComponent) return null;

  let sizePx;
  switch (size) {
    case 'sm':
      sizePx = 12;
      break;
    case 'lg':
      sizePx = 18;
      break;
    default:
      sizePx = 16;
  }

  return <IconComponent size={sizePx} className={className} {...props} />;
}
