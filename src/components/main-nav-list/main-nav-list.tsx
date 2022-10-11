import { MainNavSettings } from '../../database';
import MainNavItem from '../main-nav-item/main-nav-item';

function MainNavList(): JSX.Element {
  return (
    <ul className="main-nav__list">
      {
        MainNavSettings.map(({ Name, Url }) => (
          <MainNavItem
            key={Name}
            name={Name}
            url={Url}
          />
        ))
      }
    </ul>
  );
}

export default MainNavList;
