import { Component, OnInit, Inject } from '@angular/core'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { WbApi } from '../shared/interfaces'
import { AppService } from '../shared/services/app.service'
import { RequestService } from '../shared/services/request.service'
import { TuiDialogService } from '@taiga-ui/core'

@Component({
  selector: 'app-token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent implements OnInit {
  tokenForm: FormGroup
  token: FormGroup
  apiForm: FormGroup
  apiRecord: FormGroup
  apiKeys: WbApi[]
  apiKey: string
  companyName: string
  lkID: number
  redactButton: boolean
  // apiInfo: any = new FormControl(null)

  constructor(
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    public appService: AppService,
    private fb: FormBuilder,
    private requestService: RequestService
  ) {
    this.apiForm = fb.group({
      companyName: new FormControl(''),
      apiKey: new FormControl('')
    })
    this.apiRecord = fb.group({
      companyName: new FormControl(''),
      apiKey: new FormControl('')
    })
  }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.requestService.getWbApiKey().subscribe(
      (data: WbApi[]) => {
        if (data && data.length > 0) {
          this.apiKeys = data
          this.apiKey = data[0].apiKey
          this.companyName = data[0].companyName
          this.lkID = data[0].lkID
        }
      },
      (error: string) => {
        console.log('Ошибка при получении данных:', error)
      }
    )
  }

  redactWbApi() {
    const body: WbApi = {
      companyName: this.apiRecord.get('companyName')?.value,
      apiKey: this.apiRecord.get('apiKey')?.value,
      lkID: this.lkID
    }

    this.requestService.redactWbApi(body).subscribe(() => {
      alert('API ключ успешно изменён')
      location.reload()
    })
  }

  setWbApi() {
    const body: WbApi = {
      companyName: this.apiForm.get('companyName')?.value,
      apiKey: this.apiForm.get('apiKey')?.value,
      lkID: this.lkID
    }

    this.requestService.setWbApiKey(body).subscribe(() => {
      alert('API ключ успешно установлен')
      location.reload()
    })
  }

  deleteApi(lkId: number) {
    this.requestService.deleteApi(lkId).subscribe(
      () => {
        location.reload()
        console.log('API успешно удалено')
      },
      (error: string) => {
        console.error('Ошибка при удалении API:', error)
      }
    )
  }
}
