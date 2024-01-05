import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

// Accept ISO date and format it
// Example 2023-01-30T23:00:00 --> 30 Jan'23
export const formatDateForDisplay = (ISOdate) => dayjs(ISOdate).utcOffset(0).format("DD MMM'YY");
