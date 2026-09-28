import type { CalculationResult } from "@/lib/workdays";

type WorkdayResultProps = {
  result: CalculationResult;
};

export default function WorkdayResult({ result }: WorkdayResultProps) {
  return (
    <article className="resultCard">
      <span className="resultBadge">{result.modeLabel}</span>
      <div className="resultValue">{result.primaryValue}</div>
      <p className="resultLabel">{result.summary}</p>
      <div className="detailList" aria-label="Calculation details">
        {result.details.map((detail) => (
          <div className="detailItem" key={detail.label}>
            <span>{detail.label}</span>
            <strong>{detail.value}</strong>
          </div>
        ))}
      </div>
    </article>
  );
}
