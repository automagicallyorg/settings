const mergeArrayByName = require('./lib/mergeArrayByName')

/**
 * @param {import('probot').Probot} robot
 */
module.exports = (robot, _, Settings = require('./lib/settings')) => {
  async function syncSettings (context, repo = context.repo()) {
    const rule_config = {
      branches:
      [{
      name: 'main',
        protection: {
          required_pull_request_reviews: {
            required_approving_review_count: 1,
            dismiss_stale_reviews: true
          },
          enforce_admins: true,
          required_linear_history: true,
          required_conversation_resolution: true,
          required_status_checks: {
            strict: true,
            contexts: []
          },
          restrictions: {
            apps: [],
            users: [],
            teams: [],
          }
        }
      }]
    };
    // const config = await context.config('settings.yml', {}, { arrayMerge: mergeArrayByName })
    return Settings.sync(context.octokit, repo, rule_config)
  }

  // robot.on('push', async context => {
  //   const { payload } = context
  //   const { repository } = payload

  //   const defaultBranch = payload.ref === 'refs/heads/' + repository.default_branch
  //   if (!defaultBranch) {
  //     robot.log.debug('Not working on the default branch, returning...')
  //     return
  //   }

  //   const settingsModified = payload.commits.find(commit => {
  //     return commit.added.includes(Settings.FILE_NAME) ||
  //       commit.modified.includes(Settings.FILE_NAME)
  //   })

  //   if (!settingsModified) {
  //     robot.log.debug(`No changes in '${Settings.FILE_NAME}' detected, returning...`)
  //     return
  //   }

  //   return syncSettings(context)
  // })

  // robot.on('repository.edited', async context => {
  //   const { payload } = context
  //   const { changes, repository } = payload

  //   if (!Object.prototype.hasOwnProperty.call(changes, 'default_branch')) {
  //     robot.log.debug('Repository configuration was edited but the default branch was not affected, returning...')
  //     return
  //   }

  //   robot.log.debug(`Default branch changed from '${changes.default_branch.from}' to '${repository.default_branch}'`)

  //   return syncSettings(context)
  // })

  robot.on('repository.created', async context => {
    const { payload } = context
    const { repository } = payload
    const repoName = repository.name
    const repoOwner = repository.owner.login
    const repoSize = repository.size
    if (repoSize == 0) {
      robot.log.debug('Empty repo created...')
      // fails here...
      await context.octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        owner: '${repoOwner}',
        branch: 'main',
        repo: '${repoName}',
        path: 'README.md',
        message: 'add README',
        content: 'QWRkIHNvbWUgbWVhbmluZ2Z1bCBkZXNjcmlwdGlvbiBwbGVhc2UuIEl0IHdpbGwgaGVscCB5b3UgbGF0ZXIu'
      })
    }
    return syncSettings(context)
  })

  robot.on('branch_protection_rule.edited', async context => {
    return syncSettings(context)
  })

  robot.on('branch_protection_rule.deleted', async context => {
    return syncSettings(context)
  })

}
