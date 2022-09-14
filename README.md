# WebTekProject

[![CodeQL](https://github.com/TheFakeKiwi/WebTekProject/actions/workflows/codeql.yml/badge.svg)](https://github.com/TheFakeKiwi/WebTekProject/actions/workflows/codeql.yml)

[![Lint](https://github.com/TheFakeKiwi/WebTekProject/actions/workflows/lint.yml/badge.svg)](https://github.com/TheFakeKiwi/WebTekProject/actions/workflows/lint.yml)

Color Scheme and Gradiant generator.

## How to GitHub

### Create a new branch

If you wish to create a new branch, the command you would use is:

```bash
git switch -c <branch-name>
```

when the branch is created, type the following into your terminal:

```bash
git push -u origin <branch-name>
```

Once you have done this, the branch should show up in the GitHub repository.

### Switch to another branch

If you are on the main branch and want to switch to a different branch, you would type:

```bash
git switch <branch-name>
```

After switching to a different branch, the first time you commit, you need to run `git push` with the `-u` flag.

```bash
git push -u origin <branch-name>
```

### Keep branch up-to-date

It is important to keep your branch up-to-date. To do this you would type:

```bash
git switch <branch-name> # branch-name being the branch you want to keep up-to-date
git fetch
git merge origin/<up-to-date-branch> # up-to-date-branch being the branch that merges into your branch
```

### Remove deleted branches

If you have deleted a branch on GitHub, that branch would not be removed locally on your computer. To do this, you would type:

```bash
git branch -D <branch-name>
git remote prune origin
```

## Color Ocean

Website name.
