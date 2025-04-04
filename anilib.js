(function() {
  'use strict';

  // Инициализация плагина
  function startPlugin() {
    // Добавляем пункт меню
    Lampa.Menu.add('anilib_browser', {
      title: 'Anilib',
      icon: 'https://anilib.me/favicon.ico',
      page: function() {
        // Создаем WebView
        const webview = new Lampa.WebView({
          url: 'https://anilib.me',
          title: 'Anilib',
          userAgent: 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
          settings: {
            javascript: true,
            dom_storage: true,
            load_images: true,
            mixed_content: true
          }
        });

        // Обработка нажатия Back
        webview.on('back', () => {
          if (webview.canGoBack()) webview.goBack();
          else Lampa.Activity.backward();
        });

        // Блокировка внешних доменов
        webview.on('load', (url) => {
          if (!url.includes('anilib.me')) webview.stopLoading();
        });

        // Добавляем WebView на страницу
        this.activity.loader(false);
        this.activity.append(webview.render());
      }
    });
  }

  // Запуск плагина
  if (!window.anilib_browser_plugin) {
    startPlugin();
    window.anilib_browser_plugin = true;
  }
})();
