# Enforce branch protection rules
[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Dependabot][dependabot-badge]][dependabot-link]

## Overview

The goal of of this webhook is to enforce branch protection rule standards across the entire GitHub organization using GitHup Appp. Organization wide branch protection rules are set to:
* Branch protection rule is enforced on main branch
* "Require a pull request before merging" option enforced with "Require approvals" option enabled and "Required number of approvals before merging" option set to 1
* "Dismiss stale pull request approvals when new commits are pushed" option is enabled to ensure that existing PR approvals are dismissed when new commits are added to PR
* "Dismiss stale pull request approvals when new commits are pushed" option is enabled to ensure that all PR comments are resolved before merging
* "Require linear history" option is enabled to prevent merge commits from being pushed to matching branches
* "Include administrators" option is enabled to enforce all above mentioned restrictions for administrators

## How it works
We have installed a custom GitHub app called "Enforce branch protection rules." This app is pointing to a webhook which points to a NodeJS app that is hosted locally and exposed to the outside world via ngrok for POC purposes. GitHub app is using app ID and private key. Webhook is secured with webhook secret. When implemented properly this app should be deployed to a proper hosting solution like Azure Functions or AWS Lambda, with secrets stored in proper places. See [docs/deploy.md](https://github.com/probot/probot/blob/master/docs/deployment.md) for more deployment options. Source code for the app function can be found [here](https://github.com/automagicallyorg/settings.) This repo was forked from [probot/settings](https://github.com/probot/settings)

## Outstanding items
* Cleanup unnessary code that is no longer relevant after original app functionality got modified. See https://github.com/automagicallyorg/settings/issues/3
* Add functionality to the GitHub app to create README.md file if repo was created empty. See https://github.com/automagicallyorg/settings/issues/4

[dependabot-link]: https://dependabot.com/

[dependabot-badge]: https://badgen.net/dependabot/probot/settings/?icon=dependabot

[github-actions-ci-link]: https://github.com/probot/settings/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/probot/settings/workflows/Node.js%20CI/badge.svg
