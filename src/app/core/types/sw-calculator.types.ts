import { SWExporterTypes } from "./sw-exporter.types"

export namespace SWCalculatorTypes {

    export enum CaracteristicsType {
        HEALTH = "Health",
        ATTACK = "Attack",
        DEFENSE = "Defense",
        SPEED = "Spd",
        /// Following stats are in %.
        CRIT_RATE = "Critical Rate",
        CRIT_DAMAGE = "Critical Damage",
        RESISTANCE = "Resistance",
        ACCURACY = "Accuracy",
        /// Following stats are hidden and serves as counter, to fast access
        WILL = "Will",
        SHIELD = "Shield",
        REPLAY_CHANCE = "Replay Chance",
        STUN_CHANCE = "Stun Chance",
        LIFE_STEAL = "Life Steal",
        ATB_MISSING_HEALTH = "ATB per missing HP%",
        COUNTER_ATTACK_CHANCE = "Counter attack chance",
        HPPercent_DESTRUCTION = "HP% destruction",
    }

    export enum EffectType {
        HP = 1,
        HPPercent,
        ATK,
        ATKPercent,
        DEF,
        DEFPercent,
        SPEED = 8,
        CRITRate,
        CRITDmg,
        RES,
        ACC,
        // SET EFFECTS
        WILL = 20,
        SHIELD,
        REPLAY_CHANCE,
        STUN_CHANCE,
        LIFE_STEAL,
        ATB_MISSING_HEALTH,
        COUNTER_ATTACK_CHANCE,
        HPPercent_DESTRUCTION,

        // Artifact EFFECTS
        ARTIFACT_HP = 100,
        ARTIFACT_ATK = 101,
        ARTIFACT_DEF = 102,

        // Additional EFFECTS
        SPEEDPercent = 1000
    }

    export interface Effect {
        type: SWExporterTypes.EffectType
        gems: number
        value: number
        grindstones: number

        // Use specifically for prefix effect and addition operations.
        effect_reducer: number
    }

    export interface RuneSecondaryEffect {
        type: SWExporterTypes.EffectType
        gems: number
        value: number
        grindstones: number

        // Use specifically for prefix effect and addition operations.
        effect_reducer: number
    }

    export interface InGameEffect {
        type: SWExporterTypes.InGameEffectType
        value: number
    }

    export interface Rune {
        setType: SWExporterTypes.SetType /// Use set ID.
        isAntique: boolean
        stars: number // 1 - 6
        class: any
        extra: SWExporterTypes.Extra
        rank: SWExporterTypes.Rank
        slotFactor: SWExporterTypes.RuneSlot

        innateEffect: Effect
        primaryEffect: Effect
        secondaryEffects: Effect[]
        secondaryEffectsUpgraded: { index: number, gemsArray: number[] }


        sellValue: number

        maxUpgradeLevel: number
        upgradeLevel: number
        unitImage?: string

        // efficiency
        efficiency: number
        maxEfficiency: number
    }

    export interface Artifact {
        slot: ArtifactSlot
        attribute: SWExporterTypes.Attribute
        type: SWExporterTypes.Archetype
        extra: number;
        rank: number
        level: number
        primaryEffect: Effect
        secondaryEffects: InGameEffect[]
    }

    export enum ArtifactSlot {
        ELEMENT = 1,
        TYPE
    }

    export interface Unit {
        spells: any[];
        skills: any[];
        id: number
        name: string
        image: string
        level: number
        attribute: SWExporterTypes.Attribute
        archetype: SWExporterTypes.Archetype
        // Stats
        baseCaracteristics: Record<CaracteristicsType, number>
        //enabledRuneSets: RuneSet[] 
        runes: Record<SWExporterTypes.RuneSlot, Rune | null>
        artifacts: Record<ArtifactSlot, Artifact | null>
    }


    export class BuildingMetaData {

        constructor(
            readonly name: string,
            readonly effectType: SWExporterTypes.EffectType,
            readonly baseBonus: number,
            readonly bonusPerLevel: number,
            readonly minLevel: number,
            readonly maxLevel: number,
            readonly type: SWExporterTypes.BuildingType
        ) { }
    }

    export interface Building {
        id: number
        level: number

        metadata: BuildingMetaData
        effect: Effect
    }
}