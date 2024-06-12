/*
'
██████╗ ████████╗██╗   ██╗
██╔══██╗╚══██╔══╝██║   ██║
██████╔╝   ██║   ██║   ██║
██╔═══╝    ██║   ██║   ██║
██║        ██║   ╚██████╔╝
╚═╝        ╚═╝    ╚═════╝ '
*/
// Toast 
// Import document classes.
import { PTUActor } from "./documents/actor.mjs";
// Import sheet classes.

// Import helper/utilitie classes and constants
import { PTU } from ".helpers/config.mjs";

/* -------------------------------------------- */
/*  Init Hook                                   */
/* -------------------------------------------- */

Hooks.once("init", function () {
  // Add utility classes to the global game object so that they're more easily accessible in global contexts
  game.ptu = {
    ptuTrainer,
  };

  // Add custom constants for configuration
  CONFIG.PTU = PTU;

  /**
   * Set an initiative formula for the system
   * @type {String}
   */
  CONFIG.Combat.initiative = {
    formula: "1d20",
    decimals: 2
  };

  // Define custom document classes
  CONFIG.Actor.documentClass = PTUActor;
  CONFIG.Actor.dataModels = {
    trainer: models.ptuTrainer,
    pokemon: models.ptuPokemon,
    npc: models.ptuNPC,
  };

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
