export namespace SWExporterTypes {

    export interface WizardInfo {
        wizard_id: number
        wizard_name: string
        wizard_mana: number
        wizard_crystal: number
        wizard_crystal_paid: number
        wizard_last_login: Date
        wizard_last_country: string
        wizard_last_lang: string
        wizard_level: string
        experience: number
        wizard_energy: number
        energy_max: number
        energy_per_min: number
        next_energy_gain: number
        arena_energy: number
        arena_energy_max: number
        arena_energy_next_gain: number
        unit_slots: {
            number: number
        }
        rep_unit_id: number
        rep_assigned: number
        pvp_event: number
        mail_box_event: number
        social_point_current: number
        social_point_max: number
        honor_point: number
        guild_point: number
        darkportal_energy: number
        darkportal_energy_max: number
        costume_point: number
        costume_point_max: number
        honor_medal: number
        honor_mark: number
        event_coin: number
        lobby_master_id: number
        emblem_master_id: number
        period_energy_max: number
    }
  
    export enum BuildingType {
        GUARDSTONE=4,
        SKY_TRIBE_TOTEM=6,
        CRYSTAL_ALTAR=8,
        ANCIENT_SWORD=9,
        FIRE_SANCTUARY=15,
        WATER_SANCTUARY=16,
        WIND_SANCTUARY=17,
        LIGHT_SANCTUARY=18,
        DARK_SANCTUARY=19,
        FALLEN_ANCIENT_GUARDIAN=31
    }
  
    export interface Building {
        building_id: number
        wizard_id: number
        island_id: number
        building_master_id: number
        pos_x: number
        pos_y: number
        gain_per_hour: number
        harvest_max?: number
        harvest_available?: number
        next_harvest?: number
    }
  
    export interface Deco {}
    export interface Obstacle{}
    export interface Mob{}
  
    export interface Skill{}
  
    export enum Extra {
        COMMON =1,
        MAGIC,
        RARE,
        HEROIC,
        LEGENDARY,
        ANCIENT_COMMON = 11,
        ANCIENT_MAGIC,
        ANCIENT_RARE,
        ANCIENT_HEROIC,
        ANCIENT_LEGENDARY,
    }
  
    // TODO reorganise in the appropriate order.
    export enum RuneSlot {
        UP =1,
        UP_RIGHT,
        DOWN_RIGHT,
        DOWN,
        DOWN_LEFT,
        UP_LEFT,
    }
  
    export enum ArtifactSlot {
        TYPE=1,
        ELEMENT
    }
  
    export enum EffectType {
        HP =1,
        HPPercent,
        ATK,
        ATKPercent,
        DEF,
        DEFPercent,
        SPEED =8,
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
        ARTIFACT_HP=100,
        ARTIFACT_ATK=101,
        ARTIFACT_DEF=102,
  
        // Additional EFFECTS
        SPEEDPercent=1000
    }
  
    export enum InGameEffectType {
        // ARTIFACT SECONDARY EFFECTS.
        ATK_BY_HP_LOST=200,
        DEF_BY_HP_LOST,
        SPEED_BY_HP_LOST,
        SPEED_WHEN_DISABLE,
        ATK_WHEN_BUFF,
        DEF_WHEN_BUFF,
        SPEED_WHEN_BUFF,
        CRITRate_WHEN_BUFF,
        COUNTER_DAMAGE_BOOST,
        COOP_DAMAGE_BOOST,
        BOMB_DAMAGE_BOOST,
        REFLECTED_DAMAGE_BOOST,
        CRUSHING_DAMAGE_BOOST, // ??
        DAMAGE_DISABLE_REDUCTION,
        CRITDmg_DISABLE_REDUCTION,
        LIFE_DRAIN,
        HP_WHEN_REVIVE,
        ATB_WHEN_REVIVE,
        DAMAGE_BY_HP,
        DAMAGE_BY_ATK,
        DAMAGE_BY_DEF,
        DAMAGE_BY_SPEED,
        CRITDmg_GOOD_CONDITION,
        CRITDmg_BAD_CONDITION,
        MONO_SKILL_CritDMG_BOOST,
        // Damage boost when target is of element
        DAMAGE_BOOST_FIRE = 300,
        DAMAGE_BOOST_WATER,
        DAMAGE_BOOST_WIND,
        DAMAGE_BOOST_LIGHT,
        DAMAGE_BOOST_DARK,
        // Damage reduction when target is of element.
        DAMAGE_REDUCTION_FIRE,
        DAMAGE_REDUCTION_WATER,
        DAMAGE_REDUCTION_WIND,
        DAMAGE_REDUCTION_LIGHT,
        DAMAGE_REDUCTION_DARK,
        // Skills bonus
        SKILL1_CRITDmg_BOOST=400,
        SKILL2_CRITDmg_BOOST,
        SKILL3_CRITDmg_BOOST,
        SKILL4_CRITDmg_BOOST,
        SKILL1_RECOVERY_BOOST,
        SKILL2_RECOVERY_BOOST,
        SKILL3_RECOVERY_BOOST,
        SKILL1_ACCURACY_BOOST,
        SKILL2_ACCURACY_BOOST,
        SKILL3_ACCURACY_BOOST,
    }
  
    export enum SetType {
        ENERGY=1,
        GUARD,
        SWIFT,
        BLADE,
        RAGE,
        FOCUS,
        ENDURE,
        FATAL,
        DESPAIR=10,
        VAMPIRE,
        VIOLENT=13,
        NEMESIS,
        WILL,
        SHIELD,
        REVENGE,
        DESTROY,
        FIGHT,
        DETERMINATION,
        ENHANCE,
        ACCURACY,
        TOLERANCE,
        IMMEMORIAL=99
    }
  
    export enum Rank {
        COMMON = 1,
        MAGIC,
        RARE,
        HEROIC,
        LEGENDARY,
        ANCIENT_COMMON = 11,
        ANCIENT_MAGIC,
        ANCIENT_RARE,
        ANCIENT_HEROIC,
        ANCIENT_LEGENDARY,
    }
  
    export interface Effect {
        [0]: EffectType | InGameEffectType
        [1]: number
    }
  
    export interface RuneSecondaryEffect extends Effect {
        [2]: number
        [3]: number
    }
  
    export interface Rune {
        rune_id: number
        wizard_id: number
        occupied_type: number
        occupied_id: number
        slot_no: RuneSlot
        extra: number
        rank: number         // 0-5 are normal rank, 10-16 are normal rank + antique bit.
        class: number        // 0-5 are normal rank, 10-16 are normal rank + antique bit.
        set_id: SetType
        ugrade_limit: number
        upgrade_curr: number
        base_value: number
        sell_value: number
  
        pri_eff: Effect
        prefix_eff: Effect
        sec_eff: RuneSecondaryEffect[]
    }
  
    export enum Attribute {
        WATER=1,
        FIRE,
        WIND,
        LIGHT,
        DARK
    }
  
    export enum Archetype {
        ATTACK=1,
        DEFENSE,
        HP,
        SUPPORT
    }
  
    export interface Artifact {
        slot: ArtifactSlot
        attribute: Attribute
        type: Archetype
        extra: number
        rank: number
        level: number
        pri_effect: Effect
        sec_effects: Effect[]
    }
  
    export interface Unit{
        unit_id: number
        wizard_id: number
        unit_master_id: number // Com2US ID
        island_id: number
        building_id: number
  
        unit_level: number
        class: number
        // Caracs
        atk: number
        def: number
        spd: number
        resist: number
        accuracy: number
        critical_damage: number
        critical_rate: number
        experience: number
        exp_gained: number
        exp_gain_rate: number
  
        skills: Skill[]
  
        runes: Rune[]
        artifacts: Artifact[]
  
        costume_master_id: number
        trans_items: any[]
        attribute: Attribute    
        create_time: Date
        source: number
        homunculus: number
        homunculus_name: string
        awakening_info: any[]
    }
  }