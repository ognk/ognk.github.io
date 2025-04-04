(function () {
    'use strict';

    const ANIMELIB_URL = 'https://anilib.me';
    const MENU_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6B6B" width="24" height="24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`;

    // Компонент для главного меню
    class AnimelibMenu {
        constructor() {
            this.element = this.createMenuButton();
            this.addEventListeners();
        }

        createMenuButton() {
            return $(`
                <div class="selector menu-main__item">
                    <div class="menu-main__ico">${MENU_ICON}</div>
                    <div class="menu-main__text">Animelib</div>
                </div>
            `);
        }

        addEventListeners() {
            this.element.on('hover:enter', () => this.openBrowser());
        }

        openBrowser() {
            Lampa.Browser.show({
                url: ANIMELIB_URL,
                title: 'Animelib.me',
                width: '90%',
                height: '80%',
                template: 'default',
                onBack: () => Lampa.Controller.toggle('main')
            });

            Lampa.Controller.add('browser', {
                back: () => Lampa.Browser.hide(),
                up: () => Navigator.move('up'),
                down: () => Navigator.move('down')
            });
        }

        // Обязательные методы компонента
        start() { return this.element }
        pause() {}
        stop() {}
        destroy() { this.element.remove() }
    }

    // Инициализация плагина
    function initPlugin() {
        // Регистрация в главном меню
        Lampa.MenuMain.add('animelib', {
            name: 'Animelib',
            component: AnimelibMenu,
            position: 15
        });

        // Стили для интеграции
        Lampa.Template.add('Animelib-Styles', `
            .menu-main__item[data-name="animelib"] {
                background: rgba(255, 107, 107, 0.1);
                border-radius: 8px;
                margin: 5px 0;
            }
            .menu-main__item[data-name="animelib"] .menu-main__ico {
                background: linear-gradient(45deg, #FF6B6B, #FF8E8E);
            }
        `);

        $('body').append(Lampa.Template.get('Animelib-Styles'));
    }

    // Запуск плагина
    if (!window.animelib_main_menu) {
        initPlugin();
        window.animelib_main_menu = true;
    }
})();
