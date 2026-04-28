import type { LucideIcon } from "lucide-react"
import {
  User,
  LayoutGrid,
  GitBranch,
  Folder,
  Film,
  TerminalSquare,
  Mail,
  Settings as SettingsIcon,
  Search,
} from "lucide-react"

export type AppId =
  | "about"
  | "services"
  | "process"
  | "projects"
  | "video"
  | "terminal"
  | "contact"
  | "settings"
  | "search"

export type AppDefinition = {
  id: AppId
  name: string
  subtitle: string
  icon: LucideIcon
  /** Hex tint used for icon glow / accents */
  tint: string
  defaultSize: { w: number; h: number }
  defaultPosition?: { x: number; y: number }
  /** Show on the main desktop grid */
  onDesktop: boolean
  /** Show in the dock */
  inDock: boolean
  /** Search aliases for the global command bar */
  aliases: string[]
}

export const APPS: Record<AppId, AppDefinition> = {
  about: {
    id: "about",
    name: "About",
    subtitle: "Who we are",
    icon: User,
    tint: "#00F0FF",
    defaultSize: { w: 880, h: 600 },
    onDesktop: true,
    inDock: true,
    aliases: ["about", "company", "team", "mission", "who"],
  },
  services: {
    id: "services",
    name: "Services",
    subtitle: "Full-spectrum capabilities",
    icon: LayoutGrid,
    tint: "#3B82F6",
    defaultSize: { w: 1000, h: 660 },
    onDesktop: true,
    inDock: true,
    aliases: ["services", "capabilities", "what we do", "offerings"],
  },
  process: {
    id: "process",
    name: "Process",
    subtitle: "How we operate",
    icon: GitBranch,
    tint: "#00F0FF",
    defaultSize: { w: 920, h: 620 },
    onDesktop: true,
    inDock: true,
    aliases: ["process", "how", "workflow", "method", "steps"],
  },
  projects: {
    id: "projects",
    name: "Projects",
    subtitle: "Selected work",
    icon: Folder,
    tint: "#3B82F6",
    defaultSize: { w: 1040, h: 680 },
    onDesktop: true,
    inDock: true,
    aliases: ["projects", "portfolio", "work", "case studies", "clients"],
  },
  video: {
    id: "video",
    name: "Video Lab",
    subtitle: "Cinematic production",
    icon: Film,
    tint: "#FF6B00",
    defaultSize: { w: 980, h: 640 },
    onDesktop: true,
    inDock: true,
    aliases: ["video", "video lab", "production", "reel", "cinema", "film"],
  },
  terminal: {
    id: "terminal",
    name: "Terminal",
    subtitle: "APEX command line",
    icon: TerminalSquare,
    tint: "#00F0FF",
    defaultSize: { w: 780, h: 520 },
    onDesktop: true,
    inDock: true,
    aliases: ["terminal", "console", "cli", "shell", "command"],
  },
  contact: {
    id: "contact",
    name: "Contact",
    subtitle: "Start a project",
    icon: Mail,
    tint: "#FF6B00",
    defaultSize: { w: 880, h: 640 },
    onDesktop: true,
    inDock: true,
    aliases: [
      "contact",
      "book",
      "book a call",
      "talk",
      "email",
      "start",
      "hire",
      "quote",
    ],
  },
  settings: {
    id: "settings",
    name: "Settings",
    subtitle: "System preferences",
    icon: SettingsIcon,
    tint: "#8a8f98",
    defaultSize: { w: 760, h: 540 },
    onDesktop: true,
    inDock: false,
    aliases: ["settings", "preferences", "system", "config"],
  },
  search: {
    id: "search",
    name: "Search",
    subtitle: "Find anything",
    icon: Search,
    tint: "#00F0FF",
    defaultSize: { w: 600, h: 80 },
    onDesktop: false,
    inDock: true,
    aliases: ["search", "find", "command", "k"],
  },
}

export const DESKTOP_APP_ORDER: AppId[] = [
  "about",
  "services",
  "process",
  "projects",
  "video",
  "terminal",
  "contact",
  "settings",
]

export const DOCK_APP_ORDER: AppId[] = [
  "about",
  "services",
  "process",
  "projects",
  "video",
  "terminal",
  "search",
  "contact",
]
