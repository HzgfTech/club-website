# Huanzao Workshop Website

The home page supports Chinese and English. Other pages currently use Chinese. The site uses React, Vite, TypeScript, and independent HTML entry points.

## Run

    Set-Location D:\hzgftech\club-website
    npm ci
    npm run dev

Preview: http://127.0.0.1:5173/.

    npm test
    npm run build
    npm run preview

Production output is in dist/. Keep all HTML entry points when deploying.

## Pages

- index.html: club introduction, projects, members, public resources
- works.html and work.html: projects and project details
- members.html and member.html: members and profiles
- resources.html and resource.html: public resources and downloads
- about.html and join.html: club information and joining

## Public content

Edit content/public-content/catalog.json and assets in content/public-files/. IDs use lowercase ASCII letters, numbers, and hyphens. Resource file names must refer to files in content/public-files/. The sync script copies only listed resources and the visual mark into generated public assets.

Only publish content approved for public display. Do not place account records, credentials, recovery codes, or private documents in this folder.

## Forms and privacy

Forms create an email draft for the visitor to review and send. The site does not send email or store submissions. There is no online application or review backend.

## Contributions

Bug fixes, accessibility improvements, and translations are welcome through pull requests. Public member profiles, project links, and downloads require approval from their owners. Do not submit personal information, credentials, or private club documents.

## Checks

npm test checks the public catalog and external-data boundary. Browser verification notes are in verification-record.md. Local browser captures and scripts belong under ignored output/playwright/.
