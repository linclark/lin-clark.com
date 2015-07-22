---
title: "Theming with HTML5 and RDFa in Drupal 7"
date: 2011-06-26
tags: drupal-planet, rdf, rdfa, theming, html-data, drupal-planet
---
<p>I'm a big fan of inline structured data like RDFa because it makes it easy to share information between sites. For example, if my research institute listed my speaking appearances with RDFa, I could just use Views to display those presentations on my site. Instead of getting the list from my MySQL database, Views would use the external Web page as its "database".</p>

<p>I'm also a big fan of HTML5. It is a big step towards a more exciting, more usable, and more developer friendly Web. </p>

<p>Drupal has made commitments to both, with its support for RDFa in core in Drupal 7 and its move towards HTML 5 output in Drupal 8. That's why I wanted to give the RDFa and HTML 5 compatibility a test drive, starting with my own site.</p>
READMORE<h2>To start with... a base theme</h2><p>There are a number of base themes for Drupal 7 that already output HTML 5, and other prominent base themes that are moving towards HTML 5 support. For the most part, this support takes the form of using new elements like <code>&lt;article&gt;</code> and <code>&lt;aside&gt;</code>.</p><aside class="sidenote"><h4>What&#39;s a base theme?</h4><p>A base theme (aka <a href="http://drupal.org/node/323993">starter theme</a>) is a set of preprocess functions, templates, and CSS that a subtheme can use for basic functionality. The subtheme can then selectively override the base theme. For example, the base theme might use a <code>&lt;div&gt;</code> tag to wrap a node in node.tpl.php, and the subtheme might use a <code>&lt;section&gt;</code> tag instead by overriding the node.tpl.php file.</p></aside><p>I strongly believe that it is best to use a base theme... people like John Albin have been thinking way more about markup best practices than I have. Because a lot of people are using base themes like Zen, those themes also benefit from the collective intelligence of the various Drupal communities, making the markup even better... and I hope to contribute to that collective intelligence by helping review the structured data these themes output.</p>
<p>For this project, I started with Jeff Burnz's <a href="http://drupal.org/project/adaptivetheme">AdaptiveTheme</a>. Jeff puts a note in his theme:</p>
<blockquote>Due to the ongoing specification changes for RDFa in HTML5 the doctype and version information may change in a point release, or not, depending. Right now things are working (afaict - I am no RDFa expert).</blockquote></p>
<p>So I figured I'd give a quick check to see if it is working. I ran an article through Sindice's Inspector and clicked on the graph tab. Everything looked good! This doesn't mean that the markup is valid, but it does mean that all of the data is structured as I want it to be, which is a great first step.</p>
<p>The graph is pretty complicated for an article with lots of comments, so I figured I'd show an example of what the basic page looks like, instead. You can also <a href="http://inspector.sindice.com/inspect?url=http%3A%2F%2Flin-clark.com%2Frdfa-test-page&content=#GRAPH">test this out in the Inspector</a>.</p>
<img width="600" src="/sites/default/files/sindice_inspector-rdfa_test.png" />
<h2>What this theme does</h2>
<p>Even though RDFa support is baked into Drupal core, that doesn't mean all themes are RDFa compatible. This theme does a couple of things right that can serve as good pointers for other themes, and raises a couple of issues that we should work on figuring out as a community.</p>
<h3>The doctype</h3>
<p>Whether or not to use a doctype with RDFa was up in the air for a while. It wasn't included in prior versions of the specification, but starting with the June, 2010 version of the spec, <a href="http://www.w3.org/TR/rdfa-in-html/#validation">doctype is included</a> as something that you MAY include for validation purposes.</p><p>The doctype in the theme doesn't match the doctype in the spec. I'm guessing that this is because the doctype in the spec is somewhat confusing, saying that the document is HTML 4.01 for validation purposes.</p><p>There is a postponed <a href="http://drupal.org/node/1017356">issue in the AT queue dealing with the doctype</a>. As the doctype is only necessary for validation, and this document will not validate with the doctype that is in the spec, I have recommended just using the plain HTML 5 doctype.</p>
<aside class="sidenote"><h4>What are preprocess functions and templates?</h4><p>A template is a file that outputs the content of the page, usually as HTML. It has access to certain variables which can be placed on the page and wrapped with HTML markup.</p><p>Preprocess functions define the variables before a template is used. For example, if I had a preprocess function that said:<br /><code>$variables['x'] = 'world'</code><br />the corresponding template would say something like:<br /><code>print 'Hello ' . $x</code>.</p></aside>
<p>But just in case there does end up being a custom doctype for RDFa in the final recommendation, lets see what AT does. To add the doctype, Jeff uses a preprocess function to add variables before html.tpl.php is output. Those variables are then used in the html.tpl.php template. If the RDF module is enabled, the doctype and other variables get set with RDF specific values and passed to the html template. Otherwise, the default HTML doctype is used.</p>
<figure class="code"><figcaption>Preprocess function adds variables for html.tpl.php template</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">
function adaptivetheme_preprocess_html(&$vars) {
  if (module_exists('rdf')) {
    $vars['doctype'] = '&lt;!DOCTYPE html PUBLIC "-//W3C//DTD HTML+RDFa 1.1//EN"&gt;' . "\n";
    $vars['rdf_version'] = ' version="HTML+RDFa 1.1"';
    $vars['rdf_profile'] = ' profile="' . $vars['grddl_profile'] . '"';
  }
  else {
    $vars['doctype'] = '&lt;!DOCTYPE html&gt;' . "\n";
    $vars['rdf_version'] = '';
    $vars['rdf_profile'] = '';
  }<br />
</pre>
</figure>
<figure class="code"><figcaption>html.tpl.php template prints the variables</figcaption>
<pre class="brush:php;gutter:false;toolbar:false">&lt;?php print $doctype; ?&gt;
&lt;html lang="&lt;?php print $language-&gt;language; &gt;" dir="&lt;?php print $language-&gt;dir; ?&gt;"&lt;?php print $rdf_version . $rdf_namespaces; ?&gt;&gt;
&lt;head&lt;?php print $rdf_profile; ?&gt;&gt;</pre>
</figure>
<p>This might not be the optimal way to set a doctype, but it would require a change to Drupal core to do anything better—in the default html.tpl.php, the doctype is hard-coded.</p>
<p>One minor problem is the <code>version</code> attribute—in HTML 5 it is deprecated, but the HTML+RDFa spec layers it back in (a weird thing that all of the specs on top of HTML can do). The version attribute isn't required, it <a href="http://www.w3.org/TR/rdfa-in-html/#additional-rdfa-processing-rules">simply gives guidance</a> to RDFa consumers, so I would recommend not using it.</p>
<h3>RDF namespaces</h3>
<p>Both RDFa and much of microdata use urls (also called URIs) to reference things. This makes it easy to combine information from different sites.</p><p>In microdata, the full url has to be used. In RDFa, there is a shortcut called a prefix that can be used.</p>
<p>For example, if I want to talk about myself, I might use the url http://lin-clark.com/user/lin. Using a prefix, I can shorten this to lc:lin. However, I have to tell the computer what "lc" stands for, so I add a namespace mapping to the html tag of the document. In this case, it would be <code>xmlns:lc="http://lin-clark.com/user/"</code>.</p>
<p>Drupal core automatically creates a variable for the namespace mappings. You might notice that it was included in the above snippet, but I'll include it again here, simplified:</p>
<figure class="code"><figcaption>$rdf_namespaces in html.tpl.php</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">&lt;html &lt;?php print $rdf_namespaces; ?&gt;&gt;</pre>
</figure>
<h3>RDFa for fields</h3>
<p>RDF is an entity-attribute-value data model. That means that an RDF representation of something is basically a series of really simple sentences about that thing. If I was describing myself, statements would look like this:</p>
<table>
<thead><tr><th></th><th>Entity</th><th>Attribute</th><th>Value</th></tr></thead>
<tbody>
<tr><td>1</td><td>lin</td><td>name</td><td>Lin Clark</td></tr>
<tr><td>2</td><td>lin</td><td>interest</td><td>data interoperability</td></tr>
<tr><td>3</td><td>lin</td><td>interest</td><td>HTML 5</td></tr>
<tr><td>4</td><td>lin</td><td>website</td><td>http://lin-clark.com</td></tr>
</tbody>
</table>
<aside class="sidenote"><h4>field.tpl.php</h4><p>Neither Drupal core nor AdaptiveTheme actually use field.tpl.php. Instead they use a theme function. However, both provide field.tpl.php files that show what the theme function is doing and allow for easy override of the field theme function.</p></aside>
<p>Fortunately, with the new Field API in core, Drupal's template structure matches this E-A-V model very well. There is a surrounding entity template (such as node.tpl.php or user-profile.tpl.php) with field templates nested inside of it. The field template receives the field values from the field formatter and places each value in its own wrapping div.</p>
<img width=600 src="/sites/default/files/html5rdfa-template-structure.png" />
<p>Because of this, you can get the proper markup for Field API fields simply by including a few attributes variables. You only need to include these if you are overriding templates in your theme, they are included by default in core templates.</p>
<aside class="sidenote"><h4>A note on attribute arrays</h4><p>While <a href="http://drupal.org/node/254940#html-attributes-variable">attribute arrays</a> are used for RDFa in Drupal, they are also used for a number of other things. For example, search uses it to specify the language of the search result. And themes can use them too—AdaptiveTheme uses them to place classes. So even if you don't have RDF enabled, you should include these attributes arrays. Note: these are included in the core templates, so will already be in place if you aren't overriding them.</p></aside>
<dl>
<dt><strong>Entity</strong></dt><dd>$attributes should be placed in the entity wrapper in ENTITY.tpl.php (i.e. user-profile.tpl.php). This will give you the <code>about</code> attribute and the <code>typeof</code> attribute.<figure class="code"><figcaption>$attributes in user-profile.tpl.php</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">&lt;div class="profile"&lt;?php print $attributes; ?&gt;&gt;</pre>
</figure></dd>

<dt><strong>Attribute</strong></dt><dd>$item_attributes[$delta] should be placed in the element that wraps the field value. This will place the <code>property</code> or <code>rel</code> attribute. This also places supporting attributes for the value, <code>content</code> and <code>datatype</code>, if needed.<figure class="code"><figcaption>$item_attributes in field.tlp.php</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">&lt;?php foreach ($items as $delta =&gt; $item) : ?&gt;
  &lt;div &lt;?php print $item_attributes[$delta]; ?&gt; class="field-item &lt;?php print $delta % 2 ? 'odd' : 'even'; ?&gt;"&gt;&lt;?php print render($item); ?&gt;&lt;/div&gt;
&lt;?php endforeach; ?&gt;</pre>
</figure></dd>

<dt><strong>Value</strong></dt><dd>
The HTML rendered with <code>render($item)</code> above contains the value. This works for core fields, but your mileage may vary with contributed field formatters. If a field formatter puts extraneous HTML directly into the field value, this gets in the way of getting a clean value.
<br /><br />One way to get around this is to use the helper attributes <code>content</code> and <code>resource</code>. If you maintain a contrib field formatter, feel free to ping me on IRC to check the RDFa for your values, or check with people in #drupal-rdf.
</dd>
</dl>
<h3>RDFa for non-fields</h3>
<p>RDFa for non-field values is much more complicated. Core does some RDFa output of non-field variables in particular instances. Examples of non-fields are the node author and date on nodes.</p><p>The one you need to know about is the title, which uses another attributes array, $title_attributes.</p>
<figure class="code"><figcaption>$title_attributes in node.tpl.php</figcaption>
<pre class="brush:php;gutter:false;toolbar:false;">&lt;?php if ($title): ?&gt;
  &lt;h1&lt;?php print $title_attributes; ?&gt;&gt;
    &lt;a href="&lt;?php print $node_url; ?&gt;" rel="bookmark"&gt;&lt;?php print $title; ?&gt;&lt;/a&gt;
  &lt;/h1&gt;
&lt;?php endif; ?&gt;</pre></figure>
<p>Until I'm persuaded otherwise, I think that we should discourage RDFa for non-fields in contrib. The advantage that Drupal has when it comes to RDF is the micro-templating (entity –> field –> field vaue) that is afforded by the <a href="http://garfieldtech.com/blog/mvc-vs-pac">PAC-ish architecture of Drupal</a>. That structure matches the entity-attribute-value nature of RDF. Once you get more complicated than that, the code required gets... well, more complicated.</p>
<p>Entity API includes the concept of properties, which allows you to register non-field variables in your model. I haven't looked in to it yet, but if there is a standard wrapper for properties as there is for fields, then it should be able to use a similar format.</p><p><strong>UPDATE:</strong> I have started looking into the Entity API properties in microdata. If it makes sense for developers using the API, I will recommend it for RDFa as well. There is an <a href="http://drupal.org/node/1199472">issue in the RDFx queue about this</a>.</p>
<h2>Validation</h2>
<p>Validation is still tricky. Some validators can handle microdata attributes but not RDFa, some can't handle either. The problem isn't that HTML+RDFa is any less valid than any of the other HMTL 5 drafts, it's that the <a href="http://answers.semanticweb.com/questions/9792/whats-the-status-of-validation-for-rdfa-in-html5">validators haven't been updated yet</a>.</p>
<p>HTML+RDFa just recently went into last call at the W3C with HTML 5 and microdata, so I believe we will be seeing much more tool support in things like validators soon. When I hear of a well-known validator adding HTML+RDFa support, I'll be sure to broadcast.</p>
<p>The fact remains though... it is unfortunately quite complicated to figure out just how to validate an HTML5+RDFa document at this point. While I've heard a number of suggestions for workarounds, none has worked for me yet.</p>
<p><strong>UPDATE:</strong> The W3C has requested that a <a href="http://lists.w3.org/Archives/Public/public-html/2011Jun/0366.html">task force take a look</a> at how the microdata and RDFa specifications can be made more compatible. Once that task force has completed its work (which may be 2 months if everything goes smoothly, longer otherwise), the validation issue should be much more clear.</p>
<h2>Feedback?</h2>
<p>This will probably turn into a page or five in the handbooks, so please let me know... Anything I missed? Anything that could be clearer? Anything you would like to hear more about?</p>
<aside class="warning"><h2>Before you comment</h2><p>Posts about RDFa and microdata tend to get more than their fair share of trolls (and remarkably uninformed ones at that) from both sides.</p><p>I have been working on generalized ways of outputting both and have hand-coded both. There is stuff to like and stuff to dislike about each approach (which I plan to blog about soon).</p><p>If you have experience you want to share and a desire to engage in reasoned discourse about the technical and social differences in the two, I'd be eager to hear... but polemics just don't interest me so much, especially on this blog.</p></aside>
<footer class="funding">This work has been funded by the European Community's Seventh Framework Programme (FP7/20072012) under Grant Agreement n256975, LODAroundTheClock(LATC) SupportAction.</footer>
