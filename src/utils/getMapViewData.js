const getMapViewData = (uniqueTrackersList = {}, userSelectedSite = null) => {
  let markers = [];
  let userSelectedSitePosition = {};
  if (userSelectedSite === null) {
    const uniqueSiteList = {};
    Object.values(uniqueTrackersList).forEach((tracker) => {
      const { SiteId, SiteLatitude, SiteLongitude } = tracker;
      uniqueSiteList[SiteId] = {
        key: SiteId,
        name: SiteId,
        location: { lat: Number(SiteLatitude), lng: Number(SiteLongitude) },
        type: 'site',
      };
    });
    markers = null;
    markers = Object.values(uniqueSiteList);
  } else {
    const trackersMarker = [];
    let siteMarker;
    let isSiteMarkerLoaded = false;
    Object.entries(uniqueTrackersList).forEach(([id, tracker]) => {
      if (id.includes(userSelectedSite)) {
        const {
          TrackerId,
          SiteId,
          Message,
          SiteLatitude,
          SiteLongitude,
          EventTime,
          GpsLatitude,
          GpsLongitude,
        } = tracker;
        // const outOfSite = Message === 'Theft';
        // const powerOff = Message === 'PowerOff';
        // const vibration = Message === 'Vibration';
        trackersMarker.push({
          key: `${TrackerId}::${Message}`,
          name: TrackerId,
          location: {
            lat: Number(GpsLatitude),
            lng: Number(GpsLongitude),
          },
          type: 'tracker',
          Message,
        });

        if (!isSiteMarkerLoaded) {
          siteMarker = {
            key: SiteId,
            name: SiteId,
            location: { lat: Number(SiteLatitude), lng: Number(SiteLongitude) },
            type: 'site',
          };
          isSiteMarkerLoaded = true;
        }
      }
    });
    markers = null;
    markers = [siteMarker, ...trackersMarker];
    userSelectedSitePosition = siteMarker.location;
  }
  console.log({ markers });
  return { markers, userSelectedSitePosition };
};

export default getMapViewData;
