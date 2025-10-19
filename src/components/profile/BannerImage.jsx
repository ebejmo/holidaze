export default function BannerImage({ bannerUrl, bannerAlt }) {
  const bannerStyle = { backgroundImage: `url(${bannerUrl})` };

  return (
    <div
      className="profile-banner rounded-3"
      style={bannerStyle}
      role="img"
      aria-label={bannerAlt}
    />
  );
}
