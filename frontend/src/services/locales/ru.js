const translation = {
  translation: {
    form: {
      signIn: {
        signIn: 'Войти',
        userName: 'Ваш ник',
        password: 'Пароль',
      },
      signUp: {
        register: 'Регистрация',
        userName: 'Имя пользователя',
        password: 'Пароль',
        passwordConfirmation: 'Подтвердите пароль',
        signUp: 'Зарегистрироваться',
      },
      modal: {
        add: 'Добавление канала',
        renameChannel: 'Переименование канала',
        confirmDelete: 'Уверены?',
        deleteChannel: 'Удаление канала',
        channelName: 'Имя канала',
        cancel: 'Отмена',
      },
      errors: {
        min: 'Не менее 6 символов',
        required: 'Не должно быть пустым',
        passwordsMatch: 'Пароли должны совпадать',
        filter: 'Пожалуйста, без ругательств',
        wrongData: 'Неверные имя пользователя или пароль',
        alreadyCreatedUser: 'Пользователь с таким именем уже зарегистрирован',
        minmax: 'От 3 до 20 символов',
        alreadyCreated: 'Канал с таким названием уже создан',
        profanity: 'Пожалуйста, без ругательств',
      },
    },
    header: {
      title: 'Hexlet Chat',
      logOut: 'Выйти',
    },
    channels: {
      channels: 'Каналы',
      deleteDropdown: 'Удалить',
      renameDropdown: 'Переименовать',
      channelManagement: 'Управление каналом',
    },
    chat: {
      messagePlaceHolder: 'Введите сообщение',
      key_one: '{{count}} сообщение',
      key_few: '{{count}} сообщения',
      key_many: '{{count}} сообщений',
      key_zero: '{{count}} сообщений',
      sendMessage: 'Отправить',
    },
    toast: {
      added: 'Канал создан',
      removed: 'Канал удалён',
      renamed: 'Канал переименован',
      networkError: 'Ошибка соединения',
    },
    send: 'Отправить',
    delete: 'Удалить',
    notFound: 'Страница не найдена :с',
  },
};

export default translation;
