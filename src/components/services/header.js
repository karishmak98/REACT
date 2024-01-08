// export default function authHeader() {
//     const user = JSON.parse(sessionStorage.getItem("token"));
  
//     if (user) {
//       // For Spring Boot back-end
//       // return { Authorization: "Bearer " + user.accessToken };
  
//       // for Node.js Express back-end
//       return {
//          'Content-Type': 'application/json',
//           Authorization:  user,
//           Url : window.location.href
//        };
//     } else {
//       return {};
//     }
//   }
  

export default function authHeader(){
    const user=sessionStorage.getItem('token')

    if (user){
        return{
            'Content-Type':'application/json',
            Authorization:user
        }
    }else{
        return {}
    }
}