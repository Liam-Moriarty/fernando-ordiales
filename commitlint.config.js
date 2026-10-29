/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],

  rules: {
    // Type must be one of these
    "type-enum": [
      2,
      "always",
      [
        "feat", // new feature
        "fix", // bug fix
        "docs", // documentation
        "style", // formatting, no logic change
        "refactor", // code restructure, no feature/fix
        "perf", // performance improvement
        "test", // adding tests
        "build", // build system changes
        "ci", // CI/CD changes
        "chore", // maintenance tasks
        "revert", // reverting a commit
        "wip", // work in progress
      ],
    ],

    // Scope is optional but must be lowercase if provided
    "scope-case": [2, "always", "lower-case"],

    // Subject must not be empty
    "subject-empty": [2, "never"],

    // Subject must not end with a period
    "subject-full-stop": [2, "never", "."],

    // Header max length
    "header-max-length": [2, "always", 100],

    // Body must have a blank line before it
    "body-leading-blank": [1, "always"],
  },
};
