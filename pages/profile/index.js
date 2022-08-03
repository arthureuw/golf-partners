import API from "../../lib/api";
import Router from "next/router";
import {useEffect, useState} from "react";
import {Container, Input, Spacer, Text} from "@nextui-org/react";

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [clubs, setClubs] = useState([]);

  const handleSubmit = (event) => {
    console.log(event);
  };

  useEffect(() => {
    API.get(`http://localhost:1337/api/golf-clubs`).then(({data}) => {
      setClubs(data.data);
    })
    API.get(`http://localhost:1337/api/users/me`).then((res) => {
      setUser(res);
      console.log(res);
    }).catch((err) => {
      setError(err.response.data.error.message);
    })
  }, [])

  return (
   <Container>
      <Text h1> Mon profile </Text>
      <form
        onSubmit={handleSubmit}
      >
        <Spacer y={1.5} />
        <Input name="email" type="text" placeholder="email" value={user.attributes?.email} aria-label="email"/>
        <Spacer y={1.5} />
        <Input name="email" type="text" placeholder="email" aria-label="email"/>
        <Spacer y={1.5} />
        <Input name="email" type="text" placeholder="email" aria-label="email"/>
        <Spacer y={1.5} />
      </form>
     {error && (
       <Text color="error">{error}</Text>
     )}
    </Container>
  )
}

export default Profile;
