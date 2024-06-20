export class TestData extends foundry.abstract.TypeDataModel {
  static defineSchea() {
    const fields = foundry.data.fields;
    const schema = {};

    schema.health = new fields.NumberField({
      initial: 1
    });
    return schema; 
  }
};
