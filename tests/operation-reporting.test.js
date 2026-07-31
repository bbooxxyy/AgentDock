import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");

test("execution records expose reporting for the selected trace", () => {
  assert.match(html, /data-action="report-operation-record"/);
  assert.match(html, /call\("report_operation_record", \{ traceId \}\)/);
  assert.match(html, /selectedOperationTraceId/);
});

test("top bar reports all execution logs without the local-service badge", () => {
  assert.match(html, /data-action="report-all-operations"/);
  assert.match(html, /call\("report_all_operation_records"\)/);
  assert.doesNotMatch(html, /id="backend-state"/);
});

test("source footer provides manual app update checks and keeps hourly checks", () => {
  assert.match(html, /id="current-version-label">当前版本<\/span><strong id="version-label">--<\/strong>/);
  assert.match(html, /state\.status\?\.appVersion \|\| state\.appUpdate\?\.currentVersion/);
  assert.match(html, /currentVersion \? `v\$\{currentVersion\}` : "--"/);
  assert.match(html, /id="app-update-button" data-action="check-app-update"/);
  assert.match(html, /checkForAppUpdate\(\{ force: true, announce: true \}\)/);
  assert.match(html, /APP_UPDATE_CHECK_INTERVAL_MS = 60 \* 60 \* 1000/);
  assert.match(html, /window\.setInterval\(\(\) => void checkForAppUpdate\(\), APP_UPDATE_CHECK_INTERVAL_MS\)/);
  assert.doesNotMatch(html, /id="platform-label"/);
});
