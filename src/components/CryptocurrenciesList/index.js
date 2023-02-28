// Write your JS code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import CryptocurrencyItem from '../CryptocurrencyItem'

import './index.css'

class CryptocurrenciesList extends Component {
  state = {
    isLoading: true,
    currencyList: [],
  }

  componentDidMount() {
    this.getCurrencyList()
  }

  getCurrencyList = async () => {
    const response = await fetch(
      'https://apis.ccbp.in/crypto-currency-converter',
    )
    const data = await response.json()

    const updatedData = data.map(eachItem => ({
      id: eachItem.id,
      currencyName: eachItem.currency_name,
      currencyLogo: eachItem.currency_logo,
      euroValue: eachItem.euro_value,
      usdValue: eachItem.usd_value,
    }))

    this.setState({currencyList: updatedData, isLoading: false})
  }

  renderCurrencyItems = () => {
    const {currencyList} = this.state

    return (
      <div className="currency-list-container">
        <h1 className="currency-heading">Cryptocurrency Tracker</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/cryptocurrency-bg.png"
          alt="cryptocurrency"
          className="crypto-image"
        />
        <div className="table-container">
          <div className="table-header">
            <p className="coin-type">Coin Type</p>
            <div className="money-container">
              <p className="usd-count">USD</p>
              <p className="euro-count">EURO</p>
            </div>
          </div>
          {currencyList.map(eachCurrency => (
            <CryptocurrencyItem
              currencyItem={eachCurrency}
              key={eachCurrency.id}
            />
          ))}
        </div>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div>
        {isLoading ? (
          <div data-testid="loader" className="loader-con">
            <Loader type="Rings" color="#ffffff" height={80} width={80} />
          </div>
        ) : (
          this.renderCurrencyItems()
        )}
      </div>
    )
  }
}
export default CryptocurrenciesList
