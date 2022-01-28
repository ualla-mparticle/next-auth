import {useRouter} from "next/router";
import Router from "next/router";

async function authenticateUser(credentials) {
 return fetch('http://localhost:8080/authenticate', {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(credentials)
 })
   .then(data => data.json())
}

export default function Page () {
	

	const { query } = useRouter();
  const token = query.token;

  if (token != null) {
     authenticateUser({
      'token': token    }).then(resp => {
        console.log(resp);
        console.log(resp.resp);
        if(resp.resp && resp.resp.status_code === 200){
          console.log('login succesfull');
          Router.push('/stytch-auth/dashboard')
        } else {
        	Router.push('/stytch-auth/login')
        }
    })
    .catch(err => {
        console.log(err);
    });
  }

	return <div>Click email magic link to sign in</div>
}