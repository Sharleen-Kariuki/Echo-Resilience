
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model HazardType
 * 
 */
export type HazardType = $Result.DefaultSelection<Prisma.$HazardTypePayload>
/**
 * Model Community
 * 
 */
export type Community = $Result.DefaultSelection<Prisma.$CommunityPayload>
/**
 * Model Alert
 * 
 */
export type Alert = $Result.DefaultSelection<Prisma.$AlertPayload>
/**
 * Model AlertRegion
 * 
 */
export type AlertRegion = $Result.DefaultSelection<Prisma.$AlertRegionPayload>
/**
 * Model AlertHistory
 * 
 */
export type AlertHistory = $Result.DefaultSelection<Prisma.$AlertHistoryPayload>
/**
 * Model FeedbackLog
 * 
 */
export type FeedbackLog = $Result.DefaultSelection<Prisma.$FeedbackLogPayload>
/**
 * Model CommunityMember
 * 
 */
export type CommunityMember = $Result.DefaultSelection<Prisma.$CommunityMemberPayload>
/**
 * Model CallAttempt
 * 
 */
export type CallAttempt = $Result.DefaultSelection<Prisma.$CallAttemptPayload>
/**
 * Model IvrConfig
 * 
 */
export type IvrConfig = $Result.DefaultSelection<Prisma.$IvrConfigPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const user_role: {
  superadmin: 'superadmin',
  admin: 'admin',
  viewer: 'viewer'
};

export type user_role = (typeof user_role)[keyof typeof user_role]

}

export type user_role = $Enums.user_role

export const user_role: typeof $Enums.user_role

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs>;

  /**
   * `prisma.hazardType`: Exposes CRUD operations for the **HazardType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more HazardTypes
    * const hazardTypes = await prisma.hazardType.findMany()
    * ```
    */
  get hazardType(): Prisma.HazardTypeDelegate<ExtArgs>;

  /**
   * `prisma.community`: Exposes CRUD operations for the **Community** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Communities
    * const communities = await prisma.community.findMany()
    * ```
    */
  get community(): Prisma.CommunityDelegate<ExtArgs>;

  /**
   * `prisma.alert`: Exposes CRUD operations for the **Alert** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alerts
    * const alerts = await prisma.alert.findMany()
    * ```
    */
  get alert(): Prisma.AlertDelegate<ExtArgs>;

  /**
   * `prisma.alertRegion`: Exposes CRUD operations for the **AlertRegion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlertRegions
    * const alertRegions = await prisma.alertRegion.findMany()
    * ```
    */
  get alertRegion(): Prisma.AlertRegionDelegate<ExtArgs>;

  /**
   * `prisma.alertHistory`: Exposes CRUD operations for the **AlertHistory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AlertHistories
    * const alertHistories = await prisma.alertHistory.findMany()
    * ```
    */
  get alertHistory(): Prisma.AlertHistoryDelegate<ExtArgs>;

  /**
   * `prisma.feedbackLog`: Exposes CRUD operations for the **FeedbackLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FeedbackLogs
    * const feedbackLogs = await prisma.feedbackLog.findMany()
    * ```
    */
  get feedbackLog(): Prisma.FeedbackLogDelegate<ExtArgs>;

  /**
   * `prisma.communityMember`: Exposes CRUD operations for the **CommunityMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CommunityMembers
    * const communityMembers = await prisma.communityMember.findMany()
    * ```
    */
  get communityMember(): Prisma.CommunityMemberDelegate<ExtArgs>;

  /**
   * `prisma.callAttempt`: Exposes CRUD operations for the **CallAttempt** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CallAttempts
    * const callAttempts = await prisma.callAttempt.findMany()
    * ```
    */
  get callAttempt(): Prisma.CallAttemptDelegate<ExtArgs>;

  /**
   * `prisma.ivrConfig`: Exposes CRUD operations for the **IvrConfig** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IvrConfigs
    * const ivrConfigs = await prisma.ivrConfig.findMany()
    * ```
    */
  get ivrConfig(): Prisma.IvrConfigDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Region: 'Region',
    HazardType: 'HazardType',
    Community: 'Community',
    Alert: 'Alert',
    AlertRegion: 'AlertRegion',
    AlertHistory: 'AlertHistory',
    FeedbackLog: 'FeedbackLog',
    CommunityMember: 'CommunityMember',
    CallAttempt: 'CallAttempt',
    IvrConfig: 'IvrConfig'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "region" | "hazardType" | "community" | "alert" | "alertRegion" | "alertHistory" | "feedbackLog" | "communityMember" | "callAttempt" | "ivrConfig"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      HazardType: {
        payload: Prisma.$HazardTypePayload<ExtArgs>
        fields: Prisma.HazardTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HazardTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HazardTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>
          }
          findFirst: {
            args: Prisma.HazardTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HazardTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>
          }
          findMany: {
            args: Prisma.HazardTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>[]
          }
          create: {
            args: Prisma.HazardTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>
          }
          createMany: {
            args: Prisma.HazardTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HazardTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>[]
          }
          delete: {
            args: Prisma.HazardTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>
          }
          update: {
            args: Prisma.HazardTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>
          }
          deleteMany: {
            args: Prisma.HazardTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HazardTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.HazardTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HazardTypePayload>
          }
          aggregate: {
            args: Prisma.HazardTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHazardType>
          }
          groupBy: {
            args: Prisma.HazardTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<HazardTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.HazardTypeCountArgs<ExtArgs>
            result: $Utils.Optional<HazardTypeCountAggregateOutputType> | number
          }
        }
      }
      Community: {
        payload: Prisma.$CommunityPayload<ExtArgs>
        fields: Prisma.CommunityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>
          }
          findFirst: {
            args: Prisma.CommunityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>
          }
          findMany: {
            args: Prisma.CommunityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>[]
          }
          create: {
            args: Prisma.CommunityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>
          }
          createMany: {
            args: Prisma.CommunityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommunityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>[]
          }
          delete: {
            args: Prisma.CommunityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>
          }
          update: {
            args: Prisma.CommunityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>
          }
          deleteMany: {
            args: Prisma.CommunityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommunityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityPayload>
          }
          aggregate: {
            args: Prisma.CommunityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunity>
          }
          groupBy: {
            args: Prisma.CommunityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunityCountArgs<ExtArgs>
            result: $Utils.Optional<CommunityCountAggregateOutputType> | number
          }
        }
      }
      Alert: {
        payload: Prisma.$AlertPayload<ExtArgs>
        fields: Prisma.AlertFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findFirst: {
            args: Prisma.AlertFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          findMany: {
            args: Prisma.AlertFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          create: {
            args: Prisma.AlertCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          createMany: {
            args: Prisma.AlertCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>[]
          }
          delete: {
            args: Prisma.AlertDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          update: {
            args: Prisma.AlertUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          deleteMany: {
            args: Prisma.AlertDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlertUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertPayload>
          }
          aggregate: {
            args: Prisma.AlertAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlert>
          }
          groupBy: {
            args: Prisma.AlertGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertCountArgs<ExtArgs>
            result: $Utils.Optional<AlertCountAggregateOutputType> | number
          }
        }
      }
      AlertRegion: {
        payload: Prisma.$AlertRegionPayload<ExtArgs>
        fields: Prisma.AlertRegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertRegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertRegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>
          }
          findFirst: {
            args: Prisma.AlertRegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertRegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>
          }
          findMany: {
            args: Prisma.AlertRegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>[]
          }
          create: {
            args: Prisma.AlertRegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>
          }
          createMany: {
            args: Prisma.AlertRegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertRegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>[]
          }
          delete: {
            args: Prisma.AlertRegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>
          }
          update: {
            args: Prisma.AlertRegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>
          }
          deleteMany: {
            args: Prisma.AlertRegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertRegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlertRegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertRegionPayload>
          }
          aggregate: {
            args: Prisma.AlertRegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlertRegion>
          }
          groupBy: {
            args: Prisma.AlertRegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertRegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertRegionCountArgs<ExtArgs>
            result: $Utils.Optional<AlertRegionCountAggregateOutputType> | number
          }
        }
      }
      AlertHistory: {
        payload: Prisma.$AlertHistoryPayload<ExtArgs>
        fields: Prisma.AlertHistoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AlertHistoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AlertHistoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          findFirst: {
            args: Prisma.AlertHistoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AlertHistoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          findMany: {
            args: Prisma.AlertHistoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[]
          }
          create: {
            args: Prisma.AlertHistoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          createMany: {
            args: Prisma.AlertHistoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AlertHistoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>[]
          }
          delete: {
            args: Prisma.AlertHistoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          update: {
            args: Prisma.AlertHistoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          deleteMany: {
            args: Prisma.AlertHistoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AlertHistoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AlertHistoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AlertHistoryPayload>
          }
          aggregate: {
            args: Prisma.AlertHistoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAlertHistory>
          }
          groupBy: {
            args: Prisma.AlertHistoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<AlertHistoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.AlertHistoryCountArgs<ExtArgs>
            result: $Utils.Optional<AlertHistoryCountAggregateOutputType> | number
          }
        }
      }
      FeedbackLog: {
        payload: Prisma.$FeedbackLogPayload<ExtArgs>
        fields: Prisma.FeedbackLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeedbackLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeedbackLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>
          }
          findFirst: {
            args: Prisma.FeedbackLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeedbackLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>
          }
          findMany: {
            args: Prisma.FeedbackLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>[]
          }
          create: {
            args: Prisma.FeedbackLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>
          }
          createMany: {
            args: Prisma.FeedbackLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FeedbackLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>[]
          }
          delete: {
            args: Prisma.FeedbackLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>
          }
          update: {
            args: Prisma.FeedbackLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>
          }
          deleteMany: {
            args: Prisma.FeedbackLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FeedbackLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.FeedbackLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FeedbackLogPayload>
          }
          aggregate: {
            args: Prisma.FeedbackLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFeedbackLog>
          }
          groupBy: {
            args: Prisma.FeedbackLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<FeedbackLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeedbackLogCountArgs<ExtArgs>
            result: $Utils.Optional<FeedbackLogCountAggregateOutputType> | number
          }
        }
      }
      CommunityMember: {
        payload: Prisma.$CommunityMemberPayload<ExtArgs>
        fields: Prisma.CommunityMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CommunityMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CommunityMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          findFirst: {
            args: Prisma.CommunityMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CommunityMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          findMany: {
            args: Prisma.CommunityMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>[]
          }
          create: {
            args: Prisma.CommunityMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          createMany: {
            args: Prisma.CommunityMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CommunityMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>[]
          }
          delete: {
            args: Prisma.CommunityMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          update: {
            args: Prisma.CommunityMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          deleteMany: {
            args: Prisma.CommunityMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CommunityMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CommunityMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CommunityMemberPayload>
          }
          aggregate: {
            args: Prisma.CommunityMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCommunityMember>
          }
          groupBy: {
            args: Prisma.CommunityMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<CommunityMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.CommunityMemberCountArgs<ExtArgs>
            result: $Utils.Optional<CommunityMemberCountAggregateOutputType> | number
          }
        }
      }
      CallAttempt: {
        payload: Prisma.$CallAttemptPayload<ExtArgs>
        fields: Prisma.CallAttemptFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CallAttemptFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CallAttemptFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>
          }
          findFirst: {
            args: Prisma.CallAttemptFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CallAttemptFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>
          }
          findMany: {
            args: Prisma.CallAttemptFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>[]
          }
          create: {
            args: Prisma.CallAttemptCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>
          }
          createMany: {
            args: Prisma.CallAttemptCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CallAttemptCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>[]
          }
          delete: {
            args: Prisma.CallAttemptDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>
          }
          update: {
            args: Prisma.CallAttemptUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>
          }
          deleteMany: {
            args: Prisma.CallAttemptDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CallAttemptUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CallAttemptUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CallAttemptPayload>
          }
          aggregate: {
            args: Prisma.CallAttemptAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCallAttempt>
          }
          groupBy: {
            args: Prisma.CallAttemptGroupByArgs<ExtArgs>
            result: $Utils.Optional<CallAttemptGroupByOutputType>[]
          }
          count: {
            args: Prisma.CallAttemptCountArgs<ExtArgs>
            result: $Utils.Optional<CallAttemptCountAggregateOutputType> | number
          }
        }
      }
      IvrConfig: {
        payload: Prisma.$IvrConfigPayload<ExtArgs>
        fields: Prisma.IvrConfigFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IvrConfigFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IvrConfigFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>
          }
          findFirst: {
            args: Prisma.IvrConfigFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IvrConfigFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>
          }
          findMany: {
            args: Prisma.IvrConfigFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>[]
          }
          create: {
            args: Prisma.IvrConfigCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>
          }
          createMany: {
            args: Prisma.IvrConfigCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IvrConfigCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>[]
          }
          delete: {
            args: Prisma.IvrConfigDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>
          }
          update: {
            args: Prisma.IvrConfigUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>
          }
          deleteMany: {
            args: Prisma.IvrConfigDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IvrConfigUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.IvrConfigUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IvrConfigPayload>
          }
          aggregate: {
            args: Prisma.IvrConfigAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIvrConfig>
          }
          groupBy: {
            args: Prisma.IvrConfigGroupByArgs<ExtArgs>
            result: $Utils.Optional<IvrConfigGroupByOutputType>[]
          }
          count: {
            args: Prisma.IvrConfigCountArgs<ExtArgs>
            result: $Utils.Optional<IvrConfigCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    alerts: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alerts?: boolean | UserCountOutputTypeCountAlertsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    communities: number
    alertRegions: number
    alertHistory: number
    feedbackLogs: number
    communityMembers: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    communities?: boolean | RegionCountOutputTypeCountCommunitiesArgs
    alertRegions?: boolean | RegionCountOutputTypeCountAlertRegionsArgs
    alertHistory?: boolean | RegionCountOutputTypeCountAlertHistoryArgs
    feedbackLogs?: boolean | RegionCountOutputTypeCountFeedbackLogsArgs
    communityMembers?: boolean | RegionCountOutputTypeCountCommunityMembersArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountCommunitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountAlertRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertRegionWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountAlertHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertHistoryWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountFeedbackLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLogWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountCommunityMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityMemberWhereInput
  }


  /**
   * Count Type HazardTypeCountOutputType
   */

  export type HazardTypeCountOutputType = {
    alerts: number
    feedbackLogs: number
  }

  export type HazardTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alerts?: boolean | HazardTypeCountOutputTypeCountAlertsArgs
    feedbackLogs?: boolean | HazardTypeCountOutputTypeCountFeedbackLogsArgs
  }

  // Custom InputTypes
  /**
   * HazardTypeCountOutputType without action
   */
  export type HazardTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardTypeCountOutputType
     */
    select?: HazardTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * HazardTypeCountOutputType without action
   */
  export type HazardTypeCountOutputTypeCountAlertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
  }

  /**
   * HazardTypeCountOutputType without action
   */
  export type HazardTypeCountOutputTypeCountFeedbackLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLogWhereInput
  }


  /**
   * Count Type CommunityCountOutputType
   */

  export type CommunityCountOutputType = {
    members: number
  }

  export type CommunityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | CommunityCountOutputTypeCountMembersArgs
  }

  // Custom InputTypes
  /**
   * CommunityCountOutputType without action
   */
  export type CommunityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityCountOutputType
     */
    select?: CommunityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommunityCountOutputType without action
   */
  export type CommunityCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityMemberWhereInput
  }


  /**
   * Count Type AlertCountOutputType
   */

  export type AlertCountOutputType = {
    alertRegions: number
    alertHistory: number
  }

  export type AlertCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alertRegions?: boolean | AlertCountOutputTypeCountAlertRegionsArgs
    alertHistory?: boolean | AlertCountOutputTypeCountAlertHistoryArgs
  }

  // Custom InputTypes
  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertCountOutputType
     */
    select?: AlertCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeCountAlertRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertRegionWhereInput
  }

  /**
   * AlertCountOutputType without action
   */
  export type AlertCountOutputTypeCountAlertHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertHistoryWhereInput
  }


  /**
   * Count Type AlertHistoryCountOutputType
   */

  export type AlertHistoryCountOutputType = {
    feedbackLogs: number
    callAttempts: number
  }

  export type AlertHistoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feedbackLogs?: boolean | AlertHistoryCountOutputTypeCountFeedbackLogsArgs
    callAttempts?: boolean | AlertHistoryCountOutputTypeCountCallAttemptsArgs
  }

  // Custom InputTypes
  /**
   * AlertHistoryCountOutputType without action
   */
  export type AlertHistoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistoryCountOutputType
     */
    select?: AlertHistoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * AlertHistoryCountOutputType without action
   */
  export type AlertHistoryCountOutputTypeCountFeedbackLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLogWhereInput
  }

  /**
   * AlertHistoryCountOutputType without action
   */
  export type AlertHistoryCountOutputTypeCountCallAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallAttemptWhereInput
  }


  /**
   * Count Type CommunityMemberCountOutputType
   */

  export type CommunityMemberCountOutputType = {
    callAttempts: number
  }

  export type CommunityMemberCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    callAttempts?: boolean | CommunityMemberCountOutputTypeCountCallAttemptsArgs
  }

  // Custom InputTypes
  /**
   * CommunityMemberCountOutputType without action
   */
  export type CommunityMemberCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMemberCountOutputType
     */
    select?: CommunityMemberCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CommunityMemberCountOutputType without action
   */
  export type CommunityMemberCountOutputTypeCountCallAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallAttemptWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    fullName: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.user_role | null
    lastLogin: Date | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    fullName: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.user_role | null
    lastLogin: Date | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    fullName: number
    email: number
    passwordHash: number
    role: number
    lastLogin: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    passwordHash?: true
    role?: true
    lastLogin?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    passwordHash?: true
    role?: true
    lastLogin?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    fullName?: true
    email?: true
    passwordHash?: true
    role?: true
    lastLogin?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    fullName: string
    email: string
    passwordHash: string
    role: $Enums.user_role
    lastLogin: Date | null
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLogin?: boolean
    createdAt?: boolean
    alerts?: boolean | User$alertsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLogin?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    fullName?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    lastLogin?: boolean
    createdAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alerts?: boolean | User$alertsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      alerts: Prisma.$AlertPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fullName: string
      email: string
      passwordHash: string
      role: $Enums.user_role
      lastLogin: Date | null
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alerts<T extends User$alertsArgs<ExtArgs> = {}>(args?: Subset<T, User$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly fullName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'user_role'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.alerts
   */
  export type User$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
  }

  export type RegionSumAggregateOutputType = {
    id: number | null
    latitude: number | null
    longitude: number | null
  }

  export type RegionMinAggregateOutputType = {
    id: number | null
    name: string | null
    latitude: number | null
    longitude: number | null
  }

  export type RegionMaxAggregateOutputType = {
    id: number | null
    name: string | null
    latitude: number | null
    longitude: number | null
  }

  export type RegionCountAggregateOutputType = {
    id: number
    name: number
    latitude: number
    longitude: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
  }

  export type RegionSumAggregateInputType = {
    id?: true
    latitude?: true
    longitude?: true
  }

  export type RegionMinAggregateInputType = {
    id?: true
    name?: true
    latitude?: true
    longitude?: true
  }

  export type RegionMaxAggregateInputType = {
    id?: true
    name?: true
    latitude?: true
    longitude?: true
  }

  export type RegionCountAggregateInputType = {
    id?: true
    name?: true
    latitude?: true
    longitude?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    id: number
    name: string
    latitude: number | null
    longitude: number | null
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
    communities?: boolean | Region$communitiesArgs<ExtArgs>
    alertRegions?: boolean | Region$alertRegionsArgs<ExtArgs>
    alertHistory?: boolean | Region$alertHistoryArgs<ExtArgs>
    feedbackLogs?: boolean | Region$feedbackLogsArgs<ExtArgs>
    communityMembers?: boolean | Region$communityMembersArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    id?: boolean
    name?: boolean
    latitude?: boolean
    longitude?: boolean
  }

  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    communities?: boolean | Region$communitiesArgs<ExtArgs>
    alertRegions?: boolean | Region$alertRegionsArgs<ExtArgs>
    alertHistory?: boolean | Region$alertHistoryArgs<ExtArgs>
    feedbackLogs?: boolean | Region$feedbackLogsArgs<ExtArgs>
    communityMembers?: boolean | Region$communityMembersArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      communities: Prisma.$CommunityPayload<ExtArgs>[]
      alertRegions: Prisma.$AlertRegionPayload<ExtArgs>[]
      alertHistory: Prisma.$AlertHistoryPayload<ExtArgs>[]
      feedbackLogs: Prisma.$FeedbackLogPayload<ExtArgs>[]
      communityMembers: Prisma.$CommunityMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      latitude: number | null
      longitude: number | null
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const regionWithIdOnly = await prisma.region.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `id`
     * const regionWithIdOnly = await prisma.region.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    communities<T extends Region$communitiesArgs<ExtArgs> = {}>(args?: Subset<T, Region$communitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findMany"> | Null>
    alertRegions<T extends Region$alertRegionsArgs<ExtArgs> = {}>(args?: Subset<T, Region$alertRegionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findMany"> | Null>
    alertHistory<T extends Region$alertHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Region$alertHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    feedbackLogs<T extends Region$feedbackLogsArgs<ExtArgs> = {}>(args?: Subset<T, Region$feedbackLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findMany"> | Null>
    communityMembers<T extends Region$communityMembersArgs<ExtArgs> = {}>(args?: Subset<T, Region$communityMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */ 
  interface RegionFieldRefs {
    readonly id: FieldRef<"Region", 'Int'>
    readonly name: FieldRef<"Region", 'String'>
    readonly latitude: FieldRef<"Region", 'Float'>
    readonly longitude: FieldRef<"Region", 'Float'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
  }

  /**
   * Region.communities
   */
  export type Region$communitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    where?: CommunityWhereInput
    orderBy?: CommunityOrderByWithRelationInput | CommunityOrderByWithRelationInput[]
    cursor?: CommunityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityScalarFieldEnum | CommunityScalarFieldEnum[]
  }

  /**
   * Region.alertRegions
   */
  export type Region$alertRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    where?: AlertRegionWhereInput
    orderBy?: AlertRegionOrderByWithRelationInput | AlertRegionOrderByWithRelationInput[]
    cursor?: AlertRegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertRegionScalarFieldEnum | AlertRegionScalarFieldEnum[]
  }

  /**
   * Region.alertHistory
   */
  export type Region$alertHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    where?: AlertHistoryWhereInput
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    cursor?: AlertHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * Region.feedbackLogs
   */
  export type Region$feedbackLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    where?: FeedbackLogWhereInput
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    cursor?: FeedbackLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackLogScalarFieldEnum | FeedbackLogScalarFieldEnum[]
  }

  /**
   * Region.communityMembers
   */
  export type Region$communityMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    where?: CommunityMemberWhereInput
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    cursor?: CommunityMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model HazardType
   */

  export type AggregateHazardType = {
    _count: HazardTypeCountAggregateOutputType | null
    _avg: HazardTypeAvgAggregateOutputType | null
    _sum: HazardTypeSumAggregateOutputType | null
    _min: HazardTypeMinAggregateOutputType | null
    _max: HazardTypeMaxAggregateOutputType | null
  }

  export type HazardTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type HazardTypeSumAggregateOutputType = {
    id: number | null
  }

  export type HazardTypeMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type HazardTypeMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type HazardTypeCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type HazardTypeAvgAggregateInputType = {
    id?: true
  }

  export type HazardTypeSumAggregateInputType = {
    id?: true
  }

  export type HazardTypeMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type HazardTypeMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type HazardTypeCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type HazardTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HazardType to aggregate.
     */
    where?: HazardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HazardTypes to fetch.
     */
    orderBy?: HazardTypeOrderByWithRelationInput | HazardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HazardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HazardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HazardTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned HazardTypes
    **/
    _count?: true | HazardTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HazardTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HazardTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HazardTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HazardTypeMaxAggregateInputType
  }

  export type GetHazardTypeAggregateType<T extends HazardTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateHazardType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHazardType[P]>
      : GetScalarType<T[P], AggregateHazardType[P]>
  }




  export type HazardTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HazardTypeWhereInput
    orderBy?: HazardTypeOrderByWithAggregationInput | HazardTypeOrderByWithAggregationInput[]
    by: HazardTypeScalarFieldEnum[] | HazardTypeScalarFieldEnum
    having?: HazardTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HazardTypeCountAggregateInputType | true
    _avg?: HazardTypeAvgAggregateInputType
    _sum?: HazardTypeSumAggregateInputType
    _min?: HazardTypeMinAggregateInputType
    _max?: HazardTypeMaxAggregateInputType
  }

  export type HazardTypeGroupByOutputType = {
    id: number
    name: string
    _count: HazardTypeCountAggregateOutputType | null
    _avg: HazardTypeAvgAggregateOutputType | null
    _sum: HazardTypeSumAggregateOutputType | null
    _min: HazardTypeMinAggregateOutputType | null
    _max: HazardTypeMaxAggregateOutputType | null
  }

  type GetHazardTypeGroupByPayload<T extends HazardTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HazardTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HazardTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HazardTypeGroupByOutputType[P]>
            : GetScalarType<T[P], HazardTypeGroupByOutputType[P]>
        }
      >
    >


  export type HazardTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    alerts?: boolean | HazardType$alertsArgs<ExtArgs>
    feedbackLogs?: boolean | HazardType$feedbackLogsArgs<ExtArgs>
    _count?: boolean | HazardTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["hazardType"]>

  export type HazardTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["hazardType"]>

  export type HazardTypeSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type HazardTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alerts?: boolean | HazardType$alertsArgs<ExtArgs>
    feedbackLogs?: boolean | HazardType$feedbackLogsArgs<ExtArgs>
    _count?: boolean | HazardTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type HazardTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $HazardTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "HazardType"
    objects: {
      alerts: Prisma.$AlertPayload<ExtArgs>[]
      feedbackLogs: Prisma.$FeedbackLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["hazardType"]>
    composites: {}
  }

  type HazardTypeGetPayload<S extends boolean | null | undefined | HazardTypeDefaultArgs> = $Result.GetResult<Prisma.$HazardTypePayload, S>

  type HazardTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<HazardTypeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: HazardTypeCountAggregateInputType | true
    }

  export interface HazardTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['HazardType'], meta: { name: 'HazardType' } }
    /**
     * Find zero or one HazardType that matches the filter.
     * @param {HazardTypeFindUniqueArgs} args - Arguments to find a HazardType
     * @example
     * // Get one HazardType
     * const hazardType = await prisma.hazardType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HazardTypeFindUniqueArgs>(args: SelectSubset<T, HazardTypeFindUniqueArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one HazardType that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {HazardTypeFindUniqueOrThrowArgs} args - Arguments to find a HazardType
     * @example
     * // Get one HazardType
     * const hazardType = await prisma.hazardType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HazardTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, HazardTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first HazardType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeFindFirstArgs} args - Arguments to find a HazardType
     * @example
     * // Get one HazardType
     * const hazardType = await prisma.hazardType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HazardTypeFindFirstArgs>(args?: SelectSubset<T, HazardTypeFindFirstArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first HazardType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeFindFirstOrThrowArgs} args - Arguments to find a HazardType
     * @example
     * // Get one HazardType
     * const hazardType = await prisma.hazardType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HazardTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, HazardTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more HazardTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all HazardTypes
     * const hazardTypes = await prisma.hazardType.findMany()
     * 
     * // Get first 10 HazardTypes
     * const hazardTypes = await prisma.hazardType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hazardTypeWithIdOnly = await prisma.hazardType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HazardTypeFindManyArgs>(args?: SelectSubset<T, HazardTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a HazardType.
     * @param {HazardTypeCreateArgs} args - Arguments to create a HazardType.
     * @example
     * // Create one HazardType
     * const HazardType = await prisma.hazardType.create({
     *   data: {
     *     // ... data to create a HazardType
     *   }
     * })
     * 
     */
    create<T extends HazardTypeCreateArgs>(args: SelectSubset<T, HazardTypeCreateArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many HazardTypes.
     * @param {HazardTypeCreateManyArgs} args - Arguments to create many HazardTypes.
     * @example
     * // Create many HazardTypes
     * const hazardType = await prisma.hazardType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HazardTypeCreateManyArgs>(args?: SelectSubset<T, HazardTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many HazardTypes and returns the data saved in the database.
     * @param {HazardTypeCreateManyAndReturnArgs} args - Arguments to create many HazardTypes.
     * @example
     * // Create many HazardTypes
     * const hazardType = await prisma.hazardType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many HazardTypes and only return the `id`
     * const hazardTypeWithIdOnly = await prisma.hazardType.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HazardTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, HazardTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a HazardType.
     * @param {HazardTypeDeleteArgs} args - Arguments to delete one HazardType.
     * @example
     * // Delete one HazardType
     * const HazardType = await prisma.hazardType.delete({
     *   where: {
     *     // ... filter to delete one HazardType
     *   }
     * })
     * 
     */
    delete<T extends HazardTypeDeleteArgs>(args: SelectSubset<T, HazardTypeDeleteArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one HazardType.
     * @param {HazardTypeUpdateArgs} args - Arguments to update one HazardType.
     * @example
     * // Update one HazardType
     * const hazardType = await prisma.hazardType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HazardTypeUpdateArgs>(args: SelectSubset<T, HazardTypeUpdateArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more HazardTypes.
     * @param {HazardTypeDeleteManyArgs} args - Arguments to filter HazardTypes to delete.
     * @example
     * // Delete a few HazardTypes
     * const { count } = await prisma.hazardType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HazardTypeDeleteManyArgs>(args?: SelectSubset<T, HazardTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more HazardTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many HazardTypes
     * const hazardType = await prisma.hazardType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HazardTypeUpdateManyArgs>(args: SelectSubset<T, HazardTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one HazardType.
     * @param {HazardTypeUpsertArgs} args - Arguments to update or create a HazardType.
     * @example
     * // Update or create a HazardType
     * const hazardType = await prisma.hazardType.upsert({
     *   create: {
     *     // ... data to create a HazardType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the HazardType we want to update
     *   }
     * })
     */
    upsert<T extends HazardTypeUpsertArgs>(args: SelectSubset<T, HazardTypeUpsertArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of HazardTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeCountArgs} args - Arguments to filter HazardTypes to count.
     * @example
     * // Count the number of HazardTypes
     * const count = await prisma.hazardType.count({
     *   where: {
     *     // ... the filter for the HazardTypes we want to count
     *   }
     * })
    **/
    count<T extends HazardTypeCountArgs>(
      args?: Subset<T, HazardTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HazardTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a HazardType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HazardTypeAggregateArgs>(args: Subset<T, HazardTypeAggregateArgs>): Prisma.PrismaPromise<GetHazardTypeAggregateType<T>>

    /**
     * Group by HazardType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HazardTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HazardTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HazardTypeGroupByArgs['orderBy'] }
        : { orderBy?: HazardTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HazardTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHazardTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the HazardType model
   */
  readonly fields: HazardTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for HazardType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HazardTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alerts<T extends HazardType$alertsArgs<ExtArgs> = {}>(args?: Subset<T, HazardType$alertsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany"> | Null>
    feedbackLogs<T extends HazardType$feedbackLogsArgs<ExtArgs> = {}>(args?: Subset<T, HazardType$feedbackLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the HazardType model
   */ 
  interface HazardTypeFieldRefs {
    readonly id: FieldRef<"HazardType", 'Int'>
    readonly name: FieldRef<"HazardType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * HazardType findUnique
   */
  export type HazardTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * Filter, which HazardType to fetch.
     */
    where: HazardTypeWhereUniqueInput
  }

  /**
   * HazardType findUniqueOrThrow
   */
  export type HazardTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * Filter, which HazardType to fetch.
     */
    where: HazardTypeWhereUniqueInput
  }

  /**
   * HazardType findFirst
   */
  export type HazardTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * Filter, which HazardType to fetch.
     */
    where?: HazardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HazardTypes to fetch.
     */
    orderBy?: HazardTypeOrderByWithRelationInput | HazardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HazardTypes.
     */
    cursor?: HazardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HazardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HazardTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HazardTypes.
     */
    distinct?: HazardTypeScalarFieldEnum | HazardTypeScalarFieldEnum[]
  }

  /**
   * HazardType findFirstOrThrow
   */
  export type HazardTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * Filter, which HazardType to fetch.
     */
    where?: HazardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HazardTypes to fetch.
     */
    orderBy?: HazardTypeOrderByWithRelationInput | HazardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for HazardTypes.
     */
    cursor?: HazardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HazardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HazardTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of HazardTypes.
     */
    distinct?: HazardTypeScalarFieldEnum | HazardTypeScalarFieldEnum[]
  }

  /**
   * HazardType findMany
   */
  export type HazardTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * Filter, which HazardTypes to fetch.
     */
    where?: HazardTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of HazardTypes to fetch.
     */
    orderBy?: HazardTypeOrderByWithRelationInput | HazardTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing HazardTypes.
     */
    cursor?: HazardTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` HazardTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` HazardTypes.
     */
    skip?: number
    distinct?: HazardTypeScalarFieldEnum | HazardTypeScalarFieldEnum[]
  }

  /**
   * HazardType create
   */
  export type HazardTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a HazardType.
     */
    data: XOR<HazardTypeCreateInput, HazardTypeUncheckedCreateInput>
  }

  /**
   * HazardType createMany
   */
  export type HazardTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many HazardTypes.
     */
    data: HazardTypeCreateManyInput | HazardTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HazardType createManyAndReturn
   */
  export type HazardTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many HazardTypes.
     */
    data: HazardTypeCreateManyInput | HazardTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * HazardType update
   */
  export type HazardTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a HazardType.
     */
    data: XOR<HazardTypeUpdateInput, HazardTypeUncheckedUpdateInput>
    /**
     * Choose, which HazardType to update.
     */
    where: HazardTypeWhereUniqueInput
  }

  /**
   * HazardType updateMany
   */
  export type HazardTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update HazardTypes.
     */
    data: XOR<HazardTypeUpdateManyMutationInput, HazardTypeUncheckedUpdateManyInput>
    /**
     * Filter which HazardTypes to update
     */
    where?: HazardTypeWhereInput
  }

  /**
   * HazardType upsert
   */
  export type HazardTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the HazardType to update in case it exists.
     */
    where: HazardTypeWhereUniqueInput
    /**
     * In case the HazardType found by the `where` argument doesn't exist, create a new HazardType with this data.
     */
    create: XOR<HazardTypeCreateInput, HazardTypeUncheckedCreateInput>
    /**
     * In case the HazardType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HazardTypeUpdateInput, HazardTypeUncheckedUpdateInput>
  }

  /**
   * HazardType delete
   */
  export type HazardTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
    /**
     * Filter which HazardType to delete.
     */
    where: HazardTypeWhereUniqueInput
  }

  /**
   * HazardType deleteMany
   */
  export type HazardTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which HazardTypes to delete
     */
    where?: HazardTypeWhereInput
  }

  /**
   * HazardType.alerts
   */
  export type HazardType$alertsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    cursor?: AlertWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * HazardType.feedbackLogs
   */
  export type HazardType$feedbackLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    where?: FeedbackLogWhereInput
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    cursor?: FeedbackLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackLogScalarFieldEnum | FeedbackLogScalarFieldEnum[]
  }

  /**
   * HazardType without action
   */
  export type HazardTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the HazardType
     */
    select?: HazardTypeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: HazardTypeInclude<ExtArgs> | null
  }


  /**
   * Model Community
   */

  export type AggregateCommunity = {
    _count: CommunityCountAggregateOutputType | null
    _avg: CommunityAvgAggregateOutputType | null
    _sum: CommunitySumAggregateOutputType | null
    _min: CommunityMinAggregateOutputType | null
    _max: CommunityMaxAggregateOutputType | null
  }

  export type CommunityAvgAggregateOutputType = {
    id: number | null
    totalRegistered: number | null
    regionId: number | null
  }

  export type CommunitySumAggregateOutputType = {
    id: number | null
    totalRegistered: number | null
    regionId: number | null
  }

  export type CommunityMinAggregateOutputType = {
    id: number | null
    name: string | null
    totalRegistered: number | null
    regionId: number | null
    registrationDate: Date | null
    source: string | null
    status: string | null
    actions: string | null
    createdAt: Date | null
  }

  export type CommunityMaxAggregateOutputType = {
    id: number | null
    name: string | null
    totalRegistered: number | null
    regionId: number | null
    registrationDate: Date | null
    source: string | null
    status: string | null
    actions: string | null
    createdAt: Date | null
  }

  export type CommunityCountAggregateOutputType = {
    id: number
    name: number
    totalRegistered: number
    regionId: number
    registrationDate: number
    source: number
    status: number
    actions: number
    createdAt: number
    _all: number
  }


  export type CommunityAvgAggregateInputType = {
    id?: true
    totalRegistered?: true
    regionId?: true
  }

  export type CommunitySumAggregateInputType = {
    id?: true
    totalRegistered?: true
    regionId?: true
  }

  export type CommunityMinAggregateInputType = {
    id?: true
    name?: true
    totalRegistered?: true
    regionId?: true
    registrationDate?: true
    source?: true
    status?: true
    actions?: true
    createdAt?: true
  }

  export type CommunityMaxAggregateInputType = {
    id?: true
    name?: true
    totalRegistered?: true
    regionId?: true
    registrationDate?: true
    source?: true
    status?: true
    actions?: true
    createdAt?: true
  }

  export type CommunityCountAggregateInputType = {
    id?: true
    name?: true
    totalRegistered?: true
    regionId?: true
    registrationDate?: true
    source?: true
    status?: true
    actions?: true
    createdAt?: true
    _all?: true
  }

  export type CommunityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Community to aggregate.
     */
    where?: CommunityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communities to fetch.
     */
    orderBy?: CommunityOrderByWithRelationInput | CommunityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Communities
    **/
    _count?: true | CommunityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommunityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommunitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunityMaxAggregateInputType
  }

  export type GetCommunityAggregateType<T extends CommunityAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunity[P]>
      : GetScalarType<T[P], AggregateCommunity[P]>
  }




  export type CommunityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityWhereInput
    orderBy?: CommunityOrderByWithAggregationInput | CommunityOrderByWithAggregationInput[]
    by: CommunityScalarFieldEnum[] | CommunityScalarFieldEnum
    having?: CommunityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunityCountAggregateInputType | true
    _avg?: CommunityAvgAggregateInputType
    _sum?: CommunitySumAggregateInputType
    _min?: CommunityMinAggregateInputType
    _max?: CommunityMaxAggregateInputType
  }

  export type CommunityGroupByOutputType = {
    id: number
    name: string
    totalRegistered: number
    regionId: number
    registrationDate: Date
    source: string | null
    status: string | null
    actions: string | null
    createdAt: Date
    _count: CommunityCountAggregateOutputType | null
    _avg: CommunityAvgAggregateOutputType | null
    _sum: CommunitySumAggregateOutputType | null
    _min: CommunityMinAggregateOutputType | null
    _max: CommunityMaxAggregateOutputType | null
  }

  type GetCommunityGroupByPayload<T extends CommunityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunityGroupByOutputType[P]>
            : GetScalarType<T[P], CommunityGroupByOutputType[P]>
        }
      >
    >


  export type CommunitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    totalRegistered?: boolean
    regionId?: boolean
    registrationDate?: boolean
    source?: boolean
    status?: boolean
    actions?: boolean
    createdAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
    members?: boolean | Community$membersArgs<ExtArgs>
    _count?: boolean | CommunityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["community"]>

  export type CommunitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    totalRegistered?: boolean
    regionId?: boolean
    registrationDate?: boolean
    source?: boolean
    status?: boolean
    actions?: boolean
    createdAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["community"]>

  export type CommunitySelectScalar = {
    id?: boolean
    name?: boolean
    totalRegistered?: boolean
    regionId?: boolean
    registrationDate?: boolean
    source?: boolean
    status?: boolean
    actions?: boolean
    createdAt?: boolean
  }

  export type CommunityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
    members?: boolean | Community$membersArgs<ExtArgs>
    _count?: boolean | CommunityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommunityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $CommunityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Community"
    objects: {
      region: Prisma.$RegionPayload<ExtArgs>
      members: Prisma.$CommunityMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      totalRegistered: number
      regionId: number
      registrationDate: Date
      source: string | null
      status: string | null
      actions: string | null
      createdAt: Date
    }, ExtArgs["result"]["community"]>
    composites: {}
  }

  type CommunityGetPayload<S extends boolean | null | undefined | CommunityDefaultArgs> = $Result.GetResult<Prisma.$CommunityPayload, S>

  type CommunityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommunityFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommunityCountAggregateInputType | true
    }

  export interface CommunityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Community'], meta: { name: 'Community' } }
    /**
     * Find zero or one Community that matches the filter.
     * @param {CommunityFindUniqueArgs} args - Arguments to find a Community
     * @example
     * // Get one Community
     * const community = await prisma.community.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunityFindUniqueArgs>(args: SelectSubset<T, CommunityFindUniqueArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Community that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommunityFindUniqueOrThrowArgs} args - Arguments to find a Community
     * @example
     * // Get one Community
     * const community = await prisma.community.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunityFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Community that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityFindFirstArgs} args - Arguments to find a Community
     * @example
     * // Get one Community
     * const community = await prisma.community.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunityFindFirstArgs>(args?: SelectSubset<T, CommunityFindFirstArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Community that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityFindFirstOrThrowArgs} args - Arguments to find a Community
     * @example
     * // Get one Community
     * const community = await prisma.community.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunityFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Communities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Communities
     * const communities = await prisma.community.findMany()
     * 
     * // Get first 10 Communities
     * const communities = await prisma.community.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communityWithIdOnly = await prisma.community.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunityFindManyArgs>(args?: SelectSubset<T, CommunityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Community.
     * @param {CommunityCreateArgs} args - Arguments to create a Community.
     * @example
     * // Create one Community
     * const Community = await prisma.community.create({
     *   data: {
     *     // ... data to create a Community
     *   }
     * })
     * 
     */
    create<T extends CommunityCreateArgs>(args: SelectSubset<T, CommunityCreateArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Communities.
     * @param {CommunityCreateManyArgs} args - Arguments to create many Communities.
     * @example
     * // Create many Communities
     * const community = await prisma.community.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunityCreateManyArgs>(args?: SelectSubset<T, CommunityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Communities and returns the data saved in the database.
     * @param {CommunityCreateManyAndReturnArgs} args - Arguments to create many Communities.
     * @example
     * // Create many Communities
     * const community = await prisma.community.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Communities and only return the `id`
     * const communityWithIdOnly = await prisma.community.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommunityCreateManyAndReturnArgs>(args?: SelectSubset<T, CommunityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Community.
     * @param {CommunityDeleteArgs} args - Arguments to delete one Community.
     * @example
     * // Delete one Community
     * const Community = await prisma.community.delete({
     *   where: {
     *     // ... filter to delete one Community
     *   }
     * })
     * 
     */
    delete<T extends CommunityDeleteArgs>(args: SelectSubset<T, CommunityDeleteArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Community.
     * @param {CommunityUpdateArgs} args - Arguments to update one Community.
     * @example
     * // Update one Community
     * const community = await prisma.community.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunityUpdateArgs>(args: SelectSubset<T, CommunityUpdateArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Communities.
     * @param {CommunityDeleteManyArgs} args - Arguments to filter Communities to delete.
     * @example
     * // Delete a few Communities
     * const { count } = await prisma.community.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunityDeleteManyArgs>(args?: SelectSubset<T, CommunityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Communities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Communities
     * const community = await prisma.community.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunityUpdateManyArgs>(args: SelectSubset<T, CommunityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Community.
     * @param {CommunityUpsertArgs} args - Arguments to update or create a Community.
     * @example
     * // Update or create a Community
     * const community = await prisma.community.upsert({
     *   create: {
     *     // ... data to create a Community
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Community we want to update
     *   }
     * })
     */
    upsert<T extends CommunityUpsertArgs>(args: SelectSubset<T, CommunityUpsertArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Communities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityCountArgs} args - Arguments to filter Communities to count.
     * @example
     * // Count the number of Communities
     * const count = await prisma.community.count({
     *   where: {
     *     // ... the filter for the Communities we want to count
     *   }
     * })
    **/
    count<T extends CommunityCountArgs>(
      args?: Subset<T, CommunityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Community.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommunityAggregateArgs>(args: Subset<T, CommunityAggregateArgs>): Prisma.PrismaPromise<GetCommunityAggregateType<T>>

    /**
     * Group by Community.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommunityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunityGroupByArgs['orderBy'] }
        : { orderBy?: CommunityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommunityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Community model
   */
  readonly fields: CommunityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Community.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    members<T extends Community$membersArgs<ExtArgs> = {}>(args?: Subset<T, Community$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Community model
   */ 
  interface CommunityFieldRefs {
    readonly id: FieldRef<"Community", 'Int'>
    readonly name: FieldRef<"Community", 'String'>
    readonly totalRegistered: FieldRef<"Community", 'Int'>
    readonly regionId: FieldRef<"Community", 'Int'>
    readonly registrationDate: FieldRef<"Community", 'DateTime'>
    readonly source: FieldRef<"Community", 'String'>
    readonly status: FieldRef<"Community", 'String'>
    readonly actions: FieldRef<"Community", 'String'>
    readonly createdAt: FieldRef<"Community", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Community findUnique
   */
  export type CommunityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * Filter, which Community to fetch.
     */
    where: CommunityWhereUniqueInput
  }

  /**
   * Community findUniqueOrThrow
   */
  export type CommunityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * Filter, which Community to fetch.
     */
    where: CommunityWhereUniqueInput
  }

  /**
   * Community findFirst
   */
  export type CommunityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * Filter, which Community to fetch.
     */
    where?: CommunityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communities to fetch.
     */
    orderBy?: CommunityOrderByWithRelationInput | CommunityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Communities.
     */
    cursor?: CommunityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Communities.
     */
    distinct?: CommunityScalarFieldEnum | CommunityScalarFieldEnum[]
  }

  /**
   * Community findFirstOrThrow
   */
  export type CommunityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * Filter, which Community to fetch.
     */
    where?: CommunityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communities to fetch.
     */
    orderBy?: CommunityOrderByWithRelationInput | CommunityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Communities.
     */
    cursor?: CommunityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Communities.
     */
    distinct?: CommunityScalarFieldEnum | CommunityScalarFieldEnum[]
  }

  /**
   * Community findMany
   */
  export type CommunityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * Filter, which Communities to fetch.
     */
    where?: CommunityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Communities to fetch.
     */
    orderBy?: CommunityOrderByWithRelationInput | CommunityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Communities.
     */
    cursor?: CommunityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Communities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Communities.
     */
    skip?: number
    distinct?: CommunityScalarFieldEnum | CommunityScalarFieldEnum[]
  }

  /**
   * Community create
   */
  export type CommunityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * The data needed to create a Community.
     */
    data: XOR<CommunityCreateInput, CommunityUncheckedCreateInput>
  }

  /**
   * Community createMany
   */
  export type CommunityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Communities.
     */
    data: CommunityCreateManyInput | CommunityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Community createManyAndReturn
   */
  export type CommunityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Communities.
     */
    data: CommunityCreateManyInput | CommunityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Community update
   */
  export type CommunityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * The data needed to update a Community.
     */
    data: XOR<CommunityUpdateInput, CommunityUncheckedUpdateInput>
    /**
     * Choose, which Community to update.
     */
    where: CommunityWhereUniqueInput
  }

  /**
   * Community updateMany
   */
  export type CommunityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Communities.
     */
    data: XOR<CommunityUpdateManyMutationInput, CommunityUncheckedUpdateManyInput>
    /**
     * Filter which Communities to update
     */
    where?: CommunityWhereInput
  }

  /**
   * Community upsert
   */
  export type CommunityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * The filter to search for the Community to update in case it exists.
     */
    where: CommunityWhereUniqueInput
    /**
     * In case the Community found by the `where` argument doesn't exist, create a new Community with this data.
     */
    create: XOR<CommunityCreateInput, CommunityUncheckedCreateInput>
    /**
     * In case the Community was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunityUpdateInput, CommunityUncheckedUpdateInput>
  }

  /**
   * Community delete
   */
  export type CommunityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    /**
     * Filter which Community to delete.
     */
    where: CommunityWhereUniqueInput
  }

  /**
   * Community deleteMany
   */
  export type CommunityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Communities to delete
     */
    where?: CommunityWhereInput
  }

  /**
   * Community.members
   */
  export type Community$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    where?: CommunityMemberWhereInput
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    cursor?: CommunityMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * Community without action
   */
  export type CommunityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
  }


  /**
   * Model Alert
   */

  export type AggregateAlert = {
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  export type AlertAvgAggregateOutputType = {
    id: number | null
    hazardTypeId: number | null
    createdByUserId: number | null
  }

  export type AlertSumAggregateOutputType = {
    id: number | null
    hazardTypeId: number | null
    createdByUserId: number | null
  }

  export type AlertMinAggregateOutputType = {
    id: number | null
    hazardTypeId: number | null
    severityLevel: string | null
    rawScientificDescription: string | null
    createdByUserId: number | null
    createdAt: Date | null
  }

  export type AlertMaxAggregateOutputType = {
    id: number | null
    hazardTypeId: number | null
    severityLevel: string | null
    rawScientificDescription: string | null
    createdByUserId: number | null
    createdAt: Date | null
  }

  export type AlertCountAggregateOutputType = {
    id: number
    hazardTypeId: number
    severityLevel: number
    rawScientificDescription: number
    createdByUserId: number
    createdAt: number
    _all: number
  }


  export type AlertAvgAggregateInputType = {
    id?: true
    hazardTypeId?: true
    createdByUserId?: true
  }

  export type AlertSumAggregateInputType = {
    id?: true
    hazardTypeId?: true
    createdByUserId?: true
  }

  export type AlertMinAggregateInputType = {
    id?: true
    hazardTypeId?: true
    severityLevel?: true
    rawScientificDescription?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AlertMaxAggregateInputType = {
    id?: true
    hazardTypeId?: true
    severityLevel?: true
    rawScientificDescription?: true
    createdByUserId?: true
    createdAt?: true
  }

  export type AlertCountAggregateInputType = {
    id?: true
    hazardTypeId?: true
    severityLevel?: true
    rawScientificDescription?: true
    createdByUserId?: true
    createdAt?: true
    _all?: true
  }

  export type AlertAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alert to aggregate.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Alerts
    **/
    _count?: true | AlertCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertMaxAggregateInputType
  }

  export type GetAlertAggregateType<T extends AlertAggregateArgs> = {
        [P in keyof T & keyof AggregateAlert]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlert[P]>
      : GetScalarType<T[P], AggregateAlert[P]>
  }




  export type AlertGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertWhereInput
    orderBy?: AlertOrderByWithAggregationInput | AlertOrderByWithAggregationInput[]
    by: AlertScalarFieldEnum[] | AlertScalarFieldEnum
    having?: AlertScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertCountAggregateInputType | true
    _avg?: AlertAvgAggregateInputType
    _sum?: AlertSumAggregateInputType
    _min?: AlertMinAggregateInputType
    _max?: AlertMaxAggregateInputType
  }

  export type AlertGroupByOutputType = {
    id: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId: number | null
    createdAt: Date
    _count: AlertCountAggregateOutputType | null
    _avg: AlertAvgAggregateOutputType | null
    _sum: AlertSumAggregateOutputType | null
    _min: AlertMinAggregateOutputType | null
    _max: AlertMaxAggregateOutputType | null
  }

  type GetAlertGroupByPayload<T extends AlertGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertGroupByOutputType[P]>
            : GetScalarType<T[P], AlertGroupByOutputType[P]>
        }
      >
    >


  export type AlertSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hazardTypeId?: boolean
    severityLevel?: boolean
    rawScientificDescription?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
    createdByUser?: boolean | Alert$createdByUserArgs<ExtArgs>
    alertRegions?: boolean | Alert$alertRegionsArgs<ExtArgs>
    alertHistory?: boolean | Alert$alertHistoryArgs<ExtArgs>
    _count?: boolean | AlertCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    hazardTypeId?: boolean
    severityLevel?: boolean
    rawScientificDescription?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
    createdByUser?: boolean | Alert$createdByUserArgs<ExtArgs>
  }, ExtArgs["result"]["alert"]>

  export type AlertSelectScalar = {
    id?: boolean
    hazardTypeId?: boolean
    severityLevel?: boolean
    rawScientificDescription?: boolean
    createdByUserId?: boolean
    createdAt?: boolean
  }

  export type AlertInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
    createdByUser?: boolean | Alert$createdByUserArgs<ExtArgs>
    alertRegions?: boolean | Alert$alertRegionsArgs<ExtArgs>
    alertHistory?: boolean | Alert$alertHistoryArgs<ExtArgs>
    _count?: boolean | AlertCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AlertIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
    createdByUser?: boolean | Alert$createdByUserArgs<ExtArgs>
  }

  export type $AlertPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Alert"
    objects: {
      hazardType: Prisma.$HazardTypePayload<ExtArgs>
      createdByUser: Prisma.$UserPayload<ExtArgs> | null
      alertRegions: Prisma.$AlertRegionPayload<ExtArgs>[]
      alertHistory: Prisma.$AlertHistoryPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      hazardTypeId: number
      severityLevel: string
      rawScientificDescription: string
      createdByUserId: number | null
      createdAt: Date
    }, ExtArgs["result"]["alert"]>
    composites: {}
  }

  type AlertGetPayload<S extends boolean | null | undefined | AlertDefaultArgs> = $Result.GetResult<Prisma.$AlertPayload, S>

  type AlertCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AlertFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlertCountAggregateInputType | true
    }

  export interface AlertDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Alert'], meta: { name: 'Alert' } }
    /**
     * Find zero or one Alert that matches the filter.
     * @param {AlertFindUniqueArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertFindUniqueArgs>(args: SelectSubset<T, AlertFindUniqueArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Alert that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AlertFindUniqueOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Alert that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertFindFirstArgs>(args?: SelectSubset<T, AlertFindFirstArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Alert that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindFirstOrThrowArgs} args - Arguments to find a Alert
     * @example
     * // Get one Alert
     * const alert = await prisma.alert.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Alerts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alerts
     * const alerts = await prisma.alert.findMany()
     * 
     * // Get first 10 Alerts
     * const alerts = await prisma.alert.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertWithIdOnly = await prisma.alert.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertFindManyArgs>(args?: SelectSubset<T, AlertFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Alert.
     * @param {AlertCreateArgs} args - Arguments to create a Alert.
     * @example
     * // Create one Alert
     * const Alert = await prisma.alert.create({
     *   data: {
     *     // ... data to create a Alert
     *   }
     * })
     * 
     */
    create<T extends AlertCreateArgs>(args: SelectSubset<T, AlertCreateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Alerts.
     * @param {AlertCreateManyArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertCreateManyArgs>(args?: SelectSubset<T, AlertCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Alerts and returns the data saved in the database.
     * @param {AlertCreateManyAndReturnArgs} args - Arguments to create many Alerts.
     * @example
     * // Create many Alerts
     * const alert = await prisma.alert.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Alerts and only return the `id`
     * const alertWithIdOnly = await prisma.alert.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Alert.
     * @param {AlertDeleteArgs} args - Arguments to delete one Alert.
     * @example
     * // Delete one Alert
     * const Alert = await prisma.alert.delete({
     *   where: {
     *     // ... filter to delete one Alert
     *   }
     * })
     * 
     */
    delete<T extends AlertDeleteArgs>(args: SelectSubset<T, AlertDeleteArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Alert.
     * @param {AlertUpdateArgs} args - Arguments to update one Alert.
     * @example
     * // Update one Alert
     * const alert = await prisma.alert.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertUpdateArgs>(args: SelectSubset<T, AlertUpdateArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Alerts.
     * @param {AlertDeleteManyArgs} args - Arguments to filter Alerts to delete.
     * @example
     * // Delete a few Alerts
     * const { count } = await prisma.alert.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertDeleteManyArgs>(args?: SelectSubset<T, AlertDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alerts
     * const alert = await prisma.alert.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertUpdateManyArgs>(args: SelectSubset<T, AlertUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Alert.
     * @param {AlertUpsertArgs} args - Arguments to update or create a Alert.
     * @example
     * // Update or create a Alert
     * const alert = await prisma.alert.upsert({
     *   create: {
     *     // ... data to create a Alert
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alert we want to update
     *   }
     * })
     */
    upsert<T extends AlertUpsertArgs>(args: SelectSubset<T, AlertUpsertArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Alerts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertCountArgs} args - Arguments to filter Alerts to count.
     * @example
     * // Count the number of Alerts
     * const count = await prisma.alert.count({
     *   where: {
     *     // ... the filter for the Alerts we want to count
     *   }
     * })
    **/
    count<T extends AlertCountArgs>(
      args?: Subset<T, AlertCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertAggregateArgs>(args: Subset<T, AlertAggregateArgs>): Prisma.PrismaPromise<GetAlertAggregateType<T>>

    /**
     * Group by Alert.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertGroupByArgs['orderBy'] }
        : { orderBy?: AlertGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Alert model
   */
  readonly fields: AlertFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Alert.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    hazardType<T extends HazardTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HazardTypeDefaultArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    createdByUser<T extends Alert$createdByUserArgs<ExtArgs> = {}>(args?: Subset<T, Alert$createdByUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    alertRegions<T extends Alert$alertRegionsArgs<ExtArgs> = {}>(args?: Subset<T, Alert$alertRegionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findMany"> | Null>
    alertHistory<T extends Alert$alertHistoryArgs<ExtArgs> = {}>(args?: Subset<T, Alert$alertHistoryArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Alert model
   */ 
  interface AlertFieldRefs {
    readonly id: FieldRef<"Alert", 'Int'>
    readonly hazardTypeId: FieldRef<"Alert", 'Int'>
    readonly severityLevel: FieldRef<"Alert", 'String'>
    readonly rawScientificDescription: FieldRef<"Alert", 'String'>
    readonly createdByUserId: FieldRef<"Alert", 'Int'>
    readonly createdAt: FieldRef<"Alert", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Alert findUnique
   */
  export type AlertFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findUniqueOrThrow
   */
  export type AlertFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert findFirst
   */
  export type AlertFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findFirstOrThrow
   */
  export type AlertFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alert to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Alerts.
     */
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert findMany
   */
  export type AlertFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter, which Alerts to fetch.
     */
    where?: AlertWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Alerts to fetch.
     */
    orderBy?: AlertOrderByWithRelationInput | AlertOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Alerts.
     */
    cursor?: AlertWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Alerts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Alerts.
     */
    skip?: number
    distinct?: AlertScalarFieldEnum | AlertScalarFieldEnum[]
  }

  /**
   * Alert create
   */
  export type AlertCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to create a Alert.
     */
    data: XOR<AlertCreateInput, AlertUncheckedCreateInput>
  }

  /**
   * Alert createMany
   */
  export type AlertCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Alert createManyAndReturn
   */
  export type AlertCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Alerts.
     */
    data: AlertCreateManyInput | AlertCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Alert update
   */
  export type AlertUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The data needed to update a Alert.
     */
    data: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
    /**
     * Choose, which Alert to update.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert updateMany
   */
  export type AlertUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Alerts.
     */
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyInput>
    /**
     * Filter which Alerts to update
     */
    where?: AlertWhereInput
  }

  /**
   * Alert upsert
   */
  export type AlertUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * The filter to search for the Alert to update in case it exists.
     */
    where: AlertWhereUniqueInput
    /**
     * In case the Alert found by the `where` argument doesn't exist, create a new Alert with this data.
     */
    create: XOR<AlertCreateInput, AlertUncheckedCreateInput>
    /**
     * In case the Alert was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertUpdateInput, AlertUncheckedUpdateInput>
  }

  /**
   * Alert delete
   */
  export type AlertDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
    /**
     * Filter which Alert to delete.
     */
    where: AlertWhereUniqueInput
  }

  /**
   * Alert deleteMany
   */
  export type AlertDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Alerts to delete
     */
    where?: AlertWhereInput
  }

  /**
   * Alert.createdByUser
   */
  export type Alert$createdByUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Alert.alertRegions
   */
  export type Alert$alertRegionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    where?: AlertRegionWhereInput
    orderBy?: AlertRegionOrderByWithRelationInput | AlertRegionOrderByWithRelationInput[]
    cursor?: AlertRegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertRegionScalarFieldEnum | AlertRegionScalarFieldEnum[]
  }

  /**
   * Alert.alertHistory
   */
  export type Alert$alertHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    where?: AlertHistoryWhereInput
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    cursor?: AlertHistoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * Alert without action
   */
  export type AlertDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Alert
     */
    select?: AlertSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertInclude<ExtArgs> | null
  }


  /**
   * Model AlertRegion
   */

  export type AggregateAlertRegion = {
    _count: AlertRegionCountAggregateOutputType | null
    _avg: AlertRegionAvgAggregateOutputType | null
    _sum: AlertRegionSumAggregateOutputType | null
    _min: AlertRegionMinAggregateOutputType | null
    _max: AlertRegionMaxAggregateOutputType | null
  }

  export type AlertRegionAvgAggregateOutputType = {
    alertId: number | null
    regionId: number | null
  }

  export type AlertRegionSumAggregateOutputType = {
    alertId: number | null
    regionId: number | null
  }

  export type AlertRegionMinAggregateOutputType = {
    alertId: number | null
    regionId: number | null
  }

  export type AlertRegionMaxAggregateOutputType = {
    alertId: number | null
    regionId: number | null
  }

  export type AlertRegionCountAggregateOutputType = {
    alertId: number
    regionId: number
    _all: number
  }


  export type AlertRegionAvgAggregateInputType = {
    alertId?: true
    regionId?: true
  }

  export type AlertRegionSumAggregateInputType = {
    alertId?: true
    regionId?: true
  }

  export type AlertRegionMinAggregateInputType = {
    alertId?: true
    regionId?: true
  }

  export type AlertRegionMaxAggregateInputType = {
    alertId?: true
    regionId?: true
  }

  export type AlertRegionCountAggregateInputType = {
    alertId?: true
    regionId?: true
    _all?: true
  }

  export type AlertRegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertRegion to aggregate.
     */
    where?: AlertRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRegions to fetch.
     */
    orderBy?: AlertRegionOrderByWithRelationInput | AlertRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlertRegions
    **/
    _count?: true | AlertRegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertRegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertRegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertRegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertRegionMaxAggregateInputType
  }

  export type GetAlertRegionAggregateType<T extends AlertRegionAggregateArgs> = {
        [P in keyof T & keyof AggregateAlertRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlertRegion[P]>
      : GetScalarType<T[P], AggregateAlertRegion[P]>
  }




  export type AlertRegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertRegionWhereInput
    orderBy?: AlertRegionOrderByWithAggregationInput | AlertRegionOrderByWithAggregationInput[]
    by: AlertRegionScalarFieldEnum[] | AlertRegionScalarFieldEnum
    having?: AlertRegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertRegionCountAggregateInputType | true
    _avg?: AlertRegionAvgAggregateInputType
    _sum?: AlertRegionSumAggregateInputType
    _min?: AlertRegionMinAggregateInputType
    _max?: AlertRegionMaxAggregateInputType
  }

  export type AlertRegionGroupByOutputType = {
    alertId: number
    regionId: number
    _count: AlertRegionCountAggregateOutputType | null
    _avg: AlertRegionAvgAggregateOutputType | null
    _sum: AlertRegionSumAggregateOutputType | null
    _min: AlertRegionMinAggregateOutputType | null
    _max: AlertRegionMaxAggregateOutputType | null
  }

  type GetAlertRegionGroupByPayload<T extends AlertRegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertRegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertRegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertRegionGroupByOutputType[P]>
            : GetScalarType<T[P], AlertRegionGroupByOutputType[P]>
        }
      >
    >


  export type AlertRegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    alertId?: boolean
    regionId?: boolean
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertRegion"]>

  export type AlertRegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    alertId?: boolean
    regionId?: boolean
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertRegion"]>

  export type AlertRegionSelectScalar = {
    alertId?: boolean
    regionId?: boolean
  }

  export type AlertRegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type AlertRegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $AlertRegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlertRegion"
    objects: {
      alert: Prisma.$AlertPayload<ExtArgs>
      region: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      alertId: number
      regionId: number
    }, ExtArgs["result"]["alertRegion"]>
    composites: {}
  }

  type AlertRegionGetPayload<S extends boolean | null | undefined | AlertRegionDefaultArgs> = $Result.GetResult<Prisma.$AlertRegionPayload, S>

  type AlertRegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AlertRegionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlertRegionCountAggregateInputType | true
    }

  export interface AlertRegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlertRegion'], meta: { name: 'AlertRegion' } }
    /**
     * Find zero or one AlertRegion that matches the filter.
     * @param {AlertRegionFindUniqueArgs} args - Arguments to find a AlertRegion
     * @example
     * // Get one AlertRegion
     * const alertRegion = await prisma.alertRegion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertRegionFindUniqueArgs>(args: SelectSubset<T, AlertRegionFindUniqueArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AlertRegion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AlertRegionFindUniqueOrThrowArgs} args - Arguments to find a AlertRegion
     * @example
     * // Get one AlertRegion
     * const alertRegion = await prisma.alertRegion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertRegionFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertRegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AlertRegion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionFindFirstArgs} args - Arguments to find a AlertRegion
     * @example
     * // Get one AlertRegion
     * const alertRegion = await prisma.alertRegion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertRegionFindFirstArgs>(args?: SelectSubset<T, AlertRegionFindFirstArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AlertRegion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionFindFirstOrThrowArgs} args - Arguments to find a AlertRegion
     * @example
     * // Get one AlertRegion
     * const alertRegion = await prisma.alertRegion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertRegionFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertRegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AlertRegions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertRegions
     * const alertRegions = await prisma.alertRegion.findMany()
     * 
     * // Get first 10 AlertRegions
     * const alertRegions = await prisma.alertRegion.findMany({ take: 10 })
     * 
     * // Only select the `alertId`
     * const alertRegionWithAlertIdOnly = await prisma.alertRegion.findMany({ select: { alertId: true } })
     * 
     */
    findMany<T extends AlertRegionFindManyArgs>(args?: SelectSubset<T, AlertRegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AlertRegion.
     * @param {AlertRegionCreateArgs} args - Arguments to create a AlertRegion.
     * @example
     * // Create one AlertRegion
     * const AlertRegion = await prisma.alertRegion.create({
     *   data: {
     *     // ... data to create a AlertRegion
     *   }
     * })
     * 
     */
    create<T extends AlertRegionCreateArgs>(args: SelectSubset<T, AlertRegionCreateArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AlertRegions.
     * @param {AlertRegionCreateManyArgs} args - Arguments to create many AlertRegions.
     * @example
     * // Create many AlertRegions
     * const alertRegion = await prisma.alertRegion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertRegionCreateManyArgs>(args?: SelectSubset<T, AlertRegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlertRegions and returns the data saved in the database.
     * @param {AlertRegionCreateManyAndReturnArgs} args - Arguments to create many AlertRegions.
     * @example
     * // Create many AlertRegions
     * const alertRegion = await prisma.alertRegion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlertRegions and only return the `alertId`
     * const alertRegionWithAlertIdOnly = await prisma.alertRegion.createManyAndReturn({ 
     *   select: { alertId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertRegionCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertRegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AlertRegion.
     * @param {AlertRegionDeleteArgs} args - Arguments to delete one AlertRegion.
     * @example
     * // Delete one AlertRegion
     * const AlertRegion = await prisma.alertRegion.delete({
     *   where: {
     *     // ... filter to delete one AlertRegion
     *   }
     * })
     * 
     */
    delete<T extends AlertRegionDeleteArgs>(args: SelectSubset<T, AlertRegionDeleteArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AlertRegion.
     * @param {AlertRegionUpdateArgs} args - Arguments to update one AlertRegion.
     * @example
     * // Update one AlertRegion
     * const alertRegion = await prisma.alertRegion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertRegionUpdateArgs>(args: SelectSubset<T, AlertRegionUpdateArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AlertRegions.
     * @param {AlertRegionDeleteManyArgs} args - Arguments to filter AlertRegions to delete.
     * @example
     * // Delete a few AlertRegions
     * const { count } = await prisma.alertRegion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertRegionDeleteManyArgs>(args?: SelectSubset<T, AlertRegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertRegions
     * const alertRegion = await prisma.alertRegion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertRegionUpdateManyArgs>(args: SelectSubset<T, AlertRegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AlertRegion.
     * @param {AlertRegionUpsertArgs} args - Arguments to update or create a AlertRegion.
     * @example
     * // Update or create a AlertRegion
     * const alertRegion = await prisma.alertRegion.upsert({
     *   create: {
     *     // ... data to create a AlertRegion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertRegion we want to update
     *   }
     * })
     */
    upsert<T extends AlertRegionUpsertArgs>(args: SelectSubset<T, AlertRegionUpsertArgs<ExtArgs>>): Prisma__AlertRegionClient<$Result.GetResult<Prisma.$AlertRegionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AlertRegions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionCountArgs} args - Arguments to filter AlertRegions to count.
     * @example
     * // Count the number of AlertRegions
     * const count = await prisma.alertRegion.count({
     *   where: {
     *     // ... the filter for the AlertRegions we want to count
     *   }
     * })
    **/
    count<T extends AlertRegionCountArgs>(
      args?: Subset<T, AlertRegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertRegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlertRegion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertRegionAggregateArgs>(args: Subset<T, AlertRegionAggregateArgs>): Prisma.PrismaPromise<GetAlertRegionAggregateType<T>>

    /**
     * Group by AlertRegion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertRegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertRegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertRegionGroupByArgs['orderBy'] }
        : { orderBy?: AlertRegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertRegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlertRegion model
   */
  readonly fields: AlertRegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlertRegion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertRegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert<T extends AlertDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlertDefaultArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlertRegion model
   */ 
  interface AlertRegionFieldRefs {
    readonly alertId: FieldRef<"AlertRegion", 'Int'>
    readonly regionId: FieldRef<"AlertRegion", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AlertRegion findUnique
   */
  export type AlertRegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * Filter, which AlertRegion to fetch.
     */
    where: AlertRegionWhereUniqueInput
  }

  /**
   * AlertRegion findUniqueOrThrow
   */
  export type AlertRegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * Filter, which AlertRegion to fetch.
     */
    where: AlertRegionWhereUniqueInput
  }

  /**
   * AlertRegion findFirst
   */
  export type AlertRegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * Filter, which AlertRegion to fetch.
     */
    where?: AlertRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRegions to fetch.
     */
    orderBy?: AlertRegionOrderByWithRelationInput | AlertRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertRegions.
     */
    cursor?: AlertRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRegions.
     */
    distinct?: AlertRegionScalarFieldEnum | AlertRegionScalarFieldEnum[]
  }

  /**
   * AlertRegion findFirstOrThrow
   */
  export type AlertRegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * Filter, which AlertRegion to fetch.
     */
    where?: AlertRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRegions to fetch.
     */
    orderBy?: AlertRegionOrderByWithRelationInput | AlertRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertRegions.
     */
    cursor?: AlertRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRegions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertRegions.
     */
    distinct?: AlertRegionScalarFieldEnum | AlertRegionScalarFieldEnum[]
  }

  /**
   * AlertRegion findMany
   */
  export type AlertRegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * Filter, which AlertRegions to fetch.
     */
    where?: AlertRegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertRegions to fetch.
     */
    orderBy?: AlertRegionOrderByWithRelationInput | AlertRegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlertRegions.
     */
    cursor?: AlertRegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertRegions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertRegions.
     */
    skip?: number
    distinct?: AlertRegionScalarFieldEnum | AlertRegionScalarFieldEnum[]
  }

  /**
   * AlertRegion create
   */
  export type AlertRegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * The data needed to create a AlertRegion.
     */
    data: XOR<AlertRegionCreateInput, AlertRegionUncheckedCreateInput>
  }

  /**
   * AlertRegion createMany
   */
  export type AlertRegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertRegions.
     */
    data: AlertRegionCreateManyInput | AlertRegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertRegion createManyAndReturn
   */
  export type AlertRegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AlertRegions.
     */
    data: AlertRegionCreateManyInput | AlertRegionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlertRegion update
   */
  export type AlertRegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * The data needed to update a AlertRegion.
     */
    data: XOR<AlertRegionUpdateInput, AlertRegionUncheckedUpdateInput>
    /**
     * Choose, which AlertRegion to update.
     */
    where: AlertRegionWhereUniqueInput
  }

  /**
   * AlertRegion updateMany
   */
  export type AlertRegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertRegions.
     */
    data: XOR<AlertRegionUpdateManyMutationInput, AlertRegionUncheckedUpdateManyInput>
    /**
     * Filter which AlertRegions to update
     */
    where?: AlertRegionWhereInput
  }

  /**
   * AlertRegion upsert
   */
  export type AlertRegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * The filter to search for the AlertRegion to update in case it exists.
     */
    where: AlertRegionWhereUniqueInput
    /**
     * In case the AlertRegion found by the `where` argument doesn't exist, create a new AlertRegion with this data.
     */
    create: XOR<AlertRegionCreateInput, AlertRegionUncheckedCreateInput>
    /**
     * In case the AlertRegion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertRegionUpdateInput, AlertRegionUncheckedUpdateInput>
  }

  /**
   * AlertRegion delete
   */
  export type AlertRegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
    /**
     * Filter which AlertRegion to delete.
     */
    where: AlertRegionWhereUniqueInput
  }

  /**
   * AlertRegion deleteMany
   */
  export type AlertRegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertRegions to delete
     */
    where?: AlertRegionWhereInput
  }

  /**
   * AlertRegion without action
   */
  export type AlertRegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertRegion
     */
    select?: AlertRegionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertRegionInclude<ExtArgs> | null
  }


  /**
   * Model AlertHistory
   */

  export type AggregateAlertHistory = {
    _count: AlertHistoryCountAggregateOutputType | null
    _avg: AlertHistoryAvgAggregateOutputType | null
    _sum: AlertHistorySumAggregateOutputType | null
    _min: AlertHistoryMinAggregateOutputType | null
    _max: AlertHistoryMaxAggregateOutputType | null
  }

  export type AlertHistoryAvgAggregateOutputType = {
    id: number | null
    alertId: number | null
    regionId: number | null
    callsCount: number | null
  }

  export type AlertHistorySumAggregateOutputType = {
    id: number | null
    alertId: number | null
    regionId: number | null
    callsCount: number | null
  }

  export type AlertHistoryMinAggregateOutputType = {
    id: number | null
    alertId: number | null
    regionId: number | null
    dialect: string | null
    status: string | null
    callsCount: number | null
    dispatchedAt: Date | null
    simplifiedText: string | null
    translatedText: string | null
    audioUrl: string | null
  }

  export type AlertHistoryMaxAggregateOutputType = {
    id: number | null
    alertId: number | null
    regionId: number | null
    dialect: string | null
    status: string | null
    callsCount: number | null
    dispatchedAt: Date | null
    simplifiedText: string | null
    translatedText: string | null
    audioUrl: string | null
  }

  export type AlertHistoryCountAggregateOutputType = {
    id: number
    alertId: number
    regionId: number
    dialect: number
    status: number
    callsCount: number
    dispatchedAt: number
    simplifiedText: number
    translatedText: number
    audioUrl: number
    _all: number
  }


  export type AlertHistoryAvgAggregateInputType = {
    id?: true
    alertId?: true
    regionId?: true
    callsCount?: true
  }

  export type AlertHistorySumAggregateInputType = {
    id?: true
    alertId?: true
    regionId?: true
    callsCount?: true
  }

  export type AlertHistoryMinAggregateInputType = {
    id?: true
    alertId?: true
    regionId?: true
    dialect?: true
    status?: true
    callsCount?: true
    dispatchedAt?: true
    simplifiedText?: true
    translatedText?: true
    audioUrl?: true
  }

  export type AlertHistoryMaxAggregateInputType = {
    id?: true
    alertId?: true
    regionId?: true
    dialect?: true
    status?: true
    callsCount?: true
    dispatchedAt?: true
    simplifiedText?: true
    translatedText?: true
    audioUrl?: true
  }

  export type AlertHistoryCountAggregateInputType = {
    id?: true
    alertId?: true
    regionId?: true
    dialect?: true
    status?: true
    callsCount?: true
    dispatchedAt?: true
    simplifiedText?: true
    translatedText?: true
    audioUrl?: true
    _all?: true
  }

  export type AlertHistoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertHistory to aggregate.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AlertHistories
    **/
    _count?: true | AlertHistoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AlertHistoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AlertHistorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlertHistoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlertHistoryMaxAggregateInputType
  }

  export type GetAlertHistoryAggregateType<T extends AlertHistoryAggregateArgs> = {
        [P in keyof T & keyof AggregateAlertHistory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlertHistory[P]>
      : GetScalarType<T[P], AggregateAlertHistory[P]>
  }




  export type AlertHistoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AlertHistoryWhereInput
    orderBy?: AlertHistoryOrderByWithAggregationInput | AlertHistoryOrderByWithAggregationInput[]
    by: AlertHistoryScalarFieldEnum[] | AlertHistoryScalarFieldEnum
    having?: AlertHistoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlertHistoryCountAggregateInputType | true
    _avg?: AlertHistoryAvgAggregateInputType
    _sum?: AlertHistorySumAggregateInputType
    _min?: AlertHistoryMinAggregateInputType
    _max?: AlertHistoryMaxAggregateInputType
  }

  export type AlertHistoryGroupByOutputType = {
    id: number
    alertId: number
    regionId: number
    dialect: string
    status: string
    callsCount: number
    dispatchedAt: Date
    simplifiedText: string | null
    translatedText: string | null
    audioUrl: string | null
    _count: AlertHistoryCountAggregateOutputType | null
    _avg: AlertHistoryAvgAggregateOutputType | null
    _sum: AlertHistorySumAggregateOutputType | null
    _min: AlertHistoryMinAggregateOutputType | null
    _max: AlertHistoryMaxAggregateOutputType | null
  }

  type GetAlertHistoryGroupByPayload<T extends AlertHistoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AlertHistoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlertHistoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlertHistoryGroupByOutputType[P]>
            : GetScalarType<T[P], AlertHistoryGroupByOutputType[P]>
        }
      >
    >


  export type AlertHistorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertId?: boolean
    regionId?: boolean
    dialect?: boolean
    status?: boolean
    callsCount?: boolean
    dispatchedAt?: boolean
    simplifiedText?: boolean
    translatedText?: boolean
    audioUrl?: boolean
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    feedbackLogs?: boolean | AlertHistory$feedbackLogsArgs<ExtArgs>
    callAttempts?: boolean | AlertHistory$callAttemptsArgs<ExtArgs>
    _count?: boolean | AlertHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertHistory"]>

  export type AlertHistorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertId?: boolean
    regionId?: boolean
    dialect?: boolean
    status?: boolean
    callsCount?: boolean
    dispatchedAt?: boolean
    simplifiedText?: boolean
    translatedText?: boolean
    audioUrl?: boolean
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["alertHistory"]>

  export type AlertHistorySelectScalar = {
    id?: boolean
    alertId?: boolean
    regionId?: boolean
    dialect?: boolean
    status?: boolean
    callsCount?: boolean
    dispatchedAt?: boolean
    simplifiedText?: boolean
    translatedText?: boolean
    audioUrl?: boolean
  }

  export type AlertHistoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    feedbackLogs?: boolean | AlertHistory$feedbackLogsArgs<ExtArgs>
    callAttempts?: boolean | AlertHistory$callAttemptsArgs<ExtArgs>
    _count?: boolean | AlertHistoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type AlertHistoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alert?: boolean | AlertDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $AlertHistoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AlertHistory"
    objects: {
      alert: Prisma.$AlertPayload<ExtArgs>
      region: Prisma.$RegionPayload<ExtArgs>
      feedbackLogs: Prisma.$FeedbackLogPayload<ExtArgs>[]
      callAttempts: Prisma.$CallAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      alertId: number
      regionId: number
      dialect: string
      status: string
      callsCount: number
      dispatchedAt: Date
      simplifiedText: string | null
      translatedText: string | null
      audioUrl: string | null
    }, ExtArgs["result"]["alertHistory"]>
    composites: {}
  }

  type AlertHistoryGetPayload<S extends boolean | null | undefined | AlertHistoryDefaultArgs> = $Result.GetResult<Prisma.$AlertHistoryPayload, S>

  type AlertHistoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AlertHistoryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AlertHistoryCountAggregateInputType | true
    }

  export interface AlertHistoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AlertHistory'], meta: { name: 'AlertHistory' } }
    /**
     * Find zero or one AlertHistory that matches the filter.
     * @param {AlertHistoryFindUniqueArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AlertHistoryFindUniqueArgs>(args: SelectSubset<T, AlertHistoryFindUniqueArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AlertHistory that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AlertHistoryFindUniqueOrThrowArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AlertHistoryFindUniqueOrThrowArgs>(args: SelectSubset<T, AlertHistoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AlertHistory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindFirstArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AlertHistoryFindFirstArgs>(args?: SelectSubset<T, AlertHistoryFindFirstArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AlertHistory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindFirstOrThrowArgs} args - Arguments to find a AlertHistory
     * @example
     * // Get one AlertHistory
     * const alertHistory = await prisma.alertHistory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AlertHistoryFindFirstOrThrowArgs>(args?: SelectSubset<T, AlertHistoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AlertHistories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AlertHistories
     * const alertHistories = await prisma.alertHistory.findMany()
     * 
     * // Get first 10 AlertHistories
     * const alertHistories = await prisma.alertHistory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AlertHistoryFindManyArgs>(args?: SelectSubset<T, AlertHistoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AlertHistory.
     * @param {AlertHistoryCreateArgs} args - Arguments to create a AlertHistory.
     * @example
     * // Create one AlertHistory
     * const AlertHistory = await prisma.alertHistory.create({
     *   data: {
     *     // ... data to create a AlertHistory
     *   }
     * })
     * 
     */
    create<T extends AlertHistoryCreateArgs>(args: SelectSubset<T, AlertHistoryCreateArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AlertHistories.
     * @param {AlertHistoryCreateManyArgs} args - Arguments to create many AlertHistories.
     * @example
     * // Create many AlertHistories
     * const alertHistory = await prisma.alertHistory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AlertHistoryCreateManyArgs>(args?: SelectSubset<T, AlertHistoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AlertHistories and returns the data saved in the database.
     * @param {AlertHistoryCreateManyAndReturnArgs} args - Arguments to create many AlertHistories.
     * @example
     * // Create many AlertHistories
     * const alertHistory = await prisma.alertHistory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AlertHistories and only return the `id`
     * const alertHistoryWithIdOnly = await prisma.alertHistory.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AlertHistoryCreateManyAndReturnArgs>(args?: SelectSubset<T, AlertHistoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AlertHistory.
     * @param {AlertHistoryDeleteArgs} args - Arguments to delete one AlertHistory.
     * @example
     * // Delete one AlertHistory
     * const AlertHistory = await prisma.alertHistory.delete({
     *   where: {
     *     // ... filter to delete one AlertHistory
     *   }
     * })
     * 
     */
    delete<T extends AlertHistoryDeleteArgs>(args: SelectSubset<T, AlertHistoryDeleteArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AlertHistory.
     * @param {AlertHistoryUpdateArgs} args - Arguments to update one AlertHistory.
     * @example
     * // Update one AlertHistory
     * const alertHistory = await prisma.alertHistory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AlertHistoryUpdateArgs>(args: SelectSubset<T, AlertHistoryUpdateArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AlertHistories.
     * @param {AlertHistoryDeleteManyArgs} args - Arguments to filter AlertHistories to delete.
     * @example
     * // Delete a few AlertHistories
     * const { count } = await prisma.alertHistory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AlertHistoryDeleteManyArgs>(args?: SelectSubset<T, AlertHistoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AlertHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AlertHistories
     * const alertHistory = await prisma.alertHistory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AlertHistoryUpdateManyArgs>(args: SelectSubset<T, AlertHistoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AlertHistory.
     * @param {AlertHistoryUpsertArgs} args - Arguments to update or create a AlertHistory.
     * @example
     * // Update or create a AlertHistory
     * const alertHistory = await prisma.alertHistory.upsert({
     *   create: {
     *     // ... data to create a AlertHistory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AlertHistory we want to update
     *   }
     * })
     */
    upsert<T extends AlertHistoryUpsertArgs>(args: SelectSubset<T, AlertHistoryUpsertArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AlertHistories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryCountArgs} args - Arguments to filter AlertHistories to count.
     * @example
     * // Count the number of AlertHistories
     * const count = await prisma.alertHistory.count({
     *   where: {
     *     // ... the filter for the AlertHistories we want to count
     *   }
     * })
    **/
    count<T extends AlertHistoryCountArgs>(
      args?: Subset<T, AlertHistoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlertHistoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AlertHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlertHistoryAggregateArgs>(args: Subset<T, AlertHistoryAggregateArgs>): Prisma.PrismaPromise<GetAlertHistoryAggregateType<T>>

    /**
     * Group by AlertHistory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlertHistoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlertHistoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlertHistoryGroupByArgs['orderBy'] }
        : { orderBy?: AlertHistoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlertHistoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlertHistoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AlertHistory model
   */
  readonly fields: AlertHistoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AlertHistory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AlertHistoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alert<T extends AlertDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlertDefaultArgs<ExtArgs>>): Prisma__AlertClient<$Result.GetResult<Prisma.$AlertPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    feedbackLogs<T extends AlertHistory$feedbackLogsArgs<ExtArgs> = {}>(args?: Subset<T, AlertHistory$feedbackLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findMany"> | Null>
    callAttempts<T extends AlertHistory$callAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, AlertHistory$callAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AlertHistory model
   */ 
  interface AlertHistoryFieldRefs {
    readonly id: FieldRef<"AlertHistory", 'Int'>
    readonly alertId: FieldRef<"AlertHistory", 'Int'>
    readonly regionId: FieldRef<"AlertHistory", 'Int'>
    readonly dialect: FieldRef<"AlertHistory", 'String'>
    readonly status: FieldRef<"AlertHistory", 'String'>
    readonly callsCount: FieldRef<"AlertHistory", 'Int'>
    readonly dispatchedAt: FieldRef<"AlertHistory", 'DateTime'>
    readonly simplifiedText: FieldRef<"AlertHistory", 'String'>
    readonly translatedText: FieldRef<"AlertHistory", 'String'>
    readonly audioUrl: FieldRef<"AlertHistory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AlertHistory findUnique
   */
  export type AlertHistoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory findUniqueOrThrow
   */
  export type AlertHistoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory findFirst
   */
  export type AlertHistoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertHistories.
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertHistory findFirstOrThrow
   */
  export type AlertHistoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistory to fetch.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AlertHistories.
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AlertHistories.
     */
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertHistory findMany
   */
  export type AlertHistoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter, which AlertHistories to fetch.
     */
    where?: AlertHistoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AlertHistories to fetch.
     */
    orderBy?: AlertHistoryOrderByWithRelationInput | AlertHistoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AlertHistories.
     */
    cursor?: AlertHistoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AlertHistories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AlertHistories.
     */
    skip?: number
    distinct?: AlertHistoryScalarFieldEnum | AlertHistoryScalarFieldEnum[]
  }

  /**
   * AlertHistory create
   */
  export type AlertHistoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * The data needed to create a AlertHistory.
     */
    data: XOR<AlertHistoryCreateInput, AlertHistoryUncheckedCreateInput>
  }

  /**
   * AlertHistory createMany
   */
  export type AlertHistoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AlertHistories.
     */
    data: AlertHistoryCreateManyInput | AlertHistoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AlertHistory createManyAndReturn
   */
  export type AlertHistoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AlertHistories.
     */
    data: AlertHistoryCreateManyInput | AlertHistoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AlertHistory update
   */
  export type AlertHistoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * The data needed to update a AlertHistory.
     */
    data: XOR<AlertHistoryUpdateInput, AlertHistoryUncheckedUpdateInput>
    /**
     * Choose, which AlertHistory to update.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory updateMany
   */
  export type AlertHistoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AlertHistories.
     */
    data: XOR<AlertHistoryUpdateManyMutationInput, AlertHistoryUncheckedUpdateManyInput>
    /**
     * Filter which AlertHistories to update
     */
    where?: AlertHistoryWhereInput
  }

  /**
   * AlertHistory upsert
   */
  export type AlertHistoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * The filter to search for the AlertHistory to update in case it exists.
     */
    where: AlertHistoryWhereUniqueInput
    /**
     * In case the AlertHistory found by the `where` argument doesn't exist, create a new AlertHistory with this data.
     */
    create: XOR<AlertHistoryCreateInput, AlertHistoryUncheckedCreateInput>
    /**
     * In case the AlertHistory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AlertHistoryUpdateInput, AlertHistoryUncheckedUpdateInput>
  }

  /**
   * AlertHistory delete
   */
  export type AlertHistoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
    /**
     * Filter which AlertHistory to delete.
     */
    where: AlertHistoryWhereUniqueInput
  }

  /**
   * AlertHistory deleteMany
   */
  export type AlertHistoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AlertHistories to delete
     */
    where?: AlertHistoryWhereInput
  }

  /**
   * AlertHistory.feedbackLogs
   */
  export type AlertHistory$feedbackLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    where?: FeedbackLogWhereInput
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    cursor?: FeedbackLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeedbackLogScalarFieldEnum | FeedbackLogScalarFieldEnum[]
  }

  /**
   * AlertHistory.callAttempts
   */
  export type AlertHistory$callAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    where?: CallAttemptWhereInput
    orderBy?: CallAttemptOrderByWithRelationInput | CallAttemptOrderByWithRelationInput[]
    cursor?: CallAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallAttemptScalarFieldEnum | CallAttemptScalarFieldEnum[]
  }

  /**
   * AlertHistory without action
   */
  export type AlertHistoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AlertHistory
     */
    select?: AlertHistorySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AlertHistoryInclude<ExtArgs> | null
  }


  /**
   * Model FeedbackLog
   */

  export type AggregateFeedbackLog = {
    _count: FeedbackLogCountAggregateOutputType | null
    _avg: FeedbackLogAvgAggregateOutputType | null
    _sum: FeedbackLogSumAggregateOutputType | null
    _min: FeedbackLogMinAggregateOutputType | null
    _max: FeedbackLogMaxAggregateOutputType | null
  }

  export type FeedbackLogAvgAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    regionId: number | null
    hazardTypeId: number | null
  }

  export type FeedbackLogSumAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    regionId: number | null
    hazardTypeId: number | null
  }

  export type FeedbackLogMinAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    regionId: number | null
    hazardTypeId: number | null
    audioFeedbackUrl: string | null
    translationText: string | null
    status: string | null
    adminResponse: string | null
    respondedAt: Date | null
    createdAt: Date | null
  }

  export type FeedbackLogMaxAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    regionId: number | null
    hazardTypeId: number | null
    audioFeedbackUrl: string | null
    translationText: string | null
    status: string | null
    adminResponse: string | null
    respondedAt: Date | null
    createdAt: Date | null
  }

  export type FeedbackLogCountAggregateOutputType = {
    id: number
    alertHistoryId: number
    regionId: number
    hazardTypeId: number
    audioFeedbackUrl: number
    translationText: number
    status: number
    adminResponse: number
    respondedAt: number
    createdAt: number
    _all: number
  }


  export type FeedbackLogAvgAggregateInputType = {
    id?: true
    alertHistoryId?: true
    regionId?: true
    hazardTypeId?: true
  }

  export type FeedbackLogSumAggregateInputType = {
    id?: true
    alertHistoryId?: true
    regionId?: true
    hazardTypeId?: true
  }

  export type FeedbackLogMinAggregateInputType = {
    id?: true
    alertHistoryId?: true
    regionId?: true
    hazardTypeId?: true
    audioFeedbackUrl?: true
    translationText?: true
    status?: true
    adminResponse?: true
    respondedAt?: true
    createdAt?: true
  }

  export type FeedbackLogMaxAggregateInputType = {
    id?: true
    alertHistoryId?: true
    regionId?: true
    hazardTypeId?: true
    audioFeedbackUrl?: true
    translationText?: true
    status?: true
    adminResponse?: true
    respondedAt?: true
    createdAt?: true
  }

  export type FeedbackLogCountAggregateInputType = {
    id?: true
    alertHistoryId?: true
    regionId?: true
    hazardTypeId?: true
    audioFeedbackUrl?: true
    translationText?: true
    status?: true
    adminResponse?: true
    respondedAt?: true
    createdAt?: true
    _all?: true
  }

  export type FeedbackLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedbackLog to aggregate.
     */
    where?: FeedbackLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLogs to fetch.
     */
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeedbackLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FeedbackLogs
    **/
    _count?: true | FeedbackLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FeedbackLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FeedbackLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeedbackLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeedbackLogMaxAggregateInputType
  }

  export type GetFeedbackLogAggregateType<T extends FeedbackLogAggregateArgs> = {
        [P in keyof T & keyof AggregateFeedbackLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeedbackLog[P]>
      : GetScalarType<T[P], AggregateFeedbackLog[P]>
  }




  export type FeedbackLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeedbackLogWhereInput
    orderBy?: FeedbackLogOrderByWithAggregationInput | FeedbackLogOrderByWithAggregationInput[]
    by: FeedbackLogScalarFieldEnum[] | FeedbackLogScalarFieldEnum
    having?: FeedbackLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeedbackLogCountAggregateInputType | true
    _avg?: FeedbackLogAvgAggregateInputType
    _sum?: FeedbackLogSumAggregateInputType
    _min?: FeedbackLogMinAggregateInputType
    _max?: FeedbackLogMaxAggregateInputType
  }

  export type FeedbackLogGroupByOutputType = {
    id: number
    alertHistoryId: number
    regionId: number
    hazardTypeId: number
    audioFeedbackUrl: string | null
    translationText: string | null
    status: string
    adminResponse: string | null
    respondedAt: Date | null
    createdAt: Date
    _count: FeedbackLogCountAggregateOutputType | null
    _avg: FeedbackLogAvgAggregateOutputType | null
    _sum: FeedbackLogSumAggregateOutputType | null
    _min: FeedbackLogMinAggregateOutputType | null
    _max: FeedbackLogMaxAggregateOutputType | null
  }

  type GetFeedbackLogGroupByPayload<T extends FeedbackLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeedbackLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeedbackLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeedbackLogGroupByOutputType[P]>
            : GetScalarType<T[P], FeedbackLogGroupByOutputType[P]>
        }
      >
    >


  export type FeedbackLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertHistoryId?: boolean
    regionId?: boolean
    hazardTypeId?: boolean
    audioFeedbackUrl?: boolean
    translationText?: boolean
    status?: boolean
    adminResponse?: boolean
    respondedAt?: boolean
    createdAt?: boolean
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedbackLog"]>

  export type FeedbackLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertHistoryId?: boolean
    regionId?: boolean
    hazardTypeId?: boolean
    audioFeedbackUrl?: boolean
    translationText?: boolean
    status?: boolean
    adminResponse?: boolean
    respondedAt?: boolean
    createdAt?: boolean
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feedbackLog"]>

  export type FeedbackLogSelectScalar = {
    id?: boolean
    alertHistoryId?: boolean
    regionId?: boolean
    hazardTypeId?: boolean
    audioFeedbackUrl?: boolean
    translationText?: boolean
    status?: boolean
    adminResponse?: boolean
    respondedAt?: boolean
    createdAt?: boolean
  }

  export type FeedbackLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
  }
  export type FeedbackLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    hazardType?: boolean | HazardTypeDefaultArgs<ExtArgs>
  }

  export type $FeedbackLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FeedbackLog"
    objects: {
      alertHistory: Prisma.$AlertHistoryPayload<ExtArgs>
      region: Prisma.$RegionPayload<ExtArgs>
      hazardType: Prisma.$HazardTypePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      alertHistoryId: number
      regionId: number
      hazardTypeId: number
      audioFeedbackUrl: string | null
      translationText: string | null
      status: string
      adminResponse: string | null
      respondedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["feedbackLog"]>
    composites: {}
  }

  type FeedbackLogGetPayload<S extends boolean | null | undefined | FeedbackLogDefaultArgs> = $Result.GetResult<Prisma.$FeedbackLogPayload, S>

  type FeedbackLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeedbackLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeedbackLogCountAggregateInputType | true
    }

  export interface FeedbackLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FeedbackLog'], meta: { name: 'FeedbackLog' } }
    /**
     * Find zero or one FeedbackLog that matches the filter.
     * @param {FeedbackLogFindUniqueArgs} args - Arguments to find a FeedbackLog
     * @example
     * // Get one FeedbackLog
     * const feedbackLog = await prisma.feedbackLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FeedbackLogFindUniqueArgs>(args: SelectSubset<T, FeedbackLogFindUniqueArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one FeedbackLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {FeedbackLogFindUniqueOrThrowArgs} args - Arguments to find a FeedbackLog
     * @example
     * // Get one FeedbackLog
     * const feedbackLog = await prisma.feedbackLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FeedbackLogFindUniqueOrThrowArgs>(args: SelectSubset<T, FeedbackLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first FeedbackLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogFindFirstArgs} args - Arguments to find a FeedbackLog
     * @example
     * // Get one FeedbackLog
     * const feedbackLog = await prisma.feedbackLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FeedbackLogFindFirstArgs>(args?: SelectSubset<T, FeedbackLogFindFirstArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first FeedbackLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogFindFirstOrThrowArgs} args - Arguments to find a FeedbackLog
     * @example
     * // Get one FeedbackLog
     * const feedbackLog = await prisma.feedbackLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FeedbackLogFindFirstOrThrowArgs>(args?: SelectSubset<T, FeedbackLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more FeedbackLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FeedbackLogs
     * const feedbackLogs = await prisma.feedbackLog.findMany()
     * 
     * // Get first 10 FeedbackLogs
     * const feedbackLogs = await prisma.feedbackLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const feedbackLogWithIdOnly = await prisma.feedbackLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends FeedbackLogFindManyArgs>(args?: SelectSubset<T, FeedbackLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a FeedbackLog.
     * @param {FeedbackLogCreateArgs} args - Arguments to create a FeedbackLog.
     * @example
     * // Create one FeedbackLog
     * const FeedbackLog = await prisma.feedbackLog.create({
     *   data: {
     *     // ... data to create a FeedbackLog
     *   }
     * })
     * 
     */
    create<T extends FeedbackLogCreateArgs>(args: SelectSubset<T, FeedbackLogCreateArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many FeedbackLogs.
     * @param {FeedbackLogCreateManyArgs} args - Arguments to create many FeedbackLogs.
     * @example
     * // Create many FeedbackLogs
     * const feedbackLog = await prisma.feedbackLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FeedbackLogCreateManyArgs>(args?: SelectSubset<T, FeedbackLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FeedbackLogs and returns the data saved in the database.
     * @param {FeedbackLogCreateManyAndReturnArgs} args - Arguments to create many FeedbackLogs.
     * @example
     * // Create many FeedbackLogs
     * const feedbackLog = await prisma.feedbackLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FeedbackLogs and only return the `id`
     * const feedbackLogWithIdOnly = await prisma.feedbackLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FeedbackLogCreateManyAndReturnArgs>(args?: SelectSubset<T, FeedbackLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a FeedbackLog.
     * @param {FeedbackLogDeleteArgs} args - Arguments to delete one FeedbackLog.
     * @example
     * // Delete one FeedbackLog
     * const FeedbackLog = await prisma.feedbackLog.delete({
     *   where: {
     *     // ... filter to delete one FeedbackLog
     *   }
     * })
     * 
     */
    delete<T extends FeedbackLogDeleteArgs>(args: SelectSubset<T, FeedbackLogDeleteArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one FeedbackLog.
     * @param {FeedbackLogUpdateArgs} args - Arguments to update one FeedbackLog.
     * @example
     * // Update one FeedbackLog
     * const feedbackLog = await prisma.feedbackLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FeedbackLogUpdateArgs>(args: SelectSubset<T, FeedbackLogUpdateArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more FeedbackLogs.
     * @param {FeedbackLogDeleteManyArgs} args - Arguments to filter FeedbackLogs to delete.
     * @example
     * // Delete a few FeedbackLogs
     * const { count } = await prisma.feedbackLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FeedbackLogDeleteManyArgs>(args?: SelectSubset<T, FeedbackLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FeedbackLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FeedbackLogs
     * const feedbackLog = await prisma.feedbackLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FeedbackLogUpdateManyArgs>(args: SelectSubset<T, FeedbackLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one FeedbackLog.
     * @param {FeedbackLogUpsertArgs} args - Arguments to update or create a FeedbackLog.
     * @example
     * // Update or create a FeedbackLog
     * const feedbackLog = await prisma.feedbackLog.upsert({
     *   create: {
     *     // ... data to create a FeedbackLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FeedbackLog we want to update
     *   }
     * })
     */
    upsert<T extends FeedbackLogUpsertArgs>(args: SelectSubset<T, FeedbackLogUpsertArgs<ExtArgs>>): Prisma__FeedbackLogClient<$Result.GetResult<Prisma.$FeedbackLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of FeedbackLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogCountArgs} args - Arguments to filter FeedbackLogs to count.
     * @example
     * // Count the number of FeedbackLogs
     * const count = await prisma.feedbackLog.count({
     *   where: {
     *     // ... the filter for the FeedbackLogs we want to count
     *   }
     * })
    **/
    count<T extends FeedbackLogCountArgs>(
      args?: Subset<T, FeedbackLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeedbackLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FeedbackLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FeedbackLogAggregateArgs>(args: Subset<T, FeedbackLogAggregateArgs>): Prisma.PrismaPromise<GetFeedbackLogAggregateType<T>>

    /**
     * Group by FeedbackLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeedbackLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FeedbackLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeedbackLogGroupByArgs['orderBy'] }
        : { orderBy?: FeedbackLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FeedbackLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeedbackLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FeedbackLog model
   */
  readonly fields: FeedbackLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FeedbackLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeedbackLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alertHistory<T extends AlertHistoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlertHistoryDefaultArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    hazardType<T extends HazardTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, HazardTypeDefaultArgs<ExtArgs>>): Prisma__HazardTypeClient<$Result.GetResult<Prisma.$HazardTypePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FeedbackLog model
   */ 
  interface FeedbackLogFieldRefs {
    readonly id: FieldRef<"FeedbackLog", 'Int'>
    readonly alertHistoryId: FieldRef<"FeedbackLog", 'Int'>
    readonly regionId: FieldRef<"FeedbackLog", 'Int'>
    readonly hazardTypeId: FieldRef<"FeedbackLog", 'Int'>
    readonly audioFeedbackUrl: FieldRef<"FeedbackLog", 'String'>
    readonly translationText: FieldRef<"FeedbackLog", 'String'>
    readonly status: FieldRef<"FeedbackLog", 'String'>
    readonly adminResponse: FieldRef<"FeedbackLog", 'String'>
    readonly respondedAt: FieldRef<"FeedbackLog", 'DateTime'>
    readonly createdAt: FieldRef<"FeedbackLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FeedbackLog findUnique
   */
  export type FeedbackLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLog to fetch.
     */
    where: FeedbackLogWhereUniqueInput
  }

  /**
   * FeedbackLog findUniqueOrThrow
   */
  export type FeedbackLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLog to fetch.
     */
    where: FeedbackLogWhereUniqueInput
  }

  /**
   * FeedbackLog findFirst
   */
  export type FeedbackLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLog to fetch.
     */
    where?: FeedbackLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLogs to fetch.
     */
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedbackLogs.
     */
    cursor?: FeedbackLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackLogs.
     */
    distinct?: FeedbackLogScalarFieldEnum | FeedbackLogScalarFieldEnum[]
  }

  /**
   * FeedbackLog findFirstOrThrow
   */
  export type FeedbackLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLog to fetch.
     */
    where?: FeedbackLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLogs to fetch.
     */
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FeedbackLogs.
     */
    cursor?: FeedbackLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FeedbackLogs.
     */
    distinct?: FeedbackLogScalarFieldEnum | FeedbackLogScalarFieldEnum[]
  }

  /**
   * FeedbackLog findMany
   */
  export type FeedbackLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * Filter, which FeedbackLogs to fetch.
     */
    where?: FeedbackLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FeedbackLogs to fetch.
     */
    orderBy?: FeedbackLogOrderByWithRelationInput | FeedbackLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FeedbackLogs.
     */
    cursor?: FeedbackLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FeedbackLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FeedbackLogs.
     */
    skip?: number
    distinct?: FeedbackLogScalarFieldEnum | FeedbackLogScalarFieldEnum[]
  }

  /**
   * FeedbackLog create
   */
  export type FeedbackLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * The data needed to create a FeedbackLog.
     */
    data: XOR<FeedbackLogCreateInput, FeedbackLogUncheckedCreateInput>
  }

  /**
   * FeedbackLog createMany
   */
  export type FeedbackLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FeedbackLogs.
     */
    data: FeedbackLogCreateManyInput | FeedbackLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FeedbackLog createManyAndReturn
   */
  export type FeedbackLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many FeedbackLogs.
     */
    data: FeedbackLogCreateManyInput | FeedbackLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FeedbackLog update
   */
  export type FeedbackLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * The data needed to update a FeedbackLog.
     */
    data: XOR<FeedbackLogUpdateInput, FeedbackLogUncheckedUpdateInput>
    /**
     * Choose, which FeedbackLog to update.
     */
    where: FeedbackLogWhereUniqueInput
  }

  /**
   * FeedbackLog updateMany
   */
  export type FeedbackLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FeedbackLogs.
     */
    data: XOR<FeedbackLogUpdateManyMutationInput, FeedbackLogUncheckedUpdateManyInput>
    /**
     * Filter which FeedbackLogs to update
     */
    where?: FeedbackLogWhereInput
  }

  /**
   * FeedbackLog upsert
   */
  export type FeedbackLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * The filter to search for the FeedbackLog to update in case it exists.
     */
    where: FeedbackLogWhereUniqueInput
    /**
     * In case the FeedbackLog found by the `where` argument doesn't exist, create a new FeedbackLog with this data.
     */
    create: XOR<FeedbackLogCreateInput, FeedbackLogUncheckedCreateInput>
    /**
     * In case the FeedbackLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeedbackLogUpdateInput, FeedbackLogUncheckedUpdateInput>
  }

  /**
   * FeedbackLog delete
   */
  export type FeedbackLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
    /**
     * Filter which FeedbackLog to delete.
     */
    where: FeedbackLogWhereUniqueInput
  }

  /**
   * FeedbackLog deleteMany
   */
  export type FeedbackLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FeedbackLogs to delete
     */
    where?: FeedbackLogWhereInput
  }

  /**
   * FeedbackLog without action
   */
  export type FeedbackLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeedbackLog
     */
    select?: FeedbackLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FeedbackLogInclude<ExtArgs> | null
  }


  /**
   * Model CommunityMember
   */

  export type AggregateCommunityMember = {
    _count: CommunityMemberCountAggregateOutputType | null
    _avg: CommunityMemberAvgAggregateOutputType | null
    _sum: CommunityMemberSumAggregateOutputType | null
    _min: CommunityMemberMinAggregateOutputType | null
    _max: CommunityMemberMaxAggregateOutputType | null
  }

  export type CommunityMemberAvgAggregateOutputType = {
    id: number | null
    regionId: number | null
    communityId: number | null
  }

  export type CommunityMemberSumAggregateOutputType = {
    id: number | null
    regionId: number | null
    communityId: number | null
  }

  export type CommunityMemberMinAggregateOutputType = {
    id: number | null
    fullName: string | null
    phoneNumber: string | null
    regionId: number | null
    communityId: number | null
    language: string | null
    dialect: string | null
    isActive: boolean | null
    consent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommunityMemberMaxAggregateOutputType = {
    id: number | null
    fullName: string | null
    phoneNumber: string | null
    regionId: number | null
    communityId: number | null
    language: string | null
    dialect: string | null
    isActive: boolean | null
    consent: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CommunityMemberCountAggregateOutputType = {
    id: number
    fullName: number
    phoneNumber: number
    regionId: number
    communityId: number
    language: number
    dialect: number
    isActive: number
    consent: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CommunityMemberAvgAggregateInputType = {
    id?: true
    regionId?: true
    communityId?: true
  }

  export type CommunityMemberSumAggregateInputType = {
    id?: true
    regionId?: true
    communityId?: true
  }

  export type CommunityMemberMinAggregateInputType = {
    id?: true
    fullName?: true
    phoneNumber?: true
    regionId?: true
    communityId?: true
    language?: true
    dialect?: true
    isActive?: true
    consent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommunityMemberMaxAggregateInputType = {
    id?: true
    fullName?: true
    phoneNumber?: true
    regionId?: true
    communityId?: true
    language?: true
    dialect?: true
    isActive?: true
    consent?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CommunityMemberCountAggregateInputType = {
    id?: true
    fullName?: true
    phoneNumber?: true
    regionId?: true
    communityId?: true
    language?: true
    dialect?: true
    isActive?: true
    consent?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CommunityMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityMember to aggregate.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CommunityMembers
    **/
    _count?: true | CommunityMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CommunityMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CommunityMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CommunityMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CommunityMemberMaxAggregateInputType
  }

  export type GetCommunityMemberAggregateType<T extends CommunityMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateCommunityMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCommunityMember[P]>
      : GetScalarType<T[P], AggregateCommunityMember[P]>
  }




  export type CommunityMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CommunityMemberWhereInput
    orderBy?: CommunityMemberOrderByWithAggregationInput | CommunityMemberOrderByWithAggregationInput[]
    by: CommunityMemberScalarFieldEnum[] | CommunityMemberScalarFieldEnum
    having?: CommunityMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CommunityMemberCountAggregateInputType | true
    _avg?: CommunityMemberAvgAggregateInputType
    _sum?: CommunityMemberSumAggregateInputType
    _min?: CommunityMemberMinAggregateInputType
    _max?: CommunityMemberMaxAggregateInputType
  }

  export type CommunityMemberGroupByOutputType = {
    id: number
    fullName: string | null
    phoneNumber: string
    regionId: number
    communityId: number | null
    language: string | null
    dialect: string | null
    isActive: boolean
    consent: boolean
    createdAt: Date
    updatedAt: Date
    _count: CommunityMemberCountAggregateOutputType | null
    _avg: CommunityMemberAvgAggregateOutputType | null
    _sum: CommunityMemberSumAggregateOutputType | null
    _min: CommunityMemberMinAggregateOutputType | null
    _max: CommunityMemberMaxAggregateOutputType | null
  }

  type GetCommunityMemberGroupByPayload<T extends CommunityMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CommunityMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CommunityMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CommunityMemberGroupByOutputType[P]>
            : GetScalarType<T[P], CommunityMemberGroupByOutputType[P]>
        }
      >
    >


  export type CommunityMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    regionId?: boolean
    communityId?: boolean
    language?: boolean
    dialect?: boolean
    isActive?: boolean
    consent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
    community?: boolean | CommunityMember$communityArgs<ExtArgs>
    callAttempts?: boolean | CommunityMember$callAttemptsArgs<ExtArgs>
    _count?: boolean | CommunityMemberCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["communityMember"]>

  export type CommunityMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    regionId?: boolean
    communityId?: boolean
    language?: boolean
    dialect?: boolean
    isActive?: boolean
    consent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
    community?: boolean | CommunityMember$communityArgs<ExtArgs>
  }, ExtArgs["result"]["communityMember"]>

  export type CommunityMemberSelectScalar = {
    id?: boolean
    fullName?: boolean
    phoneNumber?: boolean
    regionId?: boolean
    communityId?: boolean
    language?: boolean
    dialect?: boolean
    isActive?: boolean
    consent?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CommunityMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
    community?: boolean | CommunityMember$communityArgs<ExtArgs>
    callAttempts?: boolean | CommunityMember$callAttemptsArgs<ExtArgs>
    _count?: boolean | CommunityMemberCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CommunityMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
    community?: boolean | CommunityMember$communityArgs<ExtArgs>
  }

  export type $CommunityMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CommunityMember"
    objects: {
      region: Prisma.$RegionPayload<ExtArgs>
      community: Prisma.$CommunityPayload<ExtArgs> | null
      callAttempts: Prisma.$CallAttemptPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      fullName: string | null
      phoneNumber: string
      regionId: number
      communityId: number | null
      language: string | null
      dialect: string | null
      isActive: boolean
      consent: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["communityMember"]>
    composites: {}
  }

  type CommunityMemberGetPayload<S extends boolean | null | undefined | CommunityMemberDefaultArgs> = $Result.GetResult<Prisma.$CommunityMemberPayload, S>

  type CommunityMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CommunityMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CommunityMemberCountAggregateInputType | true
    }

  export interface CommunityMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CommunityMember'], meta: { name: 'CommunityMember' } }
    /**
     * Find zero or one CommunityMember that matches the filter.
     * @param {CommunityMemberFindUniqueArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CommunityMemberFindUniqueArgs>(args: SelectSubset<T, CommunityMemberFindUniqueArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CommunityMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CommunityMemberFindUniqueOrThrowArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CommunityMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, CommunityMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CommunityMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberFindFirstArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CommunityMemberFindFirstArgs>(args?: SelectSubset<T, CommunityMemberFindFirstArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CommunityMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberFindFirstOrThrowArgs} args - Arguments to find a CommunityMember
     * @example
     * // Get one CommunityMember
     * const communityMember = await prisma.communityMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CommunityMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, CommunityMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CommunityMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CommunityMembers
     * const communityMembers = await prisma.communityMember.findMany()
     * 
     * // Get first 10 CommunityMembers
     * const communityMembers = await prisma.communityMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const communityMemberWithIdOnly = await prisma.communityMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CommunityMemberFindManyArgs>(args?: SelectSubset<T, CommunityMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CommunityMember.
     * @param {CommunityMemberCreateArgs} args - Arguments to create a CommunityMember.
     * @example
     * // Create one CommunityMember
     * const CommunityMember = await prisma.communityMember.create({
     *   data: {
     *     // ... data to create a CommunityMember
     *   }
     * })
     * 
     */
    create<T extends CommunityMemberCreateArgs>(args: SelectSubset<T, CommunityMemberCreateArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CommunityMembers.
     * @param {CommunityMemberCreateManyArgs} args - Arguments to create many CommunityMembers.
     * @example
     * // Create many CommunityMembers
     * const communityMember = await prisma.communityMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CommunityMemberCreateManyArgs>(args?: SelectSubset<T, CommunityMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CommunityMembers and returns the data saved in the database.
     * @param {CommunityMemberCreateManyAndReturnArgs} args - Arguments to create many CommunityMembers.
     * @example
     * // Create many CommunityMembers
     * const communityMember = await prisma.communityMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CommunityMembers and only return the `id`
     * const communityMemberWithIdOnly = await prisma.communityMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CommunityMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, CommunityMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CommunityMember.
     * @param {CommunityMemberDeleteArgs} args - Arguments to delete one CommunityMember.
     * @example
     * // Delete one CommunityMember
     * const CommunityMember = await prisma.communityMember.delete({
     *   where: {
     *     // ... filter to delete one CommunityMember
     *   }
     * })
     * 
     */
    delete<T extends CommunityMemberDeleteArgs>(args: SelectSubset<T, CommunityMemberDeleteArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CommunityMember.
     * @param {CommunityMemberUpdateArgs} args - Arguments to update one CommunityMember.
     * @example
     * // Update one CommunityMember
     * const communityMember = await prisma.communityMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CommunityMemberUpdateArgs>(args: SelectSubset<T, CommunityMemberUpdateArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CommunityMembers.
     * @param {CommunityMemberDeleteManyArgs} args - Arguments to filter CommunityMembers to delete.
     * @example
     * // Delete a few CommunityMembers
     * const { count } = await prisma.communityMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CommunityMemberDeleteManyArgs>(args?: SelectSubset<T, CommunityMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CommunityMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CommunityMembers
     * const communityMember = await prisma.communityMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CommunityMemberUpdateManyArgs>(args: SelectSubset<T, CommunityMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CommunityMember.
     * @param {CommunityMemberUpsertArgs} args - Arguments to update or create a CommunityMember.
     * @example
     * // Update or create a CommunityMember
     * const communityMember = await prisma.communityMember.upsert({
     *   create: {
     *     // ... data to create a CommunityMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CommunityMember we want to update
     *   }
     * })
     */
    upsert<T extends CommunityMemberUpsertArgs>(args: SelectSubset<T, CommunityMemberUpsertArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CommunityMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberCountArgs} args - Arguments to filter CommunityMembers to count.
     * @example
     * // Count the number of CommunityMembers
     * const count = await prisma.communityMember.count({
     *   where: {
     *     // ... the filter for the CommunityMembers we want to count
     *   }
     * })
    **/
    count<T extends CommunityMemberCountArgs>(
      args?: Subset<T, CommunityMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CommunityMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CommunityMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CommunityMemberAggregateArgs>(args: Subset<T, CommunityMemberAggregateArgs>): Prisma.PrismaPromise<GetCommunityMemberAggregateType<T>>

    /**
     * Group by CommunityMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CommunityMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CommunityMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CommunityMemberGroupByArgs['orderBy'] }
        : { orderBy?: CommunityMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CommunityMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommunityMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CommunityMember model
   */
  readonly fields: CommunityMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CommunityMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CommunityMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    community<T extends CommunityMember$communityArgs<ExtArgs> = {}>(args?: Subset<T, CommunityMember$communityArgs<ExtArgs>>): Prisma__CommunityClient<$Result.GetResult<Prisma.$CommunityPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    callAttempts<T extends CommunityMember$callAttemptsArgs<ExtArgs> = {}>(args?: Subset<T, CommunityMember$callAttemptsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CommunityMember model
   */ 
  interface CommunityMemberFieldRefs {
    readonly id: FieldRef<"CommunityMember", 'Int'>
    readonly fullName: FieldRef<"CommunityMember", 'String'>
    readonly phoneNumber: FieldRef<"CommunityMember", 'String'>
    readonly regionId: FieldRef<"CommunityMember", 'Int'>
    readonly communityId: FieldRef<"CommunityMember", 'Int'>
    readonly language: FieldRef<"CommunityMember", 'String'>
    readonly dialect: FieldRef<"CommunityMember", 'String'>
    readonly isActive: FieldRef<"CommunityMember", 'Boolean'>
    readonly consent: FieldRef<"CommunityMember", 'Boolean'>
    readonly createdAt: FieldRef<"CommunityMember", 'DateTime'>
    readonly updatedAt: FieldRef<"CommunityMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CommunityMember findUnique
   */
  export type CommunityMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember findUniqueOrThrow
   */
  export type CommunityMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember findFirst
   */
  export type CommunityMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityMembers.
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityMembers.
     */
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * CommunityMember findFirstOrThrow
   */
  export type CommunityMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * Filter, which CommunityMember to fetch.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CommunityMembers.
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CommunityMembers.
     */
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * CommunityMember findMany
   */
  export type CommunityMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * Filter, which CommunityMembers to fetch.
     */
    where?: CommunityMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CommunityMembers to fetch.
     */
    orderBy?: CommunityMemberOrderByWithRelationInput | CommunityMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CommunityMembers.
     */
    cursor?: CommunityMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CommunityMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CommunityMembers.
     */
    skip?: number
    distinct?: CommunityMemberScalarFieldEnum | CommunityMemberScalarFieldEnum[]
  }

  /**
   * CommunityMember create
   */
  export type CommunityMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a CommunityMember.
     */
    data: XOR<CommunityMemberCreateInput, CommunityMemberUncheckedCreateInput>
  }

  /**
   * CommunityMember createMany
   */
  export type CommunityMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CommunityMembers.
     */
    data: CommunityMemberCreateManyInput | CommunityMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CommunityMember createManyAndReturn
   */
  export type CommunityMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CommunityMembers.
     */
    data: CommunityMemberCreateManyInput | CommunityMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CommunityMember update
   */
  export type CommunityMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a CommunityMember.
     */
    data: XOR<CommunityMemberUpdateInput, CommunityMemberUncheckedUpdateInput>
    /**
     * Choose, which CommunityMember to update.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember updateMany
   */
  export type CommunityMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CommunityMembers.
     */
    data: XOR<CommunityMemberUpdateManyMutationInput, CommunityMemberUncheckedUpdateManyInput>
    /**
     * Filter which CommunityMembers to update
     */
    where?: CommunityMemberWhereInput
  }

  /**
   * CommunityMember upsert
   */
  export type CommunityMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the CommunityMember to update in case it exists.
     */
    where: CommunityMemberWhereUniqueInput
    /**
     * In case the CommunityMember found by the `where` argument doesn't exist, create a new CommunityMember with this data.
     */
    create: XOR<CommunityMemberCreateInput, CommunityMemberUncheckedCreateInput>
    /**
     * In case the CommunityMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CommunityMemberUpdateInput, CommunityMemberUncheckedUpdateInput>
  }

  /**
   * CommunityMember delete
   */
  export type CommunityMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    /**
     * Filter which CommunityMember to delete.
     */
    where: CommunityMemberWhereUniqueInput
  }

  /**
   * CommunityMember deleteMany
   */
  export type CommunityMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CommunityMembers to delete
     */
    where?: CommunityMemberWhereInput
  }

  /**
   * CommunityMember.community
   */
  export type CommunityMember$communityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Community
     */
    select?: CommunitySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityInclude<ExtArgs> | null
    where?: CommunityWhereInput
  }

  /**
   * CommunityMember.callAttempts
   */
  export type CommunityMember$callAttemptsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    where?: CallAttemptWhereInput
    orderBy?: CallAttemptOrderByWithRelationInput | CallAttemptOrderByWithRelationInput[]
    cursor?: CallAttemptWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CallAttemptScalarFieldEnum | CallAttemptScalarFieldEnum[]
  }

  /**
   * CommunityMember without action
   */
  export type CommunityMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
  }


  /**
   * Model CallAttempt
   */

  export type AggregateCallAttempt = {
    _count: CallAttemptCountAggregateOutputType | null
    _avg: CallAttemptAvgAggregateOutputType | null
    _sum: CallAttemptSumAggregateOutputType | null
    _min: CallAttemptMinAggregateOutputType | null
    _max: CallAttemptMaxAggregateOutputType | null
  }

  export type CallAttemptAvgAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    memberId: number | null
    attemptCount: number | null
  }

  export type CallAttemptSumAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    memberId: number | null
    attemptCount: number | null
  }

  export type CallAttemptMinAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    memberId: number | null
    phoneNumber: string | null
    channel: string | null
    status: string | null
    provider: string | null
    providerCallId: string | null
    language: string | null
    dialect: string | null
    attemptCount: number | null
    lastAttemptAt: Date | null
    completedAt: Date | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallAttemptMaxAggregateOutputType = {
    id: number | null
    alertHistoryId: number | null
    memberId: number | null
    phoneNumber: string | null
    channel: string | null
    status: string | null
    provider: string | null
    providerCallId: string | null
    language: string | null
    dialect: string | null
    attemptCount: number | null
    lastAttemptAt: Date | null
    completedAt: Date | null
    failureReason: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CallAttemptCountAggregateOutputType = {
    id: number
    alertHistoryId: number
    memberId: number
    phoneNumber: number
    channel: number
    status: number
    provider: number
    providerCallId: number
    language: number
    dialect: number
    attemptCount: number
    lastAttemptAt: number
    completedAt: number
    failureReason: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CallAttemptAvgAggregateInputType = {
    id?: true
    alertHistoryId?: true
    memberId?: true
    attemptCount?: true
  }

  export type CallAttemptSumAggregateInputType = {
    id?: true
    alertHistoryId?: true
    memberId?: true
    attemptCount?: true
  }

  export type CallAttemptMinAggregateInputType = {
    id?: true
    alertHistoryId?: true
    memberId?: true
    phoneNumber?: true
    channel?: true
    status?: true
    provider?: true
    providerCallId?: true
    language?: true
    dialect?: true
    attemptCount?: true
    lastAttemptAt?: true
    completedAt?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallAttemptMaxAggregateInputType = {
    id?: true
    alertHistoryId?: true
    memberId?: true
    phoneNumber?: true
    channel?: true
    status?: true
    provider?: true
    providerCallId?: true
    language?: true
    dialect?: true
    attemptCount?: true
    lastAttemptAt?: true
    completedAt?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CallAttemptCountAggregateInputType = {
    id?: true
    alertHistoryId?: true
    memberId?: true
    phoneNumber?: true
    channel?: true
    status?: true
    provider?: true
    providerCallId?: true
    language?: true
    dialect?: true
    attemptCount?: true
    lastAttemptAt?: true
    completedAt?: true
    failureReason?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CallAttemptAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallAttempt to aggregate.
     */
    where?: CallAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallAttempts to fetch.
     */
    orderBy?: CallAttemptOrderByWithRelationInput | CallAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CallAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CallAttempts
    **/
    _count?: true | CallAttemptCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CallAttemptAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CallAttemptSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CallAttemptMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CallAttemptMaxAggregateInputType
  }

  export type GetCallAttemptAggregateType<T extends CallAttemptAggregateArgs> = {
        [P in keyof T & keyof AggregateCallAttempt]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCallAttempt[P]>
      : GetScalarType<T[P], AggregateCallAttempt[P]>
  }




  export type CallAttemptGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CallAttemptWhereInput
    orderBy?: CallAttemptOrderByWithAggregationInput | CallAttemptOrderByWithAggregationInput[]
    by: CallAttemptScalarFieldEnum[] | CallAttemptScalarFieldEnum
    having?: CallAttemptScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CallAttemptCountAggregateInputType | true
    _avg?: CallAttemptAvgAggregateInputType
    _sum?: CallAttemptSumAggregateInputType
    _min?: CallAttemptMinAggregateInputType
    _max?: CallAttemptMaxAggregateInputType
  }

  export type CallAttemptGroupByOutputType = {
    id: number
    alertHistoryId: number
    memberId: number | null
    phoneNumber: string
    channel: string
    status: string
    provider: string | null
    providerCallId: string | null
    language: string | null
    dialect: string | null
    attemptCount: number
    lastAttemptAt: Date | null
    completedAt: Date | null
    failureReason: string | null
    createdAt: Date
    updatedAt: Date
    _count: CallAttemptCountAggregateOutputType | null
    _avg: CallAttemptAvgAggregateOutputType | null
    _sum: CallAttemptSumAggregateOutputType | null
    _min: CallAttemptMinAggregateOutputType | null
    _max: CallAttemptMaxAggregateOutputType | null
  }

  type GetCallAttemptGroupByPayload<T extends CallAttemptGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CallAttemptGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CallAttemptGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CallAttemptGroupByOutputType[P]>
            : GetScalarType<T[P], CallAttemptGroupByOutputType[P]>
        }
      >
    >


  export type CallAttemptSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertHistoryId?: boolean
    memberId?: boolean
    phoneNumber?: boolean
    channel?: boolean
    status?: boolean
    provider?: boolean
    providerCallId?: boolean
    language?: boolean
    dialect?: boolean
    attemptCount?: boolean
    lastAttemptAt?: boolean
    completedAt?: boolean
    failureReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    member?: boolean | CallAttempt$memberArgs<ExtArgs>
  }, ExtArgs["result"]["callAttempt"]>

  export type CallAttemptSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    alertHistoryId?: boolean
    memberId?: boolean
    phoneNumber?: boolean
    channel?: boolean
    status?: boolean
    provider?: boolean
    providerCallId?: boolean
    language?: boolean
    dialect?: boolean
    attemptCount?: boolean
    lastAttemptAt?: boolean
    completedAt?: boolean
    failureReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    member?: boolean | CallAttempt$memberArgs<ExtArgs>
  }, ExtArgs["result"]["callAttempt"]>

  export type CallAttemptSelectScalar = {
    id?: boolean
    alertHistoryId?: boolean
    memberId?: boolean
    phoneNumber?: boolean
    channel?: boolean
    status?: boolean
    provider?: boolean
    providerCallId?: boolean
    language?: boolean
    dialect?: boolean
    attemptCount?: boolean
    lastAttemptAt?: boolean
    completedAt?: boolean
    failureReason?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CallAttemptInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    member?: boolean | CallAttempt$memberArgs<ExtArgs>
  }
  export type CallAttemptIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    alertHistory?: boolean | AlertHistoryDefaultArgs<ExtArgs>
    member?: boolean | CallAttempt$memberArgs<ExtArgs>
  }

  export type $CallAttemptPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CallAttempt"
    objects: {
      alertHistory: Prisma.$AlertHistoryPayload<ExtArgs>
      member: Prisma.$CommunityMemberPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      alertHistoryId: number
      memberId: number | null
      phoneNumber: string
      channel: string
      status: string
      provider: string | null
      providerCallId: string | null
      language: string | null
      dialect: string | null
      attemptCount: number
      lastAttemptAt: Date | null
      completedAt: Date | null
      failureReason: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["callAttempt"]>
    composites: {}
  }

  type CallAttemptGetPayload<S extends boolean | null | undefined | CallAttemptDefaultArgs> = $Result.GetResult<Prisma.$CallAttemptPayload, S>

  type CallAttemptCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CallAttemptFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CallAttemptCountAggregateInputType | true
    }

  export interface CallAttemptDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CallAttempt'], meta: { name: 'CallAttempt' } }
    /**
     * Find zero or one CallAttempt that matches the filter.
     * @param {CallAttemptFindUniqueArgs} args - Arguments to find a CallAttempt
     * @example
     * // Get one CallAttempt
     * const callAttempt = await prisma.callAttempt.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CallAttemptFindUniqueArgs>(args: SelectSubset<T, CallAttemptFindUniqueArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CallAttempt that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CallAttemptFindUniqueOrThrowArgs} args - Arguments to find a CallAttempt
     * @example
     * // Get one CallAttempt
     * const callAttempt = await prisma.callAttempt.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CallAttemptFindUniqueOrThrowArgs>(args: SelectSubset<T, CallAttemptFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CallAttempt that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptFindFirstArgs} args - Arguments to find a CallAttempt
     * @example
     * // Get one CallAttempt
     * const callAttempt = await prisma.callAttempt.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CallAttemptFindFirstArgs>(args?: SelectSubset<T, CallAttemptFindFirstArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CallAttempt that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptFindFirstOrThrowArgs} args - Arguments to find a CallAttempt
     * @example
     * // Get one CallAttempt
     * const callAttempt = await prisma.callAttempt.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CallAttemptFindFirstOrThrowArgs>(args?: SelectSubset<T, CallAttemptFindFirstOrThrowArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CallAttempts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CallAttempts
     * const callAttempts = await prisma.callAttempt.findMany()
     * 
     * // Get first 10 CallAttempts
     * const callAttempts = await prisma.callAttempt.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const callAttemptWithIdOnly = await prisma.callAttempt.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CallAttemptFindManyArgs>(args?: SelectSubset<T, CallAttemptFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CallAttempt.
     * @param {CallAttemptCreateArgs} args - Arguments to create a CallAttempt.
     * @example
     * // Create one CallAttempt
     * const CallAttempt = await prisma.callAttempt.create({
     *   data: {
     *     // ... data to create a CallAttempt
     *   }
     * })
     * 
     */
    create<T extends CallAttemptCreateArgs>(args: SelectSubset<T, CallAttemptCreateArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CallAttempts.
     * @param {CallAttemptCreateManyArgs} args - Arguments to create many CallAttempts.
     * @example
     * // Create many CallAttempts
     * const callAttempt = await prisma.callAttempt.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CallAttemptCreateManyArgs>(args?: SelectSubset<T, CallAttemptCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CallAttempts and returns the data saved in the database.
     * @param {CallAttemptCreateManyAndReturnArgs} args - Arguments to create many CallAttempts.
     * @example
     * // Create many CallAttempts
     * const callAttempt = await prisma.callAttempt.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CallAttempts and only return the `id`
     * const callAttemptWithIdOnly = await prisma.callAttempt.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CallAttemptCreateManyAndReturnArgs>(args?: SelectSubset<T, CallAttemptCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CallAttempt.
     * @param {CallAttemptDeleteArgs} args - Arguments to delete one CallAttempt.
     * @example
     * // Delete one CallAttempt
     * const CallAttempt = await prisma.callAttempt.delete({
     *   where: {
     *     // ... filter to delete one CallAttempt
     *   }
     * })
     * 
     */
    delete<T extends CallAttemptDeleteArgs>(args: SelectSubset<T, CallAttemptDeleteArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CallAttempt.
     * @param {CallAttemptUpdateArgs} args - Arguments to update one CallAttempt.
     * @example
     * // Update one CallAttempt
     * const callAttempt = await prisma.callAttempt.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CallAttemptUpdateArgs>(args: SelectSubset<T, CallAttemptUpdateArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CallAttempts.
     * @param {CallAttemptDeleteManyArgs} args - Arguments to filter CallAttempts to delete.
     * @example
     * // Delete a few CallAttempts
     * const { count } = await prisma.callAttempt.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CallAttemptDeleteManyArgs>(args?: SelectSubset<T, CallAttemptDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CallAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CallAttempts
     * const callAttempt = await prisma.callAttempt.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CallAttemptUpdateManyArgs>(args: SelectSubset<T, CallAttemptUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CallAttempt.
     * @param {CallAttemptUpsertArgs} args - Arguments to update or create a CallAttempt.
     * @example
     * // Update or create a CallAttempt
     * const callAttempt = await prisma.callAttempt.upsert({
     *   create: {
     *     // ... data to create a CallAttempt
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CallAttempt we want to update
     *   }
     * })
     */
    upsert<T extends CallAttemptUpsertArgs>(args: SelectSubset<T, CallAttemptUpsertArgs<ExtArgs>>): Prisma__CallAttemptClient<$Result.GetResult<Prisma.$CallAttemptPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CallAttempts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptCountArgs} args - Arguments to filter CallAttempts to count.
     * @example
     * // Count the number of CallAttempts
     * const count = await prisma.callAttempt.count({
     *   where: {
     *     // ... the filter for the CallAttempts we want to count
     *   }
     * })
    **/
    count<T extends CallAttemptCountArgs>(
      args?: Subset<T, CallAttemptCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CallAttemptCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CallAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CallAttemptAggregateArgs>(args: Subset<T, CallAttemptAggregateArgs>): Prisma.PrismaPromise<GetCallAttemptAggregateType<T>>

    /**
     * Group by CallAttempt.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CallAttemptGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CallAttemptGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CallAttemptGroupByArgs['orderBy'] }
        : { orderBy?: CallAttemptGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CallAttemptGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCallAttemptGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CallAttempt model
   */
  readonly fields: CallAttemptFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CallAttempt.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CallAttemptClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    alertHistory<T extends AlertHistoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, AlertHistoryDefaultArgs<ExtArgs>>): Prisma__AlertHistoryClient<$Result.GetResult<Prisma.$AlertHistoryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    member<T extends CallAttempt$memberArgs<ExtArgs> = {}>(args?: Subset<T, CallAttempt$memberArgs<ExtArgs>>): Prisma__CommunityMemberClient<$Result.GetResult<Prisma.$CommunityMemberPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CallAttempt model
   */ 
  interface CallAttemptFieldRefs {
    readonly id: FieldRef<"CallAttempt", 'Int'>
    readonly alertHistoryId: FieldRef<"CallAttempt", 'Int'>
    readonly memberId: FieldRef<"CallAttempt", 'Int'>
    readonly phoneNumber: FieldRef<"CallAttempt", 'String'>
    readonly channel: FieldRef<"CallAttempt", 'String'>
    readonly status: FieldRef<"CallAttempt", 'String'>
    readonly provider: FieldRef<"CallAttempt", 'String'>
    readonly providerCallId: FieldRef<"CallAttempt", 'String'>
    readonly language: FieldRef<"CallAttempt", 'String'>
    readonly dialect: FieldRef<"CallAttempt", 'String'>
    readonly attemptCount: FieldRef<"CallAttempt", 'Int'>
    readonly lastAttemptAt: FieldRef<"CallAttempt", 'DateTime'>
    readonly completedAt: FieldRef<"CallAttempt", 'DateTime'>
    readonly failureReason: FieldRef<"CallAttempt", 'String'>
    readonly createdAt: FieldRef<"CallAttempt", 'DateTime'>
    readonly updatedAt: FieldRef<"CallAttempt", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * CallAttempt findUnique
   */
  export type CallAttemptFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * Filter, which CallAttempt to fetch.
     */
    where: CallAttemptWhereUniqueInput
  }

  /**
   * CallAttempt findUniqueOrThrow
   */
  export type CallAttemptFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * Filter, which CallAttempt to fetch.
     */
    where: CallAttemptWhereUniqueInput
  }

  /**
   * CallAttempt findFirst
   */
  export type CallAttemptFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * Filter, which CallAttempt to fetch.
     */
    where?: CallAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallAttempts to fetch.
     */
    orderBy?: CallAttemptOrderByWithRelationInput | CallAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallAttempts.
     */
    cursor?: CallAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallAttempts.
     */
    distinct?: CallAttemptScalarFieldEnum | CallAttemptScalarFieldEnum[]
  }

  /**
   * CallAttempt findFirstOrThrow
   */
  export type CallAttemptFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * Filter, which CallAttempt to fetch.
     */
    where?: CallAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallAttempts to fetch.
     */
    orderBy?: CallAttemptOrderByWithRelationInput | CallAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CallAttempts.
     */
    cursor?: CallAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallAttempts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CallAttempts.
     */
    distinct?: CallAttemptScalarFieldEnum | CallAttemptScalarFieldEnum[]
  }

  /**
   * CallAttempt findMany
   */
  export type CallAttemptFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * Filter, which CallAttempts to fetch.
     */
    where?: CallAttemptWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CallAttempts to fetch.
     */
    orderBy?: CallAttemptOrderByWithRelationInput | CallAttemptOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CallAttempts.
     */
    cursor?: CallAttemptWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CallAttempts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CallAttempts.
     */
    skip?: number
    distinct?: CallAttemptScalarFieldEnum | CallAttemptScalarFieldEnum[]
  }

  /**
   * CallAttempt create
   */
  export type CallAttemptCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * The data needed to create a CallAttempt.
     */
    data: XOR<CallAttemptCreateInput, CallAttemptUncheckedCreateInput>
  }

  /**
   * CallAttempt createMany
   */
  export type CallAttemptCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CallAttempts.
     */
    data: CallAttemptCreateManyInput | CallAttemptCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CallAttempt createManyAndReturn
   */
  export type CallAttemptCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CallAttempts.
     */
    data: CallAttemptCreateManyInput | CallAttemptCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CallAttempt update
   */
  export type CallAttemptUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * The data needed to update a CallAttempt.
     */
    data: XOR<CallAttemptUpdateInput, CallAttemptUncheckedUpdateInput>
    /**
     * Choose, which CallAttempt to update.
     */
    where: CallAttemptWhereUniqueInput
  }

  /**
   * CallAttempt updateMany
   */
  export type CallAttemptUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CallAttempts.
     */
    data: XOR<CallAttemptUpdateManyMutationInput, CallAttemptUncheckedUpdateManyInput>
    /**
     * Filter which CallAttempts to update
     */
    where?: CallAttemptWhereInput
  }

  /**
   * CallAttempt upsert
   */
  export type CallAttemptUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * The filter to search for the CallAttempt to update in case it exists.
     */
    where: CallAttemptWhereUniqueInput
    /**
     * In case the CallAttempt found by the `where` argument doesn't exist, create a new CallAttempt with this data.
     */
    create: XOR<CallAttemptCreateInput, CallAttemptUncheckedCreateInput>
    /**
     * In case the CallAttempt was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CallAttemptUpdateInput, CallAttemptUncheckedUpdateInput>
  }

  /**
   * CallAttempt delete
   */
  export type CallAttemptDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
    /**
     * Filter which CallAttempt to delete.
     */
    where: CallAttemptWhereUniqueInput
  }

  /**
   * CallAttempt deleteMany
   */
  export type CallAttemptDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CallAttempts to delete
     */
    where?: CallAttemptWhereInput
  }

  /**
   * CallAttempt.member
   */
  export type CallAttempt$memberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CommunityMember
     */
    select?: CommunityMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CommunityMemberInclude<ExtArgs> | null
    where?: CommunityMemberWhereInput
  }

  /**
   * CallAttempt without action
   */
  export type CallAttemptDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CallAttempt
     */
    select?: CallAttemptSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CallAttemptInclude<ExtArgs> | null
  }


  /**
   * Model IvrConfig
   */

  export type AggregateIvrConfig = {
    _count: IvrConfigCountAggregateOutputType | null
    _avg: IvrConfigAvgAggregateOutputType | null
    _sum: IvrConfigSumAggregateOutputType | null
    _min: IvrConfigMinAggregateOutputType | null
    _max: IvrConfigMaxAggregateOutputType | null
  }

  export type IvrConfigAvgAggregateOutputType = {
    id: number | null
  }

  export type IvrConfigSumAggregateOutputType = {
    id: number | null
  }

  export type IvrConfigMinAggregateOutputType = {
    id: number | null
    provider: string | null
    voicePhoneNumber: string | null
    defaultLanguage: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IvrConfigMaxAggregateOutputType = {
    id: number | null
    provider: string | null
    voicePhoneNumber: string | null
    defaultLanguage: string | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IvrConfigCountAggregateOutputType = {
    id: number
    provider: number
    voicePhoneNumber: number
    defaultLanguage: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IvrConfigAvgAggregateInputType = {
    id?: true
  }

  export type IvrConfigSumAggregateInputType = {
    id?: true
  }

  export type IvrConfigMinAggregateInputType = {
    id?: true
    provider?: true
    voicePhoneNumber?: true
    defaultLanguage?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IvrConfigMaxAggregateInputType = {
    id?: true
    provider?: true
    voicePhoneNumber?: true
    defaultLanguage?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IvrConfigCountAggregateInputType = {
    id?: true
    provider?: true
    voicePhoneNumber?: true
    defaultLanguage?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IvrConfigAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IvrConfig to aggregate.
     */
    where?: IvrConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IvrConfigs to fetch.
     */
    orderBy?: IvrConfigOrderByWithRelationInput | IvrConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IvrConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IvrConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IvrConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IvrConfigs
    **/
    _count?: true | IvrConfigCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IvrConfigAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IvrConfigSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IvrConfigMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IvrConfigMaxAggregateInputType
  }

  export type GetIvrConfigAggregateType<T extends IvrConfigAggregateArgs> = {
        [P in keyof T & keyof AggregateIvrConfig]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIvrConfig[P]>
      : GetScalarType<T[P], AggregateIvrConfig[P]>
  }




  export type IvrConfigGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IvrConfigWhereInput
    orderBy?: IvrConfigOrderByWithAggregationInput | IvrConfigOrderByWithAggregationInput[]
    by: IvrConfigScalarFieldEnum[] | IvrConfigScalarFieldEnum
    having?: IvrConfigScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IvrConfigCountAggregateInputType | true
    _avg?: IvrConfigAvgAggregateInputType
    _sum?: IvrConfigSumAggregateInputType
    _min?: IvrConfigMinAggregateInputType
    _max?: IvrConfigMaxAggregateInputType
  }

  export type IvrConfigGroupByOutputType = {
    id: number
    provider: string
    voicePhoneNumber: string | null
    defaultLanguage: string | null
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: IvrConfigCountAggregateOutputType | null
    _avg: IvrConfigAvgAggregateOutputType | null
    _sum: IvrConfigSumAggregateOutputType | null
    _min: IvrConfigMinAggregateOutputType | null
    _max: IvrConfigMaxAggregateOutputType | null
  }

  type GetIvrConfigGroupByPayload<T extends IvrConfigGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IvrConfigGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IvrConfigGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IvrConfigGroupByOutputType[P]>
            : GetScalarType<T[P], IvrConfigGroupByOutputType[P]>
        }
      >
    >


  export type IvrConfigSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    voicePhoneNumber?: boolean
    defaultLanguage?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ivrConfig"]>

  export type IvrConfigSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    voicePhoneNumber?: boolean
    defaultLanguage?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["ivrConfig"]>

  export type IvrConfigSelectScalar = {
    id?: boolean
    provider?: boolean
    voicePhoneNumber?: boolean
    defaultLanguage?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $IvrConfigPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IvrConfig"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      provider: string
      voicePhoneNumber: string | null
      defaultLanguage: string | null
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["ivrConfig"]>
    composites: {}
  }

  type IvrConfigGetPayload<S extends boolean | null | undefined | IvrConfigDefaultArgs> = $Result.GetResult<Prisma.$IvrConfigPayload, S>

  type IvrConfigCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<IvrConfigFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: IvrConfigCountAggregateInputType | true
    }

  export interface IvrConfigDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IvrConfig'], meta: { name: 'IvrConfig' } }
    /**
     * Find zero or one IvrConfig that matches the filter.
     * @param {IvrConfigFindUniqueArgs} args - Arguments to find a IvrConfig
     * @example
     * // Get one IvrConfig
     * const ivrConfig = await prisma.ivrConfig.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IvrConfigFindUniqueArgs>(args: SelectSubset<T, IvrConfigFindUniqueArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one IvrConfig that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {IvrConfigFindUniqueOrThrowArgs} args - Arguments to find a IvrConfig
     * @example
     * // Get one IvrConfig
     * const ivrConfig = await prisma.ivrConfig.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IvrConfigFindUniqueOrThrowArgs>(args: SelectSubset<T, IvrConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first IvrConfig that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigFindFirstArgs} args - Arguments to find a IvrConfig
     * @example
     * // Get one IvrConfig
     * const ivrConfig = await prisma.ivrConfig.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IvrConfigFindFirstArgs>(args?: SelectSubset<T, IvrConfigFindFirstArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first IvrConfig that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigFindFirstOrThrowArgs} args - Arguments to find a IvrConfig
     * @example
     * // Get one IvrConfig
     * const ivrConfig = await prisma.ivrConfig.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IvrConfigFindFirstOrThrowArgs>(args?: SelectSubset<T, IvrConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more IvrConfigs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IvrConfigs
     * const ivrConfigs = await prisma.ivrConfig.findMany()
     * 
     * // Get first 10 IvrConfigs
     * const ivrConfigs = await prisma.ivrConfig.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const ivrConfigWithIdOnly = await prisma.ivrConfig.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IvrConfigFindManyArgs>(args?: SelectSubset<T, IvrConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a IvrConfig.
     * @param {IvrConfigCreateArgs} args - Arguments to create a IvrConfig.
     * @example
     * // Create one IvrConfig
     * const IvrConfig = await prisma.ivrConfig.create({
     *   data: {
     *     // ... data to create a IvrConfig
     *   }
     * })
     * 
     */
    create<T extends IvrConfigCreateArgs>(args: SelectSubset<T, IvrConfigCreateArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many IvrConfigs.
     * @param {IvrConfigCreateManyArgs} args - Arguments to create many IvrConfigs.
     * @example
     * // Create many IvrConfigs
     * const ivrConfig = await prisma.ivrConfig.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IvrConfigCreateManyArgs>(args?: SelectSubset<T, IvrConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IvrConfigs and returns the data saved in the database.
     * @param {IvrConfigCreateManyAndReturnArgs} args - Arguments to create many IvrConfigs.
     * @example
     * // Create many IvrConfigs
     * const ivrConfig = await prisma.ivrConfig.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IvrConfigs and only return the `id`
     * const ivrConfigWithIdOnly = await prisma.ivrConfig.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IvrConfigCreateManyAndReturnArgs>(args?: SelectSubset<T, IvrConfigCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a IvrConfig.
     * @param {IvrConfigDeleteArgs} args - Arguments to delete one IvrConfig.
     * @example
     * // Delete one IvrConfig
     * const IvrConfig = await prisma.ivrConfig.delete({
     *   where: {
     *     // ... filter to delete one IvrConfig
     *   }
     * })
     * 
     */
    delete<T extends IvrConfigDeleteArgs>(args: SelectSubset<T, IvrConfigDeleteArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one IvrConfig.
     * @param {IvrConfigUpdateArgs} args - Arguments to update one IvrConfig.
     * @example
     * // Update one IvrConfig
     * const ivrConfig = await prisma.ivrConfig.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IvrConfigUpdateArgs>(args: SelectSubset<T, IvrConfigUpdateArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more IvrConfigs.
     * @param {IvrConfigDeleteManyArgs} args - Arguments to filter IvrConfigs to delete.
     * @example
     * // Delete a few IvrConfigs
     * const { count } = await prisma.ivrConfig.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IvrConfigDeleteManyArgs>(args?: SelectSubset<T, IvrConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IvrConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IvrConfigs
     * const ivrConfig = await prisma.ivrConfig.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IvrConfigUpdateManyArgs>(args: SelectSubset<T, IvrConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one IvrConfig.
     * @param {IvrConfigUpsertArgs} args - Arguments to update or create a IvrConfig.
     * @example
     * // Update or create a IvrConfig
     * const ivrConfig = await prisma.ivrConfig.upsert({
     *   create: {
     *     // ... data to create a IvrConfig
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IvrConfig we want to update
     *   }
     * })
     */
    upsert<T extends IvrConfigUpsertArgs>(args: SelectSubset<T, IvrConfigUpsertArgs<ExtArgs>>): Prisma__IvrConfigClient<$Result.GetResult<Prisma.$IvrConfigPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of IvrConfigs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigCountArgs} args - Arguments to filter IvrConfigs to count.
     * @example
     * // Count the number of IvrConfigs
     * const count = await prisma.ivrConfig.count({
     *   where: {
     *     // ... the filter for the IvrConfigs we want to count
     *   }
     * })
    **/
    count<T extends IvrConfigCountArgs>(
      args?: Subset<T, IvrConfigCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IvrConfigCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IvrConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IvrConfigAggregateArgs>(args: Subset<T, IvrConfigAggregateArgs>): Prisma.PrismaPromise<GetIvrConfigAggregateType<T>>

    /**
     * Group by IvrConfig.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IvrConfigGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IvrConfigGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IvrConfigGroupByArgs['orderBy'] }
        : { orderBy?: IvrConfigGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IvrConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIvrConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IvrConfig model
   */
  readonly fields: IvrConfigFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IvrConfig.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IvrConfigClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IvrConfig model
   */ 
  interface IvrConfigFieldRefs {
    readonly id: FieldRef<"IvrConfig", 'Int'>
    readonly provider: FieldRef<"IvrConfig", 'String'>
    readonly voicePhoneNumber: FieldRef<"IvrConfig", 'String'>
    readonly defaultLanguage: FieldRef<"IvrConfig", 'String'>
    readonly isActive: FieldRef<"IvrConfig", 'Boolean'>
    readonly createdAt: FieldRef<"IvrConfig", 'DateTime'>
    readonly updatedAt: FieldRef<"IvrConfig", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IvrConfig findUnique
   */
  export type IvrConfigFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * Filter, which IvrConfig to fetch.
     */
    where: IvrConfigWhereUniqueInput
  }

  /**
   * IvrConfig findUniqueOrThrow
   */
  export type IvrConfigFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * Filter, which IvrConfig to fetch.
     */
    where: IvrConfigWhereUniqueInput
  }

  /**
   * IvrConfig findFirst
   */
  export type IvrConfigFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * Filter, which IvrConfig to fetch.
     */
    where?: IvrConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IvrConfigs to fetch.
     */
    orderBy?: IvrConfigOrderByWithRelationInput | IvrConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IvrConfigs.
     */
    cursor?: IvrConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IvrConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IvrConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IvrConfigs.
     */
    distinct?: IvrConfigScalarFieldEnum | IvrConfigScalarFieldEnum[]
  }

  /**
   * IvrConfig findFirstOrThrow
   */
  export type IvrConfigFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * Filter, which IvrConfig to fetch.
     */
    where?: IvrConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IvrConfigs to fetch.
     */
    orderBy?: IvrConfigOrderByWithRelationInput | IvrConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IvrConfigs.
     */
    cursor?: IvrConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IvrConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IvrConfigs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IvrConfigs.
     */
    distinct?: IvrConfigScalarFieldEnum | IvrConfigScalarFieldEnum[]
  }

  /**
   * IvrConfig findMany
   */
  export type IvrConfigFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * Filter, which IvrConfigs to fetch.
     */
    where?: IvrConfigWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IvrConfigs to fetch.
     */
    orderBy?: IvrConfigOrderByWithRelationInput | IvrConfigOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IvrConfigs.
     */
    cursor?: IvrConfigWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IvrConfigs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IvrConfigs.
     */
    skip?: number
    distinct?: IvrConfigScalarFieldEnum | IvrConfigScalarFieldEnum[]
  }

  /**
   * IvrConfig create
   */
  export type IvrConfigCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * The data needed to create a IvrConfig.
     */
    data: XOR<IvrConfigCreateInput, IvrConfigUncheckedCreateInput>
  }

  /**
   * IvrConfig createMany
   */
  export type IvrConfigCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IvrConfigs.
     */
    data: IvrConfigCreateManyInput | IvrConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IvrConfig createManyAndReturn
   */
  export type IvrConfigCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many IvrConfigs.
     */
    data: IvrConfigCreateManyInput | IvrConfigCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * IvrConfig update
   */
  export type IvrConfigUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * The data needed to update a IvrConfig.
     */
    data: XOR<IvrConfigUpdateInput, IvrConfigUncheckedUpdateInput>
    /**
     * Choose, which IvrConfig to update.
     */
    where: IvrConfigWhereUniqueInput
  }

  /**
   * IvrConfig updateMany
   */
  export type IvrConfigUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IvrConfigs.
     */
    data: XOR<IvrConfigUpdateManyMutationInput, IvrConfigUncheckedUpdateManyInput>
    /**
     * Filter which IvrConfigs to update
     */
    where?: IvrConfigWhereInput
  }

  /**
   * IvrConfig upsert
   */
  export type IvrConfigUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * The filter to search for the IvrConfig to update in case it exists.
     */
    where: IvrConfigWhereUniqueInput
    /**
     * In case the IvrConfig found by the `where` argument doesn't exist, create a new IvrConfig with this data.
     */
    create: XOR<IvrConfigCreateInput, IvrConfigUncheckedCreateInput>
    /**
     * In case the IvrConfig was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IvrConfigUpdateInput, IvrConfigUncheckedUpdateInput>
  }

  /**
   * IvrConfig delete
   */
  export type IvrConfigDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
    /**
     * Filter which IvrConfig to delete.
     */
    where: IvrConfigWhereUniqueInput
  }

  /**
   * IvrConfig deleteMany
   */
  export type IvrConfigDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IvrConfigs to delete
     */
    where?: IvrConfigWhereInput
  }

  /**
   * IvrConfig without action
   */
  export type IvrConfigDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IvrConfig
     */
    select?: IvrConfigSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    lastLogin: 'lastLogin',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    id: 'id',
    name: 'name',
    latitude: 'latitude',
    longitude: 'longitude'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const HazardTypeScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type HazardTypeScalarFieldEnum = (typeof HazardTypeScalarFieldEnum)[keyof typeof HazardTypeScalarFieldEnum]


  export const CommunityScalarFieldEnum: {
    id: 'id',
    name: 'name',
    totalRegistered: 'totalRegistered',
    regionId: 'regionId',
    registrationDate: 'registrationDate',
    source: 'source',
    status: 'status',
    actions: 'actions',
    createdAt: 'createdAt'
  };

  export type CommunityScalarFieldEnum = (typeof CommunityScalarFieldEnum)[keyof typeof CommunityScalarFieldEnum]


  export const AlertScalarFieldEnum: {
    id: 'id',
    hazardTypeId: 'hazardTypeId',
    severityLevel: 'severityLevel',
    rawScientificDescription: 'rawScientificDescription',
    createdByUserId: 'createdByUserId',
    createdAt: 'createdAt'
  };

  export type AlertScalarFieldEnum = (typeof AlertScalarFieldEnum)[keyof typeof AlertScalarFieldEnum]


  export const AlertRegionScalarFieldEnum: {
    alertId: 'alertId',
    regionId: 'regionId'
  };

  export type AlertRegionScalarFieldEnum = (typeof AlertRegionScalarFieldEnum)[keyof typeof AlertRegionScalarFieldEnum]


  export const AlertHistoryScalarFieldEnum: {
    id: 'id',
    alertId: 'alertId',
    regionId: 'regionId',
    dialect: 'dialect',
    status: 'status',
    callsCount: 'callsCount',
    dispatchedAt: 'dispatchedAt',
    simplifiedText: 'simplifiedText',
    translatedText: 'translatedText',
    audioUrl: 'audioUrl'
  };

  export type AlertHistoryScalarFieldEnum = (typeof AlertHistoryScalarFieldEnum)[keyof typeof AlertHistoryScalarFieldEnum]


  export const FeedbackLogScalarFieldEnum: {
    id: 'id',
    alertHistoryId: 'alertHistoryId',
    regionId: 'regionId',
    hazardTypeId: 'hazardTypeId',
    audioFeedbackUrl: 'audioFeedbackUrl',
    translationText: 'translationText',
    status: 'status',
    adminResponse: 'adminResponse',
    respondedAt: 'respondedAt',
    createdAt: 'createdAt'
  };

  export type FeedbackLogScalarFieldEnum = (typeof FeedbackLogScalarFieldEnum)[keyof typeof FeedbackLogScalarFieldEnum]


  export const CommunityMemberScalarFieldEnum: {
    id: 'id',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
    regionId: 'regionId',
    communityId: 'communityId',
    language: 'language',
    dialect: 'dialect',
    isActive: 'isActive',
    consent: 'consent',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CommunityMemberScalarFieldEnum = (typeof CommunityMemberScalarFieldEnum)[keyof typeof CommunityMemberScalarFieldEnum]


  export const CallAttemptScalarFieldEnum: {
    id: 'id',
    alertHistoryId: 'alertHistoryId',
    memberId: 'memberId',
    phoneNumber: 'phoneNumber',
    channel: 'channel',
    status: 'status',
    provider: 'provider',
    providerCallId: 'providerCallId',
    language: 'language',
    dialect: 'dialect',
    attemptCount: 'attemptCount',
    lastAttemptAt: 'lastAttemptAt',
    completedAt: 'completedAt',
    failureReason: 'failureReason',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CallAttemptScalarFieldEnum = (typeof CallAttemptScalarFieldEnum)[keyof typeof CallAttemptScalarFieldEnum]


  export const IvrConfigScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    voicePhoneNumber: 'voicePhoneNumber',
    defaultLanguage: 'defaultLanguage',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IvrConfigScalarFieldEnum = (typeof IvrConfigScalarFieldEnum)[keyof typeof IvrConfigScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'user_role'
   */
  export type Enumuser_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_role'>
    


  /**
   * Reference to a field of type 'user_role[]'
   */
  export type ListEnumuser_roleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'user_role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    fullName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: Enumuser_roleFilter<"User"> | $Enums.user_role
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    alerts?: AlertListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    alerts?: AlertOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    fullName?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: Enumuser_roleFilter<"User"> | $Enums.user_role
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    alerts?: AlertListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    fullName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: Enumuser_roleWithAggregatesFilter<"User"> | $Enums.user_role
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    id?: IntFilter<"Region"> | number
    name?: StringFilter<"Region"> | string
    latitude?: FloatNullableFilter<"Region"> | number | null
    longitude?: FloatNullableFilter<"Region"> | number | null
    communities?: CommunityListRelationFilter
    alertRegions?: AlertRegionListRelationFilter
    alertHistory?: AlertHistoryListRelationFilter
    feedbackLogs?: FeedbackLogListRelationFilter
    communityMembers?: CommunityMemberListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    communities?: CommunityOrderByRelationAggregateInput
    alertRegions?: AlertRegionOrderByRelationAggregateInput
    alertHistory?: AlertHistoryOrderByRelationAggregateInput
    feedbackLogs?: FeedbackLogOrderByRelationAggregateInput
    communityMembers?: CommunityMemberOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    latitude?: FloatNullableFilter<"Region"> | number | null
    longitude?: FloatNullableFilter<"Region"> | number | null
    communities?: CommunityListRelationFilter
    alertRegions?: AlertRegionListRelationFilter
    alertHistory?: AlertHistoryListRelationFilter
    feedbackLogs?: FeedbackLogListRelationFilter
    communityMembers?: CommunityMemberListRelationFilter
  }, "id" | "name">

  export type RegionOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrderInput | SortOrder
    longitude?: SortOrderInput | SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Region"> | number
    name?: StringWithAggregatesFilter<"Region"> | string
    latitude?: FloatNullableWithAggregatesFilter<"Region"> | number | null
    longitude?: FloatNullableWithAggregatesFilter<"Region"> | number | null
  }

  export type HazardTypeWhereInput = {
    AND?: HazardTypeWhereInput | HazardTypeWhereInput[]
    OR?: HazardTypeWhereInput[]
    NOT?: HazardTypeWhereInput | HazardTypeWhereInput[]
    id?: IntFilter<"HazardType"> | number
    name?: StringFilter<"HazardType"> | string
    alerts?: AlertListRelationFilter
    feedbackLogs?: FeedbackLogListRelationFilter
  }

  export type HazardTypeOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    alerts?: AlertOrderByRelationAggregateInput
    feedbackLogs?: FeedbackLogOrderByRelationAggregateInput
  }

  export type HazardTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: HazardTypeWhereInput | HazardTypeWhereInput[]
    OR?: HazardTypeWhereInput[]
    NOT?: HazardTypeWhereInput | HazardTypeWhereInput[]
    alerts?: AlertListRelationFilter
    feedbackLogs?: FeedbackLogListRelationFilter
  }, "id" | "name">

  export type HazardTypeOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: HazardTypeCountOrderByAggregateInput
    _avg?: HazardTypeAvgOrderByAggregateInput
    _max?: HazardTypeMaxOrderByAggregateInput
    _min?: HazardTypeMinOrderByAggregateInput
    _sum?: HazardTypeSumOrderByAggregateInput
  }

  export type HazardTypeScalarWhereWithAggregatesInput = {
    AND?: HazardTypeScalarWhereWithAggregatesInput | HazardTypeScalarWhereWithAggregatesInput[]
    OR?: HazardTypeScalarWhereWithAggregatesInput[]
    NOT?: HazardTypeScalarWhereWithAggregatesInput | HazardTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"HazardType"> | number
    name?: StringWithAggregatesFilter<"HazardType"> | string
  }

  export type CommunityWhereInput = {
    AND?: CommunityWhereInput | CommunityWhereInput[]
    OR?: CommunityWhereInput[]
    NOT?: CommunityWhereInput | CommunityWhereInput[]
    id?: IntFilter<"Community"> | number
    name?: StringFilter<"Community"> | string
    totalRegistered?: IntFilter<"Community"> | number
    regionId?: IntFilter<"Community"> | number
    registrationDate?: DateTimeFilter<"Community"> | Date | string
    source?: StringNullableFilter<"Community"> | string | null
    status?: StringNullableFilter<"Community"> | string | null
    actions?: StringNullableFilter<"Community"> | string | null
    createdAt?: DateTimeFilter<"Community"> | Date | string
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    members?: CommunityMemberListRelationFilter
  }

  export type CommunityOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
    registrationDate?: SortOrder
    source?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    actions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    region?: RegionOrderByWithRelationInput
    members?: CommunityMemberOrderByRelationAggregateInput
  }

  export type CommunityWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommunityWhereInput | CommunityWhereInput[]
    OR?: CommunityWhereInput[]
    NOT?: CommunityWhereInput | CommunityWhereInput[]
    name?: StringFilter<"Community"> | string
    totalRegistered?: IntFilter<"Community"> | number
    regionId?: IntFilter<"Community"> | number
    registrationDate?: DateTimeFilter<"Community"> | Date | string
    source?: StringNullableFilter<"Community"> | string | null
    status?: StringNullableFilter<"Community"> | string | null
    actions?: StringNullableFilter<"Community"> | string | null
    createdAt?: DateTimeFilter<"Community"> | Date | string
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    members?: CommunityMemberListRelationFilter
  }, "id">

  export type CommunityOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
    registrationDate?: SortOrder
    source?: SortOrderInput | SortOrder
    status?: SortOrderInput | SortOrder
    actions?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CommunityCountOrderByAggregateInput
    _avg?: CommunityAvgOrderByAggregateInput
    _max?: CommunityMaxOrderByAggregateInput
    _min?: CommunityMinOrderByAggregateInput
    _sum?: CommunitySumOrderByAggregateInput
  }

  export type CommunityScalarWhereWithAggregatesInput = {
    AND?: CommunityScalarWhereWithAggregatesInput | CommunityScalarWhereWithAggregatesInput[]
    OR?: CommunityScalarWhereWithAggregatesInput[]
    NOT?: CommunityScalarWhereWithAggregatesInput | CommunityScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Community"> | number
    name?: StringWithAggregatesFilter<"Community"> | string
    totalRegistered?: IntWithAggregatesFilter<"Community"> | number
    regionId?: IntWithAggregatesFilter<"Community"> | number
    registrationDate?: DateTimeWithAggregatesFilter<"Community"> | Date | string
    source?: StringNullableWithAggregatesFilter<"Community"> | string | null
    status?: StringNullableWithAggregatesFilter<"Community"> | string | null
    actions?: StringNullableWithAggregatesFilter<"Community"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Community"> | Date | string
  }

  export type AlertWhereInput = {
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    id?: IntFilter<"Alert"> | number
    hazardTypeId?: IntFilter<"Alert"> | number
    severityLevel?: StringFilter<"Alert"> | string
    rawScientificDescription?: StringFilter<"Alert"> | string
    createdByUserId?: IntNullableFilter<"Alert"> | number | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    hazardType?: XOR<HazardTypeRelationFilter, HazardTypeWhereInput>
    createdByUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    alertRegions?: AlertRegionListRelationFilter
    alertHistory?: AlertHistoryListRelationFilter
  }

  export type AlertOrderByWithRelationInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    severityLevel?: SortOrder
    rawScientificDescription?: SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    hazardType?: HazardTypeOrderByWithRelationInput
    createdByUser?: UserOrderByWithRelationInput
    alertRegions?: AlertRegionOrderByRelationAggregateInput
    alertHistory?: AlertHistoryOrderByRelationAggregateInput
  }

  export type AlertWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AlertWhereInput | AlertWhereInput[]
    OR?: AlertWhereInput[]
    NOT?: AlertWhereInput | AlertWhereInput[]
    hazardTypeId?: IntFilter<"Alert"> | number
    severityLevel?: StringFilter<"Alert"> | string
    rawScientificDescription?: StringFilter<"Alert"> | string
    createdByUserId?: IntNullableFilter<"Alert"> | number | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
    hazardType?: XOR<HazardTypeRelationFilter, HazardTypeWhereInput>
    createdByUser?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    alertRegions?: AlertRegionListRelationFilter
    alertHistory?: AlertHistoryListRelationFilter
  }, "id">

  export type AlertOrderByWithAggregationInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    severityLevel?: SortOrder
    rawScientificDescription?: SortOrder
    createdByUserId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AlertCountOrderByAggregateInput
    _avg?: AlertAvgOrderByAggregateInput
    _max?: AlertMaxOrderByAggregateInput
    _min?: AlertMinOrderByAggregateInput
    _sum?: AlertSumOrderByAggregateInput
  }

  export type AlertScalarWhereWithAggregatesInput = {
    AND?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    OR?: AlertScalarWhereWithAggregatesInput[]
    NOT?: AlertScalarWhereWithAggregatesInput | AlertScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Alert"> | number
    hazardTypeId?: IntWithAggregatesFilter<"Alert"> | number
    severityLevel?: StringWithAggregatesFilter<"Alert"> | string
    rawScientificDescription?: StringWithAggregatesFilter<"Alert"> | string
    createdByUserId?: IntNullableWithAggregatesFilter<"Alert"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Alert"> | Date | string
  }

  export type AlertRegionWhereInput = {
    AND?: AlertRegionWhereInput | AlertRegionWhereInput[]
    OR?: AlertRegionWhereInput[]
    NOT?: AlertRegionWhereInput | AlertRegionWhereInput[]
    alertId?: IntFilter<"AlertRegion"> | number
    regionId?: IntFilter<"AlertRegion"> | number
    alert?: XOR<AlertRelationFilter, AlertWhereInput>
    region?: XOR<RegionRelationFilter, RegionWhereInput>
  }

  export type AlertRegionOrderByWithRelationInput = {
    alertId?: SortOrder
    regionId?: SortOrder
    alert?: AlertOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
  }

  export type AlertRegionWhereUniqueInput = Prisma.AtLeast<{
    alertId_regionId?: AlertRegionAlertIdRegionIdCompoundUniqueInput
    AND?: AlertRegionWhereInput | AlertRegionWhereInput[]
    OR?: AlertRegionWhereInput[]
    NOT?: AlertRegionWhereInput | AlertRegionWhereInput[]
    alertId?: IntFilter<"AlertRegion"> | number
    regionId?: IntFilter<"AlertRegion"> | number
    alert?: XOR<AlertRelationFilter, AlertWhereInput>
    region?: XOR<RegionRelationFilter, RegionWhereInput>
  }, "alertId_regionId">

  export type AlertRegionOrderByWithAggregationInput = {
    alertId?: SortOrder
    regionId?: SortOrder
    _count?: AlertRegionCountOrderByAggregateInput
    _avg?: AlertRegionAvgOrderByAggregateInput
    _max?: AlertRegionMaxOrderByAggregateInput
    _min?: AlertRegionMinOrderByAggregateInput
    _sum?: AlertRegionSumOrderByAggregateInput
  }

  export type AlertRegionScalarWhereWithAggregatesInput = {
    AND?: AlertRegionScalarWhereWithAggregatesInput | AlertRegionScalarWhereWithAggregatesInput[]
    OR?: AlertRegionScalarWhereWithAggregatesInput[]
    NOT?: AlertRegionScalarWhereWithAggregatesInput | AlertRegionScalarWhereWithAggregatesInput[]
    alertId?: IntWithAggregatesFilter<"AlertRegion"> | number
    regionId?: IntWithAggregatesFilter<"AlertRegion"> | number
  }

  export type AlertHistoryWhereInput = {
    AND?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    OR?: AlertHistoryWhereInput[]
    NOT?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    id?: IntFilter<"AlertHistory"> | number
    alertId?: IntFilter<"AlertHistory"> | number
    regionId?: IntFilter<"AlertHistory"> | number
    dialect?: StringFilter<"AlertHistory"> | string
    status?: StringFilter<"AlertHistory"> | string
    callsCount?: IntFilter<"AlertHistory"> | number
    dispatchedAt?: DateTimeFilter<"AlertHistory"> | Date | string
    simplifiedText?: StringNullableFilter<"AlertHistory"> | string | null
    translatedText?: StringNullableFilter<"AlertHistory"> | string | null
    audioUrl?: StringNullableFilter<"AlertHistory"> | string | null
    alert?: XOR<AlertRelationFilter, AlertWhereInput>
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    feedbackLogs?: FeedbackLogListRelationFilter
    callAttempts?: CallAttemptListRelationFilter
  }

  export type AlertHistoryOrderByWithRelationInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    dialect?: SortOrder
    status?: SortOrder
    callsCount?: SortOrder
    dispatchedAt?: SortOrder
    simplifiedText?: SortOrderInput | SortOrder
    translatedText?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    alert?: AlertOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
    feedbackLogs?: FeedbackLogOrderByRelationAggregateInput
    callAttempts?: CallAttemptOrderByRelationAggregateInput
  }

  export type AlertHistoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    OR?: AlertHistoryWhereInput[]
    NOT?: AlertHistoryWhereInput | AlertHistoryWhereInput[]
    alertId?: IntFilter<"AlertHistory"> | number
    regionId?: IntFilter<"AlertHistory"> | number
    dialect?: StringFilter<"AlertHistory"> | string
    status?: StringFilter<"AlertHistory"> | string
    callsCount?: IntFilter<"AlertHistory"> | number
    dispatchedAt?: DateTimeFilter<"AlertHistory"> | Date | string
    simplifiedText?: StringNullableFilter<"AlertHistory"> | string | null
    translatedText?: StringNullableFilter<"AlertHistory"> | string | null
    audioUrl?: StringNullableFilter<"AlertHistory"> | string | null
    alert?: XOR<AlertRelationFilter, AlertWhereInput>
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    feedbackLogs?: FeedbackLogListRelationFilter
    callAttempts?: CallAttemptListRelationFilter
  }, "id">

  export type AlertHistoryOrderByWithAggregationInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    dialect?: SortOrder
    status?: SortOrder
    callsCount?: SortOrder
    dispatchedAt?: SortOrder
    simplifiedText?: SortOrderInput | SortOrder
    translatedText?: SortOrderInput | SortOrder
    audioUrl?: SortOrderInput | SortOrder
    _count?: AlertHistoryCountOrderByAggregateInput
    _avg?: AlertHistoryAvgOrderByAggregateInput
    _max?: AlertHistoryMaxOrderByAggregateInput
    _min?: AlertHistoryMinOrderByAggregateInput
    _sum?: AlertHistorySumOrderByAggregateInput
  }

  export type AlertHistoryScalarWhereWithAggregatesInput = {
    AND?: AlertHistoryScalarWhereWithAggregatesInput | AlertHistoryScalarWhereWithAggregatesInput[]
    OR?: AlertHistoryScalarWhereWithAggregatesInput[]
    NOT?: AlertHistoryScalarWhereWithAggregatesInput | AlertHistoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AlertHistory"> | number
    alertId?: IntWithAggregatesFilter<"AlertHistory"> | number
    regionId?: IntWithAggregatesFilter<"AlertHistory"> | number
    dialect?: StringWithAggregatesFilter<"AlertHistory"> | string
    status?: StringWithAggregatesFilter<"AlertHistory"> | string
    callsCount?: IntWithAggregatesFilter<"AlertHistory"> | number
    dispatchedAt?: DateTimeWithAggregatesFilter<"AlertHistory"> | Date | string
    simplifiedText?: StringNullableWithAggregatesFilter<"AlertHistory"> | string | null
    translatedText?: StringNullableWithAggregatesFilter<"AlertHistory"> | string | null
    audioUrl?: StringNullableWithAggregatesFilter<"AlertHistory"> | string | null
  }

  export type FeedbackLogWhereInput = {
    AND?: FeedbackLogWhereInput | FeedbackLogWhereInput[]
    OR?: FeedbackLogWhereInput[]
    NOT?: FeedbackLogWhereInput | FeedbackLogWhereInput[]
    id?: IntFilter<"FeedbackLog"> | number
    alertHistoryId?: IntFilter<"FeedbackLog"> | number
    regionId?: IntFilter<"FeedbackLog"> | number
    hazardTypeId?: IntFilter<"FeedbackLog"> | number
    audioFeedbackUrl?: StringNullableFilter<"FeedbackLog"> | string | null
    translationText?: StringNullableFilter<"FeedbackLog"> | string | null
    status?: StringFilter<"FeedbackLog"> | string
    adminResponse?: StringNullableFilter<"FeedbackLog"> | string | null
    respondedAt?: DateTimeNullableFilter<"FeedbackLog"> | Date | string | null
    createdAt?: DateTimeFilter<"FeedbackLog"> | Date | string
    alertHistory?: XOR<AlertHistoryRelationFilter, AlertHistoryWhereInput>
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    hazardType?: XOR<HazardTypeRelationFilter, HazardTypeWhereInput>
  }

  export type FeedbackLogOrderByWithRelationInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
    audioFeedbackUrl?: SortOrderInput | SortOrder
    translationText?: SortOrderInput | SortOrder
    status?: SortOrder
    adminResponse?: SortOrderInput | SortOrder
    respondedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    alertHistory?: AlertHistoryOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
    hazardType?: HazardTypeOrderByWithRelationInput
  }

  export type FeedbackLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: FeedbackLogWhereInput | FeedbackLogWhereInput[]
    OR?: FeedbackLogWhereInput[]
    NOT?: FeedbackLogWhereInput | FeedbackLogWhereInput[]
    alertHistoryId?: IntFilter<"FeedbackLog"> | number
    regionId?: IntFilter<"FeedbackLog"> | number
    hazardTypeId?: IntFilter<"FeedbackLog"> | number
    audioFeedbackUrl?: StringNullableFilter<"FeedbackLog"> | string | null
    translationText?: StringNullableFilter<"FeedbackLog"> | string | null
    status?: StringFilter<"FeedbackLog"> | string
    adminResponse?: StringNullableFilter<"FeedbackLog"> | string | null
    respondedAt?: DateTimeNullableFilter<"FeedbackLog"> | Date | string | null
    createdAt?: DateTimeFilter<"FeedbackLog"> | Date | string
    alertHistory?: XOR<AlertHistoryRelationFilter, AlertHistoryWhereInput>
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    hazardType?: XOR<HazardTypeRelationFilter, HazardTypeWhereInput>
  }, "id">

  export type FeedbackLogOrderByWithAggregationInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
    audioFeedbackUrl?: SortOrderInput | SortOrder
    translationText?: SortOrderInput | SortOrder
    status?: SortOrder
    adminResponse?: SortOrderInput | SortOrder
    respondedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: FeedbackLogCountOrderByAggregateInput
    _avg?: FeedbackLogAvgOrderByAggregateInput
    _max?: FeedbackLogMaxOrderByAggregateInput
    _min?: FeedbackLogMinOrderByAggregateInput
    _sum?: FeedbackLogSumOrderByAggregateInput
  }

  export type FeedbackLogScalarWhereWithAggregatesInput = {
    AND?: FeedbackLogScalarWhereWithAggregatesInput | FeedbackLogScalarWhereWithAggregatesInput[]
    OR?: FeedbackLogScalarWhereWithAggregatesInput[]
    NOT?: FeedbackLogScalarWhereWithAggregatesInput | FeedbackLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"FeedbackLog"> | number
    alertHistoryId?: IntWithAggregatesFilter<"FeedbackLog"> | number
    regionId?: IntWithAggregatesFilter<"FeedbackLog"> | number
    hazardTypeId?: IntWithAggregatesFilter<"FeedbackLog"> | number
    audioFeedbackUrl?: StringNullableWithAggregatesFilter<"FeedbackLog"> | string | null
    translationText?: StringNullableWithAggregatesFilter<"FeedbackLog"> | string | null
    status?: StringWithAggregatesFilter<"FeedbackLog"> | string
    adminResponse?: StringNullableWithAggregatesFilter<"FeedbackLog"> | string | null
    respondedAt?: DateTimeNullableWithAggregatesFilter<"FeedbackLog"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"FeedbackLog"> | Date | string
  }

  export type CommunityMemberWhereInput = {
    AND?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    OR?: CommunityMemberWhereInput[]
    NOT?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    id?: IntFilter<"CommunityMember"> | number
    fullName?: StringNullableFilter<"CommunityMember"> | string | null
    phoneNumber?: StringFilter<"CommunityMember"> | string
    regionId?: IntFilter<"CommunityMember"> | number
    communityId?: IntNullableFilter<"CommunityMember"> | number | null
    language?: StringNullableFilter<"CommunityMember"> | string | null
    dialect?: StringNullableFilter<"CommunityMember"> | string | null
    isActive?: BoolFilter<"CommunityMember"> | boolean
    consent?: BoolFilter<"CommunityMember"> | boolean
    createdAt?: DateTimeFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityMember"> | Date | string
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    community?: XOR<CommunityNullableRelationFilter, CommunityWhereInput> | null
    callAttempts?: CallAttemptListRelationFilter
  }

  export type CommunityMemberOrderByWithRelationInput = {
    id?: SortOrder
    fullName?: SortOrderInput | SortOrder
    phoneNumber?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    dialect?: SortOrderInput | SortOrder
    isActive?: SortOrder
    consent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    region?: RegionOrderByWithRelationInput
    community?: CommunityOrderByWithRelationInput
    callAttempts?: CallAttemptOrderByRelationAggregateInput
  }

  export type CommunityMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    OR?: CommunityMemberWhereInput[]
    NOT?: CommunityMemberWhereInput | CommunityMemberWhereInput[]
    fullName?: StringNullableFilter<"CommunityMember"> | string | null
    phoneNumber?: StringFilter<"CommunityMember"> | string
    regionId?: IntFilter<"CommunityMember"> | number
    communityId?: IntNullableFilter<"CommunityMember"> | number | null
    language?: StringNullableFilter<"CommunityMember"> | string | null
    dialect?: StringNullableFilter<"CommunityMember"> | string | null
    isActive?: BoolFilter<"CommunityMember"> | boolean
    consent?: BoolFilter<"CommunityMember"> | boolean
    createdAt?: DateTimeFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityMember"> | Date | string
    region?: XOR<RegionRelationFilter, RegionWhereInput>
    community?: XOR<CommunityNullableRelationFilter, CommunityWhereInput> | null
    callAttempts?: CallAttemptListRelationFilter
  }, "id">

  export type CommunityMemberOrderByWithAggregationInput = {
    id?: SortOrder
    fullName?: SortOrderInput | SortOrder
    phoneNumber?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    dialect?: SortOrderInput | SortOrder
    isActive?: SortOrder
    consent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CommunityMemberCountOrderByAggregateInput
    _avg?: CommunityMemberAvgOrderByAggregateInput
    _max?: CommunityMemberMaxOrderByAggregateInput
    _min?: CommunityMemberMinOrderByAggregateInput
    _sum?: CommunityMemberSumOrderByAggregateInput
  }

  export type CommunityMemberScalarWhereWithAggregatesInput = {
    AND?: CommunityMemberScalarWhereWithAggregatesInput | CommunityMemberScalarWhereWithAggregatesInput[]
    OR?: CommunityMemberScalarWhereWithAggregatesInput[]
    NOT?: CommunityMemberScalarWhereWithAggregatesInput | CommunityMemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CommunityMember"> | number
    fullName?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    phoneNumber?: StringWithAggregatesFilter<"CommunityMember"> | string
    regionId?: IntWithAggregatesFilter<"CommunityMember"> | number
    communityId?: IntNullableWithAggregatesFilter<"CommunityMember"> | number | null
    language?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    dialect?: StringNullableWithAggregatesFilter<"CommunityMember"> | string | null
    isActive?: BoolWithAggregatesFilter<"CommunityMember"> | boolean
    consent?: BoolWithAggregatesFilter<"CommunityMember"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CommunityMember"> | Date | string
  }

  export type CallAttemptWhereInput = {
    AND?: CallAttemptWhereInput | CallAttemptWhereInput[]
    OR?: CallAttemptWhereInput[]
    NOT?: CallAttemptWhereInput | CallAttemptWhereInput[]
    id?: IntFilter<"CallAttempt"> | number
    alertHistoryId?: IntFilter<"CallAttempt"> | number
    memberId?: IntNullableFilter<"CallAttempt"> | number | null
    phoneNumber?: StringFilter<"CallAttempt"> | string
    channel?: StringFilter<"CallAttempt"> | string
    status?: StringFilter<"CallAttempt"> | string
    provider?: StringNullableFilter<"CallAttempt"> | string | null
    providerCallId?: StringNullableFilter<"CallAttempt"> | string | null
    language?: StringNullableFilter<"CallAttempt"> | string | null
    dialect?: StringNullableFilter<"CallAttempt"> | string | null
    attemptCount?: IntFilter<"CallAttempt"> | number
    lastAttemptAt?: DateTimeNullableFilter<"CallAttempt"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallAttempt"> | Date | string | null
    failureReason?: StringNullableFilter<"CallAttempt"> | string | null
    createdAt?: DateTimeFilter<"CallAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"CallAttempt"> | Date | string
    alertHistory?: XOR<AlertHistoryRelationFilter, AlertHistoryWhereInput>
    member?: XOR<CommunityMemberNullableRelationFilter, CommunityMemberWhereInput> | null
  }

  export type CallAttemptOrderByWithRelationInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrderInput | SortOrder
    phoneNumber?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    provider?: SortOrderInput | SortOrder
    providerCallId?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    dialect?: SortOrderInput | SortOrder
    attemptCount?: SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    alertHistory?: AlertHistoryOrderByWithRelationInput
    member?: CommunityMemberOrderByWithRelationInput
  }

  export type CallAttemptWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: CallAttemptWhereInput | CallAttemptWhereInput[]
    OR?: CallAttemptWhereInput[]
    NOT?: CallAttemptWhereInput | CallAttemptWhereInput[]
    alertHistoryId?: IntFilter<"CallAttempt"> | number
    memberId?: IntNullableFilter<"CallAttempt"> | number | null
    phoneNumber?: StringFilter<"CallAttempt"> | string
    channel?: StringFilter<"CallAttempt"> | string
    status?: StringFilter<"CallAttempt"> | string
    provider?: StringNullableFilter<"CallAttempt"> | string | null
    providerCallId?: StringNullableFilter<"CallAttempt"> | string | null
    language?: StringNullableFilter<"CallAttempt"> | string | null
    dialect?: StringNullableFilter<"CallAttempt"> | string | null
    attemptCount?: IntFilter<"CallAttempt"> | number
    lastAttemptAt?: DateTimeNullableFilter<"CallAttempt"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallAttempt"> | Date | string | null
    failureReason?: StringNullableFilter<"CallAttempt"> | string | null
    createdAt?: DateTimeFilter<"CallAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"CallAttempt"> | Date | string
    alertHistory?: XOR<AlertHistoryRelationFilter, AlertHistoryWhereInput>
    member?: XOR<CommunityMemberNullableRelationFilter, CommunityMemberWhereInput> | null
  }, "id">

  export type CallAttemptOrderByWithAggregationInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrderInput | SortOrder
    phoneNumber?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    provider?: SortOrderInput | SortOrder
    providerCallId?: SortOrderInput | SortOrder
    language?: SortOrderInput | SortOrder
    dialect?: SortOrderInput | SortOrder
    attemptCount?: SortOrder
    lastAttemptAt?: SortOrderInput | SortOrder
    completedAt?: SortOrderInput | SortOrder
    failureReason?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CallAttemptCountOrderByAggregateInput
    _avg?: CallAttemptAvgOrderByAggregateInput
    _max?: CallAttemptMaxOrderByAggregateInput
    _min?: CallAttemptMinOrderByAggregateInput
    _sum?: CallAttemptSumOrderByAggregateInput
  }

  export type CallAttemptScalarWhereWithAggregatesInput = {
    AND?: CallAttemptScalarWhereWithAggregatesInput | CallAttemptScalarWhereWithAggregatesInput[]
    OR?: CallAttemptScalarWhereWithAggregatesInput[]
    NOT?: CallAttemptScalarWhereWithAggregatesInput | CallAttemptScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"CallAttempt"> | number
    alertHistoryId?: IntWithAggregatesFilter<"CallAttempt"> | number
    memberId?: IntNullableWithAggregatesFilter<"CallAttempt"> | number | null
    phoneNumber?: StringWithAggregatesFilter<"CallAttempt"> | string
    channel?: StringWithAggregatesFilter<"CallAttempt"> | string
    status?: StringWithAggregatesFilter<"CallAttempt"> | string
    provider?: StringNullableWithAggregatesFilter<"CallAttempt"> | string | null
    providerCallId?: StringNullableWithAggregatesFilter<"CallAttempt"> | string | null
    language?: StringNullableWithAggregatesFilter<"CallAttempt"> | string | null
    dialect?: StringNullableWithAggregatesFilter<"CallAttempt"> | string | null
    attemptCount?: IntWithAggregatesFilter<"CallAttempt"> | number
    lastAttemptAt?: DateTimeNullableWithAggregatesFilter<"CallAttempt"> | Date | string | null
    completedAt?: DateTimeNullableWithAggregatesFilter<"CallAttempt"> | Date | string | null
    failureReason?: StringNullableWithAggregatesFilter<"CallAttempt"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"CallAttempt"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"CallAttempt"> | Date | string
  }

  export type IvrConfigWhereInput = {
    AND?: IvrConfigWhereInput | IvrConfigWhereInput[]
    OR?: IvrConfigWhereInput[]
    NOT?: IvrConfigWhereInput | IvrConfigWhereInput[]
    id?: IntFilter<"IvrConfig"> | number
    provider?: StringFilter<"IvrConfig"> | string
    voicePhoneNumber?: StringNullableFilter<"IvrConfig"> | string | null
    defaultLanguage?: StringNullableFilter<"IvrConfig"> | string | null
    isActive?: BoolFilter<"IvrConfig"> | boolean
    createdAt?: DateTimeFilter<"IvrConfig"> | Date | string
    updatedAt?: DateTimeFilter<"IvrConfig"> | Date | string
  }

  export type IvrConfigOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    voicePhoneNumber?: SortOrderInput | SortOrder
    defaultLanguage?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IvrConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: IvrConfigWhereInput | IvrConfigWhereInput[]
    OR?: IvrConfigWhereInput[]
    NOT?: IvrConfigWhereInput | IvrConfigWhereInput[]
    provider?: StringFilter<"IvrConfig"> | string
    voicePhoneNumber?: StringNullableFilter<"IvrConfig"> | string | null
    defaultLanguage?: StringNullableFilter<"IvrConfig"> | string | null
    isActive?: BoolFilter<"IvrConfig"> | boolean
    createdAt?: DateTimeFilter<"IvrConfig"> | Date | string
    updatedAt?: DateTimeFilter<"IvrConfig"> | Date | string
  }, "id">

  export type IvrConfigOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    voicePhoneNumber?: SortOrderInput | SortOrder
    defaultLanguage?: SortOrderInput | SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IvrConfigCountOrderByAggregateInput
    _avg?: IvrConfigAvgOrderByAggregateInput
    _max?: IvrConfigMaxOrderByAggregateInput
    _min?: IvrConfigMinOrderByAggregateInput
    _sum?: IvrConfigSumOrderByAggregateInput
  }

  export type IvrConfigScalarWhereWithAggregatesInput = {
    AND?: IvrConfigScalarWhereWithAggregatesInput | IvrConfigScalarWhereWithAggregatesInput[]
    OR?: IvrConfigScalarWhereWithAggregatesInput[]
    NOT?: IvrConfigScalarWhereWithAggregatesInput | IvrConfigScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"IvrConfig"> | number
    provider?: StringWithAggregatesFilter<"IvrConfig"> | string
    voicePhoneNumber?: StringNullableWithAggregatesFilter<"IvrConfig"> | string | null
    defaultLanguage?: StringNullableWithAggregatesFilter<"IvrConfig"> | string | null
    isActive?: BoolWithAggregatesFilter<"IvrConfig"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"IvrConfig"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IvrConfig"> | Date | string
  }

  export type UserCreateInput = {
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.user_role
    lastLogin?: Date | string | null
    createdAt?: Date | string
    alerts?: AlertCreateNestedManyWithoutCreatedByUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.user_role
    lastLogin?: Date | string | null
    createdAt?: Date | string
    alerts?: AlertUncheckedCreateNestedManyWithoutCreatedByUserInput
  }

  export type UserUpdateInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: Enumuser_roleFieldUpdateOperationsInput | $Enums.user_role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUpdateManyWithoutCreatedByUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: Enumuser_roleFieldUpdateOperationsInput | $Enums.user_role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alerts?: AlertUncheckedUpdateManyWithoutCreatedByUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.user_role
    lastLogin?: Date | string | null
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: Enumuser_roleFieldUpdateOperationsInput | $Enums.user_role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: Enumuser_roleFieldUpdateOperationsInput | $Enums.user_role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RegionCreateInput = {
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityUncheckedCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUncheckedUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateManyInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
  }

  export type RegionUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type RegionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
  }

  export type HazardTypeCreateInput = {
    name: string
    alerts?: AlertCreateNestedManyWithoutHazardTypeInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutHazardTypeInput
  }

  export type HazardTypeUncheckedCreateInput = {
    id?: number
    name: string
    alerts?: AlertUncheckedCreateNestedManyWithoutHazardTypeInput
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutHazardTypeInput
  }

  export type HazardTypeUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    alerts?: AlertUpdateManyWithoutHazardTypeNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutHazardTypeNestedInput
  }

  export type HazardTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    alerts?: AlertUncheckedUpdateManyWithoutHazardTypeNestedInput
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutHazardTypeNestedInput
  }

  export type HazardTypeCreateManyInput = {
    id?: number
    name: string
  }

  export type HazardTypeUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type HazardTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CommunityCreateInput = {
    name: string
    totalRegistered?: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
    region: RegionCreateNestedOneWithoutCommunitiesInput
    members?: CommunityMemberCreateNestedManyWithoutCommunityInput
  }

  export type CommunityUncheckedCreateInput = {
    id?: number
    name: string
    totalRegistered?: number
    regionId: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
    members?: CommunityMemberUncheckedCreateNestedManyWithoutCommunityInput
  }

  export type CommunityUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutCommunitiesNestedInput
    members?: CommunityMemberUpdateManyWithoutCommunityNestedInput
  }

  export type CommunityUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: CommunityMemberUncheckedUpdateManyWithoutCommunityNestedInput
  }

  export type CommunityCreateManyInput = {
    id?: number
    name: string
    totalRegistered?: number
    regionId: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
  }

  export type CommunityUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateInput = {
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
    hazardType: HazardTypeCreateNestedOneWithoutAlertsInput
    createdByUser?: UserCreateNestedOneWithoutAlertsInput
    alertRegions?: AlertRegionCreateNestedManyWithoutAlertInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutAlertInput
  }

  export type AlertUncheckedCreateInput = {
    id?: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId?: number | null
    createdAt?: Date | string
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutAlertInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutAlertInput
  }

  export type AlertUpdateInput = {
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hazardType?: HazardTypeUpdateOneRequiredWithoutAlertsNestedInput
    createdByUser?: UserUpdateOneWithoutAlertsNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutAlertNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutAlertNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutAlertNestedInput
  }

  export type AlertCreateManyInput = {
    id?: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId?: number | null
    createdAt?: Date | string
  }

  export type AlertUpdateManyMutationInput = {
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRegionCreateInput = {
    alert: AlertCreateNestedOneWithoutAlertRegionsInput
    region: RegionCreateNestedOneWithoutAlertRegionsInput
  }

  export type AlertRegionUncheckedCreateInput = {
    alertId: number
    regionId: number
  }

  export type AlertRegionUpdateInput = {
    alert?: AlertUpdateOneRequiredWithoutAlertRegionsNestedInput
    region?: RegionUpdateOneRequiredWithoutAlertRegionsNestedInput
  }

  export type AlertRegionUncheckedUpdateInput = {
    alertId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
  }

  export type AlertRegionCreateManyInput = {
    alertId: number
    regionId: number
  }

  export type AlertRegionUpdateManyMutationInput = {

  }

  export type AlertRegionUncheckedUpdateManyInput = {
    alertId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
  }

  export type AlertHistoryCreateInput = {
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    alert: AlertCreateNestedOneWithoutAlertHistoryInput
    region: RegionCreateNestedOneWithoutAlertHistoryInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutAlertHistoryInput
    callAttempts?: CallAttemptCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryUncheckedCreateInput = {
    id?: number
    alertId: number
    regionId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutAlertHistoryInput
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryUpdateInput = {
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    alert?: AlertUpdateOneRequiredWithoutAlertHistoryNestedInput
    region?: RegionUpdateOneRequiredWithoutAlertHistoryNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryCreateManyInput = {
    id?: number
    alertId: number
    regionId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
  }

  export type AlertHistoryUpdateManyMutationInput = {
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AlertHistoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedbackLogCreateInput = {
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    alertHistory: AlertHistoryCreateNestedOneWithoutFeedbackLogsInput
    region: RegionCreateNestedOneWithoutFeedbackLogsInput
    hazardType: HazardTypeCreateNestedOneWithoutFeedbackLogsInput
  }

  export type FeedbackLogUncheckedCreateInput = {
    id?: number
    alertHistoryId: number
    regionId: number
    hazardTypeId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FeedbackLogUpdateInput = {
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertHistory?: AlertHistoryUpdateOneRequiredWithoutFeedbackLogsNestedInput
    region?: RegionUpdateOneRequiredWithoutFeedbackLogsNestedInput
    hazardType?: HazardTypeUpdateOneRequiredWithoutFeedbackLogsNestedInput
  }

  export type FeedbackLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLogCreateManyInput = {
    id?: number
    alertHistoryId: number
    regionId: number
    hazardTypeId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FeedbackLogUpdateManyMutationInput = {
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityMemberCreateInput = {
    fullName?: string | null
    phoneNumber: string
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    region: RegionCreateNestedOneWithoutCommunityMembersInput
    community?: CommunityCreateNestedOneWithoutMembersInput
    callAttempts?: CallAttemptCreateNestedManyWithoutMemberInput
  }

  export type CommunityMemberUncheckedCreateInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    regionId: number
    communityId?: number | null
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CommunityMemberUpdateInput = {
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutCommunityMembersNestedInput
    community?: CommunityUpdateOneWithoutMembersNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutMemberNestedInput
  }

  export type CommunityMemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    regionId?: IntFieldUpdateOperationsInput | number
    communityId?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CommunityMemberCreateManyInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    regionId: number
    communityId?: number | null
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunityMemberUpdateManyMutationInput = {
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityMemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    regionId?: IntFieldUpdateOperationsInput | number
    communityId?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptCreateInput = {
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alertHistory: AlertHistoryCreateNestedOneWithoutCallAttemptsInput
    member?: CommunityMemberCreateNestedOneWithoutCallAttemptsInput
  }

  export type CallAttemptUncheckedCreateInput = {
    id?: number
    alertHistoryId: number
    memberId?: number | null
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallAttemptUpdateInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertHistory?: AlertHistoryUpdateOneRequiredWithoutCallAttemptsNestedInput
    member?: CommunityMemberUpdateOneWithoutCallAttemptsNestedInput
  }

  export type CallAttemptUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    memberId?: NullableIntFieldUpdateOperationsInput | number | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptCreateManyInput = {
    id?: number
    alertHistoryId: number
    memberId?: number | null
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallAttemptUpdateManyMutationInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    memberId?: NullableIntFieldUpdateOperationsInput | number | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IvrConfigCreateInput = {
    provider?: string
    voicePhoneNumber?: string | null
    defaultLanguage?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IvrConfigUncheckedCreateInput = {
    id?: number
    provider?: string
    voicePhoneNumber?: string | null
    defaultLanguage?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IvrConfigUpdateInput = {
    provider?: StringFieldUpdateOperationsInput | string
    voicePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    defaultLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IvrConfigUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    voicePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    defaultLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IvrConfigCreateManyInput = {
    id?: number
    provider?: string
    voicePhoneNumber?: string | null
    defaultLanguage?: string | null
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IvrConfigUpdateManyMutationInput = {
    provider?: StringFieldUpdateOperationsInput | string
    voicePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    defaultLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IvrConfigUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    voicePhoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    defaultLanguage?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type Enumuser_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel>
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_roleFilter<$PrismaModel> | $Enums.user_role
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type AlertListRelationFilter = {
    every?: AlertWhereInput
    some?: AlertWhereInput
    none?: AlertWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type AlertOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    lastLogin?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type Enumuser_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel>
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_roleWithAggregatesFilter<$PrismaModel> | $Enums.user_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuser_roleFilter<$PrismaModel>
    _max?: NestedEnumuser_roleFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type CommunityListRelationFilter = {
    every?: CommunityWhereInput
    some?: CommunityWhereInput
    none?: CommunityWhereInput
  }

  export type AlertRegionListRelationFilter = {
    every?: AlertRegionWhereInput
    some?: AlertRegionWhereInput
    none?: AlertRegionWhereInput
  }

  export type AlertHistoryListRelationFilter = {
    every?: AlertHistoryWhereInput
    some?: AlertHistoryWhereInput
    none?: AlertHistoryWhereInput
  }

  export type FeedbackLogListRelationFilter = {
    every?: FeedbackLogWhereInput
    some?: FeedbackLogWhereInput
    none?: FeedbackLogWhereInput
  }

  export type CommunityMemberListRelationFilter = {
    every?: CommunityMemberWhereInput
    some?: CommunityMemberWhereInput
    none?: CommunityMemberWhereInput
  }

  export type CommunityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertRegionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertHistoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeedbackLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CommunityMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    id?: SortOrder
    latitude?: SortOrder
    longitude?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type HazardTypeCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type HazardTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type HazardTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type HazardTypeMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type HazardTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type RegionRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type CommunityCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
    registrationDate?: SortOrder
    source?: SortOrder
    status?: SortOrder
    actions?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityAvgOrderByAggregateInput = {
    id?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
  }

  export type CommunityMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
    registrationDate?: SortOrder
    source?: SortOrder
    status?: SortOrder
    actions?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunityMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
    registrationDate?: SortOrder
    source?: SortOrder
    status?: SortOrder
    actions?: SortOrder
    createdAt?: SortOrder
  }

  export type CommunitySumOrderByAggregateInput = {
    id?: SortOrder
    totalRegistered?: SortOrder
    regionId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type HazardTypeRelationFilter = {
    is?: HazardTypeWhereInput
    isNot?: HazardTypeWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type AlertCountOrderByAggregateInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    severityLevel?: SortOrder
    rawScientificDescription?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertAvgOrderByAggregateInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    createdByUserId?: SortOrder
  }

  export type AlertMaxOrderByAggregateInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    severityLevel?: SortOrder
    rawScientificDescription?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertMinOrderByAggregateInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    severityLevel?: SortOrder
    rawScientificDescription?: SortOrder
    createdByUserId?: SortOrder
    createdAt?: SortOrder
  }

  export type AlertSumOrderByAggregateInput = {
    id?: SortOrder
    hazardTypeId?: SortOrder
    createdByUserId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AlertRelationFilter = {
    is?: AlertWhereInput
    isNot?: AlertWhereInput
  }

  export type AlertRegionAlertIdRegionIdCompoundUniqueInput = {
    alertId: number
    regionId: number
  }

  export type AlertRegionCountOrderByAggregateInput = {
    alertId?: SortOrder
    regionId?: SortOrder
  }

  export type AlertRegionAvgOrderByAggregateInput = {
    alertId?: SortOrder
    regionId?: SortOrder
  }

  export type AlertRegionMaxOrderByAggregateInput = {
    alertId?: SortOrder
    regionId?: SortOrder
  }

  export type AlertRegionMinOrderByAggregateInput = {
    alertId?: SortOrder
    regionId?: SortOrder
  }

  export type AlertRegionSumOrderByAggregateInput = {
    alertId?: SortOrder
    regionId?: SortOrder
  }

  export type CallAttemptListRelationFilter = {
    every?: CallAttemptWhereInput
    some?: CallAttemptWhereInput
    none?: CallAttemptWhereInput
  }

  export type CallAttemptOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AlertHistoryCountOrderByAggregateInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    dialect?: SortOrder
    status?: SortOrder
    callsCount?: SortOrder
    dispatchedAt?: SortOrder
    simplifiedText?: SortOrder
    translatedText?: SortOrder
    audioUrl?: SortOrder
  }

  export type AlertHistoryAvgOrderByAggregateInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    callsCount?: SortOrder
  }

  export type AlertHistoryMaxOrderByAggregateInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    dialect?: SortOrder
    status?: SortOrder
    callsCount?: SortOrder
    dispatchedAt?: SortOrder
    simplifiedText?: SortOrder
    translatedText?: SortOrder
    audioUrl?: SortOrder
  }

  export type AlertHistoryMinOrderByAggregateInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    dialect?: SortOrder
    status?: SortOrder
    callsCount?: SortOrder
    dispatchedAt?: SortOrder
    simplifiedText?: SortOrder
    translatedText?: SortOrder
    audioUrl?: SortOrder
  }

  export type AlertHistorySumOrderByAggregateInput = {
    id?: SortOrder
    alertId?: SortOrder
    regionId?: SortOrder
    callsCount?: SortOrder
  }

  export type AlertHistoryRelationFilter = {
    is?: AlertHistoryWhereInput
    isNot?: AlertHistoryWhereInput
  }

  export type FeedbackLogCountOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
    audioFeedbackUrl?: SortOrder
    translationText?: SortOrder
    status?: SortOrder
    adminResponse?: SortOrder
    respondedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackLogAvgOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
  }

  export type FeedbackLogMaxOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
    audioFeedbackUrl?: SortOrder
    translationText?: SortOrder
    status?: SortOrder
    adminResponse?: SortOrder
    respondedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackLogMinOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
    audioFeedbackUrl?: SortOrder
    translationText?: SortOrder
    status?: SortOrder
    adminResponse?: SortOrder
    respondedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type FeedbackLogSumOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    regionId?: SortOrder
    hazardTypeId?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type CommunityNullableRelationFilter = {
    is?: CommunityWhereInput | null
    isNot?: CommunityWhereInput | null
  }

  export type CommunityMemberCountOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrder
    language?: SortOrder
    dialect?: SortOrder
    isActive?: SortOrder
    consent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommunityMemberAvgOrderByAggregateInput = {
    id?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrder
  }

  export type CommunityMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrder
    language?: SortOrder
    dialect?: SortOrder
    isActive?: SortOrder
    consent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommunityMemberMinOrderByAggregateInput = {
    id?: SortOrder
    fullName?: SortOrder
    phoneNumber?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrder
    language?: SortOrder
    dialect?: SortOrder
    isActive?: SortOrder
    consent?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CommunityMemberSumOrderByAggregateInput = {
    id?: SortOrder
    regionId?: SortOrder
    communityId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type CommunityMemberNullableRelationFilter = {
    is?: CommunityMemberWhereInput | null
    isNot?: CommunityMemberWhereInput | null
  }

  export type CallAttemptCountOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrder
    phoneNumber?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    providerCallId?: SortOrder
    language?: SortOrder
    dialect?: SortOrder
    attemptCount?: SortOrder
    lastAttemptAt?: SortOrder
    completedAt?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallAttemptAvgOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrder
    attemptCount?: SortOrder
  }

  export type CallAttemptMaxOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrder
    phoneNumber?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    providerCallId?: SortOrder
    language?: SortOrder
    dialect?: SortOrder
    attemptCount?: SortOrder
    lastAttemptAt?: SortOrder
    completedAt?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallAttemptMinOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrder
    phoneNumber?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    provider?: SortOrder
    providerCallId?: SortOrder
    language?: SortOrder
    dialect?: SortOrder
    attemptCount?: SortOrder
    lastAttemptAt?: SortOrder
    completedAt?: SortOrder
    failureReason?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CallAttemptSumOrderByAggregateInput = {
    id?: SortOrder
    alertHistoryId?: SortOrder
    memberId?: SortOrder
    attemptCount?: SortOrder
  }

  export type IvrConfigCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    voicePhoneNumber?: SortOrder
    defaultLanguage?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IvrConfigAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IvrConfigMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    voicePhoneNumber?: SortOrder
    defaultLanguage?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IvrConfigMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    voicePhoneNumber?: SortOrder
    defaultLanguage?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IvrConfigSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type AlertCreateNestedManyWithoutCreatedByUserInput = {
    create?: XOR<AlertCreateWithoutCreatedByUserInput, AlertUncheckedCreateWithoutCreatedByUserInput> | AlertCreateWithoutCreatedByUserInput[] | AlertUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCreatedByUserInput | AlertCreateOrConnectWithoutCreatedByUserInput[]
    createMany?: AlertCreateManyCreatedByUserInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutCreatedByUserInput = {
    create?: XOR<AlertCreateWithoutCreatedByUserInput, AlertUncheckedCreateWithoutCreatedByUserInput> | AlertCreateWithoutCreatedByUserInput[] | AlertUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCreatedByUserInput | AlertCreateOrConnectWithoutCreatedByUserInput[]
    createMany?: AlertCreateManyCreatedByUserInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type Enumuser_roleFieldUpdateOperationsInput = {
    set?: $Enums.user_role
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type AlertUpdateManyWithoutCreatedByUserNestedInput = {
    create?: XOR<AlertCreateWithoutCreatedByUserInput, AlertUncheckedCreateWithoutCreatedByUserInput> | AlertCreateWithoutCreatedByUserInput[] | AlertUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCreatedByUserInput | AlertCreateOrConnectWithoutCreatedByUserInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutCreatedByUserInput | AlertUpsertWithWhereUniqueWithoutCreatedByUserInput[]
    createMany?: AlertCreateManyCreatedByUserInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutCreatedByUserInput | AlertUpdateWithWhereUniqueWithoutCreatedByUserInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutCreatedByUserInput | AlertUpdateManyWithWhereWithoutCreatedByUserInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AlertUncheckedUpdateManyWithoutCreatedByUserNestedInput = {
    create?: XOR<AlertCreateWithoutCreatedByUserInput, AlertUncheckedCreateWithoutCreatedByUserInput> | AlertCreateWithoutCreatedByUserInput[] | AlertUncheckedCreateWithoutCreatedByUserInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutCreatedByUserInput | AlertCreateOrConnectWithoutCreatedByUserInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutCreatedByUserInput | AlertUpsertWithWhereUniqueWithoutCreatedByUserInput[]
    createMany?: AlertCreateManyCreatedByUserInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutCreatedByUserInput | AlertUpdateWithWhereUniqueWithoutCreatedByUserInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutCreatedByUserInput | AlertUpdateManyWithWhereWithoutCreatedByUserInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type CommunityCreateNestedManyWithoutRegionInput = {
    create?: XOR<CommunityCreateWithoutRegionInput, CommunityUncheckedCreateWithoutRegionInput> | CommunityCreateWithoutRegionInput[] | CommunityUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityCreateOrConnectWithoutRegionInput | CommunityCreateOrConnectWithoutRegionInput[]
    createMany?: CommunityCreateManyRegionInputEnvelope
    connect?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
  }

  export type AlertRegionCreateNestedManyWithoutRegionInput = {
    create?: XOR<AlertRegionCreateWithoutRegionInput, AlertRegionUncheckedCreateWithoutRegionInput> | AlertRegionCreateWithoutRegionInput[] | AlertRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutRegionInput | AlertRegionCreateOrConnectWithoutRegionInput[]
    createMany?: AlertRegionCreateManyRegionInputEnvelope
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
  }

  export type AlertHistoryCreateNestedManyWithoutRegionInput = {
    create?: XOR<AlertHistoryCreateWithoutRegionInput, AlertHistoryUncheckedCreateWithoutRegionInput> | AlertHistoryCreateWithoutRegionInput[] | AlertHistoryUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRegionInput | AlertHistoryCreateOrConnectWithoutRegionInput[]
    createMany?: AlertHistoryCreateManyRegionInputEnvelope
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
  }

  export type FeedbackLogCreateNestedManyWithoutRegionInput = {
    create?: XOR<FeedbackLogCreateWithoutRegionInput, FeedbackLogUncheckedCreateWithoutRegionInput> | FeedbackLogCreateWithoutRegionInput[] | FeedbackLogUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutRegionInput | FeedbackLogCreateOrConnectWithoutRegionInput[]
    createMany?: FeedbackLogCreateManyRegionInputEnvelope
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
  }

  export type CommunityMemberCreateNestedManyWithoutRegionInput = {
    create?: XOR<CommunityMemberCreateWithoutRegionInput, CommunityMemberUncheckedCreateWithoutRegionInput> | CommunityMemberCreateWithoutRegionInput[] | CommunityMemberUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutRegionInput | CommunityMemberCreateOrConnectWithoutRegionInput[]
    createMany?: CommunityMemberCreateManyRegionInputEnvelope
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
  }

  export type CommunityUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<CommunityCreateWithoutRegionInput, CommunityUncheckedCreateWithoutRegionInput> | CommunityCreateWithoutRegionInput[] | CommunityUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityCreateOrConnectWithoutRegionInput | CommunityCreateOrConnectWithoutRegionInput[]
    createMany?: CommunityCreateManyRegionInputEnvelope
    connect?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
  }

  export type AlertRegionUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<AlertRegionCreateWithoutRegionInput, AlertRegionUncheckedCreateWithoutRegionInput> | AlertRegionCreateWithoutRegionInput[] | AlertRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutRegionInput | AlertRegionCreateOrConnectWithoutRegionInput[]
    createMany?: AlertRegionCreateManyRegionInputEnvelope
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
  }

  export type AlertHistoryUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<AlertHistoryCreateWithoutRegionInput, AlertHistoryUncheckedCreateWithoutRegionInput> | AlertHistoryCreateWithoutRegionInput[] | AlertHistoryUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRegionInput | AlertHistoryCreateOrConnectWithoutRegionInput[]
    createMany?: AlertHistoryCreateManyRegionInputEnvelope
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
  }

  export type FeedbackLogUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<FeedbackLogCreateWithoutRegionInput, FeedbackLogUncheckedCreateWithoutRegionInput> | FeedbackLogCreateWithoutRegionInput[] | FeedbackLogUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutRegionInput | FeedbackLogCreateOrConnectWithoutRegionInput[]
    createMany?: FeedbackLogCreateManyRegionInputEnvelope
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
  }

  export type CommunityMemberUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<CommunityMemberCreateWithoutRegionInput, CommunityMemberUncheckedCreateWithoutRegionInput> | CommunityMemberCreateWithoutRegionInput[] | CommunityMemberUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutRegionInput | CommunityMemberCreateOrConnectWithoutRegionInput[]
    createMany?: CommunityMemberCreateManyRegionInputEnvelope
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CommunityUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CommunityCreateWithoutRegionInput, CommunityUncheckedCreateWithoutRegionInput> | CommunityCreateWithoutRegionInput[] | CommunityUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityCreateOrConnectWithoutRegionInput | CommunityCreateOrConnectWithoutRegionInput[]
    upsert?: CommunityUpsertWithWhereUniqueWithoutRegionInput | CommunityUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CommunityCreateManyRegionInputEnvelope
    set?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    disconnect?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    delete?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    connect?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    update?: CommunityUpdateWithWhereUniqueWithoutRegionInput | CommunityUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CommunityUpdateManyWithWhereWithoutRegionInput | CommunityUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CommunityScalarWhereInput | CommunityScalarWhereInput[]
  }

  export type AlertRegionUpdateManyWithoutRegionNestedInput = {
    create?: XOR<AlertRegionCreateWithoutRegionInput, AlertRegionUncheckedCreateWithoutRegionInput> | AlertRegionCreateWithoutRegionInput[] | AlertRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutRegionInput | AlertRegionCreateOrConnectWithoutRegionInput[]
    upsert?: AlertRegionUpsertWithWhereUniqueWithoutRegionInput | AlertRegionUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: AlertRegionCreateManyRegionInputEnvelope
    set?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    disconnect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    delete?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    update?: AlertRegionUpdateWithWhereUniqueWithoutRegionInput | AlertRegionUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: AlertRegionUpdateManyWithWhereWithoutRegionInput | AlertRegionUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: AlertRegionScalarWhereInput | AlertRegionScalarWhereInput[]
  }

  export type AlertHistoryUpdateManyWithoutRegionNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutRegionInput, AlertHistoryUncheckedCreateWithoutRegionInput> | AlertHistoryCreateWithoutRegionInput[] | AlertHistoryUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRegionInput | AlertHistoryCreateOrConnectWithoutRegionInput[]
    upsert?: AlertHistoryUpsertWithWhereUniqueWithoutRegionInput | AlertHistoryUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: AlertHistoryCreateManyRegionInputEnvelope
    set?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    disconnect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    delete?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    update?: AlertHistoryUpdateWithWhereUniqueWithoutRegionInput | AlertHistoryUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: AlertHistoryUpdateManyWithWhereWithoutRegionInput | AlertHistoryUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
  }

  export type FeedbackLogUpdateManyWithoutRegionNestedInput = {
    create?: XOR<FeedbackLogCreateWithoutRegionInput, FeedbackLogUncheckedCreateWithoutRegionInput> | FeedbackLogCreateWithoutRegionInput[] | FeedbackLogUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutRegionInput | FeedbackLogCreateOrConnectWithoutRegionInput[]
    upsert?: FeedbackLogUpsertWithWhereUniqueWithoutRegionInput | FeedbackLogUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: FeedbackLogCreateManyRegionInputEnvelope
    set?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    disconnect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    delete?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    update?: FeedbackLogUpdateWithWhereUniqueWithoutRegionInput | FeedbackLogUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: FeedbackLogUpdateManyWithWhereWithoutRegionInput | FeedbackLogUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
  }

  export type CommunityMemberUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CommunityMemberCreateWithoutRegionInput, CommunityMemberUncheckedCreateWithoutRegionInput> | CommunityMemberCreateWithoutRegionInput[] | CommunityMemberUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutRegionInput | CommunityMemberCreateOrConnectWithoutRegionInput[]
    upsert?: CommunityMemberUpsertWithWhereUniqueWithoutRegionInput | CommunityMemberUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CommunityMemberCreateManyRegionInputEnvelope
    set?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    disconnect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    delete?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    update?: CommunityMemberUpdateWithWhereUniqueWithoutRegionInput | CommunityMemberUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CommunityMemberUpdateManyWithWhereWithoutRegionInput | CommunityMemberUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CommunityMemberScalarWhereInput | CommunityMemberScalarWhereInput[]
  }

  export type CommunityUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CommunityCreateWithoutRegionInput, CommunityUncheckedCreateWithoutRegionInput> | CommunityCreateWithoutRegionInput[] | CommunityUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityCreateOrConnectWithoutRegionInput | CommunityCreateOrConnectWithoutRegionInput[]
    upsert?: CommunityUpsertWithWhereUniqueWithoutRegionInput | CommunityUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CommunityCreateManyRegionInputEnvelope
    set?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    disconnect?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    delete?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    connect?: CommunityWhereUniqueInput | CommunityWhereUniqueInput[]
    update?: CommunityUpdateWithWhereUniqueWithoutRegionInput | CommunityUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CommunityUpdateManyWithWhereWithoutRegionInput | CommunityUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CommunityScalarWhereInput | CommunityScalarWhereInput[]
  }

  export type AlertRegionUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<AlertRegionCreateWithoutRegionInput, AlertRegionUncheckedCreateWithoutRegionInput> | AlertRegionCreateWithoutRegionInput[] | AlertRegionUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutRegionInput | AlertRegionCreateOrConnectWithoutRegionInput[]
    upsert?: AlertRegionUpsertWithWhereUniqueWithoutRegionInput | AlertRegionUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: AlertRegionCreateManyRegionInputEnvelope
    set?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    disconnect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    delete?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    update?: AlertRegionUpdateWithWhereUniqueWithoutRegionInput | AlertRegionUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: AlertRegionUpdateManyWithWhereWithoutRegionInput | AlertRegionUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: AlertRegionScalarWhereInput | AlertRegionScalarWhereInput[]
  }

  export type AlertHistoryUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutRegionInput, AlertHistoryUncheckedCreateWithoutRegionInput> | AlertHistoryCreateWithoutRegionInput[] | AlertHistoryUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutRegionInput | AlertHistoryCreateOrConnectWithoutRegionInput[]
    upsert?: AlertHistoryUpsertWithWhereUniqueWithoutRegionInput | AlertHistoryUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: AlertHistoryCreateManyRegionInputEnvelope
    set?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    disconnect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    delete?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    update?: AlertHistoryUpdateWithWhereUniqueWithoutRegionInput | AlertHistoryUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: AlertHistoryUpdateManyWithWhereWithoutRegionInput | AlertHistoryUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
  }

  export type FeedbackLogUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<FeedbackLogCreateWithoutRegionInput, FeedbackLogUncheckedCreateWithoutRegionInput> | FeedbackLogCreateWithoutRegionInput[] | FeedbackLogUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutRegionInput | FeedbackLogCreateOrConnectWithoutRegionInput[]
    upsert?: FeedbackLogUpsertWithWhereUniqueWithoutRegionInput | FeedbackLogUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: FeedbackLogCreateManyRegionInputEnvelope
    set?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    disconnect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    delete?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    update?: FeedbackLogUpdateWithWhereUniqueWithoutRegionInput | FeedbackLogUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: FeedbackLogUpdateManyWithWhereWithoutRegionInput | FeedbackLogUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
  }

  export type CommunityMemberUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CommunityMemberCreateWithoutRegionInput, CommunityMemberUncheckedCreateWithoutRegionInput> | CommunityMemberCreateWithoutRegionInput[] | CommunityMemberUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutRegionInput | CommunityMemberCreateOrConnectWithoutRegionInput[]
    upsert?: CommunityMemberUpsertWithWhereUniqueWithoutRegionInput | CommunityMemberUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CommunityMemberCreateManyRegionInputEnvelope
    set?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    disconnect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    delete?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    update?: CommunityMemberUpdateWithWhereUniqueWithoutRegionInput | CommunityMemberUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CommunityMemberUpdateManyWithWhereWithoutRegionInput | CommunityMemberUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CommunityMemberScalarWhereInput | CommunityMemberScalarWhereInput[]
  }

  export type AlertCreateNestedManyWithoutHazardTypeInput = {
    create?: XOR<AlertCreateWithoutHazardTypeInput, AlertUncheckedCreateWithoutHazardTypeInput> | AlertCreateWithoutHazardTypeInput[] | AlertUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutHazardTypeInput | AlertCreateOrConnectWithoutHazardTypeInput[]
    createMany?: AlertCreateManyHazardTypeInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type FeedbackLogCreateNestedManyWithoutHazardTypeInput = {
    create?: XOR<FeedbackLogCreateWithoutHazardTypeInput, FeedbackLogUncheckedCreateWithoutHazardTypeInput> | FeedbackLogCreateWithoutHazardTypeInput[] | FeedbackLogUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutHazardTypeInput | FeedbackLogCreateOrConnectWithoutHazardTypeInput[]
    createMany?: FeedbackLogCreateManyHazardTypeInputEnvelope
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
  }

  export type AlertUncheckedCreateNestedManyWithoutHazardTypeInput = {
    create?: XOR<AlertCreateWithoutHazardTypeInput, AlertUncheckedCreateWithoutHazardTypeInput> | AlertCreateWithoutHazardTypeInput[] | AlertUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutHazardTypeInput | AlertCreateOrConnectWithoutHazardTypeInput[]
    createMany?: AlertCreateManyHazardTypeInputEnvelope
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
  }

  export type FeedbackLogUncheckedCreateNestedManyWithoutHazardTypeInput = {
    create?: XOR<FeedbackLogCreateWithoutHazardTypeInput, FeedbackLogUncheckedCreateWithoutHazardTypeInput> | FeedbackLogCreateWithoutHazardTypeInput[] | FeedbackLogUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutHazardTypeInput | FeedbackLogCreateOrConnectWithoutHazardTypeInput[]
    createMany?: FeedbackLogCreateManyHazardTypeInputEnvelope
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
  }

  export type AlertUpdateManyWithoutHazardTypeNestedInput = {
    create?: XOR<AlertCreateWithoutHazardTypeInput, AlertUncheckedCreateWithoutHazardTypeInput> | AlertCreateWithoutHazardTypeInput[] | AlertUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutHazardTypeInput | AlertCreateOrConnectWithoutHazardTypeInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutHazardTypeInput | AlertUpsertWithWhereUniqueWithoutHazardTypeInput[]
    createMany?: AlertCreateManyHazardTypeInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutHazardTypeInput | AlertUpdateWithWhereUniqueWithoutHazardTypeInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutHazardTypeInput | AlertUpdateManyWithWhereWithoutHazardTypeInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type FeedbackLogUpdateManyWithoutHazardTypeNestedInput = {
    create?: XOR<FeedbackLogCreateWithoutHazardTypeInput, FeedbackLogUncheckedCreateWithoutHazardTypeInput> | FeedbackLogCreateWithoutHazardTypeInput[] | FeedbackLogUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutHazardTypeInput | FeedbackLogCreateOrConnectWithoutHazardTypeInput[]
    upsert?: FeedbackLogUpsertWithWhereUniqueWithoutHazardTypeInput | FeedbackLogUpsertWithWhereUniqueWithoutHazardTypeInput[]
    createMany?: FeedbackLogCreateManyHazardTypeInputEnvelope
    set?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    disconnect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    delete?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    update?: FeedbackLogUpdateWithWhereUniqueWithoutHazardTypeInput | FeedbackLogUpdateWithWhereUniqueWithoutHazardTypeInput[]
    updateMany?: FeedbackLogUpdateManyWithWhereWithoutHazardTypeInput | FeedbackLogUpdateManyWithWhereWithoutHazardTypeInput[]
    deleteMany?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
  }

  export type AlertUncheckedUpdateManyWithoutHazardTypeNestedInput = {
    create?: XOR<AlertCreateWithoutHazardTypeInput, AlertUncheckedCreateWithoutHazardTypeInput> | AlertCreateWithoutHazardTypeInput[] | AlertUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: AlertCreateOrConnectWithoutHazardTypeInput | AlertCreateOrConnectWithoutHazardTypeInput[]
    upsert?: AlertUpsertWithWhereUniqueWithoutHazardTypeInput | AlertUpsertWithWhereUniqueWithoutHazardTypeInput[]
    createMany?: AlertCreateManyHazardTypeInputEnvelope
    set?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    disconnect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    delete?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    connect?: AlertWhereUniqueInput | AlertWhereUniqueInput[]
    update?: AlertUpdateWithWhereUniqueWithoutHazardTypeInput | AlertUpdateWithWhereUniqueWithoutHazardTypeInput[]
    updateMany?: AlertUpdateManyWithWhereWithoutHazardTypeInput | AlertUpdateManyWithWhereWithoutHazardTypeInput[]
    deleteMany?: AlertScalarWhereInput | AlertScalarWhereInput[]
  }

  export type FeedbackLogUncheckedUpdateManyWithoutHazardTypeNestedInput = {
    create?: XOR<FeedbackLogCreateWithoutHazardTypeInput, FeedbackLogUncheckedCreateWithoutHazardTypeInput> | FeedbackLogCreateWithoutHazardTypeInput[] | FeedbackLogUncheckedCreateWithoutHazardTypeInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutHazardTypeInput | FeedbackLogCreateOrConnectWithoutHazardTypeInput[]
    upsert?: FeedbackLogUpsertWithWhereUniqueWithoutHazardTypeInput | FeedbackLogUpsertWithWhereUniqueWithoutHazardTypeInput[]
    createMany?: FeedbackLogCreateManyHazardTypeInputEnvelope
    set?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    disconnect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    delete?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    update?: FeedbackLogUpdateWithWhereUniqueWithoutHazardTypeInput | FeedbackLogUpdateWithWhereUniqueWithoutHazardTypeInput[]
    updateMany?: FeedbackLogUpdateManyWithWhereWithoutHazardTypeInput | FeedbackLogUpdateManyWithWhereWithoutHazardTypeInput[]
    deleteMany?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
  }

  export type RegionCreateNestedOneWithoutCommunitiesInput = {
    create?: XOR<RegionCreateWithoutCommunitiesInput, RegionUncheckedCreateWithoutCommunitiesInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCommunitiesInput
    connect?: RegionWhereUniqueInput
  }

  export type CommunityMemberCreateNestedManyWithoutCommunityInput = {
    create?: XOR<CommunityMemberCreateWithoutCommunityInput, CommunityMemberUncheckedCreateWithoutCommunityInput> | CommunityMemberCreateWithoutCommunityInput[] | CommunityMemberUncheckedCreateWithoutCommunityInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutCommunityInput | CommunityMemberCreateOrConnectWithoutCommunityInput[]
    createMany?: CommunityMemberCreateManyCommunityInputEnvelope
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
  }

  export type CommunityMemberUncheckedCreateNestedManyWithoutCommunityInput = {
    create?: XOR<CommunityMemberCreateWithoutCommunityInput, CommunityMemberUncheckedCreateWithoutCommunityInput> | CommunityMemberCreateWithoutCommunityInput[] | CommunityMemberUncheckedCreateWithoutCommunityInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutCommunityInput | CommunityMemberCreateOrConnectWithoutCommunityInput[]
    createMany?: CommunityMemberCreateManyCommunityInputEnvelope
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type RegionUpdateOneRequiredWithoutCommunitiesNestedInput = {
    create?: XOR<RegionCreateWithoutCommunitiesInput, RegionUncheckedCreateWithoutCommunitiesInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCommunitiesInput
    upsert?: RegionUpsertWithoutCommunitiesInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutCommunitiesInput, RegionUpdateWithoutCommunitiesInput>, RegionUncheckedUpdateWithoutCommunitiesInput>
  }

  export type CommunityMemberUpdateManyWithoutCommunityNestedInput = {
    create?: XOR<CommunityMemberCreateWithoutCommunityInput, CommunityMemberUncheckedCreateWithoutCommunityInput> | CommunityMemberCreateWithoutCommunityInput[] | CommunityMemberUncheckedCreateWithoutCommunityInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutCommunityInput | CommunityMemberCreateOrConnectWithoutCommunityInput[]
    upsert?: CommunityMemberUpsertWithWhereUniqueWithoutCommunityInput | CommunityMemberUpsertWithWhereUniqueWithoutCommunityInput[]
    createMany?: CommunityMemberCreateManyCommunityInputEnvelope
    set?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    disconnect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    delete?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    update?: CommunityMemberUpdateWithWhereUniqueWithoutCommunityInput | CommunityMemberUpdateWithWhereUniqueWithoutCommunityInput[]
    updateMany?: CommunityMemberUpdateManyWithWhereWithoutCommunityInput | CommunityMemberUpdateManyWithWhereWithoutCommunityInput[]
    deleteMany?: CommunityMemberScalarWhereInput | CommunityMemberScalarWhereInput[]
  }

  export type CommunityMemberUncheckedUpdateManyWithoutCommunityNestedInput = {
    create?: XOR<CommunityMemberCreateWithoutCommunityInput, CommunityMemberUncheckedCreateWithoutCommunityInput> | CommunityMemberCreateWithoutCommunityInput[] | CommunityMemberUncheckedCreateWithoutCommunityInput[]
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutCommunityInput | CommunityMemberCreateOrConnectWithoutCommunityInput[]
    upsert?: CommunityMemberUpsertWithWhereUniqueWithoutCommunityInput | CommunityMemberUpsertWithWhereUniqueWithoutCommunityInput[]
    createMany?: CommunityMemberCreateManyCommunityInputEnvelope
    set?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    disconnect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    delete?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    connect?: CommunityMemberWhereUniqueInput | CommunityMemberWhereUniqueInput[]
    update?: CommunityMemberUpdateWithWhereUniqueWithoutCommunityInput | CommunityMemberUpdateWithWhereUniqueWithoutCommunityInput[]
    updateMany?: CommunityMemberUpdateManyWithWhereWithoutCommunityInput | CommunityMemberUpdateManyWithWhereWithoutCommunityInput[]
    deleteMany?: CommunityMemberScalarWhereInput | CommunityMemberScalarWhereInput[]
  }

  export type HazardTypeCreateNestedOneWithoutAlertsInput = {
    create?: XOR<HazardTypeCreateWithoutAlertsInput, HazardTypeUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: HazardTypeCreateOrConnectWithoutAlertsInput
    connect?: HazardTypeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAlertsInput = {
    create?: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlertsInput
    connect?: UserWhereUniqueInput
  }

  export type AlertRegionCreateNestedManyWithoutAlertInput = {
    create?: XOR<AlertRegionCreateWithoutAlertInput, AlertRegionUncheckedCreateWithoutAlertInput> | AlertRegionCreateWithoutAlertInput[] | AlertRegionUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutAlertInput | AlertRegionCreateOrConnectWithoutAlertInput[]
    createMany?: AlertRegionCreateManyAlertInputEnvelope
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
  }

  export type AlertHistoryCreateNestedManyWithoutAlertInput = {
    create?: XOR<AlertHistoryCreateWithoutAlertInput, AlertHistoryUncheckedCreateWithoutAlertInput> | AlertHistoryCreateWithoutAlertInput[] | AlertHistoryUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutAlertInput | AlertHistoryCreateOrConnectWithoutAlertInput[]
    createMany?: AlertHistoryCreateManyAlertInputEnvelope
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
  }

  export type AlertRegionUncheckedCreateNestedManyWithoutAlertInput = {
    create?: XOR<AlertRegionCreateWithoutAlertInput, AlertRegionUncheckedCreateWithoutAlertInput> | AlertRegionCreateWithoutAlertInput[] | AlertRegionUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutAlertInput | AlertRegionCreateOrConnectWithoutAlertInput[]
    createMany?: AlertRegionCreateManyAlertInputEnvelope
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
  }

  export type AlertHistoryUncheckedCreateNestedManyWithoutAlertInput = {
    create?: XOR<AlertHistoryCreateWithoutAlertInput, AlertHistoryUncheckedCreateWithoutAlertInput> | AlertHistoryCreateWithoutAlertInput[] | AlertHistoryUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutAlertInput | AlertHistoryCreateOrConnectWithoutAlertInput[]
    createMany?: AlertHistoryCreateManyAlertInputEnvelope
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
  }

  export type HazardTypeUpdateOneRequiredWithoutAlertsNestedInput = {
    create?: XOR<HazardTypeCreateWithoutAlertsInput, HazardTypeUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: HazardTypeCreateOrConnectWithoutAlertsInput
    upsert?: HazardTypeUpsertWithoutAlertsInput
    connect?: HazardTypeWhereUniqueInput
    update?: XOR<XOR<HazardTypeUpdateToOneWithWhereWithoutAlertsInput, HazardTypeUpdateWithoutAlertsInput>, HazardTypeUncheckedUpdateWithoutAlertsInput>
  }

  export type UserUpdateOneWithoutAlertsNestedInput = {
    create?: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAlertsInput
    upsert?: UserUpsertWithoutAlertsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAlertsInput, UserUpdateWithoutAlertsInput>, UserUncheckedUpdateWithoutAlertsInput>
  }

  export type AlertRegionUpdateManyWithoutAlertNestedInput = {
    create?: XOR<AlertRegionCreateWithoutAlertInput, AlertRegionUncheckedCreateWithoutAlertInput> | AlertRegionCreateWithoutAlertInput[] | AlertRegionUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutAlertInput | AlertRegionCreateOrConnectWithoutAlertInput[]
    upsert?: AlertRegionUpsertWithWhereUniqueWithoutAlertInput | AlertRegionUpsertWithWhereUniqueWithoutAlertInput[]
    createMany?: AlertRegionCreateManyAlertInputEnvelope
    set?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    disconnect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    delete?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    update?: AlertRegionUpdateWithWhereUniqueWithoutAlertInput | AlertRegionUpdateWithWhereUniqueWithoutAlertInput[]
    updateMany?: AlertRegionUpdateManyWithWhereWithoutAlertInput | AlertRegionUpdateManyWithWhereWithoutAlertInput[]
    deleteMany?: AlertRegionScalarWhereInput | AlertRegionScalarWhereInput[]
  }

  export type AlertHistoryUpdateManyWithoutAlertNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutAlertInput, AlertHistoryUncheckedCreateWithoutAlertInput> | AlertHistoryCreateWithoutAlertInput[] | AlertHistoryUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutAlertInput | AlertHistoryCreateOrConnectWithoutAlertInput[]
    upsert?: AlertHistoryUpsertWithWhereUniqueWithoutAlertInput | AlertHistoryUpsertWithWhereUniqueWithoutAlertInput[]
    createMany?: AlertHistoryCreateManyAlertInputEnvelope
    set?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    disconnect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    delete?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    update?: AlertHistoryUpdateWithWhereUniqueWithoutAlertInput | AlertHistoryUpdateWithWhereUniqueWithoutAlertInput[]
    updateMany?: AlertHistoryUpdateManyWithWhereWithoutAlertInput | AlertHistoryUpdateManyWithWhereWithoutAlertInput[]
    deleteMany?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AlertRegionUncheckedUpdateManyWithoutAlertNestedInput = {
    create?: XOR<AlertRegionCreateWithoutAlertInput, AlertRegionUncheckedCreateWithoutAlertInput> | AlertRegionCreateWithoutAlertInput[] | AlertRegionUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertRegionCreateOrConnectWithoutAlertInput | AlertRegionCreateOrConnectWithoutAlertInput[]
    upsert?: AlertRegionUpsertWithWhereUniqueWithoutAlertInput | AlertRegionUpsertWithWhereUniqueWithoutAlertInput[]
    createMany?: AlertRegionCreateManyAlertInputEnvelope
    set?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    disconnect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    delete?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    connect?: AlertRegionWhereUniqueInput | AlertRegionWhereUniqueInput[]
    update?: AlertRegionUpdateWithWhereUniqueWithoutAlertInput | AlertRegionUpdateWithWhereUniqueWithoutAlertInput[]
    updateMany?: AlertRegionUpdateManyWithWhereWithoutAlertInput | AlertRegionUpdateManyWithWhereWithoutAlertInput[]
    deleteMany?: AlertRegionScalarWhereInput | AlertRegionScalarWhereInput[]
  }

  export type AlertHistoryUncheckedUpdateManyWithoutAlertNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutAlertInput, AlertHistoryUncheckedCreateWithoutAlertInput> | AlertHistoryCreateWithoutAlertInput[] | AlertHistoryUncheckedCreateWithoutAlertInput[]
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutAlertInput | AlertHistoryCreateOrConnectWithoutAlertInput[]
    upsert?: AlertHistoryUpsertWithWhereUniqueWithoutAlertInput | AlertHistoryUpsertWithWhereUniqueWithoutAlertInput[]
    createMany?: AlertHistoryCreateManyAlertInputEnvelope
    set?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    disconnect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    delete?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    connect?: AlertHistoryWhereUniqueInput | AlertHistoryWhereUniqueInput[]
    update?: AlertHistoryUpdateWithWhereUniqueWithoutAlertInput | AlertHistoryUpdateWithWhereUniqueWithoutAlertInput[]
    updateMany?: AlertHistoryUpdateManyWithWhereWithoutAlertInput | AlertHistoryUpdateManyWithWhereWithoutAlertInput[]
    deleteMany?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
  }

  export type AlertCreateNestedOneWithoutAlertRegionsInput = {
    create?: XOR<AlertCreateWithoutAlertRegionsInput, AlertUncheckedCreateWithoutAlertRegionsInput>
    connectOrCreate?: AlertCreateOrConnectWithoutAlertRegionsInput
    connect?: AlertWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutAlertRegionsInput = {
    create?: XOR<RegionCreateWithoutAlertRegionsInput, RegionUncheckedCreateWithoutAlertRegionsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutAlertRegionsInput
    connect?: RegionWhereUniqueInput
  }

  export type AlertUpdateOneRequiredWithoutAlertRegionsNestedInput = {
    create?: XOR<AlertCreateWithoutAlertRegionsInput, AlertUncheckedCreateWithoutAlertRegionsInput>
    connectOrCreate?: AlertCreateOrConnectWithoutAlertRegionsInput
    upsert?: AlertUpsertWithoutAlertRegionsInput
    connect?: AlertWhereUniqueInput
    update?: XOR<XOR<AlertUpdateToOneWithWhereWithoutAlertRegionsInput, AlertUpdateWithoutAlertRegionsInput>, AlertUncheckedUpdateWithoutAlertRegionsInput>
  }

  export type RegionUpdateOneRequiredWithoutAlertRegionsNestedInput = {
    create?: XOR<RegionCreateWithoutAlertRegionsInput, RegionUncheckedCreateWithoutAlertRegionsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutAlertRegionsInput
    upsert?: RegionUpsertWithoutAlertRegionsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutAlertRegionsInput, RegionUpdateWithoutAlertRegionsInput>, RegionUncheckedUpdateWithoutAlertRegionsInput>
  }

  export type AlertCreateNestedOneWithoutAlertHistoryInput = {
    create?: XOR<AlertCreateWithoutAlertHistoryInput, AlertUncheckedCreateWithoutAlertHistoryInput>
    connectOrCreate?: AlertCreateOrConnectWithoutAlertHistoryInput
    connect?: AlertWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutAlertHistoryInput = {
    create?: XOR<RegionCreateWithoutAlertHistoryInput, RegionUncheckedCreateWithoutAlertHistoryInput>
    connectOrCreate?: RegionCreateOrConnectWithoutAlertHistoryInput
    connect?: RegionWhereUniqueInput
  }

  export type FeedbackLogCreateNestedManyWithoutAlertHistoryInput = {
    create?: XOR<FeedbackLogCreateWithoutAlertHistoryInput, FeedbackLogUncheckedCreateWithoutAlertHistoryInput> | FeedbackLogCreateWithoutAlertHistoryInput[] | FeedbackLogUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutAlertHistoryInput | FeedbackLogCreateOrConnectWithoutAlertHistoryInput[]
    createMany?: FeedbackLogCreateManyAlertHistoryInputEnvelope
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
  }

  export type CallAttemptCreateNestedManyWithoutAlertHistoryInput = {
    create?: XOR<CallAttemptCreateWithoutAlertHistoryInput, CallAttemptUncheckedCreateWithoutAlertHistoryInput> | CallAttemptCreateWithoutAlertHistoryInput[] | CallAttemptUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutAlertHistoryInput | CallAttemptCreateOrConnectWithoutAlertHistoryInput[]
    createMany?: CallAttemptCreateManyAlertHistoryInputEnvelope
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
  }

  export type FeedbackLogUncheckedCreateNestedManyWithoutAlertHistoryInput = {
    create?: XOR<FeedbackLogCreateWithoutAlertHistoryInput, FeedbackLogUncheckedCreateWithoutAlertHistoryInput> | FeedbackLogCreateWithoutAlertHistoryInput[] | FeedbackLogUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutAlertHistoryInput | FeedbackLogCreateOrConnectWithoutAlertHistoryInput[]
    createMany?: FeedbackLogCreateManyAlertHistoryInputEnvelope
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
  }

  export type CallAttemptUncheckedCreateNestedManyWithoutAlertHistoryInput = {
    create?: XOR<CallAttemptCreateWithoutAlertHistoryInput, CallAttemptUncheckedCreateWithoutAlertHistoryInput> | CallAttemptCreateWithoutAlertHistoryInput[] | CallAttemptUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutAlertHistoryInput | CallAttemptCreateOrConnectWithoutAlertHistoryInput[]
    createMany?: CallAttemptCreateManyAlertHistoryInputEnvelope
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
  }

  export type AlertUpdateOneRequiredWithoutAlertHistoryNestedInput = {
    create?: XOR<AlertCreateWithoutAlertHistoryInput, AlertUncheckedCreateWithoutAlertHistoryInput>
    connectOrCreate?: AlertCreateOrConnectWithoutAlertHistoryInput
    upsert?: AlertUpsertWithoutAlertHistoryInput
    connect?: AlertWhereUniqueInput
    update?: XOR<XOR<AlertUpdateToOneWithWhereWithoutAlertHistoryInput, AlertUpdateWithoutAlertHistoryInput>, AlertUncheckedUpdateWithoutAlertHistoryInput>
  }

  export type RegionUpdateOneRequiredWithoutAlertHistoryNestedInput = {
    create?: XOR<RegionCreateWithoutAlertHistoryInput, RegionUncheckedCreateWithoutAlertHistoryInput>
    connectOrCreate?: RegionCreateOrConnectWithoutAlertHistoryInput
    upsert?: RegionUpsertWithoutAlertHistoryInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutAlertHistoryInput, RegionUpdateWithoutAlertHistoryInput>, RegionUncheckedUpdateWithoutAlertHistoryInput>
  }

  export type FeedbackLogUpdateManyWithoutAlertHistoryNestedInput = {
    create?: XOR<FeedbackLogCreateWithoutAlertHistoryInput, FeedbackLogUncheckedCreateWithoutAlertHistoryInput> | FeedbackLogCreateWithoutAlertHistoryInput[] | FeedbackLogUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutAlertHistoryInput | FeedbackLogCreateOrConnectWithoutAlertHistoryInput[]
    upsert?: FeedbackLogUpsertWithWhereUniqueWithoutAlertHistoryInput | FeedbackLogUpsertWithWhereUniqueWithoutAlertHistoryInput[]
    createMany?: FeedbackLogCreateManyAlertHistoryInputEnvelope
    set?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    disconnect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    delete?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    update?: FeedbackLogUpdateWithWhereUniqueWithoutAlertHistoryInput | FeedbackLogUpdateWithWhereUniqueWithoutAlertHistoryInput[]
    updateMany?: FeedbackLogUpdateManyWithWhereWithoutAlertHistoryInput | FeedbackLogUpdateManyWithWhereWithoutAlertHistoryInput[]
    deleteMany?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
  }

  export type CallAttemptUpdateManyWithoutAlertHistoryNestedInput = {
    create?: XOR<CallAttemptCreateWithoutAlertHistoryInput, CallAttemptUncheckedCreateWithoutAlertHistoryInput> | CallAttemptCreateWithoutAlertHistoryInput[] | CallAttemptUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutAlertHistoryInput | CallAttemptCreateOrConnectWithoutAlertHistoryInput[]
    upsert?: CallAttemptUpsertWithWhereUniqueWithoutAlertHistoryInput | CallAttemptUpsertWithWhereUniqueWithoutAlertHistoryInput[]
    createMany?: CallAttemptCreateManyAlertHistoryInputEnvelope
    set?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    disconnect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    delete?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    update?: CallAttemptUpdateWithWhereUniqueWithoutAlertHistoryInput | CallAttemptUpdateWithWhereUniqueWithoutAlertHistoryInput[]
    updateMany?: CallAttemptUpdateManyWithWhereWithoutAlertHistoryInput | CallAttemptUpdateManyWithWhereWithoutAlertHistoryInput[]
    deleteMany?: CallAttemptScalarWhereInput | CallAttemptScalarWhereInput[]
  }

  export type FeedbackLogUncheckedUpdateManyWithoutAlertHistoryNestedInput = {
    create?: XOR<FeedbackLogCreateWithoutAlertHistoryInput, FeedbackLogUncheckedCreateWithoutAlertHistoryInput> | FeedbackLogCreateWithoutAlertHistoryInput[] | FeedbackLogUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: FeedbackLogCreateOrConnectWithoutAlertHistoryInput | FeedbackLogCreateOrConnectWithoutAlertHistoryInput[]
    upsert?: FeedbackLogUpsertWithWhereUniqueWithoutAlertHistoryInput | FeedbackLogUpsertWithWhereUniqueWithoutAlertHistoryInput[]
    createMany?: FeedbackLogCreateManyAlertHistoryInputEnvelope
    set?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    disconnect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    delete?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    connect?: FeedbackLogWhereUniqueInput | FeedbackLogWhereUniqueInput[]
    update?: FeedbackLogUpdateWithWhereUniqueWithoutAlertHistoryInput | FeedbackLogUpdateWithWhereUniqueWithoutAlertHistoryInput[]
    updateMany?: FeedbackLogUpdateManyWithWhereWithoutAlertHistoryInput | FeedbackLogUpdateManyWithWhereWithoutAlertHistoryInput[]
    deleteMany?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
  }

  export type CallAttemptUncheckedUpdateManyWithoutAlertHistoryNestedInput = {
    create?: XOR<CallAttemptCreateWithoutAlertHistoryInput, CallAttemptUncheckedCreateWithoutAlertHistoryInput> | CallAttemptCreateWithoutAlertHistoryInput[] | CallAttemptUncheckedCreateWithoutAlertHistoryInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutAlertHistoryInput | CallAttemptCreateOrConnectWithoutAlertHistoryInput[]
    upsert?: CallAttemptUpsertWithWhereUniqueWithoutAlertHistoryInput | CallAttemptUpsertWithWhereUniqueWithoutAlertHistoryInput[]
    createMany?: CallAttemptCreateManyAlertHistoryInputEnvelope
    set?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    disconnect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    delete?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    update?: CallAttemptUpdateWithWhereUniqueWithoutAlertHistoryInput | CallAttemptUpdateWithWhereUniqueWithoutAlertHistoryInput[]
    updateMany?: CallAttemptUpdateManyWithWhereWithoutAlertHistoryInput | CallAttemptUpdateManyWithWhereWithoutAlertHistoryInput[]
    deleteMany?: CallAttemptScalarWhereInput | CallAttemptScalarWhereInput[]
  }

  export type AlertHistoryCreateNestedOneWithoutFeedbackLogsInput = {
    create?: XOR<AlertHistoryCreateWithoutFeedbackLogsInput, AlertHistoryUncheckedCreateWithoutFeedbackLogsInput>
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutFeedbackLogsInput
    connect?: AlertHistoryWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutFeedbackLogsInput = {
    create?: XOR<RegionCreateWithoutFeedbackLogsInput, RegionUncheckedCreateWithoutFeedbackLogsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutFeedbackLogsInput
    connect?: RegionWhereUniqueInput
  }

  export type HazardTypeCreateNestedOneWithoutFeedbackLogsInput = {
    create?: XOR<HazardTypeCreateWithoutFeedbackLogsInput, HazardTypeUncheckedCreateWithoutFeedbackLogsInput>
    connectOrCreate?: HazardTypeCreateOrConnectWithoutFeedbackLogsInput
    connect?: HazardTypeWhereUniqueInput
  }

  export type AlertHistoryUpdateOneRequiredWithoutFeedbackLogsNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutFeedbackLogsInput, AlertHistoryUncheckedCreateWithoutFeedbackLogsInput>
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutFeedbackLogsInput
    upsert?: AlertHistoryUpsertWithoutFeedbackLogsInput
    connect?: AlertHistoryWhereUniqueInput
    update?: XOR<XOR<AlertHistoryUpdateToOneWithWhereWithoutFeedbackLogsInput, AlertHistoryUpdateWithoutFeedbackLogsInput>, AlertHistoryUncheckedUpdateWithoutFeedbackLogsInput>
  }

  export type RegionUpdateOneRequiredWithoutFeedbackLogsNestedInput = {
    create?: XOR<RegionCreateWithoutFeedbackLogsInput, RegionUncheckedCreateWithoutFeedbackLogsInput>
    connectOrCreate?: RegionCreateOrConnectWithoutFeedbackLogsInput
    upsert?: RegionUpsertWithoutFeedbackLogsInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutFeedbackLogsInput, RegionUpdateWithoutFeedbackLogsInput>, RegionUncheckedUpdateWithoutFeedbackLogsInput>
  }

  export type HazardTypeUpdateOneRequiredWithoutFeedbackLogsNestedInput = {
    create?: XOR<HazardTypeCreateWithoutFeedbackLogsInput, HazardTypeUncheckedCreateWithoutFeedbackLogsInput>
    connectOrCreate?: HazardTypeCreateOrConnectWithoutFeedbackLogsInput
    upsert?: HazardTypeUpsertWithoutFeedbackLogsInput
    connect?: HazardTypeWhereUniqueInput
    update?: XOR<XOR<HazardTypeUpdateToOneWithWhereWithoutFeedbackLogsInput, HazardTypeUpdateWithoutFeedbackLogsInput>, HazardTypeUncheckedUpdateWithoutFeedbackLogsInput>
  }

  export type RegionCreateNestedOneWithoutCommunityMembersInput = {
    create?: XOR<RegionCreateWithoutCommunityMembersInput, RegionUncheckedCreateWithoutCommunityMembersInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCommunityMembersInput
    connect?: RegionWhereUniqueInput
  }

  export type CommunityCreateNestedOneWithoutMembersInput = {
    create?: XOR<CommunityCreateWithoutMembersInput, CommunityUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CommunityCreateOrConnectWithoutMembersInput
    connect?: CommunityWhereUniqueInput
  }

  export type CallAttemptCreateNestedManyWithoutMemberInput = {
    create?: XOR<CallAttemptCreateWithoutMemberInput, CallAttemptUncheckedCreateWithoutMemberInput> | CallAttemptCreateWithoutMemberInput[] | CallAttemptUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutMemberInput | CallAttemptCreateOrConnectWithoutMemberInput[]
    createMany?: CallAttemptCreateManyMemberInputEnvelope
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
  }

  export type CallAttemptUncheckedCreateNestedManyWithoutMemberInput = {
    create?: XOR<CallAttemptCreateWithoutMemberInput, CallAttemptUncheckedCreateWithoutMemberInput> | CallAttemptCreateWithoutMemberInput[] | CallAttemptUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutMemberInput | CallAttemptCreateOrConnectWithoutMemberInput[]
    createMany?: CallAttemptCreateManyMemberInputEnvelope
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type RegionUpdateOneRequiredWithoutCommunityMembersNestedInput = {
    create?: XOR<RegionCreateWithoutCommunityMembersInput, RegionUncheckedCreateWithoutCommunityMembersInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCommunityMembersInput
    upsert?: RegionUpsertWithoutCommunityMembersInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutCommunityMembersInput, RegionUpdateWithoutCommunityMembersInput>, RegionUncheckedUpdateWithoutCommunityMembersInput>
  }

  export type CommunityUpdateOneWithoutMembersNestedInput = {
    create?: XOR<CommunityCreateWithoutMembersInput, CommunityUncheckedCreateWithoutMembersInput>
    connectOrCreate?: CommunityCreateOrConnectWithoutMembersInput
    upsert?: CommunityUpsertWithoutMembersInput
    disconnect?: CommunityWhereInput | boolean
    delete?: CommunityWhereInput | boolean
    connect?: CommunityWhereUniqueInput
    update?: XOR<XOR<CommunityUpdateToOneWithWhereWithoutMembersInput, CommunityUpdateWithoutMembersInput>, CommunityUncheckedUpdateWithoutMembersInput>
  }

  export type CallAttemptUpdateManyWithoutMemberNestedInput = {
    create?: XOR<CallAttemptCreateWithoutMemberInput, CallAttemptUncheckedCreateWithoutMemberInput> | CallAttemptCreateWithoutMemberInput[] | CallAttemptUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutMemberInput | CallAttemptCreateOrConnectWithoutMemberInput[]
    upsert?: CallAttemptUpsertWithWhereUniqueWithoutMemberInput | CallAttemptUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: CallAttemptCreateManyMemberInputEnvelope
    set?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    disconnect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    delete?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    update?: CallAttemptUpdateWithWhereUniqueWithoutMemberInput | CallAttemptUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: CallAttemptUpdateManyWithWhereWithoutMemberInput | CallAttemptUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: CallAttemptScalarWhereInput | CallAttemptScalarWhereInput[]
  }

  export type CallAttemptUncheckedUpdateManyWithoutMemberNestedInput = {
    create?: XOR<CallAttemptCreateWithoutMemberInput, CallAttemptUncheckedCreateWithoutMemberInput> | CallAttemptCreateWithoutMemberInput[] | CallAttemptUncheckedCreateWithoutMemberInput[]
    connectOrCreate?: CallAttemptCreateOrConnectWithoutMemberInput | CallAttemptCreateOrConnectWithoutMemberInput[]
    upsert?: CallAttemptUpsertWithWhereUniqueWithoutMemberInput | CallAttemptUpsertWithWhereUniqueWithoutMemberInput[]
    createMany?: CallAttemptCreateManyMemberInputEnvelope
    set?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    disconnect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    delete?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    connect?: CallAttemptWhereUniqueInput | CallAttemptWhereUniqueInput[]
    update?: CallAttemptUpdateWithWhereUniqueWithoutMemberInput | CallAttemptUpdateWithWhereUniqueWithoutMemberInput[]
    updateMany?: CallAttemptUpdateManyWithWhereWithoutMemberInput | CallAttemptUpdateManyWithWhereWithoutMemberInput[]
    deleteMany?: CallAttemptScalarWhereInput | CallAttemptScalarWhereInput[]
  }

  export type AlertHistoryCreateNestedOneWithoutCallAttemptsInput = {
    create?: XOR<AlertHistoryCreateWithoutCallAttemptsInput, AlertHistoryUncheckedCreateWithoutCallAttemptsInput>
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutCallAttemptsInput
    connect?: AlertHistoryWhereUniqueInput
  }

  export type CommunityMemberCreateNestedOneWithoutCallAttemptsInput = {
    create?: XOR<CommunityMemberCreateWithoutCallAttemptsInput, CommunityMemberUncheckedCreateWithoutCallAttemptsInput>
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutCallAttemptsInput
    connect?: CommunityMemberWhereUniqueInput
  }

  export type AlertHistoryUpdateOneRequiredWithoutCallAttemptsNestedInput = {
    create?: XOR<AlertHistoryCreateWithoutCallAttemptsInput, AlertHistoryUncheckedCreateWithoutCallAttemptsInput>
    connectOrCreate?: AlertHistoryCreateOrConnectWithoutCallAttemptsInput
    upsert?: AlertHistoryUpsertWithoutCallAttemptsInput
    connect?: AlertHistoryWhereUniqueInput
    update?: XOR<XOR<AlertHistoryUpdateToOneWithWhereWithoutCallAttemptsInput, AlertHistoryUpdateWithoutCallAttemptsInput>, AlertHistoryUncheckedUpdateWithoutCallAttemptsInput>
  }

  export type CommunityMemberUpdateOneWithoutCallAttemptsNestedInput = {
    create?: XOR<CommunityMemberCreateWithoutCallAttemptsInput, CommunityMemberUncheckedCreateWithoutCallAttemptsInput>
    connectOrCreate?: CommunityMemberCreateOrConnectWithoutCallAttemptsInput
    upsert?: CommunityMemberUpsertWithoutCallAttemptsInput
    disconnect?: CommunityMemberWhereInput | boolean
    delete?: CommunityMemberWhereInput | boolean
    connect?: CommunityMemberWhereUniqueInput
    update?: XOR<XOR<CommunityMemberUpdateToOneWithWhereWithoutCallAttemptsInput, CommunityMemberUpdateWithoutCallAttemptsInput>, CommunityMemberUncheckedUpdateWithoutCallAttemptsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumuser_roleFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel>
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_roleFilter<$PrismaModel> | $Enums.user_role
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumuser_roleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.user_role | Enumuser_roleFieldRefInput<$PrismaModel>
    in?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    notIn?: $Enums.user_role[] | ListEnumuser_roleFieldRefInput<$PrismaModel>
    not?: NestedEnumuser_roleWithAggregatesFilter<$PrismaModel> | $Enums.user_role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumuser_roleFilter<$PrismaModel>
    _max?: NestedEnumuser_roleFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type AlertCreateWithoutCreatedByUserInput = {
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
    hazardType: HazardTypeCreateNestedOneWithoutAlertsInput
    alertRegions?: AlertRegionCreateNestedManyWithoutAlertInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutAlertInput
  }

  export type AlertUncheckedCreateWithoutCreatedByUserInput = {
    id?: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutAlertInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutAlertInput
  }

  export type AlertCreateOrConnectWithoutCreatedByUserInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutCreatedByUserInput, AlertUncheckedCreateWithoutCreatedByUserInput>
  }

  export type AlertCreateManyCreatedByUserInputEnvelope = {
    data: AlertCreateManyCreatedByUserInput | AlertCreateManyCreatedByUserInput[]
    skipDuplicates?: boolean
  }

  export type AlertUpsertWithWhereUniqueWithoutCreatedByUserInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutCreatedByUserInput, AlertUncheckedUpdateWithoutCreatedByUserInput>
    create: XOR<AlertCreateWithoutCreatedByUserInput, AlertUncheckedCreateWithoutCreatedByUserInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutCreatedByUserInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutCreatedByUserInput, AlertUncheckedUpdateWithoutCreatedByUserInput>
  }

  export type AlertUpdateManyWithWhereWithoutCreatedByUserInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutCreatedByUserInput>
  }

  export type AlertScalarWhereInput = {
    AND?: AlertScalarWhereInput | AlertScalarWhereInput[]
    OR?: AlertScalarWhereInput[]
    NOT?: AlertScalarWhereInput | AlertScalarWhereInput[]
    id?: IntFilter<"Alert"> | number
    hazardTypeId?: IntFilter<"Alert"> | number
    severityLevel?: StringFilter<"Alert"> | string
    rawScientificDescription?: StringFilter<"Alert"> | string
    createdByUserId?: IntNullableFilter<"Alert"> | number | null
    createdAt?: DateTimeFilter<"Alert"> | Date | string
  }

  export type CommunityCreateWithoutRegionInput = {
    name: string
    totalRegistered?: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
    members?: CommunityMemberCreateNestedManyWithoutCommunityInput
  }

  export type CommunityUncheckedCreateWithoutRegionInput = {
    id?: number
    name: string
    totalRegistered?: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
    members?: CommunityMemberUncheckedCreateNestedManyWithoutCommunityInput
  }

  export type CommunityCreateOrConnectWithoutRegionInput = {
    where: CommunityWhereUniqueInput
    create: XOR<CommunityCreateWithoutRegionInput, CommunityUncheckedCreateWithoutRegionInput>
  }

  export type CommunityCreateManyRegionInputEnvelope = {
    data: CommunityCreateManyRegionInput | CommunityCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type AlertRegionCreateWithoutRegionInput = {
    alert: AlertCreateNestedOneWithoutAlertRegionsInput
  }

  export type AlertRegionUncheckedCreateWithoutRegionInput = {
    alertId: number
  }

  export type AlertRegionCreateOrConnectWithoutRegionInput = {
    where: AlertRegionWhereUniqueInput
    create: XOR<AlertRegionCreateWithoutRegionInput, AlertRegionUncheckedCreateWithoutRegionInput>
  }

  export type AlertRegionCreateManyRegionInputEnvelope = {
    data: AlertRegionCreateManyRegionInput | AlertRegionCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type AlertHistoryCreateWithoutRegionInput = {
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    alert: AlertCreateNestedOneWithoutAlertHistoryInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutAlertHistoryInput
    callAttempts?: CallAttemptCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryUncheckedCreateWithoutRegionInput = {
    id?: number
    alertId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutAlertHistoryInput
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryCreateOrConnectWithoutRegionInput = {
    where: AlertHistoryWhereUniqueInput
    create: XOR<AlertHistoryCreateWithoutRegionInput, AlertHistoryUncheckedCreateWithoutRegionInput>
  }

  export type AlertHistoryCreateManyRegionInputEnvelope = {
    data: AlertHistoryCreateManyRegionInput | AlertHistoryCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackLogCreateWithoutRegionInput = {
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    alertHistory: AlertHistoryCreateNestedOneWithoutFeedbackLogsInput
    hazardType: HazardTypeCreateNestedOneWithoutFeedbackLogsInput
  }

  export type FeedbackLogUncheckedCreateWithoutRegionInput = {
    id?: number
    alertHistoryId: number
    hazardTypeId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FeedbackLogCreateOrConnectWithoutRegionInput = {
    where: FeedbackLogWhereUniqueInput
    create: XOR<FeedbackLogCreateWithoutRegionInput, FeedbackLogUncheckedCreateWithoutRegionInput>
  }

  export type FeedbackLogCreateManyRegionInputEnvelope = {
    data: FeedbackLogCreateManyRegionInput | FeedbackLogCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type CommunityMemberCreateWithoutRegionInput = {
    fullName?: string | null
    phoneNumber: string
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    community?: CommunityCreateNestedOneWithoutMembersInput
    callAttempts?: CallAttemptCreateNestedManyWithoutMemberInput
  }

  export type CommunityMemberUncheckedCreateWithoutRegionInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    communityId?: number | null
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CommunityMemberCreateOrConnectWithoutRegionInput = {
    where: CommunityMemberWhereUniqueInput
    create: XOR<CommunityMemberCreateWithoutRegionInput, CommunityMemberUncheckedCreateWithoutRegionInput>
  }

  export type CommunityMemberCreateManyRegionInputEnvelope = {
    data: CommunityMemberCreateManyRegionInput | CommunityMemberCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type CommunityUpsertWithWhereUniqueWithoutRegionInput = {
    where: CommunityWhereUniqueInput
    update: XOR<CommunityUpdateWithoutRegionInput, CommunityUncheckedUpdateWithoutRegionInput>
    create: XOR<CommunityCreateWithoutRegionInput, CommunityUncheckedCreateWithoutRegionInput>
  }

  export type CommunityUpdateWithWhereUniqueWithoutRegionInput = {
    where: CommunityWhereUniqueInput
    data: XOR<CommunityUpdateWithoutRegionInput, CommunityUncheckedUpdateWithoutRegionInput>
  }

  export type CommunityUpdateManyWithWhereWithoutRegionInput = {
    where: CommunityScalarWhereInput
    data: XOR<CommunityUpdateManyMutationInput, CommunityUncheckedUpdateManyWithoutRegionInput>
  }

  export type CommunityScalarWhereInput = {
    AND?: CommunityScalarWhereInput | CommunityScalarWhereInput[]
    OR?: CommunityScalarWhereInput[]
    NOT?: CommunityScalarWhereInput | CommunityScalarWhereInput[]
    id?: IntFilter<"Community"> | number
    name?: StringFilter<"Community"> | string
    totalRegistered?: IntFilter<"Community"> | number
    regionId?: IntFilter<"Community"> | number
    registrationDate?: DateTimeFilter<"Community"> | Date | string
    source?: StringNullableFilter<"Community"> | string | null
    status?: StringNullableFilter<"Community"> | string | null
    actions?: StringNullableFilter<"Community"> | string | null
    createdAt?: DateTimeFilter<"Community"> | Date | string
  }

  export type AlertRegionUpsertWithWhereUniqueWithoutRegionInput = {
    where: AlertRegionWhereUniqueInput
    update: XOR<AlertRegionUpdateWithoutRegionInput, AlertRegionUncheckedUpdateWithoutRegionInput>
    create: XOR<AlertRegionCreateWithoutRegionInput, AlertRegionUncheckedCreateWithoutRegionInput>
  }

  export type AlertRegionUpdateWithWhereUniqueWithoutRegionInput = {
    where: AlertRegionWhereUniqueInput
    data: XOR<AlertRegionUpdateWithoutRegionInput, AlertRegionUncheckedUpdateWithoutRegionInput>
  }

  export type AlertRegionUpdateManyWithWhereWithoutRegionInput = {
    where: AlertRegionScalarWhereInput
    data: XOR<AlertRegionUpdateManyMutationInput, AlertRegionUncheckedUpdateManyWithoutRegionInput>
  }

  export type AlertRegionScalarWhereInput = {
    AND?: AlertRegionScalarWhereInput | AlertRegionScalarWhereInput[]
    OR?: AlertRegionScalarWhereInput[]
    NOT?: AlertRegionScalarWhereInput | AlertRegionScalarWhereInput[]
    alertId?: IntFilter<"AlertRegion"> | number
    regionId?: IntFilter<"AlertRegion"> | number
  }

  export type AlertHistoryUpsertWithWhereUniqueWithoutRegionInput = {
    where: AlertHistoryWhereUniqueInput
    update: XOR<AlertHistoryUpdateWithoutRegionInput, AlertHistoryUncheckedUpdateWithoutRegionInput>
    create: XOR<AlertHistoryCreateWithoutRegionInput, AlertHistoryUncheckedCreateWithoutRegionInput>
  }

  export type AlertHistoryUpdateWithWhereUniqueWithoutRegionInput = {
    where: AlertHistoryWhereUniqueInput
    data: XOR<AlertHistoryUpdateWithoutRegionInput, AlertHistoryUncheckedUpdateWithoutRegionInput>
  }

  export type AlertHistoryUpdateManyWithWhereWithoutRegionInput = {
    where: AlertHistoryScalarWhereInput
    data: XOR<AlertHistoryUpdateManyMutationInput, AlertHistoryUncheckedUpdateManyWithoutRegionInput>
  }

  export type AlertHistoryScalarWhereInput = {
    AND?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
    OR?: AlertHistoryScalarWhereInput[]
    NOT?: AlertHistoryScalarWhereInput | AlertHistoryScalarWhereInput[]
    id?: IntFilter<"AlertHistory"> | number
    alertId?: IntFilter<"AlertHistory"> | number
    regionId?: IntFilter<"AlertHistory"> | number
    dialect?: StringFilter<"AlertHistory"> | string
    status?: StringFilter<"AlertHistory"> | string
    callsCount?: IntFilter<"AlertHistory"> | number
    dispatchedAt?: DateTimeFilter<"AlertHistory"> | Date | string
    simplifiedText?: StringNullableFilter<"AlertHistory"> | string | null
    translatedText?: StringNullableFilter<"AlertHistory"> | string | null
    audioUrl?: StringNullableFilter<"AlertHistory"> | string | null
  }

  export type FeedbackLogUpsertWithWhereUniqueWithoutRegionInput = {
    where: FeedbackLogWhereUniqueInput
    update: XOR<FeedbackLogUpdateWithoutRegionInput, FeedbackLogUncheckedUpdateWithoutRegionInput>
    create: XOR<FeedbackLogCreateWithoutRegionInput, FeedbackLogUncheckedCreateWithoutRegionInput>
  }

  export type FeedbackLogUpdateWithWhereUniqueWithoutRegionInput = {
    where: FeedbackLogWhereUniqueInput
    data: XOR<FeedbackLogUpdateWithoutRegionInput, FeedbackLogUncheckedUpdateWithoutRegionInput>
  }

  export type FeedbackLogUpdateManyWithWhereWithoutRegionInput = {
    where: FeedbackLogScalarWhereInput
    data: XOR<FeedbackLogUpdateManyMutationInput, FeedbackLogUncheckedUpdateManyWithoutRegionInput>
  }

  export type FeedbackLogScalarWhereInput = {
    AND?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
    OR?: FeedbackLogScalarWhereInput[]
    NOT?: FeedbackLogScalarWhereInput | FeedbackLogScalarWhereInput[]
    id?: IntFilter<"FeedbackLog"> | number
    alertHistoryId?: IntFilter<"FeedbackLog"> | number
    regionId?: IntFilter<"FeedbackLog"> | number
    hazardTypeId?: IntFilter<"FeedbackLog"> | number
    audioFeedbackUrl?: StringNullableFilter<"FeedbackLog"> | string | null
    translationText?: StringNullableFilter<"FeedbackLog"> | string | null
    status?: StringFilter<"FeedbackLog"> | string
    adminResponse?: StringNullableFilter<"FeedbackLog"> | string | null
    respondedAt?: DateTimeNullableFilter<"FeedbackLog"> | Date | string | null
    createdAt?: DateTimeFilter<"FeedbackLog"> | Date | string
  }

  export type CommunityMemberUpsertWithWhereUniqueWithoutRegionInput = {
    where: CommunityMemberWhereUniqueInput
    update: XOR<CommunityMemberUpdateWithoutRegionInput, CommunityMemberUncheckedUpdateWithoutRegionInput>
    create: XOR<CommunityMemberCreateWithoutRegionInput, CommunityMemberUncheckedCreateWithoutRegionInput>
  }

  export type CommunityMemberUpdateWithWhereUniqueWithoutRegionInput = {
    where: CommunityMemberWhereUniqueInput
    data: XOR<CommunityMemberUpdateWithoutRegionInput, CommunityMemberUncheckedUpdateWithoutRegionInput>
  }

  export type CommunityMemberUpdateManyWithWhereWithoutRegionInput = {
    where: CommunityMemberScalarWhereInput
    data: XOR<CommunityMemberUpdateManyMutationInput, CommunityMemberUncheckedUpdateManyWithoutRegionInput>
  }

  export type CommunityMemberScalarWhereInput = {
    AND?: CommunityMemberScalarWhereInput | CommunityMemberScalarWhereInput[]
    OR?: CommunityMemberScalarWhereInput[]
    NOT?: CommunityMemberScalarWhereInput | CommunityMemberScalarWhereInput[]
    id?: IntFilter<"CommunityMember"> | number
    fullName?: StringNullableFilter<"CommunityMember"> | string | null
    phoneNumber?: StringFilter<"CommunityMember"> | string
    regionId?: IntFilter<"CommunityMember"> | number
    communityId?: IntNullableFilter<"CommunityMember"> | number | null
    language?: StringNullableFilter<"CommunityMember"> | string | null
    dialect?: StringNullableFilter<"CommunityMember"> | string | null
    isActive?: BoolFilter<"CommunityMember"> | boolean
    consent?: BoolFilter<"CommunityMember"> | boolean
    createdAt?: DateTimeFilter<"CommunityMember"> | Date | string
    updatedAt?: DateTimeFilter<"CommunityMember"> | Date | string
  }

  export type AlertCreateWithoutHazardTypeInput = {
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
    createdByUser?: UserCreateNestedOneWithoutAlertsInput
    alertRegions?: AlertRegionCreateNestedManyWithoutAlertInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutAlertInput
  }

  export type AlertUncheckedCreateWithoutHazardTypeInput = {
    id?: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId?: number | null
    createdAt?: Date | string
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutAlertInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutAlertInput
  }

  export type AlertCreateOrConnectWithoutHazardTypeInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutHazardTypeInput, AlertUncheckedCreateWithoutHazardTypeInput>
  }

  export type AlertCreateManyHazardTypeInputEnvelope = {
    data: AlertCreateManyHazardTypeInput | AlertCreateManyHazardTypeInput[]
    skipDuplicates?: boolean
  }

  export type FeedbackLogCreateWithoutHazardTypeInput = {
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    alertHistory: AlertHistoryCreateNestedOneWithoutFeedbackLogsInput
    region: RegionCreateNestedOneWithoutFeedbackLogsInput
  }

  export type FeedbackLogUncheckedCreateWithoutHazardTypeInput = {
    id?: number
    alertHistoryId: number
    regionId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FeedbackLogCreateOrConnectWithoutHazardTypeInput = {
    where: FeedbackLogWhereUniqueInput
    create: XOR<FeedbackLogCreateWithoutHazardTypeInput, FeedbackLogUncheckedCreateWithoutHazardTypeInput>
  }

  export type FeedbackLogCreateManyHazardTypeInputEnvelope = {
    data: FeedbackLogCreateManyHazardTypeInput | FeedbackLogCreateManyHazardTypeInput[]
    skipDuplicates?: boolean
  }

  export type AlertUpsertWithWhereUniqueWithoutHazardTypeInput = {
    where: AlertWhereUniqueInput
    update: XOR<AlertUpdateWithoutHazardTypeInput, AlertUncheckedUpdateWithoutHazardTypeInput>
    create: XOR<AlertCreateWithoutHazardTypeInput, AlertUncheckedCreateWithoutHazardTypeInput>
  }

  export type AlertUpdateWithWhereUniqueWithoutHazardTypeInput = {
    where: AlertWhereUniqueInput
    data: XOR<AlertUpdateWithoutHazardTypeInput, AlertUncheckedUpdateWithoutHazardTypeInput>
  }

  export type AlertUpdateManyWithWhereWithoutHazardTypeInput = {
    where: AlertScalarWhereInput
    data: XOR<AlertUpdateManyMutationInput, AlertUncheckedUpdateManyWithoutHazardTypeInput>
  }

  export type FeedbackLogUpsertWithWhereUniqueWithoutHazardTypeInput = {
    where: FeedbackLogWhereUniqueInput
    update: XOR<FeedbackLogUpdateWithoutHazardTypeInput, FeedbackLogUncheckedUpdateWithoutHazardTypeInput>
    create: XOR<FeedbackLogCreateWithoutHazardTypeInput, FeedbackLogUncheckedCreateWithoutHazardTypeInput>
  }

  export type FeedbackLogUpdateWithWhereUniqueWithoutHazardTypeInput = {
    where: FeedbackLogWhereUniqueInput
    data: XOR<FeedbackLogUpdateWithoutHazardTypeInput, FeedbackLogUncheckedUpdateWithoutHazardTypeInput>
  }

  export type FeedbackLogUpdateManyWithWhereWithoutHazardTypeInput = {
    where: FeedbackLogScalarWhereInput
    data: XOR<FeedbackLogUpdateManyMutationInput, FeedbackLogUncheckedUpdateManyWithoutHazardTypeInput>
  }

  export type RegionCreateWithoutCommunitiesInput = {
    name: string
    latitude?: number | null
    longitude?: number | null
    alertRegions?: AlertRegionCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutCommunitiesInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutCommunitiesInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCommunitiesInput, RegionUncheckedCreateWithoutCommunitiesInput>
  }

  export type CommunityMemberCreateWithoutCommunityInput = {
    fullName?: string | null
    phoneNumber: string
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    region: RegionCreateNestedOneWithoutCommunityMembersInput
    callAttempts?: CallAttemptCreateNestedManyWithoutMemberInput
  }

  export type CommunityMemberUncheckedCreateWithoutCommunityInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    regionId: number
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutMemberInput
  }

  export type CommunityMemberCreateOrConnectWithoutCommunityInput = {
    where: CommunityMemberWhereUniqueInput
    create: XOR<CommunityMemberCreateWithoutCommunityInput, CommunityMemberUncheckedCreateWithoutCommunityInput>
  }

  export type CommunityMemberCreateManyCommunityInputEnvelope = {
    data: CommunityMemberCreateManyCommunityInput | CommunityMemberCreateManyCommunityInput[]
    skipDuplicates?: boolean
  }

  export type RegionUpsertWithoutCommunitiesInput = {
    update: XOR<RegionUpdateWithoutCommunitiesInput, RegionUncheckedUpdateWithoutCommunitiesInput>
    create: XOR<RegionCreateWithoutCommunitiesInput, RegionUncheckedCreateWithoutCommunitiesInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutCommunitiesInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutCommunitiesInput, RegionUncheckedUpdateWithoutCommunitiesInput>
  }

  export type RegionUpdateWithoutCommunitiesInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    alertRegions?: AlertRegionUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutCommunitiesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type CommunityMemberUpsertWithWhereUniqueWithoutCommunityInput = {
    where: CommunityMemberWhereUniqueInput
    update: XOR<CommunityMemberUpdateWithoutCommunityInput, CommunityMemberUncheckedUpdateWithoutCommunityInput>
    create: XOR<CommunityMemberCreateWithoutCommunityInput, CommunityMemberUncheckedCreateWithoutCommunityInput>
  }

  export type CommunityMemberUpdateWithWhereUniqueWithoutCommunityInput = {
    where: CommunityMemberWhereUniqueInput
    data: XOR<CommunityMemberUpdateWithoutCommunityInput, CommunityMemberUncheckedUpdateWithoutCommunityInput>
  }

  export type CommunityMemberUpdateManyWithWhereWithoutCommunityInput = {
    where: CommunityMemberScalarWhereInput
    data: XOR<CommunityMemberUpdateManyMutationInput, CommunityMemberUncheckedUpdateManyWithoutCommunityInput>
  }

  export type HazardTypeCreateWithoutAlertsInput = {
    name: string
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutHazardTypeInput
  }

  export type HazardTypeUncheckedCreateWithoutAlertsInput = {
    id?: number
    name: string
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutHazardTypeInput
  }

  export type HazardTypeCreateOrConnectWithoutAlertsInput = {
    where: HazardTypeWhereUniqueInput
    create: XOR<HazardTypeCreateWithoutAlertsInput, HazardTypeUncheckedCreateWithoutAlertsInput>
  }

  export type UserCreateWithoutAlertsInput = {
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.user_role
    lastLogin?: Date | string | null
    createdAt?: Date | string
  }

  export type UserUncheckedCreateWithoutAlertsInput = {
    id?: number
    fullName: string
    email: string
    passwordHash: string
    role?: $Enums.user_role
    lastLogin?: Date | string | null
    createdAt?: Date | string
  }

  export type UserCreateOrConnectWithoutAlertsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
  }

  export type AlertRegionCreateWithoutAlertInput = {
    region: RegionCreateNestedOneWithoutAlertRegionsInput
  }

  export type AlertRegionUncheckedCreateWithoutAlertInput = {
    regionId: number
  }

  export type AlertRegionCreateOrConnectWithoutAlertInput = {
    where: AlertRegionWhereUniqueInput
    create: XOR<AlertRegionCreateWithoutAlertInput, AlertRegionUncheckedCreateWithoutAlertInput>
  }

  export type AlertRegionCreateManyAlertInputEnvelope = {
    data: AlertRegionCreateManyAlertInput | AlertRegionCreateManyAlertInput[]
    skipDuplicates?: boolean
  }

  export type AlertHistoryCreateWithoutAlertInput = {
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    region: RegionCreateNestedOneWithoutAlertHistoryInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutAlertHistoryInput
    callAttempts?: CallAttemptCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryUncheckedCreateWithoutAlertInput = {
    id?: number
    regionId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutAlertHistoryInput
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryCreateOrConnectWithoutAlertInput = {
    where: AlertHistoryWhereUniqueInput
    create: XOR<AlertHistoryCreateWithoutAlertInput, AlertHistoryUncheckedCreateWithoutAlertInput>
  }

  export type AlertHistoryCreateManyAlertInputEnvelope = {
    data: AlertHistoryCreateManyAlertInput | AlertHistoryCreateManyAlertInput[]
    skipDuplicates?: boolean
  }

  export type HazardTypeUpsertWithoutAlertsInput = {
    update: XOR<HazardTypeUpdateWithoutAlertsInput, HazardTypeUncheckedUpdateWithoutAlertsInput>
    create: XOR<HazardTypeCreateWithoutAlertsInput, HazardTypeUncheckedCreateWithoutAlertsInput>
    where?: HazardTypeWhereInput
  }

  export type HazardTypeUpdateToOneWithWhereWithoutAlertsInput = {
    where?: HazardTypeWhereInput
    data: XOR<HazardTypeUpdateWithoutAlertsInput, HazardTypeUncheckedUpdateWithoutAlertsInput>
  }

  export type HazardTypeUpdateWithoutAlertsInput = {
    name?: StringFieldUpdateOperationsInput | string
    feedbackLogs?: FeedbackLogUpdateManyWithoutHazardTypeNestedInput
  }

  export type HazardTypeUncheckedUpdateWithoutAlertsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutHazardTypeNestedInput
  }

  export type UserUpsertWithoutAlertsInput = {
    update: XOR<UserUpdateWithoutAlertsInput, UserUncheckedUpdateWithoutAlertsInput>
    create: XOR<UserCreateWithoutAlertsInput, UserUncheckedCreateWithoutAlertsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAlertsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAlertsInput, UserUncheckedUpdateWithoutAlertsInput>
  }

  export type UserUpdateWithoutAlertsInput = {
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: Enumuser_roleFieldUpdateOperationsInput | $Enums.user_role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutAlertsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: Enumuser_roleFieldUpdateOperationsInput | $Enums.user_role
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRegionUpsertWithWhereUniqueWithoutAlertInput = {
    where: AlertRegionWhereUniqueInput
    update: XOR<AlertRegionUpdateWithoutAlertInput, AlertRegionUncheckedUpdateWithoutAlertInput>
    create: XOR<AlertRegionCreateWithoutAlertInput, AlertRegionUncheckedCreateWithoutAlertInput>
  }

  export type AlertRegionUpdateWithWhereUniqueWithoutAlertInput = {
    where: AlertRegionWhereUniqueInput
    data: XOR<AlertRegionUpdateWithoutAlertInput, AlertRegionUncheckedUpdateWithoutAlertInput>
  }

  export type AlertRegionUpdateManyWithWhereWithoutAlertInput = {
    where: AlertRegionScalarWhereInput
    data: XOR<AlertRegionUpdateManyMutationInput, AlertRegionUncheckedUpdateManyWithoutAlertInput>
  }

  export type AlertHistoryUpsertWithWhereUniqueWithoutAlertInput = {
    where: AlertHistoryWhereUniqueInput
    update: XOR<AlertHistoryUpdateWithoutAlertInput, AlertHistoryUncheckedUpdateWithoutAlertInput>
    create: XOR<AlertHistoryCreateWithoutAlertInput, AlertHistoryUncheckedCreateWithoutAlertInput>
  }

  export type AlertHistoryUpdateWithWhereUniqueWithoutAlertInput = {
    where: AlertHistoryWhereUniqueInput
    data: XOR<AlertHistoryUpdateWithoutAlertInput, AlertHistoryUncheckedUpdateWithoutAlertInput>
  }

  export type AlertHistoryUpdateManyWithWhereWithoutAlertInput = {
    where: AlertHistoryScalarWhereInput
    data: XOR<AlertHistoryUpdateManyMutationInput, AlertHistoryUncheckedUpdateManyWithoutAlertInput>
  }

  export type AlertCreateWithoutAlertRegionsInput = {
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
    hazardType: HazardTypeCreateNestedOneWithoutAlertsInput
    createdByUser?: UserCreateNestedOneWithoutAlertsInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutAlertInput
  }

  export type AlertUncheckedCreateWithoutAlertRegionsInput = {
    id?: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId?: number | null
    createdAt?: Date | string
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutAlertInput
  }

  export type AlertCreateOrConnectWithoutAlertRegionsInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutAlertRegionsInput, AlertUncheckedCreateWithoutAlertRegionsInput>
  }

  export type RegionCreateWithoutAlertRegionsInput = {
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutAlertRegionsInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityUncheckedCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutAlertRegionsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutAlertRegionsInput, RegionUncheckedCreateWithoutAlertRegionsInput>
  }

  export type AlertUpsertWithoutAlertRegionsInput = {
    update: XOR<AlertUpdateWithoutAlertRegionsInput, AlertUncheckedUpdateWithoutAlertRegionsInput>
    create: XOR<AlertCreateWithoutAlertRegionsInput, AlertUncheckedCreateWithoutAlertRegionsInput>
    where?: AlertWhereInput
  }

  export type AlertUpdateToOneWithWhereWithoutAlertRegionsInput = {
    where?: AlertWhereInput
    data: XOR<AlertUpdateWithoutAlertRegionsInput, AlertUncheckedUpdateWithoutAlertRegionsInput>
  }

  export type AlertUpdateWithoutAlertRegionsInput = {
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hazardType?: HazardTypeUpdateOneRequiredWithoutAlertsNestedInput
    createdByUser?: UserUpdateOneWithoutAlertsNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateWithoutAlertRegionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutAlertNestedInput
  }

  export type RegionUpsertWithoutAlertRegionsInput = {
    update: XOR<RegionUpdateWithoutAlertRegionsInput, RegionUncheckedUpdateWithoutAlertRegionsInput>
    create: XOR<RegionCreateWithoutAlertRegionsInput, RegionUncheckedCreateWithoutAlertRegionsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutAlertRegionsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutAlertRegionsInput, RegionUncheckedUpdateWithoutAlertRegionsInput>
  }

  export type RegionUpdateWithoutAlertRegionsInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutAlertRegionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUncheckedUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type AlertCreateWithoutAlertHistoryInput = {
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
    hazardType: HazardTypeCreateNestedOneWithoutAlertsInput
    createdByUser?: UserCreateNestedOneWithoutAlertsInput
    alertRegions?: AlertRegionCreateNestedManyWithoutAlertInput
  }

  export type AlertUncheckedCreateWithoutAlertHistoryInput = {
    id?: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId?: number | null
    createdAt?: Date | string
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutAlertInput
  }

  export type AlertCreateOrConnectWithoutAlertHistoryInput = {
    where: AlertWhereUniqueInput
    create: XOR<AlertCreateWithoutAlertHistoryInput, AlertUncheckedCreateWithoutAlertHistoryInput>
  }

  export type RegionCreateWithoutAlertHistoryInput = {
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutAlertHistoryInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityUncheckedCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutAlertHistoryInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutAlertHistoryInput, RegionUncheckedCreateWithoutAlertHistoryInput>
  }

  export type FeedbackLogCreateWithoutAlertHistoryInput = {
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
    region: RegionCreateNestedOneWithoutFeedbackLogsInput
    hazardType: HazardTypeCreateNestedOneWithoutFeedbackLogsInput
  }

  export type FeedbackLogUncheckedCreateWithoutAlertHistoryInput = {
    id?: number
    regionId: number
    hazardTypeId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type FeedbackLogCreateOrConnectWithoutAlertHistoryInput = {
    where: FeedbackLogWhereUniqueInput
    create: XOR<FeedbackLogCreateWithoutAlertHistoryInput, FeedbackLogUncheckedCreateWithoutAlertHistoryInput>
  }

  export type FeedbackLogCreateManyAlertHistoryInputEnvelope = {
    data: FeedbackLogCreateManyAlertHistoryInput | FeedbackLogCreateManyAlertHistoryInput[]
    skipDuplicates?: boolean
  }

  export type CallAttemptCreateWithoutAlertHistoryInput = {
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    member?: CommunityMemberCreateNestedOneWithoutCallAttemptsInput
  }

  export type CallAttemptUncheckedCreateWithoutAlertHistoryInput = {
    id?: number
    memberId?: number | null
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallAttemptCreateOrConnectWithoutAlertHistoryInput = {
    where: CallAttemptWhereUniqueInput
    create: XOR<CallAttemptCreateWithoutAlertHistoryInput, CallAttemptUncheckedCreateWithoutAlertHistoryInput>
  }

  export type CallAttemptCreateManyAlertHistoryInputEnvelope = {
    data: CallAttemptCreateManyAlertHistoryInput | CallAttemptCreateManyAlertHistoryInput[]
    skipDuplicates?: boolean
  }

  export type AlertUpsertWithoutAlertHistoryInput = {
    update: XOR<AlertUpdateWithoutAlertHistoryInput, AlertUncheckedUpdateWithoutAlertHistoryInput>
    create: XOR<AlertCreateWithoutAlertHistoryInput, AlertUncheckedCreateWithoutAlertHistoryInput>
    where?: AlertWhereInput
  }

  export type AlertUpdateToOneWithWhereWithoutAlertHistoryInput = {
    where?: AlertWhereInput
    data: XOR<AlertUpdateWithoutAlertHistoryInput, AlertUncheckedUpdateWithoutAlertHistoryInput>
  }

  export type AlertUpdateWithoutAlertHistoryInput = {
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hazardType?: HazardTypeUpdateOneRequiredWithoutAlertsNestedInput
    createdByUser?: UserUpdateOneWithoutAlertsNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateWithoutAlertHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutAlertNestedInput
  }

  export type RegionUpsertWithoutAlertHistoryInput = {
    update: XOR<RegionUpdateWithoutAlertHistoryInput, RegionUncheckedUpdateWithoutAlertHistoryInput>
    create: XOR<RegionCreateWithoutAlertHistoryInput, RegionUncheckedCreateWithoutAlertHistoryInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutAlertHistoryInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutAlertHistoryInput, RegionUncheckedUpdateWithoutAlertHistoryInput>
  }

  export type RegionUpdateWithoutAlertHistoryInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutAlertHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUncheckedUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type FeedbackLogUpsertWithWhereUniqueWithoutAlertHistoryInput = {
    where: FeedbackLogWhereUniqueInput
    update: XOR<FeedbackLogUpdateWithoutAlertHistoryInput, FeedbackLogUncheckedUpdateWithoutAlertHistoryInput>
    create: XOR<FeedbackLogCreateWithoutAlertHistoryInput, FeedbackLogUncheckedCreateWithoutAlertHistoryInput>
  }

  export type FeedbackLogUpdateWithWhereUniqueWithoutAlertHistoryInput = {
    where: FeedbackLogWhereUniqueInput
    data: XOR<FeedbackLogUpdateWithoutAlertHistoryInput, FeedbackLogUncheckedUpdateWithoutAlertHistoryInput>
  }

  export type FeedbackLogUpdateManyWithWhereWithoutAlertHistoryInput = {
    where: FeedbackLogScalarWhereInput
    data: XOR<FeedbackLogUpdateManyMutationInput, FeedbackLogUncheckedUpdateManyWithoutAlertHistoryInput>
  }

  export type CallAttemptUpsertWithWhereUniqueWithoutAlertHistoryInput = {
    where: CallAttemptWhereUniqueInput
    update: XOR<CallAttemptUpdateWithoutAlertHistoryInput, CallAttemptUncheckedUpdateWithoutAlertHistoryInput>
    create: XOR<CallAttemptCreateWithoutAlertHistoryInput, CallAttemptUncheckedCreateWithoutAlertHistoryInput>
  }

  export type CallAttemptUpdateWithWhereUniqueWithoutAlertHistoryInput = {
    where: CallAttemptWhereUniqueInput
    data: XOR<CallAttemptUpdateWithoutAlertHistoryInput, CallAttemptUncheckedUpdateWithoutAlertHistoryInput>
  }

  export type CallAttemptUpdateManyWithWhereWithoutAlertHistoryInput = {
    where: CallAttemptScalarWhereInput
    data: XOR<CallAttemptUpdateManyMutationInput, CallAttemptUncheckedUpdateManyWithoutAlertHistoryInput>
  }

  export type CallAttemptScalarWhereInput = {
    AND?: CallAttemptScalarWhereInput | CallAttemptScalarWhereInput[]
    OR?: CallAttemptScalarWhereInput[]
    NOT?: CallAttemptScalarWhereInput | CallAttemptScalarWhereInput[]
    id?: IntFilter<"CallAttempt"> | number
    alertHistoryId?: IntFilter<"CallAttempt"> | number
    memberId?: IntNullableFilter<"CallAttempt"> | number | null
    phoneNumber?: StringFilter<"CallAttempt"> | string
    channel?: StringFilter<"CallAttempt"> | string
    status?: StringFilter<"CallAttempt"> | string
    provider?: StringNullableFilter<"CallAttempt"> | string | null
    providerCallId?: StringNullableFilter<"CallAttempt"> | string | null
    language?: StringNullableFilter<"CallAttempt"> | string | null
    dialect?: StringNullableFilter<"CallAttempt"> | string | null
    attemptCount?: IntFilter<"CallAttempt"> | number
    lastAttemptAt?: DateTimeNullableFilter<"CallAttempt"> | Date | string | null
    completedAt?: DateTimeNullableFilter<"CallAttempt"> | Date | string | null
    failureReason?: StringNullableFilter<"CallAttempt"> | string | null
    createdAt?: DateTimeFilter<"CallAttempt"> | Date | string
    updatedAt?: DateTimeFilter<"CallAttempt"> | Date | string
  }

  export type AlertHistoryCreateWithoutFeedbackLogsInput = {
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    alert: AlertCreateNestedOneWithoutAlertHistoryInput
    region: RegionCreateNestedOneWithoutAlertHistoryInput
    callAttempts?: CallAttemptCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryUncheckedCreateWithoutFeedbackLogsInput = {
    id?: number
    alertId: number
    regionId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    callAttempts?: CallAttemptUncheckedCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryCreateOrConnectWithoutFeedbackLogsInput = {
    where: AlertHistoryWhereUniqueInput
    create: XOR<AlertHistoryCreateWithoutFeedbackLogsInput, AlertHistoryUncheckedCreateWithoutFeedbackLogsInput>
  }

  export type RegionCreateWithoutFeedbackLogsInput = {
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutFeedbackLogsInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityUncheckedCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutRegionInput
    communityMembers?: CommunityMemberUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutFeedbackLogsInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutFeedbackLogsInput, RegionUncheckedCreateWithoutFeedbackLogsInput>
  }

  export type HazardTypeCreateWithoutFeedbackLogsInput = {
    name: string
    alerts?: AlertCreateNestedManyWithoutHazardTypeInput
  }

  export type HazardTypeUncheckedCreateWithoutFeedbackLogsInput = {
    id?: number
    name: string
    alerts?: AlertUncheckedCreateNestedManyWithoutHazardTypeInput
  }

  export type HazardTypeCreateOrConnectWithoutFeedbackLogsInput = {
    where: HazardTypeWhereUniqueInput
    create: XOR<HazardTypeCreateWithoutFeedbackLogsInput, HazardTypeUncheckedCreateWithoutFeedbackLogsInput>
  }

  export type AlertHistoryUpsertWithoutFeedbackLogsInput = {
    update: XOR<AlertHistoryUpdateWithoutFeedbackLogsInput, AlertHistoryUncheckedUpdateWithoutFeedbackLogsInput>
    create: XOR<AlertHistoryCreateWithoutFeedbackLogsInput, AlertHistoryUncheckedCreateWithoutFeedbackLogsInput>
    where?: AlertHistoryWhereInput
  }

  export type AlertHistoryUpdateToOneWithWhereWithoutFeedbackLogsInput = {
    where?: AlertHistoryWhereInput
    data: XOR<AlertHistoryUpdateWithoutFeedbackLogsInput, AlertHistoryUncheckedUpdateWithoutFeedbackLogsInput>
  }

  export type AlertHistoryUpdateWithoutFeedbackLogsInput = {
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    alert?: AlertUpdateOneRequiredWithoutAlertHistoryNestedInput
    region?: RegionUpdateOneRequiredWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateWithoutFeedbackLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutAlertHistoryNestedInput
  }

  export type RegionUpsertWithoutFeedbackLogsInput = {
    update: XOR<RegionUpdateWithoutFeedbackLogsInput, RegionUncheckedUpdateWithoutFeedbackLogsInput>
    create: XOR<RegionCreateWithoutFeedbackLogsInput, RegionUncheckedCreateWithoutFeedbackLogsInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutFeedbackLogsInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutFeedbackLogsInput, RegionUncheckedUpdateWithoutFeedbackLogsInput>
  }

  export type RegionUpdateWithoutFeedbackLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutFeedbackLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUncheckedUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutRegionNestedInput
    communityMembers?: CommunityMemberUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type HazardTypeUpsertWithoutFeedbackLogsInput = {
    update: XOR<HazardTypeUpdateWithoutFeedbackLogsInput, HazardTypeUncheckedUpdateWithoutFeedbackLogsInput>
    create: XOR<HazardTypeCreateWithoutFeedbackLogsInput, HazardTypeUncheckedCreateWithoutFeedbackLogsInput>
    where?: HazardTypeWhereInput
  }

  export type HazardTypeUpdateToOneWithWhereWithoutFeedbackLogsInput = {
    where?: HazardTypeWhereInput
    data: XOR<HazardTypeUpdateWithoutFeedbackLogsInput, HazardTypeUncheckedUpdateWithoutFeedbackLogsInput>
  }

  export type HazardTypeUpdateWithoutFeedbackLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    alerts?: AlertUpdateManyWithoutHazardTypeNestedInput
  }

  export type HazardTypeUncheckedUpdateWithoutFeedbackLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    alerts?: AlertUncheckedUpdateManyWithoutHazardTypeNestedInput
  }

  export type RegionCreateWithoutCommunityMembersInput = {
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutCommunityMembersInput = {
    id?: number
    name: string
    latitude?: number | null
    longitude?: number | null
    communities?: CommunityUncheckedCreateNestedManyWithoutRegionInput
    alertRegions?: AlertRegionUncheckedCreateNestedManyWithoutRegionInput
    alertHistory?: AlertHistoryUncheckedCreateNestedManyWithoutRegionInput
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutCommunityMembersInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCommunityMembersInput, RegionUncheckedCreateWithoutCommunityMembersInput>
  }

  export type CommunityCreateWithoutMembersInput = {
    name: string
    totalRegistered?: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
    region: RegionCreateNestedOneWithoutCommunitiesInput
  }

  export type CommunityUncheckedCreateWithoutMembersInput = {
    id?: number
    name: string
    totalRegistered?: number
    regionId: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
  }

  export type CommunityCreateOrConnectWithoutMembersInput = {
    where: CommunityWhereUniqueInput
    create: XOR<CommunityCreateWithoutMembersInput, CommunityUncheckedCreateWithoutMembersInput>
  }

  export type CallAttemptCreateWithoutMemberInput = {
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    alertHistory: AlertHistoryCreateNestedOneWithoutCallAttemptsInput
  }

  export type CallAttemptUncheckedCreateWithoutMemberInput = {
    id?: number
    alertHistoryId: number
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallAttemptCreateOrConnectWithoutMemberInput = {
    where: CallAttemptWhereUniqueInput
    create: XOR<CallAttemptCreateWithoutMemberInput, CallAttemptUncheckedCreateWithoutMemberInput>
  }

  export type CallAttemptCreateManyMemberInputEnvelope = {
    data: CallAttemptCreateManyMemberInput | CallAttemptCreateManyMemberInput[]
    skipDuplicates?: boolean
  }

  export type RegionUpsertWithoutCommunityMembersInput = {
    update: XOR<RegionUpdateWithoutCommunityMembersInput, RegionUncheckedUpdateWithoutCommunityMembersInput>
    create: XOR<RegionCreateWithoutCommunityMembersInput, RegionUncheckedCreateWithoutCommunityMembersInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutCommunityMembersInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutCommunityMembersInput, RegionUncheckedUpdateWithoutCommunityMembersInput>
  }

  export type RegionUpdateWithoutCommunityMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutCommunityMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    latitude?: NullableFloatFieldUpdateOperationsInput | number | null
    longitude?: NullableFloatFieldUpdateOperationsInput | number | null
    communities?: CommunityUncheckedUpdateManyWithoutRegionNestedInput
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutRegionNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutRegionNestedInput
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type CommunityUpsertWithoutMembersInput = {
    update: XOR<CommunityUpdateWithoutMembersInput, CommunityUncheckedUpdateWithoutMembersInput>
    create: XOR<CommunityCreateWithoutMembersInput, CommunityUncheckedCreateWithoutMembersInput>
    where?: CommunityWhereInput
  }

  export type CommunityUpdateToOneWithWhereWithoutMembersInput = {
    where?: CommunityWhereInput
    data: XOR<CommunityUpdateWithoutMembersInput, CommunityUncheckedUpdateWithoutMembersInput>
  }

  export type CommunityUpdateWithoutMembersInput = {
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutCommunitiesNestedInput
  }

  export type CommunityUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptUpsertWithWhereUniqueWithoutMemberInput = {
    where: CallAttemptWhereUniqueInput
    update: XOR<CallAttemptUpdateWithoutMemberInput, CallAttemptUncheckedUpdateWithoutMemberInput>
    create: XOR<CallAttemptCreateWithoutMemberInput, CallAttemptUncheckedCreateWithoutMemberInput>
  }

  export type CallAttemptUpdateWithWhereUniqueWithoutMemberInput = {
    where: CallAttemptWhereUniqueInput
    data: XOR<CallAttemptUpdateWithoutMemberInput, CallAttemptUncheckedUpdateWithoutMemberInput>
  }

  export type CallAttemptUpdateManyWithWhereWithoutMemberInput = {
    where: CallAttemptScalarWhereInput
    data: XOR<CallAttemptUpdateManyMutationInput, CallAttemptUncheckedUpdateManyWithoutMemberInput>
  }

  export type AlertHistoryCreateWithoutCallAttemptsInput = {
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    alert: AlertCreateNestedOneWithoutAlertHistoryInput
    region: RegionCreateNestedOneWithoutAlertHistoryInput
    feedbackLogs?: FeedbackLogCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryUncheckedCreateWithoutCallAttemptsInput = {
    id?: number
    alertId: number
    regionId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
    feedbackLogs?: FeedbackLogUncheckedCreateNestedManyWithoutAlertHistoryInput
  }

  export type AlertHistoryCreateOrConnectWithoutCallAttemptsInput = {
    where: AlertHistoryWhereUniqueInput
    create: XOR<AlertHistoryCreateWithoutCallAttemptsInput, AlertHistoryUncheckedCreateWithoutCallAttemptsInput>
  }

  export type CommunityMemberCreateWithoutCallAttemptsInput = {
    fullName?: string | null
    phoneNumber: string
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    region: RegionCreateNestedOneWithoutCommunityMembersInput
    community?: CommunityCreateNestedOneWithoutMembersInput
  }

  export type CommunityMemberUncheckedCreateWithoutCallAttemptsInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    regionId: number
    communityId?: number | null
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunityMemberCreateOrConnectWithoutCallAttemptsInput = {
    where: CommunityMemberWhereUniqueInput
    create: XOR<CommunityMemberCreateWithoutCallAttemptsInput, CommunityMemberUncheckedCreateWithoutCallAttemptsInput>
  }

  export type AlertHistoryUpsertWithoutCallAttemptsInput = {
    update: XOR<AlertHistoryUpdateWithoutCallAttemptsInput, AlertHistoryUncheckedUpdateWithoutCallAttemptsInput>
    create: XOR<AlertHistoryCreateWithoutCallAttemptsInput, AlertHistoryUncheckedCreateWithoutCallAttemptsInput>
    where?: AlertHistoryWhereInput
  }

  export type AlertHistoryUpdateToOneWithWhereWithoutCallAttemptsInput = {
    where?: AlertHistoryWhereInput
    data: XOR<AlertHistoryUpdateWithoutCallAttemptsInput, AlertHistoryUncheckedUpdateWithoutCallAttemptsInput>
  }

  export type AlertHistoryUpdateWithoutCallAttemptsInput = {
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    alert?: AlertUpdateOneRequiredWithoutAlertHistoryNestedInput
    region?: RegionUpdateOneRequiredWithoutAlertHistoryNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateWithoutCallAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutAlertHistoryNestedInput
  }

  export type CommunityMemberUpsertWithoutCallAttemptsInput = {
    update: XOR<CommunityMemberUpdateWithoutCallAttemptsInput, CommunityMemberUncheckedUpdateWithoutCallAttemptsInput>
    create: XOR<CommunityMemberCreateWithoutCallAttemptsInput, CommunityMemberUncheckedCreateWithoutCallAttemptsInput>
    where?: CommunityMemberWhereInput
  }

  export type CommunityMemberUpdateToOneWithWhereWithoutCallAttemptsInput = {
    where?: CommunityMemberWhereInput
    data: XOR<CommunityMemberUpdateWithoutCallAttemptsInput, CommunityMemberUncheckedUpdateWithoutCallAttemptsInput>
  }

  export type CommunityMemberUpdateWithoutCallAttemptsInput = {
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutCommunityMembersNestedInput
    community?: CommunityUpdateOneWithoutMembersNestedInput
  }

  export type CommunityMemberUncheckedUpdateWithoutCallAttemptsInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    regionId?: IntFieldUpdateOperationsInput | number
    communityId?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateManyCreatedByUserInput = {
    id?: number
    hazardTypeId: number
    severityLevel: string
    rawScientificDescription: string
    createdAt?: Date | string
  }

  export type AlertUpdateWithoutCreatedByUserInput = {
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    hazardType?: HazardTypeUpdateOneRequiredWithoutAlertsNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutAlertNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateWithoutCreatedByUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutAlertNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateManyWithoutCreatedByUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityCreateManyRegionInput = {
    id?: number
    name: string
    totalRegistered?: number
    registrationDate?: Date | string
    source?: string | null
    status?: string | null
    actions?: string | null
    createdAt?: Date | string
  }

  export type AlertRegionCreateManyRegionInput = {
    alertId: number
  }

  export type AlertHistoryCreateManyRegionInput = {
    id?: number
    alertId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
  }

  export type FeedbackLogCreateManyRegionInput = {
    id?: number
    alertHistoryId: number
    hazardTypeId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CommunityMemberCreateManyRegionInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    communityId?: number | null
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunityUpdateWithoutRegionInput = {
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: CommunityMemberUpdateManyWithoutCommunityNestedInput
  }

  export type CommunityUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: CommunityMemberUncheckedUpdateManyWithoutCommunityNestedInput
  }

  export type CommunityUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    totalRegistered?: IntFieldUpdateOperationsInput | number
    registrationDate?: DateTimeFieldUpdateOperationsInput | Date | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    status?: NullableStringFieldUpdateOperationsInput | string | null
    actions?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRegionUpdateWithoutRegionInput = {
    alert?: AlertUpdateOneRequiredWithoutAlertRegionsNestedInput
  }

  export type AlertRegionUncheckedUpdateWithoutRegionInput = {
    alertId?: IntFieldUpdateOperationsInput | number
  }

  export type AlertRegionUncheckedUpdateManyWithoutRegionInput = {
    alertId?: IntFieldUpdateOperationsInput | number
  }

  export type AlertHistoryUpdateWithoutRegionInput = {
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    alert?: AlertUpdateOneRequiredWithoutAlertHistoryNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedbackLogUpdateWithoutRegionInput = {
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertHistory?: AlertHistoryUpdateOneRequiredWithoutFeedbackLogsNestedInput
    hazardType?: HazardTypeUpdateOneRequiredWithoutFeedbackLogsNestedInput
  }

  export type FeedbackLogUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLogUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityMemberUpdateWithoutRegionInput = {
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    community?: CommunityUpdateOneWithoutMembersNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutMemberNestedInput
  }

  export type CommunityMemberUncheckedUpdateWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    communityId?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CommunityMemberUncheckedUpdateManyWithoutRegionInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    communityId?: NullableIntFieldUpdateOperationsInput | number | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertCreateManyHazardTypeInput = {
    id?: number
    severityLevel: string
    rawScientificDescription: string
    createdByUserId?: number | null
    createdAt?: Date | string
  }

  export type FeedbackLogCreateManyHazardTypeInput = {
    id?: number
    alertHistoryId: number
    regionId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type AlertUpdateWithoutHazardTypeInput = {
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdByUser?: UserUpdateOneWithoutAlertsNestedInput
    alertRegions?: AlertRegionUpdateManyWithoutAlertNestedInput
    alertHistory?: AlertHistoryUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateWithoutHazardTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertRegions?: AlertRegionUncheckedUpdateManyWithoutAlertNestedInput
    alertHistory?: AlertHistoryUncheckedUpdateManyWithoutAlertNestedInput
  }

  export type AlertUncheckedUpdateManyWithoutHazardTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    severityLevel?: StringFieldUpdateOperationsInput | string
    rawScientificDescription?: StringFieldUpdateOperationsInput | string
    createdByUserId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLogUpdateWithoutHazardTypeInput = {
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertHistory?: AlertHistoryUpdateOneRequiredWithoutFeedbackLogsNestedInput
    region?: RegionUpdateOneRequiredWithoutFeedbackLogsNestedInput
  }

  export type FeedbackLogUncheckedUpdateWithoutHazardTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLogUncheckedUpdateManyWithoutHazardTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CommunityMemberCreateManyCommunityInput = {
    id?: number
    fullName?: string | null
    phoneNumber: string
    regionId: number
    language?: string | null
    dialect?: string | null
    isActive?: boolean
    consent?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CommunityMemberUpdateWithoutCommunityInput = {
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutCommunityMembersNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutMemberNestedInput
  }

  export type CommunityMemberUncheckedUpdateWithoutCommunityInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    regionId?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutMemberNestedInput
  }

  export type CommunityMemberUncheckedUpdateManyWithoutCommunityInput = {
    id?: IntFieldUpdateOperationsInput | number
    fullName?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    regionId?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    isActive?: BoolFieldUpdateOperationsInput | boolean
    consent?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AlertRegionCreateManyAlertInput = {
    regionId: number
  }

  export type AlertHistoryCreateManyAlertInput = {
    id?: number
    regionId: number
    dialect: string
    status?: string
    callsCount?: number
    dispatchedAt?: Date | string
    simplifiedText?: string | null
    translatedText?: string | null
    audioUrl?: string | null
  }

  export type AlertRegionUpdateWithoutAlertInput = {
    region?: RegionUpdateOneRequiredWithoutAlertRegionsNestedInput
  }

  export type AlertRegionUncheckedUpdateWithoutAlertInput = {
    regionId?: IntFieldUpdateOperationsInput | number
  }

  export type AlertRegionUncheckedUpdateManyWithoutAlertInput = {
    regionId?: IntFieldUpdateOperationsInput | number
  }

  export type AlertHistoryUpdateWithoutAlertInput = {
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    region?: RegionUpdateOneRequiredWithoutAlertHistoryNestedInput
    feedbackLogs?: FeedbackLogUpdateManyWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateWithoutAlertInput = {
    id?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
    feedbackLogs?: FeedbackLogUncheckedUpdateManyWithoutAlertHistoryNestedInput
    callAttempts?: CallAttemptUncheckedUpdateManyWithoutAlertHistoryNestedInput
  }

  export type AlertHistoryUncheckedUpdateManyWithoutAlertInput = {
    id?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    dialect?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    callsCount?: IntFieldUpdateOperationsInput | number
    dispatchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    simplifiedText?: NullableStringFieldUpdateOperationsInput | string | null
    translatedText?: NullableStringFieldUpdateOperationsInput | string | null
    audioUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type FeedbackLogCreateManyAlertHistoryInput = {
    id?: number
    regionId: number
    hazardTypeId: number
    audioFeedbackUrl?: string | null
    translationText?: string | null
    status?: string
    adminResponse?: string | null
    respondedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CallAttemptCreateManyAlertHistoryInput = {
    id?: number
    memberId?: number | null
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type FeedbackLogUpdateWithoutAlertHistoryInput = {
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    region?: RegionUpdateOneRequiredWithoutFeedbackLogsNestedInput
    hazardType?: HazardTypeUpdateOneRequiredWithoutFeedbackLogsNestedInput
  }

  export type FeedbackLogUncheckedUpdateWithoutAlertHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FeedbackLogUncheckedUpdateManyWithoutAlertHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    regionId?: IntFieldUpdateOperationsInput | number
    hazardTypeId?: IntFieldUpdateOperationsInput | number
    audioFeedbackUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translationText?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    adminResponse?: NullableStringFieldUpdateOperationsInput | string | null
    respondedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptUpdateWithoutAlertHistoryInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    member?: CommunityMemberUpdateOneWithoutCallAttemptsNestedInput
  }

  export type CallAttemptUncheckedUpdateWithoutAlertHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberId?: NullableIntFieldUpdateOperationsInput | number | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptUncheckedUpdateManyWithoutAlertHistoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    memberId?: NullableIntFieldUpdateOperationsInput | number | null
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptCreateManyMemberInput = {
    id?: number
    alertHistoryId: number
    phoneNumber: string
    channel?: string
    status?: string
    provider?: string | null
    providerCallId?: string | null
    language?: string | null
    dialect?: string | null
    attemptCount?: number
    lastAttemptAt?: Date | string | null
    completedAt?: Date | string | null
    failureReason?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CallAttemptUpdateWithoutMemberInput = {
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    alertHistory?: AlertHistoryUpdateOneRequiredWithoutCallAttemptsNestedInput
  }

  export type CallAttemptUncheckedUpdateWithoutMemberInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CallAttemptUncheckedUpdateManyWithoutMemberInput = {
    id?: IntFieldUpdateOperationsInput | number
    alertHistoryId?: IntFieldUpdateOperationsInput | number
    phoneNumber?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    provider?: NullableStringFieldUpdateOperationsInput | string | null
    providerCallId?: NullableStringFieldUpdateOperationsInput | string | null
    language?: NullableStringFieldUpdateOperationsInput | string | null
    dialect?: NullableStringFieldUpdateOperationsInput | string | null
    attemptCount?: IntFieldUpdateOperationsInput | number
    lastAttemptAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    failureReason?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RegionCountOutputTypeDefaultArgs instead
     */
    export type RegionCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RegionCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HazardTypeCountOutputTypeDefaultArgs instead
     */
    export type HazardTypeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HazardTypeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommunityCountOutputTypeDefaultArgs instead
     */
    export type CommunityCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommunityCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertCountOutputTypeDefaultArgs instead
     */
    export type AlertCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertHistoryCountOutputTypeDefaultArgs instead
     */
    export type AlertHistoryCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertHistoryCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommunityMemberCountOutputTypeDefaultArgs instead
     */
    export type CommunityMemberCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommunityMemberCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RegionDefaultArgs instead
     */
    export type RegionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RegionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use HazardTypeDefaultArgs instead
     */
    export type HazardTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = HazardTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommunityDefaultArgs instead
     */
    export type CommunityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommunityDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertDefaultArgs instead
     */
    export type AlertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertRegionDefaultArgs instead
     */
    export type AlertRegionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertRegionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AlertHistoryDefaultArgs instead
     */
    export type AlertHistoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AlertHistoryDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeedbackLogDefaultArgs instead
     */
    export type FeedbackLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeedbackLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CommunityMemberDefaultArgs instead
     */
    export type CommunityMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CommunityMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CallAttemptDefaultArgs instead
     */
    export type CallAttemptArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CallAttemptDefaultArgs<ExtArgs>
    /**
     * @deprecated Use IvrConfigDefaultArgs instead
     */
    export type IvrConfigArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = IvrConfigDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}