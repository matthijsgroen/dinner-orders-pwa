export default class Order {
  constructor(json) {
    const { person, ...rest } = json;
    this.person = person;
    this.columns = rest;
  }
}
