Lampa.Plugin.register({
    name: 'anilib_browser',
    version: '1.0.0',
    description: 'Быстрый доступ к Anilib',
    init: function() {
        // Добавляем пункт меню
        Lampa.Controller.addMenu({
            title: 'Anilib 📚',
            url: '/anilib',
            icon: '',
            page: 'anilib_browser',
            component: 'anilib_browser',
            activate: function() {
                // Открываем внутренний браузер
                Lampa.Browser.open({
                    url: 'https://anilib.me',
                    title: 'Anilib',
                    autoload: true
                });
            }
        });
    }
});
