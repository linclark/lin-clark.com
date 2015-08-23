---
title: Why Drupal 8 should drop RDFa (and microdata) in favor of JSON
date: 2013-12-08
---
<p>As many in the Drupal community know, I have been heavily involved in the work around RDFa and microdata in Drupal for the past four years. What is generally less well known, though I've discussed it openly, are my thoughts on RDFa in Drupal core.</p>

<p>Drupal 7 core&#8217;s RDFa works in some cases. However, in many cases it outputs unreliable data. I started writing about this fact on my blog in 2011, wrote a thesis about it, and compiled a preliminary list of things we need to fix it in Drupal 8 in a <a href="https://drupal.org/node/1778226">meta issue</a>. My opinion this whole time has been that we either need to fix the module or remove it from core.</p>

<p>Today, I created an issue to <a href="https://drupal.org/node/2152459">remove RDF module</a>... but it&#8217;s not just because RDF module isn&#8217;t working like it needs to be. It&#8217;s because I think we have a better option: JSON.</p>

<h2>Why we should ditch RDFa</h2>
<p>As someone who is very familiar with Drupal 7&#8217;s RDF module, and as the person who rewrote most of it in Drupal 8, I recommend we remove the module. Here&#8217;s why:</p>
<dl>
<dt>RDFa isn&#8217;t explicitly supported by Google in their documentation for their consumption of Schema.org.</dt>
<dd>I know that someone will point out that increased institutional support is coming in the <a href="http://lists.w3.org/Archives/Public/public-vocabs/2013Dec/0009.html">not-too-distant future</a>, but it has been coming for <a href="https://drupal.org/node/1438788">at least a year and a half</a> now, and it also isn&#8217;t clear to me whether that support will include docs in <a href="https://support.google.com/webmasters/answer/3069489?hl=en">Google&#8217;s</a> Schema.org documentation (as opposed to Schema.org itself).</dd>
<dt>It is the most complex option.</dt>
<dd>This makes it harder for users to figure out what&#8217;s going on and harder for them to debug. It also means that we have bugs which have gone unresolved for years.</dd>
<dt>To do it right, it will require that every field formatter&#8217;s RDFa output be tested and that some include code specifically for handling RDFa.</dt>
<dd>The RDFa &#8216;feature&#8217; that we used to handle attribute placement genericly in D7 simply doesn&#8217;t provide data that is reliable enough. RDFa Lite copies microdata&#8217;s processing model, which is more explicit but also requires that the attributes be placed in field formatters for many types of field, as I&#8217;ve <a href="http://lin-clark.com/blog/2011/08/16/microdata-drupal-challenges-field-formatters/">pointed out before</a>.</dd>
<dt>It makes the data less accessible to most consumers.</dt>
<dd>In order to get data out of RDFa-enhanced HTML, you need a special tool, an RDFa parser. Most developers are not going to be familiar with RDFa parsers, much less use one. Additionally, even if you use one, the RDFa 1.1 parsing algorithm is super complicated, so if you run into a problem it can be hard to tell whether it&#8217;s a bug in the data or in the parser.</dd>
</dl>

<h2>Why we should ditch microdata</h2>
<p>I&#8217;m also the maintainer of microdata module in Drupal 7. While microdata reduces the complexity of RDFa, it still suffers from some of the same problems. We would still need to involve field formatter developers in order to ensure that attributes are placed properly. It also still requires a separate parser. While microdata parsers are much simpler and easier to debug, it&#8217;s better if you require no special tooling at all.</p>

<h2>Why we should introduce *limited* support for the JSON that Schema.org calls JSON-LD</h2>
<p>In early summer Google announced that it would read JSON that was directly embedded in web pages, providing an alternate way to add Schema.org data to your page, and it looks like this is catching on. This is a better solution for Drupal because:</p>
<dl>
<dt>It would mean we could use the same pipeline for REST&#8217;s serialization and HTML data.</dt>
<dd>Having a unified approach like this makes it easier to maintain, especially since we have so few people working on these issues.</dd>
<dt>It removes complexity from the field formatters and theme layer.</dt>
<dd>This is just a win no matter how you look at it. These are people who shouldn&#8217;t have to understand RDFa/microdata attribute placement... and with this approach, they wouldn&#8217;t have to.</dd>
<dt>It makes it easier for lower budget consumers to use the data.</dt>
<dd>Just about any language or platform that web developers would be using these days handles JSON out of the box... no extra tooling needed.</dd>
<dt>It makes it easier to replace the implementation from contrib.</dt>
<dd>The architecture in D8 core makes it ridiculously easy to alter the way that data is output in different formats. Do you want to have full JSON-LD support? Go ahead, add a module in contrib. It will be incredibly easy to swap it in.</dd>
<dt>It&#8217;s easier for site builders to debug.</dt>
<dd>Interpreting what the RDFa/microdata embedded in HTML actually means is hard. Reading the key/value pairs of JSON is easy.</dd>
</dl>
<h2>Why I&#8217;m calling it Schema.org&#8217;s JSON instead of JSON-LD</h2>
<p>Google added support for "JSON-LD" in email actions in the early summer, and added support in search shortly afterwards. However, it wasn&#8217;t really JSON-LD at that point, as one of the editors of the JSON-LD spec <a href="http://manu.sporny.org/2013/gmail-json-ld/">pointed out</a>. Some of the issues have been fixed, but it still is not possible to process Schema.org&#8217;s JSON-LD with a generic, standards compliant processor because the request to the context URI (http://schema.org) doesn&#8217;t return a parsable context.</p>

<img src="/images/blog/2013/schemaorg-jsonld-validation.png" />

<p>Beyond this pedantic point of note, I think it is important to draw this distinction if just to make clear what we plan to focus on. Like many of the related standards, JSON-LD includes a lot of complexity in order to support extensibility. But as we&#8217;ve seen over the past 4 years, this extensibility is an edge case. The 99% use case for these technologies in Drupal at this point is SEO. And truth be told, what we have in there right now (and what we will have in there in Drupal 8 if we stay on the same path) just isn&#8217;t well suited to satisfying either the primary use case or the edge cases.</p>

<p>So what would this mean for the development of the feature? Unless a feature or fix is strictly necessary for Schema.org, we wouldn&#8217;t consider it. As I said above, anyone who wants more functionality can easily swap out the core implementation of the Schema.org JSON serialization for a full implementation of JSON-LD.</p>

<h2>Making this change now?</h2>
<p>This is an 11th hour change. However, we aren&#8217;t removing something that&#8217;s working in favor of an unknown. We&#8217;re simply switching from a complex, unfinished solution to a simpler solution. That&#8217;s the kind of change you need to make when a release date is looming and you have unfinished features with limited resources to complete them.</p>

<strong id="update-1">Update 1:</strong>
<p>As I expected, the fact that RDFa 1.1 is supported by Google for Rich Snippets has been pointed out. I did not contest that it wasn&#8217;t (because I know that it is, to some degree at least). What I said was that Google doesn&#8217;t explicitly say that they support RDFa in their Schema.org documentation. In fact, they explicitly say that they <strong><em>don&#8217;t</em></strong> support RDFa (see the screenshot on the left).</p>

<figure width="100%">
<a href="/images/blog/2013/schema.org FAQ   Webmaster Tools Help.png"><img style="vertical-align:top; width: 32%" src="/images/blog/2013/schema.org FAQ   Webmaster Tools Help.png" /></a>
<a href="/images/blog/2013/About Structured Data Markup Helper   Webmaster Tools Help.png"><img style="vertical-align:top; width: 32%" src="/images/blog/2013/About Structured Data Markup Helper   Webmaster Tools Help.png" /></a>
<a href="/images/blog/2013/Markup Helper   Article   Webmaster Tools Help.png"><img style="vertical-align:top; width: 32%" src="/images/blog/2013/Markup Helper   Article   Webmaster Tools Help.png" /></a>
<figcaption>Screenshots (taken on Dec 9, 2013) of Google documentation: 1) <a href="https://support.google.com/webmasters/answer/1211158">schema.org FAQ</a>, 2) <a href="https://support.google.com/webmasters/answer/3069489?hl=en&ref_topic=3068649">About Structured Data Markup Helper</a>, and 3) <a href="https://support.google.com/webmasters/answer/3222269">Article Markup Helper</a></figcaption>
</figure>

<p>Other people have asked whether Google supports JSON-LD for Rich Snippets. That&#8217;s hard to say. Based on the documentation of the Structured Data Markup Helper (screenshot center) I would say yes, because it prominently features a Rich Snippet and then says that microdata and JSON-LD are two ways of marking up your data on pages or in emails.</p>
<p>It does say microdata is preferred for pages, but it does not say that JSON-LD should not be used for marking up pages. They even include the factoid about JSON-LD on pages about marking up articles and books (screenshot right). However, based on a <a href="https://twitter.com/danbri/status/410074522293784576">tweet</a> from Dan Brickley, it is possible that Google only uses JSON-LD on pages for some specific search applications. I would find this an odd distinction for them to make, since it&#8217;s clear that they have in place the tools and process for extracting JSON-LD.</p>
