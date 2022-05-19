export default function Select({
  entries,
  onSelect,
  className,
}: {
  entries: string[];
  onSelect: (entry: string) => void;
  className?: string;
}) {
  return (
    <select className={'select' + (className ? ` ${className}` : '')} onChange={(e) => onSelect(e.target.value)}>
      {entries.map((entry, index) =>
        <option key={index} value={entry} className='select__option'>{entry}</option>)}
    </select>
  )
}