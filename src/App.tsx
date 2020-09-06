import React, { useState, useEffect, useCallback } from 'react';
import Select from 'react-select';
import flags from './data/flag-emojis';
import timezones, { TimeZone } from './data/global-timezones';
import { TimePicker } from '@blueprintjs/datetime';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { getOffsetInteger } from './utils';
import {
  HOUR_FORMAT,
} from './constants';
import groupBy from 'lodash/groupBy';
import { Dictionary } from 'lodash';

dayjs.extend(utc);

interface TimeZoneOption {
  value: TimeZone['Time Zone'];
  label: TimeZone['Time Zone'];
  offset: TimeZone['GMT Offset'];
  name: TimeZone['Country Name'];
  code: TimeZone['Country Code'];
}

const timezonesOptions = timezones.map((timezone) => ({
  value: timezone['Time Zone'],
  label: timezone['Time Zone'],
  offset: timezone['GMT Offset'],
  name: timezone['Country Name'],
  code: timezone['Country Code'],
}));

function App() {
  const [date, setDate] = useState(new Date());
  const [timezones, setTimezones] = useState<Array<TimeZoneOption>>([]);
  const [timezonesGroups, setTimezonesGroups] = useState<Dictionary<TimeZoneOption[]>>({});

  useEffect(() => {
    const newTimezonesGroups = groupBy(timezones, 'offset');
    setTimezonesGroups(newTimezonesGroups);
  }, [timezones]);

  const onSelectChange = useCallback((value) => setTimezones(value), []);

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
        <Select<TimeZoneOption> options={timezonesOptions} onChange={onSelectChange} isMulti />
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
