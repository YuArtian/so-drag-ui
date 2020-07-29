import TYPES from '../constants/webGL2DComponentType.json';
import Button from './components/Button';

export function getComponentClassByType(type: string) {
  switch (type) {
    case TYPES.BUTTON: {
      return Button;
    }
    default:
      return null;
  }
}
