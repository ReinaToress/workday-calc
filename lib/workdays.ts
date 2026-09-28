import { formatInputDate, formatLongDate } from "@/lib/dates";

export type CalculationResult = {
  modeLabel: string;
  primaryValue: string;
  summary: string;
  details: Array<{
    label: string;
    value: string;
  }>;
};

export function countWorkdays(start: Date, end: Date) {
  let count = 0;
  const current = new Date(start);

  while (current <= end) {
    const day = current.getDay();

    if (day !== 0 && day !== 6) {
      count++;
    }

    current.setDate(current.getDate() + 1);
  }

  return count;
}

export function addWorkdays(start: Date, days: number) {
  const current = new Date(start);
  let remaining = days;

  while (remaining > 0) {
    current.setDate(current.getDate() + 1);

    if (isWorkday(current)) {
      remaining--;
    }
  }

  return current;
}

export function isWorkday(date: Date) {
  const day = date.getDay();
  return day !== 0 && day !== 6;
}

export function buildCountResult(
  start: Date,
  end: Date,
  workdayCount: number,
): CalculationResult {
  const calendarDays = daysBetweenInclusive(start, end);

  return {
    modeLabel: "Business days",
    primaryValue: String(workdayCount),
    summary: `${workdayCount} workdays between ${formatLongDate(start)} and ${formatLongDate(end)}.`,
    details: [
      {
        label: "Start",
        value: formatInputDate(start),
      },
      {
        label: "End",
        value: formatInputDate(end),
      },
      {
        label: "Calendar days",
        value: String(calendarDays),
      },
      {
        label: "Weekend days",
        value: String(calendarDays - workdayCount),
      },
    ],
  };
}

export function buildAddResult(
  start: Date,
  days: number,
  deadline: Date,
): CalculationResult {
  return {
    modeLabel: "Deadline",
    primaryValue: formatInputDate(deadline),
    summary: `${days} working days from ${formatLongDate(start)} lands on ${formatLongDate(deadline)}.`,
    details: [
      {
        label: "Start",
        value: formatInputDate(start),
      },
      {
        label: "Workdays added",
        value: String(days),
      },
      {
        label: "Deadline",
        value: formatLongDate(deadline),
      },
      {
        label: "Weekend rule",
        value: "Skip Sat/Sun",
      },
    ],
  };
}

function daysBetweenInclusive(start: Date, end: Date) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const startTime = stripTime(start).getTime();
  const endTime = stripTime(end).getTime();

  return Math.floor((endTime - startTime) / millisecondsPerDay) + 1;
}

function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
