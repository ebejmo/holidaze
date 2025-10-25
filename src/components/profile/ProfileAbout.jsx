import BannerImage from './BannerImage';
import ProfileInfo from './ProfileInfo';

export default function ProfileAbout({ profile, isOwnProfile }) {
  const bannerUrl =
    profile?.banner?.url ||
    'https://placehold.co/1000x200/cccccc/ffffff?text=Banner';
  const bannerAlt = profile?.banner?.alt || 'Profile banner';

  return (
    <section aria-label="Profile banner" className="position-relative mb-4">
      <BannerImage bannerUrl={bannerUrl} bannerAlt={bannerAlt} />
      <ProfileInfo profile={profile} isOwnProfile={isOwnProfile} />
    </section>
  );
}
