const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/gn-drive/projects/UranDev/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/gn-drive/projects/UranDev/src/pages/404.js"))),
  "component---src-pages-explore-js": hot(preferDefault(require("/Users/gn-drive/projects/UranDev/src/pages/explore.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/Users/gn-drive/projects/UranDev/src/pages/index.js"))),
  "component---src-pages-profile-js": hot(preferDefault(require("/Users/gn-drive/projects/UranDev/src/pages/profile.js"))),
  "component---src-pages-projects-js": hot(preferDefault(require("/Users/gn-drive/projects/UranDev/src/pages/projects.js")))
}

