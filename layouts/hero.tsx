import Button from '../components/button';
import { ExerciceSet } from '../models/exerciceSet';

export default function Hero({ exerciceSet }: { exerciceSet: ExerciceSet }) {
  const title = exerciceSet?.name?.charAt(0).toUpperCase() + exerciceSet?.name?.slice(1)
  return (
    exerciceSet
      ? <div className='hero__container'>
          <div className='hero' style={{ backgroundImage: `url(${exerciceSet.image})`}}></div>
          <div className='hero__content'>
            <h1 className='hero__title'>{title}</h1>
            <p className='hero__description'>{exerciceSet.description}</p>
            <Button
              onClick={`/exercice-sets/${exerciceSet.id}`}
              className='hero__button'
            >
              Try now
            </Button>
          </div>
        </div>
      : <div className='hero hero--loading skeleton'>Loading...</div>
  );
}