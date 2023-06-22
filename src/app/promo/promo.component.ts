import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { RequestService } from '../shared/services/request.service';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.scss']
})
export class PromoComponent {
  index = 0;

  users = JSON.parse(window.localStorage.getItem('users')!);

  scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }

  items: review[] = [
    {
      name: 'Андрей',
      decription:
        'Один клик — и я отслеживаю позицию своих артикулов по конкретному ключевому запросы. Сразу видно, насколько эффективно работает seo-продвижение или оптимизация',
      avatar: '../../assets/avatars/avatar_andrey.jpg'
    },
    {
      name: 'Ольга',
      decription:
        'Раньше все мое время уходило на работу с рекламными кампаниями.  MpTool развязал мне руки, я наконец могу заниматься расширением бизнеса, оптимизировать другие процессы и просто отдыхать. ',
      avatar: '../../assets/avatars/avatar_olga.jpg'
    },
    {
      name: 'Иван',
      decription:
        'Реклама работает как часы, ROI взлетел до 60%, я под впечатлением. Это лучший сервис для работы c Wildberries из всех, что я пробовал.',
      avatar: '../../assets/avatars/avatar_ivan.jpg'
    },
    {
      name: 'Алёна',
      decription:
        'Ребята, спасибо вам за то, что вы делаете! Об одном прошу — не останавливайтесь!',
      avatar: '../../assets/avatars/avatar_alyona.jpg'
    },
    {
      name: 'Мария',
      decription:
        'Купила тариф Scale. Больше у меня не болит голова о том, как поднять продажи и обойти конкурентов. Все вопросы решает MpTool',
      avatar: '../../assets/avatars/avatar_maria.jpg'
    }
  ];

  constructor(private request: RequestService, private auth: AuthService) {}

  login(l: string, p: string) {
    this.request.loginRequest(l, p).subscribe(
      (r) => this.auth.successLogin(r),
      (e: unknown) => alert('Ошибка входа')
    );
  }
}

interface review {
  name: string;
  avatar: string;
  decription: string;
}
