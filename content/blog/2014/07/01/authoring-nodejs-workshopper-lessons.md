---
title: Authoring Node.js workshopper lessons
date: 2014-07-01
---
<p>The best time to write docs for newbies is when you've just figured something out yourself. It gives you a unique vantage point on where things are confusing.</p>

<p>Node.js has a great tool for creating interactive tutorials for newbies called workshopper. Unfortunately, it can be hard to figure out how workshopper works when you're still at that beginner stage where you have insight to offer. This post will help you figure out how to contribute exercises or even create your own lesson.</p>

<p><strong>TL;DR</strong> Download the <a href="https://github.com/linclark/demo-workshopper">demo-workshopper</a> repo to get a working skeleton lesson.</p>

<h2>How workshopper works</h2>

<p>A workshopper lesson can have multiple exercises. Each exercise consists of a problem (e.g. get the first argument to a script and uppercase it) and the suggested solution to the problem.</p>

<p>The user will work on their submission in a <code>program.js</code> file in their own directory (the submission directory). When the user runs the verify command, workshopper will create two processes, one for the submission (<code>program.js</code>) and one for the solution (<code>solution.js</code>) and will pass arguments to both. It will then compare the outputs from the two processes to see whether they match.</p>

  <h2>Basic setup</h2>
      <ol>
          <li><p>Add your <code>package.json</code> file, which will include the workshopper modules that you will be using, as well as any additional modules that will be used in solutions.</p>

<script src="http://gist-it.appspot.com/github/linclark/demo-workshopper/blob/master/package.json"></script>

              <p>The example in the demo-workshopper repository is pretty minimal. There are also other options that you can use, such as help and credits. You can see examples in the <a href="https://github.com/rvagg/workshopper/blob/master/package.json">learnyounode package.json</a>.</p></li>
          <li><p>Add your executable file (e.g. learnyounode for the Learn You Node lesson). When this is run, it will display the menu for your lesson. It will also be used for the run and verify commands. The filename is indicated in package.json with the <code>bin</code> key.</p>

              <script src="http://gist-it.appspot.com/github/linclark/demo-workshopper/blob/master/demo-workshopper.js"></script>

              <p>You may also want to run <code>npm link</code> to make <code>demo-workshopper</code> available as a command. If you don't, you can still run the command using <code>node demo-workshopper.js</code>.</p></li>
          <li><p>Run npm install</p></li>

<li><p>Add <code>exercises/menu.json</code>. This is an array of excercise titles.</p>
  <script src="http://gist-it.appspot.com/github/linclark/demo-workshopper/blob/master/exercises/menu.json"></script>
</li>

<li><p>Add a skeleton for an exercise. Each exercise in the menu will have a corresponding directory, which is a lowercase version of the name in the menu.</p>

  <p>You can automatically use the menu to generate the exercise files by running:</p>
  <script src="https://gist.github.com/linclark/2626ed3e3de7a870edcc.js"></script>
  <p>Or you can create the empty files in the <code>exercise</code> directory manually:</p>
  <div class="tree well">
      <ul>
          <li class="parent_li"><span>test_exercise</span>
              <ul>
                  <li><span><i class="icon-folder-open"></i>solution</span>
                      <ul>
                          <li><span>solution.js</span></li>
                      </ul>
                  </li>
                  <li><span>exercise.js</span></li>
                  <li><span>problem.md</span></li>
              </ul>
          </li>
      </ul>
  </div>
<li><p>Run your lesson with <code>node demo-workshopper.js</code>. You should get a menu like the following.</p>
      <img src="/images/blog/2014/demo-workshopper-menu.png" />
      </li>
      </ol>

<h2>Figure out your solution</h2>
      <p>I like to start each of my workshopper excercises by figuring out what solution I want the learner to find. For example, here's a solution from the makemehapi lesson:</p>

<script src="http://gist-it.appspot.com/github/linclark/demo-workshopper/blob/master/exercises/test_exercise/solution/solution.js"></script>

      <p>Put your solution in the <code>solution/solution.js</code> file.</p>

<p>In the example above, there is another file which is required for the solution to work, <code>index.html</code>. Because the path uses <code>__dirname</code>, the server is going to be looking for the file in the same directory as the currently running script (solution.js when running the solution, program.js when running the submission).</p>

<h2>Get it running</h2>
<p>In order to actually run this code from demo-workshopper.js, we need to add code to exercise.js. For the most part, you can simply copy exercise.js from one exercise to another. The two parts that are likely to vary between exercises are the setup and processing.</p>

<p>I'm not going to include the full code here, but you can see it in the <a href="https://github.com/linclark/demo-workshopper/blob/master/exercises/test_exercise/exercise.js">exercise.js</a> file.</p>
<h3>addSetup</h3>
<p>In the setup callback, you can add arguments to be passed to the solution and submission processes. For example, because we're testing the output of the servers that the submission and solution are creating, we will need a port for each of these servers to listen on. We generate two ports and add one to each of the arguments arrays, this.submissionArgs and this.solutionArgs. You'll see that in the solution, we use this argument in the call to createServer.</p>

<script src="http://gist-it.appspot.com/github/linclark/demo-workshopper/blob/master/exercises/test_exercise/exercise.js?slice=22:32"></script>

<p>You also might want to add other steps to this setup process. For example, in the proxies exercise for makemehapi, a third server is created so that both the submission and solution servers can proxy to it.</p>
      <h3>addProcessor</h3>
      <p>The processor tells workshopper how to test the solution. Sometimes just getting the output of a script is good enough, in which case you don't need to add a processor. However, there are many times that you need to do something else to really test.</p>
      <p>In the example of the Hapi server, we need to run requests against a particular URL to see what the response is. The processor in the example below does that.</p>
<script src="http://gist-it.appspot.com/github/linclark/demo-workshopper/blob/master/exercises/test_exercise/exercise.js?slice=35:83"></script>
      <p>Once you've added your setup and processor, you can try running your solution to make sure that it gives you the expected output. You should also try copying the solution files to another directory and running the verify command.</p>

<h2>Flesh out your problem description</h2>
<p>Now that you have your solution in place, you need to write a problem description that will help guide people to getting to that solution.</p>
