import React, { useState } from "react";
import RegisterService from "../../../services/registerService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

import "./register.css";
function Register({ wallet }) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [documetType, setDocumentType] = useState("");
  const [documetNumber, setDocumentNumber] = useState("");
  const [cep, setCep] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const registerService = new RegisterService(wallet);
  async function handleClick(e) {
    e.preventDefault();
    switch (type) {
      case "producer":
        await registerService.addProducer(
          name,
          documetNumber,
          documetType,
          cep,
          state,
          city,
          country
        );
        break;
      case "activist":
        await registerService.addActivist(
          name,
          documetNumber,
          documetType,
          cep,
          state,
          city,
          country
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="container">
      <form>
        <div className="inputGroup">
          <div className="inputControl">
            <label>Select the type of user you want to register.</label>
            <select
              defaultValue={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option selected value=""></option>
              <option value="producer">PRODUCER</option>
              <option value="activist">ACTIVIST</option>
            </select>
          </div>
        </div>
        <div className="inputGroup">
          <div className="inputControl">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ width: '445px'}}
            />
          </div>
        </div>
        <div className="inputGroup">
          <div className="inputControl">
            <label htmlFor="documetType">Document Type</label>
            <input
              type="text"
              name="documetType"
              value={documetType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            />
          </div>

          <div className="inputControl">
            <label htmlFor="documetNumber">Document Number</label>
            <input
              type="number"
              value={documetNumber}
              name="documetNumber"
              onChange={(e) => setDocumentNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inputGroup">
          <div className="inputControl">
            <label htmlFor="cep">CEP</label>
            <input
              name="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inputGroup">
          <div className="inputControl">
            <label htmlFor="state">State</label>
            <input
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="inputControl">
            <label htmlFor="city">City</label>
            <input
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="inputControl">
            <label>Country</label>
            <input
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="buttonRegister" type="submit" onClick={handleClick}>
          Register
        </button>
      </form>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Register;
