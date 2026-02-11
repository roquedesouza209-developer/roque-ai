"use client";

import { useState } from "react";

type Role = "guest" | "free" | "plus" | "premium" | "pro";

export default function HomePage() {
  const email = "demo@roque.ai"; // temp user
  const [role, setRole] = useState<Role>("free");
  const [message, setMessage] = useState("");

  async function runAction() {
    const res = await fetch("/api/action", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Action blocked");
      return;
    }

    setMessage(`AI action allowed. Remaining: ${data.remaining}`);
  }

  async function exportFile(type: "pdf" | "word") {
    const res = await fetch("/api/export", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role, type }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      return;
    }

    setMessage(`Exported ${type.toUpperCase()} successfully`);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Roque AI Dashboard</h1>

      {/* ROLE SWITCH */}
      <div className="flex items-center gap-3">
        <label className="text-zinc-400">User Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="bg-zinc-900 p-2 rounded"
        >
          <option value="guest">Guest</option>
          <option value="free">Free</option>
          <option value="plus">Plus</option>
          <option value="premium">Premium</option>
          <option value="pro">Pro</option>
        </select>
      </div>

      {/* ACTIONS */}
      <button
        onClick={runAction}
        className="bg-white text-black px-6 py-3 rounded-lg"
      >
        Run AI Action
      </button>

      <div className="flex gap-4">
        <button
          onClick={() => exportFile("pdf")}
          className="bg-zinc-800 px-4 py-2 rounded"
        >
          Export PDF
        </button>

        <button
          onClick={() => exportFile("word")}
          className="bg-zinc-800 px-4 py-2 rounded"
        >
          Export Word
        </button>
      </div>

      {message && <p className="text-zinc-400">{message}</p>}
    </main>
  );
}
