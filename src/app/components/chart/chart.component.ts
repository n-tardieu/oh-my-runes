import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { RuneService } from 'src/app/services/rune.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  public chart: any;

  data: any

  constructor(private runeService: RuneService) { }

  ngOnInit(): void {
    this.data = this.runeService.getRunesForChartJS(300)
    this.createChart();
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        elements: {
          point: {
            radius: 0
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Efficiency charts (Vio / Will)'
          }
        },
        scales: {
          y: {
            suggestedMin: 60,
            suggestedMax: 140
          },
          x: {
            ticks: {
              // Include a dollar sign in the ticks
              callback: function (dataLabel, index) {
                return index % 10 === 0 ? dataLabel : null;
              }
            }
          }
        }
      },
    });
  }

}
