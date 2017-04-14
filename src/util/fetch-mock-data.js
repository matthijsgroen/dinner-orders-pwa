export default function() {
  return new Promise(function(resolve) {
    resolve([
      {
        "person": "pascal@kabisa.nl",
        "voorgerecht": "Tomatensoep met bla bla hallo hier",
        "dessert": "Ijs"
        // "order": "Foo bar\n\nHello"
      },
      {
        "person": "matthijs@kabisa.nl",
        // "order": "Something\n\nElse"
        "voorgerecht": "Tomatensoep",
        "dessert": "Ijs"
      }
    ]);
  });
}
