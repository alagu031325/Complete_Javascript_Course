import { TIMEOUT_SEC } from "./config.js";

const timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
};

export const AJAX = async function(url, uploadData = undefined){
  try{
    const fetchPro = uploadData ? fetch(url,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    }) : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    data = await res.json();
    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    //returned in Promise to the calling fn 
    return data; 
  } catch(err){
    throw err;
  }
}
/* 
export const getJSON = async function(url){
    try{
    //const res = await fetch(url); -> GET request
    //setting a timeout after which the request fails to deal with slow internet
    //Whichever first happens is returned either timeout or fetched data
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]); //as soon as promise either rejects or fullfilled then that promise is returned
    
    data = await res.json();
    if(!res.ok) throw new Error(`${data.message} (${res.status})`);
    //returned in Promise to the calling fn 
    return data; 
    }
    catch(err){
        //Even if error occurs the Promise will be rejcted
        throw err;
    }
}

export const sendJSON = async function(url, uploadData){
  try{
  //Needs to be a post request - with method, headers and body specified within Object
  const fetchPro = await fetch(url,{
    method: 'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(uploadData),
  }); 

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  
  data = await res.json();
  if(!res.ok) throw new Error(`${data.message} (${res.status})`);
   
  return data; 
  }
  catch(err){
      //Even if error occurs the Promise will be rejcted
      throw err;
  }
} */