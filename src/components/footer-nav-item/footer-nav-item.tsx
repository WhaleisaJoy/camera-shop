import { Link } from 'react-router-dom';

type FooterNavItemProps = {
  settings: {
    Name: string;
    Content: {
      Name: string;
      Url: string;
    }[];
  };
};

function FooterNavItem({ settings }: FooterNavItemProps): JSX.Element {
  const { Name, Content } = settings;

  return (
    <li className="footer__nav-item">
      <p className="footer__title">{Name}</p>
      <ul className="footer__list">
        {
          Content.map(({ Name: ContentName, Url }) => (
            <li
              key={ContentName}
              className="footer__item"
            >
              <Link
                className="link"
                to={Url}
              >
                {ContentName}
              </Link>
            </li>
          ))
        }
      </ul>
    </li>
  );
}

export default FooterNavItem;


