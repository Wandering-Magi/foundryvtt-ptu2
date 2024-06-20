/*
'
██████╗ ████████╗██╗   ██╗
██╔══██╗╚══██╔══╝██║   ██║
██████╔╝   ██║   ██║   ██║
██╔═══╝    ██║   ██║   ██║
██║        ██║   ╚██████╔╝
╚═╝        ╚═╝    ╚═════╝ '
*/
import {SYSTEM} from "./config/system.mjs";
globalThis.SYSTEM = SYSTEM;
import * as GRANDFUNCTION from './helpers/grandfunctions.mjs';
globalThis.GRANDFUNCTION = GRANDFUNCTION;
// Import document classes.
import { PTUActor } from "./documents/actor.mjs";
import { TrainerData } from "./documents/trainer.mjs";
//import { TestData } from "./documents/test.mjs";
// Import sheet classes.

// Import helper/utilitie classes and constants
// import { PTU } from ".helpers/config.mjs";

function fancyLog(object) {
  const label = `PTU | ${object.constructor.name}`;
  console.group(label);
  console.dir(object);
  console.groupEnd(label);
};




/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once("init", () => {
  console.log("PTU | Initializing game system");
  game.system.CONST = SYSTEM;

  CONFIG.Actor.documentClass = PTUActor;
  Object.assign(CONFIG.Actor.dataModels, {
    trainer: TrainerData,
//    test: TestData,
  });


//   // Add utility classes to the global game object so that they're more easily accessible in global contexts
//   game.ptu = {
//     ptuTrainer,
//   };
// 
//   // Add custom constants for configuration
//   CONFIG.PTU = PTU;
// 
//   /**
//    * Set an initiative formula for the system
//    * @type {String}
//    */
//   CONFIG.Combat.initiative = {
//     formula: "1d20",
//     decimals: 2
//   };
// 
//   // Define custom document classes
//   CONFIG.Actor.dataModels = {
//     trainer: models.ptuTrainer,
//     pokemon: models.ptuPokemon,
//     npc: models.ptuNPC,
//   };
//

});

/* -------------------------------------------- */
/*  Handlebars Helpers                          */
/* -------------------------------------------- */

// If you need to add Handlebars helpers, here is a useful example:
// Handlebars.registerHelper('toLowerCase', function (str) {
//  return str.toLowerCase();
// });

/* -------------------------------------------- */
/*  Ready Hook                                  */
/* -------------------------------------------- */

Hooks.once("ready", function() {
  // Include steps that need to happen after Foundry has fully loaded here.

}); 
