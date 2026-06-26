import { useState } from "react";
import { PageHeader } from "../components/ds/PageHeader.jsx";
import { Button } from "../components/ds/Button.jsx";
import { Avatar } from "../components/ds/Avatar.jsx";
import { Input } from "../components/ds/Input.jsx";
import { StatCard } from "../components/ds/StatCard.jsx";
import { Card } from "../components/ds/Card.jsx";
import { SectionTitle } from "../components/ds/SectionTitle.jsx";
import { ProgressBar } from "../components/ds/ProgressBar.jsx";
import { useNav } from "../context/NavContext.jsx";

export default function BudgetScreen({ data, onAddPurchase = () => {} }) {
  const { openProfile, goTasks } = useNav();
  const [adding, setAdding] = useState(false);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(data.budget[0]?.label || "__new__");
  const [newName, setNewName] = useState(""); // typed when category === "__new__"
  const [newCap, setNewCap] = useState(""); // monthly cap for a new category

  const creatingNew = category === "__new__";

  // Summary numbers derived from live category data (no hardcoded figures).
  const totalSpent = data.budget.reduce((s, b) => s + b.spent, 0);
  const totalCap = data.budget.reduce((s, b) => s + b.cap, 0);
  const saved = Math.max(totalCap - totalSpent, 0);
  const savedPct = totalCap ? Math.round((saved / totalCap) * 100) : 0;
  const fmt = (n) => "RM " + n.toLocaleString("en-MY");

  function submitPurchase() {
    const amt = Number(amount);
    const label = creatingNew ? newName.trim() : category;
    if (!amt || amt <= 0 || !label) return;
    // For a new category we also pass the chosen monthly cap.
    onAddPurchase(label, amt, creatingNew ? newCap : undefined);
    setAmount("");
    setNewName("");
    setNewCap("");
    setAdding(false);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <PageHeader
        title="Budget"
        date={data.today}
        actions={
          <>
            <Button onClick={goTasks}>+ Task</Button>
            <Button variant="orange-navy" onClick={() => setAdding((v) => !v)}>
              Add purchase
            </Button>
            <Avatar name={data.user.name} size={56} onClick={openProfile} role="button" aria-label="Open profile" style={{ cursor: "pointer" }} />
          </>
        }
      />

      {/* Inline add-purchase form: amount + category, writes straight to Firestore. */}
      {adding && (
        <Card tone="light" pad={20} style={{ display: "flex", gap: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 160px" }}>
            <Input
              label="Amount (RM)"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submitPurchase()}
              placeholder="0.00"
            />
          </div>
          <label style={{ flex: "1 1 160px", display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--mv-navy)", letterSpacing: "0.5px" }}>
              Category
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                border: "2px solid var(--mv-navy)",
                borderRadius: "var(--radius-sm)",
                padding: "12px 16px",
                boxShadow: "var(--shadow-soft)",
                fontFamily: "var(--font-body)",
                fontSize: 16,
                color: "var(--mv-navy)",
                background: "var(--mv-white)",
              }}
            >
              {data.budget.map((b) => (
                <option key={b.label} value={b.label}>
                  {b.label}
                </option>
              ))}
              <option value="__new__">➕ New category…</option>
            </select>
          </label>

          {/* Shown only when creating a brand-new category type. */}
          {creatingNew && (
            <>
              <div style={{ flex: "1 1 160px" }}>
                <Input
                  label="New category"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitPurchase()}
                  placeholder="e.g. Subscriptions"
                />
              </div>
              <div style={{ flex: "1 1 120px" }}>
                <Input
                  label="Monthly cap (RM)"
                  type="number"
                  min="0"
                  step="1"
                  value={newCap}
                  onChange={(e) => setNewCap(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && submitPurchase()}
                  placeholder="500"
                />
              </div>
            </>
          )}

          <Button variant="primary" onClick={submitPurchase}>
            Save
          </Button>
        </Card>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr 1fr", gap: 22 }}>
        <StatCard caption="Balance :" value={data.balance} align="center" />
        <StatCard caption="This month" tone="navy" value={fmt(totalSpent)} align="center" valueColor="#fff">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,.85)" }}>
            spent of {fmt(totalCap)} budget
          </div>
        </StatCard>
        <StatCard caption="Saved" tone="teal" value={fmt(saved)} align="center" valueColor="#fff">
          <div style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "rgba(255,255,255,.9)" }}>
            {savedPct}% under budget 🎉
          </div>
        </StatCard>
      </div>

      <div>
        <SectionTitle style={{ marginBottom: 18 }}>Categories</SectionTitle>
        <Card tone="light" pad={26} style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {data.budget.map((b) => {
            const pct = Math.round((b.spent / b.cap) * 100);
            return (
              <div key={b.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--mv-navy)" }}>
                    {b.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-meta)",
                      fontWeight: 800,
                      fontSize: 15,
                      color: pct >= 95 ? "var(--mv-red)" : "var(--mv-grey)",
                    }}
                  >
                    RM {b.spent} / {b.cap}
                  </span>
                </div>
                <ProgressBar value={b.spent} max={b.cap} tone={pct >= 95 ? "red" : b.tone} height={18} />
              </div>
            );
          })}
        </Card>
      </div>
    </div>
  );
}
