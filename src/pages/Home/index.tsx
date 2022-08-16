import * as React from "react";
import md5 from "md5";
import { MarvelCard } from "../../components/MovieCard";
import { valueToPercent } from "@mui/base";

export interface IAppProps {}

const baseUrl = "http://gateway.marvel.com/v1/public/characters?limit=10&";
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

export const Home: React.FC = () => {
  //crio um estado
  const [topMarvel, setTopMarvel] = React.useState<Marvel[]>([]);

  //eu crio uma funcao que é uma promessa
  const getTopRateMovies: any = async (url: string) => {
    const resposta = await fetch(url); //api
    const data = await resposta.json(); //converto a string para um objeto
    setTopMarvel(data.data.results);
  };

  React.useEffect(() => {
    const url = `${baseUrl}&ts=${time}&apikey=${publicKey}&hash=${hash}`;
    getTopRateMovies(url);
    console.log(url);
  }, []);

  return (
    <div>
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
