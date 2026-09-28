import CalculatorForm from "@/components/CalculatorForm";

export default function Home() {
  return (
    <main className="pageShell">
      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Calculator • Productivity • Dates</p>
          <h1>Workday Calc</h1>
          <p className="lede">
            Figure out workdays without counting the calendar manually.
          </p>
          <p className="sublede">
            Calculate business days between dates, add working days to a date,
            and estimate simple deadlines.
          </p>
          <a className="heroAction" href="#calculator">
            Calculate workdays -&gt;
          </a>
        </div>
        <aside className="statusPanel" aria-label="Project status">
          <img
            className="heroLogo"
            src="/workday-calc-logo.png"
            alt="Workday Calc logo"
          />
          <span>Status</span>
          <strong>Prototype</strong>
          <p>Weekdays are counted Monday through Friday.</p>
        </aside>
      </section>

      <CalculatorForm />
    </main>
  );
}
