---
title: "Video: Quickstart to testing with Behat, Mink, and Selenium"
date: 2013-11-26
---
<p>It is easy to test your website's functionality using Behat, a PHP framework for BDD (behavior driven development). This video quickly goes through the configuration of Behat, Mink, and Selenium.</p>
<iframe width="420" height="290" src="//www.youtube.com/embed/9cYhnTojaHU" frameborder="0" allowfullscreen></iframe>
<h2>Setting up Behat</h2>
<ol>
<li>Install <a href="http://getcomposer.org/doc/00-intro.md">Composer</a></li>
<li>Create a <code>composer.json</code> file in your root directory
  <script src="https://gist.github.com/linclark/7629564.js"></script></li>
<li>Run <code>composer install</code></li>
<li>Create a <code>behat.yml</code> file
  <script src="https://gist.github.com/linclark/7629577.js"></script></li>
<!--@todo Make this an aside once those are styled.-->
<li>Initialize your Behat project with <code>vendor/bin/behat --init</code>. Note: bin directories are configurable in <code>composer.json</code>. If your composer file has a bin directory, use that path instead of <code>vendor/bin</code>.</li>
<li>Create a feature file, e.g. <code>test.feature</code>
  <script src="https://gist.github.com/linclark/7658124.js"></script></li>
<!--@todo Make this an aside once those are styled.-->
<li>Edit <code>FeatureContext.php</code> to extend from <code>MinkContext</code>. Note: You will need to add the use statement, <code>use Behat\MinkExtension\Context\MinkContext</code>.</li>
<li>Run <code>vendor/bin/behat</code></li>
</ol>
<h2>Adding Selenium as an optional driver</h2>
Follow all the steps above, then:
<ol>
<li>Download <a href="https://code.google.com/p/selenium/downloads/list">Selenium Server</a></li>
<li>Run <code>java -jar /path/to/selenium-server-standalone-2.37.0.jar</code></li>
<li>Add <code>selenium2: ~</code> to your <code>behat.yml</code></li>
<li>Add a <code>@javascript</code> tag above your scenario</li>
<li>Run <code>vendor/bin/behat</code></li>
</ol>
<h2>Adding new step definitions</h2>
<ol>
<li>Add the step you want to create in your scenario, e.g. When I search for "behat"</li>
<li>Run <code>vendor/bin/behat</code></li>
<li>Copy the step definition template to <code>FeatureContext.php</code> and replace the PendingException with your code.
  <script src="https://gist.github.com/linclark/7629613.js"></script></li>
</ol>

<h2>Resources</h2>
<ul>
<li><a href="http://docs.behat.org/">Behat documentation</a></li>
<li><a href="http://drupalize.me/blog/201307/drupalizeme-podcast-20-bdd-behat-and-drupal">drupalize.me podcast: Bdd, Behat, and Drupal</a> with Melissa Anderson</li>
<li><a href="http://www.youtube.com/watch?v=2jL-cnwxqdo">DrupalCon Lab</a> on functional testing for your module, theme, or distro</li>
</ul>
