(function () {
    'use strict';

    const ANIMELIB_URL = 'https://anilib.me';
    const MENU_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6B6B">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`;

    class AnimelibComponent {
        constructor() {
            this.browserConfig = {
                url: ANIMELIB_URL,
                title: 'Animelib',
                width: '90%',
                height: '80%',
                onBack: () => this.destroy()
            };
        }

        // Обязательные методы
        start() {
            Lampa.Browser.show(this.browserConfig);
            return $('<div class="animelib-root"></div>');
        }

        pause() {} // Фикс ошибки
        stop() {}
        destroy() {
            Lampa.Browser.hide();
        }
    }

    function initPlugin() {
        // Способ 1: Через MenuMain (если доступен)
        if (Lampa.MenuMain && Lampa.MenuMain.add) {
            Lampa.MenuMain.add('animelib', {
                name: 'Animelib',
                component: AnimelibComponent,
                icon: MENU_ICON,
                position: 3
            });
        } 
        // Способ 2: Прямое добавление в DOM
        else {
            const menuItem = $(`
                <li class="menu-main__item selector">
                    <div class="menu-main__ico">${MENU_ICON}</div>
                    <div class="menu-main__text">Animelib</div>
                </li>
            `);

            menuItem.on('hover:enter', () => {
                Lampa.Activity.push({
                    component: AnimelibComponent,
                    url: '',
                    title: 'Animelib'
                });
            });

            $('.menu-main__list').append(menuItem);
        }

        // Стилизация
        Lampa.Template.add('animelib-styles', `
            .animelib-root {
                background: rgba(0,0,0,0.95);
            }
            [data-menu="animelib"] .menu-main__ico {
                background: #FF6B6B33;
                border-radius: 6px;
            }
        `);

        $('body').append(Lampa.Template.get('animelib-styles'));
    }

    // Отложенная инициализация
    if (!window.animelib_installed) {
        setTimeout(() => {
            if (typeof Lampa !== 'undefined') {
                initPlugin();
                window.animelib_installed = true;
            }
        }, 500);
    }
})();
