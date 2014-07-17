(function(jwplayer) {

    var noop = jwplayer.utils.noop,
        returnFalse = jwplayer._.constant(false);

    jwplayer.html5.provider = {

        play : noop,
        load : noop,
        stop : noop,
        volume : noop,
        mute : noop,
        seek : noop,
        seekDrag : noop,
        resize : noop,
        remove : noop,  // removes from page
        destroy : noop, // frees memory

        addGlobalListener : noop,
        removeGlobalListener : noop,

        setVisibility : noop,
        setFullscreen : returnFalse,
        setContainer : returnFalse,
        getContainer : noop,

        isAudioFile : returnFalse,
        supportsFullscreen : noop,

        getQualityLevels : noop,
        getCurrentQuality : noop,
        setCurrentQuality : noop,

        // TODO :: The following are targets for removal after refactoring
        checkComplete : noop,
        setControls : noop,
        attachMedia : noop,
        detachMedia : noop

    };

})(jwplayer);
