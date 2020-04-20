import Vue from 'vue'
import Meta from 'vue-meta'
import ClientOnly from 'vue-client-only'
import NoSsr from 'vue-no-ssr'
import { createRouter } from './router.js'
import NuxtChild from './components/nuxt-child.js'
import NuxtError from './components/nuxt-error.vue'
import Nuxt from './components/nuxt.js'
import App from './App.js'
import { setContext, getLocation, getRouteData, normalizeError } from './utils'

/* Plugins */

// Component: <ClientOnly>
Vue.component(ClientOnly.name, ClientOnly)

// TODO: Remove in Nuxt 3: <NoSsr>
Vue.component(NoSsr.name, {
  ...NoSsr,
  render (h, ctx) {
    if (process.client && !NoSsr._warned) {
      NoSsr._warned = true

      console.warn('<no-ssr> has been deprecated and will be removed in Nuxt 3, please use <client-only> instead')
    }
    return NoSsr.render(h, ctx)
  }
})

// Component: <NuxtChild>
Vue.component(NuxtChild.name, NuxtChild)
Vue.component('NChild', NuxtChild)

// Component NuxtLink is imported in server.js or client.js

// Component: <Nuxt>
Vue.component(Nuxt.name, Nuxt)

Vue.use(Meta, {"keyName":"head","attribute":"data-n-head","ssrAttribute":"data-n-head-ssr","tagIDKeyName":"hid"})

const defaultTransition = {"name":"page","mode":"out-in","appear":true,"appearClass":"appear","appearActiveClass":"appear-active","appearToClass":"appear-to"}

async function createApp (ssrContext) {
  const router = await createRouter(ssrContext)

  // Create Root instance

  // here we inject the router and store to all child components,
  // making them available everywhere as `this.$router` and `this.$store`.
  const app = {
    head: {"title":"lawFirmDoc","meta":[{"charset":"utf-8"},{"name":"viewport","content":"width=device-width, initial-scale=1"},{"hid":"description","name":"description","content":"market place where user can purchase law related document"}],"link":[{"rel":"icon","type":"image\u002Fx-icon","href":"\u002Ffavicon.ico"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fmaterial\u002Fmaterial.min.css"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fmaterial\u002Fmdl-selectfield.min.css"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fanimateheading\u002Fanimateheading.min.css"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fowl_carousel\u002Fowl.carousel.min.css"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fanimate\u002Fanimate.min.css"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fmagnific_popup\u002Fmagnific-popup.min.css"},{"rel":"stylesheet","type":"","href":"assets\u002Fplugin\u002Fflexslider\u002Fflexslider.min.css"},{"rel":"stylesheet","type":"","href":"dist\u002Fcss\u002Fstyle.css"}],"script":[{"src":"assets\u002Fplugin\u002Fjquery\u002Fjquery-2.1.4.min.js"},{"src":"assets\u002Fplugin\u002Fpopper\u002Fpopper.min.js"},{"src":"assets\u002Fplugin\u002Fbootstrap\u002Fbootstrap.min.js"},{"src":"assets\u002Fplugin\u002Fmodernizr\u002Fmodernizr.js"},{"src":"assets\u002Fplugin\u002Fanimateheading\u002Fanimateheading.js"},{"src":"assets\u002Fplugin\u002Fmaterial\u002Fmaterial.min.js"},{"src":"assets\u002Fplugin\u002Fmaterial\u002Fmdl-selectfield.min.js"},{"src":"assets\u002Fplugin\u002Fflexslider\u002Fjquery.flexslider.min.js"},{"src":"assets\u002Fplugin\u002Fowl_carousel\u002Fowl.carousel.min.js"},{"src":"assets\u002Fplugin\u002Fscrolltofixed\u002Fjquery-scrolltofixed.min.js"},{"src":"assets\u002Fplugin\u002Fmagnific_popup\u002Fjquery.magnific-popup.min.js"},{"src":"assets\u002Fplugin\u002Fwaypoints\u002Fjquery.waypoints.min.js"},{"src":"assets\u002Fplugin\u002Fcounterup\u002Fjquery.counterup.js"},{"src":"assets\u002Fplugin\u002Fmasonry_pkgd\u002Fmasonry.pkgd.min.js"},{"src":"assets\u002Fplugin\u002Fsmoothscroll\u002Fsmoothscroll.min.js"},{"src":"dist\u002Fjs\u002Fcustom.js"}],"style":[]},

    router,
    nuxt: {
      defaultTransition,
      transitions: [defaultTransition],
      setTransitions (transitions) {
        if (!Array.isArray(transitions)) {
          transitions = [transitions]
        }
        transitions = transitions.map((transition) => {
          if (!transition) {
            transition = defaultTransition
          } else if (typeof transition === 'string') {
            transition = Object.assign({}, defaultTransition, { name: transition })
          } else {
            transition = Object.assign({}, defaultTransition, transition)
          }
          return transition
        })
        this.$options.nuxt.transitions = transitions
        return transitions
      },

      err: null,
      dateErr: null,
      error (err) {
        err = err || null
        app.context._errored = Boolean(err)
        err = err ? normalizeError(err) : null
        let nuxt = app.nuxt // to work with @vue/composition-api, see https://github.com/nuxt/nuxt.js/issues/6517#issuecomment-573280207
        if (this) {
          nuxt = this.nuxt || this.$options.nuxt
        }
        nuxt.dateErr = Date.now()
        nuxt.err = err
        // Used in src/server.js
        if (ssrContext) {
          ssrContext.nuxt.error = err
        }
        return err
      }
    },
    ...App
  }

  const next = ssrContext ? ssrContext.next : location => app.router.push(location)
  // Resolve route
  let route
  if (ssrContext) {
    route = router.resolve(ssrContext.url).route
  } else {
    const path = getLocation(router.options.base, router.options.mode)
    route = router.resolve(path).route
  }

  // Set context to app.context
  await setContext(app, {
    route,
    next,
    error: app.nuxt.error.bind(app),
    payload: ssrContext ? ssrContext.payload : undefined,
    req: ssrContext ? ssrContext.req : undefined,
    res: ssrContext ? ssrContext.res : undefined,
    beforeRenderFns: ssrContext ? ssrContext.beforeRenderFns : undefined,
    ssrContext
  })

  // Plugin execution

  // If server-side, wait for async component to be resolved first
  if (process.server && ssrContext && ssrContext.url) {
    await new Promise((resolve, reject) => {
      router.push(ssrContext.url, resolve, () => {
        // navigated to a different route in router guard
        const unregister = router.afterEach(async (to, from, next) => {
          ssrContext.url = to.fullPath
          app.context.route = await getRouteData(to)
          app.context.params = to.params || {}
          app.context.query = to.query || {}
          unregister()
          resolve()
        })
      })
    })
  }

  return {
    app,
    router
  }
}

export { createApp, NuxtError }
