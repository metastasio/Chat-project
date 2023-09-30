import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center py-5">
      <h2>{t('notFound')}</h2>
      <div className="d-flex flex-row justify-content-center">
        <a href="/login">{t('form.signIn.signIn')}</a>
        <p>/</p>
        <a href="/signup">{t('form.signUp.signUp')}</a>
      </div>
    </div>
  );
};

export default NotFound;
