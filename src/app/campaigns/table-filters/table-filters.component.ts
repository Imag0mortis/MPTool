import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiContextWithImplicit, TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-table-filters',
  templateUrl: './table-filters.component.html',
  styleUrls: ['./table-filters.component.scss']
})
export class TableFiltersComponent {

  items = [
    `Luke Skywalker`,
    `Leia Organa Solo`,
    `Darth Vader`,
    `Han Solo`,
    `Obi-Wan Kenobi`,
    `Yoda`,
];

testValue = new FormControl();


}
