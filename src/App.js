import React, { useState } from 'react';
import flags from './flag-emojis.json';
import { TimePicker } from '@blueprintjs/datetime';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getOffsetInteger } from './utils';
import {
  COUNTRY_NAME,
  COUNTRY_CODE,
  HOUR_FORMAT,
  GMT_OFFSET,
} from './constants';
import groupBy from 'lodash/groupBy';

dayjs.extend(utc);

function App() {
  const [date, setDate] = useState(new Date());

  const target = [
    {
      'Country Code': 'MX',
      'Country Name': 'Mexico',
      'Time Zone': 'America/Bahia_Banderas',
      'GMT Offset': 'UTC -05:00',
    },
    {
      'Country Code': 'CO',
      'Country Name': 'Colombia',
      'Time Zone': 'America/Bogota',
      'GMT Offset': 'UTC -05:00',
    },
    {
      'Country Code': 'UY',
      'Country Name': 'Uruguay',
      'Time Zone': 'America/Montevideo',
      'GMT Offset': 'UTC -03:00',
    },
    {
      'Country Code': 'AR',
      'Country Name': 'Argentina',
      'Time Zone': 'America/Argentina/Salta',
      'GMT Offset': 'UTC -03:00',
    },
    {
      'Country Code': 'VE',
      'Country Name': 'Venezuela',
      'Time Zone': 'America/Caracas',
      'GMT Offset': 'UTC -04:00',
    },
    {
      'Country Code': 'ES',
      'Country Name': 'Spain',
      'Time Zone': 'Europe/Madrid',
      'GMT Offset': 'UTC +02:00',
    },
  ];
  const groups = groupBy(target, GMT_OFFSET);
  return (
    <>
      <main className="container">
        <div className="column">
          <h1 className="bp3-heading">streamzone</h1>
          <TimePicker
            value={date}
            onChange={setDate}
            showArrowButtons
            useAmPm
          />
        </div>
        <div className="column">
          {Object.keys(groups).map((group, index) => {
            const offset = getOffsetInteger(group);
            return (
              <div key={index}>
                {groups[group].map((item, index) => {
                  const name = item[COUNTRY_CODE];
                  const { emoji } = flags[name];
                  return (
                    <span
                      key={index}
                      aria-label={item[COUNTRY_NAME]}
                      role="img"
                      className="emoji"
                    >
                      {emoji}
                    </span>
                  );
                })}
                {dayjs(date).utcOffset(offset).format(HOUR_FORMAT)}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
