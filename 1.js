class cards {
  constructor() {
    this.array = [];
  }
  AddCard(book) {
    this.array.push(book);
  }
}

let something = new cards();
// [];
let object = {
  name: "zilola",
  nation: "uzbek",
}

something.AddCard(object);

console.log(something);
//[{
//   name: "zilola",
//   nation: "uzbek",
// }]