import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/auth/useAuth';
import { useApi } from '../hooks/useApi';
import { ENDPOINTS } from '../config';
import Spinner from '../components/ui/Spinner';
import EmptyState from '../components/ui/EmptyState';
import VenueGallery from '../components/venueDetail/VenueGallery';
import VenueSummary from '../components/venueDetail/VenueSummary';
import VenueInfo from '../components/venueDetail/VenueInfo';
import VenueAbout from '../components/venueDetail/VenueAbout';
import VenueAmenities from '../components/venueDetail/VenueAmenities';
import VenueBookingSection from '../components/venueDetail/VenueBookingSection';

export default function VenueDetailPage() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();

  const endpoint = `${ENDPOINTS.venues}/${id}?_owner=true&_bookings=true`;
  const { data: venue, loading, error } = useApi(endpoint);

  const isOwner =
    isAuthenticated &&
    venue?.owner?.name.trim().toLowerCase() === user?.name.trim().toLowerCase();

  // const mockOwnedVenue = {
  //   id: '123',
  //   name: 'Test Venue',
  //   owner: { name: user?.name },
  //   bookings: [
  //     {
  //       id: 'b1',
  //       dateFrom: '2025-10-22T00:00:00Z',
  //       dateTo: '2025-10-25T00:00:00Z',
  //       customer: {
  //         name: 'Jane Doe',
  //         avatar: { url: 'https://i.pravatar.cc/100?img=5' },
  //       },
  //     },
  //   ],
  // };

  // const venueData = isAuthenticated ? mockOwnedVenue : venue;

  useEffect(() => {
    if (venue?.name) {
      document.title = `${venue.name} | Holidaze`;
    }
  }, [venue]);

  // useEffect(() => {
  //   if (venueData?.name) {
  //     document.title = `${venueData.name} | Holidaze`;
  //   }
  // }, [venueData]);

  // const isOwner =
  //   isAuthenticated &&
  //   venueData?.owner?.name?.trim().toLowerCase() ===
  //     user?.name?.trim().toLowerCase();

  if (loading) return <Spinner centered />;
  if (error) return <EmptyState title="Error" body={String(error)} />;
  if (!venue) return <EmptyState title="Venue not found" />;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-12 col-lg-7">
          <VenueGallery media={venue.media} title={venue.name} />
          <VenueSummary
            title={venue.name}
            rating={venue.rating}
            owner={venue.owner}
          />
          <VenueInfo
            location={venue.location}
            price={venue.price}
            maxGuests={venue.maxGuests}
          />
          <VenueAbout description={venue.description} created={venue.created} />
          <VenueAmenities meta={venue.meta} />
        </div>

        <div className="col-12 col-lg-5">
          <VenueBookingSection
            isAuthenticated={isAuthenticated}
            isOwner={isOwner}
            price={venue.price}
            maxGuests={venue.maxGuests}
            venueId={venue.id}
            existingBookings={venue.bookings}
          />
        </div>
      </div>
    </div>
  );
  //   console.log(
  //     'isOwner:',
  //     isOwner,
  //     'venue owner:',
  //     venueData.owner?.name,
  //     'user:',
  //     user?.name
  //   );
  //   return (
  //     <div className="container py-4">
  //       <VenueGallery media={venueData.media} title={venueData.name} />
  //       <VenueHeader
  //         title={venueData.name}
  //         rating={venueData.rating}
  //         owner={venueData.owner}
  //       />
  //       <VenueInfo
  //         location={venueData.location}
  //         price={venueData.price}
  //         maxGuests={venueData.maxGuests}
  //       />
  //       <VenueAbout
  //         description={venueData.description}
  //         created={venueData.created}
  //       />
  //       <VenueAmenities meta={venueData.meta} />
  //       <VenueBookingSection
  //         isAuthenticated={isAuthenticated}
  //         isOwner={isOwner}
  //         price={venueData.price}
  //         maxGuests={venueData.maxGuests}
  //         venueId={venueData.id}
  //         existingBookings={venueData.bookings}
  //       />
  //     </div>
  //   );
}
