export class Token {
  public type: TokenTypes;
  public args: Array<TokenArg>;

  public constructor(type: TokenTypes, args: Array<TokenArg>) {
    this.type = type;
    this.args = args;
  }
}

export class TokenArg {
  public values: Array<Token>;

  public constructor(values: Array<Token>) {
    this.values = values;
  }
}

export enum TokenTypes {
  SUMMON_REQUIREMENT,
  CONDITION,
  IDENTIFIER,
  QUICK_EFFECT,
  EFFECT_CHOOSER,
}

const asType = (type: TokenTypes) => (value: Array<TokenArg>) =>
  new Token(type, value);

export const condition = asType(TokenTypes.CONDITION);
export const identifier = asType(TokenTypes.IDENTIFIER);
export const quickEffect = asType(TokenTypes.QUICK_EFFECT);
export const summonRequirement = asType(TokenTypes.SUMMON_REQUIREMENT);
export const effectChooser = asType(TokenTypes.EFFECT_CHOOSER);
