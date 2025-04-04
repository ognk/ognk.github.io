(function () {
    'use strict';

    // Конфигурация
    const ANIMELIB_URL = 'https://animelib.me';
    const MENU_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FF6B6B">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
    </svg>`;

    // Главный компонент
    class AnimelibComponent {
        constructor(params) {
            this.params = params;
            this.initComponents();
        }

        initComponents() {
            this.scroll = new Lampa.Scroll({mask: true});
            this.html = $('<div class="animelib-container"></div>');
            this.menu = this.createMenu();
        }

        createMenu() {
            return $(`
                <div class="animelib-menu">
                    <div class="selector" data-action="browser">
                        <div class="animelib-ico">${MENU_ICON}</div>
                        <div class="animelib-text">Открыть браузер</div>
                    </div>
                </div>
            `);
        }

        start() {
            this.bindEvents();
            this.html.append(this.menu);
            this.html.append(this.scroll.render());
            return this.html;
        }

        bindEvents() {
            this.menu.find('[data-action="browser"]').on('hover:enter', () => {
                Lampa.Browser.show({
                    url: ANIMELIB_URL,
                    title: 'Animelib.me',
                    width: '90%',
                    height: '80%',
                    template: 'default',
                    onBack: () => this.handleBack()
                });
            });
        }

        handleBack() {
            Lampa.Controller.toggle('content');
            this.destroy();
        }

        pause() {}
        stop() {}
        destroy() {
            this.scroll.destroy();
            this.html.remove();
        }
    }

    // Инициализация плагина
    function initPlugin() {
        // Регистрация компонента
        Lampa.Component.add('Animelib', AnimelibComponent);

        // Добавление в главное меню
        Lampa.MenuMain.add('animelib', {
            name: 'Animelib',
            component: AnimelibComponent,
            params: {},
            position: 5
        });

        // Стилизация
        Lampa.Template.add('Animelib-Styles', `
            .animelib-container {
                padding: 20px;
                background: rgba(0, 0, 0, 0.95);
            }
            .animelib-menu {
                margin-bottom: 30px;
            }
            .animelib-ico {
                width: 24px;
                height: 24px;
                margin-right: 15px;
            }
            .animelib-text {
                font-size: 1.2em;
                color: #FF6B6B;
            }
        `);

        $('body').append(Lampa.Template.get('Animelib-Styles'));
    }

    // Запуск
    if (!window.animelib_plugin) {
        initPlugin();
        window.animelib_plugin = true;
    }
})();
