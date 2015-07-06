---
title: "Importing / Syncing Content from external sites like Wikipedia"
date: 2010-11-05
tags: drupal-planet, drupal, sparql, rdf, drupal-planet
---
<p>UPDATE: This is for SPARQL Views in Drupal 6. The module has changed significantly in Drupal 7.</p><p>Importing and syncing content is the capability that inspired me to start learning about the Semantic Web, back when I was trying to figure out how to get a <a href="http://lin-clark.com/universities-rdf-process">handle on the entropy of University academic department administration</a>.</p>  <p>That's why I did a little dance in my chair when I first tried out the powerful combination of Views, Feeds View Parser, and Feeds with my new module, SPARQL Views. With this combination, you can create a query on a SPARQL endpoint with Views, and then map that to a content type with Feeds.</p>  <p>Here are two screencasts that show how you can import and sync content with Wikipedia, and I'm posting the related code and links below.</p> 
READMORE<object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/dmhxN7X0SOE?fs=1&amp;hl=en_US" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><embed src="http://www.youtube.com/v/dmhxN7X0SOE?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>  <object width="480" height="385"><param name="movie" value="http://www.youtube.com/v/UN31d2C5syM?fs=1&amp;hl=en_US" /><param name="allowFullScreen" value="true" /><param name="allowscriptaccess" value="always" /><embed src="http://www.youtube.com/v/UN31d2C5syM?fs=1&amp;hl=en_US" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="480" height="385"></embed></object>  <hr />  <p><strong>.make file:</strong> http://latc-project.eu/sites/default/files/sv-feeds.tar <strong>Endpoint:</strong> http://dbpedia-live.openlinksw.com/sparql <pre>PREFIX rdf: &lt;http://www.w3.org/1999/02/22-rdf-syntax-ns#&gt;
PREFIX dbpedia-owl: &lt;http://dbpedia.org/ontology/&gt;
PREFIX rdfs: &lt;http://www.w3.org/2000/01/rdf-schema#&gt;

SELECT * WHERE {
?person rdf:type ;
dbpedia-owl:abstract ?abstract;
rdfs:label ?person_name.
FILTER (lang(?abstract) = "en")
}</pre><p>I used FILTER (lang(?abstract) = &quot;en&quot;) in the video, but the better way to do this is actually to use langMatches. The equality check is case sensitive, so if you use uppercase (or the endpoint uses uppercase and you use lowercase), then the check will fail.</p>