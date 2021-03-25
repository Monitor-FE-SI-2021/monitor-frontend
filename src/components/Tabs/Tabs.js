import { useState } from "react";
import "./Tabs.css";
import { connect } from "react-redux";
import request, { wsEndpoint } from "../../service";


function Tabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [url, setUrl] = useState("slkadhjaksl");

    const handleClick = async () => {

        try {

            var odgovor = await request(wsEndpoint + '/screenshot',
                "post",
                { name: 'DESKTOP-SCC', location: 'Sarajevo - SCC' });

            setUrl(odgovor.data.message);

        } catch (err) {

        }
    }

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          Screenshot
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          File Manager
        </button>
      </div>
      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div>
                <p className="paragraph1">Quick example</p>
                <div>
                    <div className="screenshot">
                        <p>Screenshot</p>
                        <img alt="Asked image will appear here."
                             className='screenshot-img'
                             src={`data:image/jpeg;base64,${url}`}/>
                    </div>
                </div>
            </div>

            <button type="button" onClick={handleClick}>
                Get Screenshot
            </button>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <h2>File manager</h2>
          <p>File</p>
      
        </div>
      </div>
    </div>
  );
}

export default Tabs;
