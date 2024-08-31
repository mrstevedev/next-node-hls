"use client";
import { subscribe } from "@/services/Api";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import styles from "@/styles/AudioPlayer.module.scss";
import { STATUS } from "@/constants/index";
import { toast } from "react-toastify";

export default function SubscribeForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleSignUp = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      setLoading(true);
      await subscribe(email, STATUS.STATUS_CONFIRMED);
      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="subscribe mb-6">
      <h2 style={{ fontSize: "0.8rem", textTransform: "uppercase" }}>
        Subscribe to our newsletter
      </h2>

      {!submitted ? (
        <Form style={{ position: "relative" }} onSubmit={handleSignUp}>
          <Form.Control
            type="email"
            className={styles.BBP_AudioPlayer__Input}
            required
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button
            type="submit"
            className={styles.BBP_AudioPlayer__Button}
            value="Sign Up"
          >
            {loading ? "Loading.." : "Sign Up"}
          </Button>
        </Form>
      ) : (
        <h3
          style={{
            fontSize: "1rem",
            textTransform: "initial",
            margin: "1rem 0",
            padding: "0.7rem 0",
            fontWeight: 100,
            color: "rgb(156 210 238)",
          }}
        >
          You are now subscribed. Be on the lookout for news on <br />
          <strong>BBP Music Library </strong>
        </h3>
      )}
    </div>
  );
}
