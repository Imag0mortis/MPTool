export const MenuConfiguration: MenuConf[] = [
  {
    name: 'Управление рекламой',
    expanded: false,
    icon: 'star.svg',
    childs: [
      {
        name: 'Управление рекламной кампанией',
        link: '/campaigns'
      },
      {
        name: 'Узнать реальную рекламную ставку',
        link: '/realprice'
      },
      {
        name: 'Ввод API ключа Wildberries',
        link: '/token'
      }
    ]
  },
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
        name: 'Рассчет выкупов',
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
      {
        name: 'MPLiker',
        link: './liker'
      },
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
  {
    name: 'Аналитика',
    icon: 'edit.svg',
    expanded: false,
    childs: [
      {
        name: 'Позиция по запросу',
        link: '/position'
      },
      {
        name: 'Исправление оценки карточки',
        link: '/score_correction'
      }
    ]
  },
  {
    name: 'Вопросы',
    icon: 'questions.svg',
    expanded: false,
    childs: [
      /*{
                name: "Настройка кабинета",
                link: "/faq/answers"
            },*/
      {
        name: 'Привязка Telegram бота',
        link: '/telegrambot'
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

interface MenuChildConf {
  name: string;
  link: string;
}
