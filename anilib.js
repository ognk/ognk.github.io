(function() {
  'use strict';

  function startPlugin() {
    // Добавление пункта меню
    function addMenuItem() {
      const button = $(`
        <li class="menu__item selector">
          <div class="menu__ico">📚</div>
          <div class="menu__text">Anilib</div>
        </li>
      `);

      button.on('hover:enter', () => {
        // Используем современный метод навигации
        Lampa.Activity.push({
          url: 'https://anilib.me',
          title: 'Anilib',
          component: 'browser'
        });
      });

      $('.menu .menu__list').first().append(button);
    }

    // Инициализация при готовности Lampa
    if (window.appready) {
      addMenuItem();
    } else {
      Lampa.Listener.follow('app', (e) => {
        if (e.type === 'ready') addMenuItem();
      });
    }
  }

  // Запуск плагина
  if (!window.plugin_anilib_browser_ready) {
    window.plugin_anilib_browser_ready = true;
    startPlugin();
  }
})();
