const getUniqueSiteList = (uniqueTrackersList = {}) => {
  const uniqueSiteList = {};

  Object.values(uniqueTrackersList)
    .sort((a, b) => new Date(b.EventTime) - new Date(a.EventTime))
    .forEach((tracker) => {
      const { SiteId, Message, SiteLatitude, SiteLongitude } = tracker;

      const alreadyStoredSiteData = uniqueSiteList[SiteId];
      if (alreadyStoredSiteData) {
        uniqueSiteList[SiteId] = {
          name: SiteId,
          location: { lat: SiteLatitude, lng: SiteLongitude },
          type: 'site',
          isTrackerOutOfSite: alreadyStoredSiteData.isTrackerOutOfSite || Message === 'Theft',
        };
      } else {
        uniqueSiteList[SiteId] = {
          name: SiteId,
          location: { lat: SiteLatitude, lng: SiteLongitude },
          type: 'site',
          isTrackerOutOfSite: Message === 'Theft',
        };
      }
    });
  return Object.values(uniqueSiteList);
};

export default getUniqueSiteList;
