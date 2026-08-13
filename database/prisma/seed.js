import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Uses its own client (not src/client.js) so it stays free of the app's
// verbose query logging while seeding a large batch of rows.
const prisma = new PrismaClient();

const SEED_PASSWORD = 'Passw0rd!';

const REGIONS = [
  { name: 'Turkana Basin', latitude: 3.1167, longitude: 35.6 },
  { name: 'Marsabit North', latitude: 2.3284, longitude: 37.9899 },
  { name: 'Laisamis', latitude: 1.6167, longitude: 37.7833 },
  { name: 'Meru County', latitude: 0.2333, longitude: 37.9333 },
  { name: 'Tharaka-Nithi', latitude: -0.2833, longitude: 37.75 },
];

const HAZARD_TYPES = ['Flood', 'Drought', 'Heat Wave', 'Locust', 'Wind Storm', 'Landslide Risk'];

const USERS = [
  { fullName: 'Amara Ochieng', email: 'superadmin@echoresilience.org', role: 'superadmin' },
  { fullName: 'David Mwangi', email: 'admin@echoresilience.org', role: 'admin' },
  { fullName: 'Grace Wanjiru', email: 'viewer@echoresilience.org', role: 'viewer' },
];

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

async function clearExisting() {
  // Delete in FK-safe order (children before parents).
  await prisma.feedbackLog.deleteMany();
  await prisma.alertHistory.deleteMany();
  await prisma.member.deleteMany();
  await prisma.alertRegion.deleteMany();
  await prisma.alert.deleteMany();
  await prisma.community.deleteMany();
  await prisma.hazardType.deleteMany();
  await prisma.region.deleteMany();
  await prisma.user.deleteMany();
}

async function seedUsers() {
  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 12);
  const users = {};
  for (const user of USERS) {
    users[user.role] = await prisma.user.create({ data: { ...user, passwordHash } });
  }
  return users;
}

async function seedRegions() {
  const regions = {};
  for (const region of REGIONS) {
    regions[region.name] = await prisma.region.create({ data: region });
  }
  return regions;
}

async function seedHazardTypes() {
  const hazards = {};
  for (const name of HAZARD_TYPES) {
    hazards[name] = await prisma.hazardType.create({ data: { name } });
  }
  return hazards;
}

async function seedCommunities(regions) {
  const rows = [
    { name: 'Turkana Riverside Network', region: 'Turkana Basin', type: 'settlement', leaderPhone: '+254711200001', totalRegistered: 3420, source: 'self-registered', status: 'active' },
    { name: 'Lodwar Pastoralist Forum', region: 'Turkana Basin', type: 'village', leaderPhone: '+254711200002', totalRegistered: 1850, source: 'admin-added', status: 'active' },
    { name: 'Marsabit Herders Collective', region: 'Marsabit North', type: 'settlement', leaderPhone: '+254711200003', totalRegistered: 1180, source: 'admin-added', status: 'active' },
    { name: 'Sololo Women Water Committee', region: 'Marsabit North', type: 'ward', leaderPhone: '+254711200004', totalRegistered: 760, source: 'self-registered', status: 'active' },
    { name: "Laisamis Women's Group", region: 'Laisamis', type: 'village', leaderPhone: '+254711200005', totalRegistered: 640, source: 'self-registered', status: 'opted-out' },
    { name: 'Loglogo Youth Network', region: 'Laisamis', type: 'settlement', leaderPhone: '+254711200006', totalRegistered: 430, source: 'admin-added', status: 'active' },
    { name: 'Meru Highland Farmers', region: 'Meru County', type: 'ward', leaderPhone: '+254711200007', totalRegistered: 2205, source: 'self-registered', status: 'active' },
    { name: 'Meru Market Traders', region: 'Meru County', type: 'estate', leaderPhone: '+254711200008', totalRegistered: 1340, source: 'admin-added', status: 'active' },
    { name: 'Tharaka Relief Committee', region: 'Tharaka-Nithi', type: 'sub-location', leaderPhone: '+254711200009', totalRegistered: 890, source: 'admin-added', status: 'active' },
    { name: 'Chuka Hills Farmers Association', region: 'Tharaka-Nithi', type: 'village', leaderPhone: '+254711200010', totalRegistered: 975, source: 'self-registered', status: 'active' },
  ];

  const communities = {};
  for (const row of rows) {
    communities[row.name] = await prisma.community.create({
      data: {
        name: row.name,
        regionId: regions[row.region].id,
        totalRegistered: row.totalRegistered,
        type: row.type,
        leaderPhone: row.leaderPhone,
        source: row.source,
        status: row.status,
        registrationDate: daysAgo(30 + Math.floor(Math.random() * 200)),
      },
    });
  }
  return communities;
}

async function seedMembers(regions, communities) {
  const rows = [
    { fullName: 'Amina Ekiru', phone: '+254712300001', language: 'Turkana', locality: 'Kanamkemer', region: 'Turkana Basin', community: 'Turkana Riverside Network' },
    { fullName: 'Samuel Lomuria', phone: '+254712300002', language: 'Turkana', locality: 'Lodwar Central', region: 'Turkana Basin', community: 'Lodwar Pastoralist Forum' },
    { fullName: 'Hawa Galgalo', phone: '+254712300003', language: 'Oromo', locality: 'Sololo', region: 'Marsabit North', community: 'Sololo Women Water Committee' },
    { fullName: 'Abdi Jillo', phone: '+254712300004', language: 'Oromo', locality: 'Marsabit Town', region: 'Marsabit North', community: 'Marsabit Herders Collective' },
    { fullName: 'Fatuma Diba', phone: '+254712300005', language: 'Somali', locality: 'Laisamis', region: 'Laisamis', community: "Laisamis Women's Group", status: 'opted-out' },
    { fullName: 'Martha Kendi', phone: '+254712300006', language: 'Swahili', locality: 'Imenti North', region: 'Meru County', community: 'Meru Highland Farmers' },
    { fullName: 'Peter Muriuki', phone: '+254712300007', language: 'Swahili', locality: 'Meru Town', region: 'Meru County', community: 'Meru Market Traders' },
    { fullName: 'Joyce Muthoni', phone: '+254712300008', language: 'Amharic', locality: 'Chuka', region: 'Tharaka-Nithi', community: 'Chuka Hills Farmers Association' },
  ];
  for (const row of rows) {
    const { region, community, ...member } = row;
    await prisma.member.create({
      data: {
        ...member,
        regionId: regions[region].id,
        communityId: communities[community].id,
        source: 'admin-added',
        status: member.status ?? 'active',
      },
    });
  }
}

async function seedAlerts(hazards, regions, users) {
  const specs = [
    {
      hazard: 'Flood',
      severity: 'Critical',
      description:
        'Heavy convective precipitation exceeding 180mm is expected across low-lying settlements, with elevated river overflow risk and road access disruption.',
      regions: ['Turkana Basin', 'Marsabit North'],
      createdBy: 'superadmin',
    },
    {
      hazard: 'Drought',
      severity: 'High',
      description: 'Pasture stress and water scarcity are expected to worsen over the next two weeks across grazing corridors.',
      regions: ['Laisamis'],
      createdBy: 'admin',
    },
    {
      hazard: 'Heat Wave',
      severity: 'High',
      description: 'Sustained temperatures above 40°C are forecast, with elevated heatstroke risk for outdoor and agricultural workers.',
      regions: ['Meru County'],
      createdBy: 'admin',
    },
    {
      hazard: 'Locust',
      severity: 'Moderate',
      description: 'Desert locust swarms are migrating south, posing a crop damage risk across agricultural zones.',
      regions: ['Tharaka-Nithi', 'Meru County'],
      createdBy: 'superadmin',
    },
    {
      hazard: 'Wind Storm',
      severity: 'High',
      description: 'Strong gale-force winds are expected, with risk to temporary structures and livestock shelters.',
      regions: ['Marsabit North'],
      createdBy: 'admin',
    },
    {
      hazard: 'Landslide Risk',
      severity: 'Critical',
      description: 'Saturated slopes following prolonged rainfall pose an elevated landslide risk across highland areas.',
      regions: ['Tharaka-Nithi'],
      createdBy: 'superadmin',
    },
  ];

  const alerts = [];
  for (const spec of specs) {
    const alert = await prisma.alert.create({
      data: {
        hazardTypeId: hazards[spec.hazard].id,
        severityLevel: spec.severity,
        rawScientificDescription: spec.description,
        createdByUserId: users[spec.createdBy].id,
        alertRegions: { create: spec.regions.map((name) => ({ regionId: regions[name].id })) },
      },
    });
    alerts.push({ ...alert, hazardName: spec.hazard, regionNames: spec.regions });
  }
  return alerts;
}

async function seedAlertHistory(alerts, regions) {
  // region -> supported dialect (from GET /api/dialects), just for plausible variety.
  const dialectByRegion = {
    'Turkana Basin': 'Turkana',
    'Marsabit North': 'Oromo',
    Laisamis: 'Somali',
    'Meru County': 'Swahili',
    'Tharaka-Nithi': 'Amharic',
  };

  const previews = {
    Flood: {
      simplifiedText: 'Flood risk is high. Move away from river banks and follow local officials.',
      translatedText: 'Khatarta fatahaaddu way sarreysaa. Ka fogow webiyada oo raac tilmaamaha masuuliyiinta.',
    },
    Drought: {
      simplifiedText: 'Water is becoming scarce. Ration supplies and move livestock toward known water points early.',
      translatedText: 'Bishaan hin jiru. Bishaan kuusaa fi bineensota gara bakka bishaanii dursanii geessaa.',
    },
  };

  const rows = [
    { alertIndex: 0, region: 'Turkana Basin', status: 'dispatched', calls: 12402, daysAgo: 2 },
    { alertIndex: 0, region: 'Marsabit North', status: 'dispatched', calls: 8950, daysAgo: 3 },
    { alertIndex: 0, region: 'Turkana Basin', status: 'dispatched', calls: 15000, daysAgo: 9 },
    { alertIndex: 1, region: 'Laisamis', status: 'in_progress', calls: 4200, daysAgo: 1 },
    { alertIndex: 1, region: 'Laisamis', status: 'dispatched', calls: 5200, daysAgo: 8 },
    { alertIndex: 2, region: 'Meru County', status: 'dispatched', calls: 25110, daysAgo: 5 },
    { alertIndex: 3, region: 'Tharaka-Nithi', status: 'failed', calls: 0, daysAgo: 6 },
    { alertIndex: 3, region: 'Meru County', status: 'dispatched', calls: 6300, daysAgo: 4 },
    { alertIndex: 4, region: 'Marsabit North', status: 'dispatched', calls: 9100, daysAgo: 7 },
    { alertIndex: 5, region: 'Tharaka-Nithi', status: 'in_progress', calls: 3100, daysAgo: 1 },
    { alertIndex: 5, region: 'Tharaka-Nithi', status: 'dispatched', calls: 7400, daysAgo: 10 },
    { alertIndex: 2, region: 'Meru County', status: 'dispatched', calls: 18200, daysAgo: 12 },
  ];

  const history = [];
  for (const row of rows) {
    const alert = alerts[row.alertIndex];
    const preview = previews[alert.hazardName];
    const entry = await prisma.alertHistory.create({
      data: {
        alertId: alert.id,
        regionId: regions[row.region].id,
        dialect: dialectByRegion[row.region],
        status: row.status,
        callsCount: row.calls,
        dispatchedAt: daysAgo(row.daysAgo),
        simplifiedText: preview?.simplifiedText,
        translatedText: preview?.translatedText,
        audioUrl: row.status === 'dispatched' ? `/api/alerts/${alert.id}/audio/${dialectByRegion[row.region]}` : null,
      },
    });
    history.push({ ...entry, hazardName: alert.hazardName, regionName: row.region });
  }
  return history;
}

async function seedFeedback(history, regions, hazards) {
  const alertHistoryByHazard = (hazardName) => history.filter((row) => row.hazardName === hazardName);

  const rows = [
    {
      hazard: 'Flood',
      region: 'Turkana Basin',
      status: 'resolved',
      translationText: 'Water levels are rising near the old bridge. We moved sandbags into place as advised.',
      daysAgo: 2,
      adminResponse: 'Thank you for confirming — a rapid-response team has been dispatched to your area.',
    },
    {
      hazard: 'Flood',
      region: 'Marsabit North',
      status: 'processed',
      translationText: 'The river has not overflowed yet but water is close to the banks. Please keep monitoring.',
      daysAgo: 3,
    },
    {
      hazard: 'Drought',
      region: 'Laisamis',
      status: 'pending',
      translationText: 'The water point is nearly empty and livestock are moving south in search of pasture.',
      daysAgo: 1,
    },
    {
      hazard: 'Heat Wave',
      region: 'Meru County',
      status: 'processed',
      translationText: 'Several elderly residents are struggling with the heat. We need shaded rest areas.',
      daysAgo: 5,
    },
    {
      hazard: 'Locust',
      region: 'Tharaka-Nithi',
      status: 'pending',
      translationText: 'No locust swarms sighted here yet, but neighboring farms report crop damage.',
      daysAgo: 6,
    },
    {
      hazard: 'Locust',
      region: 'Meru County',
      status: 'resolved',
      translationText: 'Swarms passed through but local spraying limited the damage. Situation is under control now.',
      daysAgo: 4,
      adminResponse: 'Glad to hear the spraying effort worked — marking this as resolved.',
    },
    {
      hazard: 'Wind Storm',
      region: 'Marsabit North',
      status: 'processed',
      translationText: 'Several temporary shelters lost their roofing overnight. No injuries reported.',
      daysAgo: 7,
    },
    {
      hazard: 'Landslide Risk',
      region: 'Tharaka-Nithi',
      status: 'pending',
      translationText: 'Cracks have appeared on the hillside path above the village. We are avoiding that route.',
      daysAgo: 1,
    },
  ];

  for (const row of rows) {
    const candidates = alertHistoryByHazard(row.hazard).filter((entry) => entry.regionName === row.region);
    const alertHistory = candidates[0] ?? alertHistoryByHazard(row.hazard)[0];
    if (!alertHistory) continue;

    await prisma.feedbackLog.create({
      data: {
        alertHistoryId: alertHistory.id,
        regionId: regions[row.region].id,
        hazardTypeId: hazards[row.hazard].id,
        translationText: row.translationText,
        status: row.status,
        adminResponse: row.adminResponse,
        respondedAt: row.adminResponse ? daysAgo(Math.max(0, row.daysAgo - 1)) : null,
        createdAt: daysAgo(row.daysAgo),
      },
    });
  }
}

async function main() {
  console.log('Clearing existing data...');
  await clearExisting();

  console.log('Seeding users...');
  const users = await seedUsers();

  console.log('Seeding regions...');
  const regions = await seedRegions();

  console.log('Seeding hazard types...');
  const hazards = await seedHazardTypes();

  console.log('Seeding communities...');
  const communities = await seedCommunities(regions);

  console.log('Seeding members...');
  await seedMembers(regions, communities);

  console.log('Seeding alerts...');
  const alerts = await seedAlerts(hazards, regions, users);

  console.log('Seeding alert history...');
  const history = await seedAlertHistory(alerts, regions);

  console.log('Seeding feedback logs...');
  await seedFeedback(history, regions, hazards);

  console.log('\nSeed complete. Sign in with any of:');
  for (const user of USERS) {
    console.log(`  ${user.email}  (${user.role})  — password: ${SEED_PASSWORD}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
