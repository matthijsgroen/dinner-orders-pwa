export default function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve([
        {
          "person": "Matthijs Groen",
          "voorgerecht": "Tomatensoep",
          "hoofdgerecht": "Schnitzel",
          "dessert": "Ijs"
        },
        {
          "person": "Pascal Widdershoven",
          "voorgerecht": "Groentensoep",
          "hoofdgerecht": "Biefstuk",
          "dessert": "Ijs"
        }
      ]);
    }, 500);
  });
}
