/* eslint-disable no-param-reassign */
// If all alarms removed from site, then assign userSelectedSite to null
export const removeUserSiteIfNoAlarm = (state, siteId) => {
  if (state.userSelectedSite === siteId) {
    const isAnyAlarmInSite = Object.keys(state.uniqueTrackersList).find((key) =>
      key.includes(siteId)
    );
    if (!isAnyAlarmInSite) {
      state.userSelectedSite = null;
    }
  }
};

export const checkIsOldAlarmEvent = (state, siteTrackerID, EventTime) => {
  const prevEventTime = state.trackerTimerList[siteTrackerID];
  if (prevEventTime) {
    if (new Date(prevEventTime) > new Date(EventTime)) {
      return true;
    }
  }
  state.trackerTimerList[siteTrackerID] = EventTime;
  return false;
};
