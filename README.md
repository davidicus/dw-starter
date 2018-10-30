# Node Module Boilerplate

---

The basic structure and files for creating node modules. To be used with [kick-init](https://www.npmjs.com/package/kick-init)

## Travis publish to NPM

You can have Travis deploy your module to npm when a build passes and a tag is present.

- First you have to generate a token from npm either on the site or by running the following by a signed in user.

  ```
  npm token create
  ```

- Second you must add the following variables to your travis ci project.

  ```
  NPM_EMAIL
  NPM_TOKEN
  ```

- Finally, after you have commited your changes and you want to deploy your module run the following commands in your terminal
  ```
  # this will bump up the version in your package.json
  npm version [patch] || [minor] || [major]
  # this pushes your master and adds a git tag
  git push origin master --tag
  ```

Travis will run your build and if successful push your module to the npm registry with appropriate version bump.
