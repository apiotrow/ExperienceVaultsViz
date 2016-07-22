//get source code from a url
//jquery.xdomainajax.js  ------ from padolsey

eevv.getSourceCode = function (your_url, callback) {








    // console.log(encodeURIComponent(your_url));


    //WHATEVERORIGIN.ORG 
    // It is good specify the charset you expect.
    // You can use the charset you want instead of utf-8.
    // See details for scriptCharset and contentType options: 
    // http://api.jquery.com/jQuery.ajax/#jQuery-ajax-settings

    // $.ajaxSetup({
    //     scriptCharset: "utf-8", //or "ISO-8859-1"
    //     contentType: "application/json; charset=utf-8"
    // });

    // $.getJSON('http://whateverorigin.org/get?url=' + 
    //     encodeURIComponent(your_url) + '&callback=?',
    //     function (data) {
    //         console.log(data);

    //         eevv.URLSource = data.contents;
    //         callback(data.contents);

    //         //If the expected response is text/plain
    //         // $("#viewer").html(data.contents);

    //         //If the expected response is JSON
    //         //var response = $.parseJSON(data.contents);
    // });























    // $.getJSON("http://alloworigin.com/get?url=" + encodeURIComponent(your_url) + "&callback=?", function(data){
    //     // console.log(data.contents);
    //     eevv.URLSource = data.contents;
    //     callback(data.contents);
    // });












    // console.log(your_url);
    get_remot_data(your_url); 

    function get_remot_data(liiink){
        jQuery.ajax = (function(_ajax){

            // console.log(eevv.recurseCount);

            var protocol = location.protocol,
                hostname = location.hostname,
                exRegex = RegExp(protocol + '//' + hostname),
                YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?callback=?',
                query = 'select * from html where url="{URL}" and xpath="*"';
            function isExternal(url) {return !exRegex.test(url) && /:\/\//.test(url);}
            return function(o) {

                // eevv.recurseCount++;

                var url = liiink;   var type = 'GET';
                if ( /get/i.test(type) && !/json/i.test(o.dataType) && isExternal(url) ) {
                    // Manipulate options so that JSONP-x request is made to YQL
                    o.url = YQL; o.dataType = 'json'; o.data = { q : query.replace('{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data): '')),  format: 'xml'};
                    o.complete = function(ssmfunc) { 
                        eevv.URLSource = ssmfunc.responseText;
                        callback(eevv.URLSource);
                    }
                    // Since it's a JSONP request,complete === success
                    if (!o.success && o.complete) {o.success = o.complete; delete o.complete;}
                    o.success = (function(_success){
                        return function(data) {
                            if(data.results[0] === undefined){
                                console.log("fuckup");
                                get_remot_data(your_url); 
                            }else{
                                if (_success) { // Fake XHR callback, correct yahoo SCRIPT tags
                                    _success.call(this, {
                                        responseText: data.results[0].replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
                                    }, 'success');
                                }
                            }
                        };
                    })(o.success);
                }
                return _ajax.apply(this, arguments);
            };
        })(jQuery.ajax);$.ajax({});
    }































    // jQuery.ajax = (function (_ajax) {
    //     console.log(eevv.recurseCount);
    //     eevv.recurseCount = 0;
    //     // if(eevv.recurseCount > 1){
    //     //     return function (o) {
    //     //         o.success = o.complete;
    //     //         delete o.complete;
    //     //     };  
    //     // }


    //     var protocol = location.protocol,
    //         hostname = location.hostname,
    //         exRegex = RegExp(protocol + '//' + hostname),
    //         YQL = 'http' + (/^https/.test(protocol) ? 's' : '') + '://query.yahooapis.com/v1/public/yql?callback=?',
    //         query = 'select * from html where url="{URL}" and xpath="*"';

    //     function isExternal(url) {
    //         return !exRegex.test(url) && /:\/\//.test(url);
    //     }

    //     // if(eevv.recurseCount < 2){
    //         return function (o) {
    //             eevv.recurseCount++;


    //             var url = o.url;
    //             console.log(url);

                

    //             if (/get/i.test(o.type) && !/json/i.test(o.dataType) && isExternal(url)) {

    //                 // Manipulate options so that JSONP-x request is made to YQL

    //                 o.url = YQL;
    //                 o.dataType = 'json';
    //                 o.tryCount = 0,
    //                 o.retryLimit = 3,

    //                 o.data = {
    //                     q: query.replace('{URL}', url + (o.data ? (/\?/.test(url) ? '&' : '?') + jQuery.param(o.data) : '')),
    //                     format: 'xml'
    //                 };

    //                 // Since it's a JSONP request
    //                 // complete === success
    //                 if (!o.success && o.complete) {
    //                     o.success = o.complete;
    //                     delete o.complete;
    //                 }

    //                 o.success = (function (_success) {


    //                     return function (data) {

    //                         //if it throws that error i don't know why happens
    //                         //where data.results[0] is undefined, try again
    //                         if(data.results[0] === undefined){
    //                             console.log(data);
    //                             eevv.getSourceCode(your_url, function () {
    //                                 // console.log(eevv.URLSource);
    //                                 console.log("fuckup");
    //                                 callback(eevv.URLSource);
    //                             });
    //                         }else{
    //                             if (_success) {
    //                                 // eevv.URLSource = data.results[0].replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '');
    //                                 // _success.call(this, {},'success');

    //                                 // Fake XHR callback.
    //                                 _success.call(this, {
    //                                     responseText: data.results[0]
    //                                     // YQL screws with <script>s
    //                                     // Get rid of them
    //                                     .replace(/<script[^>]+?\/>|<script(.|\s)*?\/script>/gi, '')
    //                                 }, 'success');
    //                             }
    //                         }
    //                     };
    //                 })(o.success);

    //                 // o.error = (function (xhr, textStatus, errorThrown) {
    //                 //     console.log("hi");
    //                 //     if (textStatus == 'timeout') {
    //                 //         o.tryCount++;
    //                 //         if (o.tryCount <= o.retryLimit) {
    //                 //             //try again
    //                 //             $.ajax(this);
    //                 //             return;
    //                 //         }
    //                 //         return;
    //                 //     }
    //                 //     if (xhr.status == 500) {
    //                 //         console.log("hi");
    //                 //     } else {
    //                 //         console.log("hi");
    //                 //     }
    //                 // });
    //             }

    //             return _ajax.apply(this, arguments);
                
    //         };//over-recursing return
    //     // }//over-recursion catch if-statement

    // })(jQuery.ajax);

    // $.ajax({
    //     url: your_url,
    //     type: 'GET',
    //     // async: true,
    //     tryCount: 0,
    //     retryLimit: 3,
    //     success: function (res) {
    //         var text = res.responseText;

    //         eevv.URLSource = text;
    //         callback(eevv.URLSource);

    //     },
    //     error: function (xhr, textStatus, errorThrown) {
    //     console.log("hiy");
    //         if (textStatus == 'timeout') {
    //             this.tryCount++;
    //             if (this.tryCount <= this.retryLimit) {
    //                 //try again
    //                 $.ajax(this);
    //                 return;
    //             }
    //             return;
    //         }
    //     }
    // });









}