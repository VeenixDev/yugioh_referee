import {
  CardFrame,
  CardType,
  LinkMarkers,
  SpellRace,
  TrapRace,
} from "../entities/meta";

const LINK_REGEXP = /link\d{1,9}/;

export function gatherLinkInformation(linkElement: HTMLSpanElement): {
  linkvalue: number;
  linkmarkers: LinkMarkers[];
} {
  const linkMarkerElement = linkElement.firstElementChild;
  const linkMarkerElementClassList = linkMarkerElement?.classList || [];

  let linkMarkers: Array<LinkMarkers> = [];

  for (let clazz of linkMarkerElementClassList) {
    if (LINK_REGEXP.test(clazz)) {
      const linkNumbers = clazz.substring("link".length);
      for (let i = 0; i < linkNumbers.length; i++) {
        const currentNum = linkNumbers.charAt(i);
        switch (currentNum) {
          case "1":
            linkMarkers.push(LinkMarkers.BOTTOM_LEFT);
            break;
          case "2":
            linkMarkers.push(LinkMarkers.BOTTOM_MIDDLE);
            break;
          case "3":
            linkMarkers.push(LinkMarkers.BOTTOM_RIGHT);
            break;
          case "4":
            linkMarkers.push(LinkMarkers.MIDDLE_LEFT);
            break;
          case "6":
            linkMarkers.push(LinkMarkers.MIDDLE_RIGHT);
            break;
          case "7":
            linkMarkers.push(LinkMarkers.TOP_LEFT);
            break;
          case "8":
            linkMarkers.push(LinkMarkers.TOP_MIDDLE);
            break;
          case "9":
            linkMarkers.push(LinkMarkers.TOP_RIGHT);
            break;
          default:
            throw new Error(`Unexpected linkmarker identifier: ${currentNum}`);
        }
      }
    }
  }
  return {
    linkvalue: linkMarkers.length,
    linkmarkers: linkMarkers,
  };
}

declare type SpellTrapTypeResult = {
  cardType: CardType;
  cardFrame: CardFrame;
  spellTrapRace: SpellRace | TrapRace;
};

declare type MonsterTypeResult = {
  cardType: CardType;
  cardFrame: CardFrame;
};

export function determineSpellOrTrapType(symbol: string): SpellTrapTypeResult {
  const includes = (search: string) =>
    symbol.toLowerCase().includes(search.toLowerCase());

  const isSpell = includes("zauber");

  const genRes = (race: SpellRace | TrapRace): SpellTrapTypeResult => {
    return {
      cardType: isSpell ? "Spell Card" : "Trap Card",
      cardFrame: isSpell ? "spell" : "trap",
      spellTrapRace: race,
    };
  };

  if (isSpell) {
    if (includes("ritual")) return genRes("Ritual");
    if (includes("schnell")) return genRes("Schnell");
    if (includes("spielfeld")) return genRes("Spielfeld");
    if (includes("permanent")) return genRes("Permanent");
    if (includes("ausrüstung")) return genRes("Ausrüstung");
    return genRes("Normal");
  } else {
    if (includes("konter")) return genRes("Konter");
    if (includes("permanent")) return genRes("Permanent");
    return genRes("Normal");
  }
}

export function determineMonsterType(speciesInfo: string): MonsterTypeResult {
  const includes = (search: string) =>
    speciesInfo.toLowerCase().includes(search.toLowerCase());
  const genRes = (
    cardType: CardType,
    cardFrame: CardFrame
  ): MonsterTypeResult => {
    return {
      cardType,
      cardFrame,
    };
  };

  if (includes("pendel")) {
    if (includes("effekt")) {
      if (includes("ritual"))
        return genRes("Pendulum Effect Ritual Monster", "ritual_pendulum");
      if (includes("fuison"))
        return genRes("Pendulum Effect Fusion Monster", "fusion_pendulum");
      if (includes("synchro"))
        return genRes("Synchro Pendulum Effect Monster", "synchro_pendulum");
      if (includes("xyz"))
        return genRes("XYZ Pendulum Effect Monster", "xyz_pendulum");
      if (includes("empfänger"))
        return genRes("Pendulum Tuner Effect Monster", "effect_pendulum");
      if (includes("flipp"))
        return genRes("Pendulum Flip Effect Monster", "effect_pendulum");
      return genRes("Pendulum Effect Monster", "effect_pendulum");
    }
    return genRes("Pendulum Normal Monster", "normal_pendulum");
  }
  if (includes("synchro")) {
    if (includes("pendel"))
      return genRes("Synchro Pendulum Effect Monster", "synchro_pendulum");
    if (includes("empfänger"))
      return genRes("Synchro Tuner Monster", "synchro");
    return genRes("Synchro Monster", "synchro");
  }
  if (includes("xyz")) {
    if (includes("pendel"))
      return genRes("XYZ Pendulum Effect Monster", "xyz_pendulum");
    return genRes("XYZ Monster", "xyz");
  }
  if (includes("fusion")) {
    if (includes("pendel"))
      return genRes("Pendulum Effect Fusion Monster", "fusion_pendulum");
    return genRes("Fusion Monster", "fusion");
  }
  if (includes("ritual")) {
    if (includes("pendel"))
      return genRes("Pendulum Effect Ritual Monster", "ritual_pendulum");
    if (includes("effekt")) return genRes("Ritual Effect Monster", "ritual");
    return genRes("Ritual Monster", "ritual");
  }

  if (includes("link")) return genRes("Link Monster", "link");

  if (includes("effekt")) {
    if (includes("flipp")) {
      if (includes("empfänger"))
        return genRes("Flip Tuner Effect Monster", "effect");
      return genRes("Flip Effect Monster", "effect");
    }
    if (includes("empfänger")) return genRes("Tuner Monster", "effect");
    return genRes("Effect Monster", "effect");
  }
  if (includes("zwilling")) return genRes("Gemini Monster", "effect");
  if (includes("toon")) return genRes("Toon Monster", "effect");
  if (includes("union")) return genRes("Union Effect Monster", "effect");
  if (includes("tuner")) return genRes("Normal Tuner Monster", "normal");

  return genRes("Normal Monster", "normal");
}
