# Enforce branch protection rules
[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]

## How it works
We have installed a custom GitHub app called "Enforce branch protection rules." This app is pointing to a webhook which points to a NodeJS app that is hosted locally and exposed to the outside world via ngrok for POC purposes. GitHub app is using app ID and private key. Webhook is secured with webhook secret. When implemented properly this app should be deployed to a proper hosting solution like Azure Functions or AWS Lambda, with secrets stored in proper places. See [docs/deploy.md](https://github.com/probot/probot/blob/master/docs/deployment.md) for more deployment options. Source code for the app function can be found [here](https://github.com/automagicallyorg/settings.) This repo was forked from [probot/settings](https://github.com/probot/settings)

## Outstanding items
* [Cleanup unnessary code that is no longer relevant after original app functionality got modified](https://github.com/automagicallyorg/settings/issues/3)
* [Add functionality to the GitHub app to create README.md file if repo was created empty](https://github.com/automagicallyorg/settings/issues/4)

[github-actions-ci-link]: https://github.com/automagicallyorg/settings/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/automagicallyorg/settings/workflows/Node.js%20CI/badge.svg
