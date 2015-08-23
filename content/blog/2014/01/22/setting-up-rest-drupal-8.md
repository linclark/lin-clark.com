---
title: "Video: Setting up REST Services in Drupal 8"
date: 2014-01-22
---
<p>With Drupal 8, you can provide REST services to interact with your site&rsquo;s data, and you don&rsquo;t have to rely on contrib modules to do it. This screencast is the first in a series demonstrating how to configure such services. In this one, I will show the basic configuration for running GET requests for nodes.</p>
<iframe width="420" height="315" src="//www.youtube.com/embed/0mTTfCZ8Iac" frameborder="0" allowfullscreen></iframe>
<ol>
  <li>Add a node. We will be requesting this node when testing GET requests.</li>
  <li>Enable the REST module.</li>
  <li>Grant permission to the anonymous user to GET nodes.</li>
  <li>Update the configuration file:
      <ol>
          <li>Copy all files from <code>sites/default/files/config_XXX/active</code> to <code>sites/default/files/config_XXX/staging</code>.</li>
          <li>Edit the <code>rest.settings.yml</code> file in your staging directory. Replace <code>hal_json</code> with <code>json</code> and <code>basic_auth</code> with <code>cookie</code>.</li>
          <li>Go to <code>admin/config/development/configuration</code> and import the changes.</li>
      </ol>
  </li>
  <li>Test the endpoint:
      <ol>
          <li>Enable the <a href="http://www.getpostman.com/">Postman REST Client</a>, available as an extension for multiple browsers, or enable another client of your choice.</li>
          <li>Enter the URL of the resource. Add &lsquo;entity&rsquo; before the node&rsquo;s path (e.g. <code>entity/node/1</code>).</li>
          <li>Add the Accept header, <code>Accept: application/json</code>.</li>
          <li>Run the request. You should get a JSON object in response.</li>
      </ol>
  </li>
</ol>

<p><strong>Next:</strong> <a href="/blog/2014/01/24/delete-requests-cookie-authentication-drupal-8-rest/">DELETE requests and Cookie Authentication</a></p>

<small>For more information, check out the <a href="https://drupal.org/documentation/modules/rest">documentation on REST module</a>.</small>
