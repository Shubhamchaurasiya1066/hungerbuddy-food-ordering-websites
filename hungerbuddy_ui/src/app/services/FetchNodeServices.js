import axios from "axios";
import Swal from "sweetalert2";
const serverURL = 'http://localhost:5000'
function generateOTP(){
 var otp=parseInt(Math.random()*899999)+100000
 return otp
}
function getDate() {
    var cd = new Date()
    return (`${cd.getFullYear()}/${cd.getMonth() + 1}/${cd.getDate()}`)
}
function getTime() {
    var cd = new Date()
    return (`${cd.getHours()}:${cd.getMinutes()}:${cd.getSeconds()}`)
}

async function postData(url, body) {
    try {
        const config = {

            headers: {
               "Content-Type": body instanceof FormData ? "multipart/form-data" : "application/json",
               Authorization: "Bearer " + localStorage.getItem("TOKEN")
            }
        };
        var response = await axios.post(`${serverURL}/${url}`, body, config)
        var data = response.data
        return (data)
    }   
    catch (e) {
        // alert(JSON.stringify(e.response))
        if (e.response.status == 401) { Swal.fire('Your session is expired..pls login') }
        else { Swal.fire('Site is not working properly..pls wait for sometime') }

        return ([])
    }
}
async function getData(url) {
    try {
        const config = {

            headers: {
                'Content-Type': 'application/json', // Example: Setting the content type
                'Authorization': localStorage.getItem('Token'), // Example: Adding an authorization token
            }
        };
        var response = await axios.get(`${serverURL}/${url}`, config)
        var data = response.data
        return (data)
    }
    catch (e) {
        // alert(JSON.stringify(e.response))
        if (e.response.status == 401) { Swal.fire('Your session is expired..pls login') }
        else { Swal.fire('Site is not working properly..pls wait for sometime') }

        return ([])
    }
}

export { postData, serverURL, getDate, getTime, getData,generateOTP }