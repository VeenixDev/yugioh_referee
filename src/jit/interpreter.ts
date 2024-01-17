import { Monster, Spell, Trap } from "../entities/card";
import ValidationResult, { Action } from "./validationResult";
import monsterParser from "./monsterParser";

import * as A from "arcsecond";
import Optional from "../util/Optional";
import { NormalTypes, SpellTrapTypes } from "../entities/meta";
import { Token, TokenArg, TokenTypes } from "./tokens";

export default class Interpreter {
  private handleError(
    errorMsg: string,
    parsingState: A.ParserState<any[], string, any>
  ): Optional<ValidationResult[]> {
    console.log(`Error: ${errorMsg}`);
    console.log("State:", parsingState);
    return Optional.empty();
  }

  private handleSuccess(
    result: any[],
    parsingState: A.ParserState<string[], string, any>
  ): Optional<ValidationResult[]> {
    console.log(`Result: ${result}`);
    return Optional.of([
      new ValidationResult([
        new Action(new Token(TokenTypes.IDENTIFIER, [new TokenArg([""])])),
      ]),
    ]);
  }

  public parse(
    card: Monster | Spell | Trap
  ): Optional<Array<ValidationResult>> {
    console.log("Started parsing card", card.name);

    if (!SpellTrapTypes.includes(card.type)) {
      if (NormalTypes.includes(card.type)) {
        console.log("monster is a normal card!");

        return Optional.empty();
      }
      const result = A.many(monsterParser).fork(
        card.description,
        this.handleError,
        this.handleSuccess
      );
      if (result.isPresent) {
        return Optional.of(result.value);
      }
    }

    console.log("Card type is not supported yet!");
    return Optional.empty();
  }
}
