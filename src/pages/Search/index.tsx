import * as React from "react";
import { useSearchParams } from "react-router-dom";
import md5 from "md5";
import axios from "axios";
import { MarvelCard } from "../../components/MovieCard";

const baseUrl = "http://gateway.marvel.com/v1/public/characters?";
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

export const Search = () => {
  const [q] = useSearchParams();
  const [topMarvel, setPersonagem] = React.useState<Marvel[]>([]);
  const query = q.get("q");
  React.useEffect(() => {
    axios
      .get(
        `${baseUrl}name=${query}&ts=${time}&apikey=${publicKey}&hash=${hash}`
      )
      .then((response) => {
        setPersonagem(response.data.data.results);
        console.log(topMarvel);
      })
      .catch((erro) => console.log(erro));
    console.log(String("ai"));
  }, [q]);

  return (
    <div>
      <h2>{query}</h2>
      {topMarvel.length === 0 && <p>CARREGANDO...</p>}
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
