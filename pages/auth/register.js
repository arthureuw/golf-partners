import {useEffect, useState} from "react";
import API from '../../lib/api';
import Router from "next/router";
import {Button, Container, Input, Progress, Spacer, Text} from '@nextui-org/react';

const Register = () => {
  const [credentials, setCredentials] = useState({username: "", email: "", password: "", golf_club: null});
  const [clubs, setClubs] = useState([]);
  const [progress, setProgress] = useState(33);
  const [selectedClub, setSelectedClub] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    console.log(event.target);
    setCredentials({...credentials, [event.target.name]: event.target.value});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.post(`auth/local/register`, credentials).then((res) => {
      Router.push('/');
    }).catch((err) => {
      setError(err.response.data.error.message);
    })
  };

  useEffect(() => {
    API.get(`golf-clubs`).then(({data}) => {
      setClubs(data.data);
    })
  }, [])

  useEffect(() => {
    console.log(credentials)
    if (credentials.golf_club) {
      setSelectedClub(clubs.find(club => club.id === credentials.golf_club));
    }

  }, [clubs, credentials])

  return (
    <>
      <Progress squared size="xs" color="primary" value={progress}/>
      <Container>
        <Text h2>Ici aussi</Text>
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <Spacer y={3.0} />
          <Input
            type="text"
            name="username"
            placeholder="Prénom"
            size="lg"
            value={credentials.identifier}
            onChange={handleChange}
          />
          <Spacer y={1.5} />
          <label htmlFor="pet-select">Selectionner votre club :</label>
          <select name="golf_club" id="gol_club-select" onChange={(event) => {
            setCredentials({...credentials, [event.target.name]: +event.target.value});
          }}>
            <option value="" selected disabled>Clubs de golf</option>
            {clubs.length > 0 && clubs.map((club) => {
              return <option value={club.id} key={club.id}>{club.attributes.name}</option>
            })}
          </select>
          {selectedClub && (
            <p>{selectedClub.attributes.name}, <i>{selectedClub.attributes.address}</i></p>
          )}
          <Spacer y={1.5} />
          <Input
            type="text"
            name="email"
            placeholder="Adresse e-mail"
            size="lg"
            value={credentials.email}
            onChange={handleChange}
          />
          <Spacer y={1.5} />
          <Input
            type="password"
            name="password"
            placeholder="Mot de passe"
            size="lg"
            value={credentials.password}
            onChange={handleChange}
          />
          <Spacer y={2} />
          <Button type="submit">
            Je crée mon compte !
          </Button>
          {error && (
            <p>{error}</p>
          )}
        </form>
      </Container>
    </>
  )
}

export default Register;
