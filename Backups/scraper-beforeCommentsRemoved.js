   function buttonClick() {
       var urlFields;

       
       var drugOptionValues = {
           mushrooms: 39,
           LSD: 2
       };
       var drugName;

       var categoryOptionValues = {
           mysticalExperiences: 9,
           badTrips: 6,
           firstTimes: 2

       };
       var categoryName;

       var url = "";


       myFunction();

       function myFunction() {
           var drugOne;
           var drugTwo = -1;
           var drugThree = -1;
           var category = categoryOptionValues.firstTimes;
           var nonSubstance = -1;
           var gender = -1;
           var context = -1;
           var doseMethod = -1;
           var title = "";
           var authorSearch = "";
           var erowidAuthor = -1;
           var language = 1;
           var group = -1;
           var strength = "";
           var intensityMin = "";
           var intensityMax = "";


           for (var drugOptionValues_index in drugOptionValues) {
               if (drugOptionValues.hasOwnProperty(drugOptionValues_index)) {
                   drugOne = drugOptionValues[drugOptionValues_index];
                   drugName = drugOptionValues_index;

                   for (var categoryOptionValues_index in categoryOptionValues) {
                       if (categoryOptionValues.hasOwnProperty(categoryOptionValues_index)) {
                           category = categoryOptionValues[categoryOptionValues_index];
                           categoryName = categoryOptionValues_index;

                           setupURL(drugOne,
                               drugTwo,
                               drugThree,
                               category,
                               nonSubstance,
                               gender,
                               context,
                               doseMethod,
                               title,
                               authorSearch,
                               erowidAuthor,
                               language,
                               group,
                               strength,
                               intensityMin,
                               intensityMax);

                           url = "";

                           for (var urlFields_index in urlFields) {
                               if (urlFields.hasOwnProperty(urlFields_index)) {
                                   url += urlFields[urlFields_index];
                               }
                           }

                           //console.log(url);
                           url += "&ShowViews=0&Start=0&Max=99999";
                           outputdata(url, drugName, categoryName);
                           //var myWindow = window.open(url, "", "width=500, height=300, scrollbars=yes");
                       }
                   }
               }
           }


           // 				
           // for (var property in drugOptionValues) {
           // if (drugOptionValues.hasOwnProperty(property)) {
           // //drugOne = drugOptionValues[property];
           // drugName = property;
           //       					
           // setupURL(drugOptionValues[property], 
           // drugTwo, 
           // drugThree, 
           // category, 
           // nonSubstance,
           // gender, 
           // context, 
           // doseMethod, 
           // title, 
           // authorSearch, 
           // erowidAuthor,
           // language, 
           // group, 
           // strength, 
           // intensityMin, 
           // intensityMax);
           // 				
           // for (var property in urlFields) {
           // if (urlFields.hasOwnProperty(property)) {
           // url += urlFields[property];
           // }
           // }
           // 
           // outputdata(url, drugName);
           // }
           //    					 
           //    					
           // }





       }

       function setupURL(f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13, f14, f15, f16) {

           urlFields = {
               init: "https://www.erowid.org/experiences/exp.cgi?A=Search",
               drugOne: "&S1=" + f1,
               // rest: "&S2=-1&S3=-1&C1=-1&S4=-1&GenderSelect=-1&Context=\
               // -1&DoseMethodID=-1&Title=&AuthorSearch=&A1=-1&Lang=1&Grou\
               // p=-1&Str=&Intensity=&I2="
               drugTwo: "&S2=" + f2,
               drugThree: "&S3=" + f3,
               category: "&C1=" + f4,
               nonSubstance: "&S4=" + f5,
               gender: "&GenderSelect=" + f6,
               context: "&Context=" + f7,
               doseMethod: "&DoseMethodID=" + f8,
               title: "&Title=" + f9,
               authorSearch: "&AuthorSearch=" + f10,
               erowidAuthor: "&A1=" + f11,
               language: "&Lang=" + f12,
               group: "&Group=" + f13,
               strength: "&Str=" + f14,
               intensityMin: "&Intensity=" + f15,
               intensityMax: "&I2=" + f16
           }
       }

       function openWindow() {
           url = "";

           for (var property in urlFields) {
               if (urlFields.hasOwnProperty(property)) {
                   url += urlFields[property];
                   // if (property == "drugOne"){
                   // drugName = property;
                   // }
               }
           }

           //var url = urlFields.init + urlFields.drugOne + urlFields.rest;
           //var myWindow = window.open(url, "", "width=1000, height=700");
           your_url = url;
           outputdata(your_url, drugName);
           /*
				var init = "https://www.erowid.org/experiences/exp.cgi?A=Search"
				var drugOne = "&S1=" + drug;
				var drugTwo = "&S2=-1";
				var drugThree = "&S3=-1&";
				var category = "C1=-1";
				var nonSubstance = "&S4=-1";
				var genderSelect = "&GenderSelect=-1";
				var context = "&Context=-1";
				var doseMethod = "&DoseMethodID=-1";
				var title = "&Title=";
				var authorSearch = "&AuthorSearch=";
				var erowidAuthor = "&A1=-1";
				var language = "&Lang=1";
				var group = "&Group=-1";
				var strength = "&Str=";
				var intensityMin = "&Intensity=";
				var intensityMax = "&I2=";
				
				var url = s1 + s2 + s3;
				*/
           /*
				var myWindow = window.open("https://www.erowid.org/experiences/exp.cgi?A=Search\
				&S1=drug\
				&S2=-1\
				&S3=-1\
				&C1=-1\
				&S4=-1\
				&GenderSelect=-1\
				&Context=-1\
				&DoseMethodID=-1\
				&Title=\
				&AuthorSearch=\
				&A1=-1\
				&Lang=1\
				&Group=-1\
				&Str=\
				&Intensity=\
				&I2=\
				", "", "width=1000, height=700");
				*/
       }
   }




    // jquery.xdomainajax.js  ------ from padolsey
   function outputdata(your_url, drugName, categoryName) {

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

               }

               return _ajax.apply(this, arguments);

           };

       })(jQuery.ajax);

       $.ajax({
           url: your_url,
           type: 'GET',
           success: function (res) {
               var text = res.responseText;
               // then you can manipulate your text as you wish
               //var n = text.search("Total");
               //var place = text.substring(n - 7, n).trim();
               //var s = place.search("\\(");
               //var thenum = place.substring(s + 1, n);
               //alert(thenum);
               //console.log(thenum);
               //document.getElementById("demo").innerHTML = drugName + ", " + thenum;

               //$("#demo").text(thenum);  
               //$("#demo").html($("#demo").text() + "<br>" + drugName + ": " + categoryName + ": " + thenum);


               var result = [];
               var pos = text.indexOf('exp.php?ID');
               result.push(text.substring(pos, pos + 24).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2'));
               while (pos != -1) {
                   pos = text.indexOf('exp.php?ID', pos + 1);
                   result.push(text.substring(pos, pos + 24).replace(/(^.+\D)(\d+)(\D.+$)/i, '$2'));

               }

               //this pop gets rid of last entry which ends
               //up being "<html><head><met" or something weird
               result.pop();

               console.log(result);


           }
       });
   }