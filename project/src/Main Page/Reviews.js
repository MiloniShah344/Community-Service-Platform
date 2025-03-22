import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar } from "react-icons/fa";
import "./Reviews.css";

const reviews = [
  { id: 1, name: "John Doe", photo: "https://randomuser.me/api/portraits/men/1.jpg", rating: 5, review: "Volunteering in a food drive through this platform connected me with so many amazing people who genuinely care about the community." },
  { id: 2, name: "Jane Smith", photo: "https://randomuser.me/api/portraits/women/2.jpg", rating: 4, review: "Donating here felt different—knowing exactly where my contribution was going made it more meaningful." },
  { id: 3, name: "David Johnson", photo: "https://randomuser.me/api/portraits/men/3.jpg", rating: 5, review: "I had the chance to mentor underprivileged kids, and seeing their progress has been the most fulfilling part of my journey." },
  { id: 4, name: "Sarah Williams", photo: "https://randomuser.me/api/portraits/women/4.jpg", rating: 5, review: "This platform made it incredibly easy to find volunteering opportunities that fit my schedule and skills." },
  { id: 5, name: "Michael Brown", photo: "https://randomuser.me/api/portraits/men/5.jpg", rating: 4, review: "As an NGO coordinator, I’ve met passionate volunteers and generous donors who truly make a difference." },
  { id: 6, name: "Emily Davis", photo: "https://randomuser.me/api/portraits/women/6.jpg", rating: 5, review: "From fundraising to hands-on volunteering, every experience here has been rewarding and well-organized." },
  { id: 7, name: "Chris Wilson", photo: "https://randomuser.me/api/portraits/men/7.jpg", rating: 3, review: "I started with a small donation, but seeing the real impact encouraged me to get more involved!" },
  { id: 8, name: "Olivia Martinez", photo: "https://randomuser.me/api/portraits/women/8.jpg", rating: 5, review: "Volunteering at the shelter through this platform gave me a new perspective on the power of community support." },
  { id: 9, name: "James Anderson", photo: "https://randomuser.me/api/portraits/men/9.jpg", rating: 4, review: "Connecting with other volunteers made my experience even more enriching—I now have lifelong friends who share my passion for change." },
  { id: 10, name: "Sophia Garcia", photo: "https://randomuser.me/api/portraits/women/10.jpg", rating: 5, review: "We were struggling to get volunteers for our NGO, but this platform brought us committed individuals who truly want to help." }
];

const Reviews = () => {
  return (
    <div className="reviews-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 }
        }}
        className="reviews-swiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="review-slide">
            <div className="review-content review-square">
              <img src={review.photo} alt={review.name} className="review-photo" />
              
                <h3>{review.name}</h3>
                <div className="review-info">
                <div className="review-stars">
                  {[...Array(review.rating)].map((_, index) => (
                    <FaStar key={index} className="star" />
                  ))}
                </div>
                <p className="review-text">{review.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
