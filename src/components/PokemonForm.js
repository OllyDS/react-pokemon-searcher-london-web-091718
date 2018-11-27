import React from 'react'
import { Form } from 'semantic-ui-react'

class PokemonForm extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    }
  }

  handleFormInputs = event => {
    this.setState({ [event.target.name]: event.target.value})
  }

  handleSubmit = event => {
    event.preventDefault()

    const pokemonData = {
      'name': this.state.name,
      'stats': [
        {
          value: this.state.hp,
          name: 'hp'
        }],
      'sprites':
        {
          front: this.state.frontUrl,
          back: this.state.backUrl
        }
      }

    fetch('http://localhost:3000/pokemon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(pokemonData)
    })
    this.props.changeState(pokemonData)
    this.setState({ 
      name: '',
      hp: '',
      frontUrl: '',
      backUrl: ''
    })
  }

  render() {
    const { handleFormInputs } = this
    return (
      <div>
        <h3>Add a Pokemon!</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input fluid label="Name" placeholder="Name" name="name" onChange={element => handleFormInputs(element)} />
            <Form.Input fluid label="hp" placeholder="hp" name="hp" onChange={element => handleFormInputs(element)} />
            <Form.Input fluid label="Front Image URL" placeholder="url" name="frontUrl" onChange={element => handleFormInputs(element)} />
            <Form.Input fluid label="Back Image URL" placeholder="url" name="backUrl" onChange={element => handleFormInputs(element)} />
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    )
  }

}

export default PokemonForm
