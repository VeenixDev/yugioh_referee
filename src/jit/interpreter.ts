import { Monster, Spell, Trap } from "entities/card";
import ValidationResult from "./validationResult";

export default class Interpreter {
  public parse(card: Monster | Spell | Trap): Array<ValidationResult> {
    return new Array();
  }
}
