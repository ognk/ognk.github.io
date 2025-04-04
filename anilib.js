(function () {
    'use strict';

    // Конфигурация
    const ANIMELIB_URL = 'https://animelib.me';
    const MENU_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6B6B">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`;

    // Основной компонент
    class AnimelibComponent {
        constructor() {
            this.browserConfig = {
                url: ANIMELIB_URL,
                title: 'Animelib.me',
                width: '85vw',
                height: '80vh',
                onBack: this.handleBrowserClose.bind(this)
            };
        }

        handleBrowserClose() {
            Lampa.Controller.toggle('content');
        }

        openBrowser() {
            Lampa.Browser.show(this.browserConfig);
            Lampa.Controller.add('browser', {
                back: this.handleBrowserClose,
                up: () => Navigator.move('up'),
                down: () => Navigator.move('down')
            });
        }

        render() {
            return $('<div class="animelib-wrapper"></div>');
        }
    }

    // Инициализация плагина
    function initPlugin() {
        // Регистрация компонента
        Lampa.Component.add('Animelib', AnimelibComponent);

        // Добавление кнопки в меню
        const menuItem = $(`
            <li class="menu__item selector">
                <div class="menu__ico">${MENU_ICON}</div>
                <div class="menu__text">Animelib</div>
            </li>
        `);

        menuItem.on('hover:enter', () => {
            Lampa.Activity.push({
                component: 'Animelib',
                url: '',
                title: 'Animelib',
                anim: true
            });
        });

        // Стилизация
        Lampa.Template.add('Animelib-Styles', `
            .animelib-wrapper {
                padding: 20px;
                background: rgba(0, 0, 0, 0.9);
            }
            .browser-container {
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
            }
        `);

        $('body').append(Lampa.Template.get('Animelib-Styles'));
        $('.menu__list').first().append(menuItem);
    }

    // Запуск
    if (!window.animelib_initialized) {
        initPlugin();
        window.animelib_initialized = true;
    }
})();
