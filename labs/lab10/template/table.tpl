<div class="center_content">
    <table>
      <?php
        if ($data) {
          foreach ( $data as $key => $value ) {
            echo '<tr><td>'.$key.'</td><td>'.$value.'</td></tr>' ; }
          //print_r($data) ;
          }
      ?>
    </table>     
</div>
