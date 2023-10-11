"use client"
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker, DateRange } from "react-date-range";


export default function Datepicker({ state, dateCallback }:
    {
        state: any,
        dateCallback: (data: any) => void
    }
) {


    return (
        <div>
            <div className="hidden md:block">
        <DateRangePicker
          onChange={dateCallback}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
        />
      </div>
      <div className="md:hidden">
        <DateRange
          onChange={dateCallback}
          moveRangeOnFirstSelection={false}
          months={1}
          ranges={state}
          direction="horizontal"
        />
      </div>
        </div>
    )
}
