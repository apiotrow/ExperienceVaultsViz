//get source code from a url
//jquery.xdomainajax.js  ------ from padolsey
eevv.getSourceCode = function (your_url, callback) {

    //    document.domain = 'http://0.0.0.0:8911/e/http80/www.erowid.org';
    //    var jsonFile = new XMLHttpRequest({mozSystem: true});
    //    
    //    jsonFile.open("GET", your_url, true);
    ////    jsonFile.setRequestHeader("Access-Control-Allow-Origin", "*");
    ////    jsonFile.setRequestHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //    jsonFile.send();
    //    
    //
    //    jsonFile.onreadystatechange = function () {
    //        if (jsonFile.readyState == 4 && jsonFile.status == 200) {
    //            document.getElementById("id-of-element").innerHTML = jsonFile.responseText;
    //        }
    //    }




    jQuery.ajax = (function (_ajax) {

        var protocol = location.protocol,
            hostname = location.hostname,
            exRegex = RegExp(protocol + '//' + hostname),
            YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?',
            query = 'select * from html where url="{URL}" and xpath="*"';

        function isExternal(url) {
            return !exRegex.test(url) && /:\/\//.test(url);
        }

        return function (o) {

            var url = o.url;

            if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {

                // Manipulate options so that JSONP-x request is made to YQL

                o.url = YQL;
                o.dataType = 'json';
                o.tryCount = 0,
                o.retryLimit = 3,

                o.data = {
                    q: query.replace('{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')),
                    format: 'xml'
                };

                // Since it's a JSONP request
                // complete === success
                if (!o.success && o.complete) {
                    o.success = o.complete;
                    delete o.complete;
                }

                o.success = (function (_success) {
                    return function (data) {

                        if (_success) {
                            // Fake XHR callback.
                            _success.call(this, {

                                responseText: data.results[0]
                                // YQL screws with <script>s
                                // Get rid of them
                                .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                            }, 'success');

                        }

                    };
                })(o.success);

                o.error = (function (xhr, textStatus, errorThrown) {
                    console.log("hi");
                    if (textStatus == 'timeout') {
                        o.tryCount++;
                        if (o.tryCount <= o.retryLimit) {
                            //try again
                            $.ajax(this);
                            return;
                        }
                        return;
                    }
                    if (xhr.status == 500) {
                        console.log("hi");
                    } else {
                        console.log("hi");
                    }
                });

            }

            return _ajax.apply(this, arguments);

        };

    })(jQuery.ajax);

    $.ajax({
        url: your_url,
        type: 'GET',
        tryCount: 0,
        retryLimit: 3,
        success: function (res) {
            var text = res.responseText;

            eevv.URLSource = text;
            callback(eevv.URLSource);

        },
        error: function (xhr, textStatus, errorThrown) {

            if (textStatus == 'timeout') {
                this.tryCount++;
                if (this.tryCount <= this.retryLimit) {
                    //try again
                    $.ajax(this);
                    return;
                }
                return;
            }
        }
    });

}