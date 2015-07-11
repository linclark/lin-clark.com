---
title: "Exploring Drupal module interactions with pidgin UML"
date: 2012-03-15
tags: drupal-planet, drupal-planet
---
<p>The essence of Drupal is complex interactions between modules. These interactions currently take the form of hooks. The most difficult (and most useful) thing for a Drupal developer to understand is how different sets of modules interact using these hooks and in which order.</p><p>Even though they are the heart of our system, we don&#39;t have a good way of documenting these interactions. While the API docs do contain this information for some hooks (eg, <a href="http://api.drupal.org/api/drupal/modules%21node%21node.api.php/function/hook_node_load/7">hook_node_load</a>), it&#39;s hard to grasp the overall picture from reading docblocks.</p><p>This causes a bigger problem than just the learning curve. It also makes it harder for us to discuss changes in APIs and architecture. We have been seeing this in the Drupal 8 development cycle&mdash;we are considering major overhauls of systems, and it&#39;s unclear to many what the impacts of these decisions are. The only people who can intelligently participate are those who are intensely involved in the architecting process or those who take a considerable amount of time to step through the code. As sun points out in <a href="http://www.unleashedmind.com/en/blog/sun/drupal-8-the-path-forward">Drupal 8: The Path Forward</a>, this communication challenge remains unresolved.</p><p>We need to find a way to communicate about these interactions which are so central to what we do.&nbsp;I have recently starting working with a visualization technique that helps me understand these interactions better, and I would be interested to hear whether others find it helpful as well.</p>
READMORE<p>It is based on a method that a lot of people outside of our community use to design and document systems, called <a href="http://en.wikipedia.org/wiki/Unified_Modeling_Language">UML</a>. While most UML diagram types are tailored for Object Oriented design, I think that (with a few tweaks) the diagrams could help us construct visual models of hook interactions.</p><p>I call this tweaked version &quot;pidgin UML&quot; because, like a pidgin language, the important thing isn&#39;t whether it follows grammatical rules but instead that the language helps people understand each other.</p><p>I'll be talking about a particular kind of UML diagram, the <a href="http://en.wikipedia.org/wiki/Sequence_diagram">sequence diagram</a>, which shows how different parts of a system use functions to talk to each other and the order of those function calls and responses.</p><p>For example, a sequence diagram of a meal at a restaurant might look like this:</p>
<figure style="text-align:center"><img src="http://upload.wikimedia.org/wikipedia/commons/2/20/Restaurant-UML-SEQ.gif" /><figcaption style="text-align:left">Restaurant interaction as a sequence diagram. <footer>Source: <a href="http://commons.wikimedia.org/wiki/File:Restaurant-UML-SEQ.gif">Wikimedia Commons</a></footer></figcaption></figure><h2>Sequence diagraming with pidgin UML</h2><p>While some people think that for UML to be useful, you have to be using the OO paradigm with a language like Java, I couldn't disagree more.</p><p>I recently started working on such diagrams for the microdata module. For example, this diagram shows how an array of microdata attributes is attached to a node when the node is loaded.</p><figure><a href="http://lin-clark.com/sites/default/files/EntityLoad.png"><img style="width: 100%" src="http://lin-clark.com/sites/default/files/EntityLoad.png" /></a><figcaption>Microdata is attached to the node object when node calls entity_load().<footer>See <a href="http://lin-clark.com/sites/default/files/EntityLoad.png">larger version</a></footer></figcaption></figure><p>I also disagree that UML diagrams are too hard for non-CS majors to understand. There are just a few conventions you need to know before you can read them.</p><h3>Conventions</h3><p>These are the conventions I used for the diagram.</p>
<dl>
<dt>Participant</dt>
<dd><img style="float:right" src="http://lin-clark.com/sites/default/files/sequence-diagram_participant.png" /><p>This is a distinct part of a system which interacts with other parts. In many diagrams, this would be an object. In my diagrams, I've chosen to go with the module that contains the relevant function. In addition, if there is a class which is involved in a significant way, such as the NodeController, I break it out as its own participant.</p></dd>
</dl>
<dt>Function call</dt>
<dd><img style="float:right" src="http://lin-clark.com/sites/default/files/sequence-diagram_function-call.png" /><img style="float:right; clear:both" src="http://lin-clark.com/sites/default/files/sequence-diagram_function-call-self.png" /><p>The participant calls a function. This function can belong to another participant (above) or be one of the participant's own functions (below). The arrow points to a white bar which represents the function and extends downward until the function either returns or terminates.</p></dd>
<dt>Return (optional)</dt>
<dd><img style="float:right" src="http://lin-clark.com/sites/default/files/sequence-diagram_return.png" /><p>Return values can optionally be noted as dashed arrows at the end of a function's bar.</p></dd>
<dt>Loop</dt>
<dd><img style="float:right" src="http://lin-clark.com/sites/default/files/sequence-diagram_loop.png" /><p>In general, you don't want to get too detailed about the procedural logic in your diagram. However, sometimes including some detail is necessarily to clearly communicate how an interaction happens. In the example diagram, I include a for loop to demonstrate that this process happens for each entity, not just once for the bundle.</p></dd>
<dt>Reference</dt>
<dd><img style="float:right" src="http://lin-clark.com/sites/default/files/sequence-diagram_ref.png" />A reference allows you to just give a quick summary of what happens in a portion of the code flow and provide more detail in another diagram. This can make the diagram clearer and also means that you can refer to the detail diagram from multiple places.</dd>
<dt>Hook invocation (pidgin)</dt>
<dd><img style="float:right" src="http://lin-clark.com/sites/default/files/sequence-diagram_hook.png" />Not surprisingly, there is no standard notation for hook invocations. In my diagrams, I chose to modify the notation for a function call. The hook name is shown in italics and then a grey bar is used to show the duration of the hook invocation. Any hook implementations that are important for the diagram are shown as function calls coming off of the hook's bar.</dd>
</dl>
<h2>Benefits</h2><p>I'm not the type to advocate for something because some priesthood has declared it The Right Way or because it has the right pedigree. Proposed changes in Drupal (both code and process) should be judged on their usefulness.</p><p>I think that this technique would introduce a number of benefits, particularly for core development.</p>
<h3>Grokability</h3>
<p>Before I diagramed this, I couldn't tell you off the top of my head which hooks were involved in the interaction. This set of diagrams gives a quick reminder.</p>
<p>It also makes it possible to give other module developers who want to introduce microdata integration a better idea of how their module hooks in. For example, for the node load interaction, the two hooks that modules integrating with microdata need to be aware of are shown below.</p>
<figure style="text-align:center"><a href="http://lin-clark.com/sites/default/files/sequence-diagram_get-field-types.png"><img style="width:60%" src="http://lin-clark.com/sites/default/files/sequence-diagram_get-field-types.png" /></a><figcaption style="text-align:left">A diagram showing where an implementing module's hooks are invoked.<footer>See <a href="http://lin-clark.com/sites/default/files/sequence-diagram_get-field-types.png">larger version</a></footer></figcaption></figure>
<h3>Scalability</h3>
<p>The <a href="http://groups.drupal.org/node/198538">Rethinking WSSCI thread</a> is one example of the communication problem we're talking about here. There were a lot of people (myself included) who simply didn't have the background knowledge necessary to intelligently engage in the discussion. If it takes <a href="http://groups.drupal.org/node/198538#comment-655213">6 hours to step through</a> the code, there will be a limited number of people who have the time to prepare themselves in order to usefully add to the discussion.</p>
<p>If diagrams could be used and if those diagrams made appropriate use of reference diagrams, then it would be easier to point to the changes in API interactions and solicit quality feedback.</p>
<h3>Sprintability (!)</h3>
<p>Creating (and occasionally maintaining) these diagrams is quite a bit of work. Our initiative leads are already giving 5,000,000%. We can't put another task on their shoulders.</p>
<p>The nice thing about sequence diagrams for existing systems is that the architect doesn't have to do it him/herself. It's something that can just as easily be done by a new contributor... and it is actually a good way to on-board that contributor because he/she will have a vastly improved understanding of the system afterwards.</p>
<p>I believe that in many ways, it's actually a better sprint activity than a lot of the things we sprint on because it can be a more interactive process.</p>
<h2>Conclusion</h2>
<aside class="sidenote">
<h3>Post-script</h3>
<p>After I posted this but before it was set to published, Jennifer Hodgdon updated api.drupal.org to show hook implementations and hook invocations, for example <a href="http://api.drupal.org/api/drupal/modules%21system%21system.api.php/function/hook_menu/7">hook_menu</a>. This is another big step forward for helping people understand the hook system.</p>
</aside>
<p>Module interactions are the most important and most difficult part of Drupal to understand. Using a lightweight, slightly tweaked version of the UML sequence diagram has helped me understand these interactions more. I think that they could also help us collectively understand and communicate about these interactions better.</p>
<p>I'm interested to hear whether others agree that this could be a useful tool for us as we develop and refactor. Please also chime in if you have any other tools or tips for how to make sense of and communicate about these interactions.</p>