/* For example */
//require("/scripts/subscript.js");
function require(script) {
  $.ajax({
    url: script,
    dataType: "script",
    async: false,           // <-- This is the key
    success: function () {
        // all good...
    },
    error: function () {
        throw new Error("Could not load script " + script);
    }
  });
};

// Read a page's GET URL variables and return them as an associative array.
// URL: http://www.example.com/?me=myValue&name2=SomeOtherValue
// Usage
// var me = getUrlVars()["me"];
// var name2 = getUrlVars()["name2"];
function getUrlVars() {
  var vars = [], hash;
  var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++)
  {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}

function openURL( url ) {
  window.open(url, "_self");
}
