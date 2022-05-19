export default function Form({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <form className='form'>
      <div className='form__header'>
        <h1 className='form__title'>{title}</h1>
        {description && <p className='form__description'>{description}</p>}
      </div>
      <div className='form__content'>{children}</div>
      <div className='form__actions'>{actions}</div>
    </form>
  );
}