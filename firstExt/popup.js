/*
  List all cookies in the current tab and display them in the popup.
  addd a button to refresh the list of cookies

  add a button to edit a cookie and show the form to edit the cookie
  form will have fields for name, value, domain, path, expiration, secure, httponly
  and a button to save the changes and a button to cancel the changes
  after that list all cookies again
 */

// show the form to edit the cookie using the fields defined in the form in popup.html file and fill them with the cookie values to be edited
function showEditForm(cookie) {
  var form = document.getElementById('edit-form');
  form.style.display = 'block';
  document.getElementById('name').value = cookie.name;
  document.getElementById('value').value = cookie.value;
  document.getElementById('domain').value = cookie.domain;
  document.getElementById('path').value = cookie.path;
  document.getElementById('expiration').value = cookie.expirationDate;
    document.getElementById('secure').checked = cookie.secure;
    document.getElementById('httponly').checked = cookie.httpOnly;
    form.dataUrl= cookie.url;
    // alert( "sgi" + form.dataUrl +  cookie.url)
}

//List the cookies in the current tab
function listCookies() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.cookies.getAll({url: tabs[0].url}, function(cookies) {
      var cookieList = document.getElementById('cookie-list');
      console.log(cookies)
       // alert("tab rul" + tabs[0].url)
      cookieList.innerHTML = '';
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var li = document.createElement('li');
        li.textContent = cookie.name + ': ' + cookie.value + '  ' + cookie.secure;
        cookieList.appendChild(li);
        // add a button to edit the cookie
        var editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = function() {
          showEditForm(cookie);
        };
        li.appendChild(editButton);
      }
    });
  });
}

//List the cookies when the popup is opened
listCookies();

//Refresh the list of cookies
document.getElementById('refresh').addEventListener('click', listCookies);


// hide the form to edit the cookie
function hideEditForm() {
  var form = document.getElementById('edit-form');
  form.style.display = 'none';
}

// edit the cookie
function editCookie() {
  var name = document.getElementById('name').value;
  var value = document.getElementById('value').value;
  var domain = document.getElementById('domain').value;
  var path = document.getElementById('path').value;
  var expiration = document.getElementById('expiration').value;
  //TRANSFORM THE EXPIRATION STRING TO NUMBER
    expiration = parseInt(expiration) || null //|| (new Date().getTime() + (1000*60*5));
    alert('then ' + expiration)
    var secure = document.getElementById('secure').checked;
    var httponly = document.getElementById('httponly').checked;
    var form = document.getElementById('edit-form');
    //expirationDate: expiration,
    var cookie = {
        url: (secure ? 'https://' : 'http://') + domain,
        name: name,
        value: value,
        domain: '.'+domain,
        path: path,
        secure: secure,
        httpOnly: httponly
    };
alert(JSON.stringify(cookie))

    chrome.cookies.set(cookie, function(c) {
      alert('ccr ' + JSON.stringify(c) )
        listCookies();
        hideEditForm();
    });
    
    //document.cookie = `${name}=${value};expires=${expiration}`
}


/**
 * HANDLES THE FORM SUBMISSION
 CONSIDER FORM IS HIDDEN WHEN EXTENSION IS LOADED
 */

document.getElementById('edit-form').addEventListener('submit', function(event) {
    event.preventDefault();
    editCookie();

});

// save the changes to the cookie when the form is submitted
// form is hidden when extension is loaded
// document.getElementById('editForm').addEventListener('submit', function(event) {
//   event.preventDefault();
//   editCookie();
// });
//
//
// // cancel the changes to the cookie
document.getElementById('cancel').addEventListener('click', hideEditForm);