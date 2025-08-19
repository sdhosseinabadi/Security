<h3 align="center">✋💪</h3>
<h3 align="center">[WIP] `/assign` action</h3>

<p align="center"><a href="https://github.com/JasonEtco/slash-assign-action"><img alt="GitHub Actions status" src="https://github.com/JasonEtco/slash-assign-action/workflows/CI/badge.svg"></a> <a href="https://codecov.io/gh/JasonEtco/slash-assign-action"><img src="https://codecov.io/gh/JasonEtco/slash-assign-action/branch/main/graph/badge.svg" /></a></p>

---

A GitHub Action that listens for a `/assign` "command" (an issue comment that starts with `/assign`) and assigns the commenter to the issue. It can also unassign issues that have been assigned for a configured amount of time.

## Usage

```yaml
name: Slash assign

on:
  schedule:
    - cron: 0 0 * * *
  issue_comment:
    types: [created]

jobs:
  slash_assign:
    # If the acton was triggered by a new comment that starts with `/assign`
    # or a on a schedule
    if: >
      (github.event_name == 'issue_comment' && startsWith(github.event.comment.body, '/assign')) ||
      github.event_name == 'schedule'
    runs-on: ubuntu-latest
    steps:
      - name: Assign the user or unassign stale assignments
        uses: JasonEtco/slash-assign-action@v1
        with:
          required_label: good-first-issue
          assigned_label: assigned-to-contributor
```


The comment posted to warn a user that the issue will become unassigned. This is a Mustache template that supports the following variables: 

* `user` (the user that was assigned)
* `inputs` (the inputs given to the action)
* `env` (`process.env`, anything you pass to the action via `env`)

Default:

```
@{{ assignee.login }}, this issue hasn't had any activity in {{ inputs.days_until_warning }} days.

It will become unassigned in {{ inputs.days_until_unassign }} days to make room for someone else to contribute.
```

## `workflow_dispatch` trigger

You can also manually trigger this action via the `workflow_dispatch` event. You'll need to modify the `if` property:

```yaml
if: >
  (github.event_name == 'issue_comment' && startsWith(github.event.comment.body, '/assign')) ||
  github.event_name == 'schedule' || github.event_name == 'workflow_dispatch'
```
