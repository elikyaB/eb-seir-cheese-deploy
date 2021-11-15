import {useState} from "react"
import {Link} from "react-router-dom"

const Index = (props) => {

  // state to hold form data
  const [newForm, setNewForm] = useState({
      name: "",
      countryOfOrigin: "",
      image: ""
  })

  //handleChange function to sync input with state
  const handleChange = (event) => {
      // make a copy of state
      const newState = {...newForm}
      // update the newState
      newState[event.target.name] = event.target.value
      // update the state
      setNewForm(newState)
  }

  // handleSubmit function for when form is submitted
  const handleSubmit = (event) => {
    // prevent the page from refreshing
    event.preventDefault()
    // pass the form data to createCheese function
    props.createCheese(newForm)
    // reset the form to empty
    setNewForm({
      name: "",
      countryOfOrigin: "",
      image: ""
    })
  }

  const form = (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newForm.name}
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.countryOfOrigin}
        name="countryOfOrigin"
        placeholder="Origin"
        onChange={handleChange}
      />
      <input
        type="text"
        value={newForm.image}
        name="image"
        placeholder="Image URL"
        onChange={handleChange}
      />
      <br />
      <input type="submit" value="Add a Cheese" />
    </form>
  );

  if (props.cheese) {
    return (
      <section>
        {form}
        <div className="list">
          {props.cheese.map((chez) => {
            return (
              <div key={chez._id} className="cheese">
                  <Link to={`/cheese/${chez._id}`}>
                    <h3>{chez.name}</h3>
                  </Link>
                  <img src={chez.image} alt={chez.name} />
              </div>
            );
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section>
        {form}
        <h1>Loading...</h1>
      </section>
    );
  }
};


export default Index;