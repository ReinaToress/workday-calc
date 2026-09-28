type DatePickerProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export default function DatePicker({
  id,
  label,
  value,
  onChange,
}: DatePickerProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        className="dateInput"
        id={id}
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
