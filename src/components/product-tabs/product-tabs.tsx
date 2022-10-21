import { useState } from 'react';
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

  const TABS_NAME = ['Характеристики', 'Описание'];

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

  const [activeTab, setActiveTab] = useState<string>(TABS_NAME[0]);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        {
          TABS_NAME.map((tab) => (
            <button
              key={tab}
              className={`tabs__control ${tab === activeTab ? 'is-active' : ''}`}
              type="button"
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))
        }
      </div>

      <div className="tabs__content">
        <div className={`tabs__element ${activeTab === TABS_NAME[0] ? 'is-active' : ''}`}>
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
        <div className={`tabs__element ${activeTab === TABS_NAME[1] ? 'is-active' : ''}`}>
          <div className="product__tabs-text">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
