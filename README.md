# MYReady Atlas public health monitor

Prepared configuration, NOT active until deployed to a dedicated public GitHub repository and a successful `schedule` event run is observed. Manual or workflow_dispatch success does not meet this acceptance gate.

Uses standard ubuntu-latest runner, Node built-ins, no packages, no paid runner, no secrets, no artifact uploads and a three-minute cap. Hourly at minute 23 UTC, subject to GitHub scheduling delay. This does not use or change ChatGPT tasks. GitHub documents standard hosted Actions runners in public repositories as free. No account plan or spending setting is changed. Failure causes a failed workflow; notification delivery depends on GitHub account notification settings and is not verified.

Checks public homepage, pinned manifest and eight assets; validates 20+10 sample scope/rights/provenance; runs the public demo's separate 50-case suite twice after checking code-file hashes. It never accesses Work A or private Atlas releases. No production credentials. It does not test a real browser, refresh national source data or perform autonomous commercial research.

Review every pin change deliberately. A changed release fails closed until inspected; do not auto-update expected hashes or tests to suppress errors. Preserve failure logs. No automatic commits, deploys, issue creation, messages or payments. Logs and job summaries are the evidence record; monitor data contains public metadata only.

Dedicated public repository: ilhamraduanbis-source/myready-atlas-public-monitor. Repository creation was authorised through the Founder mandate and completed after secure sign-in. Do not put this workflow into Work A or another project. Scheduled execution remains unverified until a successful schedule-event run is recorded.

Sources reviewed 22 November 2026
- https://docs.github.com/en/actions/concepts/billing-and-usage
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule

GitHub schedules may be delayed or disabled due to repository inactivity; check the provider's current conditions. No continuous AI capacity, uptime guarantee or automatic ChatGPT notification is claimed.
