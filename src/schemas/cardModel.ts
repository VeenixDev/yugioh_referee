import mongoose from "mongoose";
import { Card, Monster, Spell, Trap } from "../entities/card";

const Schema = mongoose.Schema;
const Type = Schema.Types;

const cardTypes = Object.freeze([
  "Effect Monster",
  "Flip Effect Monster",
  "Flip Tuner Effect Monster",
  "Gemini Monster",
  "Normal Monster",
  "Normal Tuner Monster",
  "Pendulum Effect Monster",
  "Pendulum Effect Monster",
  "Pendulum Effect Ritual Monster",
  "Pendulum Flip Effect Monster",
  "Pendulum Normal Monster",
  "Pendulum Tuner Effect Monster",
  "Ritual Effect Monster",
  "Ritual Monster",
  "Spell Card",
  "Spirit Monster",
  "Toon Monster",
  "Trap Card",
  "Tuner Monster",
  "Union Effect Monster",
  "Fusion Monster",
  "Link Monster",
  "Pendulum Effect Fusion Monster",
  "Synchro Monster",
  "Synchro Pendulum Effect Monster",
  "Synchro Tuner Monster",
  "XYZ Monster",
  "XYZ Pendulum Effect Monster",
  "Token",
  "Skill Card",
]);

const frameTypes = Object.freeze([
  "normal",
  "effect",
  "ritual",
  "fusion",
  "synchro",
  "xyz",
  "link",
  "normal_pendulum",
  "effect_pendulum",
  "ritual_pendulum",
  "fusion_pendulum",
  "synchro_pendulum",
  "xyz_pendulum",
  "spell",
  "trap",
  "token",
  "skill",
]);

const trapRace = ["Normal", "Permanent", "Konter"];
const spellRace = [
  "Normal",
  "Spielfeld",
  "Ausrüstung",
  "Permanent",
  "Schnell",
  "Ritual",
];
const monsterRace = [
  "Aqua",
  "Ungeheuer",
  "Ungeheuer-Krieger",
  "Cyberse",
  "Dinosaurier",
  "Göttliches Ungeheuer",
  "Drache",
  "Fee",
  "Fisch",
  "Insekt",
  "Maschine",
  "Pflanze",
  "Psi",
  "Pyro",
  "Reptil",
  "Fels",
  "Seeschlange",
  "Hexer",
  "Donner",
  "Krieger",
  "Geflügeltes Ungeheuer",
  "Wyrm",
  "Zombie",
  "Unterweltler",
  "Typ Illusion",
];

const attributes = Object.freeze([
  "LICHT",
  "FINSTERNIS",
  "WASSER",
  "FEUER",
  "ERDE",
  "WIND",
  "GÖTTLICH",
]);

const linkMarkers = Object.freeze([
  "BOTTOM_LEFT",
  "BOTTOM_MIDDLE",
  "BOTTOM_RIGHT",
  "MIDDLE_LEFT",
  "MIDDLE_RIGHT",
  "TOP_LEFT",
  "TOP_MIDDLE",
  "TOP_RIGHT",
]);

const cardSchema = new Schema<Card | Monster | Spell | Trap>({
  // All Cards
  id: {
    type: Type.String,
    required: true,
    unique: true,
  },
  name: {
    type: Type.String,
    required: true,
    unique: true,
    index: true,
  },
  name_lower: {
    type: Type.String,
    required: true,
    unique: true,
    index: true,
  },
  type: {
    type: Type.String,
    enum: cardTypes,
    required: true,
  },
  frame: {
    type: Type.String,
    enum: frameTypes,
    required: true,
  },
  description: {
    type: Type.String,
    required: true,
  },
  //Monster Cards
  atk: {
    type: Type.String,
    matches: /^(\?|\d+)$/,
    required: false,
  },
  def: {
    type: Type.String,
    matches: /^(\?|\d+)$/,
    required: false,
  },
  level: {
    type: Type.Number,
    required: false,
    min: 1,
  },
  attribute: {
    type: Type.String,
    enum: attributes,
    required: false,
  },
  // Pendulum
  scale: {
    type: Type.Number,
    min: 0,
    required: false,
  },
  // Link
  linkval: {
    type: Type.Number,
    required: false,
    min: 0,
  },
  linkmarkers: [
    {
      type: Type.String,
      enum: linkMarkers,
      required: false,
    },
  ],
  // Monsters, Spells/Traps
  race: {
    type: Type.String,
    enum: [...spellRace, ...trapRace, ...monsterRace],
    required: false,
  },
  // Archetypes
  archtype: {
    type: Type.String,
    required: false,
  },
  images: [
    {
      type: Type.ObjectId,
      ref: "image",
    },
  ],
});

export default mongoose.model("card", cardSchema);
