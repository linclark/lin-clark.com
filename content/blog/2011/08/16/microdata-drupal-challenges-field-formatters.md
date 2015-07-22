---
title: "Microdata in Drupal: challenges for field formatters"
date: 2011-08-16
tags: drupal-planet, microdata, html-data, drupal-planet
---
<p>Interest in microdata has been on the rise since the <a href="http://googlewebmastercentral.blogspot.com/2011/06/introducing-schemaorg-search-engines.html">schema.org announcement</a> in June.</p><p>I had fortunately already been looking at the <a href="http://www.whatwg.org/specs/web-apps/current-work/multipage/microdata.html">microdata spec</a> and thinking about how the work to get RDFa output in core could be repurposed for microdata, so I <a href="http://drupal.org/project/microdata">started a project</a> that day.</p>
<p>Since microdata is based on RDFa, there is a lot that can be repurposed. But as I noted in <a href="http://lin-clark.com/blog/two-meanings-semantics-html5">my last post on the subject</a>, there are also small differences between the specs... and in some cases, these small differences have a big impact.</p>
<p>We need to start thinking about those impacts.</p>
READMORE<aside class="sidenote"><p>In order to properly support microdata, we have to start doing some rethinking. As I'll explain below, proper microdata support requires much more buy in from certain contrib module developers than RDFa support. So we should start making sure that it makes sense, and makes sense to all of the people it needs to.</p>
<p>For anyone who wants to contribute to that effort, please join me at <a href="http://london2011.drupal.org/bofsession/microdata-drupal">DrupalCon London for a BoF</a>.</p></aside>
<p>One of the differences between RDFa and microdata is that microdata is much more sensitive to the placement of attributes within the HTML.</p><p>For example, let's say you have a profile page about yourself and you want to add an image of yourself to the profile. In RDFa, you use the <code>rel</code> attribute to create the relationship between you and the picture. There are a number of places you could add this <code>rel</code> attribute, so long as it is in between the id for you and the <code>&lt;img&gt;</code> tag.</p>
<figure class="code"><figcaption>Most basic RDFa markup</figcaption>
<pre class="brush:html;gutter:false;toolbar:false;">
    &lt;div about="lin" rel="image"&gt;
      &lt;img src="foo.jpg" /&gt;
    &lt;/div&gt;
</pre>
</figure>
<p>Because the <code>rel</code> attribute knows it is looking for a URL attribute, like <code>href</code> or <code>src</code>, you don't have to worry about it misunderstanding what you meant if you add a little text (or even particular extraneous HTML elements) around the picture. And you can even have multiple values included for the same <code>rel</code> attribute.</p>
<figure class="code"><figcaption>More complex RDFa markup</figcaption>
<pre class="brush:html;gutter:false;toolbar:false;">
    &lt;div about="lin"&gt;
      &lt;div rel="image"&gt;
        <!-- extraneous HTML (with no URL-type elements) -->
        &lt;p&gt;And here are some pictures of me.&lt;/p&gt;
        <!-- two URL-type elements are the values for the rel attribute -->
        &lt;img src="foo.jpg" /&gt;
        &lt;img src="bar.jpg" /&gt;
      &lt;/div&gt;
    &lt;/div&gt;
</pre>
</figure>
<p>In contrast, there is only one place where you can put microdata's <code>itemprop</code> attribute—directly on the value's HTML element itself.</p>
<figure class="code"><figcaption>More complex example as expressed in microdata</figcaption>
<pre class="brush:html;gutter:false;toolbar:false;">
    &lt;div itemid="lin" itemscope&gt;
      &lt;p&gt;And here are some pictures of me.&lt;/p&gt;
      &lt;img itemprop="image" src="foo.jpg" /&gt;
      &lt;img itemprop="image" src="bar.jpg" /&gt;
    &lt;/div&gt;
</pre>
</figure>
<h2>What this means for Drupal</h2><aside class="sidenote"><h3>Well, it's actually a little more complicated...</h3><p>I will be simplifying some of the code in this article in order to communicate better. This isn't quite how the image/field interaction works, but it's close enough to get the point.</p></aside>
<p>As I explained in my post about <a href="http://lin-clark.com/blog/theming-html5-and-rdfa-drupal-7">theming with HTML5 and RDFa</a>, Field module handles most of the RDFa output on a normal site. It inserts RDFa's <code>rel</code> attribute (or <code>property</code> or <code>rev</code>) on the <code>&lt;div&gt;</code> that wraps around the field formatter output. Theoretically, it would work like the following:</p>
<figure class="code"><figcaption>Interaction between Image module and Field module</figcaption>
<ol>
<li>Image module's field formatter returns the img element
<pre class="brush:html;gutter:false;toolbar:false;">
&lt;img src="foo.jpg" /&gt;
</pre>
</li>
<li>Field module wraps the returned element in a div
<pre class="brush:html;gutter:false;toolbar:false;">
&lt;div class="field-item" rel="og:image"&gt;&lt;img src="foo.jpg" /&gt;&lt;/div&gt;
</pre>
</li>
</ol>
</figure>
<p>However, this simply doesn't work for microdata. The <code>itemprop</code> can't be added to the wrapping <code>&lt;div&gt;</code>, it has to be placed within the field formatter's output itself.</p>
<p>With RDFa, Image module doesn't need to be aware of whether or not there is extra markup... the formatter just passes the element up to Field module which worries about the RDFa. However, with microdata, Image module needs to place the <code>itemprop</code> attribute itself.</p>
<p>What was once centralized in core's Field module now has to be coordinated across contrib's field formatter modules.</p>
<h2>A little tech difference turns into a big social difference</h2>
<p>Adding RDFa support in Drupal required much less explicit participation from module developers... it's just on by default. Because all fields pass through the code in field.module, contrib module developers didn't have to do anything in order to enable RDFa markup for their fields. In contrast, microdata will take explicit cooperation from module developers who are creating field formatters.</p>
<p>In some ways, the lower amount of coordination between developers that RDFa affords is a good thing. Drupal is a very large, very loosely coordinated system; as of early August, just shy of 200 Drupal 7 modules defined field formatters (out of nearly 2,000), and there will surely be many more coming. If current trends hold, it would be easy to see the number of modules defining field formatters reaching 800-1,000 before Drupal 7 module development winds down.</p><p>Explicit participation from that many developers is tough. It means there are a lot of people (hundreds of developers) who you have to teach the basics of metadata placement to.</p><h2>... but more work isn't necessarily bad</h2><p>On the other hand, I think that the explicit participation that microdata requires from field formatter module developers could turn out to be a good thing.</p><p>Currently, field formatter developers don't understand how their fields get marked up with RDFa... because we don't ask them to understand. While this works for basic fields, there are a couple of ways in which it can go wrong.</p><dl><dt>Uninformed field formatter developers</dt><dd>Most field formatter developers don't review their RDFa output and wouldn't know what to check for if they did. Some formatters do things like adding linked headings within the field value itself instead of working with labels, which can really mess up <code>rel</code> values.</dd><dt>Compound fields</dt><dd><p>Currently full RDFa output for all field data requires that field formatters be reduced to their most granular level of data. Some modules allow for this. For example, Field Collection encourages you to decompose the information in your fields into the most basic units. You can create a wide variety of complex fields using only Field Collection and the fields that core provides.</p><p>In contrast, something like AddressField doesn't rely on the entity-field relationships to model the inner data. It's an example of what I call a <b>compound field</b>. These fields manage their own schema and create a complex blob of HTML in hook_field_formatter_view. They may use <a href="http://drupal.org/node/1021466">Entity API's property information</a> in order to expose the data model to other modules, but they don't follow the core entity-field relationship that RDFa output in Drupal relies on.</p></dd><dt>Themers overriding field templates</dt><dd>One of the great things about Drupal is the granularity of the theme layer. For advanced themers, it is easy to override just a small part of the HTML output without having to repeat the template code for the parent or child elements.</p><p>One of the most common things to override is field output. But since <code>theme_field</code> places the RDFa in the wrapping element that the themer is trying to change, it is easy for themers to blow away the RDFa or add markup that changes the meaning of the RDFa in the process.</dd></dl>
<p>I think the changes that microdata necessitates will help us take care of these problematic issues.<ol><li>Microdata will only be output by fields that have intentionally enabled output. This means the maintainer or a contributor will have some knowledge of what the output is supposed to look like... who knows, they might even write tests for it!</li><li>Because field formatter developers will need to intentionally place the <code>itemprop</code> variables within their <code>hook_field_formatter_view</code> implementations anyway, it wouldn't be too much extra work to enable mappings for compound fields.</li><li>Themers are less likely to be altering the things output by <code>hook_field_formatter_view</code>, so will be less likely to interfere with the metadata output.</li></ol></p>
<h2>The challenge</h2>
<p>The challenge now is creating an easy to use API that passes terms for mappings from the microdata module to field formatters, enabling (in as foolproof a way as possible) the field formatter to place the terms. I have a start on one, but would really like some feedback from the people who will actually have to use it.</p>
<h2>Who's up for the challenge?</h2>
<p>If you've made it this far, I'd say there's a high probability you are ;)</p>
<p>I would like to have a <a href="http://london2011.drupal.org/bofsession/microdata-drupal">BoF at DrupalCon London</a>, I hope others want to join. I'm looking forward to involvement and input from:</p>
<ul>
<li>Field formatter developers</li>
<li>Advanced themers</li>
<li>People who really like reading specs</li>
<li>Those passionate about DX (developer experience)</li>
<li>People with other relevant knowledge who I inadvertently forgot</li>
</ul>
<aside class="warning"><h2>Before you comment</h2><p>While this project does need people who are passionate about standards, it doesn't need people who are religious about them. If you're into religious warfare, then this probably isn't the project for you.</p></aside><footer class="funding">This work has been funded by the European Community's Seventh Framework Programme (FP7/20072012) under Grant Agreement n256975, LODAroundTheClock(LATC) SupportAction.</footer>
