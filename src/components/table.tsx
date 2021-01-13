import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import axios from "axios";

type Props = {
  content: ICities[];
  title: string;
  removeField: (city: ICities) => void;
};

export const Table: React.FC<Props> = ({ content, title, removeField }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  const dispatch: Dispatch<any> = useDispatch();

  const deleteField = (field: ICities) => {
    let id = field.id;
    axios
      .delete(`http://localhost:8080/cities/${id}`)
      .then(() => {
        deleteFieldRedux(field);
      })
      .catch((err) => {
        const error =
          err.response.status === 404
            ? "Resource not found"
            : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  };

  const deleteFieldRedux = React.useCallback(
    (city: ICities) => dispatch(removeField(city)),
    [dispatch, removeField]
  );

  return (
    <div>
      {error && <p className="error">{error}</p>}
      <h1>{title}</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>{`Ciudad`}</th>
            <th>{`País`}</th>
            <th>{`Población`}</th>
            <th>{`Latitud`}</th>
            <th>{`Longitud`}</th>
            <th>{``}</th>
          </tr>
          {content.map((field) => {
            return (
              <tr key={field.id}>
                <td>{field.name}</td>
                <td>{field.country}</td>
                <td>{field.population}</td>
                <td>{field.latitude}</td>
                <td>{field.longitude}</td>
                <td>
                  <button onClick={() => deleteField(field)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
