
$('#discountValueHide').click(()=>{
    $('#discountDiv').hide()
    // $('#discountDiv').prop('required',false);
})
$('#discountValueGet1').click(()=>{
    // $('#discountDiv').prop('required',true);
    $('#discountDiv').show()
})
$('#discountValueGet2').click(()=>{
    // $('#discountDiv').prop('required',true);
    $('#discountDiv').show()
})





$('#formCouponDiscount').on('keyup',()=>{
    check_discount();
})
$('#formCouponDiscount').focusout(()=>{
    check_discountValueAfterFocuOut();
})

function checkDiscount(){
    check_discountValueAfterFocuOut()
}

function check_discount(){
    let value = $('input[name="type"]:checked').val();
    var discount =$('#formCouponDiscount').val()
    if(value=='Percentage'){
        if(discount>0 && discount<=100){
            $('#discountValueMsg').html("") 
        }else{
            $('#discountValueMsg').html("Percentage value must contains between 1-100")
        }
    }else{

    }
}

function check_discountValueAfterFocuOut(){
    let value = $('input[name="type"]:checked').val();
     var discount =$('#formCouponDiscount').val()
    if(value=='Percentage'){
        if(discount.length==0){
            $('#discountValueMsg').html("") 
        }else if(discount>0 && discount<=100){
            $('#discountValueMsg').html("") 
        }else{
            $('#discountValueMsg').html("Percentage value must contains between 1-100")  
        }
    }else{
        $('#discountValueMsg').html("")
    }
}
