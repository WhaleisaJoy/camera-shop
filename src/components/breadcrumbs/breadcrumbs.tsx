import { Link } from 'react-router-dom';
import { Breadcrumb } from '../../types/navigation';

type BreadcrumbsProps = {
  settings: Breadcrumb[];
};

function Breadcrumbs({ settings }: BreadcrumbsProps): JSX.Element {
  return (
    <div className="breadcrumbs">
      <div className="container">
        <ul className="breadcrumbs__list">
          {
            settings.map(({ Name, Route }, index) => {
              const isNotLast = index < settings.length - 1;

              return (
                <li key={Name} className="breadcrumbs__item">
                  {
                    isNotLast
                      ? Route && (
                        <Link className="breadcrumbs__link" to={Route}>
                          {Name}
                          <svg width="5" height="8" aria-hidden="true">
                            <use xlinkHref="#icon-arrow-mini"></use>
                          </svg>
                        </Link>
                      )
                      : (
                        <span className="breadcrumbs__link breadcrumbs__link--active">
                          {Name}
                        </span>
                      )
                  }
                </li>
              );
            })
          }
        </ul>
      </div>
    </div >
  );
}

export default Breadcrumbs;
