
export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: '', href: "assets/plugin/material/material.min.css"},
      { rel: 'stylesheet', type: '', href: "assets/plugin/material/mdl-selectfield.min.css" },
      { rel: 'stylesheet', type: '', href: "assets/plugin/animateheading/animateheading.min.css" },
      { rel: 'stylesheet', type: '', href: "assets/plugin/owl_carousel/owl.carousel.min.css" },
      { rel: 'stylesheet', type: '', href: "assets/plugin/animate/animate.min.css"},
      { rel: 'stylesheet', type: '', href: "assets/plugin/magnific_popup/magnific-popup.min.css"},
      { rel: 'stylesheet', type: '', href: "assets/plugin/flexslider/flexslider.min.css" },
        {rel: 'stylesheet', type: '', href: "dist/css/style.css"}
    ],
    script: [
      { src:"assets/plugin/jquery/jquery-2.1.4.min.js" },
      { src:"assets/plugin/popper/popper.min.js" },
      { src:"assets/plugin/bootstrap/bootstrap.min.js" },
      { src:"assets/plugin/modernizr/modernizr.js"},
      { src:"assets/plugin/animateheading/animateheading.js" },
      { src:"assets/plugin/material/material.min.js"  },
      { src:"assets/plugin/material/mdl-selectfield.min.js"  },
      { src:"assets/plugin/flexslider/jquery.flexslider.min.js" },
      { src:"assets/plugin/owl_carousel/owl.carousel.min.js" },
      { src:"assets/plugin/scrolltofixed/jquery-scrolltofixed.min.js" },
      { src:"assets/plugin/magnific_popup/jquery.magnific-popup.min.js" },
      { src:"assets/plugin/waypoints/jquery.waypoints.min.js"},
      { src:"assets/plugin/counterup/jquery.counterup.js"},
      { src:"assets/plugin/masonry_pkgd/masonry.pkgd.min.js"},
      { src:"assets/plugin/smoothscroll/smoothscroll.min.js"},
      { src:"dist/js/custom.js"}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
