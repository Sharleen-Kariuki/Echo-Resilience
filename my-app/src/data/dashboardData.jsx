import { TriangleAlert, Phone, MessageCircle, MapPin } from "lucide-react";

// When you wire up the backend, replace these with fetched data.
// The component props stay identical, so nothing in the UI needs to change.

export const stats = [
  {
    icon: TriangleAlert,
    tone: "red",
    caption: "+2 since yesterday",
    label: "Active Alerts",
    value: "12",
    progress: 0.55,
  },
  {
    icon: Phone,
    tone: "red",
    caption: "98% success rate",
    label: "Calls Sent Today",
    value: "1,450",
    progress: 0.62,
  },
  {
    icon: MessageCircle,
    tone: "green",
    caption: "New responses",
    label: "Feedback Received",
    value: "89",
    unit: "new",
    progress: 0.42,
  },
  {
    icon: MapPin,
    tone: "neutral",
    caption: "Operational",
    label: "Regions Covered",
    value: "24",
    unit: "districts",
    progress: 0.7,
  },
];

export const alerts = [
  { id: "AL-8924", type: "Flood Warning", region: "Riverside Basin", status: "CRITICAL", time: "12 mins ago" },
  { id: "AL-8923", type: "Heat Wave", region: "Central Valley", status: "ONGOING", time: "1 hour ago" },
  { id: "AL-8922", type: "Air Quality", region: "West Industrial", status: "RESOLVED", time: "4 hours ago" },
  { id: "AL-8921", type: "Storm Surge", region: "Coastal Zone A", status: "CRITICAL", time: "6 hours ago" },
  { id: "AL-8920", type: "Drought Monitor", region: "North Highlands", status: "MONITORING", time: "10 hours ago" },
];

export const feedback = [
  {
    id: 1,
    name: "Resident 4022",
    time: "Now",
    quote: "Water levels are rising near the old bridge. Need immediate sandbags.",
    tags: ["RIVERSIDE", "URGENT"],
    highlight: true,
  },
  {
    id: 2,
    name: "Volunteer Mark",
    time: "4m ago",
    quote: "Evacuation center at the High School is now at 80% capacity.",
    tags: ["CITY CENTER"],
    highlight: false,
  },
];