import Router from "next/router";

async function logout(credentials) {
  return fetch('http://localhost:8080/logout', {
    method: 'POST'
  })
  .then(data => data.json())
}

export default function Page () {


	const handleSubmit = async e => {
    e.preventDefault();
    await logout();
    // setToken(token);
    // NextResponse.redirect("/api/auth/signin");
    Router.push('/stytch-auth/login')
  } 
	return (<div><h2>Dashboard</h2>
		<button onClick={handleSubmit}>logout</button></div>)
}