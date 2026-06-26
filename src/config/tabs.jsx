import TasksTab from "../components/tabs/TasksTab";
import ActivityTab from "../components/tabs/ActivityTab";
import BudgetTab from "../components/tabs/BudgetTab";
import BadgesTab from "../components/tabs/BadgesTab";
import HabitsTab from "../components/tabs/HabitsTab";
import FocusTab from "../components/tabs/FocusTab";
import AnalyticsTab from "../components/tabs/AnalyticsTab";
import AIChatTab from "../components/tabs/AIChatTab";


export const TABS =[
  { id: "tasks",     label: "Tasks",     tier: "free",  Component: TasksTab },
  { id: "activity",  label: "Activity",  tier: "free",  Component: ActivityTab },
  { id: "budget",    label: "Budget",    tier: "free",  Component: BudgetTab },
  { id: "badges",    label: "Badges",    tier: "free",  Component: BadgesTab },
  { id: "habits",    label: "Habits",    tier: "pro",   Component: HabitsTab },
  { id: "focus",     label: "Focus",     tier: "pro",   Component: FocusTab },
  { id: "analytics", label: "Analytics", tier: "pro",   Component: AnalyticsTab },
  { id: "aichat",    label: "AI Chat",   tier: "elite", Component: AIChatTab },
];