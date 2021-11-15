import {useState, useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";

const Show = (props) => {
  // grab the navigate function
  const navigate = useNavigate()
  // get the params object
  const params = useParams();
  // grab the id from params
  const id = params.id;
  // grab cheese from props
  const cheese = props.cheese;
  // create state for form
  const [editForm, setEditForm] = useState({})
  // useEffect to set state to the existing person, when the data is available
  useEffect(() => {
      if(props.cheese){
          const chez = cheese.find((p) => p._id === id);
          setEditForm(chez)
      }
  }, [props.cheese, cheese, id])

  if (props.cheese) {
    // grab the target chez from the cheese array
    const chez = cheese.find((p) => p._id === id);
    
    // handleChange function for form
    const handleChange = (event) => {
      // create a copy of the state
      const newState = {...editForm}
      // update the newState
      newState[event.target.name] = event.target.value
      // update the state
      setEditForm(newState)
    }

    // handleSubmit for form
    const handleSubmit = (event) => {
      // prevent the refresh
      event.preventDefault()
      // pass the form data to updateCheese
      props.updateCheese(editForm, chez._id)
      // redirect back to index
      navigate("/")
    }

    const removeCheese = () => {
      props.deleteCheese(chez._id)
      navigate("/")
    }

    const form = (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={editForm.name}
          name="name"
          placeholder="name"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.countryOfOrigin}
          name="countryOfOrigin"
          placeholder="Country of Origin"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.image}
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
        />
        <div className='buttons'>
          <div>
            <button onClick={removeCheese}>DELETE</button>
          </div>
          <div>
            <input type="submit" value="UPDATE" id='button' />
          </div>
        </div>
      </form>
    );

    return (
      <div className="chez">
        <h3>{chez.name} - {chez.countryOfOrigin}</h3>
        <img src={chez.image} alt={chez.name} />
        {form}
        
      </div>
    );
  } else {
    return <h1>No Cheese</h1>;
  }
};

export default Show;