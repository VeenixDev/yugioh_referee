import { Token } from "./tokens";

export default class ValidationResult {
  public allowedActions: Array<Action>;

  public constructor(allowedActions: Array<Action>) {
    this.allowedActions = allowedActions;
  }

  public addAction(action: Action) {
    if (!this.allowedActions.includes(action)) {
      this.allowedActions.push(action);
    }
  }
}

export class Action {
  public tokenRef: Token;

  public constructor(tokenRef: Token) {
    this.tokenRef = tokenRef;
  }
}
