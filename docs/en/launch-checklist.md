# Open-source launch checklist

[Library](../README.md) · [Português](../pt-BR/launch-checklist.md)

## Product

- [ ] The problem and audience are clear within seconds.
- [ ] The primary path works in a clean environment.
- [ ] The first result requires as few decisions as possible.
- [ ] Limitations, platforms and supported integrations are explicit.
- [ ] Demonstrative features are not presented as production-ready.

## Repository

- [ ] README, license, security, contribution and support are published.
- [ ] Social preview, short description and topics are configured.
- [ ] The visual demo shows the outcome, not only the architecture.
- [ ] Links, anchors, images and commands were tested.
- [ ] Issues provide useful instructions and templates.
- [ ] The default branch is protected and CI is green.

## Installation and release

- [ ] Version and tag match the published code.
- [ ] Release notes explain value, changes and limitations.
- [ ] Artifacts use predictable names and checksums.
- [ ] Package manager, image or binary points to the correct version.
- [ ] Upgrade and uninstall paths are documented when relevant.
- [ ] The promoted command was executed from scratch.

## Security

- [ ] The [security checklist](./security-checklist.md) is complete.
- [ ] Discovered secrets were rotated, not merely deleted.
- [ ] No production service is required to test the project.
- [ ] External costs and paid calls are disclosed.

## Launch message

- [ ] It starts with the problem and outcome.
- [ ] It includes a short demonstration.
- [ ] It offers one primary call to action.
- [ ] It explains who the project is not for.
- [ ] It leads directly to setup or first use.

Template:

> **[Project]** helps **[audience]** achieve **[outcome]** without
> **[main friction]**. Watch **[demo]** or start with **[command/link]**.

## Post-launch operation

- [ ] Someone owns triage for the first 72 hours.
- [ ] Repeated questions will become documentation.
- [ ] Bugs and feature requests will be separated.
- [ ] Baseline metrics were recorded before the announcement.
- [ ] The next project review has a date.

Measure primarily:

- completed installation;
- time to first result;
- failures by stage;
- reproducible issues;
- return usage from people who actually ran the product.

