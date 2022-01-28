import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import "./Subscribe.css";

function Subscribe({ userTo, userFrom }) {
  const { user, userData } = useAuth();
  const [subscriberNum, setSubscriberNum] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscribeNumberVariables = {
      userTo: userTo,
      userFrom: userFrom,
    };

    axios
      .post("/api/subscribe/subscribeNumber", subscribeNumberVariables)
      .then((res) => {
        if (res.data.success) {
          setSubscriberNum(res.data.subscribeNumber);
        } else {
          alert("Failed to subscriber");
        }
      });

    axios
      .post("/api/subscribe/subscribed", subscribeNumberVariables)
      .then((res) => {
        if (res.data.success) {
          setSubscribed(res.data.subscribed);
        } else {
          alert("Failed to get subscriber information");
        }
      });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };

    if (subscribed) {
      axios
        .post("/api/subscribe/unsubscribe", subscribeVariable)
        .then((res) => {
          if (res.data.success) {
            setSubscriberNum(subscriberNum - 1);
            setSubscribed(!subscribed);
          } else {
            alert("Failed to unsubscribe");
          }
        });
    } else {
      axios.post("/api/subscribe/subscribe", subscribeVariable).then((res) => {
        if (res.data.success) {
          setSubscriberNum(subscriberNum + 1);
          setSubscribed(!subscribed);
        } else {
          alert("Failed to subscribe");
        }
      });
    }
  };

  if (userData && userData.isAuth) {
    return (
      <div>
        <button
          className={`subscribe-btn ${
            subscribed ? "subscribed" : "not-subscribed"
          }`}
          onClick={handleSubscribe}
        >
          {subscriberNum} {subscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>
    );
  } else {
    return <button className="subscribe-btn">Login to Subscribe</button>;
  }
}

export default Subscribe;
