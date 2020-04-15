// import { Component, OnInit } from '@angular/core';
import { Component, AfterViewInit, OnInit } from '@angular/core';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { ApiService } from '../../services/api/api.service';
declare var require: any;


export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}
const data: any = require('./data.json');
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  barChart1: Chart = {
    type: 'Bar',
    data: data['Bar'],
    options: {
      seriesBarDistance: 15,
      high: 12,

      axisX: {
        showGrid: false,
        offset: 20
      },
      axisY: {
        showGrid: true,
        offset: 40
      },
      height: 360
    },

    responsiveOptions: [
      [
        'screen and (min-width: 640px)',
        {
          axisX: {
            labelInterpolationFnc: function (
              value: number,
              index: number
            ): string {
              return index % 1 === 0 ? `${value}` : null;
            }
          }
        }
      ]
    ]
  };

  // This is for the donute chart
  donuteChart1: Chart = {
    type: 'Pie',
    data: data['Pie'],
    options: {
      donut: true,
      height: 260,
      showLabel: false,
      donutWidth: 20
    }
  };
  constructor(
    public api: ApiService
  ) {

    this.api.getAllStaff().subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err);
    })
  }

  ngOnInit() {
  }

}
