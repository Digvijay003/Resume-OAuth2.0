import axios from "axios";


const getData = async (token)=>{
    
    const response=await axios.get('https://api.linkedin.com/v2/me',{
        headers:{
            Authorization:`Bearer ${token}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            'Content-Type': 'application/x-www-form-urlencoded',
            
   
        }
     
    }).then(res=>console.log(res,'Let see Response')).catch(err=>console.error(err,'let see error'))

    // const apiUrl = 'https://api.linkedin.com/v2/me';
    // const authToken = token;
    
    // fetch(apiUrl, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${authToken}`,
    //     'Content-Type': 'x-www-form-urlencoded'
    //     // You can add other headers as needed
    //   },
    //   mode: "no-cors",
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   // Handle the response data here
    //   console.log(data);
    // })
    // .catch(error => {
    //   // Handle any errors that occur during the fetch operation
    //   console.error('Fetch error:', error);
    // });
   return response
}

export default getData