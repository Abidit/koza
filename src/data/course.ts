export const SESSION_DEFAULTS = {
  userName: 'Abidit',
  topic: 'Git and GitHub',
  level: 'some basics',
  duration: '2 hours',
}

export const MODULE_4_PAGES = [
  {
    id: 'p1',
    eyebrow: 'Module 4 · GitHub: Remotes · page 1 of 4',
    chips: ['next', 'explain', 'quiz'],
    hasCode: false,
    variants: {
      default: {
        title: 'GitHub vs Git — the actual difference',
        body: 'Git is the tool on your machine. GitHub is a website that stores a copy of your repository online. They are separate things — you can use Git without GitHub, but GitHub is useless without Git.\n\nWhen you push, you are sending your local commits to GitHub servers. When you pull, you are bringing their copy down to yours.',
        callout:
          'Think of Git as your local notebook and GitHub as a shared Google Drive where the notebook is backed up and others can read it.',
        code: null,
        sandboxCode: null,
        sandboxNudge: null,
      },
      deeper: {
        title: 'GitHub vs Git — the history',
        body: 'Git was created by Linus Torvalds in 2005 to manage Linux kernel code. GitHub launched in 2008 as a hosting platform built around Git. Microsoft acquired GitHub in 2018 for $7.5 billion. They are independent tools — Git is the engine, GitHub is the garage.',
        callout:
          'You can use Git with GitLab, Bitbucket, or no hosting at all. GitHub is the most popular choice, not the only one.',
        code: null,
        sandboxCode: null,
        sandboxNudge: null,
      },
      visual: {
        title: 'GitHub vs Git — picture it',
        body: 'Your laptop has Git installed. Git tracks every change you make in a folder. GitHub is a server on the internet. You decide when to sync them — Git does not auto-upload anything.\n\nLocal machine (Git) ←→ push/pull ←→ GitHub (remote). That arrow is always under your control.',
        callout:
          'Most confusion about Git comes from mixing up the local tool and the remote server. They are always separate.',
        code: null,
        sandboxCode: null,
        sandboxNudge: null,
      },
    },
  },
  {
    id: 'p2',
    eyebrow: 'Module 4 · GitHub: Remotes · page 2 of 4',
    chips: ['next', 'explain', 'try'],
    hasCode: true,
    variants: {
      default: {
        title: 'Connecting your repo to GitHub',
        body: "After creating a repo on GitHub.com, you connect your local repo to it with one command. The word origin is just a nickname for the remote URL — you could call it anything, but origin is the convention everyone uses.",
        callout:
          'Run git remote -v after adding. If you see two lines — fetch and push — you are connected.',
        code: '# tell Git where your remote repo lives\ngit remote add origin https://github.com/you/repo.git\n\n# verify it was added\ngit remote -v\n# origin  https://github.com/you/repo.git (fetch)\n# origin  https://github.com/you/repo.git (push)',
        sandboxCode:
          '# A new Git repo is ready.\n# Connect it to GitHub:\ngit remote add origin https://github.com/demo/practice.git\ngit remote -v',
        sandboxNudge:
          'Run git remote -v — see the two lines confirming your remote is connected.',
      },
      deeper: {
        title: 'Multiple remotes — when you need them',
        body: 'You can have more than one remote. Teams that fork repos often add an upstream remote pointing to the original, while origin points to their fork. This lets them pull updates from the source while pushing their own work separately.',
        callout:
          'Most beginners only ever need origin. Upstream becomes relevant when contributing to open source.',
        code: '# standard: your fork\ngit remote add origin https://github.com/you/repo.git\n\n# optional: the original repo\ngit remote add upstream https://github.com/original/repo.git\n\n# pull original updates\ngit pull upstream main',
        sandboxCode:
          '# Try adding two remotes:\ngit remote add origin https://github.com/you/repo.git\ngit remote add upstream https://github.com/original/repo.git\ngit remote -v',
        sandboxNudge:
          'Run git remote -v after both adds — you will see four lines, two per remote.',
      },
      visual: {
        title: 'origin is just a name',
        body: 'Origin is not special. It is a shortcut name Git stores so you do not have to type the full URL every time. You could name it anything — github, myrepo, production. Origin is just what everyone agrees to call the main remote by convention.',
        callout:
          'Try running: git remote rename origin github — your remote still works, just with a different nickname.',
        code: '# origin is just a label\ngit remote add origin https://github.com/you/repo.git\n\n# rename it to anything\ngit remote rename origin github\n\n# still works\ngit push github main',
        sandboxCode:
          '# Rename origin to something else:\ngit remote add origin https://github.com/you/repo.git\ngit remote rename origin myremote\ngit remote -v',
        sandboxNudge:
          'After renaming, run git remote -v — origin is gone, your new name appears instead.',
      },
    },
  },
  {
    id: 'p3',
    eyebrow: 'Module 4 · GitHub: Remotes · page 3 of 4',
    chips: ['next', 'explain', 'try', 'quiz'],
    hasCode: true,
    variants: {
      default: {
        title: 'Pushing — what actually happens',
        body: 'When you push, Git sends every commit you have that GitHub does not. The -u flag on your first push sets the tracking relationship — after that, plain git push is enough. You only need -u once per branch.',
        callout:
          "If you see 'Everything up-to-date' — you have no new commits to push. That is not an error.",
        code: '# first push — sets tracking\ngit push -u origin main\n\n# every push after this\ngit push\n\n# output you will see\n# Enumerating objects: 3, done.\n# Writing objects: 100% (3/3), 234 bytes.\n# Branch main set up to track origin/main.',
        sandboxCode:
          '# Repo has one commit, remote is connected.\n# Push it:\ngit push -u origin main',
        sandboxNudge:
          'Watch the output after git push -u origin main — three lines confirm success.',
      },
      deeper: {
        title: 'What -u actually does',
        body: 'The -u flag stands for --set-upstream. It creates a tracking link between your local main branch and origin/main. After that link exists, git push knows where to send commits without you specifying. git pull also knows where to pull from.',
        callout:
          'Check your tracking with: git branch -vv — shows which remote branch each local branch tracks.',
        code: '# With -u set, these both work:\ngit push    # sends to origin/main\ngit pull    # gets from origin/main\n\n# Without -u, you must be explicit:\ngit push origin main\ngit pull origin main',
        sandboxCode: '# See tracking in action:\ngit push -u origin main\ngit branch -vv',
        sandboxNudge:
          'After git push -u, run git branch -vv — see the tracking relationship in brackets.',
      },
      visual: {
        title: 'Push sends only new commits',
        body: 'Git compares your local commits with what GitHub has. Only the difference gets sent. If you have 10 commits and GitHub has 8 of them, only 2 travel over the network. This is why Git is fast even on large projects.',
        callout:
          'Git never sends the same commit twice. Each commit has a unique hash — Git checks hashes to know what is missing on the other side.',
        code: '# Git checks what GitHub is missing\ngit log origin/main..main\n\n# Shows commits that will be pushed\n# before you actually push them',
        sandboxCode: '# See what would be pushed:\ngit log origin/main..main --oneline',
        sandboxNudge:
          'This command shows pending commits before you push — useful on shared branches.',
      },
    },
  },
  {
    id: 'p4',
    eyebrow: 'Module 4 · GitHub: Remotes · page 4 of 4',
    chips: ['finish', 'explain', 'quiz', 'try'],
    hasCode: true,
    variants: {
      default: {
        title: 'git pull vs git fetch — know the difference',
        body: 'git fetch downloads changes from GitHub but does not touch your working files. git pull does both — fetches and then merges. Most beginners use pull. Teams with complex workflows prefer fetch so they can inspect changes before merging.',
        callout:
          'When in doubt, fetch first. You can always inspect with git log origin/main before deciding to merge.',
        code: '# fetch only — safe, non-destructive\ngit fetch origin\n\n# pull = fetch + merge\ngit pull origin main',
        sandboxCode:
          '# A remote has new commits you do not have.\n# Try both:\ngit fetch origin\ngit log origin/main --oneline',
        sandboxNudge:
          'After git fetch, run git log origin/main --oneline — see what is there before merging.',
      },
      deeper: {
        title: 'pull = fetch + merge exactly',
        body: 'git pull is literally a shortcut for two commands: git fetch followed by git merge FETCH_HEAD. Understanding this matters when you hit a merge conflict after a pull — you are in the merge step, not the fetch step.',
        callout:
          'Some teams use git pull --rebase instead of plain git pull. Rebase keeps a cleaner history — worth learning after you are comfortable with basic pull.',
        code: '# pull does this under the hood:\ngit fetch origin\ngit merge origin/main\n\n# equivalent to:\ngit pull origin main',
        sandboxCode: '# Do what pull does manually:\ngit fetch origin\ngit merge origin/main',
        sandboxNudge:
          'Running fetch then merge separately gives you a chance to inspect before committing to the merge.',
      },
      visual: {
        title: 'fetch is always safe',
        body: 'Fetch never changes your working files. It only updates your knowledge of what the remote has. Think of fetch as checking your email — you see what arrived but nothing in your workspace changes until you decide to act on it.',
        callout:
          'git fetch origin followed by git diff main origin/main shows you exactly what changed on the remote before you merge.',
        code: '# Safe workflow:\ngit fetch origin\n\n# See what changed\ngit diff main origin/main\n\n# Decide to merge when ready\ngit merge origin/main',
        sandboxCode: '# Inspect before merging:\ngit fetch origin\ngit diff main origin/main',
        sandboxNudge:
          'The diff shows line-by-line what changed on the remote — no surprises when you merge.',
      },
    },
  },
]

export const QUIZ = {
  question:
    'Your teammate pushed a fix. You want to see what changed before it touches your code. Which command?',
  options: [
    { id: 'a', label: 'git pull origin main', correct: false },
    { id: 'b', label: 'git fetch origin', correct: true },
    { id: 'c', label: 'git push origin main', correct: false },
    { id: 'd', label: 'git status', correct: false },
  ],
  correctFeedback: 'Exactly right. Fetch downloads without changing your files.',
  wrongFeedback: 'Not quite. Fetch is the safe one — try again.',
}

export const MODULES = [
  { number: 1, title: 'Why Git exists', duration: '15 min' },
  { number: 2, title: 'Tracking changes', duration: '18 min' },
  { number: 3, title: 'Branches', duration: '20 min' },
  { number: 4, title: 'GitHub: Remotes', duration: '22 min' },
  { number: 5, title: 'Pull requests', duration: '20 min' },
  { number: 6, title: 'Undoing things', duration: '15 min' },
  { number: 7, title: 'Real workflow', duration: '18 min' },
  { number: 8, title: 'Final project', duration: '12 min' },
]
