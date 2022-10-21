import type { Camera } from '../../types/camera';

type ProductTabsProps = {
  camera: Camera;
};

function ProductTabs({ camera }: ProductTabsProps): JSX.Element {
  const {
    vendorCode,
    category,
    type,
    level,
    description } = camera;

  const ProductFeautureSettings = [
    {
      Name: 'Артикул',
      Value: vendorCode,
    },
    {
      Name: 'Категория',
      Value: category,
    },
    {
      Name: 'Тип камеры',
      Value: type,
    },
    {
      Name: 'Уровень',
      Value: level,
    },
  ];

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button className="tabs__control" type="button">Характеристики</button>
        <button className="tabs__control is-active" type="button">Описание</button>
      </div>
      <div className="tabs__content">
        <div className="tabs__element">
          <ul className="product__tabs-list">
            {
              ProductFeautureSettings.map(({ Name, Value }) => (
                <li
                  key={Name}
                  className="item-list"
                >
                  <span className="item-list__title">{`${Name}: `}</span>
                  <p className="item-list__text">{Value}</p>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="tabs__element is-active">
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
