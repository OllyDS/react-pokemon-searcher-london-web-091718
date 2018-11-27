import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    spriteView: true
  }

  getPokemonHP = pokemon => {
    const pokemonHP = pokemon.stats.find(stat => stat.name === 'hp')
    return pokemonHP.value
  }

  render() {
    const { pokemon } = this.props
    return (
      <Card>
        <div>
          <div className="image" onMouseOver={() => this.setState({ spriteView: false })} onMouseOut={() => this.setState({ spriteView: true })}>
            {
              this.state.spriteView === true ?
                <img src={pokemon.sprites.front} alt="oh no!" /> : <img src={pokemon.sprites.back} alt="oh no!" />
            }
          </div>
          <div className="content">
            <div className="header">{pokemon.name.slice(0,1).toUpperCase() + pokemon.name.slice(1, pokemon.name.length)}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.getPokemonHP(pokemon)} hp
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
