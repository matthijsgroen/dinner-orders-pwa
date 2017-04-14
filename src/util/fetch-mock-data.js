export default function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve([
        {
          "person": "Pascal Widdershoven",
          "voorgerecht": "Groentensoep",
          "hoofdgerecht": "Biefstuk",
          "dessert": "Ijs"
        },
        {
          "person": "Matthijs Groen",
          "voorgerecht": "Tomatensoep",
          "hoofdgerecht": "Schnitzel",
          "dessert": "Ijs"
        }
      ]);
    }, 500);
  });
}
