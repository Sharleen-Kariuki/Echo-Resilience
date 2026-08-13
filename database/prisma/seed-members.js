import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rows = [
  { fullName: 'Amina Ekiru', phone: '+254712300001', language: 'Turkana', locality: 'Kanamkemer', region: 'Turkana Basin', community: 'Turkana Riverside Network', source: 'admin-added', status: 'active' },
  { fullName: 'Samuel Lomuria', phone: '+254712300002', language: 'Turkana', locality: 'Lodwar Central', region: 'Turkana Basin', community: 'Turkana Fisherfolk Alliance', source: 'self-registered', status: 'active' },
  { fullName: 'Hawa Galgalo', phone: '+254712300003', language: 'Oromo', locality: 'Sololo', region: 'Marsabit North', community: 'Marsabit Herders Collective', source: 'admin-added', status: 'active' },
  { fullName: 'Abdi Jillo', phone: '+254712300004', language: 'Oromo', locality: 'Marsabit Town', region: 'Marsabit North', community: 'Marsabit Youth Network', source: 'self-registered', status: 'opted-out' },
  { fullName: 'Fatuma Diba', phone: '+254712300005', language: 'Somali', locality: 'Laisamis', region: 'Laisamis', community: "Laisamis Women's Group", source: 'self-registered', status: 'opted-out' },
  { fullName: 'Hassan Wario', phone: '+254712300006', language: 'Somali', locality: 'Loglogo', region: 'Laisamis', community: "Laisamis Women's Group", source: 'admin-added', status: 'active' },
  { fullName: 'Martha Kendi', phone: '+254712300007', language: 'Swahili', locality: 'Imenti North', region: 'Meru County', community: 'Meru Highland Farmers', source: 'self-registered', status: 'active' },
  { fullName: 'Peter Muriuki', phone: '+254712300008', language: 'Swahili', locality: 'Meru Town', region: 'Meru County', community: 'Meru Market Traders', source: 'admin-added', status: 'active' },
  { fullName: 'Joyce Muthoni', phone: '+254712300009', language: 'Amharic', locality: 'Chuka', region: 'Tharaka-Nithi', community: 'Tharaka Relief Committee', source: 'admin-added', status: 'active' },
  { fullName: 'Daniel Mwangi', phone: '+254712300010', language: 'Amharic', locality: 'Maara', region: 'Tharaka-Nithi', community: 'Tharaka Relief Committee', source: 'self-registered', status: 'active' },
];

async function main() {
  for (const { region: regionName, community: communityName, ...member } of rows) {
    const [region, community] = await Promise.all([
      prisma.region.findUnique({ where: { name: regionName } }),
      prisma.community.findFirst({ where: { name: communityName } }),
    ]);

    if (!region || !community) {
      throw new Error(`Missing seed target for ${member.fullName}: ${regionName} / ${communityName}`);
    }

    await prisma.member.upsert({
      where: { phone: member.phone },
      create: { ...member, regionId: region.id, communityId: community.id },
      update: { ...member, regionId: region.id, communityId: community.id },
    });
  }

  console.log(`Upserted ${rows.length} sample members.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
