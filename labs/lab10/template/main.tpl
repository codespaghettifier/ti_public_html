<!DOCTYPE html>
 
<html>
    <head>
	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<title>Simple MVC</title>
	<?php echo $css ; ?>   
	<script  src="js/baza.js"></script> 
    </head>
    <body>   
        <header><?php echo $title; ?></header>
	<nav><?php echo $menu ; ?></nav>
        <section>
          <header><?php echo $header; ?></header>
          <article><?php echo $content; ?></article> 
        </section>
        <footer>Techniki internetowe &copy; 2020</footer> 
    </body>
</html>

