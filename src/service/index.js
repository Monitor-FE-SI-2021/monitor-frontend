import axios from "axios";

const request = async (
  typeOfReq,
  url,
  bodyReq = {}
) => {

  let response = null;
  let config = {
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("authorization")
    }
  };

  if (typeOfReq === "GET") {
    try {
      response = await axios
        .get(url, config)
        .catch(e => {
          console.log("Request error: ", e)
          if (e.message.includes('401')) {
            removeAllData();
          } else if(e.message.includes('403')) {
            removeAllData();
          }
        });
      return response;
    } catch (error) {
      console.log("GET Error: ", error);
    }
  }

  if (typeOfReq === "POST") {
    try {
      response = await axios
        .post(url, bodyReq, config)
        .catch(e => {
          console.log("Request error: ", e)
          if (e.message.includes('401')) {
            removeAllData();
          }
        });
      return response;
    } catch (error) {
      console.log("POST Error: ", error);
    }
  }

  if (typeOfReq === "PUT") {
    try {
      response = await axios
        .put(url, bodyReq, config)
        .catch(e => {
          console.log("Request error: ", e)
          if (e.message.includes('401')) {
            removeAllData();
          }
        });
      return response;
    } catch (error) {
      console.log("PUT Error: ", error);
    }
  }

  if (typeOfReq === "DELETE") {
    try {
      if (bodyReq) {
        response = await axios
          .delete(url, {
            headers: {
              "Content-Type": "application/json",
              Authorization: window.localStorage.getItem("authorization")
            },
            data: bodyReq
          })
          .catch(e => {
            console.log("Request error: ", e)
            if (e.message.includes('401')) {
              removeAllData();
            }
          });
        return response;
      }
      else {
          response = await axios
            .delete(url, config)
            .catch(e => {
              console.log("Request error: ", e)
              if (e.message.includes('401')) {
                removeAllData();
              }
            });
          return response;
      }
    } catch (error) {
      console.log("DELETE Error: ", error);
    }
  }

  if (typeOfReq === "PATCH") {
    try {
      response = await axios
        .patch(url, bodyReq, config)
        .catch(e => {
          console.log("Request error: ", e)
          if (e.message.includes('401')) {
            removeAllData();
          }
        });
      return response;
    } catch (error) {
      console.log("PATCH Error: ", error);
    }
  }
};

const removeAllData = () => {
  window.localStorage.clear();
}

export default request;
