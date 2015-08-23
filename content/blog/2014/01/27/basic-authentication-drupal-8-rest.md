---
title: "Video: Using Basic Authentication in Drupal 8's REST Services"
date: 2014-01-27
---
  <p>Drupal 8 core offers an alternative to cookie based authentication, which is HTTP Basic Auth. In this video, I show you how to use Basic Auth, touch on the security concern of using Basic Auth over plain HTTP, and talk a little bit about other authentication options.</p>
<iframe width="420" height="315" src="//www.youtube.com/embed/HSJVxnPQkMs" frameborder="0" allowfullscreen></iframe>
<p>Before you start: <a href="/blog/2014/01/22/setting-up-rest-drupal-8/">watch the previous videos.</a></p>
<ol>
    <li>Add <code>basic_auth</code> to the array of <code>supported_auth</code> for each method in <code>rest.settings.yml</code>.</li>
    <li>Enable the Basic Auth module.</li>
    <li>Import the config at <code>admin/config/development/configuration</code>.</li>
    <li>Test the request (specific to Postman):
        <ol>
            <li>Click on the Basic Auth tab.</li>
            <li>Add your username and password.</li>
            <li>Click Refresh Headers.</li>
            <li>Send the request.</li>
        </ol>
    </li>
</ol>

<p><strong>Prev:</strong><a href="/blog/2014/01/24/delete-requests-cookie-authentication-drupal-8-rest/">DELETE requests and Cookie Authentication</a></p>

<small>For more information, check out the <a href="https://drupal.org/documentation/modules/rest">documentation on REST module</a>.</small>
