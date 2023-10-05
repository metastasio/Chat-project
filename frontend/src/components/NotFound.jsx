import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import routes from '../services/routes';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-5">
      <h2>{t('notFound')}</h2>
      <div className="d-flex flex-row justify-content-center">
        <Link to={routes.logInPage()}>{t('form.signIn.signIn')}</Link>
        <p>/</p>
        <Link to={routes.signUpPage()}>{t('form.signUp.signUp')}</Link>
      </div>
    </div>
  );
};

export default NotFound;
