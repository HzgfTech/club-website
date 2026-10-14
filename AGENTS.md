# Website agent guide

## Start here

This is the public website repository for Huanzao Workshop, the game development club at Zhejiang University of Science and Technology.

- Local checkout: `D:/hzgftech/club-website`.
- GitHub: `git@github.com:HzgfTech/club-website.git`, remote `github`.
- GitCode: `git@gitcode.com:HzgfTech/club-website.git`, remote `gitcode`.
- Production branch: `main`.
- Live website: `https://hzgf.tech/`.
- Cloudflare Pages project: `hzgftech-club`; default hostname: `hzgftech-club.pages.dev`.
- Cloudflare account email: `hzgftech@protonmail.com`.

Use this checkout, not the parent workspace Git repository or an old website folder. On the current Windows host, also read `C:/Users/GT14/.agents/AGENTS.md` and applicable parent instructions. Keep repository and directory names in English; Chinese website text stays public, with the existing English home page preserved.

Routine content updates and deployments need no external research. Follow this runbook; consult external documentation only for a concrete unresolved deployment error. Run tests only when the user requests them.

## Source map

| Path | Purpose |
| --- | --- |
| `src/pages/` | Home, showcase, members, resources, about, and joining pages |
| `src/App.tsx` | Navigation, home language switch, footer, page selection |
| `src/components/`, `src/lib/` | Shared UI, contact dialog, catalog parsing, local browser state |
| `src/styles.css` | Shared visual styles and responsive layouts |
| `content/public-content/catalog.json` | Public club contacts, works, members, and downloadable resources |
| `content/public-files/` | Source files approved for public download |
| `public/images/` | Public member portraits, project covers, and tutorial images |
| `scripts/sync-resources.mjs` | Copies catalog-listed downloads and generates `public/data/catalog.json` |
| `scripts/offline.mjs` | Generates the service worker in the finished build |
| `dist/` | Generated deployment output; ignored by Git |

Keep React, Vite, TypeScript, and the nine independent HTML entry points. Use ordinary page links; this is not a single-page app. Edit source content, not generated `public/data/`, `public/downloads/`, or `dist/`. The sync command removes stale generated downloads.

Forms prepare an email draft for the visitor to review and send. There is no submission backend. Do not claim a form was sent or saved remotely. Public contact data belongs in the catalog; account credentials belong outside this public checkout.

## Build on the current Windows host

Use a real PowerShell 7 terminal or the agent's shell command tool. Do not use the sandboxed Node REPL to spawn npm or change the process working directory. Do not nest Windows PowerShell 5.1 inside PowerShell 7; the private archive scripts require modern .NET.

```powershell
$ErrorActionPreference = 'Stop'
$website = 'D:/hzgftech/club-website'
$automationRoot = 'D:/hzgftech'
Set-Location $website
git status --short
git diff --stat
git diff

# For a fresh checkout, install the locked dependencies first:
# npm.cmd ci

npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Website build failed.' }
```

The build synchronizes public resources, checks TypeScript, builds all HTML pages, and regenerates offline caching. `npm.cmd run dev` uses port 5173; `npm.cmd run preview` uses port 4173. Run or add tests only when requested; the existing suite is `npm.cmd test`.

## Commit and push to both platforms

Inspect the current diff and include the website changes requested for publication. Stage exact reviewed paths. The following list is an example for a home page/catalog/documentation update; adjust it to the actual changed files, including any new images or download sources.

```powershell
Set-Location $website
git branch --show-current
git remote -v
git add -- src/pages/Home.tsx content/public-content/catalog.json AGENTS.md agent.md README.md
git diff --cached --check
if ($LASTEXITCODE -ne 0) { throw 'Staged diff check failed.' }
git diff --cached
git commit -m 'Describe the website update'
if ($LASTEXITCODE -ne 0) { throw 'Commit failed.' }
git push github main
if ($LASTEXITCODE -ne 0) { throw 'GitHub push failed.' }
git push gitcode main
if ($LASTEXITCODE -ne 0) { throw 'GitCode push failed.' }
git rev-parse HEAD
git ls-remote github refs/heads/main
git ls-remote gitcode refs/heads/main
```

For an authorized production update, work on `main` and compare both remote main hashes with the local commit. Do not force-push or create the already-existing repositories again. If one push fails, report which platform succeeded and fix the remaining push. For contribution work without production authorization, use a `codex/` branch and follow the requested delivery scope.

The current checkout already uses Windows OpenSSH and the owner's local SSH key. If Git reports `error in libcrypto`, configure this repository to use Windows OpenSSH rather than Git's bundled SSH:

```powershell
git config --local core.sshCommand 'C:/Windows/System32/OpenSSH/ssh.exe -o IdentitiesOnly=yes -i D:/hzgftech/hzgfssh -o StrictHostKeyChecking=accept-new -o BatchMode=yes'
```

That key path is specific to this host. On another computer, use the successor's authorized key path. Never copy the private key into this public repository.

## Deploy

Pushing Git does not publish this Direct Upload project. After the build and requested Git delivery succeed, run the existing publisher:

```powershell
& (Join-Path $automationRoot 'tools/Publish-ClubWebsite.ps1') -WebsitePath $website
```

The publisher uploads `dist/` with Wrangler to project `hzgftech-club`, production branch `main`. It reuses the existing custom domain and creates its proxied apex CNAME when absent. It stops on conflicting apex records and preserves unrelated DNS records. Do not upload the source tree or the parent workspace.

Credentials are already configured on this host. Reuse `tools/ClubCredentials.psm1`; do not request, print, regenerate, or paste tokens into commands. The wrapper reads `credentials/credentials.json` beside its `tools/` directory, with Windows Credential Manager as a migration fallback. The owner explicitly stores plaintext API credentials in the private `club-private` repositories. None of that file's values belong in this public repository, build, documentation, or logs.

Cloudflare uses its existing Global API Key with `X-Auth-Key` and `X-Auth-Email`. The publisher supplies `CLOUDFLARE_API_KEY` and `CLOUDFLARE_EMAIL` to Wrangler and restores the prior environment afterward. Do not change this workflow to require a different token. For API inspection:

```powershell
& (Join-Path $automationRoot 'tools/Test-ClubApiAuth.ps1') -Services Cloudflare
& (Join-Path $automationRoot 'tools/Invoke-ClubCloudflare.ps1') -Path 'zones?name=hzgf.tech'
```

If Cloudflare returns `403 / 9103`, check the saved account email first: it is `hzgftech@protonmail.com`. Pages project listing rejects `per_page=100`; the publisher already uses the API's default pagination.

## Another computer or a clean workspace

With account access already configured, clone the public website and private automation repositories as siblings. The private repository contains `tools/` and `credentials/credentials.json`.

```powershell
Set-Location 'D:/club'
git clone git@github.com:HzgfTech/club-website.git club-website
git clone git@github.com:HzgfTech/club-private.git club-private
$website = 'D:/club/club-website'
$automationRoot = 'D:/club/club-private'
Set-Location $website
git remote rename origin github
git remote add gitcode git@gitcode.com:HzgfTech/club-website.git
npm.cmd ci
if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
npm.cmd run build
if ($LASTEXITCODE -ne 0) { throw 'Website build failed.' }
& (Join-Path $automationRoot 'tools/Publish-ClubWebsite.ps1') -WebsitePath $website
```

Change the workspace path to an existing local directory. The plaintext private credential file can be read directly; no archive decryption is required for API deployment. Never nest the private clone inside the public website checkout.

## Confirm delivery

Check the publisher exit status and deployment URL, both remote Git hashes, and the production page:

```powershell
(Invoke-WebRequest -Uri 'https://hzgf.tech/' -TimeoutSec 30).StatusCode
$catalog = Invoke-RestMethod -Uri 'https://hzgf.tech/data/catalog.json' -TimeoutSec 30
$catalog.club.name
git status --short
```

Inspect the changed content or built asset URLs to confirm the new deployment is served; HTTP 200 alone does not prove freshness. For visible UI changes, check the affected page and preserve Chinese/English home switching. Report the commit, both push results, deployment result, and any check not performed. Do not call the site updated if only Git was pushed.

References: [OpenAI AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md), [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).
