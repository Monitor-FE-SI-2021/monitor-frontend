import { connect } from "react-redux";
import { useState } from "react";
import './RemoteControl.css' 


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
            if(x.status === 200)
            {
                console.log("all good");
            }
            //console.log(x.accessToken);

            const requestOptions2 = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 
                "Authorization" : "Bearer "+ x.accessToken, 
                Accept:"application/json"
                },
                body: JSON.stringify({ name: 'DESKTOP-SCC', location: 'Sarajevo - SCC'}),
            };
    
            var odgovor = await 
            fetch('https://si-grupa5.herokuapp.com/',
            requestOptions2,
            );
            var slika = await odgovor.json();
            console.log(slika.message);
            
            x.accessToken = slika.token;

            console.log(x.accessToken);

            setUrl(slika.message);
        }
        catch(err) {

        }
    }

    
    

    return (
        <div className='page dashboard'>
        <h1>IWM Remote Access/Control</h1>
          
        <div>
        <p class="paragraph1">Quick example</p>
            <div>
                <div class="screenshot">
                <p>Screenshot</p>
                    <img alt="Asked image will appear here."  src={`data:image/jpeg;base64,${url}`} />
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