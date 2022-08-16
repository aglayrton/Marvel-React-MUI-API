import axios from "axios";
import * as React from "react";
import { useParams } from "react-router-dom";
import md5 from "md5";
import { MarvelCard } from "../../components/MovieCard";

const baseUrl = "http://gateway.marvel.com/v1/public/characters/";
const publicKey = "410542406bb21a64d9da21f952445f7d";
const privateKey = "dd71195fe81ab21981fc896f84eff89d54159f2b";
const time = Number(new Date());
const hash = md5(time + privateKey + publicKey);

interface Marvel {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

export const Character = () => {
  const { id } = useParams();
  const [topMarvel, setPersonagem] = React.useState<Marvel[]>([]);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}${id}?ts=${time}&apikey=${publicKey}&hash=${hash}`)
      .then((response) => {
        setPersonagem(response.data.data.results);
        console.log(topMarvel);
      })
      .catch((erro) => console.log(erro));
    console.log(String("ai"));
  }, [id]);

  return (
    <div>
      {topMarvel.length === 0 && <p>CARREGANNDO...</p>}
      {topMarvel &&
        topMarvel.map((marvel) => {
          return (
            <div key={marvel.id}>
              <MarvelCard character={marvel} showLink={true} />
            </div>
          );
        })}
    </div>
  );
};
