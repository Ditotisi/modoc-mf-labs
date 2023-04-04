module.exports = {
  apps : [
    {
      name: 'mobile-feed-dev',
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start'
    }
  ],
  deploy : {
    // "production" is the environment name
    production : {
      user: 'web',
      host: ['0.0.0.0'],
      ref: 'origin/main',
      repo: 'git@gitlab.com/faisalsan/modoc-feed.git',
      ssh_options: ['ForwardAgent=yes'],
      path: '/opt/websites/modoc-account-frontend-mobile',
      'post-deploy' : 'yarn && yarn build && pm2 startOrRestart ecosystem.config.js --env production'
    }
  }
}
