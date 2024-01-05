/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import getMessageFromStatus from '../utils/getMessageListFromStatus';
import { checkIsOldAlarmEvent, removeUserSiteIfNoAlarm } from './helpers';

const initialState = {
  isReconnectLoading: true,
  userSelectedSite: null,
  alarmSites: [],
  uniqueSitesList: {},
  uniqueTrackersList: {},
  trackerTimerList: {},
};

const alarmsSlice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    setReconnectLoading: (state) => {
      state.isReconnectLoading = false;
    },
    addAlarmSites: (state, { payload }) => {
      state.alarmSites.push(...payload);
      payload.forEach((tracker) => {
        const {
          serialNumber: TrackerId,
          SiteName: SiteId,
          // Message,
          SiteLatitude,
          SiteLongitude,
          EventTime,
          GpsLatitude,
          GpsLongitude,
          OutOfSite: Theft,
          PowerOFF,
          Vibration,
        } = tracker;
        const siteTrackerID = `${SiteId}::${TrackerId}`;
        const isOldAlarm = checkIsOldAlarmEvent(state, siteTrackerID, EventTime);
        // If collection event time < incoming alarm event time, then its old and we skip process it
        if (isOldAlarm) {
          return;
        }
        const statusList = {
          Theft,
          PowerOFF,
          Vibration,
        };
        Object.entries(statusList).forEach((status) => {
          const [Message, value] = status;
          const siteTrackerMsgID = `${SiteId}::${TrackerId}::${Message}`;
          const isSiteAlreadyExists = !!state.uniqueTrackersList[siteTrackerMsgID];
          if (value === 1) {
            /* Add/replace alarm to maintain unique tracker and its co-ordinates  */
            state.uniqueTrackersList[siteTrackerMsgID] = {
              TrackerId,
              SiteId,
              Message,
              SiteLatitude,
              SiteLongitude,
              EventTime,
              GpsLatitude,
              GpsLongitude,
            };
          } else if (value === 0 && isSiteAlreadyExists) {
            delete state.uniqueTrackersList[siteTrackerMsgID];
          }
        });
        removeUserSiteIfNoAlarm(state, SiteId);
        // const Message = getMessageFromStatus(OutOfSite, PowerOFF, Vibration);
        // /* Fill unique tracker and its co-ordinates  */
        // if (Message) {
        //   const siteTrackerMsgID = `${SiteId}::${TrackerId}::${Message}`;
        //   state.uniqueTrackersList[siteTrackerMsgID] = {
        //     TrackerId,
        //     SiteId,
        //     Message,
        //     SiteLatitude,
        //     SiteLongitude,
        //     EventTime,
        //     GpsLatitude,
        //     GpsLongitude,
        //   };
        // }
      });
      console.log('{ uniqueTrackersList }', state.uniqueTrackersList);
    },
    setUserSelectedSite: (state, { payload }) => {
      state.userSelectedSite = payload;
    },
    clearAlarm: (state, { payload }) => {
      const { id: siteTrackerMsgID, siteId } = payload;
      delete state.uniqueTrackersList[siteTrackerMsgID];
      removeUserSiteIfNoAlarm(state, siteId);
    },
  },
});

export const { addAlarmSites, setUserSelectedSite, clearAlarm, setReconnectLoading } =
  alarmsSlice.actions;

export const getUniqueTrackersList = (state) => state.alarms.uniqueTrackersList;
export const getUserSelectedSite = (state) => state.alarms.userSelectedSite;
export const getReconnectLoading = (state) => state.alarms.isReconnectLoading;

export default alarmsSlice.reducer;
