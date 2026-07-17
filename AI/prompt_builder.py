"""
prompt_builder.py

Builds the prompt sent to Gemini for the outbound alert pipeline:
raw scientific alert -> simplified English -> translated dialect -> structured data.

Scope for this build: Somali and Amharic only. Kept deliberately small and
clean for a hackathon demo — add more dialects later by extending
SUPPORTED_DIALECTS and adding a matching few-shot example.
"""

SUPPORTED_DIALECTS = ["Somali", "Amharic"]

SYSTEM_PROMPT = """You are a disaster-alert simplification and translation engine for \
EchoResilience, a system that turns ICPAC scientific climate alerts into life-saving \
messages for communities in Arid and Semi-Arid Lands (ASALs) in the Horn of Africa.

Given one raw scientific alert, you will:
1. SIMPLIFY it into plain, short, action-first language a person with no scientific \
education can understand and act on immediately. Assume it will be read aloud over a \
phone call or sent as an SMS with a strict character limit.
2. TRANSLATE the simplified version into the target dialect, preserving urgency and \
meaning over literal word-for-word accuracy. Prefer locally understood, everyday \
phrasing over textbook translation.
3. EXTRACT structured fields: hazard type, urgency level, and the single most \
important recommended action.

Rules:
- Never invent facts, locations, or numbers not present in the original alert.
- Simplified English output must be under 300 characters (SMS-safe).
- Lead with the action, not the meteorology.
- Convert technical units (mm, hPa, km/h) into plain severity language.
- Output ONLY valid JSON. No markdown fences, no preamble, no commentary.

Return exactly this JSON shape:
{
  "hazard_type": "string, e.g. Flood, Drought, Locust, Extreme Heat",
  "urgency": "Low | Moderate | High | Critical",
  "recommended_action": "string, one short imperative sentence in English",
  "simplified_en": "string, under 300 characters, plain English",
  "translated_text": "string, translation of simplified_en into the target dialect",
  "target_dialect": "string, the dialect you translated into",
  "translation_confidence": 0.0
}"""

FEW_SHOT_EXAMPLES = [
    {
        "raw_alert": (
            "Heavy convective precipitation exceeding 180 mm is expected across the "
            "region within the next 24 hours. Significant flash flooding is probable."
        ),
        "target_dialect": "Somali",
        "response": {
            "hazard_type": "Flood",
            "urgency": "Critical",
            "recommended_action": "Move people and livestock to higher ground now.",
            "simplified_en": (
                "Warning: very heavy rain is coming tomorrow. Flash floods are likely. "
                "Move your family and animals to higher ground now. Avoid crossing rivers."
            ),
            "translated_text": (
                "Digniin: roob aad u xoog badan ayaa soo socda berri. Daadad degdeg ah "
                "ayaa suurtagal ah. Hadda u guuri qoyskaaga iyo xoolahaaga meel sare. "
                "Ha ka gudbin webiyada."
            ),
            "target_dialect": "Somali",
            "translation_confidence": 0.85,
        },
    },
    {
        "raw_alert": (
            "Below-average cumulative rainfall (less than 40% of the long-term mean) has "
            "been recorded over the past two rainfall seasons, indicating high probability "
            "of severe pasture and water scarcity."
        ),
        "target_dialect": "Amharic",
        "response": {
            "hazard_type": "Drought",
            "urgency": "High",
            "recommended_action": "Move herds toward known water points early.",
            "simplified_en": (
                "Very little rain has fallen for two seasons. Grass and water will be "
                "scarce soon. Move animals toward water sources early and plan ahead."
            ),
            "translated_text": (
                "ለሁለት የዝናብ ወቅቶች በጣም ትንሽ ዝናብ ወርዷል። ሳርና ውሃ በቅርቡ እጥረት ይገጥመዋል። "
                "እንስሳትን ወደ ውሃ ምንጮች ቀድመው ያንቀሳቅሱ እና አስቀድመው ያቅዱ።"
            ),
            "target_dialect": "Amharic",
            "translation_confidence": 0.8,
        },
    },
]


def build_prompt(raw_alert: str, target_dialect: str, severity_level: str | None = None) -> dict:
    """Build the system + user prompt for one alert."""
    if target_dialect not in SUPPORTED_DIALECTS:
        raise ValueError(f"'{target_dialect}' not supported. Choose from: {SUPPORTED_DIALECTS}")

    examples_text = ""
    for ex in FEW_SHOT_EXAMPLES:
        examples_text += (
            f"\n---\nEXAMPLE INPUT:\nraw_alert: {ex['raw_alert']}\n"
            f"target_dialect: {ex['target_dialect']}\n"
            f"EXAMPLE OUTPUT:\n{ex['response']}\n"
        )

    severity_hint = f"\nAdmin-tagged severity level: {severity_level}" if severity_level else ""

    user_prompt = (
        f"Worked examples:\n{examples_text}\n"
        f"---\nNow process this new alert.\n\n"
        f"raw_alert: {raw_alert}\n"
        f"target_dialect: {target_dialect}"
        f"{severity_hint}\n\n"
        f"Return only the JSON object, nothing else."
    )

    return {"system": SYSTEM_PROMPT, "user": user_prompt}


# ---------------------------------------------------------------------------
# Inbound feedback: speech-to-text + translate + extract
# ---------------------------------------------------------------------------

FEEDBACK_SYSTEM_PROMPT = """You are a disaster-feedback transcription and translation \
engine for EchoResilience. Communities call a toll-free number to report ground-truth \
conditions (floods, locust sightings, drought, etc.) in their own dialect. You will be \
given an audio recording of one such call.

Your job:
1. TRANSCRIBE the audio exactly as spoken, in the original dialect.
2. TRANSLATE that transcript into clear English.
3. EXTRACT structured fields: hazard type being reported (if any), and a rough urgency \
impression based on tone and content.

Rules:
- If the audio is unclear or you cannot confidently transcribe it, set \
"transcription_confidence" below 0.5 and still return your best attempt.
- If you cannot identify a hazard type, set hazard_type to "Unclear" rather than guessing.
- Keep the English translation faithful to what was actually said.
- Output ONLY valid JSON, no markdown fences, no commentary.

Return exactly this JSON shape:
{
  "raw_transcript": "string, the original-dialect transcription",
  "translated_text": "string, English translation of the transcript",
  "detected_dialect": "string, your best guess at which dialect was spoken",
  "hazard_type": "string, e.g. Flood, Drought, Locust, Unclear",
  "urgency_impression": "Low | Moderate | High | Critical | Unclear",
  "transcription_confidence": 0.0
}"""