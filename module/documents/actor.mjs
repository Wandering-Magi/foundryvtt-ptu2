/**
 * @extends {Actor}
 */
export class PTUActor extends Actor {
  /**@override */
  prepareData() {
    // Prepare data for the actor. Calling the super version of this executes
    // the following, in order: data reset (to clear active effects),
    // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
    // prepareDerivedData().
    super.prepareData();
  }

  /** @override */
  prepareBaseData() {
    // Data modifications in this step occur before processing embedded
    // documents or derived data.
  }
  /**
   * @override
   * Augment the basic actor data with additional dynamic data. Typically, you'll want to handle most of your calculated/derived data in this step. Data calculated in this step should generally not exist in template.json (such as ability modifiers rather than ability scores) and should be available both inside and outside of character sheets (such as if an actor is queried and has a roll executed directly from it).
   */
  prepareDerivedData() {
    const actorData = this;
    const systemData = actorData.system;
    const flags = actorData.flags.ptu || {};

    // Seperate methods for each actor type
    this._prepareTrainerData(actorData);
    this._preparePokemonData(actorData);
  }

  /**
   * Prepare Character type specific data
   */
  _prepareTrainerData(actorData) {
    if (!(this.system instanceof TrainerData)) return;
    let trainer = this.system;
  } 
}

const fields = foundry.data.fields;
const COMMONSTATS = () => {
  const statArr = ["hp", "atk", "def", "satk", "sdef", "spd"];
  return {
    stats: new fields.SchemaField(statArr.reduce((acc, stat) => {
        acc[stat] = new fields.SchemaField({    
          base: new fields.NumberField({ initial: 0 }),
          feats: new fields.NumberField({ initial: 0 }),
          bonus: new fields.NumberField({ initial: 0 }), //Maybe have this as an effect
          level: new fields.NumberField({ initial: 0 }),
         cs: new fields.NumberField({ initial: 0 }) 
        })
        return acc;
      }, {})
    )
  }
}

const COMMONACTORDATA = () => {
  return {
    stats: new fields.SchemaField({
      hp:new fields.SchemaField({
        ...COMMONSTATS()
      }),
      atk:new fields.SchemaField({
        ...COMMONSTATS()
      }),

    })
  }
}

class TrainerData extends foundry.abstract.TypeDataModel {
  static defineSchema() {
    const fields = foundry.data.fields;
    return {
      biography: new fields.HTMLField(),
      personality: new fields.HTMLField(),
      description: new fields.HTMLField(),
      goals: new fields.HTMLField(),
      notes: new fields.HTMLField(),
      ...COMMONSTATS()
    }
  }
}

