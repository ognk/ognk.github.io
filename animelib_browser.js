(function () {
    'use strict';

    const ANIMELIB_URL = 'https://animelib.me';
    const MENU_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6B6B">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`;

    class AnimelibMain {
        constructor() {
            this.html = $('<div class="animelib-main"></div>');
            this.initBrowser();
        }

        initBrowser() {
            this.browserConfig = {
                url: ANIMELIB_URL,
                title: 'Animelib.me',
                width: '90%',
                height: '80%',
                onBack: () => this.destroy()
            };
        }

        // Обязательные методы компонента
        start() {
            Lampa.Browser.show(this.browserConfig);
            return this.html;
        }

        pause() {} // Фикс ошибки component.pause
        stop() {}
        destroy() {
            Lampa.Browser.hide();
            this.html.remove();
        }
    }

    function initPlugin() {
        // Регистрация в главном меню
        Lampa.MenuMain.add('animelib', {
            name: 'Animelib',
            component: AnimelibMain,
            icon: MENU_ICON,
            position: 3, // Позиция после Shikimori
            onReady: (component) => component.start()
        });

        // Стили для интеграции
        Lampa.Template.add('Animelib-Styles', `
            [data-menu="animelib"] {
                color: #FF6B6B !important;
            }
            [data-menu="animelib"] .menu-main__ico {
                background: rgba(255,107,107,0.1);
            }
        `);

        $('body').append(Lampa.Template.get('Animelib-Styles'));
    }

    if (!window.animelib_fixed) {
        initPlugin();
        window.animelib_fixed = true;
    }
})();
