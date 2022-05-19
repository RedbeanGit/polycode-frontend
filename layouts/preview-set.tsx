import { useEffect, useState } from 'react';
import Button, { ButtonAction } from '../components/button';
import ArrowRight from '../shapes/arrowright';

export default function PreviewSet({
  children,
  title,
  showAction,
}: {
  children: React.ReactNode,
  title: string,
  showAction: ButtonAction,
}) {
  return (
    <div className="preview-set">
      <div className='preview-set__header'>
        <h3 className='preview-set__title'>{ title }</h3>
        <Button onClick={showAction} icon={<ArrowRight className='button__icon' />} borderless>
          Show more
        </Button>
      </div>
      <div className='preview-set__content'>
        {children}
      </div>
    </div>
  );
}
