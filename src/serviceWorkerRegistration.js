// serviceWorkerRegistration.js
// Este archivo registra el Service Worker para que la app funcione como PWA.

// Verifica si el navegador soporta Service Workers
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] es la dirección IPv6 para localhost.
    window.location.hostname === '[::1]' ||
    // 127.0.0.0/8 verifica localhost IPv4.
    window.location.hostname.match(
      /^127(?:\.[0-9]+){0,2}\.[0-9]+$/
    )
  );
  
  export function register(config) {
    if ('serviceWorker' in navigator) {
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Ignora si el origen no coincide.
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Verifica Service Worker en localhost.
          checkValidServiceWorker(swUrl, config);
        } else {
          // Registra Service Worker en producción.
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                console.log('Nuevos contenidos están disponibles.');
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                console.log('Contenido se cacheó para uso offline.');
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    fetch(swUrl)
      .then((response) => {
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log('No se puede acceder al Service Worker. Verifica tu conexión.');
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          registration.unregister();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  }
  