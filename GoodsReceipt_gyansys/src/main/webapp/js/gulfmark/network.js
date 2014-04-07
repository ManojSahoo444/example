(function($) {
    var r = null;
    $.fn.isOnline = function(a) {
        function d(a) {
            $.ajax({url: a.url, cache: false, async: false, type: "HEAD"}).done(function(data) {
                r = true;
            }).fail(function(data) {
                r = false;
            }).always(function() {
            });
            return r;
        }
        a = a || {};
        a.url = a.url || window.location.href;
        a.msg = a.msg || "No Internet connection detected ";
        return d(a);
    };
})(jQuery);