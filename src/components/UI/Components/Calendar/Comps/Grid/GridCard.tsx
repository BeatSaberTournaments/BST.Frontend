import { getMonth, prettyDate } from "../../utils/DateFormatting";
import { APICalendarEvent } from "@lib/types/calendar";
import { classNames } from "../../utils/Classes";
import {
  CalendarDaysIcon,
  ClockIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

interface GridCardProps {
  event: APICalendarEvent;
  handleClick: Function;
}

export function GridCard(props: GridCardProps) {
  const { event, handleClick } = props;

  return (
    <>
      <style>
        {`
.animate-pulse {
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

`}
      </style>
      <div
        key="PropCard"
        className="relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl bg-white border-b border-l border-r border-gray-200"
      >
        {event.isLive && !event.complete && (
          <div
            className={classNames(
              "animate-pulse absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
            )}
          >
            <p className="LiveTag">LIVE</p>
          </div>
        )}
        {event.cancelled && (
          <div
            className={classNames(
              "bg-red-400 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
            )}
          >
            <p className="CancelledTag">Cancelled</p>
          </div>
        )}
        {event.complete && (
          <div
            className={classNames(
              "bg-green-300 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"
            )}
          >
            <p className="EndedTag">Ended</p>
          </div>
        )}
        <header>
          <h3 className="text-slate-900 font-extrabold text-2xl tracking-tight my-1">
            {event.name}
          </h3>
        </header>
        <div className="text-gray-600 flex-grow mb-5">
          <div className="mb-2">
            <p className="sm:inline mr-1 text-sm text-slate-700">
              <CalendarDaysIcon className="h-[16px]" />
              <span className="inline">
                {prettyDate(event.startDate, event.endDate)}
              </span>{" "}
            </p>
            <p className="sm:inline text-sm text-slate-700">
              <ClockIcon className="h-[16px]" />
              <span className="inline">{event.time}</span>{" "}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl">
          <div className="text-center align-middle">
            <div className="text-x text-slate-700 hover:underline cursor-pointer">
              <a
                className="inline-flex items-center text-slate-700 "
                onClick={() => handleClick(`${event.url}/${event.id}`)}
              >
                More Info
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export function GridComingSoonCard() {
  return (
    <li className="relative bg-white z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-light-blue-300">
      <div className="bg-teal-500 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"></div>
      <header>
        <h3 className="h4 font-red-hat-display mb-1 text-center text-gray-900">
          No events right now!
        </h3>
      </header>
      <div className="text-gray-600 flex-grow mb-5">
        <p className="text-gray-900 text-base text-center">
          Be on the lookout for more events coming soon!
        </p>
      </div>
      <div className="absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"></div>
    </li>
  );
}

export function GridSkeleton() {
  return (
    <li className="animate-pulse bg-white relative z-0 pt-6 pl-6 pb-4 pr-4 shadow-2xl flex flex-col rounded-xl border-b border-l border-r border-light-blue-300">
      <div className="bg-gray-400 absolute top-0 inset-x-0 px-4 py-1 sm:px-6 border-t text-xs rounded-t-xl"></div>
      <header className="mb-2">
        <div className="h4 bg-gray-300 font-red-hat-display mb-1 text-center h-14 rounded-md"></div>
      </header>
      <div className="text-gray-600 flex-grow mb-3">
        <p className="text-gray-900 bg-gray-300 text-base text-center w-full h-4 mb-2 rounded-md"></p>
        <p className="text-gray-900 bg-gray-300 text-base text-center w-full h-4 mb-2 rounded-md"></p>
      </div>
      <div className="absolute bottom-0 bg-gray-100 inset-x-0 px-4 py-1 sm:px-6 border-b text-xs rounded-b-xl"></div>
    </li>
  );
}
