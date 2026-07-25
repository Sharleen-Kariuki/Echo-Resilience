
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  fullName: 'fullName',
  email: 'email',
  passwordHash: 'passwordHash',
  role: 'role',
  lastLogin: 'lastLogin',
  createdAt: 'createdAt'
};

exports.Prisma.RegionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  latitude: 'latitude',
  longitude: 'longitude'
};

exports.Prisma.HazardTypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CommunityScalarFieldEnum = {
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

exports.Prisma.AlertScalarFieldEnum = {
  id: 'id',
  hazardTypeId: 'hazardTypeId',
  severityLevel: 'severityLevel',
  rawScientificDescription: 'rawScientificDescription',
  createdByUserId: 'createdByUserId',
  createdAt: 'createdAt'
};

exports.Prisma.AlertRegionScalarFieldEnum = {
  alertId: 'alertId',
  regionId: 'regionId'
};

exports.Prisma.AlertHistoryScalarFieldEnum = {
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

exports.Prisma.FeedbackLogScalarFieldEnum = {
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

exports.Prisma.CommunityMemberScalarFieldEnum = {
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

exports.Prisma.CallAttemptScalarFieldEnum = {
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

exports.Prisma.IvrConfigScalarFieldEnum = {
  id: 'id',
  provider: 'provider',
  voicePhoneNumber: 'voicePhoneNumber',
  defaultLanguage: 'defaultLanguage',
  isActive: 'isActive',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.user_role = exports.$Enums.user_role = {
  superadmin: 'superadmin',
  admin: 'admin',
  viewer: 'viewer'
};

exports.Prisma.ModelName = {
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

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
