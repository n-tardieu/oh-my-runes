
//

import { SWCalculatorTypes } from "../types/sw-calculator.types"
import { SWExporterTypes } from "../types/sw-exporter.types"

// Caracteristics type helper
export type Caracteristics = Record<SWCalculatorTypes.CaracteristicsType,number>

export function zeroedCaracteristics() {
    return  {
          [SWCalculatorTypes.CaracteristicsType.HEALTH]: 0,
          [SWCalculatorTypes.CaracteristicsType.ATTACK]: 0,
          [SWCalculatorTypes.CaracteristicsType.DEFENSE]: 0,
          [SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE]: 0,
          [SWCalculatorTypes.CaracteristicsType.CRIT_RATE]: 0,
          [SWCalculatorTypes.CaracteristicsType.SPEED]: 0,
          [SWCalculatorTypes.CaracteristicsType.RESISTANCE]: 0,
          [SWCalculatorTypes.CaracteristicsType.ACCURACY]: 0,
          [SWCalculatorTypes.CaracteristicsType.WILL]: 0,
          [SWCalculatorTypes.CaracteristicsType.SHIELD]: 0,
          [SWCalculatorTypes.CaracteristicsType.REPLAY_CHANCE]: 0,
          [SWCalculatorTypes.CaracteristicsType.STUN_CHANCE]: 0,
          [SWCalculatorTypes.CaracteristicsType.LIFE_STEAL]: 0,
          [SWCalculatorTypes.CaracteristicsType.ATB_MISSING_HEALTH]: 0,
          [SWCalculatorTypes.CaracteristicsType.COUNTER_ATTACK_CHANCE]: 0,
          [SWCalculatorTypes.CaracteristicsType.HPPercent_DESTRUCTION]: 0,
      }
}

// TODO rename to base stats modifier. 
export class Effect implements SWCalculatorTypes.Effect {

    static typeStr : Record<SWExporterTypes.EffectType, string> = {
        [SWExporterTypes.EffectType.HP]: "HP",
        [SWExporterTypes.EffectType.ATK]: "ATK",
        [SWExporterTypes.EffectType.DEF]: "DEF",
        [SWExporterTypes.EffectType.SPEED]: "SPD",
        [SWExporterTypes.EffectType.CRITDmg]: "C.Dmg",
        [SWExporterTypes.EffectType.CRITRate]: "C.Rate",
        [SWExporterTypes.EffectType.RES]: "Res",
        [SWExporterTypes.EffectType.ACC]: "Acc",
        [SWExporterTypes.EffectType.HPPercent]: "HP%",
        [SWExporterTypes.EffectType.ATKPercent]: "ATK%",
        [SWExporterTypes.EffectType.DEFPercent]: "DEF%",
        // Special effects. TODO find another way to handle them.
        [SWExporterTypes.EffectType.WILL]: "Will",
        [SWExporterTypes.EffectType.SHIELD]: "Shield",

        [SWExporterTypes.EffectType.REPLAY_CHANCE]:"Replay chance",
        [SWExporterTypes.EffectType.STUN_CHANCE]:"Stun chance",
        [SWExporterTypes.EffectType.LIFE_STEAL]:"Life steal",
        [SWExporterTypes.EffectType.ATB_MISSING_HEALTH]:"ATB per missing HP%",
        [SWExporterTypes.EffectType.COUNTER_ATTACK_CHANCE]:"Counter attack chance",
        [SWExporterTypes.EffectType.HPPercent_DESTRUCTION]:"HP% Destruction",
        // 
        [SWExporterTypes.EffectType.ARTIFACT_HP]: "HP",
        [SWExporterTypes.EffectType.ARTIFACT_ATK]: "ATK",
        [SWExporterTypes.EffectType.ARTIFACT_DEF]: "DEF",
        //
        [SWExporterTypes.EffectType.SPEEDPercent]: "SPD%",

    }

    type: SWExporterTypes.EffectType
    gems: number = 0
    value: number = 0
    grindstones: number = 0
  
    // Use specifically for prefix effect and addition operations.
    effect_reducer: number = 1

    constructor(data: SWCalculatorTypes.Effect) {
        this.type = data.type
        this.gems = data.gems
        this.grindstones = data.grindstones
        this.effect_reducer = this.effect_reducer
        this.value = data.value
    }
  
    static addition(caracteristic: number, modifier: number, reducer:number) : number{
      return modifier / reducer
    }

    static percent(caracteristic: number,  modifier: number, reducer: number) : number{
      return caracteristic * ((modifier) /100)
    }
  
  // MAP effect type to a function that apply the effect. 
  // TODO it should be possible to merge the two map in a single one...
    static effectApplier : Record<SWExporterTypes.EffectType, (caract: number, modifier: number, reducer: number) => number> = {
      [SWExporterTypes.EffectType.HP]: Effect.addition,
      [SWExporterTypes.EffectType.ATK]: Effect.addition,
      [SWExporterTypes.EffectType.DEF]: Effect.addition,
      [SWExporterTypes.EffectType.SPEED]: Effect.addition,
      [SWExporterTypes.EffectType.CRITDmg]: Effect.addition,
      [SWExporterTypes.EffectType.CRITRate]: Effect.addition,
      [SWExporterTypes.EffectType.RES]: Effect.addition,
      [SWExporterTypes.EffectType.ACC]: Effect.addition,
      [SWExporterTypes.EffectType.HPPercent]: Effect.percent,
      [SWExporterTypes.EffectType.ATKPercent]: Effect.percent,
      [SWExporterTypes.EffectType.DEFPercent]: Effect.percent,
      // Special effects. TODO find another way to handle them.
      [SWExporterTypes.EffectType.WILL]: Effect.addition,
      [SWExporterTypes.EffectType.SHIELD]: Effect.addition,
      [SWExporterTypes.EffectType.REPLAY_CHANCE]: Effect.addition,
      [SWExporterTypes.EffectType.STUN_CHANCE]: Effect.addition,
      [SWExporterTypes.EffectType.LIFE_STEAL]: Effect.addition,
      [SWExporterTypes.EffectType.ATB_MISSING_HEALTH]: Effect.addition,
      [SWExporterTypes.EffectType.COUNTER_ATTACK_CHANCE]: Effect.addition,
      [SWExporterTypes.EffectType.HPPercent_DESTRUCTION]: Effect.addition,
      // 
      [SWExporterTypes.EffectType.ARTIFACT_HP]: Effect.addition,
      [SWExporterTypes.EffectType.ARTIFACT_ATK]: Effect.addition,
      [SWExporterTypes.EffectType.ARTIFACT_DEF]: Effect.addition,
      //
      [SWExporterTypes.EffectType.SPEEDPercent]: Effect.percent,
    }
  // MAP effect type with caracteristic type, to handle the % case that modify caracteristic of the non percent.
    static caracModifier : Record<SWExporterTypes.EffectType, SWCalculatorTypes.CaracteristicsType> = {
      [SWExporterTypes.EffectType.HP]: SWCalculatorTypes.CaracteristicsType.HEALTH,
      [SWExporterTypes.EffectType.HPPercent]: SWCalculatorTypes.CaracteristicsType.HEALTH,
      [SWExporterTypes.EffectType.ATK]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.EffectType.ATKPercent]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.EffectType.DEF]: SWCalculatorTypes.CaracteristicsType.DEFENSE,
      [SWExporterTypes.EffectType.DEFPercent]: SWCalculatorTypes.CaracteristicsType.DEFENSE,
      [SWExporterTypes.EffectType.SPEED]: SWCalculatorTypes.CaracteristicsType.SPEED,
      [SWExporterTypes.EffectType.CRITDmg]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.EffectType.CRITRate]: SWCalculatorTypes.CaracteristicsType.CRIT_RATE,
      [SWExporterTypes.EffectType.ACC]: SWCalculatorTypes.CaracteristicsType.ACCURACY,
      [SWExporterTypes.EffectType.RES]: SWCalculatorTypes.CaracteristicsType.RESISTANCE,
      //
      [SWExporterTypes.EffectType.WILL]: SWCalculatorTypes.CaracteristicsType.WILL,
      [SWExporterTypes.EffectType.SHIELD]: SWCalculatorTypes.CaracteristicsType.SHIELD,
      [SWExporterTypes.EffectType.REPLAY_CHANCE]: SWCalculatorTypes.CaracteristicsType.REPLAY_CHANCE,
      [SWExporterTypes.EffectType.STUN_CHANCE]:SWCalculatorTypes.CaracteristicsType.STUN_CHANCE,
      [SWExporterTypes.EffectType.LIFE_STEAL]:SWCalculatorTypes.CaracteristicsType.LIFE_STEAL,
      [SWExporterTypes.EffectType.ATB_MISSING_HEALTH]:SWCalculatorTypes.CaracteristicsType.ATB_MISSING_HEALTH,
      [SWExporterTypes.EffectType.COUNTER_ATTACK_CHANCE]:SWCalculatorTypes.CaracteristicsType.COUNTER_ATTACK_CHANCE,
      [SWExporterTypes.EffectType.HPPercent_DESTRUCTION]:SWCalculatorTypes.CaracteristicsType.HPPercent_DESTRUCTION,
      // 
      [SWExporterTypes.EffectType.ARTIFACT_HP]: SWCalculatorTypes.CaracteristicsType.HEALTH,
      [SWExporterTypes.EffectType.ARTIFACT_ATK]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.EffectType.ARTIFACT_DEF]: SWCalculatorTypes.CaracteristicsType.DEFENSE,
      //
      [SWExporterTypes.EffectType.SPEEDPercent]: SWCalculatorTypes.CaracteristicsType.SPEED,
    }
  
    Apply(caracteristic: Caracteristics) : Caracteristics {
      let emptyCaracs = zeroedCaracteristics()
      let affectedCarac = Effect.caracModifier[this.type]
      let totalValue = this.value + this.grindstones
      
      let modifierFunc = Effect.effectApplier[this.type]
      if (modifierFunc != undefined) {
          let computedValue = Effect.effectApplier[this.type](
            caracteristic[affectedCarac],
            totalValue,
            this.effect_reducer
          )
          emptyCaracs[affectedCarac] = computedValue
      }
      else {
          // console.log("Effect type not supported yet", this.type)
      }
  // return object with modified value.
      return emptyCaracs
    }

    get totalValue(){
      return this.value + this.grindstones;
    }
}

export class InGameEffect implements SWCalculatorTypes.InGameEffect {

    type: SWExporterTypes.InGameEffectType
    value: number

    static typeStr : Record<SWExporterTypes.InGameEffectType, string> = {
        [SWExporterTypes.InGameEffectType.ATB_WHEN_REVIVE]: "ATB boost when revive",
        [SWExporterTypes.InGameEffectType.ATK_BY_HP_LOST]: "ATK% per HP lost",
        [SWExporterTypes.InGameEffectType.ATK_WHEN_BUFF]: "ATK% when buffed",
        [SWExporterTypes.InGameEffectType.BOMB_DAMAGE_BOOST]: "Bomb damage boost",
        [SWExporterTypes.InGameEffectType.COOP_DAMAGE_BOOST]: "Coop damage boost",
        [SWExporterTypes.InGameEffectType.COUNTER_DAMAGE_BOOST]: "Counter damage boost",
        [SWExporterTypes.InGameEffectType.CRITDmg_BAD_CONDITION]: "Crit damage boost as enemy condition is good",
        [SWExporterTypes.InGameEffectType.CRITDmg_DISABLE_REDUCTION]: "Crit damage boost when disabled",
        [SWExporterTypes.InGameEffectType.CRITDmg_GOOD_CONDITION]: "Crit damage boost as enemy condition is good",
        [SWExporterTypes.InGameEffectType.CRITRate_WHEN_BUFF]: "Crit Rate damage boost",
        [SWExporterTypes.InGameEffectType.CRUSHING_DAMAGE_BOOST]: "Crushing damage boost",
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_DARK]: "Dark damage boost",
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_FIRE]: "Fire damage boost",
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_LIGHT]: "Light damage boost",
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_WATER]: "Water damage boost",
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_WIND]: "Wind damage boost",
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_ATK]: "Damage boost by ATK",
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_DEF]: "Damage boost by DEF",
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_HP]: "Damage boost by HP",
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_SPEED]: "Damage boost by SPD",
        [SWExporterTypes.InGameEffectType.DAMAGE_DISABLE_REDUCTION]: "Damage reduction when disabled",
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_DARK]: "Damage reduction when attack element is dark",
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_FIRE]: "Damage reduction when attack element is fire",
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_LIGHT]: "Damage reduction when attack element is light",
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_WATER]: "Damage reduction when attack element is water",
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_WIND]: "Damage reduction when attack element is wind",
        [SWExporterTypes.InGameEffectType.DEF_BY_HP_LOST]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.DEF_WHEN_BUFF]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.HP_WHEN_REVIVE]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.LIFE_DRAIN]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.HP_WHEN_REVIVE]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.LIFE_DRAIN]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.MONO_SKILL_CritDMG_BOOST]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.REFLECTED_DAMAGE_BOOST]: "Damage boost when disabled",
        [SWExporterTypes.InGameEffectType.SKILL1_ACCURACY_BOOST]: "Skill 1 accuracy boost",
        [SWExporterTypes.InGameEffectType.SKILL1_CRITDmg_BOOST]: "Skill 1 crit damage boost",
        [SWExporterTypes.InGameEffectType.SKILL1_RECOVERY_BOOST]: "Skill 1 recovery boost",
        [SWExporterTypes.InGameEffectType.SKILL2_ACCURACY_BOOST]: "Skill 2 accuracy boost",
        [SWExporterTypes.InGameEffectType.SKILL2_CRITDmg_BOOST]: "Skill 2 crit damage boost",
        [SWExporterTypes.InGameEffectType.SKILL2_RECOVERY_BOOST]: "Skill 2 recovery boost",
        [SWExporterTypes.InGameEffectType.SKILL3_ACCURACY_BOOST]: "Skill 3 accuracy boost",
        [SWExporterTypes.InGameEffectType.SKILL3_CRITDmg_BOOST]: "Skill 3 crit damage boost",
        [SWExporterTypes.InGameEffectType.SKILL3_RECOVERY_BOOST]: "Skill 3 recovery boost",
        [SWExporterTypes.InGameEffectType.SKILL4_CRITDmg_BOOST]: "Skill 4 crit damage boost",
        [SWExporterTypes.InGameEffectType.SPEED_BY_HP_LOST]: "Speed boost by HP lost",
        [SWExporterTypes.InGameEffectType.SPEED_WHEN_BUFF]: "Speed boost when buffed",
        [SWExporterTypes.InGameEffectType.SPEED_WHEN_DISABLE]: "Speed boost when disabled",
    }

    static noop(caracteristic: number,  modifier: number) : number{
      return 0
    }

    static addition(caracteristic: number, modifier: number) : number{
      return modifier
    }

    static percent(caracteristic: number,  modifier: number) : number{
      return caracteristic * ((modifier) /100)
    }

    static effectApplier : Record<SWExporterTypes.InGameEffectType, (caract: number, modifier: number) => number> = {
        [SWExporterTypes.InGameEffectType.ATB_WHEN_REVIVE]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.ATK_BY_HP_LOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.ATK_WHEN_BUFF]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.BOMB_DAMAGE_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.COOP_DAMAGE_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.COUNTER_DAMAGE_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.CRITDmg_BAD_CONDITION]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.CRITDmg_DISABLE_REDUCTION]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.CRITDmg_GOOD_CONDITION]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.CRITRate_WHEN_BUFF]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.CRUSHING_DAMAGE_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_DARK]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_FIRE]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_LIGHT]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_WATER]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_WIND]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_ATK]: InGameEffect.percent,
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_DEF]: InGameEffect.percent,
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_HP]: InGameEffect.percent,
        [SWExporterTypes.InGameEffectType.DAMAGE_BY_SPEED]: InGameEffect.percent,
        [SWExporterTypes.InGameEffectType.DAMAGE_DISABLE_REDUCTION]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_DARK]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_FIRE]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_LIGHT]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_WATER]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_WIND]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DEF_BY_HP_LOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.DEF_WHEN_BUFF]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.HP_WHEN_REVIVE]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.LIFE_DRAIN]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.HP_WHEN_REVIVE]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.LIFE_DRAIN]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.MONO_SKILL_CritDMG_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.REFLECTED_DAMAGE_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL1_ACCURACY_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL1_CRITDmg_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL1_RECOVERY_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL2_ACCURACY_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL2_CRITDmg_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL2_RECOVERY_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL3_ACCURACY_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL3_CRITDmg_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL3_RECOVERY_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SKILL4_CRITDmg_BOOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SPEED_BY_HP_LOST]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SPEED_WHEN_BUFF]: InGameEffect.noop,
        [SWExporterTypes.InGameEffectType.SPEED_WHEN_DISABLE]: InGameEffect.noop,
    }

    static caracmodifier : Record<SWExporterTypes.InGameEffectType, SWCalculatorTypes.CaracteristicsType> = {
      [SWExporterTypes.InGameEffectType.ATB_WHEN_REVIVE]: SWCalculatorTypes.CaracteristicsType.ATB_MISSING_HEALTH,
      [SWExporterTypes.InGameEffectType.ATK_BY_HP_LOST]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.ATK_WHEN_BUFF]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.BOMB_DAMAGE_BOOST]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.COOP_DAMAGE_BOOST]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.COUNTER_DAMAGE_BOOST]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.CRITDmg_BAD_CONDITION]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.CRITDmg_DISABLE_REDUCTION]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.CRITDmg_GOOD_CONDITION]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.CRITRate_WHEN_BUFF]: SWCalculatorTypes.CaracteristicsType.CRIT_RATE,
      [SWExporterTypes.InGameEffectType.CRUSHING_DAMAGE_BOOST]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_DARK]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_FIRE]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_LIGHT]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_WATER]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BOOST_WIND]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BY_ATK]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_BY_DEF]: SWCalculatorTypes.CaracteristicsType.DEFENSE,
      [SWExporterTypes.InGameEffectType.DAMAGE_BY_HP]: SWCalculatorTypes.CaracteristicsType.HEALTH,
      [SWExporterTypes.InGameEffectType.DAMAGE_BY_SPEED]: SWCalculatorTypes.CaracteristicsType.SPEED,
      [SWExporterTypes.InGameEffectType.DAMAGE_DISABLE_REDUCTION]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_DARK]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_FIRE]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_LIGHT]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_WATER]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DAMAGE_REDUCTION_WIND]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.DEF_BY_HP_LOST]: SWCalculatorTypes.CaracteristicsType.HEALTH,
      [SWExporterTypes.InGameEffectType.DEF_WHEN_BUFF]: SWCalculatorTypes.CaracteristicsType.DEFENSE,
      [SWExporterTypes.InGameEffectType.HP_WHEN_REVIVE]: SWCalculatorTypes.CaracteristicsType.HEALTH,
      [SWExporterTypes.InGameEffectType.LIFE_DRAIN]: SWCalculatorTypes.CaracteristicsType.LIFE_STEAL,
      [SWExporterTypes.InGameEffectType.MONO_SKILL_CritDMG_BOOST]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.REFLECTED_DAMAGE_BOOST]: SWCalculatorTypes.CaracteristicsType.ATTACK,
      [SWExporterTypes.InGameEffectType.SKILL1_ACCURACY_BOOST]: SWCalculatorTypes.CaracteristicsType.ACCURACY,
      [SWExporterTypes.InGameEffectType.SKILL1_CRITDmg_BOOST]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.SKILL1_RECOVERY_BOOST]: SWCalculatorTypes.CaracteristicsType.ATB_MISSING_HEALTH,
      [SWExporterTypes.InGameEffectType.SKILL2_ACCURACY_BOOST]: SWCalculatorTypes.CaracteristicsType.ACCURACY,
      [SWExporterTypes.InGameEffectType.SKILL2_CRITDmg_BOOST]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.SKILL2_RECOVERY_BOOST]: SWCalculatorTypes.CaracteristicsType.ATB_MISSING_HEALTH,
      [SWExporterTypes.InGameEffectType.SKILL3_ACCURACY_BOOST]: SWCalculatorTypes.CaracteristicsType.ACCURACY,
      [SWExporterTypes.InGameEffectType.SKILL3_CRITDmg_BOOST]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.SKILL3_RECOVERY_BOOST]: SWCalculatorTypes.CaracteristicsType.ATB_MISSING_HEALTH,
      [SWExporterTypes.InGameEffectType.SKILL4_CRITDmg_BOOST]: SWCalculatorTypes.CaracteristicsType.CRIT_DAMAGE,
      [SWExporterTypes.InGameEffectType.SPEED_BY_HP_LOST]: SWCalculatorTypes.CaracteristicsType.SPEED,
      [SWExporterTypes.InGameEffectType.SPEED_WHEN_BUFF]: SWCalculatorTypes.CaracteristicsType.SPEED,
      [SWExporterTypes.InGameEffectType.SPEED_WHEN_DISABLE]: SWCalculatorTypes.CaracteristicsType.SPEED,
  }

    constructor(data: SWCalculatorTypes.InGameEffect) {
        this.type = data.type
        this.value = data.value
    }

    Apply(caracteristic: Caracteristics) : number {
      let damage = 0
      let modifierFunc = InGameEffect.effectApplier[this.type]
      if (modifierFunc != undefined) {
          let computedValue = InGameEffect.effectApplier[this.type](
            caracteristic.Attack,
            this.value
          )
          damage = computedValue
      }
      else {
          console.log("Effect type not supported yet", this.type)
      }
  // return object with modified value.
      return damage
    }
}