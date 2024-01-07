/**
 * An wrapper for any data. With this class you can work more easily with possible null values.
 *
 * This class is heavily inspired by the Java class java.util.Optional
 */
class Optional<E> {
  private _value: E | null;

  private constructor(value: E | null) {
    this._value = value;
  }

  /**
   * @param value The value of this Optional
   * @returns An optional with the given value and the type of the given value
   */
  public static of<T>(value: T): Optional<T> {
    return new Optional(value);
  }

  /**
   * @param value The value of this Optional
   * @returns An Optional that may contain the value or an empty Optional of a given type
   */
  public static ofNullable<T>(value: T | null): Optional<T> {
    if (value !== null) {
      return Optional.of(value);
    } else return Optional.empty<T>();
  }

  /**
   * @returns An empty Optional of an given type
   */
  public static empty<T>(): Optional<T> {
    return new Optional<T>(null);
  }

  /**
   * Applies an transformation function to this Optional
   *
   * @param tranformer The transformation function that is applied
   * @returns An optional with the result of the transformer function or an empty Optional if this Optional is already empty or null is returned by the function
   */
  public map<T>(tranformer: (obj: E) => T | null): Optional<T> {
    return this.isEmpty
      ? Optional.empty()
      : Optional.ofNullable(tranformer(this._value as E));
  }

  /**
   * Calls an callback if this Optional IS NOT empty, otherwise nothing happens
   *
   * @param fn The callback that gets called
   */
  public ifPresent(fn: (obj: E) => void): void {
    if (this.isPresent) {
      fn(this._value as E);
    }
  }

  /**
   * Returnes a default value if this Optional is empty
   *
   * @param defaultValue The default value
   * @returns The value of this optional except if this Optional is empty then the default value
   */
  public getOrElse(defaultValue: E): E {
    return this.isPresent ? (this._value as E) : defaultValue;
  }

  /**
   * Returns null if this Optional is empty
   *
   * @returns The value of this optional or null
   */
  public getOrNull(): E | null {
    return this.isPresent ? this._value : null;
  }

  /**
   * @throws Error if the Optional is empty
   */
  public get value(): E {
    if (this.isPresent) {
      return this._value as E;
    }
    throw new Error("Optional is empty");
  }

  public get isEmpty(): boolean {
    return this._value === null || this._value === undefined;
  }

  public get isPresent(): boolean {
    return !this.isEmpty;
  }
}

export default Optional;
