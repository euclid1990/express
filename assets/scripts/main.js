(function ($) {
    /**
     * Check a selector exist or not
     */
    $.fn.exists = function () {
        return this.length !== 0;
    };

    var socket = io("http://172.17.0.3:3000/");

})(jQuery);
