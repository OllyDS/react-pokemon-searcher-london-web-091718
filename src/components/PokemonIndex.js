import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'
import pokemonLogo from './pokemon.png'

class PokemonPage extends React.Component {

  state = {
    pokemons: [],
    filter: ''
  }

  getPokemons = () => {
    return fetch('http://localhost:3000/pokemon')
      .then(response => response.json())
  }

  componentDidMount = () => {
    this.getPokemons()
      .then(response => this.setState({ pokemons: response }))
  }

  // Searchbar Stuff
  updateFilter = searchbarInput => {
    this.setState({ filter: searchbarInput.target.value })
  }

  filteredPokemon = () => {
    const pokemonsCopy = [...this.state.pokemons]
    const newPokemonsCopy = pokemonsCopy.filter(pokemon => pokemon.name.includes(this.state.filter))
      return this.state.filter === '' ? this.state.pokemons : newPokemonsCopy
  }

  // Submit
  changeState = pokemon => {
    const newPokemons = [...this.state.pokemons]
    newPokemons.push(pokemon)
    this.setState({ pokemons: newPokemons })
  }

  render() {
    const { filter } = this.state
    const { filteredPokemon, updateFilter, changeState } = this
    return (
      <div>
        <img src={pokemonLogo} height='100' width='400'/>
        <br />
        <Search onSearchChange={ event => updateFilter(event) } showNoResults={false} />
        <br />
        <PokemonForm changeState={ changeState }/>
        <br />
        <PokemonCollection pokemons={ filteredPokemon(filter) }/>
      </div>
    )
  }
}

export default PokemonPage
