import Link from "next/link";
import style from "./card.module.css";

const Card = ({ id, name, brandName, description, price, color, image }) => {
  return (
    <div className={style.container}>
      <Link
        href={`/detail/${id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className={style.innerCont}>
          <div className={style.containerImg}>
            <img src={image} alt={name}></img>
          </div>
          <div className={style.details}>
            <span className={style.brandtitle}>{brandName}</span>
            <h4 className={style.name}>{name}</h4>
          </div>
          <div className={style.price}>{price}</div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
