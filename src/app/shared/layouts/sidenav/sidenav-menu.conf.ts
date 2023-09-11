export const MenuConfiguration: MenuConf[] = [
  // {
  //   name: 'Управление рекламой',
  //   expanded: false,
  //   icon: 'star.svg',
  //   childs: [
  //     {
  //       name: 'Управление рекламной кампанией',
  //       link: '/campaigns'
  //     },
  //     {
  //       name: 'Узнать реальную рекламную ставку',
  //       link: '/realprice'
  //     },
  //     {
  //       name: 'Ввод API ключа Wildberries',
  //       link: '/token'
  //     }
  //   ]
  // },
  {
    name: 'Выкупы',
    expanded: false,
    icon: 'refresh.svg',
    childs: [
      {
        name: 'Самовыкупы',
        link: '/selfransom'
      },
      {
        name: 'Расчет выкупов',
        link: '/ransom_calculation'
      },
      {
        name: 'Отзывы',
        link: '/selfransom/reviews'
      }
    ]
  },
  {
    name: 'Накрутка лайков, добавлений',
    icon: 'like.svg',
    expanded: false,
    childs: [
      // {
      //   name: 'MPLiker',
      //   link: './liker'
      // },
      {
        name: 'MpLiker - Избранное',
        link: '/liker/choosen'
      },
      {
        name: 'Корзина',
        link: '/liker/basket'
      },
      {
        name: 'Вопросы',
        link: '/liker/questions'
      }
    ]
  },
  // {
  //   name: 'Аналитика',
  //   icon: 'edit.svg',
  //   expanded: false,
  //   childs: [
  //     {
  //       name: 'Позиция по запросу',
  //       link: '/position'
  //     },
  //     {
  //       name: 'Исправление оценки карточки',
  //       link: '/score_correction'
  //     }
  //   ]
  // },
  {
    name: 'Автоответы',
    icon: 'question-answer.svg',
    expanded: false,
    childs: [
      {
        name: 'Управление автоответами на отзывы',
        link: '/feedback'
      },
      {
        name: 'Ввод API ключа для автоответов',
        link: '/feedback-token'
      }
    ]
  },
  // {
  //   name: 'Вопросы',
  //   icon: 'questions.svg',
  //   expanded: false,
  //   childs: [
  //     /*{
  //               name: "Настройка кабинета",
  //               link: "/faq/answers"
  //           },*/
  //     {
  //       name: 'Привязка Telegram бота',
  //       link: '/telegrambot'
  //     }
  //   ]
  // }
];

export const SupportConfiguration: SupportConf[] = [
  {
    name: 'Техподдержка',
    icon: 'technical-support-svgrepo-com.svg',
    expanded: false,
    childs: [
      {
        name: 'Напишите нам в Telegram',
        link: 'https://t.me/annamptool_support'
      },
      {
        name: 'Напишите нам в WhatsApp',
        link: 'https://wa.me/79856270105'
      },
      {
        name: 'Написать нам на почту',
        link: 'mailto:support@mptool.pro'
      }
    ]
  }
];

interface MenuConf {
  name: string;
  icon: string;
  expanded: boolean;
  childs?: MenuChildConf[];
  link?: string;
}

interface SupportConf {
  name: string;
  icon: string;
  expanded: boolean;
  childs?: MenuChildConf[];
  link?: string;
}

interface MenuChildConf {
  name: string;
  link: string;
}
