const { Pool } = require('pg');
const pool = new Pool({ connectionString: 'postgresql://postgres:Sharleen@localhost:5432/echoresilience' });

// ── CONFIG — edit these two lines ──────────────────────────────────────────
// Your Twilio "From" phone number (from Twilio dashboard → Phone Numbers).
// Set to null to fall back to Africa's Talking SMS (sandbox).
const TWILIO_FROM_NUMBER = null; // e.g. '+12065551234'

// The number that should receive the test call/SMS
const TEST_PHONE_NUMBER = '+254721483296'; // ← replace with YOUR phone number
// ─────────────────────────────────────────────────────────────────────────

async function run() {
  console.log('=== EchoResilience IVR Seed ===\n');

  const regionRes = await pool.query('SELECT id, name FROM regions LIMIT 1');
  if (regionRes.rows.length === 0) {
    console.error('No regions found. Run the main database seed first.');
    return;
  }
  const region = regionRes.rows[0];
  console.log('Using region:', region.name, '(id=' + region.id + ')');

  // Upsert IvrConfig
  const existing = await pool.query('SELECT id FROM ivr_config LIMIT 1');
  let configId;
  if (existing.rows.length > 0) {
    configId = existing.rows[0].id;
    await pool.query(
      'UPDATE ivr_config SET provider=$1, voice_phone_number=$2, is_active=true WHERE id=$3',
      ['twilio', TWILIO_FROM_NUMBER, configId]
    );
    console.log('Updated IvrConfig id=' + configId);
  } else {
    const ins = await pool.query(
      "INSERT INTO ivr_config (provider, voice_phone_number, default_language, is_active, updated_at) VALUES ($1,$2,'en',true,NOW()) RETURNING id",
      ['twilio', TWILIO_FROM_NUMBER]
    );
    configId = ins.rows[0].id;
    console.log('Created IvrConfig id=' + configId);
  }

  // Add test community member
  const memberCheck = await pool.query(
    'SELECT id FROM community_members WHERE phone_number=$1',
    [TEST_PHONE_NUMBER]
  );
  if (memberCheck.rows.length === 0) {
    const memberRes = await pool.query(
      "INSERT INTO community_members (full_name, phone_number, region_id, language, is_active, consent, updated_at) VALUES ($1,$2,$3,'en',true,true,NOW()) RETURNING id",
      ['Demo Test User', TEST_PHONE_NUMBER, region.id]
    );
    console.log('Created community_member id=' + memberRes.rows[0].id + ' phone=' + TEST_PHONE_NUMBER);
  } else {
    console.log('Community member already exists: id=' + memberCheck.rows[0].id);
  }

  const configRow = await pool.query('SELECT * FROM ivr_config WHERE id=$1', [configId]);
  console.log('\nCurrent IvrConfig:');
  console.log(JSON.stringify(configRow.rows[0], null, 2));

  const channelNote = TWILIO_FROM_NUMBER
    ? 'Voice (Twilio) -> calls ' + TEST_PHONE_NUMBER + ' FROM ' + TWILIO_FROM_NUMBER
    : 'SMS (Africa\'s Talking sandbox) -> sends to ' + TEST_PHONE_NUMBER + '\n  Tip: Set TWILIO_FROM_NUMBER to enable actual voice calls';
  console.log('\nBroadcast channel: ' + channelNote);
  console.log('\nDone! Trigger a broadcast via:');
  console.log('  POST http://localhost:5002/api/ivr/history/{alertHistoryId}/broadcast');
}

run()
  .then(() => pool.end())
  .catch(e => { console.error('Error:', e.message); pool.end(); process.exit(1); });
