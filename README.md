# GitHub Settings

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Dependabot][dependabot-badge]][dependabot-link]

This GitHub App syncs repository settings defined in `.github/settings.yml` to GitHub, enabling Pull Requests for repository settings.

## Usage

1. __[Install the app](https://github.com/apps/settings)__.
1. Create a `.github/settings.yml` file in your repository. Changes to this file on the default branch will be synced to GitHub.

All top-level settings are optional. Some plugins do have required fields.

```yaml
branches:
  - name: master
    # https://docs.github.com/en/rest/reference/repos#update-branch-protection
    # Branch Protection settings. Set to null to disable
    protection:
      # Required. Require at least one approving review on a pull request, before merging. Set to null to disable.
      required_pull_request_reviews:
        # The number of approvals required. (1-6)
        required_approving_review_count: 1
        # Dismiss approved reviews automatically when a new commit is pushed.
        dismiss_stale_reviews: true
        # Blocks merge until code owners have reviewed.
        require_code_owner_reviews: true
        # Specify which users and teams can dismiss pull request reviews. Pass an empty dismissal_restrictions object to disable. User and team dismissal_restrictions are only available for organization-owned repositories. Omit this parameter for personal repositories.
        dismissal_restrictions:
          users: []
          teams: []
      # Required. Require status checks to pass before merging. Set to null to disable
      required_status_checks:
        # Required. Require branches to be up to date before merging.
        strict: true
        # Required. The list of status checks to require in order to merge into this branch
        contexts: []
      # Required. Enforce all configured restrictions for administrators. Set to true to enforce required status checks for repository administrators. Set to null to disable.
      enforce_admins: true
      # Prevent merge commits from being pushed to matching branches
      required_linear_history: true
      # Required. Restrict who can push to this branch. Team and user restrictions are only available for organization-owned repositories. Set to null to disable.
      restrictions:
        apps: []
        users: []
        teams: []
```

### Notes

1. Label color can also start with `#`, e.g. `color: '#F341B2'`. Make sure to wrap it with quotes!
1. Each top-level element under branch protection must be filled (eg: `required_pull_request_reviews`, `required_status_checks`, `enforce_admins` and `restrictions`). If you don't want to use one of them you must set it to `null` (see comments in the example above). Otherwise, none of the settings will be applied.

### Inheritance

This app is built with [probot](https://github.com/probot/probot), and thus uses the [octokit-plugin-config](https://github.com/probot/octokit-plugin-config). This means you can inherit settings from another repo, and only override what you want to change.

Individual settings in the arrays listed under `labels`, `teams` (once it is supported) and `branches` will be merged with the base repo if the `name` of an element in the array matches the `name` of an element in the corresponding array in the base repo. A possible future enhancement would be to make that work for the other settings arrays based on `username`, or `title`. This is not currently supported.

To further clarify: Inheritance within the Protected Branches plugin allows you to override specific settings per branch. For example, your `.github` repo may set default protection on the `master` branch. You can then include `master` in your `branches` array, and only override the `required_approving_review_count`.
Alternatively, you might only have a branch like `develop` in your `branches` array, and would still get `master` protection from your base repo.

## Security Implications

__WARNING:__ Note that this app inherently _escalates anyone with `push` permissions to the __admin__ role_, since they can push config settings to the `master` branch, which will be synced. In a future, we may add restrictions to allow changes to the config file to be merged only by specific people/teams, or those with __admin__ access _(via a combination of protected branches, required statuses, and branch restrictions)_. Until then, use caution when merging PRs and adding collaborators.

Until restrictions are added in this app, one way to preserve admin/push permissions is to utilize the [GitHub CodeOwners feature](https://help.github.com/articles/about-codeowners/) to set one or more administrative users as the code owner of the `.github/settings.yml` file, and turn on "require code owner review" for the master branch. This does have the side effect of requiring code owner review for the entire branch, but helps preserve permission levels.

## Deployment

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this plugin.

[dependabot-link]: https://dependabot.com/

[dependabot-badge]: https://badgen.net/dependabot/probot/settings/?icon=dependabot

[github-actions-ci-link]: https://github.com/probot/settings/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/probot/settings/workflows/Node.js%20CI/badge.svg
