import {useState} from "react";
import Router from "next/router";
import {Button, Container, Input, Spacer, Text} from "@nextui-org/react";
import {signIn} from "next-auth/react";

const Login = () => {
  const [credentials, setCredentials] = useState({identifier: "", password: ""});
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: credentials.identifier,
      password: credentials.password,
    });
    if (result.ok) {
      Router.push('/dashboard');
      return;
    }
    alert('Credential is not valid');
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
          aria-label="Email"
        />
        <Spacer y={1.5}/>
        <Input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          aria-label="Password"
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
          onPress={() => {
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
