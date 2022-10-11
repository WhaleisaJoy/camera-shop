import { FooterNavSettings } from '../../database';
import FooterNavItem from '../footer-nav-item/footer-nav-item';

function FooterNavList(): JSX.Element {
  return (
    <ul className="footer__nav">
      {
        FooterNavSettings.map((settings) => (
          <FooterNavItem
            key={settings.Name}
            settings={settings}
          />
        ))
      }
    </ul>
  );
}

export default FooterNavList;


