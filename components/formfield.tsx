export default function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className='form-field'>
      <label className='form-field__label'>{label}</label>
      <div className='form-field__input'>{children}</div>
    </div>
  );
}