<!DOCTYPE html>

<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>Simple MVC</title>
        <?php echo $css ; ?>
        <script async src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.0/jquery.min.js"></script>
        <script  src="js/baza.js"></script>
    </head>
    <body>
        <header><?php echo $title; ?></header>
        <nav class="menu_bar"><?php echo $menu ; ?></nav>
        <div class="content">
            <header><?php echo $header; ?></header>
            <article><?php echo $content; ?></article>
        </div>
    </body>
</html>
