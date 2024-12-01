import React, { useCallback, useEffect, useState } from "react";
import "./Form.css";
import { useTelegram } from "../../hooks/useTelegram";

export const Form = () => {
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [subjetc, setSubject] = useState("physical");
  const { tg } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      country,
      street,
      subject,
    };
    tg.sendData(JSON.stringify(data));
  }, []);

  useEffect(() => {
    tg.WebApp.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.WebApp.offEvent("mainButtonClicked", onSendData);
    };
  }, []);

  useEffect(() => {
    tg.MainButton.setParams({
      text: "Send data",
    });
  }, []);

  useEffect(() => {
    if (!street || !country) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }, [country, street]);

  const onChangeCountry = (e) => {
    setCountry(e.target.value);
  };
  const onChangeStreet = (e) => {
    setStreet(e.target.value);
  };
  const onChangeSubject = (e) => {
    setSubject(e.target.value);
  };

  return (
    <div className={"form"}>
      <h3>Type your data</h3>
      <input
        className={"input"}
        type="text"
        placeholder={"Country"}
        value={country}
        onChange={onChangeCountry}
      />
      <input
        className={"input"}
        type="text"
        placeholder={"Street"}
        value={street}
        onChange={onChangeStreet}
      />

      <select value={subjetc} onChange={onChangeSubject} className={"select"}>
        <option value={"legal"}>Legal entity</option>
        <option value={"physical"}>Physical entity</option>
      </select>
    </div>
  );
};
