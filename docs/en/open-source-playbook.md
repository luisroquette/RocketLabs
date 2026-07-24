# Open-source publishing playbook

[Library](../README.md) · [Português](../pt-BR/open-source-playbook.md)

An eight-stage process for opening code without publishing secrets, client
dependencies or promises the project cannot support yet.

## 1. Define what you are opening

- State the problem the project solves in one sentence.
- Separate reusable product, company configuration and operational data.
- Confirm authorship and redistribution rights for code, fonts, images and data.
- Choose the model: library, app, template, skill, CLI or reference.
- Decide the support level before launch.

**Output:** an explicit public scope and a list of what remains private.

## 2. Extract everything tied to the original company

Turn internal values into configuration:

| Remove from the code | Replace with |
|---|---|
| Company name, domain and visual identity | `brand.example.*` or a config file |
| Project IDs, buckets and endpoints | environment variables |
| Proprietary prompts and rules | neutral examples |
| Real users, emails and data | synthetic fixtures |
| Mandatory integrations | optional adapters |

Changing the company name is not enough. Search for subdomains, table names,
phone numbers, local paths, analytics IDs and production-derived examples.

## 3. Run the security review

Complete the [security checklist](./security-checklist.md). If a credential ever
entered Git history, consider it compromised: revoke it, issue a replacement and
only then clean the history.

**Gate:** no current or historical secrets; no personal or client data; minimum
CI permissions.

## 4. Make the primary path reproducible

- Create `.env.example` with names and clearly fake values only.
- Document minimum runtime, database and operating-system versions.
- Automate installation, migrations, seed and tests where possible.
- Test from a clean clone without your caches and local files.
- State which integrations are optional and what happens when they are absent.

**Gate:** another person reaches the first result using only the README.

## 5. Document decisions, not only commands

Use the [README template](../../templates/README.en.md) and answer:

- What is it and who is it for?
- What result appears first?
- What is real, estimated or demonstrative?
- What data enters, where is it stored and where is it sent?
- Which limitations and external costs exist?

Include a screenshot, GIF or short video of the primary flow.

## 6. Add minimum governance

Recommended public kit:

- `LICENSE`
- `SECURITY.md`
- `CONTRIBUTING.md`
- support policy or best-effort notice
- issue templates
- CI for tests, lint and documentation consistency

Visible code without a license does not automatically grant reuse rights.

## 7. Prepare an installable version

- Create a semantic version, short changelog and reproducible release.
- Publish checksums when distributing binaries.
- Test the exact command you will promote.
- Record requirements, migrations and incompatibilities.
- Prepare the social preview, description, topics and demonstration.

Use the [launch checklist](./launch-checklist.md) before announcing.

## 8. Publish and learn

- Launch with one concrete use case, not a feature inventory.
- Route reproducible bugs to issues.
- Turn repeated questions into documentation.
- Measure completed setup, first result and failures — not only stars.
- Keep the roadmap and maintenance status honest.

## Definition of ready

- [ ] Public scope and boundaries are clear.
- [ ] Redistribution rights were verified.
- [ ] Current files and Git history passed security review.
- [ ] Installation works in a clean environment.
- [ ] README shows value, demonstration and limitations.
- [ ] License, security, support and contribution are documented.
- [ ] Release and distribution channel were tested.
- [ ] Someone owns triage after launch.

