export default function PreviewGrid({
  children,
  title,
  className
}: {
  children: React.ReactNode,
  title: string,
  className?: string,
}) {
  return (
    <div className={'preview-grid' + (className ? ' ' + className : '')}>
      <div className='preview-grid__header'>
        <h3 className='preview-set__title'>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      </div>
      <div className='preview-grid__content'>
        {children}
      </div>
    </div>
  );
}