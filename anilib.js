class AnimelibComponent {
    constructor() {
        // Инициализация параметров
        this.browserConfig = {
            url: 'https://anilib.me',
            title: 'Anilib.me',
            width: '85vw',
            height: '80vh',
            onBack: this.handleBrowserClose.bind(this)
        };
    }

    // Обязательный метод для Activity
    start() {
        this.openBrowser();
        return this.render();
    }

    // Остальные методы
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

    // Дополнительные методы жизненного цикла
    pause() {}
    stop() {}
    destroy() {}
}
