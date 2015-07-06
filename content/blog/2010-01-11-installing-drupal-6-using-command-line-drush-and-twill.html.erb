---
title: Installing Drupal 6 using the Command Line with Drush and Twill
date: 2010-01-11
tags: drupal, drupal-planet
---
<p>While working on code for Drupal 7, I've been creating and dropping databases all over the place. And each time I drop a database, I have to go to my browser and fill out all the site information again.</p>
<p>So this got me thinking... does it really need to be this way? (Spoiler: it doesn't)</p>
<p> A few weeks ago I found Byte Craft kamal's <a href="http://blog.bytecraft.com.my/blog/kamal/2009/12/08/installing-drupal-command-line">awesome post about twill</a>, a really simple language that lets you fill out HTML forms from the command line, and how it can be used to install your Drupal site without using your browser at all!</p>
<p>In this post, I will expand that solution to show you how you can create scripts to download and install Drupal and then show you a script you can use to automate the recreation of your site when you drop the database.</p>
READMORE
<h2>Before We Start</h2>
<p>So, for this to work, you will need:</p>
<ul>
  <li>Drush</li>
  <li>Python</li>
  <li>twill</li>
</ul>
<h3>Drush</h3>
<p><strong>Drush</strong> can be <a href="http://drupal.org/project/drush">downloaded from drupal.org</a>. Place the drush folder alongside your Drupal sites. On my Mac, this is in the Sites folder.</p>
<p>You will want to create an alias for drush so you can use it on the command line. Just to be safe, you may want to tell it what version of php5 to use (for instance, I would tell it to use the php5 that came with MAMP).</p>
<p><code>alias drush='/Applications/MAMP/bin/php5/bin/php ~/Sites/drush/drush.php'</code></p>
<p>Once this alias is created, you should be able to type drush and get a list of drush commands.</p>
<h3>Python</h3>
<p><strong>Python</strong> comes standard with the Mac. It seems that Macs ship with a stale version that may not have been updated in 1-2 years, but this shouldn't be a problem for most people. If your version is older than 2.4, you will want to update.</p>
<h3>Twill</h3>
<p><strong>twill </strong>can be downloaded from the <a href="http://twill.idyll.org/">twill author's site</a>. To install it, change directory to the twill directory. You can only run the installer from inside the twill directory, though it does not matter where that directory is in your file system. Then run this command:&nbsp;</p>
<p><code>sudo python setup.py install</code></p>
<h2>The Scripts</h2>
<p>Here is an example shell script to get things started... you could save this as drupalinstall.sh and run the command <code>source drupalinstall.sh</code>. You will probably want to run this script from the same folder where you have your Drupal sites and the drush folder.</p>
<h3>Shell Script</h3>
<p><code>drush dl drupal<br /></code><code>echo -n &quot;Enter a directory name: &quot; <br />read -e DIR&nbsp; <br />mv drupal-6.* $DIR <br />cd $DIR <br />install -m 777 sites/default/default.settings.php sites/default/settings.php <br />twill-sh ../drupal_install.py</code></p>
<h3>Super Easy Explanation</h3>
<p>This script downloads Drupal, asks you what you want to call the Drupal folder and renames it with the <code>mv </code>command. I am including the assertion that this is Drupal version 6 because in Drupal version 7 you will be able to use Drush to install Drupal without any of this.</p>
<p>The script then changes directory to your new directory and copies the settings file. It then calls your twill script, which we will create right now.</p>
<h3>Twill Script&mdash;First Install</h3><p><code>getinput 'Site directory '<br />setglobal directory __input__<br /><br />getinput 'Database name '<br />setglobal db_path __input__<br /><br />getinput 'Database username '<br />setglobal db_user __input__<br /><br />getinput 'Database user password '<br />setglobal db_pass __input__<br /><br />getinput 'Site email '<br />setglobal site_mail __input__<br /><br />getinput 'Admin username '<br />setglobal admin __input__<br /><br />getinput 'Admin email '<br />setglobal mail __input__<br /><br />getinput 'Admin password '<br />setglobal password __input__<br /><br />go http://localhost/${directory}/install.php?profile=default&amp;locale=en<br />code 200<br />find &quot;To set up your&quot;<br /><br />fv 1 db_path ${db_path}<br />fv 1 db_user ${db_user}<br />fv 1 db_pass ${db_pass}<br /><br />submit op<br /><br />find &quot;All necessary changes to&quot;<br /><br />fv 1 site_mail ${site_mail}<br />fv 1 account[name] ${admin}<br />fv 1 account[mail] ${mail}<br />fv 1 account[pass][pass1] ${password}<br />fv 1 account[pass][pass2] ${password}<br /><br />submit op<br /><br />find &quot;Congratulations&quot;<br /><br />clear_cookies<br />go&nbsp; http://localhost/${directory}/<br /><br />fv 1 name ${admin}<br />fv 1 pass ${password}<br /><br />submit op<br />find &quot;Log out&quot;</code></p>
<h3>Super Easy Explanation</h3><p>The first chunk gets input from the command line to set variables. Then we go to the install page, make sure we found the page and that it returned code 200, and that we found some of the expected text (&quot;To set up your&quot;...) on the page.</p>
<p>We would now be at the Database Information page, so we use the command <code>fv</code> to set the field values for database name, database user, and database password. We submit the form and check to make sure we find the expected text on the next page (&quot;All necessary changes to&quot;...).</p>
<p>We are now at the site information page, so we fill in the site email address, the admin user name, the admin email address, and the admin password. We submit and check for the correct text (&quot;Congratulations&quot;...).</p>
<p>Now we clear the cookies to get rid of the session and use the admin name and password to make sure that we can log in. If we find the Log out button on the page, we have successfully logged in.</p>
<h3>Twill Script&mdash;Re-Install</h3><p>If we have a sandbox and we've mucked about in the database, we may want to get a fresh database. We can reinstall the site using this script. The values are hard coded in the file to make it a very fast reinstall of your site.</p>
<p>First you want to drop your database. Then run the command <code>twill-sh drupalsite_reinstall.py</code>.</p>
<p>Note that you will need to replace 'directory' with the name of your Drupal directory.</p>
<code>go http://localhost:8888/directory/install.php?profile=default&amp;locale=en<br /><br />find &quot;All necessary changes to&quot;<br /><br />fv 1 site_mail your-email@example.com<br />fv 1 account[name] Admin<br />fv 1 account[mail] admins-email@example.com<br />fv 1 account[pass][pass1] mypassword<br />fv 1 account[pass][pass2] mypassword<br /><br />submit op<br /><br />find &quot;Congratulations&quot;<br /><br />clear_cookies<br />go&nbsp; http://localhost:8888/directory/<br /><br />fv 1 name Admin<br />fv 1 pass mypassword<br /><br /><code>submit op<br />find &quot;Log out&quot;</code></code></p>