import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import flags from './data/flag-emojis.json';
import timezones from './data/global-timezones.json';
import { TimePicker } from '@blueprintjs/datetime';
import * as dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getOffsetInteger } from './utils';
import {
  COUNTRY_NAME,
  COUNTRY_CODE,
  HOUR_FORMAT,
  GMT_OFFSET,
  TIME_ZONE,
} from './constants';
import groupBy from 'lodash/groupBy';

dayjs.extend(utc);

const timezonesOptions = timezones.map((timezone) => ({
  value: timezone[TIME_ZONE],
  label: timezone[TIME_ZONE],
  offset: timezone[GMT_OFFSET],
  name: timezone[COUNTRY_NAME],
  code: timezone[COUNTRY_CODE],
}));

function App() {
  const [date, setDate] = useState(new Date());
  const [timezones, setTimezones] = useState([]);
  const [timezonesGroups, setTimezonesGroups] = useState({});

  useEffect(() => {
    const newTimezonesGroups = groupBy(timezones, 'offset');
    setTimezonesGroups(newTimezonesGroups);
  }, [timezones]);

  return (
    <div className="wrapper">
      <aside className="sidebar">
        <h1 className="bp3-heading">
          <span aria-label="flag" role="img">
            🚩
          </span>{' '}
          streamzone
        </h1>
        <p>Get your time for different places.</p>
        <hr />
        <p>Select your time:</p>
        <TimePicker value={date} onChange={setDate} useAmPm />
        <p>Select other places:</p>
        <Select options={timezonesOptions} onChange={setTimezones} isMulti />
      </aside>
      <article className="content">
        {Object.keys(timezonesGroups).map((group, index) => {
          const offset = getOffsetInteger(group);
          return (
            <div key={index}>
              {timezonesGroups[group].map(({ code, name }, index) => {
                const { emoji } = flags[code];
                return (
                  <span
                    key={index}
                    aria-label={name}
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
      </article>
    </div>
  );
}

export default App;
