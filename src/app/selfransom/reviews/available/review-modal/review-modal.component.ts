import {
  Component,
  OnInit,
  Inject,
  Injector,
  ChangeDetectionStrategy,
  Input,
  Injectable
} from '@angular/core';
import {
  TuiAlertService,
  TuiDialogContext,
  TuiDialogService
} from '@taiga-ui/core';
import { AppService } from 'src/app/shared/services/app.service';
import { UserService } from 'src/app/shared/services/user.service';
import { BehaviorSubject, first } from 'rxjs';
import { RequestService } from 'src/app/shared/services/request.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { TuiDay, TuiTime, TuiValidationError } from '@taiga-ui/cdk';
import { TUI_DATE_TIME_VALUE_TRANSFORMER, TuiFileLike } from '@taiga-ui/kit';
import { DomSanitizer } from '@angular/platform-browser';
import { DateTime } from 'luxon';
import { LikerReviewsTask } from 'src/app/shared/interfaces';
import { ExpressionType } from '@angular/compiler';

@Component({
  selector: 'app-review-modal',
  templateUrl: './review-modal.component.html',
  styleUrls: ['./review-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewModalComponent implements OnInit {
  changingThisBreaksApplicationSecurity: any;
  form: FormGroup;
  taskStates = [];
  cards: ransom[] = [];
  activeItemIndex = 2;
  sku: number | null;
  length = 0;
  index = 0;
  id = 2;
  sex: '';
  state = '';
  sexDict: string[] = [];
  taskState: string;
  skuName: string;
  size_match: string;
  sized: boolean;

  ransom: string;

  private readonly maxSideSize = 8000;
  private readonly minWidth = 900;
  private readonly minHeight = 1200;
  private readonly aspectRatio = 3 / 4;
  sizeDict = [
    {
      value: 'ok',
      name: 'Cоответствует размеру'
    },
    {
      value: 'smaller',
      name: 'маломерит'
    },
    {
      value: 'bigger',
      name: 'большемерит'
    }
  ];

  ransomsDict: ListForSelect[] = [
    {
      id: '',
      name: 'Не привязывать к выкупу'
    }
  ];

  readonly control = new FormControl<any>([], [maxFilesLength(5)]);
  rejectedFiles: readonly TuiFileLike[] = [];

  public tableData$: BehaviorSubject<any> = new BehaviorSubject(null);
  tableControl$ = new BehaviorSubject({});
  available: any;
  photoIsValid: boolean;
  constructor(
    private _sanitizer: DomSanitizer,
    public user: UserService,
    public appService: AppService,
    private requestService: RequestService,
    private request: RequestService,
    private userService: UserService,
    private readonly alertService: TuiAlertService,
    private fb: FormBuilder,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(POLYMORPHEUS_CONTEXT)
    public readonly context: TuiDialogContext<any>
  ) {
    const currentDate = new Date();

    this.form = fb.group({
      skuName: new FormControl(''),
      ransom: new FormControl('', [
        Validators.required,
      ]),
      sku: new FormControl(''),
      feedback: new FormControl('', [
        Validators.required,
        Validators.minLength(10)
      ]),
      time: new FormControl(
        new TuiTime(currentDate.getHours(), currentDate.getMinutes()),
        Validators.required
      ),
      article: new FormControl(),
      sex: new FormControl('', [
        Validators.required,
      ]),
      rating: new FormControl(),
      is_any_for_task: new FormControl(true),
      size_match: new FormControl('', [
        Validators.required,
      ]),
      date: new FormControl(
        new TuiDay(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate()
        ),
        Validators.required
      )
    });
  }

  photos: any[] = [];
  photo: string[] = [];

  // eslint-disable-next-line sonarjs/cognitive-complexity
  newReviewPost() {
    let timeValSeconds = 0;

    //Макароны, нужно будет разобраться, почему у нас вся валидация до запроса завязана в методе
    try {
      const dateString = toControlValueTuiDateInput(this.form.value.date);
      const timeVal = this.form.value.time;
      const timeValFinal = Date.parse(dateString);

      //Проверить текущую таймзону
      const date1 = new Date();
      //console.log(date1.getTimezoneOffset());

      timeValSeconds =
        timeValFinal / 1000 +
        timeVal.hours * 3600 +
        timeVal.minutes * 60 +
        60 * date1.getTimezoneOffset();

      let is_any_for_task = true;
      let buy_id = this.getBuyId;

      //Логика подстановки конкретного buy_id
      if (this.form.get('ransom')?.value === undefined) {
        is_any_for_task = true;
        buy_id = this.getBuyId;
      } else {
        is_any_for_task = false;
        buy_id = this.form.get('ransom')?.value;
      }

      if (!this.form.get('feedback')?.errors) {
        const photo = this.photos.map(
          (el) => el.changingThisBreaksApplicationSecurity
        );
        const body: LikerReviewsTask = {
          buy_id: buy_id,
          sku: this.form.get('sku')?.value,
          feedback: this.form.get('feedback')?.value,
          sex: this.form.get('sex')?.value,
          rating: this.form.get('rating')?.value,
          time: timeValSeconds,
          is_any_for_task: is_any_for_task,
          photo,
          size_match: this.form.get('size_match')?.value
        };

        //Костыль this.photoIsValid
        this.photoIsValid = true;

        if (this.photoIsValid) {
          // Макароны на рейтинг

          if (!this.form.get('rating')?.value) {
            const options: any = { status: 'error' };
            this.alertService
              .open(
                'Заполните все поля для публикации отзыва! У вас не заполнен рейтинг!',
                options
              )
              .subscribe();
          } else {
            this.request.postReviews(body).subscribe(
              (r: any) => {
                console.log(r);
                this.context.completeWith(true);
              },
              (e: any) => {
                //Макароны для проверки ответа на размер
                if (e.error.errorID === 19) {
                  const options: any = { status: 'error' };
                  this.alertService
                    .open(
                      'Некорректное фото отзыва (оно должно быть не менее 337*450)',
                      options
                    )
                    .subscribe();
                }

                if (
                  e.error.errorDesc === 'feedback_photo_size_limit_exceeded'
                ) {
                  const options: any = { status: 'error' };
                  this.alertService
                    .open(
                      'Вы превысили ограничение по загружаемым фото 10Мб. Загрузите более легкие изображения!',
                      options
                    )
                    .subscribe();
                }
              }
            );
          }
        } else {
          const options: any = { status: 'error' };
          this.alertService
            .open(
              'Файл не соответствует требованиям к размеру или типу. Разрешение изображения должно быть не менее 337x450px.',
              options
            )
            .subscribe();
        }
      } else {
        const options: any = { status: 'error' };
        this.alertService
          .open(
            'Заполнены не все обязательные поля или длина отзыва меньше 10 символов',
            options
          )
          .subscribe();
      }
    } catch (e: any) {
      const options: any = { status: 'error' };
      this.alertService
        .open(
          'Заполните все поля для публикации отзыва! У вас некорректная дата и время публикации!',
          options
        )
        .subscribe();
    }
  }

  extractPhotos(): any[] {
    return this.photos.map((el) => el.changingThisBreaksApplicationSecurity);
  }

  getSizeMatch(value: string): void {
    const selectedSize = this.sizeDict.find((item) => item.value === value);
    if (selectedSize) {
      this.size_match = selectedSize.value;
    }
  }

  private dialog: any;

  private get getBuyId(): number {
    if (this.form.get('sex')?.value === 'Женский') {
      return this.context.data!['femaleId'];
    } else {
      return this.context.data!['menId'];
    }
  }

  // eslint-disable-next-line sonarjs/no-identical-functions
  private get getSized(): number {
    if (this.form.get('sex')?.value === 'Женский') {
      return this.context.data!['femaleId'];
    } else {
      return this.context.data!['menId'];
    }
  }

  getTime() {
    const time = this.form.get('time')?.value;
    if (time) {
      return Math.floor(
        DateTime.fromISO(`${time}Z`).minus({ hours: 3 }).toSeconds()
      );
    } else {
      return Math.floor(DateTime.now().valueOf() / 1000);
    }
  }

  ngOnInit(): void {
    this.available = this.context!.data!['available'];

    console.log(this.context.data);
    this.skuName = this.context.data!['skuName'];

    this.form.get('sku')?.setValue(this.context.data!['sku']);
    this.form.get('sku')?.disable();
    this.sized = this.context!.data!['sized'];
    if (this.context.data!['menId'] > 0) {
      this.sexDict.push('Мужской');
    }
    if (this.context.data!['femaleId'] > 0) {
      this.sexDict.push('Женский');
    }
    this.size_match = '';
    this.context.data!['menId'] > 0
      ? this.form.get('sex')?.setValue('Мужской')
      : this.form.get('sex')?.setValue('Женский');
    this.control.statusChanges.subscribe((response) => {
      this.photos = [];
      this.control.value.forEach((el: Blob) => {
        console.log(el);
        this.getBase64(el);
      });
    });

    //Пробуем получить список
    this.request.getRansomsBySku(this.context.data!['sku']).subscribe(
      (r: any) => {
        //console.log(r);
        //this.context.completeWith(true);

        //ransomsDict

        r.forEach((el: BuyRansom) => {
          const arr = {
            id: el.buy_id,
            name:
              '№' +
              el.buy_id +
              ' ' +
              el.accountName +
              ' ' +
              el.pickupAddress +
              ' ' +
              el.sex +
              ' ' +
              el.size +
              ' ' +
              timeConverter(el.time)
          };
          this.ransomsDict.push(arr);
        });

        //console.log(this.ransomsDict);
      },
      (error: unknown) => {
        const options: any = { status: 'error' };
        this.alertService
          .open(
            'Произошла ошибка при отправке запроса! Повторите попытку позднее',
            options
          )
          .subscribe();
      }
    );
  }

  test() {
    //console.log(this.form.get('sex'))
    //console.log("размер",this.sized);
  }

  checkFiles(files: FileList): boolean {
    return true;
    /*
    const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
    let totalSize = 0;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      const img = new Image();
      img.src = window.URL.createObjectURL(file);
      img.onload = () => {
        const cs = (img as any).colorSpace || (img as any).msColorSpace;
        const photoIsValid =
          img.width >= 337 &&
          img.height >= 450 &&
          img.width / img.height === 3 / 4 &&
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.type === 'image/png' &&
          (cs === 'srgb' || cs === void 0);
        if (photoIsValid) {
          totalSize += file.size;
          if (totalSize <= MAX_FILE_SIZE_BYTES) {
            this.getBase64(file);
          } else {
            const options: any = { status: 'error' };
            this.alertService.open('Общий размер файлов не должен превышать 10 МБ', options).subscribe();
          }
        } else {
          const options: any = { status: 'error' };
          this.alertService.open('Файл не соответствует требованиям к размеру или типу. Разрешение изображения должно быть не менее 337x450px.', options).subscribe();
        }
      };
      img.onerror = () => {
        alert('Ошибка загрузки файла');
      };
      img.src = window.URL.createObjectURL(file);
    }
    return this.photoIsValid;

    */
  }

  get validateByAvailable() {
    return (
      (this.form.get('sex')?.value === 'Мужской' && this.available.male > 0) ||
      (this.form.get('sex')?.value === 'Женский' && this.available.female > 0)
    );
  }

  onReject(files: TuiFileLike | readonly TuiFileLike[]): void {
    this.rejectedFiles = [...this.rejectedFiles, ...(files as TuiFileLike[])];
  }

  removeFile({ name }: File, idx: number): void {
    this.control.setValue(
      this.control.value?.filter((current: File) => current.name !== name) ?? []
    );
    this.photos.splice(idx, 1);
  }

  clearRejected({ name }: TuiFileLike): void {
    this.rejectedFiles = this.rejectedFiles.filter(
      (rejected) => rejected.name !== name
    );
  }

  getBase64(file: Blob) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      //console.log(reader.result);
    };
    reader.onerror = function (error) {
      //console.log('Error: ', error);
    };
    reader.onloadend = (e) => {
      this.photos.push(
        this._sanitizer.bypassSecurityTrustResourceUrl(reader.result as string)
      );
    };
  }
}

export function maxFilesLength(maxLength: number): ValidatorFn {
  return ({ value }: AbstractControl) => {
    return value.length > maxLength
      ? {
          maxLength: new TuiValidationError(
            'Error: maximum limit - 5 files for upload'
          )
        }
      : null;
  };
}

interface ransom {
  imgLink: string;
  price: number;
  priceTotal: number;
  sku: number | null;
  skus: string[];
  taskID: number;
  taskState: string;
  taskStateNew: { count: number; state: string }[];
  skuName: string;
  sex: string;
  sexDict: [{ name: string; value: number }, { name: string; value: number }];
  size_match: string;
  sizeDict: [
    { name: string; value: string },
    { name: string; value: string },
    { name: string; value: string }
  ];
  sized: boolean;
}

interface BuyRansom {
  accountName: string;
  buy_id: number;
  pickupAddress: string;
  query: string;
  sex: string;
  size: string;
  time: number;
}

interface ListForSelect {
  id: number | string;
  name: string;
}

function toControlValueTuiDateInput(day: TuiDay | null): string {
  return day ? day.toString('YMD', '-') : '';
}

function timeConverter(UNIX_timestamp: number) {
  const a = new Date(UNIX_timestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
}
