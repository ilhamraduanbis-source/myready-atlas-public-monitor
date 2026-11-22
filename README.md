# MYReady Atlas public health monitor

Daily schedule configured for 01:00 UTC, 09:00 Asia/Kuala_Lumpur. Scheduled operation is NOT verified until a successful schedule-event run is observed. Manual run 45023417581 succeeded on 22 November 2026; it is not scheduled evidence.

Uses standard ubuntu-latest, Node built-ins, pinned checkout action, contents-read permission, no saved credentials, no package installs, no paid runners, no artifact upload and a three-minute cap. Public-repository standard Actions runners are documented as free. No billing settings or existing ChatGPT tasks changed.

Checks public homepage, pinned manifest and eight assets, scope 20 D10 plus 10 D12, rights/provenance metadata and the separate public demo suite twice. It does not access Work A or private Atlas releases, use production credentials, validate national completeness, test browser rendering or conduct commercial research.

Fail closed on changed hashes or failed tests. Review pin changes deliberately, never change expectations merely to hide failure. No auto-commits, deployments, issues, messages or payments. Output is public-only JSON in logs and job summary. Failure-notification delivery depends on GitHub account settings and has not been tested.

Hourly activation was rejected by automatic approval review. The safer daily schedule was accepted. GitHub scheduling can be delayed and public schedules may be disabled after 60 days without repository activity. No continuous AI, uptime guarantee, successful scheduled run or automatic ChatGPT notification is claimed.

Sources reviewed 22 November 2026
- https://docs.github.com/en/actions/concepts/billing-and-usage
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
