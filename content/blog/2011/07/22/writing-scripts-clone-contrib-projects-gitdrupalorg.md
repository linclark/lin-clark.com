---
title: "Writing scripts to clone contrib projects from git.drupal.org"
date: 2011-07-22
tags: drupal, git, modules, drupal-planet, drupal-planet
---
<p>As part of my masters thesis, I&rsquo;m looking into innovation diffusion within Drupal (I think y'all know which one ;).</p><p>In order to &lsquo;grep&rsquo; against the codebase, I needed a copy of the most recent versions of ALL of Drupal 7 contrib, which was easy to do back when we used CVS (even a little too easy when you realized that you accidentally started downloading 7,000 projects). However, this is <a href="http://drupal.org/node/1057386">not so easy with git.</a></p><p>Before starting, I asked in #drupal-contribute whether pulling all of contrib for research purposes would be frowned upon, since it can really soak up a lot of server resources. Folks said it was ok and encouraged me to share whatever script I came up with... so here it is.</p>
READMORE<p>Note: There are lots of different ways to do this and this one may not be the optimal way. Any thoughts are welcome.</p><h2>Getting a list of projects</h2><p>First I wanted to get my list of projects. I only wanted projects that have 7.x branches, which are <a href="http://drupal.org/project/modules/index?project-status=0&amp;drupal_core=103">easy to find</a>.</p><p>In order to pull out the parts I need, the project names, I wrote a <a href="http://scraperwiki.com/scrapers/drupal_7x_full_projects/">scraper with ScraperWiki</a>.</p><p>The neat thing about ScraperWiki is that it enables groups of people to collaborate on scraper code. When the scraper runs, the results can be saved to an SQLite database and then can be queried by constructing a URL that contains an SQL query.</p><p>While this is overkill for just pulling out the project names from the page (I could just have used a simple script like <a href="http://drupal.org/node/1057386#comment-4768038">rfay demonstrates</a>), the ScraperWiki approach can be extended and worked on collaboratively. For example, if we want to have additional information about a project, such as it's dependencies, we can extend the scraper to access drupalcode.org and get that information. Then people could easily search contrib to see which modules depend on their own modules.</p>

<p>So once I ran the scraper, my list of projects was available. Next I just need to:<ol><li>clone them all to my computer</li><li>make sure to checkout the newest 7.x branch</li></ol> Since I spend most of my day in PHP, I wrote a PHP script for this. I run this script from the command line.</p><h2>Cloning the projects</h2><p>First I use curl to run my query against ScraperWiki to get my list.</p><figure class="code"><figcaption>Getting the list of projects</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">
// Initialize session and set URL.
$ch = curl_init();
$url = "http://api.scraperwiki.com/api/1.0/datastore/sqlite?format=jsondict&name=drupal_7x_full_projects&query=select%20*%20from%20swdata%20where%20project_name%20LIKE%20'a%25%25'";
curl_setopt($ch, CURLOPT_URL, $url);

// Set so curl_exec returns the result instead of outputting it.
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Get the response and close the channel.
$response = curl_exec($ch);
curl_close($ch);

$projects = json_decode($response);
</pre>
</figure>

<p>The only part that you might want to change from the above is the URL. It runs the SQL query against the data in ScraperWiki. You can write your SQL query, test it, and get the correct URI with the <a href="http://scraperwiki.com/docs/api?name=drupal_7x_full_projects#sqlite">External API tool</a>.</p><p>The URL I used runs a query that just retrieves any project that starts with the letter 'a' (you can click it in the code above to see). I did this because I wanted to be able to download it in chunks. I just change the letter 'a' to 'b' and ran the script again to get the next chunk.</p>
<p>Next I iterated through the project list and cloned each one.</p>
<figure class="code"><figcaption>Cloning the projects</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">
foreach ($projects as $project) {
  $git_url = $project->git_url;
  shell_exec("git clone --no-checkout $git_url");
}
</pre>
</figure>
<h2>Checkout the most recent branch</h2>
<p>I know that each of these projects has a 7.x branch, but I&rsquo;m not sure what the version number of the most recent one is. To ensure that I&rsquo;m on the most recent version, I just try everything from 7.x-9.x down to 7.x-1.x (I believe the highest I found was 4.x). Once one of those works and I&rsquo;m able to switch to the branch, I stop trying. If none of them work, I switch to master.</p><p>I did this as part of the previous for loop, but it can also be it's own for loop. One thing to note is that I have to include '2>&1' in my checkout command in order to return the status message from the command. Otherwise, $checkout would be null.</p>
<figure class="code"><figcaption>Checking out the newest 7.x branch</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">
foreach ($projects as $project) {
  chdir($project->project_name);

  $i = 9;
  $branch_set = FALSE;
  
  while ($i > 0 && !$branch_set) {
    $checkout = shell_exec("git checkout 7.x-" . $i .".x 2>&1");
    print($checkout);
    if (preg_match('/Switched to branch/', $checkout) || preg_match('/set up to track remote branch/', $checkout) || preg_match('/Already on/', $checkout)) {
      $branch_set = TRUE;
      break;
    }
    $i--;
  }
  
  if (!$branch_set) {
    $checkout = shell_exec("git checkout master");
  }

  chdir("../");
}
</pre>
</figure>
<h2>Any thoughts?</h2>
<p>So I think that extending the ScraperWiki script could be extended to provide some neat filtering options. For instance, getting a list of modules that depend on my modules, or downloading every module that defines a Views style plugin. But there may be a better way to do this. Any ideas?</p>
<h2>Downloads</h2>
<ul>
<li><a href="http://drupal.org/files/download-contrib.txt">Script file</a></li>
<li>Where the best place to upload a 1.12GB download to share with everyone?</li>
</ul>