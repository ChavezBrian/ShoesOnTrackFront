import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import Swal from "sweetalert2";
import { Pagination } from "swiper/modules";
import { Rating } from "react-simple-star-rating";
import { getAllReviews, postReview } from "@/redux/actions";
import NavBar from "../navbar/Navbar";
import axios from "axios";
import style from "./style.module.css";

const Reviews = () => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");
  const [review, setReview] = useState({});
  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews);
  const [tengoReview, setTengoReview] = useState(false);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const loadReviews = async () => {
    await dispatch(getAllReviews());
  };

  // const check = ()=>{
  //   console.log(reviews)
  //   reviews?.map((rev)=>{
  //       console.log(rev.User?.name)
  //       if(rev.User?.id === user.id){
  //         setTengoReview(true)
  //       }
  //     })
  //   }

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar si el usuario está logeado
    if (!user || !user.id) {
      // Mostrar un mensaje de error o redirigir a la página de inicio de sesión
      Swal.fire(
        "Error sending message",
        "You need to be logged in to submit a review",
        "error"
      );
      return;
    }

    try {
      const { data } = await axios.post("/reviews", {
        userId: user.id,
        contenido: message,
        puntuacion: rating,
      });
      if (!data.error) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
        loadReviews();
        setTengoReview(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(reviews);
    reviews.data?.map((rev) => {
      if (rev.User?.id === user.id) {
        setTengoReview(true);
      }
    });
    console.log(reviews);
  }, [reviews]);

  const handleDelete = async () => {
    console.log("borrar review");
    try {
      const { data } = await axios.post("/reviews/delete", {
        userId: user.id,
      });
      if (!data.error) {
        Swal.fire({
          title: data.message,
          icon: "success",
        });
        loadReviews();
        setTengoReview(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <NavBar user={user} />
      <div className={style.all}>
        <div className={style.reviews}>
          <h2 className={style.rtitle}>Reviews</h2>
          {/* <Swiper
            slidesPerView={3}
            spaceBetween={30}
            modules={[Pagination]}
          > */}
          <div className={style.cont}>
            {reviews.data?.map((review) => (
              <div key={review.id} className={style.rslide}>
                {/* {" "} */}

                <h3>{review.User?.name}</h3>
                <p className={style.limite}>{review.contenido}</p>
                <Rating allowFraction initialValue={review.puntuacion} className={style.estrellas} />
                {review.User.id === user.id ? (
                  <button onClick={handleDelete} className={style.dbutton}>
                    x
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          {/* </Swiper> */}
        </div>
        <div className={style.creacion}>
          {tengoReview ? (
            <div>
              <div>
                <div
                  style={{
                    direction: "ltr",
                    fontFamily: "sans-serif",
                    touchAction: "none",
                    width: "auto",
                    display: "inline",
                  }}
                >
                  {/* <Rating
                  allowFraction
                  initialValue={review.puntuacion}
                  onClick={handleRating}
                  readonly={true}
                /> */}
                </div>
                {/* <textarea value={review.contenido} disabled={true} /> */}
              </div>
            </div>
          ) : (
            <div className={style.ocontainer}>
              <h3 className={style.otitle}>Danos tu opinion</h3>
              <div className={style.orating}>
                <Rating
                  allowFraction
                  initialValue={0.5}
                  onClick={handleRating}
                />
              </div>
              <form onSubmit={handleSubmit}>
                <textarea
                  className={style.otextarea}
                  name=""
                  id=""
                  cols="45"
                  rows="8"
                  onChange={(event) => setMessage(event.target.value)}
                ></textarea>
                <button type="submit" className={style.obutton}>
                  Enviar
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
