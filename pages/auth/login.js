import {useState} from "react";
import API from '../../lib/api';
import Router from "next/router";
import {Button, Container, Input, Spacer, Text} from "@nextui-org/react";

const Login = () => {
  const [credentials, setCredentials] = useState({identifier: "", password: ""});
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.post(`auth/local`, credentials).then((res) => {
      Router.push('/');
    }).catch((err) => {
      // setError(err.response.data.error.message);
    })
  };

  return (
    <Container>
      <Text h2>Insérer un nom</Text>
      <form
        onSubmit={handleSubmit}
      >
        <Spacer y={3.0}/>
        <Input
          type="text"
          name="identifier"
          placeholder="Adresse email"
          value={credentials.identifier}
          onChange={handleChange}
        />
        <Spacer y={1.5}/>
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
        />
        <Spacer y={2}/>
        <Button type="submit">
          Se connecter
        </Button>
        {error && (
          <p>{error}</p>
        )}
        <Spacer y={1}/>
        <Button
          type="button"
          onClick={() => {
            Router.push('/auth/register');
          }}
        >
          Pas encore inscrit ?
        </Button>
      </form>
    </Container>
  )
}

export default Login;
