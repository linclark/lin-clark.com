---
title: Universities in RDF
date: 2009-05-02
tags: rdf, drupal
---
<p>What if you could find all of the academics working in your field across all universities in the world with a simple, SQL-like query? What if you could filter your search based on the region the academics are working in, the projects they have worked on, the languages they speak and then get a list of the courses that they offer? All with one query.</p>
<p>I don't know about you, but I totally geek out over that prospect.</p>
    READMORE
<p>It's something that is now becoming a very real prospect, too, as Semantic Web technologies such as RDF are developing. I totally fail at explaining RDF, so I'll let Manu Sporny <a href="http://www.youtube.com/watch?v=ldl0m-5zLz4">tell you about RDF</a> instead.</p>
<h2>My very first RDF hack</h2>
<p>As I've been wrapping my head around RDF and how vocabularies interrelate, I have roughed out a preliminary map of how the different vocabularies could fit together to model faculty, their courses, and their publications.   <a href="http://www.lin-clark.com/sites/default/files/pitt-in-rdf.gif"><img width="99%" alt="" src="http://www.lin-clark.com/sites/default/files/pitt-in-rdf.gif" /></a>  I used a couple of vocabularies that are under active development, such as Talis's Academic Institution Internal Structure Ontology and Patrick Murray-John's University Onotology. I have a much longer (and significantly more boring) <a href="/universities-rdf-process">discussion of my process in hacking this together</a>, including a discussion of the vocabularies I chose.</p>
<h2>Making RDF easy</h2>
<p>So this map begins to show how we could describe faculty conceptually in a way that would make all faculty Web sites into one giant, queriable database.</p>
<p>But even if we could work this hack into something elegant and settled on a common vocabulary for all different faculty to use, this is still pretty improbable, right? I mean, you'd have to get all the faculty to go in and tag up their pages the same way -- when's that ever going to happen?</p>
<p>Here's where it gets awesome.</p>
<p>A number of folks in the Drupal community have been working to make RDF in Drupal really usable and simple for content managers to implement on sites. And you wouldn't believe me if I tried to tell you, so you'll have to try it for yourself:</p>
<p>http://www.lin-clark.com/rdf-faculty-db/sparql</p>
<p>(note: this isn't really a sparql endpoint... you'll hear more about sparql down below)</p>
<p>Click on a name and inspect it with Firebug... see the thing in the tag that says property:&quot;foaf:firstName&quot;? That's the RDF (this is RDFa because it's in the XHTML rather than a separate .rdf file. I assume the 'a' stands for attribute, but others contend it stands for awesome).</p><p>Now log in with the un/pw 'demo'. Go to the drop down menu at the top of the page and selecting Content Management -&gt; Create Content -&gt; Faculty Member. After filling out the fields, be sure to hit Save at the bottom of the page...  and verything else is done for you, from URI to RDFa.</p><p>Check out your new entry... it has all of the RDF tagging that the other ones have. You just made a contribution to the web of data! Sir Berners-Lee would be so proud.</p>
<p>And now, for the really mind blowing part...</p>
<h2>Blowing your mind with SPARQL, the RDF query language</h2>
<p>So the RDF is in the page, but what do you do with it now?</p>
<p>You access it from anywhere in any way you want to.</p>
<p>For instance, go to: http://dbpedia.org/sparql</p>
<p>For the graph URI, use http://www.lin-clark.com/rdf-faculty-db/sparql and select the second option in the dropdown, get remote RDF data.</p>
<p>Enter your query. The one below will find all faculty listed who have an interest in XML.</p>
<p><code>PREFIX foaf:   &lt;http://xmlns.com/foaf/0.1/&gt;<br />SELECT  ?uri ?interest ?name WHERE   {<br>?uri foaf:surname ?name .           ?uri<br>foaf:topic_interest ?interest<br>FILTER regex(?interest, &quot;^XML&quot;)<br>}</code><hr /><p>Ok, so maybe querying 4 records on a toy site isn't mind blowing, but hopefully you can see where I'm going with this.</p><p>Let's pretend you have 100 top universities with all of their faculty and courses structured this way. And let's say you want to know where you should go to learn about the Semantic Web... what do you do?  Make a list of the sites, find the faculty who are pursuing Semantic Web research, retrieve projects and publications for each researcher, and retrieve the courses they teach... and you just made your own custom tailored research program comparison sheet and course catalog, in 10 minutes all with ONE query.</p>
<p>Pretty cool, isn't it? At least I think so.</p>