import React, { Component } from "react";
import "./App.css";



const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drugName: null,
      weight: null,
      posology: null,
      type: null,
      formErrors: {
        drugName: "",
        weight: "",
        posology: "",
        type: ""
      }
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        Drug Name: ${this.state.drugName}
        Weight: ${this.state.weight}
        Posology: ${this.state.posology}
        Type: ${this.state.type}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };

    switch (name) {
      case "drugName":
        formErrors.drugName =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "weight":
        formErrors.weight =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      //case "email":
        //formErrors.email = emailRegex.test(value)
         // ? ""
          //: "invalid email address";
        break;
      case "password":
        formErrors.password =
          value.length < 6 ? "minimum 6 characaters required" : "";
        break;
      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  };

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Validacion</h1>
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="drugName">
              <label htmlFor="drugName">Medicamento</label>
              <input
                className={formErrors.drugName.length > 0 ? "error" : null}
                placeholder=""
                type="text"
                name="drugName"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.drugName.length > 0 && (
                <span className="errorMessage">{formErrors.drugName}</span>
              )}
            </div>
            <div className="weight">
              <label htmlFor="weight">Peso(kg)</label>
              <input
                className={formErrors.weight.length > 0 ? "error" : null}
                placeholder=""
                type="text"
                name="weight"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.weight.length > 0 && (
                <span className="errorMessage">{formErrors.weight}</span>
              )}
            </div>
            <div className="posology">
              <label htmlFor="posology">Posologia(mg/kg/dia)</label>
              <input
                className={formErrors.posology.length > 0 ? "error" : null}
                placeholder=""
                type="text"
                name="posology"
                noValidate
                onChange={this.handleChange}
              />
              {formErrors.posology.length > 0 && (
                <span className="errorMessage">{formErrors.posology}</span>
              )}
            </div>
            <div className="type">
              <label htmlFor="type">Presentacion</label>
           <select value={this.state.type} onChange= {this.handleChange}>
             <option value="1"> </option>
             <option value="2"> Inyectables</option>
             <option value="3"> Gotas</option>
             <option value="4"> Supositorio</option>
             <option value="5"> Pildoras</option>
           </select>
            </div>
            <div className="createAccount">
              <button type="submit">Verificar</button>
              <small></small>
            </div>
          </form>
        </div>
      </div>
    );
    
  }
}

export default App;
