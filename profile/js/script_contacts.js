window.onload = function(){
    var x = document.getElementById("contact").children.length;
    if(x==0)
    {
        document.getElementById("contact").innerHTML= "0 number of contact"
    }
}



//menubar coding

function myFunction(x) {
    if (x.matches) { // If media query matches
      var menu = document.getElementById("menu-bar");
        menu.onclick=function()
        {
            var menu_option=document.getElementById("left");
            menu_option.style.animation="darpan_slide 1s";
            menu_option.style.animationFillMode="forwards";
            var menu_exit = document.getElementById("close");
            menu_exit.onclick=function(){
            var menu_option=document.getElementById("left");
            menu_option.style.animation="darpan_slide_exit 0.5s";
            menu_option.style.animationFillMode="forwards";
        }

        }
        
    }
  }
  
  var x = window.matchMedia("(max-width: 751px)");
  myFunction(x) ;
  
//menubar coding

//profile photo 

function showing_pic_name(){
    var name  = document.getElementById("user-name");
    var user_mail = sessionStorage.getItem("user_mail");
    var emailid = document.getElementById("email-id");
    var user_details = localStorage.getItem(user_mail);
    var user_data= JSON.parse(user_details);
    var fullname = user_data.name;
    name.innerHTML=atob(fullname);
    emailid.innerHTML=atob(user_mail);

    var pic_box = document.getElementById("profile-img-section");
    var image_name = localStorage.getItem(user_mail+"image_url");
    pic_box.style.background="url("+image_name+")";
    pic_box.style.backgroundRepeat="no-repeat";
    pic_box.style.backgroundSize="contain";
}

showing_pic_name();
//profile photo

//logout coding

function logout(){
    sessionStorage.clear();
    setTimeout(function(){
        window.location="../../index.html";
    },1000);
}
//logout coding


//add contact coding

function add_contacts(){
    var fullname2 = document.getElementById("fullname").value;
    var pnum = document.getElementById("pnum").value;
    var snum = document.getElementById("snum").value;
    if(fullname2 != "" && pnum != "" && snum != ""){
        if(isNaN(pnum)){
            alert("please enter a valid primary number");
        }
        else{
            if(isNaN(snum))
            {
                alert("please enter a valid secondary number");
            }
            else{
                var user = {fullname:fullname2,pnum:pnum,snum:snum}
                var user_details = JSON.stringify(user);
                localStorage.setItem(fullname2+"contact",user_details);
            }
        }
    }
    else{
        alert("Some fields are empty");
    }
}




function show_contacts(){
    var i;
    for(i=1;i<=localStorage.length;i++){
        var keys = localStorage.key(i);
        if(keys.match("contact")){
            var json_text = localStorage.getItem(keys);
            var json_extract = JSON.parse(json_text);
            var con = document.getElementById("contact");
            var tr = document.createElement("TR");
            var td_1 = document.createElement("TD");
            var td_2 = document.createElement("TD");
            var td_3 = document.createElement("TD");
            var td_4 = document.createElement("TD");
            var td_5 = document.createElement("TD");
            var td_6 = document.createElement("TD");
            var a_1 = document.createElement("A");
            var a_2 = document.createElement("A");
            var a_3 = document.createElement("A");
            var img_1 = document.createElement("IMG");
            var img_2 = document.createElement("IMG");
            var img_3 = document.createElement("IMG");
            var span = document.createElement("SPAN");
            span.setAttribute("class", "material-icons");
            span.setAttribute("style","transform: translate(-10px,5px);");
            a_1.setAttribute("href","#");
            a_2.setAttribute("href","#");
            a_3.setAttribute("href","#");
            con.appendChild(tr);
            tr.appendChild(td_1);
            // td_1.appendChild(span);
            tr.appendChild(td_2);
            tr.appendChild(td_3);
            tr.appendChild(td_4);
            td_4.appendChild(a_1);
            a_1.appendChild(img_1);
            tr.appendChild(td_5);
            td_5.appendChild(a_2);
            a_2.appendChild(img_2);
            a_2.setAttribute("id", "delete");
            tr.appendChild(td_6);
            td_6.appendChild(a_3);
            a_3.appendChild(img_3);
            span.appendChild(document.createTextNode("person"));
            td_1.appendChild(document.createTextNode(json_extract.fullname));
            td_2.appendChild(document.createTextNode(json_extract.pnum));
            td_3.appendChild(document.createTextNode(json_extract.snum));
            img_1.setAttribute("src","images/edit.svg");
            img_2.setAttribute("src","images/delete.svg");
            img_3.setAttribute("src","images/save.svg");  
            a_3.style.display="none";
            edit_contact(keys, a_1, a_3, td_1, td_2, td_3);
            del_contact(keys, a_2);       
        }
    }
}
show_contacts();

function edit_contact(contact_name, edit_btn, save_btn, user_name, user_number1, user_number2){
    edit_btn.onclick=function(){
        save_btn.style.display="table";
        user_name.setAttribute("contenteditable","true");
        user_name.focus();
        user_number1.setAttribute("contenteditable","true");
        user_number2.setAttribute("contenteditable","true");

        save_btn.onclick = function(){
            var edit_data = {fullname:user_name.innerHTML, pnum:user_number1.innerHTML, snum:user_number2.innerHTML};
            var final_data = JSON.stringify(edit_data);
            var txt = localStorage.getItem(contact_name);
            localStorage.setItem(contact_name, txt.replace(txt, final_data));
        }
        
    }
}

function del_contact(contact_name, del_btn){
    del_btn.onclick = function(){
        var answer = confirm("Confirm Your Delete");
        if(answer==true){
            var td = this.parentElement;
            var tr = td.parentElement;
            tr.remove();
            document.cookie=contact_name+"="+localStorage.getItem(contact_name)+";max-age:2592000";
            localStorage.removeItem(contact_name);
            var x = document.getElementById("contact").children.length;
                if(x==0)
                {
                    document.getElementById("contact").innerHTML= "0 number of contact"
                }
        }
    }
}

//add contact coding

// search contact coding start

function search_contact(user_input){
    var keyword = user_input.value;
    var contact_list = document.getElementById("contact");
    var tr = contact_list.getElementsByTagName("TR")
    var td = contact_list.getElementsByTagName("TD");
    var i;
    for (i=0;i<tr.length;i++)
    {
        if(tr[i].innerText.indexOf(keyword) < 0){
            tr[i].style.display="none";
            console.log(tr[i]);
        }
        else if(tr[i].innerText.indexOf(keyword) >= 0){
            tr[i].style.display="";
        }
    }
}
// search contact coding end

//restore contacts

function restore(){
    var slideup = document.getElementById("restore-option");
    var notice = document.getElementById("restore-notice");
    var table = document.getElementById("restore-table");
    slideup.style.height="100vh";
    slideup.style.transition="all 0.5s";
    var close = document.getElementById("close-restore");
    close.style.cursor="pointer";
    close.onclick=function(){
        slideup.style.height="0";
        slideup.style.transition="all 0.5s";
    }
    if(document.cookie.length != 0)
    {
        notice.innerHTML = "DELETED CONTACTS";
        var devide_cookie = document.cookie.split(";");
        var i,j;
        for(i=0;i<devide_cookie.length;i++){
            var key_value = devide_cookie[i].split("=");
            key_value[1]
            for(j=0;j<key_value.length;j++){
                if(key_value[j].indexOf("contact")== -1)
                {
                    var extract = JSON.parse(key_value[j]);
                    var tr = document.createElement("TR");
                    var td_name = document.createElement("TD");
                    var td_pnum = document.createElement("TD");
                    var td_snum = document.createElement("TD");
                    var td_res = document.createElement("TD");
                    var img = document.createElement("IMG");
                    img.setAttribute("src","images/restore.svg")
                    td_name.appendChild(document.createTextNode(extract.fullname));
                    td_pnum.appendChild(document.createTextNode(extract.pnum));
                    td_snum.appendChild(document.createTextNode(extract.snum));
                    td_res.appendChild(img);
                    tr.appendChild(td_name);
                    tr.appendChild(td_pnum);
                    tr.appendChild(td_snum);
                    tr.appendChild(td_res);
                    table.appendChild(tr);
                    img.style.cursor="pointer";
                    td_res.onclick=function(){
                        var this_td = td_res.parentElement;
                        var this_tr = this_td.parentElement;
                        var td_all = this_tr.getElementsByTagName("TD");
                        var restore_obj = {fullname:td_all[0].innerHTML, pnum: td_all[1].innerHTML,snum:td_all[2].innerHTML};
                        var readyForRestore = JSON.stringify(restore_obj);
                        localStorage.setItem(td_all[0].innerHTML+"contact",readyForRestore);
                        document.cookie = td_all[0].innerHTML+"contact=; max-age:0";
                        this_tr.remove();
                        window.location = location.href;
                        
                    }
                }
            }
        }
    }
    else{
        notice.innerHTML = "NO DELETED CONTACTS";
    }
}

//restore contacts