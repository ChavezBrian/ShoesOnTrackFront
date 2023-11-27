import { useEffect } from "react";
import Card from "../card/card";
import style from "../cardsContainer/cards.module.css"


const Cards = ({ shoes }) => {
  return (
    <div className={style.container}>
      {shoes?.map((shoe) => {
        return (
          <Card
            key={shoe.id}
            id={shoe.id}
            name={shoe.name}
            brandName={shoe.brandName}
            price={`$${shoe.price}`}
            image={shoe.image}
            stock={shoe.stock}
            color={shoe.color}
            status={shoe.status}
          />
        );
      })}
    </div>
  );
};

export default Cards;

