import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
  name: 'tariffsInfo'
})
export class TariffsInfoPipe implements PipeTransform {
  constructor(private userService: UserService) {}

  transform(value: unknown, arg: number): unknown {
    let cost = 0;
    if (this.userService.tariffInfo.length) {
      cost =
        this.userService.tariffInfo.find((el) => el.groupID === arg).tariff[0]
          .cost * Number(value);
    }
    isNaN(cost) ? (cost = 0) : null;
    return cost + ' ₽';
  }
}
