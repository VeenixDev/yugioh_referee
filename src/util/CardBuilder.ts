import { Card, CardImage, Monster, Spell, Trap } from "../entities/card";
import {
  Attributes,
  CardFrame,
  CardType,
  LinkMarkers,
  MonsterRace,
  PendulumTypes,
  SpellRace,
  TrapRace,
} from "../entities/meta";
import Optional from "./Optional";

export default class CardBuilder {
  private id: string;
  private name?: string;
  private type?: CardType;
  private race?: MonsterRace | SpellRace | TrapRace;
  private description?: string;
  private frame?: CardFrame;
  private archetype?: string;
  private images: CardImage[] = [];
  private atk?: "?" | number;
  private def?: "?" | number;
  private level?: number;
  private attribute?: Attributes;
  private linkmarkers: LinkMarkers[] = [];
  private linkval?: number;
  private pendulumDescription?: string;
  private scale?: number;

  public constructor(id: string) {
    this.id = id;
  }

  public setName(name: string): CardBuilder {
    this.name = name;
    return this;
  }

  public setDescription(description: string): CardBuilder {
    this.description = description;
    return this;
  }

  public setType(type: CardType): CardBuilder {
    this.type = type;
    return this;
  }

  public setFrame(frame: CardFrame): CardBuilder {
    this.frame = frame;
    return this;
  }

  public setArchetype(archetype: string | undefined): CardBuilder {
    this.archetype = archetype;
    return this;
  }

  public setRace(race: MonsterRace | SpellRace | TrapRace): CardBuilder {
    this.race = race;
    return this;
  }

  public setImages(images: CardImage[]): CardBuilder {
    this.images = images;
    return this;
  }

  public setAtk(atk: "?" | number): CardBuilder {
    this.atk = atk;
    return this;
  }

  public setDef(def: "?" | number): CardBuilder {
    this.def = def;
    return this;
  }

  public setLevel(level: number): CardBuilder {
    this.level = level;
    return this;
  }

  public setAttribute(attribute: Attributes): CardBuilder {
    this.attribute = attribute;
    return this;
  }

  public setLinkmarkers(linkmarkers: LinkMarkers[]): CardBuilder {
    this.linkmarkers = linkmarkers;
    return this;
  }

  public setLinkval(linkval: number): CardBuilder {
    this.linkval = linkval;
    return this;
  }

  public setPendulumDescription(pendulumDescription: string): CardBuilder {
    this.pendulumDescription = pendulumDescription;
    return this;
  }

  public setScale(scale: number): CardBuilder {
    this.scale = scale;
    return this;
  }

  public get result(): Optional<Card | Monster | Spell | Trap> {
    return this.build();
  }
  /**
   * @returns The Card that is defined inside this builder
   * @throws When a required field property is not set
   */
  public build(): Optional<Card | Monster | Spell | Trap> {
    if (this.name === undefined) this.throwError("name");
    if (this.type === undefined) this.throwError("type");
    if (this.race === undefined) this.throwError("race");
    if (this.description === undefined) this.throwError("description");
    if (this.frame === undefined) this.throwError("frame");

    switch (this.type) {
      case "Trap Card":
        return Optional.of<Trap>(
          new Trap(
            this.id,
            this.name,
            this.description,
            this.type,
            this.frame,
            this.images,
            this.archetype,
            this.race as TrapRace
          )
        );
      case "Spell Card":
        return Optional.of<Spell>(
          new Spell(
            this.id,
            this.name,
            this.description,
            this.type,
            this.frame,
            this.images,
            this.archetype,
            this.race as SpellRace
          )
        );
      case "Token":
      case "Skill Card":
        return Optional.empty();
      default:
        if (this.atk === undefined) this.throwError("atk");
        if (this.def === undefined) this.throwError("def");
        if (this.attribute === undefined) this.throwError("attribute");
        console.log("level", this.level, "type", this.type);

        if (this.level === undefined && this.type !== "Link Monster")
          this.throwError("level");

        if (PendulumTypes.includes(this.type)) {
          if (this.pendulumDescription === undefined)
            this.throwError("pendulumDescription");
          if (this.scale === undefined) this.throwError("scale");
        }
        if (this.type === "Link Monster") {
          if (this.linkval === undefined) this.throwError("linkval");
        }

        return Optional.of<Monster>(
          new Monster(
            this.id,
            this.name,
            this.description,
            this.type,
            this.frame,
            this.images,
            this.archetype,
            this.atk,
            this.def,
            this.attribute,
            this.linkmarkers,
            this.race as MonsterRace,
            this.level,
            this.scale,
            this.linkval,
            this.pendulumDescription
          )
        );
    }
  }

  private throwError(field: string): never {
    throw new Error(`Cannot build Card: ${field} is not set!`);
  }
}
