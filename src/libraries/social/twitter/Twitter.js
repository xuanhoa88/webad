export default class Twitter {
  constructor(options) {
    options = Object.assign({}, options);
    
    this._consumerKey = options.consumerKey || null;
    this._consumerSecret = options.consumerSecret || null;
    this._accessTokenKey = options.accessTokenKey || null;
    this._accessTokenSecret = options.accessTokenSecret || null;

    this._loaded = false;
    this._initialized = false;

    if (options.init !== false) {
      this._loadScript();
    }
  }

  _loadScript() {
    if (!this._consumerKey || !this._consumerSecret) {
      throw new Error('Twitter app id is not defined');
    }

    if (this._loaded) {
      throw new Error('Twitter script is already added to the DOM');
    }

    this._loaded = true;

    window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0],
          t = window.twttr || {};
        if (d.getElementById(id)) return t;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
      
        t._e = [];
        t.ready = function(f) {
          t._e.push(f);
        };
      
        return t;
      }(document, 'script', 'twitter-wjs'));
  }

  initialized() {
    return this._initialized;
  }

  whenReady() {
    if (!this._loaded) {
      this._loadScript();
    }

    this._initialized = window.twttr;

    return this;
  }
}