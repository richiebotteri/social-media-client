import { getPosts } from "../api/index.js"
import { getProfiles } from "../api/profiles/read.js"
import { load } from "../storage/load.js"
import { save } from "../storage/save.js"
import { postLoaderTemplate, postThumbnailTemplate } from "../templates/index.js"
import { renderView } from "../ui/renderView.js"
import * as views from "../views/index.js"
import { getSearchParams } from "./searchParams.js"
import { isLoggedIn } from "../api/index.js"

function authGuard(callback = () => { }) {
  if (isLoggedIn()) {
    return callback()
  } else {
    document.querySelector('[data-auth=register]').click()
    const message = document.createElement("div")
    message.classList.add("alert", "alert-warning")
    message.innerText = "Please register or login to view this page."
    return message
  }
}

async function route() {
  const { view, postId, name } = getSearchParams()
  switch (view) {
    case "post":
      return authGuard(() => {
        const loader = postLoaderTemplate()
        renderView(loader)
        return views.postPage(postId)
      })

    case "profile":
      return authGuard(() => views.profilePage(name))

    case "profiles":
      return authGuard(async () => {
        const profiles = await getProfiles()
        return views.profileList(profiles)
      })

    case "posts":
    default:
      return authGuard(async () => {
        const loaders = Array.from({ length: load("posts:lastTime") || 3 }, () => postLoaderTemplate())
        renderView(...loaders)
        const posts = await getPosts()
        save("posts:lastTime", posts.length)
        return views.postList(posts)
      })
  }
}

export default async () => {
  const view = await route()
  renderView(view);
}