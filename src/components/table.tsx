import * as React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";

type Props = {
  content: ICities[];
  title: string;
  removeField: (city: ICities) => void;
};

export const Table: React.FC<Props> = ({ content, title, removeField }) => {
  const dispatch: Dispatch<any> = useDispatch();

  const deleteField = React.useCallback(
    (city: ICities) => dispatch(removeField(city)),
    [dispatch, removeField]
  );

  return (
    <div>
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
