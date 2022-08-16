import { Link } from "react-router-dom";

interface Marvel {
  id: string;
  name: string;
  description: string;
  thumbnail: {
    extension: string;
    path: string;
  };
}

type Props = {
  character: Marvel;
  showLink: boolean;
};

export const MarvelCard = ({ character, showLink = true }: Props) => {
  return (
    <>
      <h1>{character.name}</h1>
      <h2>{character.description}</h2>
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt='teste'
      />
      {showLink && <Link to={`/character/${character.id}`}>Detalhes</Link>}
    </>
  );
};
