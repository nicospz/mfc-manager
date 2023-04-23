import { useOwnedFiguresQuery } from "@graphql-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Figure from "@components/Figure";

const OwnedFigures = () => {
  const { loading, data } = useOwnedFiguresQuery({ ssr: true });
  const figures = data?.figures ?? [];
  const figuresByScore =
    [...figures].sort((a, b) => (b?.score ?? 0) - (a?.score ?? 0)) ?? [];
  if (loading) {
    //  Add loading state div containing vertically horizontally centered spinner
    return (
      <div className="flex items-center justify-center w-full h-full">
        <FontAwesomeIcon icon={faSpinner} size="2x" spin />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-bold text-slate-100">
        {figuresByScore.length} figures
      </h2>
      <div className="grid gap-2 md:grid-cols-2">
        {figuresByScore?.map(
          (figure) =>
            figure && <Figure key={figure.id} {...figure} className="w-full" />
        )}
      </div>
    </div>
  );
};

export default OwnedFigures;
