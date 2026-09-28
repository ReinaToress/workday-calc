"use client";

import { useMemo, useState } from "react";
import DatePicker from "@/components/DatePicker";
import WorkdayResult from "@/components/WorkdayResult";
import { addDays, formatLongDate, todayInputValue } from "@/lib/dates";
import {
  addWorkdays,
  buildAddResult,
  buildCountResult,
  countWorkdays,
  type CalculationResult,
} from "@/lib/workdays";

type Mode = "count" | "add";

export default function CalculatorForm() {
  const today = useMemo(() => todayInputValue(), []);
  const [mode, setMode] = useState<Mode>("count");
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(todayInputValue(addDays(new Date(), 14)));
  const [workdayAmount, setWorkdayAmount] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CalculationResult>(() => {
    const start = new Date(`${today}T00:00:00`);
    const end = addDays(start, 14);
    return buildCountResult(start, end, countWorkdays(start, end));
  });

  function calculate() {
    setError(null);

    const start = parseDate(startDate);
    const end = parseDate(endDate);

    if (!start) {
      setError("Choose a valid start date.");
      return;
    }

    if (mode === "count") {
      if (!end) {
        setError("Choose a valid end date.");
        return;
      }

      if (end < start) {
        setError("End date must be on or after the start date.");
        return;
      }

      setResult(buildCountResult(start, end, countWorkdays(start, end)));
      return;
    }

    if (!Number.isInteger(workdayAmount) || workdayAmount < 0) {
      setError("Working days must be a whole number of 0 or more.");
      return;
    }

    const deadline = addWorkdays(start, workdayAmount);
    setResult(buildAddResult(start, workdayAmount, deadline));
  }

  return (
    <section className="calculator" id="calculator">
      <div className="formPane">
        <p className="eyebrow">Workspace</p>
        <h2>Plan the date math</h2>
        <p className="introText">
          Weekends are skipped automatically. This prototype does not include
          public holidays yet.
        </p>

        <div className="modeGrid" aria-label="Calculation mode">
          <button
            className={`modeButton${mode === "count" ? " isActive" : ""}`}
            type="button"
            onClick={() => setMode("count")}
          >
            Count workdays
          </button>
          <button
            className={`modeButton${mode === "add" ? " isActive" : ""}`}
            type="button"
            onClick={() => setMode("add")}
          >
            Add workdays
          </button>
        </div>

        <div className="fieldGrid">
          <DatePicker
            id="start-date"
            label="Start date"
            value={startDate}
            onChange={setStartDate}
          />
          {mode === "count" ? (
            <DatePicker
              id="end-date"
              label="End date"
              value={endDate}
              onChange={setEndDate}
            />
          ) : (
            <div className="field">
              <label htmlFor="workday-amount">Working days</label>
              <input
                className="numberInput"
                id="workday-amount"
                min={0}
                step={1}
                type="number"
                value={workdayAmount}
                onChange={(event) =>
                  setWorkdayAmount(Number(event.target.value))
                }
              />
            </div>
          )}
        </div>

        <p className="helperText">
          {mode === "count"
            ? "Counts weekdays inclusively, including the start and end dates when they land Monday through Friday."
            : `Adds working days from ${formatLongDate(parseDate(startDate) ?? new Date())}, skipping Saturdays and Sundays.`}
        </p>

        <button className="primaryButton" type="button" onClick={calculate}>
          Calculate workdays
        </button>

        {error ? <p className="error">{error}</p> : null}
      </div>

      <div className="resultPane">
        <WorkdayResult result={result} />
      </div>
    </section>
  );
}

function parseDate(value: string) {
  if (!value) {
    return null;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}
