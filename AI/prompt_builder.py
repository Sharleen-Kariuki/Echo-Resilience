"""
prompt_builder.py

Builds the system + user prompt sent to Gemini for the EchoResilience
"simplify -> translate -> extract" step.

Design goals:
- ONE Gemini call does simplification + translation + structured extraction.
- Output is forced into strict JSON so FastAPI can parse it directly into
  the alert_history table (simplified_text, translated_text, dialect, ...).
- Few-shot examples anchor tone/length (SMS-safe, IVR-readable, no jargon).
"""

# Languages Gemini will attempt directly. Turkana is deliberately excluded —
# see turkana_templates.py for why and how it's handled instead.
SUPPORTED_AI_DIALECTS = ["Somali", "Oromo", "Amharic", "Swahili"]

SYSTEM_PROMPT = """You are a disaster-alert simplification and translation engine for \
EchoResilience, a system that turns ICPAC scientific climate alerts into life-saving \
messages for pastoralist and farming communities in Arid and Semi-Arid Lands (ASALs) \
in the Horn of Africa.

Your job, given one raw scientific alert, is to:
1. SIMPLIFY it into plain, short, action-first language a person with no scientific \
education can understand and act on in seconds. Assume it will be read aloud over a \
phone call (IVR) or sent as an SMS with a strict character limit.
2. TRANSLATE the simplified version into the target dialect, preserving urgency and \
meaning over literal word-for-word accuracy. Prefer locally understood terms and \
familiar agricultural/pastoralist phrasing (e.g. "move your animals" rather than \
"relocate livestock assets") over textbook translation.
3. EXTRACT structured fields: hazard type, urgency level, and the single most \
important recommended action.

Rules:
- Never invent facts, locations, or numbers not present in the original alert.
- Simplified English output must be under 300 characters (SMS-safe).
- Lead with the action, not the meteorology. People need to know WHAT TO DO first.
- Do not use technical units (mm, hPa, km/h) in the simplified or translated text — \
convert them to plain severity language (e.g. "very heavy rain" not "180mm of rainfall").
- If you are not confident in the translation for the requested dialect, set \
"translation_confidence" below 0.6 and still return your best attempt — do not refuse.
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

# Few-shot examples anchor style and length. Keep these short and consistent
# with the system prompt's rules so the model doesn't drift on longer alerts.
FEW_SHOT_EXAMPLES = [
    {
        "raw_alert": (
            "Heavy convective precipitation exceeding 180 mm is expected across the "
            "Turkana Basin within the next 24 hours. Significant flash flooding is probable."
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
            "been recorded across Marsabit County over the past two rainfall seasons, "
            "indicating high probability of severe pasture and water scarcity."
        ),
        "target_dialect": "Oromo",
        "response": {
            "hazard_type": "Drought",
            "urgency": "High",
            "recommended_action": "Move herds toward known water points early and reduce herd size if possible.",
            "simplified_en": (
                "Very little rain has fallen in Marsabit for two seasons. Grass and water "
                "will be scarce soon. Move animals toward water sources early and plan ahead."
            ),
            "translated_text": (
                "Marsabit keessatti waggoota lama darban keessa bokkaan xiqqaa roobe. "
                "Marga fi bishaan dhiphachuu danda'a. Beeyladoota gara bishaanitti dafanii "
                "geeffachuu fi karoora dursa qabaachuu barbaachisa."
            ),
            "target_dialect": "Oromo",
            "translation_confidence": 0.8,
        },
    },
]


def build_messages(raw_alert: str, target_dialect: str, severity_level: str | None = None) -> dict:
    """
    Build the full prompt payload for the Gemini API call.

    Returns a dict with 'system' and 'user' text ready to drop into the
    Anthropic-style/Gemini-style messages array in gemini_client.py.
    """
    if target_dialect not in SUPPORTED_AI_DIALECTS:
        raise ValueError(
            f"'{target_dialect}' is not handled by the Gemini pipeline. "
            f"Supported: {SUPPORTED_AI_DIALECTS}. "
            f"For Turkana, use turkana_templates.py instead."
        )

    few_shot_text = ""
    for ex in FEW_SHOT_EXAMPLES:
        few_shot_text += (
            f"\n---\nEXAMPLE INPUT:\nraw_alert: {ex['raw_alert']}\n"
            f"target_dialect: {ex['target_dialect']}\n"
            f"EXAMPLE OUTPUT:\n{ex['response']}\n"
        )

    severity_hint = f"\nAdmin-tagged severity level: {severity_level}" if severity_level else ""

    user_prompt = (
        f"Here are worked examples of the expected input/output format:\n"
        f"{few_shot_text}\n"
        f"---\nNow process this new alert.\n\n"
        f"raw_alert: {raw_alert}\n"
        f"target_dialect: {target_dialect}"
        f"{severity_hint}\n\n"
        f"Return only the JSON object, nothing else."
    )

    return {"system": SYSTEM_PROMPT, "user": user_prompt}