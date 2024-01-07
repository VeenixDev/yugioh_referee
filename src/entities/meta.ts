export type CardType =
  | "Effect Monster"
  | "Flip Effect Monster"
  | "Flip Tuner Effect Monster"
  | "Gemini Monster"
  | "Normal Monster"
  | "Normal Tuner Monster"
  | "Pendulum Effect Monster"
  | "Pendulum Effect Monster"
  | "Pendulum Effect Ritual Monster"
  | "Pendulum Flip Effect Monster"
  | "Pendulum Normal Monster"
  | "Pendulum Tuner Effect Monster"
  | "Ritual Effect Monster"
  | "Ritual Monster"
  | "Spell Card"
  | "Spirit Monster"
  | "Toon Monster"
  | "Trap Card"
  | "Tuner Monster"
  | "Union Effect Monster"
  | "Fusion Monster"
  | "Link Monster"
  | "Pendulum Effect Fusion Monster"
  | "Synchro Monster"
  | "Synchro Pendulum Effect Monster"
  | "Synchro Tuner Monster"
  | "XYZ Monster"
  | "XYZ Pendulum Effect Monster"
  | "Token"
  | "Skill Card";

export const FusionTypes: CardType[] = [
  "Fusion Monster",
  "Pendulum Effect Fusion Monster",
];

export const SynchroTypes: CardType[] = [
  "Synchro Monster",
  "Synchro Pendulum Effect Monster",
  "Synchro Tuner Monster",
];

export const RitualTypes: CardType[] = [
  "Ritual Effect Monster",
  "Ritual Monster",
  "Pendulum Effect Ritual Monster",
];

export const XYZTypes: CardType[] = [
  "XYZ Monster",
  "XYZ Pendulum Effect Monster",
];

export const NormalTypes: CardType[] = [
  "Normal Monster",
  "Normal Tuner Monster",
  "Pendulum Normal Monster",
];

export const PendulumTypes: CardType[] = [
  "Pendulum Effect Fusion Monster",
  "Pendulum Effect Monster",
  "Pendulum Effect Ritual Monster",
  "Pendulum Flip Effect Monster",
  "Pendulum Normal Monster",
  "Pendulum Tuner Effect Monster",
  "XYZ Pendulum Effect Monster",
  "Synchro Pendulum Effect Monster",
];

export type CardFrame =
  | "normal"
  | "effect"
  | "ritual"
  | "fusion"
  | "synchro"
  | "xyz"
  | "link"
  | "normal_pendulum"
  | "effect_pendulum"
  | "ritual_pendulum"
  | "fusion_pendulum"
  | "synchro_pendulum"
  | "xyz_pendulum"
  | "spell"
  | "trap"
  | "token"
  | "skill";

export type TrapRace = "Normal" | "Permanent" | "Konter";

export type SpellRace =
  | "Normal"
  | "Spielfeld"
  | "Ausrüstung"
  | "Permanent"
  | "Schnell"
  | "Ritual";

export type MonsterRace =
  | "Aqua"
  | "Ungeheuer"
  | "Ungeheuer-Krieger"
  | "Cyberse"
  | "Dinosaurier"
  | "Göttliches Ungeheuer"
  | "Drache"
  | "Fee"
  | "Fisch"
  | "Insekt"
  | "Maschine"
  | "Pflanze"
  | "Psi"
  | "Pyro"
  | "Reptil"
  | "Fels"
  | "Seeschlange"
  | "Hexer"
  | "Donner"
  | "Krieger"
  | "Geflügeltes Ungeheuer"
  | "Wyrm"
  | "Zombie"
  | "Unterweltler"
  | "Typ Illusion";

export type Attributes =
  | "LICHT"
  | "FINSTERNIS"
  | "WASSER"
  | "FEUER"
  | "ERDE"
  | "WIND"
  | "GÖTTLICH";

export enum LinkMarkers {
  BOTTOM_LEFT = "BOTTOM_LEFT",
  BOTTOM_MIDDLE = "BOTTOM_MIDDLE",
  BOTTOM_RIGHT = "BOTTOM_RIGHT",
  MIDDLE_LEFT = "BOTTOM_LEFT",
  MIDDLE_RIGHT = "BOTTOM_RIGHT",
  TOP_LEFT = "TOP_LEFT",
  TOP_MIDDLE = "TOP_MIDDLE",
  TOP_RIGHT = "TOP_RIGHT",
}
