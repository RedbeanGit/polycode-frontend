import NavBar, { NavLocation } from '../components/navbar';
import Title from '../components/title';

export default function Header({ location }: { location?: NavLocation }) {
  return (
    <header className={'header' + (!location ? ' header--navless' : '')}>
      <Title />
      {location && <NavBar location={location} />}
    </header>
  )
}