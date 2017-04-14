export default function() {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve([
        {
          "person": "pascal@kabisa.nl",
          "voorgerecht": "Groentensoep",
          "hoofdgerecht": "Biefstuk",
          "dessert": "Ijs"
        },
        {
          "person": "matthijs@kabisa.nl",
          "voorgerecht": "Tomatensoep",
          "hoofdgerecht": "Schnitzel",
          "dessert": "Ijs"
        }
      ]);
    }, 500);
  });
}
