// src/components/tabs/BudgetTab.jsx
// Budget tracker — balance overview, category breakdown, and transaction list.
import { useState } from "react";
import { Plus, ShoppingBag, Coffee, Bus, BookOpen, Utensils, Gamepad2, Trash2 } from "lucide-react";
import styles from "./BudgetTab.module.css";

const CATEGORIES = [
  { id: "food",      label: "Food",          Icon: Utensils,    spent: 245.50, color: "orange" },
  { id: "transport",  label: "Transport",     Icon: Bus,         spent: 89.00,  color: "teal" },
  { id: "education",  label: "Education",     Icon: BookOpen,    spent: 150.00, color: "navy" },
  { id: "shopping",   label: "Shopping",      Icon: ShoppingBag, spent: 312.80, color: "red" },
  { id: "coffee",     label: "Coffee & Drinks", Icon: Coffee,    spent: 67.30,  color: "orange" },
  { id: "entertainment", label: "Entertainment", Icon: Gamepad2, spent: 45.00,  color: "teal" },
];

const MOCK_TRANSACTIONS = [
  { id: 1, desc: "Nasi Lemak — Pak Ali",       amount: 8.50,  category: "food",      date: "Today" },
  { id: 2, desc: "Grab to campus",              amount: 12.00, category: "transport",  date: "Today" },
  { id: 3, desc: "Textbook — Data Structures",  amount: 75.00, category: "education",  date: "Yesterday" },
  { id: 4, desc: "Iced Latte",                  amount: 9.50,  category: "coffee",     date: "Yesterday" },
  { id: 5, desc: "Steam game sale",             amount: 45.00, category: "entertainment", date: "2 days ago" },
  { id: 6, desc: "Weekly groceries",            amount: 62.30, category: "food",       date: "3 days ago" },
];

export default function BudgetTab() {
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS);
  const totalSpent = CATEGORIES.reduce((s, c) => s + c.spent, 0);
  const balance = 6767.67;

  const deleteTransaction = (id) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className={styles.tab}>
      {/* Balance hero */}
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.heroLabel}>Current Balance</p>
          <p className={styles.heroAmount}>
            RM {balance.toLocaleString("en-MY", { minimumFractionDigits: 2 })}
          </p>
          <p className={styles.heroSub}>
            Total spent this month: RM {totalSpent.toFixed(2)}
          </p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Category grid */}
      <div>
        <h3 className={styles.sectionTitle}>Spending by Category</h3>
        <div className={styles.catGrid}>
          {CATEGORIES.map((c) => (
            <div key={c.id} className={`${styles.catCard} ${styles[c.color]}`}>
              <div className={styles.catIcon}><c.Icon size={20} /></div>
              <p className={styles.catLabel}>{c.label}</p>
              <p className={styles.catAmount}>RM {c.spent.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction list */}
      <div className={styles.txPanel}>
        <h3 className={styles.sectionTitle}>Recent Transactions</h3>
        {transactions.length === 0 && (
          <p className={styles.empty}>No transactions recorded yet.</p>
        )}
        {transactions.map((t) => (
          <div key={t.id} className={styles.txRow}>
            <div className={styles.txBody}>
              <p className={styles.txDesc}>{t.desc}</p>
              <p className={styles.txDate}>{t.date}</p>
            </div>
            <span className={styles.txAmount}>- RM {t.amount.toFixed(2)}</span>
            <button
              className={styles.txDelete}
              onClick={() => deleteTransaction(t.id)}
              aria-label="Delete"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
