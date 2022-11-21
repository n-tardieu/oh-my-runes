import { Injectable } from '@angular/core';
import { D } from 'chart.js/dist/chunks/helpers.core';
import { Subject, Subscription } from 'rxjs';
import { Rune } from '../core/models/rune.model';
import { SWCalculatorTypes } from '../core/types/sw-calculator.types';
import { SWExporterTypes } from '../core/types/sw-exporter.types';
import { Wizard } from '../core/types/sw-wizard.types';
import { RunesConvertService } from './runes-convert.service';
import { WizardService } from './wizard.service';

@Injectable({
  providedIn: 'root'
})
export class RuneService {

  runesSubject$ = new Subject<Rune[]>()
  private runesList: Rune[] = []

  emitRunesSubject() {
    console.log("Runes has emit !");
    this.runesSubject$.next(this.runesList.slice())
  }

  setRunes(runes: Rune[]) {
    this.runesList = runes
    this.emitRunesSubject()
  }
  getRunes() {
    return this.runesList
  }

  getRunesForChartJS(runeNb: number) {


    // TODO not actual
    const datasets: number[] = []
    const dataC1: number[] = []
    const dataG1: number[] = []

    const dataDevC1: number[] = []
    const dataDevG1: number[] = []

    // TODO not legendary
    const datasetsMax: number[] = []
    const labels: string[] = []

    const runes = this.getRunes().filter(r => r.setType == SWExporterTypes.SetType.VIOLENT || r.setType == SWExporterTypes.SetType.WILL).sort((rune_a: Rune, rune_b: Rune) => {
      if (rune_a.efficiency >= rune_b.efficiency) return -1
      return 1
    }).slice(0, runeNb)

    const runesMaxEfficiency = this.getRunes().filter(r => r.setType == SWExporterTypes.SetType.VIOLENT || r.setType == SWExporterTypes.SetType.WILL).sort((rune_a: Rune, rune_b: Rune) => {
      if (rune_a.maxEfficiency >= rune_b.maxEfficiency) return -1
      return 1
    }).slice(0, runeNb)


    runesMaxEfficiency.forEach((r) => {
      datasetsMax.push(r.maxEfficiency)
    })

    runes.forEach((r, index) => {
      datasets.push(r.efficiency)
      //  dataG1.push(r.efficiency + 9)
      //  dataC1.push(r.efficiency - 21)
      dataDevC1.push(108 - index * 0.08)
      dataDevG1.push(118 - index * 0.08)
      if (index % 1 == 0) labels.push('Runes : ' + index.toString())
    })




    const modelChart = {
      labels: labels,
      datasets: [
        {
          label: "Now",
          data: datasets,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: "Legendary",
          data: datasetsMax,
          fill: false,
          borderColor: 'orange',
          tension: 0.1
        },
      ]
    }


    return modelChart
  }

}
