import { SocialSettings } from '../../database';
import SocialItem from '../social-item/social-item';

function SocialList(): JSX.Element {
  return (
    <ul className="social" data-testid="social">
      {
        SocialSettings.map((settings) => (
          <SocialItem
            key={settings.Name}
            settings={settings}
          />
        ))
      }
    </ul>
  );
}

export default SocialList;
