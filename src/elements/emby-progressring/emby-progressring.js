import './emby-progressring.css';
import 'webcomponents.js/webcomponents-lite';

/* eslint-disable indent */

    const EmbyProgressRing = Object.create(HTMLDivElement.prototype);

    EmbyProgressRing.createdCallback = function () {
        this.classList.add('progressring');
        const instance = this;

        import('./emby-progressring.template.html').then(({default: template}) => {
            instance.innerHTML = template;

            if (window.MutationObserver) {
                // create an observer instance
                const observer = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        instance.setProgress(parseFloat(instance.getAttribute('data-progress') || '0'));
                    });
                });

                // configuration of the observer:
                const config = { attributes: true, childList: false, characterData: false };

                // pass in the target node, as well as the observer options
                observer.observe(instance, config);

                instance.observer = observer;
            }

            instance.setProgress(parseFloat(instance.getAttribute('data-progress') || '0'));
        });
    };

    EmbyProgressRing.setProgress = function (progress) {
        progress = Math.floor(progress);

        let angle;

        if (progress < 25) {
            angle = -90 + (progress / 100) * 360;

            this.querySelector('.animate-0-25-b').style.transform = 'rotate(' + angle + 'deg)';

            this.querySelector('.animate-25-50-b').style.transform = 'rotate(-90deg)';
            this.querySelector('.animate-50-75-b').style.transform = 'rotate(-90deg)';
            this.querySelector('.animate-75-100-b').style.transform = 'rotate(-90deg)';
        } else if (progress >= 25 && progress < 50) {
            angle = -90 + ((progress - 25) / 100) * 360;

            this.querySelector('.animate-0-25-b').style.transform = 'none';
            this.querySelector('.animate-25-50-b').style.transform = 'rotate(' + angle + 'deg)';

            this.querySelector('.animate-50-75-b').style.transform = 'rotate(-90deg)';
            this.querySelector('.animate-75-100-b').style.transform = 'rotate(-90deg)';
        } else if (progress >= 50 && progress < 75) {
            angle = -90 + ((progress - 50) / 100) * 360;

            this.querySelector('.animate-0-25-b').style.transform = 'none';
            this.querySelector('.animate-25-50-b').style.transform = 'none';
            this.querySelector('.animate-50-75-b').style.transform = 'rotate(' + angle + 'deg)';

            this.querySelector('.animate-75-100-b').style.transform = 'rotate(-90deg)';
        } else if (progress >= 75 && progress <= 100) {
            angle = -90 + ((progress - 75) / 100) * 360;

            this.querySelector('.animate-0-25-b').style.transform = 'none';
            this.querySelector('.animate-25-50-b').style.transform = 'none';
            this.querySelector('.animate-50-75-b').style.transform = 'none';
            this.querySelector('.animate-75-100-b').style.transform = 'rotate(' + angle + 'deg)';
        }

        this.querySelector('.progressring-text').innerHTML = progress + '%';
    };

    EmbyProgressRing.attachedCallback = function () {

    };

    EmbyProgressRing.detachedCallback = function () {
        const observer = this.observer;

        if (observer) {
            // later, you can stop observing
            observer.disconnect();

            this.observer = null;
        }
    };

    document.registerElement('emby-progressring', {
        prototype: EmbyProgressRing,
        extends: 'div'
    });

    export default EmbyProgressRing;

/* eslint-enable indent */
