const playlistExtended = Prisma.validator<Prisma.PlaylistArgs>()({
  include: { covers: true, _count: { select: { tracks: true } } },
});
type PlaylistExtended = Prisma.PlaylistGetPayload<typeof playlistExtended>;

const trackExtended = Prisma.validator<Prisma.TrackArgs>()({
  include: { author: true, playlist: { include: { covers: true }} },
});
type TrackExtended = Prisma.TrackGetPayload<typeof trackExtended>;

const userExtended = Prisma.validator<Prisma.UserArgs>()({
  include: { _count: { select: { tracks: true } } },
});
type UserExtended = Prisma.UserGetPayload<typeof userExtended>;
