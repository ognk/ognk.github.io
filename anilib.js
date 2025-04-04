(function() {
  'use strict';

  function startPlugin() {
    // Функция добавления пункта меню
    function addMenuItem() {
      const button = $(`
        <li class="menu__item selector">
          <div class="menu__ico">📚</div>
          <div class="menu__text">Anilib</div>
        </li>
      `);

      // Обработчик клика
      button.on('hover:enter', () => {
        Lampa.Browser.open({
          url: 'https://anilib.me',
          title: 'Anilib',
          autoload: true,
          user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36'
        });
      });

      // Добавляем в главное меню
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
