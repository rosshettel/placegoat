<!DOCTYPE html>
<html>
	<head>
		<title>PlaceGoat</title>
		<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
		<script type="text/javascript">
		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-39096722-1']);
		  _gaq.push(['_trackPageview']);

		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>
		<style>
			.container { color: white; }
			body { background-color: #526F35; }
			#testgoat { margin-top: 35px; }
			#first { padding-top: 50px; }

			html, body { height: 100%; }

			/* Wrapper for page content to push down footer */
			#wrap {
				min-height: 100%;
				height: auto !important;
				height: 100%;
				/* Negative indent footer by it's height */
				margin: 0 auto -40px;
			}

			/* Set the fixed height of the footer here */
			#push, #footer { height: 40px; }

			#footer { background-color: #748b5d; }
			#footer p {margin: 10px 0; }
			#footer a {color: white; text-decoration: underline; }

			/* Lastly, apply responsive CSS fixes as necessary */
			@media (max-width: 767px) {
				#footer {
					margin-left: -20px;
					margin-right: -20px;
					padding-left: 20px;
					padding-right: 20px;
				}
			}
		</style>
	</head>
</html>

<body>
	<div id="wrap">
		<a href="https://github.com/rosshettel/placegoat"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png" alt="Fork me on GitHub"></a>
		<div class="container">
			<div class="row" id="first">
				<div class="span6">
					<h1>PlaceGOAT</h1>

					<p>Tired of all these placeholder services that just cater to superficial celebrity worship? Missing farm animals in your design mockups? Have an unhealthy love of yelling goats?</p>
					<p><strong>You are welcome here, friend.</strong></p>

					<p>There have been <strong><?=$count?></strong> goats served!</p>
				</div>

				<div class="span6">
					<iframe width="410" height="235" src="http://www.youtube.com/embed/PpccpglnNf0" frameborder="0" allowfullscreen></iframe>
				</div>
			</div>

			<div class="row">
				<div class="span7">
					<h2>Usage:</h2>

					<p><strong>If you know the width and height:</strong></p>
<pre>
http://placegoat.com/200/200
http://placegoat.com/width/height
</pre>

				<p><strong>If you want a square, just specify the width:</strong></p>
<pre>
http://placegoat.com/200
http://placegoat.com/width
</pre>

				<p><strong>If you're daring:</strong></p>
<pre>
http://placegoat.com/goatse/200/200
</pre>
				</div>
				<div class="span5">
					<img id="testgoat" src="/330/380">
				</div>
			</div>
		</div>
		<div id="push"></div>
	</div>

	<div id="footer">
		<div class="container">
			<p class="text-center">Built by Ross Hettel <strong>&bull;</strong> <a href="http://rosshettel.com">My website</a></p>
		</div>
	</div>
</body>
