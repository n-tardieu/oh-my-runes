import { SWExporterTypes } from "../types/sw-exporter.types"
import { SWCalculatorTypes } from "../types/sw-calculator.types"
import { Effect } from "./effect.model"

export function emptyRuneSlot() {
    return {
        [SWExporterTypes.RuneSlot.DOWN]: null,
        [SWExporterTypes.RuneSlot.DOWN_LEFT]: null,
        [SWExporterTypes.RuneSlot.DOWN_RIGHT]: null,
        [SWExporterTypes.RuneSlot.UP]: null,
        [SWExporterTypes.RuneSlot.UP_LEFT]: null,
        [SWExporterTypes.RuneSlot.UP_RIGHT]: null,
    }
}

export class Rune implements SWCalculatorTypes.Rune {
    setType: SWExporterTypes.SetType /// Use set ID.
    isAntique: boolean
    stars: number // 1 - 6
    class: any
    extra: SWExporterTypes.Extra
    rank: SWExporterTypes.Rank
    slotFactor: SWExporterTypes.RuneSlot

    sellValue: number

    maxUpgradeLevel: number
    upgradeLevel: number

    // TODO switch Effect
    innateEffect: any // Effect
    primaryEffect: any // Effect
    secondaryEffects: Effect[] = []
    unitImage?: string

    constructor(data: SWCalculatorTypes.Rune) {
        this.setType = data.setType
        this.isAntique = data.isAntique
        this.slotFactor = data.slotFactor
        this.extra = data.extra
        this.rank = data.rank
        this.stars = data.stars
        this.sellValue = data.sellValue
        this.maxUpgradeLevel = data.maxUpgradeLevel
        this.upgradeLevel = data.upgradeLevel
        if (data.innateEffect) {
            this.innateEffect = new Effect(data.innateEffect)
        }
        this.primaryEffect = new Effect(data.primaryEffect)
        for (let i in data.secondaryEffects) {
            this.secondaryEffects.push(new Effect(data.secondaryEffects[i]))
        }
    }

    static subStatEfficiency: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 1875],
        [SWExporterTypes.EffectType.HPPercent, 40],
        [SWExporterTypes.EffectType.ATK, 100],
        [SWExporterTypes.EffectType.ATKPercent, 40],
        [SWExporterTypes.EffectType.DEF, 100],
        [SWExporterTypes.EffectType.DEFPercent, 40],
        [SWExporterTypes.EffectType.SPEED, 30],
        [SWExporterTypes.EffectType.CRITRate, 30],
        [SWExporterTypes.EffectType.CRITDmg, 35],
        [SWExporterTypes.EffectType.RES, 40],
        [SWExporterTypes.EffectType.ACC, 40],
    ])

    static subStatCustomEfficiency: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 0.5],
        [SWExporterTypes.EffectType.HPPercent, 1],
        [SWExporterTypes.EffectType.ATK, 0.5],
        [SWExporterTypes.EffectType.ATKPercent, 1],
        [SWExporterTypes.EffectType.DEF, 0.5],
        [SWExporterTypes.EffectType.DEFPercent, 1],
        [SWExporterTypes.EffectType.SPEED, 1],
        [SWExporterTypes.EffectType.CRITRate, 1],
        [SWExporterTypes.EffectType.CRITDmg, 1],
        [SWExporterTypes.EffectType.RES, 1],
        [SWExporterTypes.EffectType.ACC, 1],
    ])

    static mainStatEfficiency: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 2448],
        [SWExporterTypes.EffectType.HPPercent, 63],
        [SWExporterTypes.EffectType.ATK, 160],
        [SWExporterTypes.EffectType.ATKPercent, 63],
        [SWExporterTypes.EffectType.DEF, 160],
        [SWExporterTypes.EffectType.DEFPercent, 63],
        [SWExporterTypes.EffectType.SPEED, 42],
        [SWExporterTypes.EffectType.CRITRate, 58],
        [SWExporterTypes.EffectType.CRITDmg, 80],
        [SWExporterTypes.EffectType.RES, 64],
        [SWExporterTypes.EffectType.ACC, 64],
    ])

    // blue
    static grindstones: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 250],
        [SWExporterTypes.EffectType.HPPercent, 6],
        [SWExporterTypes.EffectType.ATK, 18],
        [SWExporterTypes.EffectType.ATKPercent, 6],
        [SWExporterTypes.EffectType.DEF, 18],
        [SWExporterTypes.EffectType.DEFPercent, 6],
        [SWExporterTypes.EffectType.SPEED, 3],
        [SWExporterTypes.EffectType.CRITRate, 0],
        [SWExporterTypes.EffectType.CRITDmg, 0],
        [SWExporterTypes.EffectType.RES, 0],
        [SWExporterTypes.EffectType.ACC, 0],
    ])

    // max proc blue
    static grindstonesHero: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 450],
        [SWExporterTypes.EffectType.HPPercent, 7],
        [SWExporterTypes.EffectType.ATK, 22],
        [SWExporterTypes.EffectType.ATKPercent, 7],
        [SWExporterTypes.EffectType.DEF, 22],
        [SWExporterTypes.EffectType.DEFPercent, 7],
        [SWExporterTypes.EffectType.SPEED, 4],
        [SWExporterTypes.EffectType.CRITRate, 0],
        [SWExporterTypes.EffectType.CRITDmg, 0],
        [SWExporterTypes.EffectType.RES, 0],
        [SWExporterTypes.EffectType.ACC, 0],
    ])

    static grindstonesLeg: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 550],
        [SWExporterTypes.EffectType.HPPercent, 10],
        [SWExporterTypes.EffectType.ATK, 30],
        [SWExporterTypes.EffectType.ATKPercent, 10],
        [SWExporterTypes.EffectType.DEF, 30],
        [SWExporterTypes.EffectType.DEFPercent, 10],
        [SWExporterTypes.EffectType.SPEED, 5],
        [SWExporterTypes.EffectType.CRITRate, 0],
        [SWExporterTypes.EffectType.CRITDmg, 0],
        [SWExporterTypes.EffectType.RES, 0],
        [SWExporterTypes.EffectType.ACC, 0],
    ])

    //max base proc
    static baseSubStat: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 375],
        [SWExporterTypes.EffectType.HPPercent, 8],
        [SWExporterTypes.EffectType.ATK, 20],
        [SWExporterTypes.EffectType.ATKPercent, 8],
        [SWExporterTypes.EffectType.DEF, 20],
        [SWExporterTypes.EffectType.DEFPercent, 8],
        [SWExporterTypes.EffectType.SPEED, 6],
        [SWExporterTypes.EffectType.CRITRate, 6],
        [SWExporterTypes.EffectType.CRITDmg, 7],
        [SWExporterTypes.EffectType.RES, 8],
        [SWExporterTypes.EffectType.ACC, 8],
    ])

    //gemme Hero max changement de la valeur stats 
    static enchanteGemHero: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 420],
        [SWExporterTypes.EffectType.HPPercent, 11],
        [SWExporterTypes.EffectType.ATK, 30],
        [SWExporterTypes.EffectType.ATKPercent, 11],
        [SWExporterTypes.EffectType.DEF, 30],
        [SWExporterTypes.EffectType.DEFPercent, 11],
        [SWExporterTypes.EffectType.SPEED, 8],
        [SWExporterTypes.EffectType.CRITRate, 7],
        [SWExporterTypes.EffectType.CRITDmg, 8],
        [SWExporterTypes.EffectType.RES, 9],
        [SWExporterTypes.EffectType.ACC, 9],
    ])

    static enchanteGemAntiqueHero: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 420],
        [SWExporterTypes.EffectType.HPPercent, 13],
        [SWExporterTypes.EffectType.ATK, 34],
        [SWExporterTypes.EffectType.ATKPercent, 13],
        [SWExporterTypes.EffectType.DEF, 34],
        [SWExporterTypes.EffectType.DEFPercent, 13],
        [SWExporterTypes.EffectType.SPEED, 9],
        [SWExporterTypes.EffectType.CRITRate, 8],
        [SWExporterTypes.EffectType.CRITDmg, 10],
        [SWExporterTypes.EffectType.RES, 11],
        [SWExporterTypes.EffectType.ACC, 11],
    ])

    //gemme Hero max changement de la valeur stats 
    static enchanteGemLeg: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 580],
        [SWExporterTypes.EffectType.HPPercent, 13],
        [SWExporterTypes.EffectType.ATK, 40],
        [SWExporterTypes.EffectType.ATKPercent, 13],
        [SWExporterTypes.EffectType.DEF, 40],
        [SWExporterTypes.EffectType.DEFPercent, 13],
        [SWExporterTypes.EffectType.SPEED, 10],
        [SWExporterTypes.EffectType.CRITRate, 9],
        [SWExporterTypes.EffectType.CRITDmg, 10],
        [SWExporterTypes.EffectType.RES, 11],
        [SWExporterTypes.EffectType.ACC, 11],
    ])

    static enchanteGemAntiqueLeg: Map<SWExporterTypes.EffectType, number> = new Map([
        [SWExporterTypes.EffectType.HP, 580],
        [SWExporterTypes.EffectType.HPPercent, 15],
        [SWExporterTypes.EffectType.ATK, 44],
        [SWExporterTypes.EffectType.ATKPercent, 15],
        [SWExporterTypes.EffectType.DEF, 44],
        [SWExporterTypes.EffectType.DEFPercent, 15],
        [SWExporterTypes.EffectType.SPEED, 11],
        [SWExporterTypes.EffectType.CRITRate, 10],
        [SWExporterTypes.EffectType.CRITDmg, 12],
        [SWExporterTypes.EffectType.RES, 11],
        [SWExporterTypes.EffectType.ACC, 11],
    ])
}
