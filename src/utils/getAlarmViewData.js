const getAlarmViewData = (uniqueTrackersList = {}) => {
  const alarmsList = [];
  let tempSiteData = null;
  let prevSiteId = null;
  Object.values(uniqueTrackersList)
    .sort((a, b) => new Date(b.EventTime) - new Date(a.EventTime))
    .forEach((tracker, index) => {
      const { TrackerId, SiteId, Message, EventTime } = tracker;
      if (index === 0) {
        prevSiteId = SiteId;
        tempSiteData = {};
        tempSiteData[SiteId] = [];
      }
      if (SiteId === prevSiteId) {
        tempSiteData[SiteId].push({
          TrackerId,
          SiteId,
          Message,
          EventTime,
        });
      } else {
        alarmsList.push(tempSiteData);
        tempSiteData = {};
        tempSiteData[SiteId] = [];
        tempSiteData[SiteId].push({
          TrackerId,
          SiteId,
          Message,
          EventTime,
        });
      }
      prevSiteId = SiteId;
    });
  if (tempSiteData && prevSiteId) {
    alarmsList.push(tempSiteData);
  }

  console.log({ alarmsList, uniqueTrackersList });
  return { alarmsList };
};

export default getAlarmViewData;
