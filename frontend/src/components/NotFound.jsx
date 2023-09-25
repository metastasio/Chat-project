import { newInstance } from './services/locales';

const NotFound = () => <h1>{newInstance.t('notFound')}</h1>;
export default NotFound;
