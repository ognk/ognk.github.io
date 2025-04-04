(function() {
  'use strict';

  // Конфигурация
  const Defined = {
    api: 'anilib',
    localhost: 'https://anilib.me/'
  };

  // Генерация уникального ID
  let unic_id = Lampa.Storage.get('anilib_unic_id', '');
  if (!unic_id) {
    unic_id = Lampa.Utils.uid(8).toLowerCase();
    Lampa.Storage.set('anilib_unic_id', unic_id);
  }

  // Основной компонент
  function AnilibComponent(object) {
    this.initialize = function() {
      // Инициализация WebView
      const webview = new Lampa.WebView({
        url: Defined.localhost,
        title: 'Anilib',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36',
        settings: {
          javascript: true,
          dom_storage: true,
          load_images: true,
          mixed_content: true
        }
      });

      // Обработка навигации
      webview.on('back', () => {
        if (webview.canGoBack()) webview.goBack();
        else Lampa.Activity.backward();
      });

      webview.on('load', (url) => {
        if (!url.includes(Defined.localhost)) webview.stopLoading();
      });

      // Добавление WebView в интерфейс
      this.activity.loader(false);
      this.activity.append(webview.render());
    };

    this.render = function() {
      return $('<div></div>');
    };

    this.destroy = function() {
      // Очистка ресурсов
    };
  }

  // Инициализация плагина
  function startPlugin() {
    if (window.anilib_plugin_ready) return;
    window.anilib_plugin_ready = true;

    // Регистрация компонента
    Lampa.Component.add('anilib', AnilibComponent);

    // Локализация
    Lampa.Lang.add({
      anilib_title: {
        ru: 'Anilib',
        en: 'Anilib',
        uk: 'Anilib'
      },
      anilib_description: {
        ru: 'Просмотр аниме через Anilib.me',
        en: 'Watch anime via Anilib.me',
        uk: 'Перегляд аніме через Anilib.me'
      }
    });

    // Добавление кнопки в карточку медиа
    Lampa.Listener.follow('full', (e) => {
      if (e.type === 'complite') {
        const btn = $(`
          <div class="full-start__button selector view--anilib">
            <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M10 16.5l6-4.5-6-4.5v9z"/></svg>
            <span>#{anilib_title}</span>
          </div>
        `);

        btn.on('hover:enter', () => {
          Lampa.Activity.push({
            title: Lampa.Lang.translate('anilib_title'),
            component: 'anilib'
          });
        });

        e.object.activity.render().find('.view--torrent').after(btn);
      }
    });

    // Регистрация в манифесте
    Lampa.Manifest.plugins = {
      type: 'video',
      version: '1.0',
      name: 'Anilib Browser',
      description: 'Оптимизированный браузер для anilib.me',
      component: 'anilib',
      onContextMenu: function(object) {
        return {
          name: Lampa.Lang.translate('anilib_title'),
          description: Lampa.Lang.translate('anilib_description')
        };
      },
      onContextLauch: function(object) {
        Lampa.Activity.push({
          title: Lampa.Lang.translate('anilib_title'),
          component: 'anilib'
        });
      }
    };
  }

  // Запуск при готовности приложения
  if (window.appready) startPlugin();
  else {
    Lampa.Listener.follow('app', (e) => {
      if (e.type === 'ready') startPlugin();
    });
  }
})();
