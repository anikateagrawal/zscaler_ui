var alert_error=`<div class="alert alert-danger alert-dismissible fade show m-0"  role="alert">
    <strong  id="flash">Alert</strong> 
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
  
        document.getElementById("username").value=localStorage.getItem("username");

        document.getElementById("navbarScroll").addEventListener("submit",submit)

        function e(e, t) {
        for (var n = t.substring(t.length - 6), o = (parseInt(n) >> 1).toString(), a = ""; o.length < 6; )
            o = "0" + o;
        for (var r = 0; r < n.length; r++)
            a += e.charAt(parseInt(n.charAt(r)));
        for (var i = 0; i < o.length; i++)
            a += e.charAt(parseInt(o.charAt(i)) + 2);
        return a
        
    }

        function submit(event){
            event.preventDefault()
            var username=document.getElementById('username').value
            var password=document.getElementById('password').value
            var timestamp=(new Date).getTime().toString()
            
            var dummy='Dummy_key'

            var remember=document.getElementById("remember");
            
            if(remember.checked)localStorage.setItem("username",username);
            else localStorage.clear();

            var payload={"apiKey":e(dummy,timestamp),username,password,timestamp};
            
            var cloudname=document.getElementById('cloudname').value;

            var url='https://admin.'+cloudname+'.net/zsapi/v1/authenticatedSession?includeDisplayPreferences=true'
            
            var url2="https://admin."+cloudname+".net/#dashboard/1"
            console.log(payload);

            var proxy="https://cors-proxy-t6l0.onrender.com"

            fetch(proxy,{
                method:"post",body:JSON.stringify(payload),
                headers: { "Content-Type": "application/json" ,
                            "Target-URL":url
            }}).
                then((res)=>{console.log(res,res.status);
                    return res.json()}).
                then((data)=>{console.log(data);
                    console.log(data);
                    if(data.obfuscateApiKey){
                        alert("Login Successful");
                        window.location.replace(url2);
                    }
                    else{
                        console.log("alert")
                    document.getElementById('alert').innerHTML=alert_error;
                    document.getElementById("flash").textContent=data.message;
                    }
                }).
                catch((e)=>console.log(e));

            document.getElementById("navbarScroll").reset();
            document.getElementById("username").value=localStorage.getItem("username");

        }
