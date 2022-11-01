import { Link } from 'react-router-dom';

type SocialItemProps = {
  settings: {
    Label: string;
    Url: string;
    Icon: string;
    IconWidth: number;
    IconHeight: number;
  };
};

function SocialItem({ settings }: SocialItemProps): JSX.Element {
  const { Label, Url, Icon, IconWidth, IconHeight } = settings;

  return (
    <li className="social__item" data-testid="social-item">
      <Link
        className="link"
        to={Url}
        aria-label={Label}
      >
        <svg
          width={IconWidth}
          height={IconHeight}
          aria-hidden="true"
        >
          <use xlinkHref={Icon}></use>
        </svg>
      </Link>
    </li>
  );
}

export default SocialItem;
