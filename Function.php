<?php

class MyFunction{
     function add($a,$b){
        echo $a+$b;
    }
    
    function sub($a,$b){
        echo $a-$b;
    }
    function mult($a,$b){
        echo $a*$b;
    }
    function div($a,$b){
        echo $a/$b;
    }
}

// INSTANCE CLASS MYFUNCTION
$calc = new MyFunction;

// HANDLER DATA FROM AJAX REQUEST
if (isset($_GET['subt'])) {
    $data = explode(",",$_GET["subt"]);
    $calc->sub($data[2],$data[0]);
}

if (isset($_GET['add'])) {
    $data = explode(",",$_GET["add"]);
    $calc->add($data[2],$data[0]);
}

if (isset($_GET['mult'])) {
    $data = explode(",",$_GET["mult"]);
    $calc->mult($data[2],$data[0]);
}

if (isset($_GET['div'])) {
    $data = explode(",",$_GET["div"]);
    $calc->div($data[2],$data[0]);
}
?>