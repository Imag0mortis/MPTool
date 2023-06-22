import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { RequestService } from '../shared/services/request.service';
import { UserService } from 'src/app/shared/services/user.service';
import { AppService } from 'src/app/shared/services/app.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { BehaviorSubject, first } from 'rxjs';
//
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  index = 0;
  length = 0;

  page = 1;
  pageSize = 20;

  transactions: Transaction[] = [];

  transactionsFull: Transaction[] = [];

  json_data = [
    {
      name: 'Raja',
      age: 20
    },
    {
      name: 'Mano',
      age: 40
    },
    {
      name: 'Tom',
      age: 40
    },
    {
      name: 'Devi',
      age: 40
    },
    {
      name: 'Mango',
      age: 40
    }
  ];

  public tableData$: BehaviorSubject<any> = new BehaviorSubject(null);
  tableControl$ = new BehaviorSubject({});

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public appService: AppService,
    private request: RequestService,
    private ref: ChangeDetectorRef,
    private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.getData(this.page);
  }

  goToPage(event: number) {
    this.index = event;
    this.getData(event + 1);
  }

  getData(page: number) {
    this.request.getTransactions(page, this.pageSize).subscribe((r: any) => {
      this.transactions = r.operationLog;
      this.length = r.tableData.pagesTotal;
      console.log(this.transactions);
    });
  }

  downloadExcel() {
    const title = 'История транзакций';
    const header = ['Сумма', 'Баланс', 'Описание', 'Дата и время', 'Тип'];

    this.request.getTransactions().subscribe(
      (r: any) => {
        this.transactionsFull = r.operationLog;

        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet('История');

        const headerRow = worksheet.addRow(header);

        headerRow.eachCell((cell, number) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFFFFF00' }
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' }
          };
        });

        this.transactionsFull.forEach((d) => {
          const excelRow = worksheet.addRow(Object.values(d));
        });

        workbook.xlsx.writeBuffer().then((data) => {
          const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });
          saveAs.saveAs(blob, 'Transactions.xlsx');
        });
      },
      (e: unknown) => {
        alert('Произошла ошибка запроса!');
      }
    );
  }
}

interface Transaction {
  amount: number | string;
  balance: number | string;
  operation: string;
  time: string;
  type: TransactionType;
}

export type TransactionType = 'spend' | 'deposit';
