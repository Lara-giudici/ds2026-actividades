type Props = {
  titulo: string;
  autor: string;
  imagen: string;
};

function BookCard(props: Props) {

  return (

    <div
      className="card m-3"
      style={{ width: "18rem" }}
    >

      <img
        src={props.imagen}
        className="card-img-top"
        alt={props.titulo}
      />

      <div className="card-body">

        <h5 className="card-title">
          {props.titulo}
        </h5>

        <p className="card-text">
          {props.autor}
        </p>

        <button className="btn btn-primary">
          Ver más
        </button>

      </div>

    </div>
  );
}

export default BookCard;