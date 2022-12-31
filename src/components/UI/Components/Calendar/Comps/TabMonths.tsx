import moment from "moment";
import { classNames } from "../utils/Classes";
import { useState } from "react";

interface TabMonthsProps {
  selectedMonth: number;
  selectedYear: number;
  months: Array<number>;
  setSelectedMonth: Function;
  setSelectedYear: Function;
}

export default function TabMonths({
  selectedMonth,
  months,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
}: TabMonthsProps) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const [year, setYear] = useState(currentYear);
  const [satMonth, setMonth] = useState(currentMonth);
  const nextYear = currentYear + 1;
  const lastYear = currentYear - 1;

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value;

    setYear(parseInt(year));
  };
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;

    setMonth(parseInt(month));
  };

  return (
    <div className="inline-flex shadow-md rounded-md m-auto -ml-1">
      <div className="relative z-0 inline-flex rounded-md">
        <select
          className="CalendarDropdown rounded-l-md border-gray-300 bg-white text-gray-900 text-xs py-3 mt-[.15rem] focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          defaultValue={currentYear}
          onChange={handleYearChange}
        >
          <option value={lastYear}>{lastYear}</option>
          <option value={currentYear}>{currentYear}</option>
          <option value={nextYear}>{nextYear}</option>
        </select>
        <select
          className="CalendarDropdown rounded-r-md border-gray-300 bg-white text-gray-900 text-xs py-3 mt-[.15rem] focus:outline-none focus:ring-pink-500 focus:border-pink-500"
          defaultValue={currentMonth}
          onChange={handleMonthChange}
        >
          {months.map((month, index) => {
            return (
              <option
                key={index}
                value={index}
                onSelect={() => {
                  setSelectedMonth(satMonth);
                  setSelectedYear(year);
                }}
              >
                {moment().month(month).format("MMMM")}
              </option>
            );
          })}
        </select>

        {months.map((_, index) => {
          const isFirst = index === 0;
          const isLast = index === months.length - 1;
          const isActive = selectedMonth === months[index];

          //Add  all the months to the dropdown menu
          return (
            <button
              onClick={() => {
                setSelectedMonth(months[index]);
                setSelectedYear(year);
              }}
              key={index}
              type="button"
              className={classNames(
                `${isActive ? "text-pink-700 font-bold" : "text-slate-600"}`,
                `${isFirst ? null : "-ml-px"}`,
                `${isLast && "rounded-r-md"}`,
                `relative border inline-flex items-center px-3 py-3 mt-[.15rem] border-gray-300 bg-white text-xs  hover:bg-gray-50
                          focus:z-10 focus:outline-none`
              )}
            >
              {moment(new Date(year, months[index], 1)).format("MMM")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
