import { ListCard, ListComingSoonCard, ListSkeleton } from "./ListCard";
import { APICalendarEvent } from "@lib/types/calendar";

interface ListViewProps {
  isLoading: boolean;
  isError: boolean;
  data: APICalendarEvent[];
  selectedMonth: any;
  selectedYear: any;
  filters: {
    [key: string]: boolean;
  };
  noneSelected: boolean;
}

export function ListView(props: ListViewProps) {
  const {
    isLoading,
    isError,
    data,
    selectedMonth,
    selectedYear,
    filters,
    noneSelected,
  } = props;

  return (
    <>
      {!isError && (
        <>
          {!isLoading && !noneSelected && (
            <ul>
              {data
                .filter(
                  (event) =>
                    new Date(event.startDate).getMonth() === selectedMonth
                )
                .filter(
                  (event) =>
                    new Date(event.startDate).getFullYear() === selectedYear
                )
                .filter(({ eventType }) => filters[eventType])
                .map((event) => (
                  <ListCard
                    key={event.id}
                    event={event}
                    handleClick={() => {}}
                  />
                ))}

              {/* TODO: refactor. Here we drop in a placeholder to cover when no future events have been published. */}
              {data
                .filter(
                  (event) =>
                    new Date(event.startDate).getMonth() === selectedMonth
                )
                .filter(
                  (event) =>
                    new Date(event.startDate).getFullYear() === selectedYear
                ).length === 0 && <ListComingSoonCard />}
            </ul>
          )}

          {isLoading && (
            <ul>
              {[...new Array(1)].map((_, i) => (
                <ListSkeleton key={i} />
              ))}
            </ul>
          )}

          {!isLoading && noneSelected && (
            <div className="relative block border-2 bg-slate-50 opacity-80 border-slate-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              <i className="fas fa-th-list fa-4x text-slate-700"></i>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Select a filter <i className="fas fa-filter"></i> to see
                tournaments
              </span>
            </div>
          )}
        </>
      )}

      {isError && (
        <div className="relative block border-2 bg-slate-50 opacity-80 border-pink-500 border-dashed rounded-lg p-12 text-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          <i className="fas fa-exclamation-circle fa-4x text-pink-700"></i>
          <span className="mt-2 block text-sm font-medium text-pink-900">
            Error loading calendar-data
          </span>
        </div>
      )}
    </>
  );
}
