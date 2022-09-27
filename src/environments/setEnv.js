function setEnv() {
    fs = require("fs");
    writeFile = fs.writeFile;
    // Configure Angular `environment.prod.json` file path
    targetPath = "./src/environments/environment.prod.ts";
  
    // `environment.prod.json` file structure
    envConfigFile = `export const environment = {
        production: true,
        apiUsers: "https://ssmd-noroff-assigment5-api.herokuapp.com/trainers",
        apiPokemon: "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0",
        apiPokemonImgUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/",
        apiKey: '${process.env.apiKey}',
      };
      `
  
    console.log(
      "The file `environment.prod.json` will be written with the following content: \n"
    );
    writeFile(targetPath, envConfigFile, function (err) {
      if (err) {
        console.error(err);
        throw err;
      } else {
        console.log(
          "Angular environment.prod.json file generated correctly at" +
            targetPath +
            "\n"
        );
      }
    });
  }
  
  setEnv();