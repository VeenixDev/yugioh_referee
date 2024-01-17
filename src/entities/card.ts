import { link } from "fs";
import {
  CardType,
  CardFrame,
  Attributes,
  MonsterRace,
  SpellRace,
  TrapRace,
  LinkMarkers,
  NormalTypes,
  PendulumTypes,
} from "./meta";

export class Card {
  id!: string;
  name!: string;
  name_lower!: string;
  description!: string;
  type!: CardType;
  frame!: CardFrame;
  archtype?: string;
  images!: CardImage[];

  protected constructor(
    id: string,
    name: string,
    description: string,
    type: CardType,
    frame: CardFrame,
    images: CardImage[],
    archtype: string | undefined
  ) {
    this.id = id;
    this.name = name;
    this.name_lower = name.toLowerCase();
    this.description = description;
    this.type = type;
    this.frame = frame;
    this.images = images;
    this.archtype = archtype;
  }

  public hasEffect(): boolean {
    return !NormalTypes.includes(this.type);
  }

  public hasPendulumEffect(): boolean {
    return PendulumTypes.includes(this.type);
  }
}

export class Monster extends Card {
  atk!: "?" | number;
  def!: "?" | number;
  level: number | undefined;
  attribute!: Attributes;
  scale: number | undefined;
  linkval: number | undefined;
  linkmarkers: LinkMarkers[] = [];
  pendulumDescription: string | undefined;
  race!: MonsterRace;

  constructor(
    id: string,
    name: string,
    description: string,
    type: CardType,
    frame: CardFrame,
    images: CardImage[],
    archtype: string | undefined,
    atk: "?" | number,
    def: "?" | number,
    attribute: Attributes,
    linkmarkers: LinkMarkers[],
    race: MonsterRace,
    level: number | undefined,
    scale: number | undefined,
    linkval: number | undefined,
    pendulumDescription: string | undefined
  ) {
    super(id, name, description, type, frame, images, archtype);
    this.atk = atk;
    this.def = def;
    this.attribute = attribute;
    this.linkmarkers = linkmarkers;
    this.race = race;
    this.level = level;
    this.scale = scale;
    this.linkval = linkval;
    this.pendulumDescription = pendulumDescription;
  }

  public getOriginalATK(): number {
    return this.atk === "?" ? 0 : Number(this.atk);
  }

  public getOriginalDef(): number {
    return this.def === "?" ? 0 : Number(this.def);
  }
}

export class Spell extends Card {
  race!: SpellRace;

  public constructor(
    id: string,
    name: string,
    description: string,
    type: CardType,
    frame: CardFrame,
    images: CardImage[],
    archtype: string | undefined,
    race: SpellRace
  ) {
    super(id, name, description, type, frame, images, archtype);
    this.race = race;
  }
}
export class Trap extends Card {
  race!: TrapRace;

  public constructor(
    id: string,
    name: string,
    description: string,
    type: CardType,
    frame: CardFrame,
    images: CardImage[],
    archtype: string | undefined,
    race: TrapRace
  ) {
    super(id, name, description, type, frame, images, archtype);
    this.race = race;
  }
}

export type CardImage = {
  imageId: string;
  imageUrl: string;
  imageUrlSmall: string;
  imageUrlCropped: string;
};
