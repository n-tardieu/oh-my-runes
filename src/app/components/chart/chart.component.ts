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
    this.data = this.runeService.getRunesForChartJS(200)

    this.createChart();
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'line',
      data: this.data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Efficiency charts'
          }
        },
        scales: {
          y: {
            suggestedMin: 60,
            suggestedMax: 140
          }
        }
      },
    });
  }

}
