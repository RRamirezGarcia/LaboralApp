routes= [
  {
    path: '/',
    url: './index.html',
  },
  {
    name: 'perfil',
    path: '/perfil/',
    url: './pages/Perfil.html',
  },
  {
    name: 'actualiza_perfil',
    path: '/actualiza-perfil/',
    url: './pages/ActualizaPerfil.html',
  },
  {
    path: '/estructura/',
    url: './pages/EstructuraSueldo.html',
  },
  {
    name: 'boleta_mes',
    path: '/boleta/',
    url: './pages/BoletaMes.html',
  },
  {
    name: 'boleta_mes_trabajador',
    path: '/boleta_mes_trabajador/',
    url: './pages/BoletaTrabajador.html',
  },
  {
    name: 'liquidacion',
    path: '/liquidacion/',
    url: './pages/Liquidacion.html',
  },
  {
    name: 'liquidacion_trabajador',
    path: '/liquidacion_trabajador/',
    url: './pages/LiquidacionTrabajador.html',
  }
  /*{
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [
            {
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve(
          {
            componentUrl: './pages/request-and-load.html',
          },
          {
            context: {
              user: user,
            }
          }
        );
      }, 1000);
    },
  },*/
];
