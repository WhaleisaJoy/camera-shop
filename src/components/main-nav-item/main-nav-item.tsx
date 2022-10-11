import { Link } from 'react-router-dom';

type MainNavItemProps = {
  name: string;
  url: string;
};

function MainNavItem({ name, url }: MainNavItemProps): JSX.Element {
  return (
    <li className="main-nav__item">
      <Link
        className="main-nav__link"
        to={url}
      >
        {name}
      </Link>
    </li>
  );
}

export default MainNavItem;
