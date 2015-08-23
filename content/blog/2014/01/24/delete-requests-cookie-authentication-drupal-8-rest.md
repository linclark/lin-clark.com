---
title: "Video: DELETE requests and Cookie Authentication in Drupal 8's REST"
date: 2014-01-24
---
<p>You can remove content from your site using the HTTP method DELETE. Since you don't want just anyone deleting content from your site, you'll want to keep permission limited to trusted users. In this video, I'll show you how to run DELETE requests and authenticate those requests using cookie authentication.</p>
<iframe width="420" height="315" src="//www.youtube.com/embed/ikXhYsX8kWs" frameborder="0" allowfullscreen></iframe>
<p>Before you start: watch the previous video.</p>
<ol>
    <li>Switch the request method to DELETE.</li>
    <li>Ensure that you're logged in to your site in the same browser instance as you are running Postman.</li>
    <li>Get a CSRF token from the site by going to <code>rest/session/token</code>.</li>
    <li>Use the header <code>X-CSRF-Token</code> to add the CSRF token to your request.</li>
    <li>Run the request. The site should respond with status code <code>204 No Content</code>.</li>
</ol>

<p><strong>Next:</strong> <a href="/blog/2014/01/27/basic-authentication-drupal-8-rest/">Using Basic Authentication</a></p>
<p><strong>Prev:</strong> <a href="/blog/2014/01/22/setting-up-rest-drupal-8/">Setting up REST Services</a></p>

<small>For more information, check out the <a href="https://drupal.org/documentation/modules/rest">documentation on REST module</a>.</small>
