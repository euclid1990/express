(function ($) {
    /**
     * Check a selector exist or not
     */
    $.fn.exists = function () {
        return this.length !== 0;
    };

    if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    }
    var socket = io(window.location.origin);

})(jQuery);
