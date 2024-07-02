// This project is to look for habitable planets outside of our solar system

const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
  return (
    // Filtering by stellar flux and planet radius using habitable planet research
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

// Using the fs module to create a readable stream source of data for csv-parse to read
fs.createReadStream("kepler_data.csv")
  // The parse function is the destination for the pipe
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) habitablePlanets.push(data);
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(
      habitablePlanets.map((planet) => {
        return planet["kepler_name"];
      })
    );
    console.log(`${habitablePlanets.length} habitable planets found`);
  });
