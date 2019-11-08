let Waiting = (function () {
    const css_name_loading = 'waiting_loading';
    const css_name_ele = 'waiting_ele';
    const css_name_ele_ani = 'waiting_elego';
    const ani_name_ele = 'waiting_ani';
    const defaults = {
        speed: 1,
        count: 5,
        space: 200,
        width: '10px',
        height: '10px',
        radius: '50%',
        style: 'line',
        backgroundcolor: 'rgba(0, 0, 0, 0.3)',
        eleborder: '1px rgba(0, 0, 0, 0.5) solid',
        elecolor: 'rgba(0, 0, 0, 0.3)',
        eleanicolor: 'black',
    };

    function waiting(cfg) {
        this.cfg = cfg || defaults
        this.cfg.__proto__ = defaults == this.cfg ? this.cfg.__proto__ : defaults;
        this.overlayer = document.createElement('div');
        this.overlayer.className = css_name_loading;
        this.style = document.createElement('style');
        this.style.innerHTML = this.css();
        document.getElementsByTagName('head')[0].appendChild(this.style);
        document.body.appendChild(this.overlayer);
    }

    waiting.prototype.css = function () {
        let basecss = '.' + css_name_loading + ' {position: fixed; top: 0;left: 0;width: 100%; height: 100%;background-color:' + this.cfg.backgroundcolor + ';z-index:' + 2e8 + ';visibility: hidden; } .' +
            css_name_ele + ',.' + css_name_ele_ani + '{position: absolute; width:' + this.cfg.width + ';  height:' + this.cfg.height + '; border-radius:' + this.cfg.radius + ';top: 50%; left: 50%;border:' + this.cfg.eleborder + ';background-color:' + this.cfg.elecolor + ';}.' +
            css_name_ele_ani + '{background-color: ' + this.cfg.eleanicolor + ';animation:' + ani_name_ele + ' ' + this.cfg.speed + 's linear infinite;animation-play-state: paused;z-index: 100;}';
        this.eleani = document.createElement('div');
        this.eleani.className = css_name_ele + ' ' + css_name_ele_ani;
        this.overlayer.appendChild(this.eleani);
        basecss += '@keyframes ' + ani_name_ele + '{';
        let per = 100 / this.cfg.count;
        let off = this['style' + this.cfg.style](this.cfg)
        for (let i = 1; i <= this.cfg.count; ++i) {
            let ele = document.createElement('div');
            ele.className = css_name_ele;
            this.overlayer.appendChild(ele);
            let cinfo = off(i);
            let ninfo = off(i == this.cfg.count ? 1 : i + 1);
            let ctrans = 'translate(' + cinfo.x + '%, ' + cinfo.y + '%)';
            let ntrans = 'translate(' + ninfo.x + '%, ' + ninfo.y + '%)';
            ele.style.transform = ctrans;
            if (i == 1) this.eleani.style.transform = ctrans;
            let cper = i * per;
            basecss += '' + (cper - 0.001) + '%{ transform:' + ctrans + '}\n' + cper + '%{ transform:' + ntrans + '}\n';
        }
        basecss += '}';
        return basecss
    }

    waiting.prototype.styleline = function (cfg) {
        let mid = Math.ceil(cfg.count / 2)
        return function (i) {
            return {
                x: (i - mid) * cfg.space,
                y: -50,
            }
        }
    }

    waiting.prototype.stylecicle = function (cfg) {
        let pdeg = (2 * Math.PI / 360) * (360 / cfg.count);
        return function (i) {
            let deg = i * pdeg;
            return {
                x: -50 + cfg.space * Math.cos(deg),
                y: -50 + cfg.space * Math.sin(deg),
            }
        }
    }

    waiting.prototype.show = function () {
        this.overlayer.style.visibility = 'visible';
        this.eleani.style.animationPlayState = 'running';
    }

    waiting.prototype.hide = function () {
        this.overlayer.style.visibility = 'hidden';
        this.eleani.style.animationPlayState = 'paused';
    }

    return waiting
}())