import { connect } from "react-redux";
import { useState } from "react";




const RemoteControl =  () => {

    const [url, setUrl] = useState("slkadhjaksl"); 
   
    const handleClick = async ()  =>  {
        
        
       const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'whoso@whoso.com', password:  'sifra123'})
        };

        try {
            var response = await fetch('http://167.99.244.168:3333/login', requestOptions);
            
            var x = await response.json();
            if(x.status == 200)
            {
                console.log("all good");
            }
            //console.log(x.accessToken);

            const requestOptions2 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: 'whoso@whoso.com', location: 'sifra123'}),
                headers: {"Authorization" : "Bearer "+ x.accessToken}
            };
    
            var odgovor = await
            fetch('http://109.237.36.76:25565/screenshot',
            requestOptions2,
            );
            var slika = await odgovor.text();
            console.log(slika);

            setUrl(slika);
        }
        catch(err) {

        }

        
        


        /*const returnValue = fetch('http://167.99.244.168:3333/jwt/verify', {
        headers: {"Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ3aG9zb0B3aG9zby5jb20iLCJyb2xlSWQiOjEsImdyb3VwSWQiOjIsImlhdCI6MTYxNjI2NzExOCwiZXhwIjoxNjE2MjY4OTE4fQ.XdPonVhLvRTJ2p9stDS35RjSKWcGw-x3Hhs5f3dxwlg"}})
        .then(res => {  
            setUrl(res)
            console.log("ispod je result");
           console.log(res);
        });*/
    }

    
    

    return (
        <div className='page dashboard'>
        <h1>IWM Remote Access/Control</h1>
        
        <div>
            <div>
            
            </div>
            <div>
                <div>
                    <img src={`data:image/jpeg;base64,${url}`} />
                </div>
            </div>
        </div>

        <button type="button" onClick = {handleClick}>
            Get Screenshot
        </button>    

        </div>
    );
}

export default connect(state => ({}), {})(RemoteControl);