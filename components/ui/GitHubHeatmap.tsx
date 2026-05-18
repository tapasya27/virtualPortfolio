"use client";
import { useEffect, useState } from "react";

type Day = { date: string; contributionCount: number };
type Week = { contributionDays: Day[] };
type Calendar = {
  totalContributions: number;
  weeks: Week[];
};

// Map contribution count to one of 5 intensity buckets (0–4)
function intensity(count: number): number {
  if (count === 0) return 0;
  if (count < 3) return 1;
  if (count < 6) return 2;
  if (count < 10) return 3;
  return 4;
}

// Gold-toned palette aligned with var(--accent) #d4a843
const COLORS = [
  "#1f1d18", // 0 — empty (matches --bg-4-ish)
  "#3d3220", // 1
  "#6e5728", // 2
  "#a17d30", // 3
  "#d4a843", // 4 — full accent
];

export function GitHubHeatmap() {
  const [data, setData] = useState<Calendar | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/github-contributions")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json: Calendar) => {
        if (!cancelled) setData(json);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message || "Failed to load");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div
        className="rounded-sm p-4 font-mono text-xs"
        style={{ background: "var(--bg-4)", color: "var(--text-3)" }}
      >
        Couldn&apos;t load GitHub contributions ({error}).
      </div>
    );
  }

  if (!data) {
    return (
      <div
        className="rounded-sm p-4 font-mono text-xs animate-pulse"
        style={{ background: "var(--bg-4)", color: "var(--text-3)", minHeight: "120px" }}
      >
        Loading contributions…
      </div>
    );
  }

  const months = monthLabels(data.weeks);

  return (
    <div className="w-full">
      {/* Stats row */}
      <div className="flex items-baseline gap-3 mb-3">
        <span
          className="font-display"
          style={{ color: "var(--accent)", fontSize: "22px", fontWeight: 500 }}
        >
          {data.totalContributions.toLocaleString()}
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--text-3)", letterSpacing: "0.08em" }}
        >
          contributions in the last year
        </span>
      </div>

      {/* Heatmap grid */}
      <div className="w-full overflow-x-auto">
        <div style={{ display: "inline-block", minWidth: "100%" }}>
          {/* Month labels */}
          <div className="flex" style={{ marginLeft: "0px", marginBottom: "4px" }}>
            {months.map((m, i) => (
              <div
                key={i}
                className="font-mono"
                style={{
                  width: "13px",
                  fontSize: "9px",
                  color: "var(--text-3)",
                  letterSpacing: "0.04em",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                  paddingLeft: m.label ? "0" : "0",
                }}
              >
                {m.label || ""}
              </div>
            ))}
          </div>

          {/* Week columns */}
          <div className="flex gap-[2px]">
            {data.weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {Array.from({ length: 7 }).map((_, di) => {
                  const day = week.contributionDays[di];
                  if (!day) {
                    return (
                      <div
                        key={di}
                        style={{ width: "11px", height: "11px", background: "transparent" }}
                      />
                    );
                  }
                  const lvl = intensity(day.contributionCount);
                  return (
                    <div
                      key={di}
                      title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
                      style={{
                        width: "11px",
                        height: "11px",
                        background: COLORS[lvl],
                        borderRadius: "2px",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-3">
            <span
              className="font-mono"
              style={{ color: "var(--text-3)", fontSize: "9px", letterSpacing: "0.06em" }}
            >
              Less
            </span>
            {COLORS.map((c, i) => (
              <div
                key={i}
                style={{
                  width: "11px",
                  height: "11px",
                  background: c,
                  borderRadius: "2px",
                }}
              />
            ))}
            <span
              className="font-mono"
              style={{ color: "var(--text-3)", fontSize: "9px", letterSpacing: "0.06em" }}
            >
              More
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Produce a label per week — only the first week of each month gets a label
function monthLabels(weeks: Week[]): { label: string }[] {
  const out: { label: string }[] = [];
  let lastMonth = -1;
  for (const w of weeks) {
    const first = w.contributionDays[0];
    if (!first) {
      out.push({ label: "" });
      continue;
    }
    const d = new Date(first.date);
    const m = d.getMonth();
    if (m !== lastMonth) {
      out.push({ label: d.toLocaleString("en", { month: "short" }) });
      lastMonth = m;
    } else {
      out.push({ label: "" });
    }
  }
  return out;
}
