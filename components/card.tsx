export default function Card({
  image,
  title,
  description,
  onClick,
  isFake=false,
  children,
}: {
  image: string,
  title: string,
  description?: string,
  onClick?: () => void,
  isFake?: boolean,
  children?: React.ReactNode,
}) {
  const fakeClass = isFake ? ' skeleton' : '';
  return (
    <div className={'card' + (!onClick ? ' card--disabled' : '')} onClick={onClick}>
      <img src={image} alt={title} className={'card__image' + fakeClass} />
      <div className='card__content'>
        <h2 className={'card__title' + fakeClass}>{title.charAt(0).toUpperCase() + title.slice(1)}</h2>
        {description && <p className={'card__description' + fakeClass}>{description}</p>}
        {children}
      </div>
    </div>
  );
}
