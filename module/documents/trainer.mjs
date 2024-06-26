import { fancyLog } from "../helpers/grandfunctions.mjs";

export class TrainerData extends foundry.abstract.TypeDataModel {
  /* -------------------------------------------- */
  /*  Data Schema                                 */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static defineSchema() {
    const fields = foundry.data.fields;
    const requiredInteger = {required: true, nullable: false, integer: true};
    const schema = {};
    
    // Build out the trainer skill tree
    const skillField = label => new fields.SchemaField({
      rank: new fields.NumberField({...requiredInteger,  initial: 2, min: 1, max: 8 }),
      modifier: new fields.StringField({ initial: "" }),
    }, {/*Validation Step*/});
    schema.skills = new fields.SchemaField(Object.values(SYSTEM.SKILLS).reduce((obj, skill) => {
      obj[skill.id] = skillField( skill.label );
      return obj;
    }, {}));

    // Build out the trainer stats tree
    const statField = label => new fields.SchemaField({
      base: new fields.NumberField({ ...requiredInteger, initial: ( label.toString() == "Stat.Long.HP"? 10 : 5 ) }),
      level: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      cs: new fields.NumberField({ ...requiredInteger, initial: 0, min: -6, max: 6 }) 
    }, {/*Validation Step*/});
    schema.stats = new fields.SchemaField(Object.values(SYSTEM.STATS).reduce((obj, stat) => {
      obj[stat.id] = statField(stat.label);
      return obj;
    }, {}));

    // Descriptive and personal details about the trainer
    schema.details = new fields.SchemaField({
      trainerId: new fields.StringField({ initial: Math.floor(Math.random(1e6) * 1e6).toString() }), // The trainer ID for their card, not the actor ID
      biography: new fields.HTMLField({ initial: ""}),
      description: new fields.HTMLField({ initial: ""}),
      personality: new fields.HTMLField({ initial: ""}),
      goals: new fields.HTMLField({ initial: ""}),
      notes: new fields.HTMLField({ initial: ""}),

      sex: new fields.StringField({ initial: "" }),
      age: new fields.StringField({ initial: "" }),
      height: new fields.StringField({ initial: "" }),
      weight: new fields.StringField({ initial: "" }),
      
      // NOTE: Should background be an item?
      background: new fields.SchemaField({
        name: new fields.StringField({ inintial: "" }),
        description: new fields.StringField({ initial: "" }),
        adept: new fields.StringField({ initial: "" }),
        novice: new fields.StringField({ initial: "" }),
        pathetic: new fields.SchemaField({
          1: new fields.StringField({ initial: "" }),
          2: new fields.StringField({ initial: "" }),
          3: new fields.StringField({ initial: "" })
        })
      })
    }); 

    // Resources that can be spent by the trainer
    schema.resources = new fields.SchemaField({
      ap: new fields.SchemaField({
        used: new fields.SchemaField({
          spent: new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 }),
        }),
      }),
      health: new fields.SchemaField({
        value: new fields.NumberField({ ...requiredInteger, initial: 42, min: 0 }),
        injuries: new fields.NumberField({  ...requiredInteger, initial: 0, min: 0  })
      }),
    });

    schema.money = new fields.NumberField({ ...requiredInteger, initial: 0, min: 0 });
    schema.level = new fields.NumberField({ ...requiredInteger, initial: 0 });
    schema.exp = new fields.SchemaField({
      milestone: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      dexExp: new fields.NumberField({ ...requiredInteger, initial: 0 }),
      misc: new fields.NumberField({ ...requiredInteger, initial: 0 }),
    });

    return schema;
  };
 
  /** @override */
//   async _preCreate(data, options, user) {
//     await this.#generateTrainerID(data, options, user);
//   };
// 
//   #generateTrainerID(data, options, user) {
//     super._preCreate(data, options, user);
//     this.updateSource({
//        img: 'systems/ptu/image/pikachu-silhouette.svg',
//     });
//   };
 
  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
    this.#initializeStats();
    this.#initializeAP();
  };
 
  #initializeStats() {
    for (let stat in this.stats) {
      fancyLog(stat);
      this.stats[stat].bonus = 0;
      this.stats[stat].feats = 0;
    };
  };

  #initializeAP() {
    this.resources.ap.max = 5;
    let apUsed = this.resources.ap.used;
    apUsed.bound = 0;
    apUsed.drained = 0;
  };

  /**
   * @override
   * Augment the actor source data with additional dynamic data. Typically,
   * you'll want to handle most of your calculated/derived data in this step.
   * Data calculated in this step should generally not exist in template.json
   * (such as ability modifiers rather than ability scores) and should be
   * available both inside and outside of character sheets (such as if an actor
   * is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    console.log(`PTU | Prepare Derived Data for ${this.parent.name}` );
    this.#prepareLevelandExp();
    this.#prepareStats();
    this.#prepareSkills();
    this.#prepareResources();

    fancyLog(this.parent);
  };

  #prepareLevelandExp() {
    let expTotal = Object.keys(this.exp).reduce((acc, key) => {
      if( key == "milestone" ) return acc + ( this.exp[key] * 10 );
      return acc + this.exp[key];
    }, 0);
    this.exp.value = expTotal;
    this.level = Math.floor( expTotal / 10 ) + 1;
  };
  
  #prepareStats() {
    function combatStageCalculation( cs ) {
      if( !cs ) return 1;
      return cs >= 1? 
        1 + ( cs * 0.2 )
        : 1 - ( cs * 0.1 );
    };
    
    for ( let trainerStat of Object.keys(this.stats) ) {
      let statTotal = Object.keys(this.stats[trainerStat]).reduce((acc, key) => {
        if( key == "cs" ) return acc;
        return acc + this.stats[trainerStat][key];
      }, 0);

      this.stats[trainerStat].total = Math.floor( statTotal * combatStageCalculation( this.stats[trainerStat].cs ) );
    }; 
  };

  #prepareSkills() {  
    console.log(`PTU | Prepare Skills`);
    this.skills = Object.keys(this.skills).reduce((acc, key) => {
      let curSkill = this.skills[key];
      let modifierString = !curSkill.modifier? `` : ` + ${curSkill.modifier}`;
      acc[key] = this.skills[key];
      acc[key]['roll'] = `${ curSkill.rank }d6${ modifierString }`;

      return acc;
    }, {});
  };

  #prepareResources() {
    let r = this.resources;
    r.health.max = 10 + (this.level * 2) + (this.stats.hp.total * 3);
    
    r.ap.max += Math.floor( this.level / 5 );
    r.ap.value = r.ap.max - Object.values(r.ap.used).reduce((acc, v) => {
      acc += v;
    }, 0);
  };
};
