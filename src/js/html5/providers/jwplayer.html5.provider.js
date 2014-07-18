(function(jwplayer) {

    var noop = jwplayer.utils.noop,
        _ = jwplayer._,
        returnFalse = _.constant(false);

    var defaultProvider = {
        // These are configuration values
        name : 'DEFAULT_PROVIDER',
        supports : returnFalse,

        Constructor : function() {
            jwplayer.utils.extend(this, new jwplayer.events.eventdispatcher('provider.' + this.name));
        },

        // Basic playback features
        play : noop,
        load : noop,
        stop : noop,
        volume : noop,
        mute : noop,
        seek : noop,
        seekDrag : noop, // only for html5 ?
        resize : noop,
        remove : noop,  // removes from page
        destroy : noop, // frees memory

        setVisibility : noop,
        setFullscreen : returnFalse,
        setContainer : returnFalse,
        getContainer : noop,

        isAudioFile : returnFalse,
        supportsFullscreen : returnFalse, // Does this check video or browser?

        getQualityLevels : noop,
        getCurrentQuality : noop,
        setCurrentQuality : noop,

        // TODO :: The following are targets for removal after refactoring
        checkComplete : noop,
        setControls : noop,
        attachMedia : noop,
        detachMedia : noop


        // TODO:: These seem like a better approach to inline ads
        // disable : noop,
        // getVideoElement : noop,
        // enable  : noop,

        // // These come from extending the eventdispatcher
        // addGlobalListener : noop,
        // removeGlobalListener : noop,
    };


    var _providers = [];

    function registerProvider(provider) {
        if (!_.isString(provider.name) || !_.isFunction(provider.supports)) {
            throw {
                message : 'Tried to register a provider with an invalid object'
            };
        }

        // Give them all a bare minimum API
        provider.prototype = defaultProvider;

        // The most recent provider will be in the front of the array, and chosen first
        _providers.unshift(provider);
    }

    function chooseProvider(source) {
        // handle for missing sources, it will be undefined
        source = _.isObject(source) ? source : {};

        return _.find(_providers, function (provider) {
            return provider.supports(source);
        });
    }

    jwplayer.html5.registerProvider = registerProvider;
    jwplayer.html5.chooseProvider   = chooseProvider;

})(jwplayer);

// Define the events which the provider will use
//    state, buffering, position/duration, fullscreen
