import { chromium } from "playwright";
import { mkdirSync, readdirSync } from "fs";
import { join } from "path";

const url = process.argv[2] || "http://localhost:3000";
const label = process.argv[3] || "";

const dir = "./temporary screenshots";
mkdirSync(dir, { recursive: true });

const existing = readdirSync(dir).filter((f) => f.startsWith("screenshot-"));
const nums = existing.map((f) => parseInt(f.match(/screenshot-(\d+)/)?.[1] || "0", 10));
const next = (nums.length ? Math.max(...nums) : 0) + 1;

const filename = label
  ? `screenshot-${next}-${label}.png`
  : `screenshot-${next}.png`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(url, { waitUntil: "load" });
await page.waitForTimeout(2000);
await page.screenshot({ path: join(dir, filename), fullPage: true });
await browser.close();

console.log(`Saved: ${join(dir, filename)}`);
