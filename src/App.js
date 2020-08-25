import React from 'react';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(localizedFormat);

function App() {
  const current = dayjs().tz('America/El_Salvador').format('LLL');
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
      'Country Name': 'Venezuela, Bolivarian Republic of',
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
  return (
    <>
      <h1>streamzone</h1>
      <div>
        <h2>Current: {current}</h2>
      </div>
      <div>
        <h2>Target:</h2>
        {target.map((item, index) => {
          const offset = -3;
          return (
            <div key={index}>
              <h3>
                {item['Country Name']}:{' '}
                {dayjs(current).utcOffset(offset).format('LLL')}
              </h3>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
