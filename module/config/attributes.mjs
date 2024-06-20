/*
  * The field of skills for all actors
  * @type {{
    *   hp: {id: string, label: string, abbreviation: string},
      *   atk: {id: string, label: string, abbreviation: string},
      *   def: {id: string, label: string, abbreviation: string},
      *   satk: {id: string, label: string, abbreviation: string}, 
      *   sdef: {id: string, label: string, abbreviation: string}, 
      *   spd: {id: string, label: string, abbreviation: string},
      * }}
  */
  export const STATS = Object.freeze({
    hp: {
      id: "hp",
      label: "Stat.Long.HP",
      abbreviation: "Stat.Short.HP" 
    },
    atk: {
      id: "atk",
      label: "Stat.Long.atk",
      abbreviation: "Stat.Short.atk" 
    },
    def: {
      id: "def",
      label: "Stat.Long.def",
      abbreviation: "Stat.Short.def" 
    },
    satk: {
      id: "satk",
      label: "Stat.Long.satk",
      abbreviation: "Stat.Short.satk" 
    },
    sdef: {
      id: "sdef",
      label: "Stat.Long.sdef",
      abbreviation: "Stat.Short.sdef" 
    },
    spd: {
      id: "spd",
      label: "Stat.Long.spd",
      abbreviation: "Stat.Short.spd" 
    },
  });

/**
  * The list of skills for an actor
  * @type {{
    *   acrobatics: {id: string, label: string, catagory: string },       
      *   athletics: {id: string, label: string, catagory: string },
      *   charm: {id: string, label: string, catagory: string },
      *   combat: {id: string, label: string, catagory: string },
      *   command: {id: string, label: string, catagory: string },
      *   gened: {id: string, label: string, catagory: string },
      *   meded: {id: string, label: string, catagory: string },
      *   occed: {id: string, label: string, catagory: string },
      *   poked: {id: string, label: string, catagory: string },
      *   teced: {id: string, label: string, catagory: string },
      *   focus: {id: string, label: string, catagory: string },
      *   guile: {id: string, label: string, catagory: string },
      *   intimidate: {id: string, label: string, catagory: string },
      *   intuition: {id: string, label: string, catagory: string },
      *   perception: {id: string, label: string, catagory: string },
      *   stealth: {id: string, label: string, catagory: string },
      *   survival: {id: string, label: string, catagory: string },
      * }}
  */ 
  export const SKILLS = Object.freeze({
    acrobatics: {
      id: "acrobatics",
      label: "Skill.Name.Acrobatics",
      catagory: "Skill.Type.Body",
    },
    athletics: {
      id: "athletics",
      label: "Skill.Name.Athletics",
      catagory: "Skill.Type.Body",
    },
    charm: {
      id: "charm",
      label: "Skill.Name.Charm",
      catagory: "Skill.Type.Spirit",
    },
    combat: {
      id: "combat",
      label: "Skill.Name.Combat",
      catagory: "Skill.Type.Body",
    },
    command: {
      id: "command",
      label: "Skill.Name.Command",
      catagory: "Skill.Type.Spirit",
    },
    gened: {
      id: "gened",
      label: "Skill.Name.Gened",
      catagory: "Skill.Type.Mind",
    },
    meded: {
      id: "meded",
      label: "Skill.Name.Meded",
      catagory: "Skill.Type.Mind",
    },
    occed: {
      id: "occed",
      label: "Skill.Name.Occed",
      catagory: "Skill.Type.Mind",
    },
    poked: {
      id: "poked",
      label: "Skill.Name.Poked",
      catagory: "Skill.Type.Mind",
    },
    teced: {
      id: "teced",
      label: "Skill.Name.Teced",
      catagory: "Skill.Type.Mind",
    },
    focus: {
      id: "focus",
      label: "Skill.Name.Focus",
      catagory: "Skill.Type.Spirit",
    },
    guile: {
      id: "guile",
      label: "Skill.Name.Guile",
      catagory: "Skill.Type.Mind",
    },
    intimidate: {
      id: "intimidate",
      label: "Skill.Name.Intimidate",
      catagory: "Skill.Type.Body",
    },
    intuition: {
      id: "intuition",
      label: "Skill.Name.Intuition",
      catagory: "Skill.Type.Spirit",
    },
    perception: {
      id: "perception",
      label: "Skill.Name.Perception",
      catagory: "Skill.Type.Mind",
    },
    stealth: {
      id: "stealth",
      label: "Skill.Name.Stealth",
      catagory: "Skill.Type.Body",
    },
    survival: {
      id: "survival",
      label: "Skill.Name.Survival",
      catagory: "Skill.Type.Body",
    }
  });
/*
  * The ranks a skill may achieve
  * */
  export const SKILLRANKS = Object.freeze({
    1: {
      id: "pathetic",
      rank: 1,
      label: "PTU.Skill.Rank.Pathetic"
    },
    2: {
      id: "untrained",
      rank: 2,
      label: "PTU.Skill.Rank.Untrained"
    },
    3: {
      id: "novice",
      rank: 3,
      label: "PTU.Skill.Rank.Novice"
    },
    4: {
      id: "adept",
      rank: 4,
      label: "PTU.Skill.Rank.Adept"
    },
    5: {
      id: "expert",
      rank: 5,
      label: "PTU.Skill.Rank.Expert"
    },
    6: {
      id: "master",
      rank: 6,
      label: "PTU.Skill.Rank.Master"
    },
    8: {
      id: "virtuoso",
      rank: 8,
      label: "PTU.Skill.Rank.Virtuoso"
    }
  });
